'use client'

import { useState } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useDeleteAgency } from '@/hooks/agency/use-delete-agency'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Agency } from '../data/schema'

type AgencyDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Agency
}

export function AgencyDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: AgencyDeleteDialogProps) {
  const [value, setValue] = useState('')

  const deleteAgencyMutation = useDeleteAgency()

  const handleDelete = () => {
    if (value.trim() !== currentRow.user.username) return

    deleteAgencyMutation.mutate(currentRow.id, {
      onSuccess: () => {
        setValue('')
        onOpenChange(false)
      },
    })
  }

  const isPending = deleteAgencyMutation.isPending

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.user.username || isPending}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='stroke-destructive me-1 inline-block'
            size={18}
          />{' '}
          Delete Agency
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.user.username}</span>?
            <br />
            This action will permanently remove the agency with the role of{' '}
            <span className='font-bold'>
              {currentRow.user.role.toUpperCase()}
            </span>{' '}
            from the system. This cannot be undone.
          </p>

          <Label className='my-2'>
            Username:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter username to confirm deletion.'
              disabled={isPending}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={
        isPending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Deleting...
          </>
        ) : (
          'Delete'
        )
      }
      destructive
    />
  )
}
