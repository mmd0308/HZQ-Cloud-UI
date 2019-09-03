import Layout from '@/views/layout'
export const constantLogRoutes = [{
  path: '/admin/system/log',
  component: Layout,
  meta: { title: '日志管理', icon: 'tree' },
  children: [
    {
      path: 'login',
      meta: { title: '登陆日志', icon: 'tree', url: '/system/log/login', permission: 'LOG:LOGIN' }
    },
    {
      path: 'operation',
      meta: { title: '操作日志', icon: 'tree', url: '/system/log/operation', permission: 'LOG:OPERATION' }
    }
  ]
}]
