import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/user',
    component: () => import('@/views/admin/user/index')
  },
  {
    path: '/role',
    component: () => import('@/views/admin/role/index')
  },
  {
    path: '/menu',
    component: () => import('@/views/admin/menu/index')
  },
  {
    path: '/serve',
    component: () => import('@/views/admin/serve/index')
  }
]
export default new Router({
  mode: 'history',
  base: '/system',
  routes: constantRoutes
})
