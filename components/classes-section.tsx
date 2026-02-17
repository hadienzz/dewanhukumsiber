import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Star, Users } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Regulasi & Tata Kelola Siber",
    description: "Memahami kerangka hukum nasional terkait keamanan siber dan data pribadi.",
    level: "Untuk Regulator & Legal",
    students: 320,
    rating: 4.9,
    duration: "2 hari lokakarya",
    image: "/cloud-devops-course.jpg",
  },
  {
    id: 2,
    title: "Forensik & Pembuktian Digital",
    description: "Pendalaman teknik pengumpulan, analisis, dan pembuktian barang bukti digital.",
    level: "Untuk Penegak Hukum",
    students: 210,
    rating: 4.8,
    duration: "3 hari pelatihan intensif",
    image: "/nodejs-backend-course.jpg",
  },
  {
    id: 3,
    title: "Manajemen Insiden & Krisis Siber",
    description: "Membangun SOP lintas lembaga untuk respons cepat insiden siber.",
    level: "Untuk Government & CSIRT",
    students: 145,
    rating: 4.8,
    duration: "2 hari simulasi tabletop",
    image: "/react-nextjs-course.jpg",
  },
  {
    id: 4,
    title: "Etika, Privasi, & Hak Digital",
    description: "Menggali isu etika AI, privasi, dan hak warga negara di ruang digital.",
    level: "Untuk Akademisi & Komunitas",
    students: 380,
    rating: 4.9,
    duration: "2 hari diskusi panel",
    image: "/python-data-science-course.jpg",
  },
  {
    id: 5,
    title: "Kepatuhan & Audit Keamanan",
    description: "Menyusun kebijakan, standar, dan audit kepatuhan keamanan informasi.",
    level: "Untuk Korporasi & BUMN",
    students: 260,
    rating: 4.7,
    duration: "2 hari workshop",
    image: "/web-development-course.jpg",
  },
  {
    id: 6,
    title: "Simulasi Sidang & Sengketa Siber",
    description: "Latihan kasus sengketa domain, pencemaran nama baik, dan kejahatan siber lintas batas.",
    level: "Untuk Advokat & In-House Counsel",
    students: 190,
    rating: 4.8,
    duration: "2 hari praktik intensif",
    image: "/tech-learning-illustration.jpg",
  },
]

export default function ClassesSection() {
  return (
    <section id="courses" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Program & Inisiatif Utama</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Rangkaian program strategis Dewan Hukum Siber untuk mendukung regulasi, penegakan hukum, dan literasi digital nasional.
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
                    {course.students.toLocaleString()} students
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
