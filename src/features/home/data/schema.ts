import { z } from 'zod'

export const TypeEnum = z.enum(['COMPLAINT', 'ASPIRATION'])
export const VisibilityEnum = z.enum(['PUBLIC', 'PRIVATE'])
export const StatusEnum = z.enum([
  'PENDING',
  'IN_PROGRESS',
  'RESOLVED',
  'REJECTED',
])

const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const agencySchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  user: userSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})

const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const complaintResponseSchema = z.object({
  id: z.string(),
  type: TypeEnum,
  visibility: VisibilityEnum,
  status: StatusEnum,
  title: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  attachmentUrl: z.string().optional(),
  aspiration: z.string().optional(),
  userId: z.string(),
  agencyId: z.string(),
  categoryId: z.string().optional(),
  user: userSchema.optional(),
  agency: agencySchema.optional(),
  category: categorySchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const complaintFormSchema = z
  .object({
    type: TypeEnum,
    visibility: VisibilityEnum,
    userName: z.string().optional(),
    userEmail: z.string().optional(),
    title: z
      .string()
      .min(1, 'Judul wajib diisi.')
      .max(255, 'Judul maksimal 255 karakter.'),
    description: z
      .string()
      .min(10, 'Deskripsi minimal 10 karakter.')
      .max(4000, 'Deskripsi maksimal 4000 karakter.'),
    categoryId: z.string().optional(),
    location: z.string().optional(),
    aspiration: z.string().optional(),
    userId: z.string().optional(),
    agencyId: z.string(),
    attachmentUrl: z.string().url().optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    if (data.visibility === 'PUBLIC') {
      if (!data.userName || data.userName.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Nama wajib diisi untuk pengajuan publik.',
          path: ['userName'],
        })
      }
      if (data.userName && data.userName.length > 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Nama maksimal 100 karakter.',
          path: ['userName'],
        })
      }
      if (!data.userEmail || data.userEmail.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Email wajib diisi untuk pengajuan publik.',
          path: ['userEmail'],
        })
      }
      if (data.userEmail && !z.email().safeParse(data.userEmail).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Format email tidak valid.',
          path: ['userEmail'],
        })
      }
    }

    if (data.type === 'COMPLAINT') {
      if (!data.categoryId || data.categoryId.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Kategori wajib dipilih untuk pengaduan.',
          path: ['categoryId'],
        })
      }
      if (data.categoryId && !z.string().safeParse(data.categoryId).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Format UUID kategori tidak valid.',
          path: ['categoryId'],
        })
      }
      if (!data.location || data.location.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Lokasi wajib diisi untuk pengaduan.',
          path: ['location'],
        })
      }
      if (data.location && data.location.length > 255) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Lokasi maksimal 255 karakter.',
          path: ['location'],
        })
      }
    }

    // Validate ASPIRATION-specific fields
    if (data.type === 'ASPIRATION') {
      if (data.aspiration && data.aspiration.length > 4000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Aspirasi maksimal 4000 karakter.',
          path: ['aspiration'],
        })
      }
    }
  })

export const complaintRequestSchema = z.object({
  type: TypeEnum,
  visibility: VisibilityEnum,
  status: StatusEnum,
  title: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  attachmentUrl: z.string(),
  aspiration: z.string(),
  userId: z.string(),
  agencyId: z.string(),
  categoryId: z.string(),
})

export type ComplaintForm = z.infer<typeof complaintFormSchema>
export type ComplaintRequest = z.infer<typeof complaintRequestSchema>
export type ComplaintResponse = z.infer<typeof complaintResponseSchema>
export type TypeEnumType = z.infer<typeof TypeEnum>
export type VisibilityEnumType = z.infer<typeof VisibilityEnum>
export type StatusEnumType = z.infer<typeof StatusEnum>

export const complaintListSchema = z.array(complaintResponseSchema)
export type ComplaintList = z.infer<typeof complaintListSchema>
