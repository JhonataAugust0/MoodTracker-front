<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMoodStore } from '../stores/mood'

const { t } = useI18n()
const moodStore = useMoodStore()
const selectedMood = ref(4) // Default to Neutral
const note = ref('')

const moods = [
  { value: 0, emoji: '😢', labelKey: 'verySad' },
  { value: 1, emoji: '😔', labelKey: 'sad' },
  { value: 2, emoji: '😠', labelKey: 'angry' },
  { value: 3, emoji: '😡', labelKey: 'veryAngry' },
  { value: 4, emoji: '😐', labelKey: 'neutral' },
  { value: 5, emoji: '🙂', labelKey: 'good' },
  { value: 6, emoji: '😊', labelKey: 'veryGood' },
  { value: 7, emoji: '😄', labelKey: 'excellent' }
]

const saveMoodEntry = async () => {
  const selectedMoodLabel = moods.find(mood => mood.value === selectedMood.value)?.labelKey || ''
  await moodStore.addMoodEntry(selectedMoodLabel, selectedMood.value, note.value )
  note.value = ''
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{{ t(`dashboard.howAreYouFeeling`) }}</h2>
    
    <div class="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6">
      <button
        v-for="mood in moods"
        :key="mood.value"
        @click="selectedMood = mood.value"
        class="flex flex-col items-center justify-center p-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="{ 'bg-purple-100 dark:bg-purple-900': selectedMood === mood.value }"
        :title="t(`moods.${mood.labelKey}`)"
      >
        <span class="text-2xl sm:text-3xl transition-transform hover:scale-110"
              :class="{ 'scale-125': selectedMood === mood.value }">
          {{ mood.emoji }}
        </span>
        <span class="text-xs mt-1 hidden sm:block">{{ t(`moods.${mood.labelKey}`) }}</span>
      </button>
    </div>

    <textarea
      v-model="note"
      :placeholder="t('dashboard.addNote')"
      class="w-full p-3 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white resize-none"
      rows="3"
    ></textarea>

    <button
      @click="saveMoodEntry"
      class="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
    >
      {{ t('landing.features.mood.saveEntry') }}
    </button>
  </div>
</template>