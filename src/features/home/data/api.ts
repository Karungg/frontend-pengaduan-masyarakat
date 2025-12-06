import { apiClient } from '@/config/api'
import {
  type ComplaintForm,
  type ComplaintResponse,
  type ComplaintRequest,
} from './schema'

export interface ComplaintListResponse {
code: number
status: string
message?: string
data: ComplaintResponse[]
}

export interface ComplaintSingleResponse {
  code: number
  status: string
  message?: string
  data: ComplaintResponse
}

export const getAllComplaints = async (): Promise<ComplaintResponse[]> => {
  const response = await apiClient.get<ComplaintListResponse>('/complaints')
  return response.data.data
}

export const getComplaintById = async (
  id: string
): Promise<ComplaintResponse> => {
  const response = await apiClient.get<ComplaintSingleResponse>(
    `/complaints/${id}`
  )
  return response.data.data
}

export const createComplaint = async (
  data: ComplaintForm
): Promise<ComplaintResponse> => {
  const payload: ComplaintRequest = {
    type: data.type,
    visibility: data.visibility,
    status: 'PENDING',
    title: data.title,
    description: data.description,
    date: new Date().toISOString(),
    location: data.type === 'COMPLAINT' ? data.location || '' : '-',
    attachmentUrl: data.attachmentUrl || '',
    aspiration: data.aspiration || '',
    userId: data.userId || '',
    agencyId: data.agencyId,
    categoryId:
      data.type === 'COMPLAINT'
        ? data.categoryId || ''
        : '00000000-0000-0000-0000-000000000000',
  }

  const response = await apiClient.post<ComplaintSingleResponse>(
    '/complaints',
    payload
  )
  return response.data.data
}

export const updateComplaint = async ({
  id,
  data,
}: {
  id: string
  data: ComplaintForm
}): Promise<ComplaintResponse> => {
  // Transform form data to API request format
  const payload: ComplaintRequest = {
    type: data.type,
    visibility: data.visibility,
    status: 'PENDING',
    title: data.title,
    description: data.description,
    date: new Date().toISOString(),
    location: data.type === 'COMPLAINT' ? data.location || '' : '-',
    attachmentUrl: data.attachmentUrl || '',
    aspiration: data.aspiration || '',
    userId: data.userId || '',
    agencyId: data.agencyId,
    categoryId:
      data.type === 'COMPLAINT'
        ? data.categoryId || ''
        : '00000000-0000-0000-0000-000000000000',
  }

  const response = await apiClient.put<ComplaintSingleResponse>(
    `/complaints/${id}`,
    payload
  )
  return response.data.data
}

export const deleteComplaint = async (id: string): Promise<void> => {
  const response = await apiClient.delete<void>(`/complaints/${id}`)
  return response.data
}

// Filter complaints by type
export const getComplaintsByType = async (
  type: 'COMPLAINT' | 'ASPIRATION'
): Promise<ComplaintResponse[]> => {
  const response = await apiClient.get<ComplaintListResponse>(
    `/complaints?type=${type}`
  )
  return response.data.data
}

// Filter complaints by status
export const getComplaintsByStatus = async (
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED'
): Promise<ComplaintResponse[]> => {
  const response = await apiClient.get<ComplaintListResponse>(
    `/complaints?status=${status}`
  )
  return response.data.data
}

// Filter complaints by agency
export const getComplaintsByAgency = async (
  agencyId: string
): Promise<ComplaintResponse[]> => {
  const response = await apiClient.get<ComplaintListResponse>(
    `/complaints?agencyId=${agencyId}`
  )
  return response.data.data
}

// Filter complaints by user
export const getComplaintsByUser = async (
  userId: string
): Promise<ComplaintResponse[]> => {
  const response = await apiClient.get<ComplaintListResponse>(
    `/complaints?userId=${userId}`
  )
  return response.data.data
}
