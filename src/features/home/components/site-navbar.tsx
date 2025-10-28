'use client'

import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu as MenuIcon } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { SignOutDialog } from '@/components/sign-out-dialog'

function Brand() {
  return (
    <Link
      to='/'
      className='text-foreground inline-flex items-center gap-2 font-semibold tracking-wide'
      aria-label='Kembali ke beranda'
    >
      <span className='text-primary'>Layanan</span>
      <span className='opacity-80'>Publik</span>
    </Link>
  )
}

const links = [
  { to: '/', label: 'Beranda', useAnchor: false },
  { to: '/#langkah', label: 'Langkah', useAnchor: true },
  { to: '/#formulir', label: 'Formulir', useAnchor: true },
  { to: '/#kontak', label: 'Kontak', useAnchor: true },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav
      className='border-border bg-background/80 w-full border-b supports-[backdrop-filter]:backdrop-blur'
      role='navigation'
      aria-label='Situs'
    >
      <div className='mx-auto flex h-14 max-w-6xl items-center justify-between px-4'>
        <div className='flex items-center gap-6'>
          <Brand />
          {/* desktop links */}
          <div className='hidden items-center gap-4 md:flex'>
            {links.map((l) =>
              l.useAnchor ? (
                <a
                  key={l.to}
                  href={l.to}
                  className='text-muted-foreground hover:text-foreground text-sm'
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  className='text-muted-foreground hover:text-foreground text-sm'
                >
                  {l.label}
                </Link>
              )
            )}
          </div>
        </div>

        <div className='flex items-center gap-2'>
          {/* mobile menu using Sheet */}
          <Sheet open={open} onOpenChange={(v) => setOpen(v)}>
            <SheetTrigger asChild>
              <Button variant='ghost' className='md:hidden'>
                <MenuIcon className='size-5' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='right'>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className='flex flex-col gap-2 px-4'>
                {links.map((l) =>
                  l.useAnchor ? (
                    <a
                      key={l.to}
                      href={l.to}
                      className='text-foreground py-2 text-base'
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      key={l.to}
                      to={l.to}
                      className='text-foreground py-2 text-base'
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  )
                )}
              </div>
              <SheetClose asChild>
                <Button className='m-4'>Close</Button>
              </SheetClose>
            </SheetContent>
          </Sheet>

          <AuthActions />
        </div>
      </div>
    </nav>
  )
}

export function AuthActions() {
  const [isSignOutOpen, setIsSignOutOpen] = useState(false)

  const { isAuthenticated } = useAuthStore.getState().auth

  return (
    <>
      {isAuthenticated() ? (
        <Button onClick={() => setIsSignOutOpen(true)}>Logout</Button>
      ) : (
        <Button>
          <a href='/sign-in' aria-label='Masuk atau kirim pengajuan'>
            Masuk
          </a>
        </Button>
      )}

      <SignOutDialog open={isSignOutOpen} onOpenChange={setIsSignOutOpen} />
    </>
  )
}
