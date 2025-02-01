<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup 
      name="notification"
      tag="div"
      class="space-y-2"
    >
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="bg-white border border-purple-200 text-gray-700 rounded-lg shadow-lg max-w-md transform transition-all duration-300 dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <div class="p-4">
          <div class="flex justify-between items-start dark:text-white">
            <span>{{ message }}</span>
            <button
              @click="removeMessage(message)"
              class="ml-2 text-gray-400 hover:text-gray-600 transition-colors dark:text-white"
            >
              ×
            </button>
          </div>
          <div class="mt-3 flex justify-end">
            <button
              @click="markAsRead()"
              class="px-2 py-1 text-xs bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors font-medium"
            >
              marcar como lido
            </button>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import apiService from '../integrations/backend/apiService'

const messages = ref<string[]>([])

const showToast = (message: string) => {
  if (!messages.value.includes(message)) {
    messages.value.push(message)
    setTimeout(() => removeMessage(message), 5000)
  }
}

const removeMessage = (message: string) => {
  const index = messages.value.indexOf(message)
  if (index > -1) {
    messages.value.splice(index, 1)
  }
}

const markAsRead = async () => {
  try {
    await apiService.markNotificationAsRead();
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error)
  }
}

defineExpose({ showToast })
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>