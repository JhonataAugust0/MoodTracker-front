<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Habit } from '../../types/api'
import { useHabitStore } from '../../stores/habit'

const { t } = useI18n()

const props = defineProps<{
  habits: Habit[]
}>()

const habitStore = useHabitStore()

const sortedHabits = computed(() => {
  return [...props.habits].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
})
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="habit in sortedHabits"
      :key="habit.id"
      class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
    >
      <div>
        <h3 class="font-semibold text-gray-800 dark:text-white">{{ habit.name }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">{{ habit.description }}</p>
      </div>
      <button
        @click="habitStore.checkHabit(habit.id)"
        class="btn-primary bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-700 transition-colors"
      >
      {{ t(`landing.features.habits.logHabit`) }}
      </button>
    </div>
  </div>
</template>