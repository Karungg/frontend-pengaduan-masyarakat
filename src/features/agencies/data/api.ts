import { apiClient } from '@/config/api'
import { type AgencyForm, type Agency } from './schema'

export interface AgencyListResponse {
  code: string
  status: string
  message: string
  data: Agency[]
}

export interface AgencyResponse {
  code: string
  status: string
  message: string
  data: Agency
}

export const getAllAgencies = async (): Promise<Agency[]> => {
  const response = await apiClient.get<AgencyListResponse>('/agencies')
  return response.data.data
}

export const createAgency = async (data: AgencyForm): Promise<Agency> => {
  const { user, ...agencyData } = data
  const { confirmPassword, isEdit, ...userPayload } = user
  const payload = {
    ...agencyData,
    user: userPayload,
  }

  const response = await apiClient.post<AgencyResponse>('/agencies', payload)
  return response.data.data
}

export const updateAgency = async ({
  id,
  data,
}: {
  id: string
  data: AgencyForm
}): Promise<Agency> => {
  const { user, ...agencyData } = data
  const { confirmPassword, isEdit, ...userPayload } = user
  const payload = {
    ...agencyData,
    user: userPayload,
  }

  const response = await apiClient.put<AgencyResponse>(
    `/agencies/${id}`,
    payload
  )
  return response.data.data
}

export const deleteAgency = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/agencies/${id}`)
}
