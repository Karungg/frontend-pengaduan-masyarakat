import { DynamicForm } from './components/dynamic-form'
import { Hero } from './components/hero'
import { SiteFooter } from './components/site-footer'
import { Navbar } from './components/site-navbar'
import { Steps } from './components/steps'

export default function Home() {
  return (
    <div className='flex min-h-dvh flex-col'>
      <header className='sticky top-0 z-50'>
        <Navbar />
      </header>

      <main className='flex-1'>
        <section id='beranda' className='border-border bg-background border-b'>
          <Hero />
        </section>

        <section id='langkah' className='border-border bg-background border-b'>
          <div className='container mx-auto max-w-5xl px-4 py-12 md:py-16'>
            <Steps />
          </div>
        </section>

        <section id='formulir' className='bg-background'>
          <div className='container mx-auto max-w-2xl px-4 py-12 md:py-16'>
            <DynamicForm />
          </div>
        </section>
      </main>

      <footer className='border-border border-t'>
        <SiteFooter />
      </footer>
    </div>
  )
}
