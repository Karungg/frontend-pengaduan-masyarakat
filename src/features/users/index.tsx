import { getRouteApi } from '@tanstack/react-router'
import { useUsers } from '@/hooks/user/use-user'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { UserDialogs } from './components/users-dialogs'
import { UserPrimaryButtons } from './components/users-primary-buttons'
import { UserProvider } from './components/users-provider'
import { UserTable } from './components/users-table'
import { UserListSchema } from './data/schema'

const route = getRouteApi('/_authenticated/admin/users/')

export function Users() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  const { data: rawData, isLoading, isError } = useUsers()

  if (isLoading) {
    return <div>Loading users...</div>
  }

  if (isError) {
    return <div>Error loading data. Please try again.</div>
  }

  const users = UserListSchema.parse(rawData || [])

  return (
    <UserProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>
          <UserPrimaryButtons />
        </div>
        <UserTable data={users} search={search} navigate={navigate} />
      </Main>

      <UserDialogs />
    </UserProvider>
  )
}