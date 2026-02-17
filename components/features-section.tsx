import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Scale, Users, Network, Gavel, Globe2 } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Perlindungan Ekosistem Digital",
    description: "Menyusun panduan dan rekomendasi kebijakan untuk memastikan ruang digital yang aman dan terpercaya.",
  },
  {
    icon: Scale,
    title: "Kepastian Hukum Siber",
    description: "Mengharmonisasikan regulasi teknologi, perlindungan data, dan hak digital masyarakat.",
  },
  {
    icon: Users,
    title: "Forum Multi-Pemangku Kepentingan",
    description: "Mempertemukan pemerintah, industri, akademisi, dan komunitas dalam satu meja dialog.",
  },
  {
    icon: Network,
    title: "Respons Cepat Insiden Siber",
    description: "Menyusun kerangka koordinasi penanganan insiden dan sengketa siber lintas lembaga.",
  },
  {
    icon: Gavel,
    title: "Standar Etik & Kepatuhan",
    description: "Mendorong penerapan kode etik, tata kelola, dan kepatuhan di era ekonomi digital.",
  },
  {
    icon: Globe2,
    title: "Kolaborasi Internasional",
    description: "Berjejaring dengan lembaga hukum siber dunia untuk berbagi praktik terbaik.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Mengapa Dewan Hukum Siber?
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Pilar kolaborasi nasional untuk tata kelola dan penegakan hukum di ruang siber Indonesia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card key={idx} className="bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
