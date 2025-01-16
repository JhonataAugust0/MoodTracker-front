<script setup lang="ts">
import { computed } from 'vue'
import type { Habit } from '../../stores/habit'
import { useHabitStore } from '../../stores/habit'

const props = defineProps<{
  habits: Habit[]
}>()

const habitStore = useHabitStore()

const sortedHabits = computed(() => {
  return [...props.habits].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
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
        class="btn-primary"
      >
        Complete
      </button>
    </div>
  </div>
</template>