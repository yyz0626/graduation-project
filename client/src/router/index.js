import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    name: 'index',
    component: index
  },
  // 休闲娱乐
  {
    path: '/entertainment',
    name: 'Entertainment',
    component: () => import( /* webpackChunkName: "entertainment" */ '../views/navigation-page/entertainment.vue'),
  },
  // 交友平台
  {
    path: '/friends',
    name: 'Friends',
    component: () => import( /* webpackChunkName: "friends" */ '../views/navigation-page/friends.vue')
  },
  // 难题解答
  {
    path: '/questions',
    name: 'Questions',
    component: () => import( /* webpackChunkName: "news" */ '../views/navigation-page/questions.vue')
  },
  // 二手市场
  {
    path: '/auction',
    name: 'Auction',
    component: () => import( /* webpackChunkName: "auction" */ '../views/navigation-page/auction.vue')
  },
  // 动态详情页
  {
    path: '/detail',
    name: 'Detail',
    component: () => import( /* webpackChunkName: "detail" */ '../views/detail-pages/detail.vue'),
  },
  // 登录页
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/login.vue'),
  },
  // 个人信息页
  {
    path: '/personal',
    name: 'Personal',
    component: () => import( /* webpackChunkName: "personal" */ '../views/detail-pages/personal.vue'),
  },
  // 个人动态页
  {
    path: '/personalDynamic',
    name: 'PersonalDynamic',
    component: () => import( /* webpackChunkName: "PersonalDynamic" */ '../views/detail-pages/personal-dynamic.vue'),
  },
  // 问题反馈页
  {
    path: '/help',
    name: 'Help',
    component: () => import( /* webpackChunkName: "help" */ '../views/help.vue'),
  },
  // 404
  {
    path: '*',
    name: 'notFound',
    component: () => import( /* webpackChunkName: "*" */ '../views/notFound.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})


// router.beforeEach((to, from, next) => {
//   // 其他页面路径
//   let token = sessionStorage.getItem('userToken') // 获取用户登录token
//   if (token === null || token === '') { // 如果token不存在或者为空
//     next({
//       path: '/detail'
//     }) // 则跳转到登录页
//   }
// })
export default router