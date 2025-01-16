import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface MoodEntry {
  id: string
  mood: number
  note: string
  timestamp: Date | number
}

export const useMoodStore = defineStore('mood', () => {
  const moodEntries = ref<MoodEntry[]>([])
  
  function addMoodEntry(mood: number, note: string) {
    const now = new Date()
    const brazilTime = now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
    const timestamp = new Date(brazilTime).getTime()

    const entry: MoodEntry = {
      id: crypto.randomUUID(),
      mood,
      note,
      timestamp
    }
    moodEntries.value.push(entry)
  }

  function addMoodEntryWithPastDate(mood: number, note: string, daysAgo: number) {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - daysAgo); // Subtrai 'daysAgo' dias da data atual
  
    const entry: MoodEntry = {
      id: crypto.randomUUID(),
      mood,
      note,
      timestamp: pastDate,
    };
    moodEntries.value.push(entry)
  }

  function getMoodEntries() {
    return moodEntries.value
  }

  return {
    moodEntries,
    addMoodEntry,
    getMoodEntries,
    addMoodEntryWithPastDate,
  }
})