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
    path: '/news',
    name: 'News',
    component: () => import( /* webpackChunkName: "news" */ '../views/navigation-page/news.vue')
  },
  {
    path: '/auction',
    name: 'Auction',
    component: () => import( /* webpackChunkName: "auction" */ '../views/navigation-page/auction.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import( /* webpackChunkName: "entertainment" */ '../views/detail.vue'),
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import( /* webpackChunkName: "entertainment" */ '../views/notFound.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router