// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Loading from './components/common/loading.vue'
import Advise from './components/common/advise.vue'
import NewTask from './components/tasks/newtask.vue'
import firebaseInit from './components/api/firebaseInit'
import VueFire from 'vuefire'

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
  VCard,
  VForm,
  VTextField,
  VParallax,
  VAlert,
  VDialog,
  VSelect,
  VChip
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
    VCard,
    VForm,
    VTextField,
    VParallax,
    VAlert,
    VDialog,
    VSelect,
    VChip
  }
},
firebaseInit)

const settings = {timestampsInSnapshots: true}
firebaseInit.settings(settings)

Vue.config.productionTip = false
Vue.use(router)
Vue.use(VueFire)
Vue.component('loading-component', Loading)
Vue.component('advise-component', Advise)
Vue.component('newTask-component', NewTask)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
