# v-i18n

> 使用 vue-i18n 切换中英文

[https://github.com/kazupon/vue-i18n](https://github.com/kazupon/vue-i18n)

# 安装 install

```js
npm install vue-i18n --save-dev
```

# vue 中使用 vue-i18n

## 在 main.js 中引入 vue-i18n

```js
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

let i18n = new VueI18n({
	locale: 'english',  // 语言标识
	// this.$i18n.locale  // 通过切换locale的值来实现语言切换
	messages: {
		'english': require('./i18n/english')  // 英文语言包
		'chinese': require('./i18n/chinese')  // 中文语言包
	}
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
```

## 准备 english、chinese 语言包

在 src 下新增 i18n/chinese.js 和 i18n/english.js

```js
export const common = {
	language: '语言',
	hello: '你好，世界'
}
```

```js
export const common = {
	language: 'language',
	hello: 'hello world'
}
```

## 在 HTML 模板中使用

src/components/HelloWorld.vue

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="changeLocale">中文/EN</button>
    <p>{{$t('common.hello')}}</p>
    <p>{{$t('common.language')}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    changeLocale() {
      let locale = this.$i18n.locale;
      if (locale === 'english') {
        this.$i18n.locale = 'chinese';
      } else {
        this.$i18n.locale = 'english';
      }
    }
  }
};
</script>
```

## preview

浏览器打开： http://localhost:8080/

![](http://pengyouyi.site/assets/images/2020/4-5-6/4-7-1.gif)

# vue-i18n 和 vue-router

中英文切换的时候同时改变url，这就需要在 router 中定义两种 routes

## src/router/index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'

Vue.use(Router)

const langs = ["english", "chinese"]

/* 多语言生成函数 */
const RouterGenerator = function(lang) {
	return [
		{
			path: '/',
			redirect: '/english/'
		},
	    {
	      path: `/${lang}/`,
	      name: lang === 'english' ? 'HelloWorld' : '你好世界',
	      component: HelloWorld,
	      meta: {
	      	lang
	      }
	    },
	    {
	      path: `/${lang}/home`,
	      name: lang === 'english' ? 'Home' : '首页',
	      component: Home,
	      meta: {
	      	lang
	      }
	    }
	]
}

let routerMap = []

langs.forEach((lang) => {
    routerMap = routerMap.concat(RouterGenerator(lang))
})

export default new Router({
  mode: 'history',
  routes: routerMap
})
```

在 meta 中定义lang, routerMap 生成中英两套路由共用一个组件

## src/main.js

```js
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

let i18n = new VueI18n({
	locale: 'english',  // 语言标识
	// this.$i18n.locale  // 通过切换locale的值来实现语言切换
	messages: {
		'english': require('./i18n/english'),  // 英文语言包
		'chinese': require('./i18n/chinese')  // 中文语言包
	}
})

Vue.config.productionTip = false

router.afterEach(() => {
	Vue.prototype.$lang = router.currentRoute.meta.lang;
	i18n.locale = router.currentRoute.meta.lang
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
```

router.afterEach 更改 i18n.locale

## src/components/Language.vue

```html
<template>
  <div class="hello">
    <router-link :to="router">{{toLang}}</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
  	lang() {
        return this.$route.meta.lang
  	},
  	toLang() {
  		return this.lang === 'english' ? 'chinese' : 'english' 
  	},
  	router() {
  		return {
  			path: this.$route.path.replace(this.lang, this.toLang),
  			query: this.$route.query
  		}
  	}
  }
};
</script>
```

中英切换的主要逻辑 this.$route.path.replace()

## src/components/Home.vue 引入 Language

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Language></Language>
    <p>{{$t('common.hello')}}</p>
    <p>{{$t('common.language')}}</p>
    <p>{{i18n[$lang].love}}</p>
  </div>
</template>

<script>
import Language from './Language'
export default {
  name: 'Home',
  components: {
    Language
  },
  data () {
    return {
      msg: 'Welcome to Your home',
      i18n: {
      	english: {
            love: 'I Love You'
      	},
      	chinese: {
            love: '我爱你'
      	}
      }
    }
  }
};
</script>
```

Language 可被全局调用, 在 src/components/HelloWorld.vue 同上引入 Language

## preview

浏览器打开： http://localhost:8080/

浏览器打开： http://localhost:8080/english/home

![](http://pengyouyi.site/assets/images/2020/4-5-6/4-7-2.gif)

















