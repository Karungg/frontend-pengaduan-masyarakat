import { MailPlus, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAgency } from './agencies-provider'

export function AgencyPrimaryButtons() {
  const { setOpen } = useAgency()
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>Invite Agency</span> <MailPlus size={18} />
      </Button>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Agency</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
