import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, EyeOff, Send } from "lucide-react"

const steps = [
  {
    title: "Pilih Jenis",
    description: "Tentukan apakah Anda ingin mengirim Pengaduan atau Aspirasi.",
    icon: FileText,
  },
  {
    title: "Isi Detail",
    description: "Lengkapi data sesuai kebutuhan. Bidang akan menyesuaikan pilihan Anda.",
    icon: MessageSquare,
  },
  {
    title: "Atur Privasi",
    description: "Kirim secara anonim/rahasia bila diperlukan untuk melindungi identitas.",
    icon: EyeOff,
  },
  {
    title: "Kirim",
    description: "Tinjau dan kirim. Kami akan menindaklanjuti sesuai alur yang berlaku.",
    icon: Send,
  },
]

export function Steps() {
  return (
    <div>
      <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-tight">Alur Pengajuan</h2>
      <p className="mt-2 text-center text-foreground/70">Ikuti empat langkah sederhana berikut.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <Card key={s.title} className="h-full">
            <CardHeader>
              <div className="inline-flex size-10 items-center justify-center rounded-md bg-secondary text-primary">
                <s.icon className="size-5" />
              </div>
              <CardTitle className="mt-2 text-base">{s.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70 leading-relaxed">{s.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
