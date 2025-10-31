import { AgencyActionDialog } from './agencies-action-dialog'
import { AgencyDeleteDialog } from './agencies-delete-dialog'
import { AgencyInviteDialog } from './agencies-invite-dialog'
import { useAgency } from './agencies-provider'

export function AgencyDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useAgency()
  return (
    <>
      <AgencyActionDialog
        key='agency-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      <AgencyInviteDialog
        key='agency-invite'
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />

      {currentRow && (
        <>
          <AgencyActionDialog
            key={`agency-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <AgencyDeleteDialog
            key={`agency-delete-${currentRow.id}`}
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
