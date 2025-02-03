<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useMoodStore } from '../../stores/mood'
import { useHabitStore } from '../../stores/habit'
import { useAuthStore } from '../../stores/auth'
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import { useApiWithTimeout } from '../../composables/timeoutHandler'

const moodStore = useMoodStore()
const habitStore = useHabitStore()
const currentDate = ref(new Date())
const { fetchWithTimeout } = useApiWithTimeout(30000, 2)

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.initialize()
  if (authStore.isAuthenticated) {
    await Promise.all([
    await fetchWithTimeout(() => habitStore.fetchHabits()),
    await fetchWithTimeout(() => moodStore.fetchMoods())
  ])
  }
})

const calendarDays = computed(() => {
  const start = startOfMonth(currentDate.value)
  const end = endOfMonth(currentDate.value)
  const days = eachDayOfInterval({ start, end })

  return days.map(day => {
    const dateStr = format(day, 'yyyy-MM-dd')
    
    const moods = moodStore.moodEntries.filter(mood => 
      mood.timestamp.startsWith(dateStr)
    )

    // Processa hábitos completados no dia
    const habits = habitStore.habitCompletions.filter(completion => 
      completion.completedAt.startsWith(dateStr)
    )

    return {
      date: day,
      moods: moods.map(mood => ({
        id: mood.id,
        mood: mood.intensity,
        note: mood.notes
      })),
      habits: habits.map(completion => ({
        id: completion.id,
        habitId: completion.habitId
      }))
    }
  })
})

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1)
}

const hasRecords = (day: any) => {
  return (day.moods?.length > 0 || day.habits?.length > 0)
}

const getDayClasses = (day: any) => {
  const baseClasses = "relative group cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
  
  if (hasRecords(day)) {
    return `${baseClasses} bg-purple-50 dark:bg-purple-900/20`
  }
  
  return baseClasses
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 h-full flex flex-col">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold">
        {{ format(currentDate, 'MMMM yyyy') }}
      </h3>
      <div class="flex gap-2">
        <button
          @click="previousMonth"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          ←
        </button>
        <button
          @click="nextMonth"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          →
        </button>
      </div>
    </div>

    <div class="grid grid-cols-7 gap-2 flex-1">
      <div
        v-for="day in calendarDays"
        :key="format(day.date, 'yyyy-MM-dd')"
        class="aspect-square rounded-lg relative group"
        :class="getDayClasses(day)"
      >
        <div class="p-2">
          <span class="text-sm font-medium block">
            {{ format(day.date, 'EEE') }}
          </span>
          <span class="text-xs block">
            {{ format(day.date, 'd') }}
          </span>
        </div>

        <!-- Tooltip -->
        <div 
          class="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded shadow-lg text-sm whitespace-nowrap z-10 mb-2"
        >
          <div v-if="day.moods?.length" class="mb-2">
            <div v-for="mood in day.moods" :key="mood.id" class="flex items-center gap-2">
              <span>{{ ['😢','😔','😠','😡','😐','🙂','😊','😄'][mood.mood] }}</span>
              <span class="text-xs">{{ mood.note }}</span>
            </div>
          </div>
          
          <div v-if="day.habits?.length" class="border-t border-gray-700 pt-2 mt-2">
            <div v-for="habit in day.habits" :key="habit.id" class="text-xs flex items-center gap-1">
              <span class="text-green-400">✓</span>
              <span>{{ habitStore.habits.find(h => h.id === habit.habitId)?.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>