import { ref } from 'vue'

export interface Feature {
  icon: string;
  key: string;
  gradient: string;
}


export function useFeatures() {
  const features = ref<Feature[]>([
    {
      icon: '🎯',
      key: 'mood',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: '⭐',
      key: 'habits',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      icon: '📝',
      key: 'notes',
      gradient: 'from-green-600 to-blue-600'
    },
    {
      icon: '📊',
      key: 'analytics',
      gradient: 'from-pink-600 to-orange-600'
    }
  ])

  return {
    features
  }
}
