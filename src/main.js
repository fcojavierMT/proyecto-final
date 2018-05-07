// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Loading from './components/common/loading.vue'
import Advise from './components/common/advise.vue'
import NewTask from './components/tasks/newtask.vue'
import TaskCard from './components/tasks/taskCard.vue'
import { db } from './components/api/firebaseInit'

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
  VChip,
  VAvatar
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
    VChip,
    VAvatar
  }
},
db)

Vue.config.productionTip = false
Vue.use(router)
Vue.component('loading-component', Loading)
Vue.component('advise-component', Advise)
Vue.component('newTask-component', NewTask)
Vue.component('task-card', TaskCard)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
