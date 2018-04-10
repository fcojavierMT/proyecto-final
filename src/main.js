// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Loading from './components/common/loading.vue'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VCarousel,
  VCard,
  VForm,
  VTextField,
  VParallax,
  VAlert
} from 'vuetify'

import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VCarousel,
    VCard,
    VForm,
    VTextField,
    VParallax,
    VAlert
  }
})

var config = {
  apiKey: 'AIzaSyAR4URCrekwN5n0TDV1JvAhZ11ZE5Nw-dw',
  authDomain: 'proyecto-final-a6a22.firebaseapp.com',
  databaseURL: 'https://proyecto-final-a6a22.firebaseio.com',
  projectId: 'proyecto-final-a6a22',
  storageBucket: 'proyecto-final-a6a22.appspot.com',
  messagingSenderId: '774263161108'
}
firebase.initializeApp(config)

Vue.config.productionTip = false
Vue.use(router)
Vue.component('loading-component', Loading)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
