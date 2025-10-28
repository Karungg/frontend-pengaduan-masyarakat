import { Link } from '@tanstack/react-router'

export function SiteFooter() {
  return (
    <div id='kontak' className='bg-background'>
      <div className='container mx-auto max-w-6xl px-4 py-10'>
        <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
          <div className='font-semibold tracking-tight'>
            <span className='text-primary'>Layanan</span>{' '}
            <span className='text-foreground/80'>Publik</span>
          </div>

          <nav
            aria-label='Footer'
            className='flex flex-wrap items-center gap-4 text-sm'
          >
            <Link
              to='/'
              className='text-foreground/80 hover:text-foreground transition-colors'
            >
              Beranda
            </Link>
            <a
              href='#langkah'
              className='text-foreground/80 hover:text-foreground transition-colors'
            >
              Langkah
            </a>
            <a
              href='#formulir'
              className='text-foreground/80 hover:text-foreground transition-colors'
            >
              Formulir
            </a>
            <a
              href='#kontak'
              className='text-foreground/80 hover:text-foreground transition-colors'
            >
              Kontak
            </a>
          </nav>
        </div>

        <div className='text-foreground/60 mt-8 text-sm'>
          © {new Date().getFullYear()} Layanan Publik. Seluruh hak cipta
          dilindungi.
        </div>
      </div>
    </div>
  )
}
