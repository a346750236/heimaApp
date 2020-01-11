import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
Vue.use(Vuex)

// 设置一个常量
const USER = 'user'
export default new Vuex.Store({
  state: {
    // 登录用户：一个对象 ， 包含token
    user: getItem(USER)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失 state 中的 user 状态，我们把它放到本地存储
      setItem(USER, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
