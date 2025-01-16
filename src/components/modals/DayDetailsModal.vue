<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'
import { useMoodStore } from '../../stores/mood'
import { useHabitStore } from '../../stores/habit'

const props = defineProps<{
  show: boolean
  date: Date
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const moodStore = useMoodStore()
const habitStore = useHabitStore()

const dayMoods = computed(() => {
  return moodStore.moodEntries.filter(entry =>
    format(entry.timestamp, 'yyyy-MM-dd') === format(props.date, 'yyyy-MM-dd')
  )
})

const dayHabits = computed(() => {
  return habitStore.habitChecks.filter(check =>
    format(check.completedAt, 'yyyy-MM-dd') === format(props.date, 'yyyy-MM-dd')
  ).map(check => {
    const habit = habitStore.habits.find(h => h.id === check.habitId)
    return {
      ...check,
      habitName: habit?.name || 'Unknown Habit'
    }
  })
})
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">{{ format(date, 'MMMM d, yyyy') }}</h3>
          <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">×</button>
        </div>

        <div class="space-y-6">
          <div v-if="dayMoods.length">
            <h4 class="font-semibold mb-2">Moods</h4>
            <div class="space-y-2">
              <div
                v-for="entry in dayMoods"
                :key="entry.id"
                class="p-3 bg-gray-50 dark:bg-gray-700 rounded"
              >
                <div class="text-2xl mb-1">{{ ['😢', '😔', '😐', '🙂', '😊', '😄'][entry.mood] }}</div>
                <p v-if="entry.note" class="text-sm text-gray-600 dark:text-gray-300">{{ entry.note }}</p>
                <span class="text-xs text-gray-500">{{ format(entry.timestamp, 'HH:mm') }}</span>
              </div>
            </div>
          </div>

          <div v-if="dayHabits.length">
            <h4 class="font-semibold mb-2">Completed Habits</h4>
            <ul class="space-y-2">
              <li
                v-for="check in dayHabits"
                :key="check.id"
                class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded"
              >
                <span>{{ check.habitName }}</span>
                <span class="text-xs text-gray-500">{{ format(check.completedAt, 'HH:mm') }}</span>
              </li>
            </ul>
          </div>

          <div v-if="!dayMoods.length && !dayHabits.length" class="text-center text-gray-500">
            No entries for this day
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>