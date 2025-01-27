// src/stores/note.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { QuickNote, CreateQuickNoteDto } from '../types/api'
import ApiService from '../integrations/backend/apiService'

export interface Note extends QuickNote {
  color: string
}

export const useNoteStore = defineStore('note', () => {
  const notes = ref<Note[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchNotes = async () => {
    isLoading.value = true
    error.value = null
    try {
      const apiNotes = await ApiService.getQuickNotes()
      notes.value = apiNotes.map(note => ({
        ...note,
        color: note.tags?.[0]?.color || '#ffffff'
      }))
    } catch (err) {
      error.value = 'Erro ao carregar notas'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const addNote = async (content: string, color: string = '#ffffff', tags: string[] = []) => {
    try {
      const noteData: CreateQuickNoteDto = {
        content,
        tagIds: tags.map(tag => parseInt(tag))
      }
      const newNote = await ApiService.createQuickNote(noteData)
      notes.value.push({
        ...newNote,
        color
      })
    } catch (err) {
      error.value = 'Erro ao criar nota'
      console.error(err)
    }
  }

  const updateNote = async (id: number, content: string) => {
    try {
      const noteData: CreateQuickNoteDto = {
        content
      }
      await ApiService.updateQuickNote(id, noteData)
      const note = notes.value.find(n => n.id === id)
      if (note) {
        note.content = content
        note.updatedAt = new Date().toISOString()
      }
    } catch (err) {
      error.value = 'Erro ao atualizar nota'
      console.error(err)
    }
  }

  const deleteNote = async (id: number) => {
    try {
      await ApiService.deleteQuickNote(id)
      notes.value = notes.value.filter(n => n.id !== id)
    } catch (err) {
      error.value = 'Erro ao deletar nota'
      console.error(err)
    }
  }

  return {
    notes,
    isLoading,
    error,
    fetchNotes,
    addNote,
    updateNote,
    deleteNote
  }
})