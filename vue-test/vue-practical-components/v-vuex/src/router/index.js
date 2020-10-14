import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PageA from '@/components/pageA'
import PageB from '@/components/pageB'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/a',
      name: 'PageA',
      component: PageA
    },
    {
      path: '/b',
      name: 'PageB',
      component: PageB
    }
  ]
})
