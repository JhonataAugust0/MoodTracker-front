import { defineStore } from 'pinia'
import { ref } from 'vue'
import ApiService from '../integrations/backend/apiService'
import type { Mood, CreateMoodDto } from '../types/api'

const apiService = ApiService 


export const useMoodStore = defineStore('mood', () => {
  const moodEntries = ref<Mood[]>([])
  
  async function addMoodEntry(moodType: string, intensity: number, notes: string, timeZone: string, tagIds: number[] = []) {
    let localUserDate = new Date().toLocaleString('en-CA', { timeZone: timeZone }); 
    localUserDate = localUserDate.replace(', ', 'T').split(' ')[0] + ':00.35.993Z'

    const entry: CreateMoodDto = {
      moodType,
      intensity,
      notes,
      tagIds,
    }
    
    try {
      await apiService.createMood(entry)
      await fetchMoods() 
    } catch (error) {
      console.error('Erro ao salvar humor:', error)
    }
  }

  async function fetchMoods() {
    try {
      const moods = await ApiService.getMoods()
      moodEntries.value = moods
    } catch (error) {
      console.error('Erro ao buscar registros de humor:', error)
    }
  }

  function getMoodEntries() {
    return moodEntries.value
  }

  return {
    moodEntries,
    addMoodEntry,
    getMoodEntries,
    fetchMoods
  }
})