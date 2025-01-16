import { defineStore } from 'pinia'

export const useMockDataStore = defineStore('mockData', () => {
  const generateMockMoodData = () => {
    const today = new Date()
    const data = []
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      data.push({
        id: crypto.randomUUID(),
        mood: Math.floor(Math.random() * 5),
        note: 'Mock mood entry',
        timestamp: date
      })
    }
    
    return data
  }

  const generateMockHabits = () => {
    return [
      {
        id: crypto.randomUUID(),
        name: 'Exercise',
        description: 'Daily workout routine',
        frequency: 'daily',
        color: '#4CAF50',
        tags: ['health', 'fitness'],
        createdAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        name: 'Reading',
        description: 'Read for 30 minutes',
        frequency: 'daily',
        color: '#2196F3',
        tags: ['learning', 'personal'],
        createdAt: new Date()
      }
    ]
  }

  return {
    generateMockMoodData,
    generateMockHabits
  }
})