<!-- src/components/notes/NoteList.vue -->
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { Note } from '../../stores/note'
import { useNoteStore } from '../../stores/note'
import { useApiWithTimeout } from '../../composables/timeoutHandler'
import { useAuthStore } from '../../stores/auth'

const props = defineProps<{
  notes: Note[]
}>()

const noteStore = useNoteStore()
const authStore = useAuthStore()
const { fetchWithTimeout } = useApiWithTimeout(30000, 2)

const sortedNotes = computed(() => {
  return [...props.notes].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
})

const handleInput = (e: Event, note: Note) => {
  const target = e.target as HTMLInputElement;
  if (target) {
    noteStore.updateNote(note.id, target.value);
  }
};

onMounted(async () => {
  await authStore.initialize()
  if (authStore.isAuthenticated) {
    await fetchWithTimeout(() => noteStore.fetchNotes())
  }
})
</script>

<template>
  <div v-if="noteStore.isLoading" class="text-center py-4">
    <span class="text-gray-500">Carregando notas...</span>
  </div>
  
  <div v-else-if="noteStore.error" class="text-center py-4">
    <span class="text-red-500">{{ noteStore.error }}</span>
  </div>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div
      v-for="note in sortedNotes"
      :key="note.id"
      class="p-4 rounded-lg"
      :style="{ backgroundColor: note.color }"
    >
      <textarea
        :value="note.content"
        @input="(e) => handleInput(e, note)"
        class="w-full bg-transparent resize-none"
        rows="4"
      ></textarea>
      <div class="flex justify-between items-center mt-2">
        <div class="flex gap-2">
          <span
            v-for="tag in note.tags"
            :key="tag.id"
            class="text-xs bg-white bg-opacity-50 rounded px-2 py-1"
          >
            {{ tag.name }}
          </span>
        </div>
        <button
          @click="noteStore.deleteNote(note.id)"
          class="text-red-600 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>