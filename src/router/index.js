import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  // {
  //   path: '',
  //   redirect: '/login'
  // },
  {
    // 登录组件
    path: '/login',
    name: 'login',
    // 按需加载
    component: () => import('@/views/login/index.vue')
  },
  {
    // 一级路由tabbar标签页
    path: '/',
    component: () => import('@/views/tabbar/index.vue'),
    children: [
      {
      // 首页
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/index.vue')

      },
      {
      // 问答
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa/index.vue')
      },
      {
      // 视频
        path: 'video',
        name: 'video',
        component: () => import('@/views/viedo/index.vue')
      },
      {
      // 我的
        path: 'my',
        name: 'my',
        component: () => import('@/views/my/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
