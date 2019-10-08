import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import mock from '@/components/mock'
import login from '@/pages/login'
import mainPage from '@/pages/mainPage'
import mainDefault from '@/pages/mainDefault'
import menuPage from '@/pages/menuPage'
import permissionPage from '@/pages/permissionPage'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  },{
    path: '/mock',
    name: 'mock',
    component: mock
  },{
    path: '/',
    name: 'default0',
    component: login
  },{
    path: '/login',
    name: 'login',
    component: login
  },{
    path: '/main/',
    name: 'main',
    component: mainPage,
    children: [{
      path: '/main',
      name: 'default',
      component: mainDefault
    }, {
      path: 'menu',
      name: 'menu',
      component: menuPage
    }, {
      path: 'permission',
      name: 'permission',
      component: permissionPage
    },
  ]
  }]
})
