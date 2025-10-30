import { z } from 'zod'

const adminSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Admin = z.infer<typeof adminSchema>

export const AdminListSchema = z.array(adminSchema)
