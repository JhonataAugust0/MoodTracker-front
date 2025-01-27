<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHabitStore } from '../../stores/habit'
import HabitList from './HabitList.vue'
import NewHabitForm from './NewHabitForm.vue'

const { t } = useI18n()
const showNewHabitForm = ref(false)
const habitStore = useHabitStore()

onMounted(async () => {
  await habitStore.fetchHabits()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ t(`dashboard.habits`) }}</h2>
      <button
        @click="showNewHabitForm = true"
        class="btn-primary bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-700 transition-colors"
      >
        {{ t(`landing.features.habits.addHabit`) }}
      </button>
    </div>
    <div v-if="habitStore.isLoading" class="flex justify-center">
      <span class="loading">Loading...</span>
    </div>
    <HabitList :habits="habitStore.habits" />
    
    <NewHabitForm
      v-if="showNewHabitForm"
      @close="showNewHabitForm = false"
      @save="habitStore.addHabit"
    />
  </div>
</template>