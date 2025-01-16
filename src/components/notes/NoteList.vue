<script setup lang="ts">
import { computed } from 'vue'
import type { Note } from '../../stores/note'
import { useNoteStore } from '../../stores/note'

const props = defineProps<{
  notes: Note[]
}>()

const noteStore = useNoteStore()

const sortedNotes = computed(() => {
  return [...props.notes].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div
      v-for="note in sortedNotes"
      :key="note.id"
      class="p-4 rounded-lg"
      :style="{ backgroundColor: note.color }"
    >
      <textarea
        :value="note.content"
        @input="e => noteStore.updateNote(note.id, (e.target as HTMLTextAreaElement).value)"
        class="w-full bg-transparent resize-none"
        rows="4"
      ></textarea>
      <div class="flex justify-between items-center mt-2">
        <div class="flex gap-2">
          <span
            v-for="tag in note.tags"
            :key="tag"
            class="text-xs bg-white bg-opacity-50 rounded px-2 py-1"
          >
            {{ tag }}
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