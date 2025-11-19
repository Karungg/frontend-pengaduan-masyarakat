'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { useAgencies } from '@/hooks/agency/use-agency'
import { useCategories } from '@/hooks/categories/use-categories'
import { useCreateComplaint } from '@/hooks/complaint/use-create-complaint'
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
  type TypeEnumType,
} from '../data/schema'

export function DynamicForm() {
  const user = useAuthStore((state) => state.auth.user)

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
      userId: '',
      agencyId: '',
      attachmentUrl: '',
    },
  })

  const type = form.watch('type')
  const visibility = form.watch('visibility')

  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories()
  const { data: agencies = [], isLoading: isLoadingAgencies } = useAgencies()

  useEffect(() => {
    if (type === 'COMPLAINT') {
      form.setValue('aspiration', '')
    } else {
      form.setValue('categoryId', '')
      form.setValue('location', '')
    }
  }, [type, form])

  useEffect(() => {
    if (user) {
      form.setValue('userId', user.userId)
      form.setValue('userEmail', user.email)
    }
  }, [user, form])

  const handleSuccess = () => {
    form.reset()
  }

  const createComplaintMutation = useCreateComplaint({
    setFormError: form.setError,
    onSuccess: handleSuccess,
  })

  const isPending = createComplaintMutation.isPending

  const onSubmit = (values: ComplaintForm) => {
    createComplaintMutation.mutate(values)
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

            {type === 'COMPLAINT' && (
              <FormField
                control={form.control}
                name='agencyId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instansi Tujuan</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoadingAgencies || agencies.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih instansi'>
                            {isLoadingAgencies ? (
                              <div className='flex items-center gap-2'>
                                <Loader2 className='h-4 w-4 animate-spin' />
                                <span>Memuat...</span>
                              </div>
                            ) : field.value ? (
                              agencies.find((a) => a.id === field.value)?.name
                            ) : (
                              'Pilih instansi'
                            )}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {agencies.map((agency) => (
                          <SelectItem key={agency.id} value={agency.id}>
                            <div className='flex flex-col'>
                              <span className='font-medium'>{agency.name}</span>
                              <span className='text-muted-foreground text-xs'>
                                {agency.address}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='categoryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoadingCategories || categories.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih kategori'>
                            {isLoadingCategories ? (
                              <div className='flex items-center gap-2'>
                                <Loader2 className='h-4 w-4 animate-spin' />
                                <span>Memuat...</span>
                              </div>
                            ) : field.value ? (
                              categories.find((c) => c.id === field.value)?.name
                            ) : (
                              'Pilih kategori'
                            )}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className='flex flex-col'>
                              <span className='font-medium'>
                                {category.name}
                              </span>
                              <span className='text-muted-foreground text-xs'>
                                {category.description}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

            {type === 'ASPIRATION' && (
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
                disabled={isPending}
              >
                {isPending
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
