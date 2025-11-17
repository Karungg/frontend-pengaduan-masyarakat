import { apiClient } from '@/config/api'

export interface Category {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface CategoryListResponse {
  code: number
  status: string
  message?: string
  data: Category[]
}

export interface CategorySingleResponse {
  code: number
  status: string
  message?: string
  data: Category
}

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<CategoryListResponse>('/categories')
  return response.data.data
}

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await apiClient.get<CategorySingleResponse>(
    `/categories/${id}`
  )
  return response.data.data
}

export const createCategory = async (
  data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Category> => {
  const response = await apiClient.post<CategorySingleResponse>(
    '/categories',
    data
  )
  return response.data.data
}

export const updateCategory = async ({
  id,
  data,
}: {
  id: string
  data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>
}): Promise<Category> => {
  const response = await apiClient.put<CategorySingleResponse>(
    `/categories/${id}`,
    data
  )
  return response.data.data
}

export const deleteCategory = async (id: string): Promise<void> => {
  const response = await apiClient.delete<void>(`/categories/${id}`)
  return response.data
}
