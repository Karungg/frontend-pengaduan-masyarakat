import { z } from 'zod'

const adminSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const formSchema = z
  .object({
    username: z.string().min(1, 'Username is required.'),
    email: z.email({
      message: 'Please enter a valid email address.',
    }),
    password: z.string().transform((pwd) => pwd.trim()),
    role: z.string().optional(),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    isEdit: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.isEdit && !data.password) return true
      return data.password.length > 0
    },
    {
      message: 'Password is required.',
      path: ['password'],
    }
  )
  .refine(
    ({ isEdit, password }) => {
      if (isEdit && !password) return true
      return password.length >= 8
    },
    {
      message: 'Password must be at least 8 characters long.',
      path: ['password'],
    }
  )
  .refine(
    ({ isEdit, password }) => {
      if (isEdit && !password) return true
      return /[a-z]/.test(password)
    },
    {
      message: 'Password must contain at least one lowercase letter.',
      path: ['password'],
    }
  )
  .refine(
    ({ isEdit, password }) => {
      if (isEdit && !password) return true
      return /\d/.test(password)
    },
    {
      message: 'Password must contain at least one number.',
      path: ['password'],
    }
  )
  .refine(
    ({ isEdit, password, confirmPassword }) => {
      if (isEdit && !password) return true
      return password === confirmPassword
    },
    {
      message: "Passwords don't match.",
      path: ['confirmPassword'],
    }
  )

export type AdminForm = z.infer<typeof formSchema>

export type Admin = z.infer<typeof adminSchema>

export const AdminListSchema = z.array(adminSchema)
