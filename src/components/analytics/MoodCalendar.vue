<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMoodStore } from '../../stores/mood'
import { useHabitStore } from '../../stores/habit'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns'

const props = defineProps<{
  moodData?: any[]
  habitData?: any[]
}>()

const moodStore = useMoodStore()
const habitStore = useHabitStore()
const currentDate = ref(new Date())

const calendarDays = computed(() => {
  const start = startOfMonth(currentDate.value)
  const end = endOfMonth(currentDate.value)
  const days = eachDayOfInterval({ start, end })

  return days.map(day => {
    const dayMoods = moodStore.moodEntries.filter(entry => 
      isSameDay(new Date(entry.timestamp), day)
    )
    
    const dayHabits = habitStore.habitChecks.filter(check =>
      isSameDay(new Date(check.completedAt), day)
    )

    const avgMood = dayMoods.length
      ? dayMoods.reduce((sum, entry) => sum + entry.mood, 0) / dayMoods.length
      : null

    return {
      date: day,
      moods: dayMoods,
      habits: dayHabits,
      avgMood
    }
  })
})

const getMoodColor = (mood: number | null) => {
  if (mood === null) return 'bg-gray-100 dark:bg-gray-700'
  const colors = [
    'bg-red-200',
    'bg-orange-200',
    'bg-yellow-200',
    'bg-green-200',
    'bg-blue-200',
    'bg-purple-200'
  ]
  return colors[Math.floor(mood)]
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1)
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
        :class="[getMoodColor(day.avgMood)]"
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
          <div v-if="day.moods.length" class="mb-2">
            <div v-for="mood in day.moods" :key="mood.id" class="flex items-center gap-2">
              <span>{{ ['😢', '😔', '😐', '🙂', '😊', '😄'][mood.mood] }}</span>
              <span class="text-xs">{{ mood.note }}</span>
            </div>
          </div>
          
          <div v-if="day.habits.length">
            <div v-for="habit in day.habits" :key="habit.id" class="text-xs">
              ✓ {{ habitStore.habits.find(h => h.id === habit.habitId)?.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>