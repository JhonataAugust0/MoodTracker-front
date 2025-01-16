<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', habit: { name: string; description: string; frequency: 'daily' | 'weekly' | 'monthly'; color: string }): void
}>()

const name = ref('')
const description = ref('')
const frequency = ref<'daily' | 'weekly' | 'monthly'>('daily')
const color = ref('#6366f1')

const save = () => {
  emit('save', {
    name: name.value,
    description: description.value,
    frequency: frequency.value,
    color: color.value
  })
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
      <h3 class="text-xl font-bold mb-4">New Habit</h3>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Name</label>
          <input
            v-model="name"
            type="text"
            class="w-full rounded-lg"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea
            v-model="description"
            class="w-full rounded-lg"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Frequency</label>
          <select
            v-model="frequency"
            class="w-full rounded-lg"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Color</label>
          <input
            v-model="color"
            type="color"
            class="w-full rounded-lg"
          />
        </div>
      </div>

      <div class="flex justify-end space-x-4 mt-6">
        <button
          @click="emit('close')"
          class="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="save"
          class="btn-primary"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>