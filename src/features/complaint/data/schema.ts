export type ComplaintItem = {
  id: string
  title: string
  status: 'baru' | 'diproses' | 'selesai' | 'ditolak'
  priority: 'rendah' | 'sedang' | 'tinggi'
  createdAt: Date
  updatedAt: Date
  reporter: string
  description?: string
}
