import z from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username tidak boleh kosong')
    .min(3, 'Username minimal 3 karakter'),
  password: z
    .string()
    .min(1, 'Password tidak boleh kosong')
    .min(8, 'Password minimal 8 karakter'),
})

export type Login = z.infer<typeof loginSchema>
