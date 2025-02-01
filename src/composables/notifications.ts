import { ref } from 'vue'
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr'
import { useAuthStore } from '../stores/auth'
import ApiService from '../integrations/backend/apiService'
import Cookies from 'js-cookie'
import { storeToRefs } from 'pinia'

const toastRef = ref()


export const useNotifications = () => {
  const connection = ref<HubConnection | null>(null)
  const auth = useAuthStore()
  
  const initSignalR = async () => {
    if (!auth.isAuthenticated) return;
  
    try {
      connection.value = new HubConnectionBuilder()
        .withUrl(`http://localhost:5000/notificationHub`, {
          accessTokenFactory: () => {
            const token = Cookies.get('auth_token');
            return token ? `${token}` : '';
          }
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            return Math.random() * 5000 + 2000;
          }
        })
        .build();
  
      connection.value.on('ReceiveNotification', (message: string) => {
        toastRef.value?.showToast(message);
      });
  
      await connection.value.start();
    } catch (error) {
      console.error('Erro na conexão SignalR:', error);
    }
  };

  const fetchPendingNotifications = async () => {
    try {
      const userId = Cookies.get('userId')
      if (!userId) {
        console.error('UserId não disponível')
        return
      }
      
      const notifications = await ApiService.getNotifications(parseInt(userId))
      
      if (Array.isArray(notifications)) {
        notifications.forEach(message => {
          if (toastRef.value) {
            setTimeout(() => {
              toastRef.value.showToast(message)
            }, 300)
          }
        })
      }
    } catch (error) {
      console.error('Erro ao buscar notificações:', error)
    }
  }

  const setToastRef = (ref: any) => {
    toastRef.value = ref
  }

  return {
    connection,
    initSignalR,
    fetchPendingNotifications,
    setToastRef
  }
}