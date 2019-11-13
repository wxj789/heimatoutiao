import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import axios from 'axios'
Vue.use(ElementUI) // 注册全局组件
Vue.prototype.$axios = axios // axios赋值给全局属性
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置为常态地址

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
