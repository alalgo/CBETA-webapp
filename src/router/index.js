import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      keepAlive: true, // 该字段表示该页面需要缓存
      isBack: false // 用于判断上一个页面是哪个
    },
    component: () => import('../views/Search.vue')
  },
  {
    path: '/reader',
    name: 'reader',
    component: () => import('../views/Reader.vue')
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import('../views/HomePage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
