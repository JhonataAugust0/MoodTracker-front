import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Note {
  id: string
  content: string
  color: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export const useNoteStore = defineStore('note', () => {
  const notes = ref<Note[]>([])

  const addNote = (content: string, color: string = '#ffffff', tags: string[] = []) => {
    const now = new Date()
    notes.value.push({
      id: crypto.randomUUID(),
      content,
      color,
      tags,
      createdAt: now,
      updatedAt: now
    })
  }

  const updateNote = (id: string, content: string) => {
    const note = notes.value.find(n => n.id === id)
    if (note) {
      note.content = content
      note.updatedAt = new Date()
    }
  }

  const deleteNote = (id: string) => {
    notes.value = notes.value.filter(n => n.id !== id)
  }

  return {
    notes,
    addNote,
    updateNote,
    deleteNote
  }
})