<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted, onUnmounted, ref } from 'vue'
import MoodTracker from '../components/MoodTracker.vue'
import QuickNotes from '../components/notes/QuickNotes.vue'
import MoodChart from '../components/analytics/MoodChart.vue'
import HabitTracker from '../components/habits/HabitTracker.vue'
import ToastNotification from '../components/ToastNotification.vue'
import HabitProgress from '../components/analytics/HabitProgress.vue'
import { useNotifications } from '../composables/notifications'
import { useAuthStore } from '../stores/auth'
import { useApiWithTimeout } from '../composables/timeoutHandler'


const { t } = useI18n()
const authStore = useAuthStore()
const { connection, initSignalR, fetchPendingNotifications, setToastRef } = useNotifications()
const { fetchWithTimeout } = useApiWithTimeout(30000, 2)
const toastNotificationRef = ref()

onMounted(async () => {
  await authStore.initialize();
  if (authStore.isAuthenticated) {
    setToastRef(toastNotificationRef.value)
    
    await Promise.all([
      fetchWithTimeout(() => initSignalR()),
      fetchWithTimeout(() => fetchPendingNotifications())
    ])
  }
})

onUnmounted(async () => {
  if (connection.value) {
    await connection.value.stop()
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <ToastNotification ref="toastNotificationRef" />
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-white">{{ t(`dashboard.yourDashboard`) }}</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MoodTracker />
      <HabitTracker />
      <QuickNotes />
      <div class="space-y-6">
        <MoodChart />
        <HabitProgress />
      </div>
    </div>
  </div>
</template>