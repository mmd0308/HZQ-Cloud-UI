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
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'tree' }
      }
    ]
  },
  {
    path: '/admin/system',
    component: Layout,
    meta: { title: '平台管理', icon: 'example' },
    children: [
      {
        path: 'swagger2',
        component: () => import('@/views/swagger2/index'),
        meta: { title: '接口文档', icon: 'tree' }
      },
      {
        path: 'role',
        component: () => import('@/views/system/index'),
        meta: { title: '角色管理', icon: 'tree' }
      },
      {
        path: 'menu',
        component: () => import('@/views/system/index'),
        meta: { title: '菜单管理', icon: 'tree' }
      },
      {
        path: 'user',
        component: () => import('@/views/system/index'),
        meta: { title: '用户管理', icon: 'tree' }
      },
      {
        path: 'serve',
        component: () => import('@/views/system/index'),
        meta: { title: '服务管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/admin/tools',
    component: Layout,
    children: [
      {
        path: 'icons',
        name: 'Icons',
        component: () => import('@/views/tools/icons/svg/index'),
        meta: { title: 'Icons', icon: 'app-1' }
      }
    ]
  }

  // {
  //   path: '/hzq/login',
  //   component: () => import('@/views/login/index')
  // },
  // {
  //   path: '/hzq/dashboard',
  //   component: () => import('@/views/dashboard/index')
  // }

  // {
  //   path: '/hzq',
  //   component: Layout,
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Login',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'dashboard', icon: 'tree' }
  //   }

  //   ]
  // },
  // {
  //   path: '/hzq/sys',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'system',
  //       component: () => import('@/views/system/index'),
  //       meta: { title: '系统管理', icon: 'link' }
  //     }
  //   ]
  // },

  // {
  //   path: '/hzq/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/test/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/test/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/hzq/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/test/index'),
  //       meta: { title: 'Form', icon: 'app-1' }
  //     }
  //   ]
  // }

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  // }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})
