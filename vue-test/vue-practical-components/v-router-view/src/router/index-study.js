import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Layout from '@/components/Layout'
import Foo from '@/components/Foo'
import Bar from '@/components/Bar'
import User from '@/components/User'
import UserProfile from '@/components/UserProfile'
import UserPosts from '@/components/UserPosts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    // {
    //   path: '/',
    //   name: 'Layout',
    //   component: Layout
    // },
    {
      path: '/',
      name: 'Layout',
      components: {
      	default: Layout,
      	Foo: Foo,
      	Bar: Bar
      }
    },
    {
      path: '/foo',
      name: 'Foo',
      component: Foo
    },
    {
      path: '/bar',
      name: 'Bar',
      component: Bar
    },
    // {
    //   path: '/user/:id',
    //   name: 'User',
    //   component: User
    // },
    {
      path: '/user',
      name: 'User',
      component: User,
      children: [
            {
		        path: 'profile',
		        name: 'UserProfile',
		        component: UserProfile
		    },
		    {
		        path: 'posts',
		        name: 'UserPosts',
		        component: UserPosts
		    }
      ]
    }
  ]
})
