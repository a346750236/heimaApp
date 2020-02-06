import Vue from 'vue'
import VueRouter from 'vue-router'
// import { Search } from 'vant'

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
  },
  {
    // 小智同学
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat/index.vue')
  },
  {
    // 编辑用户
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile/index.vue')
  },
  // 用户页面
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('@/views/user/index.vue')
  },
  // 文章搜素
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue')
  },
  // 文章内容
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/index.vue'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true
  },
  {
    // 我的作品
    path: '/my-article/:type?', // /my-article /my-article/a /my-article/b
    name: 'search',
    component: () => import('@/views/user-articles/index.vue'),
    props: true
  } // 我的收藏
  // {
  //   path: '/my-article/collect',
  //   name: 'search',
  //   component: () => import('@/views/user-articles/index.vue')
  // }, // 我的历史
  // {
  //   path: '/my-article/history',
  //   name: 'search',
  //   component: () => import('@/views/user-articles/index.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
