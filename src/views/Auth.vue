<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleSubmit = async () => {
  if (isLogin.value) {
    await authStore.login(email.value, password.value)
  } else {
    if (password.value !== confirmPassword.value) {
      alert(t('auth.passwordMismatch'))
      return
    }
    await authStore.register(email.value, password.value, name.value)
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
        <template v-if="!isLogin">
          <div>
            <label class="block text-sm font-medium mb-1">{{ t('auth.name') }}</label>
            <input
              v-model="name"
              type="text"
              required
              class="w-full rounded-lg"
              :placeholder="t('auth.namePlaceholder')"
            />
          </div>
        </template>

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
        
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('auth.password') }}</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full rounded-lg"
            :placeholder="t('auth.passwordPlaceholder')"
          />
        </div>

        <template v-if="!isLogin">
          <div>
            <label class="block text-sm font-medium mb-1">{{ t('auth.confirmPassword') }}</label>
            <input
              v-model="confirmPassword"
              type="password"
              required
              class="w-full rounded-lg"
              :placeholder="t('auth.confirmPasswordPlaceholder')"
            />
          </div>
        </template>
        
        <button type="submit" class="w-full btn-primary bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-700 transition-colors">
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