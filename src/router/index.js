import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import User from '@/components/user/user'
import Tasks from '@/components/tasks/tasks'
import SignIn from '@/components/user/signIn'
import SignUp from '@/components/user/signUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
