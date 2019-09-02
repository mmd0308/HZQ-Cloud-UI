import Layout from '@/views/layout'
export const constantSystemRoutes = [
  // {
  //   path: '/admin/system1',
  //   component: Layout,
  //   meta: { title: '平台管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'swagger2',
  //       component: () => import('@/views/swagger2/index'),
  //       meta: { title: '接口文档', icon: 'tree' }
  //     },
  //   ]
  // },
  {
    path: '/admin/system',
    component: Layout,
    meta: { title: '平台管理', icon: 'tree' },
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/index'),
        meta: { title: '用户管理', icon: 'tree', url: '/system/user' }
      },
      {
        path: 'role',
        component: () => import('@/views/system/index'),
        meta: { title: '角色管理', icon: 'tree', url: '/system/role' }
      },
      {
        path: 'serve',
        component: () => import('@/views/system/index'),
        meta: { title: '服务管理', icon: 'tree', url: '/system/serve' }
      },
      {
        path: 'menu',
        component: () => import('@/views/system/index'),
        meta: { title: '菜单管理', icon: 'tree', url: '/system/menu' }
      },
      {
        path: 'log',
        meta: { title: '日志管理', icon: 'tree' },
        component: () => import('@/views/system/index'),
        children: [
          {
            path: 'login',
            meta: { title: '登陆日志', icon: 'tree', url: '/system/log/login' }
          },
          {
            path: 'operation',
            meta: { title: '操作日志', icon: 'tree', url: '/system/log/operation' }
          }
        ]
      }
    ]
  }

]
