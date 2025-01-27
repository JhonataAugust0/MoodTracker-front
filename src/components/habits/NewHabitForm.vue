<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CreateHabitDto, HabitFrequency } from '../../types/api';

const { t } = useI18n()

const frequencyType = ref<HabitFrequency>(HabitFrequency.DAILY)
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', habit: CreateHabitDto): void
}>()

const frequencies = [
  { value: HabitFrequency.DAILY, labelKey: 'habits.frequency.daily' },
  { value: HabitFrequency.WEEKLY, labelKey: 'habits.frequency.weekly' },
  { value: HabitFrequency.MONTHLY, labelKey: 'habits.frequency.monthly' },
  { value: HabitFrequency.YEARLY, labelKey: 'habits.frequency.yearly' },
  { value: HabitFrequency.CUSTOM, labelKey: 'habits.frequency.custom' }
]

const name = ref('')
const description = ref('')
const color = ref('#6366f1')
const frequencyTarget = ref(1)

const save = () => {
  emit('save', {
    name: name.value,
    description: description.value,
    FrequencyType: frequencyType.value,
    color: color.value,
    frequencyTarget: frequencyTarget.value,
  })
  emit('close')
}

const getMaxDays = computed(() => {
  return frequencyType.value === 2 ? 7 : 31
})
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
      <h3 class="text-xl font-bold mb-4">{{ t('habits.new') }}</h3>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('habits.name') }}</label>
          <input
            v-model="name"
            type="text"
            class="w-full rounded-lg"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ t('habits.frequency.label') }}</label>
          <select
            v-model="frequencyType"
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option
              v-for="freq in frequencies"
              :key="freq.value"
              :value="freq.value"
            >
              {{ t(freq.labelKey) }}
            </option>
          </select>
        </div>

        <select
          v-if="[HabitFrequency.WEEKLY, HabitFrequency.MONTHLY].includes(frequencyType)"
          v-model="frequencyTarget"
          class="w-1/2 p-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          <option
            v-for="n in getMaxDays"
            :key="n"
            :value="n"
          >
            {{ n }}
          </option>
        </select>

        <div>
          <label class="block text-sm font-medium mb-1">{{ t('habits.description') }}</label>
          <textarea
            v-model="description"
            class="w-full rounded-lg"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ t('habits.color') }}</label>
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
          class="btn bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-400"
        >
        {{ t('buttons.cancel') }}
      </button>
      <button
        @click="save"
        class="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
        {{ t('buttons.save') }}
        </button>
      </div>
    </div>
  </div>
</template>