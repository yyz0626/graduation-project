import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/index",
    component: index,
    meta: { requireAuth: true },
  },
  // 首页重定向
  {
    path: "/",
    redirect: "/index",
    meta: { requireAuth: true },
  },
  // 用户管理
  {
    path: "/user-management",
    name: "user-management",
    meta: { requireAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "user-management" */ "../views/user-management.vue"
      ),
  },
  // 动态管理
  {
    path: "/dynamic-management",
    name: "dynamic-management",
    meta: { requireAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "dynamic-management" */ "../views/dynamic-management.vue"
      ),
  },
  // 评论管理
  {
    path: "/reply-management",
    name: "reply-management",
    meta: { requireAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "reply-management" */ "../views/reply-management.vue"
      ),
  },
  // 管理员管理
  {
    path: "/admin-management",
    name: "admin-management",
    meta: { requireAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "admin-management" */ "../views/admin-management.vue"
      ),
  },
  // 问题处理
  {
    path: "/handle-problem",
    name: "handle-problem",
    meta: { requireAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "handle-problem" */ "../views/handle-problem.vue"
      ),
  },
  // 日志查看
  {
    path: "/check-record",
    name: "check-record",
    meta: { requireAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "check-record" */ "../views/check-record.vue"
      ),
  },
  // 登陆页面
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
  // 404
  {
    path: "*",
    name: "notFound",
    component: () =>
      import(/* webpackChunkName: "*" */ "../views/notFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// router.beforeEach((to, from, next) => {
//   // 其他页面路径
//   let token = sessionStorage.getItem('userToken') // 获取用户登录token
//   if (token === null || token === '') { // 如果token不存在或者为空
//     next({
//       path: '/detail'
//     }) // 则跳转到登录页
//   }
// })
export default router;
