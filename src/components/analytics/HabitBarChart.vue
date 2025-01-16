<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHabitStore } from '../../stores/habit'
import { format } from 'date-fns'

const { t } = useI18n()
const habitStore = useHabitStore()

const chartData = computed(() => {
  return habitStore.habits.map(habit => ({
    name: habit.name,
    completions: habitStore.getHabitProgress(habit.id),
    color: habit.color
  }))
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
    <h3 class="text-xl font-bold mb-6">{{ t(`dashboard.habitProgress`) }}</h3>
    <div class="h-64">
      <div class="flex h-full items-end space-x-4">
        <div
          v-for="habit in chartData"
          :key="habit.name"
          class="flex-1 flex flex-col items-center"
        >
          <div
            class="w-full rounded-t transition-all duration-300"
            :style="{
              height: `${(habit.completions / 30) * 100}%`,
              backgroundColor: habit.color
            }"
          ></div>
          <span class="mt-2 text-sm text-center">{{ habit.name }}</span>
          <span class="text-xs text-gray-500">{{ habit.completions }} times</span>
        </div>
      </div>
    </div>
  </div>
</template>