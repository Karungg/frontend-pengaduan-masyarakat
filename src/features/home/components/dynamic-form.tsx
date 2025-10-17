'use client'

import type * as React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

// import { toast } from "@/components/ui/use-sonner";

// Types for the form
type Jenis = 'Pengaduan' | 'Aspirasi'

export function DynamicForm() {
  const [jenis, setJenis] = useState<Jenis>('Pengaduan')
  const [anonim, setAnonim] = useState<boolean>(false)

  // Common fields
  const [judul, setJudul] = useState('')
  const [deskripsi, setDeskripsi] = useState('')

  // Identity (hidden when anonim)
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')

  // Specific fields
  const [kategori, setKategori] = useState('') // for Pengaduan
  const [lokasi, setLokasi] = useState('') // for Pengaduan
  const [topik, setTopik] = useState('') // for Aspirasi
  const [manfaat, setManfaat] = useState('') // for Aspirasi

  const resetSpecific = (target: Jenis) => {
    if (target === 'Pengaduan') {
      setTopik('')
      setManfaat('')
    } else {
      setKategori('')
      setLokasi('')
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, submit to an API route or server action
    // console.log collected data
    // console.log("[v0] Submit payload:", {
    //   jenis,
    //   anonim,
    //   judul,
    //   deskripsi,
    //   identitas: anonim ? null : { nama, email },
    //   spesifik:
    //     jenis === "Pengaduan" ? { kategori, lokasi } : { topik, manfaat },
    // });

    // toast({
    //   title: "Formulir dikirim",
    //   description:
    //     "Terima kasih. Pengajuan Anda telah diterima dan akan diproses.",
    // });

    // Optional: clear form
    // setJudul(""); setDeskripsi(""); setNama(""); setEmail(""); setKategori(""); setLokasi(""); setTopik(""); setManfaat(""); setAnonim(false);
  }

  return (
    <form onSubmit={onSubmit} className='mx-auto'>
      <div className='max-w-2xl'>
        <header className='mb-6'>
          <h3 className='text-xl font-semibold tracking-tight md:text-2xl'>
            Formulir Pengajuan
          </h3>
          <p className='text-foreground/70 mt-1'>
            Pilih jenis pengajuan dan lengkapi data yang diperlukan.
          </p>
        </header>

        <div className='grid grid-cols-1 gap-4'>
          {/* Jenis Select */}
          <div className='grid gap-2'>
            <Label htmlFor='jenis'>Jenis Pengajuan</Label>
            <Select
              value={jenis}
              onValueChange={(v) => {
                const target = (v as Jenis) || 'Pengaduan'
                setJenis(target)
                resetSpecific(target)
              }}
            >
              <SelectTrigger id='jenis' aria-label='Pilih jenis pengajuan'>
                <SelectValue placeholder='Pilih jenis' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Pengaduan'>Pengaduan</SelectItem>
                <SelectItem value='Aspirasi'>Aspirasi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Anonim switch */}
          <div className='border-border flex items-center justify-between rounded-md border p-3'>
            <div className='space-y-0.5'>
              <Label htmlFor='anonim'>Kirim secara anonim</Label>
              <p className='text-foreground/70 text-sm'>
                Sembunyikan identitas Anda pada pengajuan ini.
              </p>
            </div>
            <Switch
              id='anonim'
              checked={anonim}
              onCheckedChange={setAnonim}
              aria-label='Aktifkan anonim'
            />
          </div>

          {/* Identitas (conditionally hidden) */}
          {!anonim && (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='grid gap-2'>
                <Label htmlFor='nama'>Nama</Label>
                <Input
                  id='nama'
                  placeholder='Nama lengkap'
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='email@contoh.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Umum */}
          <div className='grid gap-2'>
            <Label htmlFor='judul'>Judul</Label>
            <Input
              id='judul'
              placeholder='Ringkas dan jelas'
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='deskripsi'>Deskripsi</Label>
            <Textarea
              id='deskripsi'
              placeholder='Jelaskan secara detail...'
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              rows={6}
              required
            />
          </div>

          {/* Spesifik by jenis */}
          {jenis === 'Pengaduan' ? (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='grid gap-2'>
                <Label htmlFor='kategori'>Kategori</Label>
                <Input
                  id='kategori'
                  placeholder='Contoh: Pelayanan, Infrastruktur'
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='lokasi'>Lokasi</Label>
                <Input
                  id='lokasi'
                  placeholder='Kota/Kecamatan/Desa'
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='grid gap-2'>
                <Label htmlFor='topik'>Topik</Label>
                <Input
                  id='topik'
                  placeholder='Topik aspirasi'
                  value={topik}
                  onChange={(e) => setTopik(e.target.value)}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='manfaat'>Manfaat</Label>
                <Input
                  id='manfaat'
                  placeholder='Dampak/manfaat yang diharapkan'
                  value={manfaat}
                  onChange={(e) => setManfaat(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className='pt-2'>
            <Button type='submit' className='w-full md:w-auto'>
              Kirim Pengajuan
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
