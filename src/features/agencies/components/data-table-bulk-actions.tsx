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
import { type Agency } from '../data/schema'
import { AgencyMultiDeleteDialog } from './agencies-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    const selectedAgencies = selectedRows.map((row) => row.original as Agency)
    toast.promise(sleep(2000), {
      loading: `${status === 'active' ? 'Activating' : 'Deactivating'} agencies...`,
      success: () => {
        table.resetRowSelection()
        return `${status === 'active' ? 'Activated' : 'Deactivated'} ${selectedAgencies.length} agency${selectedAgencies.length > 1 ? 's' : ''}`
      },
      error: `Error ${status === 'active' ? 'activating' : 'deactivating'} agencies`,
    })
    table.resetRowSelection()
  }

  const handleBulkInvite = () => {
    const selectedAgencies = selectedRows.map((row) => row.original as Agency)
    toast.promise(sleep(2000), {
      loading: 'Inviting agencies...',
      success: () => {
        table.resetRowSelection()
        return `Invited ${selectedAgencies.length} agency${selectedAgencies.length > 1 ? 's' : ''}`
      },
      error: 'Error inviting agencies',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='agency'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleBulkInvite}
              className='size-8'
              aria-label='Invite selected agencies'
              title='Invite selected agencies'
            >
              <Mail />
              <span className='sr-only'>Invite selected agencies</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Invite selected agencies</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('active')}
              className='size-8'
              aria-label='Activate selected agencies'
              title='Activate selected agencies'
            >
              <UserCheck />
              <span className='sr-only'>Activate selected agencies</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Activate selected agencies</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('inactive')}
              className='size-8'
              aria-label='Deactivate selected agencies'
              title='Deactivate selected agencies'
            >
              <UserX />
              <span className='sr-only'>Deactivate selected agencies</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deactivate selected agencies</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Delete selected agencies'
              title='Delete selected agencies'
            >
              <Trash2 />
              <span className='sr-only'>Delete selected agencies</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected agencies</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <AgencyMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
