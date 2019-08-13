import './set-public-path'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })


// 声明周期
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (h) => h(App),
    router
  },
});

export let params = null;
// 项目启动的钩子
export const bootstrap = vueLifecycles.bootstrap;
// export function bootstrap(props) {
//   console.log('-------- bootstrap')
//   console.log(props)
//   return vueLifecycles.mount(props);
// }
//export const mount = vueLifecycles.mount;
// 项目启动后的钩子
export function mount(props) {
  return vueLifecycles.mount(props);
}
// 项目卸载的钩子
export const unmount = vueLifecycles.unmount;
