import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Admins } from '@/features/admins'

const adminsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  // Facet filters
  username: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/admin/admins/')({
  validateSearch: adminsSearchSchema,
  component: Admins,
})
