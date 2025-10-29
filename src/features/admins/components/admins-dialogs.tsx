import { AdminActionDialog } from './admins-action-dialog'
import { AdminDeleteDialog } from './admins-delete-dialog'
import { AdminInviteDialog } from './admins-invite-dialog'
import { useAdmin } from './admins-provider'

export function AdminDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useAdmin()
  return (
    <>
      <AdminActionDialog
        key='admin-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      <AdminInviteDialog
        key='admin-invite'
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />

      {currentRow && (
        <>
          <AdminActionDialog
            key={`admin-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <AdminDeleteDialog
            key={`admin-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}