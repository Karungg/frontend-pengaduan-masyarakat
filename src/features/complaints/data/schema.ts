import { z } from 'zod'

// Definisi Enums berdasarkan response
export const TypeEnum = z.enum(['COMPLAINT', 'ASPIRATION'])
export const VisibilityEnum = z.enum(['PUBLIC', 'PRIVATE'])
export const StatusEnum = z.enum([
  'PENDING',
  'IN_PROGRESS',
  'RESOLVED',
  'REJECTED',
])

// Schema Utama sesuai API Response
export const complaintSchema = z.object({
  id: z.string(),
  type: TypeEnum,
  visibility: VisibilityEnum,
  status: StatusEnum,
  title: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  // Menggunakan nullable().optional() untuk field yang bisa null/tidak ada
  attachmentUrl: z.string().nullable().optional(),
  aspiration: z.string().nullable().optional(),

  userId: z.string(),
  username: z.string(),

  agencyId: z.string().nullable().optional(),
  agencyName: z.string().nullable().optional(),

  categoryId: z.string().nullable().optional(),
  categoryName: z.string().nullable().optional(),

  createdAt: z.string(),
  updatedAt: z.string(),
})

// Tipe data TypeScript yang di-infer dari Zod Schema
export type Complaint = z.infer<typeof complaintSchema>

// Schema untuk List (Array of Complaints)
export const complaintListSchema = z.array(complaintSchema)
export type ComplaintList = z.infer<typeof complaintListSchema>
