import { Loader2, AlertCircle } from 'lucide-react'
import { useCategories } from '@/hooks/categories/use-categories'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CategoriesDialogs } from './components/categories-dialogs'
import { CategoriesPrimaryButtons } from './components/categories-primary-buttons'
import { CategoriesProvider } from './components/categories-provider'
import { CategoriesTable } from './components/categories-table'

export function Categories() {
  const { data: categories, isLoading, isError } = useCategories()

  return (
    <CategoriesProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Category List</h2>
            <p className='text-muted-foreground'>
              Manage your categories here.
            </p>
          </div>
          <CategoriesPrimaryButtons />
        </div>

        {isLoading && (
          <div className='flex h-64 flex-1 items-center justify-center rounded-lg border border-dashed'>
            <div className='text-muted-foreground flex flex-col items-center gap-2'>
              <Loader2 className='h-8 w-8 animate-spin' />
              <p>Loading categories...</p>
            </div>
          </div>
        )}

        {isError && (
          <div className='border-destructive/20 bg-destructive/5 text-destructive flex h-64 flex-1 items-center justify-center rounded-lg border'>
            <div className='flex flex-col items-center gap-2'>
              <AlertCircle className='h-8 w-8' />
              <p className='font-medium'>Failed to fetch categories.</p>
              <p className='text-sm opacity-80'>
                Please check your connection or try again later.
              </p>
            </div>
          </div>
        )}

        {!isLoading && !isError && <CategoriesTable data={categories || []} />}
      </Main>

      <CategoriesDialogs />
    </CategoriesProvider>
  )
}
