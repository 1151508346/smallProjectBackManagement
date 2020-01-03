import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import { ALERTUPLOAD,ADDPROCUTIONINFO} from "./mutations.js";
export default new Vuex.Store({
  state: {
    username:""  , //登录的用户名 ，默认为空
    productionInfo:null
  },
  mutations: {
    [ALERTUPLOAD](state,callback) {
      callback();
    },
    [ADDPROCUTIONINFO](state,payload){
        state.productionInfo = payload;
        state.productionInfo.section = "";
        state.productionInfo.problem = "";
    }

  },
  actions: {
  },
  modules: {
  }
})
