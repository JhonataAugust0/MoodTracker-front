<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHabitStore } from '../../stores/habit'
import { useAuthStore } from '../../stores/auth'
import { format } from 'date-fns'
import { useApiWithTimeout } from '../../composables/timeoutHandler'

const { t } = useI18n()
const authStore = useAuthStore()
const habitStore = useHabitStore()
const { fetchWithTimeout, isLoading } = useApiWithTimeout(30000, 2)

const chartData = computed(() => {
  if (habitStore.isLoading) return []
  
  return habitStore.habits.map(habit => ({
    name: habit.name,
    completions: habitStore.getHabitProgress(habit.id),
    color: '#6366f1'
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

onMounted(async () => {
  await authStore.initialize()
  if (authStore.isAuthenticated) {
    await fetchWithTimeout(() => habitStore.fetchHabits())
  }
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
    <h3 class="text-xl font-bold mb-6">{{ t(`dashboard.habitProgress`) }}</h3>
    <div v-if="habitStore.isLoading" class="flex justify-center">
      <span class="loading">Loading...</span>
    </div>
    <div v-else class="h-64">
      <div class="flex h-full items-end space-x-4">
        <div
          v-for="habit in chartData"
          :key="habit.name"
          class="flex-1 flex flex-col items-center"
        >
          <div
            class="w-full rounded-t transition-all duration-300"
            :style="{
              height: `${(habit.completions / 40) * 100}%`,
              backgroundColor: habit.color
            }"
          ></div>
          <span class="mt-2 text-sm text-center">{{ habit.name }}</span>
          <span class="text-xs text-gray-500">{{ habit.completions }}/{{ habit.target }}</span>
        </div>
      </div>
    </div>
  </div>
</template>