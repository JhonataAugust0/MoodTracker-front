<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  if (isLogin.value) {
    await authStore.login(email.value, password.value)
  } else {
    await authStore.register(email.value, password.value)
  }
  router.push('/dashboard')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white dark:from-purple-900 dark:to-gray-900">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">
        {{ isLogin ? t('auth.login') : t('auth.register') }}
      </h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('auth.email') }}</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full rounded-lg"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('auth.password') }}</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full rounded-lg"
          />
        </div>
        
        <button type="submit" class="w-full btn-primary">
          {{ isLogin ? t('auth.loginButton') : t('auth.registerButton') }}
        </button>
      </form>
      
      <p class="mt-4 text-center">
        {{ isLogin ? t('auth.noAccount') : t('auth.hasAccount') }}
        <button
          @click="isLogin = !isLogin"
          class="text-purple-600 dark:text-purple-400 hover:underline"
        >
          {{ isLogin ? t('auth.registerLink') : t('auth.loginLink') }}
        </button>
      </p>
    </div>
  </div>
</template>