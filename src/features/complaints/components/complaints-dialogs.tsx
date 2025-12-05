import { showSubmittedData } from '@/lib/show-submitted-data'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { ComplaintsImportDialog } from './complaints-import-dialog'
import { ComplaintsMutateDrawer } from './complaints-mutate-drawer'
import { useComplaints } from './complaints-provider'

export function ComplaintsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useComplaints()
  return (
    <>
      <ComplaintsMutateDrawer
        key='complaint-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <ComplaintsImportDialog
        key='complaints-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <ComplaintsMutateDrawer
            key={`complaint-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key='complaint-delete'
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
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
                <strong>{currentRow.id}</strong>. <br />
                This action cannot be undone.
              </>
            }
            confirmText='Delete'
          />
        </>
      )}
    </>
  )
}
