<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '../../stores/theme'

const themeStore = useThemeStore()
const { t, locale } = useI18n()
const languages = [
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Português' }
]
</script>

<template>
  <nav class="flex justify-between items-center p-6 shadow-sm"
       :class="{'bg-gradient-to-r from-purple-50 to-white': !themeStore.isDark, 'bg-gradient-to-r from-purple-900 to-gray-800': themeStore.isDark}">
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <router-link to="/" class="flex items-center gap-2">
        <span class="text-2xl">🎯</span>
        <h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          {{ t('header.title') }}
        </h1>
      </router-link>
    </div>

    <!-- Controls -->
    <div class="flex items-center gap-4">
      <!-- Language Selector -->
      <select v-model="locale" class="bg-transparent border border-purple-200 rounded-lg px-3 py-1">
        <option v-for="lang in languages" :key="lang.code" :value="lang.code">
          {{ lang.name }}
        </option>
      </select>

      <!-- Theme Toggle -->
      <button 
        @click="themeStore.toggleTheme" 
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
        <span v-if="themeStore.isDark">🌞</span>
        <span v-else>🌙</span>
      </button>

      <!-- Get Started Button -->
      <router-link 
        to="/dashboard" 
        class="bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-700 transition-colors">
        {{ t('header.getStarted') }}
      </router-link>
    </div>
  </nav>
</template>
