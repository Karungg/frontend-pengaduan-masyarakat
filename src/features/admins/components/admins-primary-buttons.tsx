import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAdmin } from './admins-provider'

export function AdminPrimaryButtons() {
  const { setOpen } = useAdmin()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Admin</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
