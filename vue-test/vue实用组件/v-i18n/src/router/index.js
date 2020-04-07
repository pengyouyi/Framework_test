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
