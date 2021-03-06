# v-axios

# 使用axios获取后端接口数据

vue使用axios获取接口 `http://test.pandanc.com/api/v1/news/entry/` 的数据，并渲染到页面中

## Build Setup

``` bash
vue init webpack Vue-ProjectName
npm install
npm run dev
```

## 安装 axios

```bash
npm install axios --save-dev
```

## main.js引入axios

src/main.js 中新增如下

```js
import axios from 'axios';

Vue.prototype.$axios = axios;
```

## 使用$axios.get获取数据

src/components/HelloWorld.vue 获取后端接口数据，并渲染到页面中

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="item in news">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      news: []
    }
  },
  created() {
    this.getNews();
  },
  methods: {
    getNews() {
      this.$axios.get("http://test.pandanc.com/api/v1/news/entry/").then(res => {
        console.log(res.data);
        this.news = res.data.results;
      })
    }
  }
}
</script>

<style scoped>

</style>
```

很简单吧，只需要三步即可。

需要注意，实际项目中需要注意访问后端接口时的`跨域`问题。

比如后端服务器设置允许跨域请求:

```js
Access-Control-Allow-Origin: *
```


