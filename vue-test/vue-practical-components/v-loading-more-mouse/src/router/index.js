import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import News from '@/components/News'
//import Investor from '@/components/Investor'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/news',
      redirect: '/news/library',
      name: 'News',
      component: News,
      children: [{
      	path: 'library',
      	component: News,
      }]
    },
    // {
    //   path: '/investor',
    //   redirect: '/investor/library/1',
    //   name: 'Investor',
    //   component: Investor,
    //   children: [{
    //     path: 'library/:page',
    //     component: Investor,
    //   }]
    // }
  ]
})