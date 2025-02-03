<script setup lang="ts">
import { ref } from 'vue'

const tagInput = ref('')
const tags = ref<string[]>([])

const addTag = () => {
  if (tagInput.value.trim()) {
    tags.value.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

const removeTag = (tag: string) => {
  // const newTags = props.tags.filter(t => t !== tag)
  // habitStore.updateHabitTags(props.habitId, newTags)
  console.log(tag)
}
</script>

<template>
  <div>
    <div class="flex flex-wrap gap-2 mb-2">
      <span
        v-for="tag in tags"
        :key="tag"
        class="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded px-2 py-1 text-sm flex items-center gap-1"
      >
        {{ tag }}
        <button
          @click="removeTag(tag)"
          class="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
        >
          ×
        </button>
      </span>
    </div>
    <div class="flex gap-2">
      <input
        v-model="tagInput"
        type="text"
        class="flex-1 rounded-lg bg-transparent"
        @keyup.enter="addTag"
        :placeholder="$t('habits.addTag')"
      />
      <button
        @click="addTag"
        class="btn-primary text-sm px-3"
      >
        +
      </button>
    </div>
  </div>
</template>