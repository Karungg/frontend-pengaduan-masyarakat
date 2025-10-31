import { z } from 'zod'

const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
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

export const userFormSchema = z
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

export const agencyFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Agency name must be at least 3 characters.')
    .max(255, 'Agency name cannot be more than 255 characters.'),
  address: z.string().min(1, 'Address is required.'),
  phone: z
    .string()
    .min(9, 'Phone number must be at least 9 characters.')
    .max(20, 'Phone number cannot be more than 20 characters.'),
  user: userFormSchema,
})

export type AgencyForm = z.infer<typeof agencyFormSchema>

export type Agency = z.infer<typeof agencySchema>

export const AgencyListSchema = z.array(agencySchema)
