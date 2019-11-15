import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/home/index.vue' // 完整路径
import layout from '../views/layout' // 简写路径
import login from '../views/login' // 简写路径
// @ 是 VueCLI 中提供的一种特殊的路径规则，直接指向 src 目录路径
// 注意：在VueCLI 创建的子昂木中，无论在哪里使用 @ 符号， 都指向src
import home from '@/views/home'
import article from '@/views/article'
import publish from '@/views/publish'

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

export default router
