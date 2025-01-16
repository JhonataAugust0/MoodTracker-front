<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import MoodTracker from '../components/MoodTracker.vue'
import HabitTracker from '../components/habits/HabitTracker.vue'
import QuickNotes from '../components/notes/QuickNotes.vue'
import MoodChart from '../components/analytics/MoodChart.vue'
import HabitProgress from '../components/analytics/HabitProgress.vue'

const { t } = useI18n()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
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