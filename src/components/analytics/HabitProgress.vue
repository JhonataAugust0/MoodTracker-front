<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHabitStore } from '../../stores/habit'
import MaximizedView from './MaximizedView.vue'

const { t } = useI18n()
const habitStore = useHabitStore()
const showMaximized = ref(false)

const habitProgress = computed(() => {
  if (habitStore.isLoading) return []
  
  return habitStore.habits.map(habit => ({
    ...habit,
    completions: habitStore.getHabitProgress(habit.id),
  }))
})

function getTargetByFrequency(frequency: string) {
  switch(frequency) {
    case 'daily': return 30
    case 'weekly': return 4
    case 'monthly': return 1
    default: return 30
  }
}

</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ t(`dashboard.habitProgress`) }}</h2>
    </div>
    <div v-if="habitStore.isLoading" class="flex justify-center">
      <span class="loading">Loading...</span>
    </div>
    <div v-else class="space-y-4">
      <div
        v-for="habit in habitProgress"
        :key="habit.id"
        class="flex items-center gap-4"
      >
        <div class="flex-1">
          <h3 class="font-semibold">{{ habit.name }}</h3>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              class="h-full rounded-full"
              :style="{
                width: `${Math.min(100, (habit.completions / 30) * 100)}%`,
                backgroundColor: habit.color
              }"
            ></div>
          </div>
        </div>
        <span class="text-sm">{{ habit.completions }} times</span>
      </div>
    </div>
  </div>
</template>
<!-- :style="{
              width: `${Math.min(100, (habit.completions / habit.target) * 100)}%`,
              backgroundColor: habit.color
            }" -->