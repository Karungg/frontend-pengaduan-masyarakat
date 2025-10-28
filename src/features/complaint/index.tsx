import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ComplaintDialogs } from './components/complaint-dialogs'
import { ComplaintPrimaryButtons } from './components/complaint-primary-buttons'
import { ComplaintProvider } from './components/complaint-provider'
import { ComplaintTable } from './components/complaint-table'
import { complaints } from './data/complaints'

export function Complaint() {
  return (
    <ComplaintProvider>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Complaint</h2>
            <p className='text-muted-foreground'>
              Daftar pengaduan masyarakat.
            </p>
          </div>
          <ComplaintPrimaryButtons />
        </div>
        <ComplaintTable data={complaints} />
      </Main>

      <ComplaintDialogs />
    </ComplaintProvider>
  )
}
