import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    admin_token: "",
    admin_info: "",
  },
  mutations: {
    SET_ADMIN_TOKEN: (state, admin_token) => {
      state.admin_token = admin_token;
    },
    SET_ADMIN_INFO: (state, admin_info) => {
      state.admin_info = admin_info;
    },
    OUT_TOKEN: (state) => {
      state.admin_token = "";
    },
    OUT_USERINFO: (state) => {
      state.admin_info = "";
    },
  },
  actions: {
    // 登录
    SET_ADMIN_TOKEN: ({ commit }, admin_token) => {
      localStorage.setItem("admin_token", admin_token);
      commit("SET_ADMIN_TOKEN", admin_token);
    },

    // 管理员信息
    SET_ADMIN_INFO: ({ commit }, admin_info) => {
      localStorage.setItem("admin_info", admin_info);
      commit("SET_ADMIN_INFO", admin_info);
    },

    // 登出
    LOG_OUT: ({ commit }) => {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_info");
      commit("OUT_TOKEN");
      commit("OUT_USERINFO");
    },

    // 管理员信息
    UPDATE_USERINFO: ({ commit }) => {
      localStorage.removeItem("admin_info");
      commit("OUT_USERINFO");
    },
  },
  modules: {},
});
