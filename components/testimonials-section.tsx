"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { Star } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Dr. Ahmad Rizki, S.H., LL.M.",
      role: t("Akademisi Hukum & Anggota Dewan Hukum Siber", "Legal Academic & Cyber Law Council Member"),
      content: t(
        "Dewan Hukum Siber menjembatani dunia akademik, regulator, dan pelaku industri. Diskusi yang terstruktur membantu kami mengusulkan kebijakan yang lebih adaptif terhadap perkembangan teknologi.",
        "The Cyber Law Council bridges academia, regulators, and industry players. Structured discussions help us propose policies that are more adaptive to technological developments."
      ),
      rating: 5,
      image: "/male-professional-avatar.jpg",
    },
    {
      name: "Siti Nurhaliza",
      role: t("Direktur Kepatuhan di Fintech Nasional", "Compliance Director at National Fintech"),
      content: t(
        "Melalui forum dan kajian Dewan Hukum Siber, kami mendapatkan panduan praktis penerapan perlindungan data pribadi dan tata kelola risiko siber di perusahaan kami.",
        "Through the Cyber Law Council's forums and studies, we gained practical guidance on implementing personal data protection and cyber risk governance in our company."
      ),
      rating: 5,
      image: "/female-professional-avatar.jpg",
    },
    {
      name: "Budi Hermawan",
      role: t("Perwakilan Komunitas Keamanan Siber", "Cybersecurity Community Representative"),
      content: t(
        "Keterlibatan komunitas sangat diapresiasi. Dewan Hukum Siber membuka ruang dialog yang setara sehingga suara praktisi teknis ikut terdengar dalam perumusan kebijakan.",
        "Community involvement is highly appreciated. The Cyber Law Council opens an equal dialogue space so that technical practitioners' voices are heard in policy formulation."
      ),
      rating: 5,
      image: "/male-professional-avatar.jpg",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{t("Suara Mitra & Anggota", "Partner & Member Voices")}</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            {t(
              "Testimoni para pemangku kepentingan yang berkolaborasi dalam ekosistem Dewan Hukum Siber Indonesia.",
              "Testimonials from stakeholders collaborating in the Indonesian Cyber Law Council ecosystem."
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="bg-card">
              <CardHeader>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed">{testimonial.content}</p>
              </CardHeader>
              <CardContent className="flex flex-1">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
