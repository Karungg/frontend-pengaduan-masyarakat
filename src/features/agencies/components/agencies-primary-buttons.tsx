import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAgency } from './agencies-provider'

export function AgencyPrimaryButtons() {
  const { setOpen } = useAgency()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Agency</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
