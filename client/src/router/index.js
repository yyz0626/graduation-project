import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/entertainment',
    name: 'Entertainment',
    component: () => import( /* webpackChunkName: "entertainment" */ '../views/navigation-page/entertainment.vue'),
  },
  {
    path: '/friends',
    name: 'Friends',
    component: () => import( /* webpackChunkName: "friends" */ '../views/navigation-page/friends.vue')
  },
  {
    path: '/questions',
    name: 'Questions',
    component: () => import( /* webpackChunkName: "news" */ '../views/navigation-page/questions.vue')
  },
  {
    path: '/auction',
    name: 'Auction',
    component: () => import( /* webpackChunkName: "auction" */ '../views/navigation-page/auction.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import( /* webpackChunkName: "detail" */ '../views/detail.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/login.vue'),
  },
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