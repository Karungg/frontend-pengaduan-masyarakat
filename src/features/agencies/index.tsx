import { getRouteApi } from '@tanstack/react-router'
import { useAgencies } from '@/hooks/agency/use-agency'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { AgencyDialogs } from './components/agencies-dialogs'
import { AgencyPrimaryButtons } from './components/agencies-primary-buttons'
import { AgencyProvider } from './components/agencies-provider'
import { AgencyTable } from './components/agencies-table'
import { AgencyListSchema } from './data/schema'

const route = getRouteApi('/_authenticated/admin/agencies/')

export function Agencies() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  const { data: rawData, isLoading, isError } = useAgencies()

  if (isLoading) {
    return <div>Loading agencies...</div>
  }

  if (isError) {
    return <div>Error loading data. Please try again.</div>
  }

  const agencies = AgencyListSchema.parse(rawData || [])

  return (
    <AgencyProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Agency List</h2>
            <p className='text-muted-foreground'>
              Manage your agencies and their roles here.
            </p>
          </div>
          <AgencyPrimaryButtons />
        </div>
        <AgencyTable data={agencies} search={search} navigate={navigate} />
      </Main>

      <AgencyDialogs />
    </AgencyProvider>
  )
}