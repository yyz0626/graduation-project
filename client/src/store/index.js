import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: '',
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    OUT_TOKEN: (state) => {
      state.token = '='
    },
    OUT_USERINFO: (state) => {
      state.userInfo = '='
    },
  },
  actions: {
    // 登录
    SET_TOKEN: ({
      commit
    }, token) => {
      localStorage.setItem('token', token)
      commit('SET_TOKEN', token)
    },

    // 用户信息
    SET_USERINFO: ({
      commit
    }, userInfo) => {
      localStorage.setItem('userInfo', userInfo)
      commit('SET_USERINFO', userInfo)
    },


    // 登出
    LOG_OUT: ({
      commit
    }) => {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      commit('OUT_TOKEN')
      commit('OUT_USERINFO')
    },
  },
  modules: {}
})