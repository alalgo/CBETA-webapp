import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 通过自定义插件方式引入js
import util from './utils/util.js'
// import touchEvent from './utils/touchEvent.js'
// Vue.use(touchEvent)

Vue.use(Vant)
Vue.use(util)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
