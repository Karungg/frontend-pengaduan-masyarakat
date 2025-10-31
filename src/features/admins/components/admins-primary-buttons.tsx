import { MailPlus, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAdmin } from './admins-provider'

export function AdminPrimaryButtons() {
  const { setOpen } = useAdmin()
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>Invite Admin</span> <MailPlus size={18} />
      </Button>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Admin</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}