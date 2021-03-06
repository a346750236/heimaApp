import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

import decodeJwt from 'jwt-decode'

Vue.use(Vuex)

// 设置一个常量
const USER = 'user'
export default new Vuex.Store({
  state: {
    // 登录用户：一个对象 ， 包含token
    user: getItem(USER),
    cachePages: ['TabBar']
  },
  mutations: {
    setUser (state, data) {
      // 解析 JWT 中的数据（需要使用用户ID）
      if (data && data.token) {
        data.id = decodeJwt(data.token).user_id
      }
      state.user = data
      // 为了防止刷新丢失 state 中的 user 状态，我们把它放到本地存储
      setItem(USER, state.user)
    },
    // 添加到缓存
    addCachePage (state, name) {
      if (!state.cachePages.includes(name)) {
        state.cachePages.push(name)
      }
    },
    // 删除缓存
    removeCachePage (state, name) {
      const index = state.cachePages.indexOf(name)
      if (index !== -1) {
        state.cachePages.splice(index)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
