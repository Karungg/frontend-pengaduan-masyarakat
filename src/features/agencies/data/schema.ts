import { z } from 'zod'

const agencyStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type AgencyStatus = z.infer<typeof agencyStatusSchema>

const agencyRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
])

const agencySchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: agencyStatusSchema,
  role: agencyRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Agency = z.infer<typeof agencySchema>

export const agencyListSchema = z.array(agencySchema)