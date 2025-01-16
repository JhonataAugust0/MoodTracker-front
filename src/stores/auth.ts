import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<null | { email: string }>(null)

  const login = (email: string, password: string) => {
    // Mock authentication
    if (email && password) {
      isAuthenticated.value = true
      user.value = { email }
    }
  }

  const register = (email: string, password: string) => {
    // Mock registration
    if (email && password) {
      isAuthenticated.value = true
      user.value = { email }
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
  }

  return {
    isAuthenticated,
    user,
    login,
    register,
    logout
  }
})