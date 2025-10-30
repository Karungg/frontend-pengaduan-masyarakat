'use client'

import { useState } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useDeleteAdmin } from '@/hooks/admin/use-delete-admin'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Admin } from '../data/schema'

type AdminDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Admin
}

export function AdminDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: AdminDeleteDialogProps) {
  const [value, setValue] = useState('')

  const deleteAdminMutation = useDeleteAdmin()

  const handleDelete = () => {
    if (value.trim() !== currentRow.username) return

    deleteAdminMutation.mutate(currentRow.id, {
      onSuccess: () => {
        setValue('')
        onOpenChange(false)
      },
    })
  }

  const isPending = deleteAdminMutation.isPending

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.username || isPending}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='stroke-destructive me-1 inline-block'
            size={18}
          />{' '}
          Delete Admin
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.username}</span>?
            <br />
            This action will permanently remove the admin with the role of{' '}
            <span className='font-bold'>
              {currentRow.role.toUpperCase()}
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
