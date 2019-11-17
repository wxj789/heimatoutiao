import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import 'nprogress/nprogress.css' // 加载nprogress 中的指定样式文件
import axios from 'axios'
import JSONbig from 'json-bigint'
Vue.use(ElementUI) // 注册全局组件
Vue.prototype.$axios = axios // axios赋值给全局属性
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置为常态地址

Vue.config.productionTip = false

// axios 默认会把后端返回的数据使用JSON.parse 转为对象给我们使用
// 同时 axios 也提供了让我们自定义转换的功能
// axios 在收到相应数据之后都会经过这里 进行数据转换
axios.defaults.transformResponse = [function (data, headers) {
  // 删除操作执行后，后端返回的是空数据
  // 空数据一经转换就报错
  // 当没有响应体的时候。JSONbig.parse(data)执行就会报错

  // 使用try-catch 捕获异常
  // 导致报错的代码放到 try 里面， 出错之后的处理放到 catch 里面
  try {
    return JSONbig.parse(data)
  } catch (error) {
    return {}
  }
}]

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // config 是本次请求相关的配置对象 并将其内的相关数据发送给后端
  // 我们可以在这里统一配置config内的数据
  // console.log(config)
  const token = window.localStorage.getItem('login-token')
  // 统一配置请求头中的 token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // return config 是请求通行的规则
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
