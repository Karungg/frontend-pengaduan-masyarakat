import { apiClient } from '@/config/api'
import { type Admin } from './schema'

export interface AdminResponse {
  code: string
  status: string
  message: string
  data: Admin[]
}

export const getAllUsers = async (): Promise<Admin[]> => {
  const response = await apiClient.get<AdminResponse>('/users?role=ADMIN')
  return response.data.data
}
