<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNoteStore } from '../../stores/note'
import NoteList from './NoteList.vue'
import NewNote from './NewNote.vue'

const { t } = useI18n()
const noteStore = useNoteStore()
const showNewNote = ref(false)
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ t(`dashboard.quickNotes`) }}</h2>
      <button
        @click="showNewNote = true"
        class="btn-primary bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-700 transition-colors"
      >
        {{ t(`landing.features.mood.saveEntry`) }}
      </button>
    </div>

    <NoteList :notes="noteStore.notes" />
    
    <NewNote
      v-if="showNewNote"
      @close="showNewNote = false"
      @save="noteStore.addNote"
    />
  </div>
</template>