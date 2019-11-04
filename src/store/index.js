import Vue from 'vue'
import Vuex from 'vuex'
import * as globalM from './global'
import menuM from '@/store/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    globalM,
    menuM
  }
})
