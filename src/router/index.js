import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios'
import store from '../store'

Vue.use(VueRouter)
const authUser = async ( to, from, next) => {
    const res = await axios.get('https://radiant-river-90328.herokuapp.com/api/user')
      try {
        if(res.data){
          store.commit('User', res.data)
          
          next()
        }else{
          store.commit('User', res.data)
          next('/login')
        }
       } catch (error) {
        next('/login')
       }
}
const guest = async ( to, from, next) => {
  const res = await axios.get('https://radiant-river-90328.herokuapp.com/api/user')
      if(res.data){
        store.commit('User', res.data)
        
        next()
      }else{
        store.commit('User', res.data)
        next()
      }
}
const loggedIn = async ( to, from, next) => {
  const res = await axios.get('https://radiant-river-90328.herokuapp.com/api/user')
      if(res.data){
        store.commit('User', res.data)
        
        next('/')
      }else{
        store.commit('User', res.data)
        next()
      }
}
 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  beforeEnter: guest

  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/signup.vue'),
    beforeEnter: loggedIn
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    beforeEnter: loggedIn
  },
  {
    path: '/merchant',
    name: 'merchant',
    component: () => import(/* webpackChunkName: "merchant" */ '../views/merchant.vue'),
  beforeEnter: authUser
  },
  {
    path: '/product/:product',
    // name: 'product',
    component: () => import(/* webpackChunkName: "product" */ '../views/product.vue'),
  beforeEnter: guest


  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
