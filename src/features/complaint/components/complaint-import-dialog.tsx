import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

type Props = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ComplaintImportDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={!!open} onOpenChange={onOpenChange}>
      <DialogTrigger />
      <DialogContent>
        <div className='p-4'>
          <h3 className='text-lg font-semibold'>Import Complaints</h3>
          <div className='pt-4'>
            <p className='text-muted-foreground text-sm'>
              Upload a CSV file to import complaints.
            </p>
            <div className='pt-4'>
              <Button>Upload</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
