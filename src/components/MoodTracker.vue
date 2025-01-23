<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMoodStore } from '../stores/mood'

const { t } = useI18n()
const moodStore = useMoodStore()
const selectedMood = ref(6)
const note = ref('')

const moods = [
  { value: 0, emoji: '😢', label: 'Very Sad' },
  { value: 1, emoji: '😔', label: 'Sad' },
  { value: 2, emoji: '😠', label: 'angry' },
  { value: 3, emoji: '😡', label: 'very angry' },
  { value: 4, emoji: '😐', label: 'Neutral' },
  { value: 5, emoji: '🙂', label: 'Good' },
  { value: 6, emoji: '😊', label: 'Very Good' },
  { value: 7, emoji: '😄', label: 'Excellent' }
]

const saveMoodEntry = async () => {
  const selectedMoodLabel = moods.find(mood => mood.value === selectedMood.value)?.label || ''
  await moodStore.addMoodEntry(selectedMoodLabel, selectedMood.value, note.value )
  note.value = ''
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{{ t(`dashboard.howAreYouFeeling`) }}</h2>
    
    <div class="flex justify-between items-center mb-6">
      <button
        v-for="mood in moods"
        :key="mood.value"
        @click="selectedMood = mood.value"
        class="text-4xl transition-transform hover:scale-110"
        :class="{ 'scale-125': selectedMood === mood.value }"
        :title="mood.label"
      >
        {{ mood.emoji }}
      </button>
    </div>

    <textarea
      v-model="note"
      placeholder="Add a note about your day..."
      class="w-full p-3 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
      rows="3"
    ></textarea>

    <button
      @click="saveMoodEntry"
      class="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
    >
      {{ t(`landing.features.mood.saveEntry`) }}
    </button>
  </div>
</template>