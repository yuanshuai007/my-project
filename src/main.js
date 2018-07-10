// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import vuex from 'vuex'
import store from './store'
import axios from 'axios'
import * as cookie from './common/cookie/cookie.js'
Vue.config.productionTip = false
Vue.prototype.$axios=axios;
Vue.prototype.$cookie=cookie;

//import VConsole from 'vconsole'
//var vConsole = new VConsole();
//axios在ie下的兼容性解决方案
//import 'babel-polyfill'
//import promise from 'es6-promise'
//promise.polyfill();
//console.log('cookie','---',cookie);
//Vue.use(vuex);
///
//import router_set from './common/utility/router_set.js'
//router.beforeEach(router_set)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App:App},
  template: '<App/>'
})
