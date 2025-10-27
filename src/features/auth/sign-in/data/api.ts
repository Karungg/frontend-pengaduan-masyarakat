import { apiClient } from '@/config/api'
import type { Login } from './schema'

export interface LoginResponse {
  code: number
  status: string
  message: string
  data: {
    token: string
    expiredTime: string
  }
}

export const login = async (data: Login): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', data)
  return response.data
}
