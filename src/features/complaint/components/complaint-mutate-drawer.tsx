import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type Props = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  currentRow?: unknown
}

export function ComplaintMutateDrawer({ open, onOpenChange }: Props) {
  return (
    <Sheet open={!!open} onOpenChange={onOpenChange}>
      <SheetTrigger />
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle>Create / Update Complaint</SheetTitle>
        </SheetHeader>
        <div className='p-4'>
          <label className='block text-sm font-medium'>Title</label>
          <input className='mt-1 w-full rounded border px-2 py-1' />
          <div className='pt-4'>
            <Button>Create</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
