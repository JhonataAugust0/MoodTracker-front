<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
</script>

<template>
  <footer class="w-full py-6 mt-auto border-t dark:border-gray-700 border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div class="flex items-center space-x-2">
          <span class="text-gray-700 dark:text-gray-300 font-medium">🎯 MoodTracker</span>
          <a href="/terms" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            {{ t('footer.termsOfUse') }}
          </a>
          <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            {{ t('footer.contact') }}
          </a>
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          © {{new Date().getFullYear()}} {{ t('footer.copyright') }} 
        </div>
      </div>
    </div>
    </footer>
</template>