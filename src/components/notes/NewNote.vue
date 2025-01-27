<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', content: string, color: string, tags: string[]): void
}>()

const content = ref('')
const color = ref('#ffffff')
const tagInput = ref('')
const tags = ref<string[]>([])

const addTag = () => {
  if (tagInput.value.trim()) {
    tags.value.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

const save = () => {
  emit('save', content.value, color.value, tags.value)
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
      <h3 class="text-xl font-bold mb-4">{{ t('notes.label') }}</h3>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('notes.content') }}</label>
          <textarea
            v-model="content"
            class="w-full rounded-lg"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ t('notes.color') }}</label>
          <input
            v-model="color"
            type="color"
            class="w-full rounded-lg"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Tags</label>
          <div class="flex gap-2 mb-2">
            <span
              v-for="tag in tags"
              :key="tag"
              class="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 text-sm"
            >
              {{ tag }}
            </span>
          </div>
          <div class="flex gap-2">
            <input
              v-model="tagInput"
              type="text"
              class="flex-1 rounded-lg"
              @keyup.enter="addTag"
            />
            <button
              @click="addTag"
              class="btn-primary bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
            {{ t('notes.addTag') }}
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-4 mt-6">
        <button
          @click="emit('close')"
          class="btn bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-400"
        >
        {{ t('buttons.cancel') }}
        </button>
        <button
          @click="save"
          class="btn-primary bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
        {{ t('buttons.save') }}
        </button>
      </div>
    </div>
  </div>
</template>