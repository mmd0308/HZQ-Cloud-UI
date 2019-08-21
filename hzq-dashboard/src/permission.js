import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/'] // 白名单

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  // 从cookie中获取token
  const hasToken = getToken()
  // 判断token是否存在,如果存在,进入
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已经登陆,访问的是登陆请求,直接进入首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 判断该用户用户的角色
      next()
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // if (hasRoles) {
      //   next()
      // } else {
      //   try {
      //     // const { roles } = await store.dispatch('user/getInfo')

      //     // const accessRoutes = await store.dispatch(
      //     //   'permission/generateRoutes',
      //     //   roles
      //     // )
      //     // router.addRoutes(accessRoutes)

      //     next({ ...to, replace: true })
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
    }
  } else {
    // token 不存在,判断是否在白名单中
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 重新定向到登陆界面中
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
