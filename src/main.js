import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store'
import ViewUI from 'view-design/dist/iview'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ViewUI, {
  transfer: true,
  size: 'small'
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

console.log(store)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
