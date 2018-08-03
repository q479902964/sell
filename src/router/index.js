import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'
import login from '../components/login/login'
import register from '../components/register/register'
import shop from '../components/shop/shop'
import shop_list from '../components/shop_list/shop_list'
import userinfo from '../components/userinfo/userinfo'
import VueResource from 'vue-resource'
Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name:"login",
      component: login,
    },
    {
      path:'/register',
      name:"register",
      component:register
    },
    {
      path:'/userinfo',
      name:"userinfo",
      component:userinfo
    },
    {
      path:'/shop_list',
      name:"shop_list",
      component:shop_list
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop,
      children:[
        {
          path: '/',
          name: '/',
          redirect:"/shop/goods"
        },
        {
          path: 'seller',
          name: 'seller',
          // component: news,
          component:seller
        },
        {
          path: 'goods',
          name: 'goods',
          // component: news,
          component:goods
        },
        {
          path: 'ratings',
          name: 'ratings',
          // component: news,
          component:ratings
        },
      ]
    },
    // {
    //   path: '/goods',
    //   component: goods
    // },
    // {
    //   path: '/ratings',
    //   component: ratings
    // },
    // {
    //   path: '/seller',
    //   component: seller
    // }
  ]
})
