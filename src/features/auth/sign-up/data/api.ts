import { apiClient } from '@/config/api'
import type { Register } from './schema'

export interface RegisterResponse {
  code: number
  status: string
  message: string
  data: {
    id: string
    email: string
    username: string
  }
}

export const register = async (data: Register): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>(
    '/auth/register',
    data
  )
  return response.data
}
