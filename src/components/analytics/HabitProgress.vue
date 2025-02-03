<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHabitStore } from '../../stores/habit'
import { useApiWithTimeout } from '../../composables/timeoutHandler'
import { useAuthStore } from '../../stores/auth'
const authStore = useAuthStore()


const { t } = useI18n()
const habitStore = useHabitStore()
const { fetchWithTimeout } = useApiWithTimeout(30000, 2)


onMounted(async () => {
  await authStore.initialize()
  if (authStore.isAuthenticated) {
    await fetchWithTimeout(() => habitStore.fetchHabits())
  }
})

const habitProgress = computed(() => {
  if (habitStore.isLoading) return []
  
  return habitStore.habits.map(habit => ({
    ...habit,
    completions: habitStore.getHabitProgress(habit.id),
  }))
})

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
          <div class="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              class="absolute h-full rounded-full transition-all duration-300 ease-in-out"
              :style="{
                width: `${Math.min(100, (habit.completions / habit.frequencyTarget) * 100)}%`,
                backgroundColor: habit.color || '#FFFFFF' 
              }"
            ></div>
          </div>
        </div>
        <span class="text-sm">{{ habit.completions }} / {{ habit.frequencyTarget }}</span>
      </div>
    </div>
  </div>
</template>
<!-- :style="{
  width: `${Math.min(100, (habit.completions / habit.target) * 100)}%`,
  backgroundColor: habit.color
}" -->