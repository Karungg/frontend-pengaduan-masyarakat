import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { statuses } from '../data/data'
import { type ComplaintResponse } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const complaintsColumns: ColumnDef<ComplaintResponse>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Complaint ID' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px] truncate' title={row.getValue('id')}>
        {String(row.getValue('id')).slice(0, 8)}...
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Username' />
    ),
    cell: ({ row }) => {
      return (
        <div className='max-w-[150px] truncate'>
          {row.original.username || 'N/A'}
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return (
        <Badge variant={type === 'COMPLAINT' ? 'destructive' : 'default'}>
          {type}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const categoryName = row.original.categoryName
      const visibility = row.original.visibility

      return (
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            {categoryName && (
              <Badge variant='outline' className='text-xs'>
                {categoryName}
              </Badge>
            )}
            {visibility === 'PRIVATE' && (
              <Badge variant='secondary' className='text-xs'>
                Private
              </Badge>
            )}
          </div>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('title')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const statusValue = row.getValue('status') as string

      const status = statuses.find((status) => status.value === statusValue)

      if (!status) {
        return (
          <div className='flex w-[100px] items-center gap-2'>
            <span className='capitalize'>{statusValue.toLowerCase()}</span>
          </div>
        )
      }

      return (
        <div className='flex w-[100px] items-center gap-2'>
          {status.icon && (
            <status.icon className='text-muted-foreground size-4' />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'agencyName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Agency' />
    ),
    cell: ({ row }) => {
      const agency = row.original.agencyName
      return <div className='max-w-[150px] truncate'>{agency || 'N/A'}</div>
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'))
      return (
        <div className='text-sm'>
          {date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
