<script setup lang="ts">
import { ref } from 'vue'
import { useMoodStore } from '../../stores/mood'
import { useHabitStore } from '../../stores/habit'
import MoodCalendar from './MoodCalendar.vue'
import MoodChart from './MoodChart.vue'
import HabitProgress from './HabitProgress.vue'

const props = defineProps<{
  show: boolean
  initialView: 'calendar' | 'chart'
  component: 'mood' | 'habit'
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const viewMode = ref<'calendar' | 'chart'>(props.initialView)
const moodStore = useMoodStore()
const habitStore = useHabitStore()

const toggleView = () => {
  viewMode.value = viewMode.value === 'calendar' ? 'chart' : 'calendar'
}
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        <!-- Header -->
        <div class="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 class="text-xl font-bold">
            {{ component === 'mood' ? 'Mood Analysis' : 'Habit Progress' }}
          </h2>
          <div class="flex items-center gap-4">
            <button
              @click="toggleView"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              :title="viewMode === 'calendar' ? 'Switch to Chart' : 'Switch to Calendar'"
            >
              <span v-if="viewMode === 'calendar'">📊</span>
              <span v-else>📅</span>
            </button>
            <button
              @click="emit('close')"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-auto p-6">
          <Transition name="fade" mode="out-in">
            <component
              :is="viewMode === 'calendar' ? MoodCalendar : (component === 'mood' ? MoodChart : HabitProgress)"
              :class="{ 'h-full': viewMode === 'calendar' }"
              :moodData="moodStore.moodEntries"
              :habitData="habitStore.habitChecks"
            />
          </Transition>
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