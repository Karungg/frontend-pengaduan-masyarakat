import { showSubmittedData } from '@/lib/show-submitted-data'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { ComplaintImportDialog } from './complaint-import-dialog'
import { ComplaintMutateDrawer } from './complaint-mutate-drawer'
import { useComplaint } from './complaint-provider'

export function ComplaintDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useComplaint()
  return (
    <>
      <ComplaintMutateDrawer
        key='complaint-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <ComplaintImportDialog
        key='complaint-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <ComplaintMutateDrawer
            key={`complaint-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => setCurrentRow(null), 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key='complaint-delete'
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => setCurrentRow(null), 500)
            }}
            handleConfirm={() => {
              setOpen(null)
              setTimeout(() => setCurrentRow(null), 500)
              showSubmittedData(
                currentRow,
                'The following complaint has been deleted:'
              )
            }}
            className='max-w-md'
            title={`Delete this complaint: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a complaint with the ID{' '}
                <strong>{currentRow.id}</strong>.
              </>
            }
            confirmText='Delete'
          />
        </>
      )}
    </>
  )
}
