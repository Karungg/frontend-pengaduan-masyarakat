import { apiClient } from '@/config/api'
import { type AdminForm, type Admin } from './schema'

export interface AdminResponse {
  code: string
  status: string
  message: string
  data: Admin[]
}

export interface SingleAdminResponse {
  code: string
  status: string
  message: string
  data: Admin
}

export const getAllUsers = async (): Promise<Admin[]> => {
  const response = await apiClient.get<AdminResponse>('/users?role=ADMIN')
  return response.data.data
}

export const createUser = async (data: AdminForm): Promise<Admin> => {
  const { confirmPassword, isEdit, ...payload } = data

  const response = await apiClient.post<SingleAdminResponse>('/users', payload)
  return response.data.data
}

export const updateUser = async ({
  id,
  data,
}: {
  id: string
  data: AdminForm
}): Promise<Admin> => {
  const { confirmPassword, isEdit, ...payload } = data

  const response = await apiClient.put<SingleAdminResponse>(
    `/users/${id}`,
    payload
  )
  return response.data.data
}

export const deleteAdmin = async (id: string): Promise<void> => {
  const response = await apiClient.delete<void>(`/users/${id}`)
  return response.data
}
