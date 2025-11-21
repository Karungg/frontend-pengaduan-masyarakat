import { apiClient } from '@/config/api'
import { type CategoryForm, type Category } from './schema'

export interface CategoryListResponse {
  code: string
  status: string
  message: string
  data: Category[]
}

export interface CategoryResponse {
  code: string
  status: string
  message: string
  data: Category
}

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<CategoryListResponse>('/categories')
  return response.data.data
}

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await apiClient.get<CategoryResponse>(`/categories/${id}`)

  return response.data.data
}

export const createCategory = async (data: CategoryForm): Promise<Category> => {
  const response = await apiClient.post<CategoryResponse>('/categories', data)
  return response.data.data
}

export const updateCategory = async ({
  id,
  data,
}: {
  id: string
  data: CategoryForm
}): Promise<Category> => {
  const response = await apiClient.put<CategoryResponse>(
    `/categories/${id}`,
    data
  )
  return response.data.data
}

export const deleteCategory = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/categories/${id}`)
}
