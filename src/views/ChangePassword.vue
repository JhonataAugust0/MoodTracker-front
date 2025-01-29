<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'
import Cookies from 'js-cookie'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const currentPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')
const token = ref('')
const error = ref('')
const success = ref(false)
const isResetMode = ref(false)


onMounted(() => {
  token.value = route.query.token as string
  if (!token.value) {
    try {
     token.value = Cookies.get("auth_token") || ""
    } catch (err: any) {
      error.value = err.message || t('auth.changePasswordError')
  }}
  if (token.value && route.query.email) {
    email.value = route.query.email as string
  }
})

const handleSubmit = async () => {
  error.value = ''
  
  if (newPassword.value !== confirmNewPassword.value) {
    error.value = t('auth.passwordMismatch')
    return
  }
  
  if (newPassword.value.length < 6) {
    error.value = t('auth.passwordTooShort')
    return
  }

  try {
    let result = await authStore.changePassword({
      email: email.value,
      token: token.value,
      password: currentPassword.value || confirmNewPassword.value,
      newPassword: newPassword.value,
    })
    if (result){
      success.value = true
      setTimeout(() => {
        router.push('/auth')
      }, 2000)
    }
  
  } catch (err: any) {
    error.value = err.message || t('auth.changePasswordError')
  }
}

const handleResetRequest = async () => {
  try {
    let result = await authStore.recoverPasswordEmail({ email: email.value })
      if (result){
        success.value = true
        setTimeout(() => {
          router.push('/auth')
        }, 2000)
      } 
    } catch (err: any) {
      error.value = err.message || t('auth.changePasswordError')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white dark:from-purple-900 dark:to-gray-900">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">
        {{ t('auth.changePassword') }}
      </h2>
      
      <div v-if="success" class="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded">
        {{ t('auth.passwordChangeSuccess') }}
      </div>
      
      <form v-if="isResetMode" @submit.prevent="handleResetRequest" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('auth.email') }}</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full rounded-lg"
            :placeholder="t('auth.emailPlaceholder')"
          />
        </div>
        <button type="submit" class="w-full btn-primary bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-700 transition-colors">
          {{ t('auth.sendResetLink') }}
        </button>
        <p class="text-center mt-4">
          <a @click="isResetMode = false" class="text-purple-600 hover:text-purple-700 cursor-pointer">
            {{ t('auth.backToChangePassword') }}
          </a>
        </p>
      </form>

      <form v-else @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Email só é mostrado se não houver token -->
        <div v-if="!token">
          <label class="block text-sm font-medium mb-1">{{ t('auth.email') }}</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full rounded-lg"
            :placeholder="t('auth.emailPlaceholder')"
          />
        </div>
        
        <!-- Senha atual só é necessária se não tiver token -->
        <div v-if="!token">
          <label class="block text-sm font-medium mb-1">{{ t('auth.currentPassword') }}</label>
          <input
            v-model="currentPassword"
            type="password"
            required
            class="w-full rounded-lg"
            :placeholder="t('auth.currentPasswordPlaceholder')"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('auth.newPassword') }}</label>
          <input
            v-model="newPassword"
            type="password"
            required
            class="w-full rounded-lg"
            :placeholder="t('auth.newPasswordPlaceholder')"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ t('auth.confirmNewPassword') }}</label>
          <input
            v-model="confirmNewPassword"
            type="password"
            required
            class="w-full rounded-lg"
            :placeholder="t('auth.confirmNewPasswordPlaceholder')"
          />
        </div>

        <div v-if="error" class="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded">
          {{ error }}
        </div>
        
        <button type="submit" class="w-full btn-primary bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-700 transition-colors">
          {{ t('auth.changePasswordButton') }}
        </button>
      </form>
      
      <p class="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        {{ t('auth.backToLogin') }}
        <router-link
          to="/auth"
          class="text-purple-600 dark:text-purple-400 hover:underline"
        >
          {{ t('auth.loginLink') }}
        </router-link>
      </p>
      
      <div v-if="!isResetMode" class="text-center pt-2">
        <a @click="isResetMode = true" class="mt-4 text-purple-600 hover:text-purple-700 cursor-pointer text-sm">
          {{ t('auth.forgotPassword') }}
        </a>
      </div>
    </div>
  </div>
</template>