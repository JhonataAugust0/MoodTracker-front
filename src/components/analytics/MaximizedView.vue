<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMoodStore } from '../../stores/mood'
import { useHabitStore } from '../../stores/habit'
import MoodCalendar from './MoodCalendar.vue'
import MoodChart from './MoodChart.vue'
import HabitProgress from './HabitProgress.vue'
import { useApiWithTimeout } from '../../composables/timeoutHandler'


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
const { fetchWithTimeout, isLoading } = useApiWithTimeout(30000, 2)

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target.classList.contains('modal-overlay')) {
    emit('close')
  }
}

onMounted(async () => {
  if (props.component === 'habit') {
    await fetchWithTimeout(() => habitStore.fetchHabits())
  } else if (props.component === 'mood'){
    await moodStore.fetchMoods()
  }
})

const toggleView = () => {
  viewMode.value = viewMode.value === 'calendar' ? 'chart' : 'calendar'
}
</script>

<template>
  <Transition name="fade">
    <div 
      v-if="show" 
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 modal-overlay"
      @click="handleClickOutside"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        <div class="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 class="text-xl font-bold">
            {{ component === 'mood' ? 'Análise de Humor' : 'Progresso dos Hábitos' }}
          </h2>
          <div class="flex items-center gap-4">
            <button
              @click="toggleView"
              class="p-2 bg-gray-500 dark:bg-black-300 rounded-lg"
            >
              <i class="fas" :class="viewMode === 'calendar' ? 'fa-chart-bar' : 'fa-calendar'"></i>
            </button>
            <button 
              @click="emit('close')"
              class="p-2 bg-red-400 dark:bg-red-400 rounded-lg"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-auto p-6">
          <component
            :is="component === 'mood' 
              ? (viewMode === 'calendar' ? MoodCalendar : MoodChart) 
              : HabitProgress"
            :store="component === 'mood' ? moodStore : habitStore"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>