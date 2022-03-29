import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/index",
    component: index,
  },
  // 首页重定向
  {
    path: "/",
    redirect: "/index",
  },
  // 用户管理
  {
    path: "/user-management",
    name: "userManagement",
    component: () =>
      import(
        /* webpackChunkName: "userManagement" */ "../views/user-management.vue"
      ),
  },
  // 动态管理
  {
    path: "/dynamic-management",
    name: "dynamicManagement",
    component: () =>
      import(
        /* webpackChunkName: "dynamicManagement" */ "../views/dynamic-management.vue"
      ),
  },
  // 评论管理
  {
    path: "/reply-management",
    name: "replyManagement",
    component: () =>
      import(
        /* webpackChunkName: "replyManagement" */ "../views/reply-management.vue"
      ),
  },
  // 管理员管理
  {
    path: "/admin-management",
    name: "adminManagement",
    component: () =>
      import(
        /* webpackChunkName: "adminManagement" */ "../views/admin-management.vue"
      ),
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
