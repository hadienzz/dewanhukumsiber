"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Star, Users } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function ClassesSection() {
  const { t } = useLanguage();

  const courses = [
    {
      id: 1,
      title: t("Regulasi & Tata Kelola Siber", "Cyber Regulation & Governance"),
      description: t("Memahami kerangka hukum nasional terkait keamanan siber dan data pribadi.", "Understanding the national legal framework on cybersecurity and personal data."),
      level: t("Untuk Regulator & Legal", "For Regulators & Legal"),
      students: 320,
      rating: 4.9,
      duration: t("2 hari lokakarya", "2-day workshop"),
      image: "/cloud-devops-course.jpg",
    },
    {
      id: 2,
      title: t("Forensik & Pembuktian Digital", "Digital Forensics & Evidence"),
      description: t("Pendalaman teknik pengumpulan, analisis, dan pembuktian barang bukti digital.", "In-depth techniques for collecting, analyzing, and presenting digital evidence."),
      level: t("Untuk Penegak Hukum", "For Law Enforcement"),
      students: 210,
      rating: 4.8,
      duration: t("3 hari pelatihan intensif", "3-day intensive training"),
      image: "/nodejs-backend-course.jpg",
    },
    {
      id: 3,
      title: t("Manajemen Insiden & Krisis Siber", "Cyber Incident & Crisis Management"),
      description: t("Membangun SOP lintas lembaga untuk respons cepat insiden siber.", "Building cross-institutional SOPs for rapid cyber incident response."),
      level: t("Untuk Government & CSIRT", "For Government & CSIRT"),
      students: 145,
      rating: 4.8,
      duration: t("2 hari simulasi tabletop", "2-day tabletop simulation"),
      image: "/react-nextjs-course.jpg",
    },
    {
      id: 4,
      title: t("Etika, Privasi, & Hak Digital", "Ethics, Privacy, & Digital Rights"),
      description: t("Menggali isu etika AI, privasi, dan hak warga negara di ruang digital.", "Exploring AI ethics, privacy, and citizens' rights in the digital space."),
      level: t("Untuk Akademisi & Komunitas", "For Academics & Communities"),
      students: 380,
      rating: 4.9,
      duration: t("2 hari diskusi panel", "2-day panel discussion"),
      image: "/python-data-science-course.jpg",
    },
    {
      id: 5,
      title: t("Kepatuhan & Audit Keamanan", "Security Compliance & Audit"),
      description: t("Menyusun kebijakan, standar, dan audit kepatuhan keamanan informasi.", "Developing policies, standards, and information security compliance audits."),
      level: t("Untuk Korporasi & BUMN", "For Corporations & SOEs"),
      students: 260,
      rating: 4.7,
      duration: t("2 hari workshop", "2-day workshop"),
      image: "/web-development-course.jpg",
    },
    {
      id: 6,
      title: t("Simulasi Sidang & Sengketa Siber", "Cyber Trial & Dispute Simulation"),
      description: t("Latihan kasus sengketa domain, pencemaran nama baik, dan kejahatan siber lintas batas.", "Practice cases on domain disputes, defamation, and cross-border cybercrime."),
      level: t("Untuk Advokat & In-House Counsel", "For Advocates & In-House Counsel"),
      students: 190,
      rating: 4.8,
      duration: t("2 hari praktik intensif", "2-day intensive practice"),
      image: "/tech-learning-illustration.jpg",
    },
  ];

  return (
    <section id="courses" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{t("Program & Inisiatif Utama", "Key Programs & Initiatives")}</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            {t("Rangkaian program strategis Dewan Hukum Siber untuk mendukung regulasi, penegakan hukum, dan literasi digital nasional.", "A series of strategic programs by the Cyber Law Council to support regulation, law enforcement, and national digital literacy.")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{course.level}</Badge>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    {course.students.toLocaleString()} {t("peserta", "students")}
                  </div>
                  <span>{course.duration}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
