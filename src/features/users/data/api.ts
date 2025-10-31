import { apiClient } from '@/config/api'
import { type UserForm, type User } from './schema'

export interface UserListResponse {
  code: string
  status: string
  message: string
  data: User[]
}

export interface UserResponse {
  code: string
  status: string
  message: string
  data: User
}

export const getAllUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<UserListResponse>('/users?role=USER')
  return response.data.data
}

export const createUser = async (data: UserForm): Promise<User> => {
  const { confirmPassword, isEdit, ...payload } = data

  const response = await apiClient.post<UserResponse>('/users', payload)
  return response.data.data
}

export const updateUser = async ({
  id,
  data,
}: {
  id: string
  data: UserForm
}): Promise<User> => {
  const { confirmPassword, isEdit, ...payload } = data

  const response = await apiClient.put<UserResponse>(`/users/${id}`, payload)
  return response.data.data
}

export const deleteUser = async (id: string): Promise<void> => {
  const response = await apiClient.delete<void>(`/users/${id}`)
  return response.data
}
