<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useApiWithTimeout } from '../../composables/timeoutHandler'
import { useMoodStore } from '../../stores/mood'
import MaximizedView from './MaximizedView.vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const moodStore = useMoodStore()
const showMaximized = ref(false)

const { t } = useI18n()
const hoveredBar = ref<{ date: string, mood: number } | null>(null)
const { fetchWithTimeout, isLoading } = useApiWithTimeout(30000, 2)

const moods = [
  { value: 0, emoji: '😢', label: 'Very Sad' },
  { value: 1, emoji: '😔', label: 'Sad' },
  { value: 2, emoji: '😠', label: 'angry' },
  { value: 3, emoji: '😡', label: 'very angry' },
  { value: 4, emoji: '😐', label: 'Neutral' },
  { value: 5, emoji: '🙂', label: 'Good' },
  { value: 6, emoji: '😊', label: 'Very Good' },
  { value: 7, emoji: '😄', label: 'Excellent' }
]


onMounted(async () => {
  await authStore.initialize()
  if (authStore.isAuthenticated) {
    await fetchWithTimeout(() => moodStore.fetchMoods())
  }
})

const moodData = computed(() => {
  const entries = moodStore.moodEntries;
  
  const groupedEntries = entries.reduce((acc: { [key: string]: any }, entry) => {
    const date = new Date(entry.timestamp).toISOString().split(":")[0] + ":00:00"; 
    if (!acc[date]) {
      acc[date] = {
        frequencies: [0, 0, 0, 0, 0, 0, 0], 
        notes: [[], [], [], [], [], [], []] 
      };
    }
    
    if (entry.intensity !== undefined && entry.intensity >= 0 && entry.intensity <= 6) {
      acc[date].frequencies[entry.intensity]++;
      if (entry.notes) {
        acc[date].notes[entry.intensity].push(entry.notes);
      }
    } else {
      console.warn('Intensidade inválida encontrada:', entry);
    }
    
    return acc;
  }, {});

  return Object.keys(groupedEntries).map(date => ({
    date,
    moodFrequencies: groupedEntries[date].frequencies,
    moodNotes: groupedEntries[date].notes
  }));
});

const calculateBarHeight = (frequency: number) => {
  if (frequency === 0) return 0;
  return frequency * 2; // 2rem per occurrence
};

const gridLines = Array.from({ length: 4 }, (_, i) => i + 1);

const getMoodEmoji = (moodIndex: number) => {
  return moods[moodIndex]?.emoji || '';
};

const getMoodLabel = (moodIndex: number) => {
  return moods[moodIndex]?.label || '';
};
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative">
    
    <div v-if="isLoading" class="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
    </div>

    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ t(`dashboard.moodLog`) }}</h2>
      <button
        @click="showMaximized = true"
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Maximize"
      >
        ⛶
      </button>
    </div>
    
    <div class="absolute inset-x-6 bottom-16 h-64">
      <div
        v-for="line in gridLines"
        :key="line"
        class="absolute w-full border-t border-gray-200 dark:border-gray-700"
        :style="{ bottom: `${(line / 5) * 100}%` }"
      />
    </div>

    <div class="h-64 flex items-end justify-between gap-2 relative">
      <div
        v-for="day in moodData"
        :key="day.date"
        class="flex-1 flex flex-col items-center justify-end h-full"
      >
        <div class="relative w-full flex flex-col items-center justify-end h-full">
          <div
            v-for="(frequency, mood) in day.moodFrequencies"
            :key="mood"
            class="w-3/5 bg-purple-600 rounded-sm transition-all duration-300 mb-px relative group"
            :style="{
              height: `${calculateBarHeight(frequency)}rem`,
              opacity: frequency > 0 ? 0.6 + (mood / day.moodFrequencies.length) * 0.4 : 0
            }"
            @mouseenter="hoveredBar = { date: day.date, mood: mood }"
            @mouseleave="hoveredBar = null"
          >
            <div
              v-if="hoveredBar?.date === day.date && hoveredBar?.mood === mood && frequency > 0"
              class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded shadow-lg text-sm whitespace-nowrap z-10"
            >
              <div class="text-center mb-1">
                {{ getMoodEmoji(mood) }} {{ getMoodLabel(mood) }}
              </div>
              <div v-for="(note, index) in day.moodNotes[mood]" :key="index" class="text-xs">
                "{{ note }}"
              </div>
              <div class="text-xs text-gray-300 mt-1">
                Count: {{ frequency }}
              </div>
            </div>
          </div>
        </div>
        <div class="text-sm mt-2 text-gray-600 dark:text-gray-300">
          {{ new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'short' }) }}
        </div>
      </div>
    </div>

    <MaximizedView
      v-if="showMaximized"
      :show="showMaximized"
      initial-view="calendar"
      component="mood"
      @close="showMaximized = false"
    />
  </div>
</template>