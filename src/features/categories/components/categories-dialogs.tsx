import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDeleteCategory } from '@/hooks/categories/use-delete-category'
import { CategoriesImportDialog } from './categories-import-dialog'
import { CategoriesMutateDrawer } from './categories-mutate-drawer'
import { useCategories } from './categories-provider'

export function CategoriesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCategories()
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory({
    onSuccess: () => {
      setOpen(null)
      setTimeout(() => {
        setCurrentRow(null)
      }, 500)
    },
  })

  return (
    <>
      <CategoriesMutateDrawer
        key='category-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <CategoriesImportDialog
        key='categories-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <CategoriesMutateDrawer
            key={`category-update-${currentRow.id}`}
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
            key='category-delete'
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              deleteCategory(currentRow.id)
            }}
            disabled={isDeleting}
            isLoading={isDeleting}
            className='max-w-md'
            title={`Delete category: ${currentRow.name}?`}
            desc={
              <>
                You are about to delete the category{' '}
                <strong>{currentRow.name}</strong>. <br />
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
