import { z } from 'zod'
import { apiClient } from '@/config/api'

export const complaintSchema = z.object({
  id: z.string(),
  type: z.string(),
  visibility: z.string(),
  categoryName: z.string(),
  userId: z.string(),
  username: z.string(),
  agencyId: z.string(),
  agencyName: z.string(),
  categoryId: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  attachmentUrl: z.string().nullable(),
  status: z.string(),
  aspiration: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Complaint = z.infer<typeof complaintSchema>

export interface ComplaintListResponse {
  code: number
  status: string
  message?: string
  data: Complaint[]
}

export const getAllComplaints = async (): Promise<Complaint[]> => {
  const response = await apiClient.get<ComplaintListResponse>('/complaints')
  return response.data.data
}
