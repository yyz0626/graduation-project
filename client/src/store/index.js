import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    uname: '',
    uid: ''
  },
  mutations: {},
  actions: {
    setToken: (state, token) => {
      state.token = token;
      localStorage.setItem('mytoken', token)
    },
    logout: state => {
      state.token = null;
      state.uname = null;
      localStorage.removeItem('mytoken');
      localStorage.removeItem('myname');
      localStorage.removeItem('myid');
    },
    setName: (state, uname) => {
      state.uname = uname;
      localStorage.setItem('myname', uname)
    },
    setId: (state, uid) => {
      state.uid = uid;
      localStorage.setItem('myid', uid)
    },
  },
  modules: {}
})