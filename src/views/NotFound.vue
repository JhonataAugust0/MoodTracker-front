<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white dark:from-purple-900 dark:to-gray-900 p-4">
    <div class="text-center">
      <div class="text-9xl font-bold mb-4 animate-bounce">
        {{ t('notFound.errorCode') }}
      </div>
      <h1 class="text-4xl font-bold mb-4">{{ t('notFound.title') }}</h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
        {{ t('notFound.description') }}
        <br>
        <span class="text-2xl">{{ t('notFound.emoji') }}</span>
      </p>
      <p class="text-gray-500 dark:text-gray-400 mb-8">
        {{ t('notFound.quote.text') }} 
        <br>
        {{ t('notFound.quote.author') }}
      </p>
      <button 
        @click="goHome"
        class="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-purple-700 
               transition-all hover:scale-105 shadow-lg"
      >
      {{ t('notFound.button') }}
      </button>
    </div>
  </div>
</template>