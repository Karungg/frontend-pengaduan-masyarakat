import axios from 'axios'
import { useAuthStore } from '@/stores/auth-store'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState().auth

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      const { reset } = useAuthStore.getState().auth
      reset()
    }
    return Promise.reject(error)
  }
)
