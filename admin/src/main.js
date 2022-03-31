import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import http from "./utils/http";
// 时间转化
import moment from "moment";
// px转rem
import "./utils/rem.js";
// 动态验证码
import SlideVerify from "vue-monoplasty-slide-verify";

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (
      localStorage.getItem("admin_token") &&
      localStorage.getItem("admin_info")
    ) {
      //判断本地是否存在admin_token
      next();
    } else {
      if (to.path === "/login") {
        next();
      } else {
        next({
          path: "/login",
        });
      }
    }
  } else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if (to.fullPath == "/login") {
    if (
      localStorage.getItem("admin_token") &&
      localStorage.getItem("admin_info")
    ) {
      next({
        path: from.fullPath,
      });
    } else {
      next();
    }
  }
});

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(SlideVerify);

Vue.prototype.$http = http;
Vue.prototype.$moment = moment;
moment.locale("zh-cn");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
