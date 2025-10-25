import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Complaint } from '@/features/complaint'

const complaintSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  filter: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/admin/complaints/')({
  validateSearch: complaintSearchSchema,
  component: Complaint,
})
