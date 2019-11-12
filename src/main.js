import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
Vue.use(ElementUI) // 注册全局组件

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
