import { getRouteApi } from '@tanstack/react-router'
import { useAdmins } from '@/hooks/admin/use-admin'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { AdminDialogs } from './components/admins-dialogs'
import { AdminPrimaryButtons } from './components/admins-primary-buttons'
import { AdminProvider } from './components/admins-provider'
import { AdminTable } from './components/admins-table'
import { AdminListSchema } from './data/schema'

const route = getRouteApi('/_authenticated/admin/admins/')

export function Admins() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  const { data: rawData, isLoading, isError } = useAdmins()

  if (isLoading) {
    return <div>Loading admins...</div>
  }

  if (isError) {
    return <div>Error loading data. Please try again.</div>
  }

  const admins = AdminListSchema.parse(rawData || [])

  return (
    <AdminProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Admin List</h2>
            <p className='text-muted-foreground'>
              Manage your admins and their roles here.
            </p>
          </div>
          <AdminPrimaryButtons />
        </div>
        <AdminTable data={admins} search={search} navigate={navigate} />
      </Main>

      <AdminDialogs />
    </AdminProvider>
  )
}
