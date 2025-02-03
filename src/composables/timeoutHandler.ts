import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useApiWithTimeout(timeoutMs = 15000, retries = 2) {
  const router = useRouter()
  const isLoading = ref(false)
  const error = ref<unknown | null>(null)

  async function fetchWithTimeout<T>(apiCall: () => Promise<T>): Promise<T | null> {
    isLoading.value = true
    error.value = null
    let attempts = 0

    while (attempts <= retries) {
      try {
        const result = await Promise.race([
          apiCall(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Tempo limite excedido')), timeoutMs)
          )
        ]) as T

        isLoading.value = false
        return result
      } catch (e) {
        attempts++
        if (attempts > retries) {
          error.value = e
          isLoading.value = false
          router.push('/500')
          return null
        }
        // Espera 2 segundos antes de tentar novamente
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }
    return null
  }

  return {
    fetchWithTimeout,
    isLoading,
    error
  }
}