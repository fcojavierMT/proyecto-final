// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Loading from './components/common/loading.vue'
import firebaseInit from './components/api/firebaseInit'

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
  VAlert,
  VDialog,
  VSelect
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
    VAlert,
    VDialog,
    VSelect
  }
},
firebaseInit)

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
