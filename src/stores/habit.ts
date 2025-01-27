import { defineStore } from 'pinia'
import { ref } from 'vue'
import ApiService from '../integrations/backend/apiService'
import type { Habit, CreateHabitDto, HabitCompletion } from '../types/api'

const apiService = ApiService

export const useHabitStore = defineStore('habit', () => {
  const habits = ref<Habit[]>([])
  const habitCompletions = ref<HabitCompletion[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchHabits() {
    isLoading.value = true
    try {
      const response = await apiService.getHabits()
      habits.value = response
      await Promise.all(habits.value.map(habit => fetchHabitCompletions(habit.id)))
    } catch (err) {
      error.value = 'Erro ao carregar hábitos'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchHabitCompletions(habitId: number) {
    try {
      const completions = await apiService.getHabitHistory(habitId)
      habitCompletions.value = [
        ...habitCompletions.value.filter(c => c.habitId !== habitId),
        ...completions
      ]
    } catch (err) {
      error.value = 'Erro ao carregar histórico do hábito'
      console.error(err)
    }
  }

  async function addHabit(habitData: CreateHabitDto) {
    try {
      const newHabit = await apiService.createHabit(habitData)
      habits.value.push(newHabit)
    } catch (err) {
      error.value = 'Erro ao criar hábito'
      console.error(err)
    }
  }

  async function checkHabit(habitId: number) {
    try {
      const completion = await apiService.logHabitCompletion(
        habitId,
        new Date().toISOString()
      )
      habitCompletions.value.push(completion)
    } catch (err) {
      error.value = 'Erro ao registrar conclusão'
      console.error(err)
    }
  }

  function getHabitProgress(habitId: number) {
    return habitCompletions.value.filter(c => c.habitId === habitId).length
  }

  return {
    habits,
    habitCompletions,
    isLoading,
    error,
    fetchHabits,
    addHabit,
    checkHabit,
    getHabitProgress,
    fetchHabitCompletions
  }
})