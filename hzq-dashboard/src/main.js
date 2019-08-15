import './set-public-path'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue'
import store from './store'

// 全局样式
import '@/styles/index.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import '@/icons' // icon

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    store,
    router,
    render: (h) => h(App),
    'arguments': 'dashborad-paramestes'
  }
})
vueLifecycles.arguments = 'llll'
export const bootstrap = vueLifecycles.bootstrap

export const mount = vueLifecycles.mount

export const unmount = vueLifecycles.unmount
