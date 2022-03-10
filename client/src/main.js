import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from './utils/http'
// 时间转化
import moment from 'moment'
// px转rem
import './utils/rem.js'
// 动态验证码
import SlideVerify from 'vue-monoplasty-slide-verify';


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(SlideVerify);

Vue.prototype.$http = http
Vue.prototype.$moment = moment


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')