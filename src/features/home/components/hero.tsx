export function Hero() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24 text-center">
      <h1 className="text-pretty text-3xl md:text-5xl font-semibold tracking-tight">
        Sampaikan{" "}
        <span className="inline-flex items-center">
          <span className="text-primary">Pengaduan</span>
          <span className="mx-2 text-foreground/40">atau</span>
          <span className="text-primary">Aspirasi</span>
        </span>{" "}
        Anda dengan Mudah
      </h1>
      <p className="mt-4 text-foreground/70 md:text-lg leading-relaxed max-w-2xl mx-auto">
        Platform responsif untuk mengelola pengaduan dan aspirasi masyarakat. Ikuti langkah-langkah sederhana, isi
        formulir, dan kirimkan secara terbuka atau anonim sesuai kebutuhan Anda.
      </p>
      <div className="mt-8">
        <a
          href="#formulir"
          className="inline-flex rounded-md bg-primary px-5 py-3 text-primary-foreground text-sm md:text-base font-medium hover:opacity-90 transition-opacity"
        >
          Mulai Isi Formulir
        </a>
      </div>
    </div>
  )
}
