# v-vuex

> A Vue.js project

## vue项目初始化

``` bash
vue init webpack Vue-ProjectName
npm install
npm run dev
```

## 安装 vuex

```bash
npm install vuex --save
```

# 项目中使用vuex

## 新建src下的store文件夹

- src
    + store
        - index.js
        - state.js
        - getters.js
        - mutation-types.js
        - actions
        - mutations.js
        

store/index.js

```js
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict: debug,
    plugins: debug ? [createLogger()] : []
})
```

store/state.js

```js
const state = {
	isShowNav: false,
	// Add another one.
};

export default state;
```

store/getters.js

```js
export const isShowNav = state => state.isShowNav;
// Add another one.
```

store/mutation-types.js

```js
export const SET_NAV = 'SET_NAV';
// Add another one.
```

store/actions.js

```js
import * as types from './mutation-types';

export const setNav = function({commit}, isShowNav) {
	commit('SET_NAV', isShowNav);
};
// Add another one.
```

store/mutations.js

```js
import * as types from './mutation-types';

const mutations = {
	[types.SET_NAV](state, isShowNav) {
		state.isShowNav = isShowNav;
	},
	// Add another one.
};

export default mutations;
```

## main.js引入store入口文件

src/main.js

```js
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```

## vue组件中获取state中的值

`this.$store.getters.stateName`

src/components/pageA.vue

```js
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{isShowNav}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Page A'
    }
  },
  computed: {
    isShowNav() {
    	return this.$store.getters.isShowNav;
    },
    // isShowNav: {
    // 	get() {
    // 		return this.$store.getters.isShowNav;
    // 	},
    // 	set(value) {
    // 		this.$store.dispatch('setNav', this.$store.getters.isShowNav)
    // 	}
    // }
  },
}
</script>

<style scoped>

</style>

```

## vue组件中修改state中的值

`this.$store.dispatch('actionType', newVal)`

src/components/pageB

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{isShowNav}}</p>
    <button @click="changeNav">change isShowNav</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Page B'
    }
  },
  computed: {
  	isShowNav() {
  		return this.$store.getters.isShowNav;
  	}
  },
  methods: {
    changeNav() {
    	this.$store.dispatch('setNav', !this.$store.getters.isShowNav);
    	// 严格模式，那么任何修改state的操作，只要不经过mutation的函数，vue就会throw error 
    	// this.$store.state.isShowNav = 'test';  // 不建议这样使用
    	// this.$store.commit('SET_NAV', !this.$store.getters.isShowNav);
    }
  }
}
</script>

<style scoped>

</style>
```

这样 state 中的 isShowNav 就在vue组件中共享了，无论在哪个页面修改它的值，其他页面都能立即通过 computed 监测state中的值发生的变化。

# dispatch和commit来调用mutations的区别

```js
this.$store.dispatch('setNav', !this.$store.getters.isShowNav);

this.$store.commit('SET_NAV', !this.$store.getters.isShowNav);
```

区别：

dispatch：含有异步操作，例如向后台提交数据，写法： this.$store.dispatch('mutations方法名',值)

commit：同步操作，写法：this.$store.commit('mutations方法名',值)


# more

- [https://vuex.vuejs.org/](https://vuex.vuejs.org/)