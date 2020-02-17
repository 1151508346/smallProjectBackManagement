import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
//引入自定义的网络请求方法
import { request, interceptRequest } from "@/netWork/request.js";
import $api from "@/netWork/api.js";
import common from "@/tools/common.js"
import echarts from "echarts";
Vue.config.productionTip = false;
/**
 * 将网路请求的方法挂在到Vue的原型上，在每个组件当中都可以使用该方法，
 * 避免了每次使用该方法的时候需要导入
 */
Vue.prototype.request = request;
Vue.prototype.interceptRequest = interceptRequest;
Vue.prototype.$api = $api;
Vue.prototype.$common = common;
Vue.prototype.$echarts = echarts;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
