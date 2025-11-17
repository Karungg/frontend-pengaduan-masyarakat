'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {
  complaintFormSchema,
  type ComplaintForm,
  type ComplaintRequest,
  type TypeEnumType,
} from '../data/schema'

export function DynamicForm() {
  const form = useForm<ComplaintForm>({
    resolver: zodResolver(complaintFormSchema),
    defaultValues: {
      type: 'COMPLAINT',
      visibility: 'PUBLIC',
      title: '',
      description: '',
      location: '',
      aspiration: '',
      categoryId: '',
      userName: '',
      userEmail: '',
      userId: '123e4567-e89b-12d3-a456-426614174000',
      agencyId: '987fcdeb-51a2-43c1-z567-123456789000',
      attachmentUrl: '',
    },
  })

  const type = form.watch('type')
  const visibility = form.watch('visibility')

  useEffect(() => {
    if (type === 'COMPLAINT') {
      form.setValue('aspiration', '')
    } else {
      form.setValue('categoryId', '')
      form.setValue('location', '')
    }
  }, [type, form])

  const onSubmit = (data: ComplaintForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload: ComplaintRequest = {
      type: data.type,
      visibility: data.visibility,
      status: 'PENDING',
      title: data.title,
      description: data.description,
      date: new Date().toISOString(),
      location: data.type === 'COMPLAINT' ? data.location || '' : '-',
      attachmentUrl: data.attachmentUrl || '',
      aspiration: data.aspiration || '',
      userId: data.userId || '',
      agencyId: data.agencyId,
      categoryId:
        data.type === 'COMPLAINT'
          ? data.categoryId || ''
          : '00000000-0000-0000-0000-000000000000',
    }

    toast.success(
      `${data.type === 'COMPLAINT' ? 'Pengaduan' : 'Aspirasi'} berhasil dikirim!`,
      {
        description: data.title,
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mx-auto'>
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
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Pengajuan</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(v) => field.onChange(v as TypeEnumType)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih jenis' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='COMPLAINT'>Pengaduan</SelectItem>
                      <SelectItem value='ASPIRATION'>Aspirasi</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='visibility'
              render={({ field }) => (
                <FormItem className='border-border flex items-center justify-between rounded-md border p-3'>
                  <div className='space-y-0.5'>
                    <FormLabel>Kirim secara anonim</FormLabel>
                    <FormDescription className='text-sm'>
                      Sembunyikan identitas Anda.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value === 'PRIVATE'}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? 'PRIVATE' : 'PUBLIC')
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {visibility === 'PUBLIC' && (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='userName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input placeholder='Nama lengkap' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='userEmail'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='email@contoh.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Judul {type === 'ASPIRATION' && '(Topik)'}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        type === 'COMPLAINT'
                          ? 'Ringkasan masalah'
                          : 'Topik aspirasi'
                      }
                      maxLength={255}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {type === 'COMPLAINT'
                      ? 'Deskripsi Masalah'
                      : 'Latar Belakang'}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Jelaskan detailnya...'
                      rows={6}
                      maxLength={4000}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {type === 'COMPLAINT' ? (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='categoryId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Kategori</FormLabel>
                      <FormControl>
                        <Input placeholder='Kategori' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lokasi</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Kota/Kecamatan'
                          maxLength={255}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <FormField
                control={form.control}
                name='aspiration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aspirasi / Harapan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Dampak atau manfaat yang diharapkan...'
                        maxLength={4000}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className='pt-2'>
              <Button
                type='submit'
                className='w-full md:w-auto'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? 'Mengirim...'
                  : `Kirim ${type === 'COMPLAINT' ? 'Pengaduan' : 'Aspirasi'}`}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
