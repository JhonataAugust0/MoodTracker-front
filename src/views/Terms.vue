<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t, tm } = useI18n()

const allSections = computed<any[]>(() => {
  return tm('terms.sections') || []
})

</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div class="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
          <h1 class="text-3xl font-bold">{{ t('terms.title') }}</h1>
        </div>

        <div class="p-6">
          <p class="text-sm text-gray-500 mb-8">
            {{ t('terms.lastUpdated') }}
          </p>

          <div class="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section 
              v-for="(section, index) in allSections"
              :key="index"
              class="space-y-4"
            >
              <h2 class="text-xl font-semibold">{{ section.title }}</h2>
              
              <template v-if="Array.isArray(section.content)">
                <ul class="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li v-for="(item, itemIndex) in section.content" :key="itemIndex">
                    {{ item }}
                  </li>
                </ul>
              </template>

              <p 
                v-else 
                class="text-gray-600 dark:text-gray-300"
              >
                {{ section.content }}
              </p>
            </section>
          </div>

          <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p class="text-sm text-gray-500">
              {{ t('terms.contact') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>