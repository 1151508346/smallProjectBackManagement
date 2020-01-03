import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Welcome from "@/components/Welcome";
import Usermanage from "@/components/Usermanage";
import Ordermanage from "@/components/Ordermanage";
import Goodsmanage from "@/components/Goodsmanage";
import Errors from '../views/Error.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  }, {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      {
        path: "welcome",
        name: "welcome",
        component: Welcome
      },{
        path: "usermanage",
        name: "usermanage",
        component:Usermanage
      },{
        path: "ordermanage",
        name: "ordermanage",
        component: Ordermanage
      },{
        path: "goodsmanage",
        name: "goodsmanage",
        component: Goodsmanage
      }
    ],
    redirect:()=>"home/welcome"
  }, {
    path: "/",
    name: "home",
    redirect: () => "home/welcome",
  },
  {
    // Error
    path: "**",
    name: "Error",
    component: Errors
  }
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
