import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/* Layout */
import Layout from '@/views/layout'

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/front/index')
  },
  {
    path: '/home',
    component: () => import('@/views/front/index')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Login',
        component: () => import('@/views/admin/dashboard/index'),
        meta: { title: '首页', icon: 'tree' }
      }
    ]
  },

  {
    path: '/admin/tools',
    component: Layout,
    meta: { title: '系统工具', icon: 'tree' },
    children: [
      {
        path: 'icons',
        component: () => import('@/views/tools/icons/svg/index'),
        meta: { title: 'Icons', icon: 'app-1' }
      },
      {
        path: 'swagger2',
        component: () => import('@/views/swagger2/index'),
        meta: { title: '接口文档', icon: 'tree' }
      }
    ]
  }
]
import { constantSystemRoutes } from './system'
import { constantLogRoutes } from './log'
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes.concat(constantSystemRoutes).concat(constantLogRoutes)
})
