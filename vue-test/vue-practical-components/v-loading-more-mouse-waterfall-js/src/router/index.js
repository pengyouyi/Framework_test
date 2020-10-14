import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import News from '@/components/News'
import Project from '@/components/Project'

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
    {
      path: '/project',
      redirect: '/project/library',
      name: 'Project',
      component: Project,
      children: [{
        path: 'library',
        component: Project,
      }]
    },
  ]
})