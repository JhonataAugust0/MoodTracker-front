import { defineStore } from 'pinia'
import { ref } from 'vue'
import ApiService from '../integrations/backend/apiService'
import Cookies from 'js-cookie'

const apiService = ApiService

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<null | { email: string }>(null)

  const login = async (email: string, password: string) => {
    if (email && password) {
      let response = await apiService.login({ email, password })
      if (response.success === true)
      {
        isAuthenticated.value = true
        user.value = { email }
        Cookies.set('auth_token', response.token)
      }
    }
  }

  const register = async (email: string, password: string) => {
    if (email && password) {
      isAuthenticated.value = true
      user.value = { email }
      Cookies.remove('auth_token')
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
  }

  return {
    isAuthenticated,
    user,
    register,
    login,
    logout
  }
})