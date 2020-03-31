import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import { ADDPROBLEMBACKCOUNT} from "./mutations.js";
export default new Vuex.Store({
  state: {
    username:""  , //登录的用户名 ，默认为空
    productionInfo:null,
    problemBackCount:0
   
  },
  mutations: {
    // [ALERTUPLOAD](state,callback) {
    //   callback();
    // },
    // [ADDPROCUTIONINFO](state,payload){
    //     state.productionInfo = payload;
    //     state.productionInfo.section = "";
    //     state.productionInfo.problem = "";
    // }
    [ADDPROBLEMBACKCOUNT](state,payload){
      state.problemBackCount = payload
    }

  },
  actions: {
  },
  modules: {
  }
})
