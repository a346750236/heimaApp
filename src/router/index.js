import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    // 登录组件
    path: '/login',
    name: 'login',
    // 按需加载
    component: () => import('@/views/login/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
