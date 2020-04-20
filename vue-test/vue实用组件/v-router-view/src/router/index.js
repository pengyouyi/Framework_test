import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pncComponents/layout/layout'
import Home from '@/pncPages/Home'
import Login from '@/pncPages/login/login'
import News from '@/pncPages/news'
import newsInfo from '@/pncPages/newsInfo'
import Project from '@/pncPages/project'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
		    {
		      path: 'home',
		      name: 'Home',
		      component: Home,
		      meta: {
		      	isShowHomeHeader: true,
		      	hideNavBar: true
		      }
		    },
		    {
		      path: 'login',
		      name: 'Login',
		      component: Login,
		      meta: {
		      	isShowHomeHeader: true,
		      	hideNavBar: true
		      }
		    }
      ]
    },
	{
      path: '/news',
      redirect: '/news/library',
      name: 'News',
      component: Layout,
      children: [
          {
          	path: 'library',
          	name: News,
          	component: News
          },
          {
          	path: 'information/:id',
          	name: newsInfo,
          	component: newsInfo
          }
      ]
    },
    {
      path: '/project',
      redirect: '/project/library/1',
      name: 'Project',
      component: Layout,
      children: [
          {
          	path: 'library/:id',
          	name: Project,
          	component: Project
          }
      ]
    },
    // {
    //   path: '/',
    //   name: 'Layout',
    //   component: Layout
    // },

    // {
    //   path: '/user',
    //   name: 'User',
    //   component: User,
    //   children: [
    //         {
		  //       path: 'profile',
		  //       name: 'UserProfile',
		  //       component: UserProfile
		  //   },
		  //   {
		  //       path: 'posts',
		  //       name: 'UserPosts',
		  //       component: UserPosts
		  //   }
    //   ]
    // }
  ]
})
