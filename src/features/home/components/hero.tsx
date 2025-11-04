export function Hero() {
  return (
    <div className='container mx-auto max-w-5xl px-4 py-16 text-center md:py-24'>
      <h1 className='text-3xl font-semibold tracking-tight text-pretty md:text-5xl'>
        Sampaikan{' '}
        <span className='inline-flex items-center'>
          <span className='text-primary'>Pengaduan</span>
          <span className='text-foreground/40 mx-2'>atau</span>
          <span className='text-primary'>Aspirasi</span>
        </span>{' '}
        Anda dengan Mudah
      </h1>
      <p className='text-foreground/70 mx-auto mt-4 max-w-2xl leading-relaxed md:text-lg'>
        Platform responsif untuk mengelola pengaduan dan aspirasi masyarakat.
        Ikuti langkah-langkah sederhana, isi formulir, dan kirimkan secara
        terbuka atau anonim sesuai kebutuhan Anda.
      </p>
      <div className='mt-8'>
        <a
          href='#form'
          className='bg-primary text-primary-foreground inline-flex rounded-md px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90 md:text-base'
        >
          Mulai Isi Formulir
        </a>
      </div>
    </div>
  )
}
