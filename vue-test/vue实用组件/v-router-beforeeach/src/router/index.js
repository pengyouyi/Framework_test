import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Foo from '@/components/Foo'
import FooDetail from '@/components/FooDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter: (to, from, next) => {
          console.log('独享 HelloWorld beforeEnter')
          next()
      }
    },
    {
    	path: '/foo',
    	name: 'Foo',
    	component: Foo,
    	children: [
            {
            	path: ':id',
            	name: 'FooDetail',
            	component: FooDetail,
            	beforeEnter: (to, from, next) => {
		          console.log('独享 FooDetail beforeEnter')
		          next()
		        }
            },
            {
            	path: 'hello',
            	name: 'HelloWorld',
            	component: HelloWorld,
            	beforeEnter: (to, from, next) => {
		          console.log('独享 HelloWorld beforeEnter')
		          next()
		        }
            }
    	]
    }
  ]
})
