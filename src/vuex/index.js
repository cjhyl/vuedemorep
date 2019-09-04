import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    helloMsg:"Welcome to Your Vue.js App"
  },
  getters:{
    otherHelloMsg(state){
      return "Other "+state.helloMsg;
    },
  },
  mutations:{
    helloMsgChange(state,data){
      state.helloMsg=data
    }
  },
  actions:{

  }
})
