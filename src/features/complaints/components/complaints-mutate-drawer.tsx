import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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
import { SelectDropdown } from '@/components/select-dropdown'
import { type ComplaintResponse } from '../data/schema'

type ComplaintsMutateDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: ComplaintResponse
}

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters.'),
  type: z.enum(['COMPLAINT', 'ASPIRATION']),
  visibility: z.enum(['PUBLIC', 'PRIVATE']),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED']),
  location: z.string().optional(),
  agencyId: z.string().min(1, 'Please select an agency.'),
  categoryId: z.string().optional(),
})
type ComplaintForm = z.infer<typeof formSchema>

export function ComplaintsMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: ComplaintsMutateDrawerProps) {
  const isUpdate = !!currentRow

  const form = useForm<ComplaintForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          title: currentRow.title,
          description: currentRow.description,
          type: currentRow.type,
          visibility: currentRow.visibility,
          status: currentRow.status,
          location: currentRow.location || '',
          agencyId: currentRow.agencyId,
          categoryId: currentRow.categoryId || '',
        }
      : {
          title: '',
          description: '',
          type: 'COMPLAINT',
          visibility: 'PUBLIC',
          status: 'PENDING',
          location: '',
          agencyId: '',
          categoryId: '',
        },
  })

  const onSubmit = (data: ComplaintForm) => {
    onOpenChange(false)
    form.reset()
    showSubmittedData(data)
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
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Complaint</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the complaint by providing necessary info.'
              : 'Add a new complaint by providing necessary info.'}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='complaints-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-4 overflow-y-auto px-4'
          >
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex gap-4'
                    >
                      <FormItem className='flex items-center space-y-0 space-x-2'>
                        <FormControl>
                          <RadioGroupItem value='COMPLAINT' />
                        </FormControl>
                        <FormLabel className='font-normal'>Complaint</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-y-0 space-x-2'>
                        <FormControl>
                          <RadioGroupItem value='ASPIRATION' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Aspiration
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='visibility'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex gap-4'
                    >
                      <FormItem className='flex items-center space-y-0 space-x-2'>
                        <FormControl>
                          <RadioGroupItem value='PUBLIC' />
                        </FormControl>
                        <FormLabel className='font-normal'>Public</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-y-0 space-x-2'>
                        <FormControl>
                          <RadioGroupItem value='PRIVATE' />
                        </FormControl>
                        <FormLabel className='font-normal'>Private</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a title' />
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
                      {...field}
                      placeholder='Enter description'
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter location' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select status'
                    items={[
                      { label: 'Pending', value: 'PENDING' },
                      { label: 'In Progress', value: 'IN_PROGRESS' },
                      { label: 'Resolved', value: 'RESOLVED' },
                      { label: 'Rejected', value: 'REJECTED' },
                    ]}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='agencyId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agency</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter agency ID' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Enter category ID (optional)'
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
          <Button form='complaints-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
