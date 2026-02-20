"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Scale, Users, Network, Gavel, Globe2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: ShieldCheck,
      title: t("Perlindungan Ekosistem Digital", "Digital Ecosystem Protection"),
      description: t(
        "Menyusun panduan dan rekomendasi kebijakan untuk memastikan ruang digital yang aman dan terpercaya.",
        "Developing guidelines and policy recommendations to ensure a safe and trusted digital space."
      ),
    },
    {
      icon: Scale,
      title: t("Kepastian Hukum Siber", "Cyber Law Certainty"),
      description: t(
        "Mengharmonisasikan regulasi teknologi, perlindungan data, dan hak digital masyarakat.",
        "Harmonizing technology regulations, data protection, and public digital rights."
      ),
    },
    {
      icon: Users,
      title: t("Forum Multi-Pemangku Kepentingan", "Multi-Stakeholder Forum"),
      description: t(
        "Mempertemukan pemerintah, industri, akademisi, dan komunitas dalam satu meja dialog.",
        "Bringing together government, industry, academia, and communities at one dialogue table."
      ),
    },
    {
      icon: Network,
      title: t("Respons Cepat Insiden Siber", "Rapid Cyber Incident Response"),
      description: t(
        "Menyusun kerangka koordinasi penanganan insiden dan sengketa siber lintas lembaga.",
        "Developing a coordination framework for cross-institutional cyber incident and dispute handling."
      ),
    },
    {
      icon: Gavel,
      title: t("Standar Etik & Kepatuhan", "Ethics & Compliance Standards"),
      description: t(
        "Mendorong penerapan kode etik, tata kelola, dan kepatuhan di era ekonomi digital.",
        "Promoting the implementation of ethical codes, governance, and compliance in the digital economy era."
      ),
    },
    {
      icon: Globe2,
      title: t("Kolaborasi Internasional", "International Collaboration"),
      description: t(
        "Berjejaring dengan lembaga hukum siber dunia untuk berbagi praktik terbaik.",
        "Networking with global cyber law institutions to share best practices."
      ),
    },
  ]

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("Mengapa Dewan Hukum Siber?", "Why the Cyber Law Council?")}
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            {t(
              "Pilar kolaborasi nasional untuk tata kelola dan penegakan hukum di ruang siber Indonesia.",
              "A national collaboration pillar for governance and law enforcement in Indonesia's cyberspace."
            )}
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
