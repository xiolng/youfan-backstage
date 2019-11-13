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
  transfer: false,
  size: 'default'
})

const url = `${location.protocol}//webapi.amap.com/maps?v=1.4.15&key=b1bdd140fb83906f9f6e847927a63d9a&plugin=AMap.Scale,AMap.ToolBar`
const jsapi = document.createElement('script')
jsapi.charset = `utf-8`
jsapi.src = url
document.body.appendChild(jsapi)

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
