import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/views/Login'

import {
  isLogined,
} from '../utils'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const logined = isLogined()

  if (to.name !== 'Login' && !logined) {
    next({ path: '/login' })
  } else {
    next()
  }

})

export default router
