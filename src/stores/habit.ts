import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Habit {
  id: string
  name: string
  description: string
  frequency: 'daily' | 'weekly' | 'monthly'
  color: string
  tags: string[]
  createdAt: Date
}

export interface HabitCheck {
  id: string
  habitId: string
  completedAt: Date
}

export const useHabitStore = defineStore('habit', () => {
  const habits = ref<Habit[]>([])
  const habitChecks = ref<HabitCheck[]>([])

  const addHabit = (habit: Omit<Habit, 'id' | 'createdAt'>) => {
    habits.value.push({
      ...habit,
      id: crypto.randomUUID(),
      createdAt: new Date()
    })
  }

  const updateHabitTags = (habitId: string, tags: string[]) => {
    const habit = habits.value.find(h => h.id === habitId)
    if (habit) {
      habit.tags = tags
    }
  }

  const checkHabit = (habitId: string) => {
    habitChecks.value.push({
      id: crypto.randomUUID(),
      habitId,
      completedAt: new Date()
    })
  }

  const getHabitProgress = (habitId: string) => {
    return habitChecks.value.filter(check => check.habitId === habitId).length
  }

  return {
    habits,
    habitChecks,
    addHabit,
    updateHabitTags,
    checkHabit,
    getHabitProgress
  }
})