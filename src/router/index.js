import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
// import Home from '../views/home/index.vue' // 完整路径
import layout from '../views/layout' // 简写路径
import login from '../views/login' // 简写路径
// @ 是 VueCLI 中提供的一种特殊的路径规则，直接指向 src 目录路径
// 注意：在VueCLI 创建的子昂木中，无论在哪里使用 @ 符号， 都指向src
import home from '@/views/home'
import article from '@/views/article'
import publish from '@/views/publish'
import comment from '@/views/comment'
import commentDetail from '@/views/comment-detail'
import source from '@/views/source'

Vue.use(VueRouter)

const routes = [
//   {
//   path: '/',
//   redirect: '/login'
// },
// 一级路由  主页
  {
    path: '/',
    // name: 'home',
    component: layout,
    children: [
      // 首页
      {
        path: '', // 默认子路由
        component: home
      },
      // 文章列表
      {
        path: '/article',
        component: article
      },
      // 发表文章
      {
        path: '/publish',
        component: publish
      },
      {
        path: '/publish/:id',
        component: publish
      },
      {
        path: '/comment',
        component: comment
      },
      {
        path: '/comment/:id',
        component: commentDetail,
        // 将路由参数映射给组件的 props属性
        props: true
      },
      {
        path: '/source',
        component: source
      }
    ]
  },
  // 一级路由  登录页
  {
    path: '/login',
    component: login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 登录状态的校验  ---路由拦截器

// 路由的拦截器 beforeEach 方法，该方法接收一个回调函数
// to 表示去哪里的路由信息
// from 表示来自哪里的路由信息
// next 是一个方法，用于路由放行
// 我们要做的就是：判断用户的登录状态，有就通过，没有就跳转到登录页面
router.beforeEach((to, from, next) => {
  // 开启顶部导航进度条
  NProgress.start()
  // 访问登录页面
  if (to.path === '/login') {
    return next()
  }
  // 访问非登录页面
  // 获取token
  const token = window.localStorage.getItem('login-token')
  // 判断是否有token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

// 路由导航结束之后触发的钩子函数
router.afterEach((to, from) => {
  // 导航结束之后关闭进度条
  NProgress.done()
})

export default router
