import axios from 'axios'
import { toast } from 'sonner'

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
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')

      toast.error('Sesi Anda telah berakhir. Silakan login kembali.')

      window.location.href = '/sign-in'
    }

    return Promise.reject(error)
  }
)
