import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import ApiService from '../integrations/backend/apiService'
import Cookies from 'js-cookie'
import { ChangePasswordRequestDTO, ForgotPasswordRequestDTO } from '../types/api'

const apiService = ApiService

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<null | { id: number }>(null)

  
  const loadUserFromStorage = () => {
    const userId = Cookies.get('userId')
    if (userId) {
      user.value = { id: parseInt(userId)}
    }
  }

  const saveUserToStorage = (userId: number) => {
    Cookies.set('userId', userId.toString())
  }

  const login = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios')
      }
  
      const response = await apiService.login({ email, password })
      
      if (response.success === true && response.userId) {
        Cookies.set('auth_token', response.token)
        isAuthenticated.value = true
        user.value = { id: response.userId }
        saveUserToStorage(response.userId)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Erro durante login:', error)
      user.value = null
      isAuthenticated.value = false
      return false
    }
  }

  const initialize = async () => {
    const token = Cookies.get('auth_token')
    if (token) {
      try {
        loadUserFromStorage()
        isAuthenticated.value = true
      } catch (error) {
        console.error('Erro ao validar token:', error)
        logout()
      }
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    Cookies.remove('auth_token')
    Cookies.remove('userId')
  }

  const getUserId = computed(() => user.value?.id)
  
  const isUserLoaded = computed(() => !!user.value)

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


  return {
    isAuthenticated,
    changePassword,
    currentUser: computed(() => user.value),
    recoverPasswordEmail,
    initialize,
    user,
    register,
    login,
    logout,
    getUserId,
    isUserLoaded
  }
})