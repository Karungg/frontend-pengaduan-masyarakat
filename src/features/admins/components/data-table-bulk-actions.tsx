import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, UserX, UserCheck, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type Admin } from '../data/schema'
import { AdminMultiDeleteDialog } from './admins-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    const selectedAdmins = selectedRows.map((row) => row.original as Admin)
    toast.promise(sleep(2000), {
      loading: `${status === 'active' ? 'Activating' : 'Deactivating'} admins...`,
      success: () => {
        table.resetRowSelection()
        return `${status === 'active' ? 'Activated' : 'Deactivated'} ${selectedAdmins.length} admin${selectedAdmins.length > 1 ? 's' : ''}`
      },
      error: `Error ${status === 'active' ? 'activating' : 'deactivating'} admins`,
    })
    table.resetRowSelection()
  }

  const handleBulkInvite = () => {
    const selectedAdmins = selectedRows.map((row) => row.original as Admin)
    toast.promise(sleep(2000), {
      loading: 'Inviting admins...',
      success: () => {
        table.resetRowSelection()
        return `Invited ${selectedAdmins.length} admin${selectedAdmins.length > 1 ? 's' : ''}`
      },
      error: 'Error inviting admins',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='admin'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleBulkInvite}
              className='size-8'
              aria-label='Invite selected admins'
              title='Invite selected admins'
            >
              <Mail />
              <span className='sr-only'>Invite selected admins</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Invite selected admins</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('active')}
              className='size-8'
              aria-label='Activate selected admins'
              title='Activate selected admins'
            >
              <UserCheck />
              <span className='sr-only'>Activate selected admins</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Activate selected admins</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('inactive')}
              className='size-8'
              aria-label='Deactivate selected admins'
              title='Deactivate selected admins'
            >
              <UserX />
              <span className='sr-only'>Deactivate selected admins</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deactivate selected admins</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Delete selected admins'
              title='Delete selected admins'
            >
              <Trash2 />
              <span className='sr-only'>Delete selected admins</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected admins</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <AdminMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
