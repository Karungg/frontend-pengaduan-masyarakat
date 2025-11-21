import { z } from 'zod'

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const formSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters.')
    .max(100, 'Name must not exceed 100 characters.'),
  description: z
    .string()
    .max(4000, 'Description must not exceed 4000 characters.')
    .optional(),
})

export type CategoryForm = z.infer<typeof formSchema>

export type Category = z.infer<typeof categorySchema>
