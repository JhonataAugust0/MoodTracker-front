<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useFeatures } from '../composables/useFeatures'
import { MessageSquare, Calendar, BarChart2, Target } from 'lucide-vue-next'

const { t } = useI18n()
const { features } = useFeatures()

const moodEmojis = ref(['😢', '😊', '😄'])
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-gray-900">
    <!-- Hero Section -->
    <div class="max-w-6xl mx-auto px-6 py-20">
      <div class="flex flex-col items-center text-center mb-16 space-y-6">
        <div class="flex gap-4 text-4xl mb-4">
          <span v-for="emoji in moodEmojis" 
                :key="emoji" 
                class="animate-bounce"
                style="animation-delay: calc(var(--index) * 200ms)">
            {{ emoji }}
          </span>
        </div>
        
        <h2 class="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 py-1">
          {{ t('landing.title') }}
        </h2>
        
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          {{ t('landing.subtitle') }}
        </p>
        
        <router-link
          to="/dashboard"
          class="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-purple-700 
                 transition-all hover:scale-105 shadow-lg"
        >
          {{ t('header.getStarted') }}
        </router-link>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 gap-8">
        <div v-for="feature in features" 
             :key="feature.key"
             class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl 
                    hover:shadow-2xl transition-all hover:-translate-y-1">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl 
                      flex items-center justify-center mb-4">
            <span class="text-2xl">{{ feature.icon }}</span>
          </div>
          
          <h3 class="text-xl font-bold mb-2">
            {{ t(`landing.features.${feature.key}.title`) }}
          </h3>
          
          <p class="text-gray-600 dark:text-gray-300">
            {{ t(`landing.features.${feature.key}.description`) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>