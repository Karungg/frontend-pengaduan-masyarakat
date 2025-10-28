import z from 'zod'

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'Username tidak boleh kosong')
    .min(3, 'Username minimal 3 karakter'),
  email: z.email().min(1, 'Email tidak boleh kosong'),
  password: z
    .string()
    .min(1, 'Password tidak boleh kosong')
    .min(8, 'Password minimal 8 karakter'),
  role: z.string().optional(),
})

export type Register = z.infer<typeof registerSchema>
