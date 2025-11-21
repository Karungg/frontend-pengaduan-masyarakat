import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useCreateCategory } from '@/hooks/categories/use-create-category'
import { useUpdateCategory } from '@/hooks/categories/use-update-category'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { formSchema, type Category, type CategoryForm } from '../data/schema'

type CategoryMutateDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Category
}

export function CategoriesMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: CategoryMutateDrawerProps) {
  const isUpdate = !!currentRow

  const form = useForm<CategoryForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
      name: '',
      description: '',
    },
  })

  const handleSuccess = () => {
    onOpenChange(false)
    form.reset()
  }

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory({
    onSuccess: handleSuccess,
    setFormError: form.setError,
  })

  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory({
    onSuccess: handleSuccess,
    // setFormError: form.setError,
  })

  const isPending = isCreating || isUpdating

  const onSubmit = (data: CategoryForm) => {
    if (isUpdate && currentRow) {
      updateCategory({ id: currentRow.id, data })
    } else {
      createCategory(data)
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-start'>
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Category</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the category by providing necessary info.'
              : 'Add a new category by providing necessary info.'}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='categories-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-6 overflow-y-auto px-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter category name' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      {...field}
                      placeholder='Enter category description (optional)'
                      className='resize-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='categories-form' type='submit' disabled={isPending}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
