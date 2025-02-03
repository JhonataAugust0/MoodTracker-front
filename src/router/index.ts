import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import Dashboard from '../views/Dashboard.vue'
import Terms from '../views/Terms.vue'
import Cookies from 'js-cookie'
import ChangePassword from '../views/ChangePassword.vue'
import NotFound from '../views/NotFound.vue'
import ServerError from '../views/ServerError.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms
    },
    {
      path: '/change-password',
      name: 'changePassword',
      component: ChangePassword
    },
    {
      path: '/500',
      name: 'ServerError',
      component: ServerError
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound, 
    },
  ]
})

router.beforeEach((to, _from, next) => {  
  if (to.meta.requiresAuth && !Cookies.get('auth_token')) {
    next('/auth')
  } else {
    next()
  }
})

export default router