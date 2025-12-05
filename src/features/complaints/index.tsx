import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ComplaintsDialogs } from './components/complaints-dialogs'
import { ComplaintsPrimaryButtons } from './components/complaints-primary-buttons'
import { ComplaintsProvider } from './components/complaints-provider'
import { ComplaintsTable } from './components/complaints-table'
import { complaints } from './data/complaints'

export function Complaints() {
  return (
    <ComplaintsProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Complaints</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your complaints for this month!
            </p>
          </div>
          <ComplaintsPrimaryButtons />
        </div>
        <ComplaintsTable data={complaints} />
      </Main>

      <ComplaintsDialogs />
    </ComplaintsProvider>
  )
}
