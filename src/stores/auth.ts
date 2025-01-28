import { defineStore } from 'pinia'
import { ref } from 'vue'
import ApiService from '../integrations/backend/apiService'
import Cookies from 'js-cookie'
import { ChangePasswordRequestDTO, ForgotPasswordRequestDTO } from '../types/api'

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

  const register = async (email: string, password: string, name: string) => {
    let response = await apiService.register({ email, password, name })
      if (response.status === 200)
      {
        await login(email, password)
      }
  }

  const changePassword = async (data: ChangePasswordRequestDTO) => {
    try {
      let response = await apiService.changePasswordRequest(data)
      if (response.success === true)
      {
        return true
      }
    } catch (error) {
      console.error('Erro ao mudar senha:', error)
      throw error
    }
  }

  const recoverPasswordEmail = async (data: ForgotPasswordRequestDTO) => {
    try {
      let response = await apiService.sendRecoverPasswordEmail({ email: data.email })
      if (response.success === true)
      {
        return true
      }
    } catch (error) {
      console.error('Erro ao mudar senha:', error)
      throw error
    }
  }
  
  const logout = () => {
    isAuthenticated.value = false
    user.value = null
  }

  return {
    isAuthenticated,
    changePassword,
    recoverPasswordEmail,
    user,
    register,
    login,
    logout
  }
})