// Course Management Types and Dummy Data for Indonesian Law Courses

export type CourseCategory =
  | "Hukum Pidana"
  | "Hukum Perdata"
  | "Hukum Tata Negara"
  | "Hukum Administrasi Negara"
  | "Hukum Internasional"
  | "Hukum Bisnis"
  | "Hukum Lingkungan"
  | "Hukum Keluarga"

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced"

export type CourseStatus = "Draft" | "Published"

export interface Author {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
  expertise: string[]
  socialLinks?: {
    linkedin?: string
    twitter?: string
    website?: string
  }
}

export interface Module {
  id: string
  title: string
  description: string
  learningObjectives: string[]
  order: number
}

export interface Course {
  id: string
  title: string
  shortDescription: string
  fullDescription?: string
  category: CourseCategory
  level: CourseLevel
  status: CourseStatus
  thumbnail: string
  estimatedDuration: string
  totalModules: number
  modules: Module[]
  author: Author
  createdAt: string
  updatedAt: string
  enrolledStudents?: number
  rating?: number
}

// Dummy Authors
export const authors: Author[] = [
  {
    id: "author-1",
    name: "Prof. Dr. Ahmad Sudirman, S.H., M.H.",
    title: "Guru Besar Hukum Pidana",
    bio: "Profesor hukum pidana dengan pengalaman lebih dari 25 tahun di bidang akademis dan praktik hukum. Penulis lebih dari 50 jurnal internasional dan 10 buku tentang hukum pidana Indonesia.",
    avatar: "/avatars/author-1.jpg",
    expertise: ["Hukum Pidana", "Kriminologi", "Viktimologi"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/ahmad-sudirman",
      website: "https://ahmadsudirman.ac.id",
    },
  },
  {
    id: "author-2",
    name: "Dr. Siti Rahayu, S.H., M.Hum.",
    title: "Pakar Hukum Perdata",
    bio: "Doktor hukum perdata dengan spesialisasi dalam hukum kontrak dan properti. Praktisi hukum senior dengan pengalaman di berbagai kasus perdata tingkat nasional.",
    avatar: "/avatars/author-2.jpg",
    expertise: ["Hukum Perdata", "Hukum Kontrak", "Hukum Properti"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/siti-rahayu",
    },
  },
  {
    id: "author-3",
    name: "Prof. Dr. Bambang Wijaya, S.H., LL.M.",
    title: "Ahli Hukum Tata Negara",
    bio: "Pakar hukum konstitusi dengan pengalaman sebagai konsultan DPR RI dalam penyusunan berbagai undang-undang. Aktif dalam penelitian perbandingan konstitusi.",
    avatar: "/avatars/author-3.jpg",
    expertise: ["Hukum Tata Negara", "Hukum Konstitusi", "Perbandingan Hukum"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/bambang-wijaya",
      twitter: "https://twitter.com/bambangwijaya",
    },
  },
]

// Dummy Courses
export const courses: Course[] = [
  {
    id: "course-1",
    title: "Pengantar Hukum Pidana Indonesia",
    shortDescription:
      "Pelajari dasar-dasar hukum pidana Indonesia, mulai dari asas-asas hukum pidana hingga penerapannya dalam kasus-kasus aktual.",
    fullDescription:
      "Kursus komprehensif tentang hukum pidana Indonesia yang mencakup sejarah, asas-asas, dan penerapan praktis. Peserta akan mempelajari KUHP, tindak pidana khusus, dan perkembangan hukum pidana modern di Indonesia.",
    category: "Hukum Pidana",
    level: "Beginner",
    status: "Published",
    thumbnail: "/thumbnails/hukum-pidana.jpg",
    estimatedDuration: "12 jam",
    totalModules: 6,
    modules: [
      {
        id: "mod-1-1",
        title: "Pengenalan Hukum Pidana",
        description:
          "Memahami definisi, ruang lingkup, dan fungsi hukum pidana dalam sistem hukum Indonesia.",
        learningObjectives: [
          "Memahami definisi hukum pidana",
          "Menjelaskan perbedaan hukum pidana dan perdata",
          "Mengidentifikasi fungsi hukum pidana dalam masyarakat",
        ],
        order: 1,
      },
      {
        id: "mod-1-2",
        title: "Asas-asas Hukum Pidana",
        description:
          "Mempelajari asas-asas fundamental dalam hukum pidana seperti asas legalitas, asas teritorialitas, dan asas ne bis in idem.",
        learningObjectives: [
          "Menjelaskan asas legalitas (nullum delictum)",
          "Memahami asas teritorialitas dan berlakunya hukum pidana",
          "Mengaplikasikan asas-asas dalam kasus konkret",
        ],
        order: 2,
      },
      {
        id: "mod-1-3",
        title: "Sumber Hukum Pidana di Indonesia",
        description:
          "Mengidentifikasi dan menganalisis berbagai sumber hukum pidana di Indonesia termasuk KUHP dan undang-undang khusus.",
        learningObjectives: [
          "Mengidentifikasi sumber hukum pidana tertulis",
          "Memahami hierarki peraturan perundang-undangan",
          "Menganalisis hubungan antar sumber hukum",
        ],
        order: 3,
      },
      {
        id: "mod-1-4",
        title: "Tindak Pidana dan Unsur-unsurnya",
        description:
          "Memahami konsep tindak pidana (strafbaar feit) dan unsur-unsur yang membentuk suatu perbuatan pidana.",
        learningObjectives: [
          "Mendefinisikan tindak pidana",
          "Menganalisis unsur objektif dan subjektif",
          "Membedakan kesengajaan dan kealpaan",
        ],
        order: 4,
      },
      {
        id: "mod-1-5",
        title: "Pertanggungjawaban Pidana",
        description:
          "Mempelajari konsep pertanggungjawaban pidana, kemampuan bertanggung jawab, dan alasan penghapus pidana.",
        learningObjectives: [
          "Memahami konsep kemampuan bertanggung jawab",
          "Mengidentifikasi alasan pembenar dan pemaaf",
          "Menganalisis pertanggungjawaban korporasi",
        ],
        order: 5,
      },
      {
        id: "mod-1-6",
        title: "Studi Kasus dan Analisis Putusan",
        description:
          "Menganalisis putusan-putusan pengadilan penting dalam perkembangan hukum pidana Indonesia.",
        learningObjectives: [
          "Menganalisis putusan pengadilan secara sistematis",
          "Mengidentifikasi ratio decidendi putusan",
          "Mengevaluasi penerapan hukum dalam kasus konkret",
        ],
        order: 6,
      },
    ],
    author: authors[0],
    createdAt: "2025-10-15",
    updatedAt: "2025-12-20",
    enrolledStudents: 1250,
    rating: 4.8,
  },
  {
    id: "course-2",
    title: "Hukum Perdata: Perikatan dan Kontrak",
    shortDescription:
      "Kuasai hukum perikatan dan kontrak untuk praktik hukum profesional dalam transaksi bisnis dan perdata.",
    fullDescription:
      "Kursus mendalam tentang hukum perikatan dan kontrak berdasarkan KUH Perdata. Membahas pembentukan kontrak, syarat sahnya perjanjian, wanprestasi, dan penyelesaian sengketa kontrak.",
    category: "Hukum Perdata",
    level: "Intermediate",
    status: "Published",
    thumbnail: "/thumbnails/hukum-perdata.jpg",
    estimatedDuration: "15 jam",
    totalModules: 5,
    modules: [
      {
        id: "mod-2-1",
        title: "Dasar-dasar Hukum Perikatan",
        description:
          "Memahami konsep perikatan, sumber perikatan, dan jenis-jenis perikatan dalam hukum perdata Indonesia.",
        learningObjectives: [
          "Mendefinisikan perikatan menurut Pasal 1233 KUH Perdata",
          "Membedakan perikatan dari undang-undang dan perjanjian",
          "Mengklasifikasikan jenis-jenis perikatan",
        ],
        order: 1,
      },
      {
        id: "mod-2-2",
        title: "Syarat Sahnya Perjanjian",
        description:
          "Menganalisis empat syarat sahnya perjanjian berdasarkan Pasal 1320 KUH Perdata.",
        learningObjectives: [
          "Menganalisis syarat subjektif dan objektif perjanjian",
          "Mengevaluasi akibat tidak terpenuhinya syarat sah",
          "Mengidentifikasi perjanjian batal demi hukum vs dapat dibatalkan",
        ],
        order: 2,
      },
      {
        id: "mod-2-3",
        title: "Wanprestasi dan Akibat Hukumnya",
        description:
          "Mempelajari konsep wanprestasi, bentuk-bentuknya, dan akibat hukum yang ditimbulkan.",
        learningObjectives: [
          "Mendefinisikan wanprestasi dan bentuk-bentuknya",
          "Menganalisis somasi dan fungsinya",
          "Menghitung ganti rugi akibat wanprestasi",
        ],
        order: 3,
      },
      {
        id: "mod-2-4",
        title: "Hapusnya Perikatan",
        description:
          "Memahami berbagai cara hapusnya perikatan menurut Pasal 1381 KUH Perdata.",
        learningObjectives: [
          "Mengidentifikasi sepuluh cara hapusnya perikatan",
          "Menganalisis pembebasan utang dan novasi",
          "Memahami konsep kedaluwarsa dalam perikatan",
        ],
        order: 4,
      },
      {
        id: "mod-2-5",
        title: "Praktik Penyusunan Kontrak",
        description:
          "Praktik langsung menyusun kontrak bisnis yang baik dan sesuai hukum.",
        learningObjectives: [
          "Menyusun struktur kontrak yang sistematis",
          "Merumuskan klausul-klausul penting dalam kontrak",
          "Menghindari kesalahan umum dalam penyusunan kontrak",
        ],
        order: 5,
      },
    ],
    author: authors[1],
    createdAt: "2025-08-10",
    updatedAt: "2025-11-15",
    enrolledStudents: 890,
    rating: 4.6,
  },
  {
    id: "course-3",
    title: "Hukum Tata Negara dan Konstitusi",
    shortDescription:
      "Pahami sistem ketatanegaraan Indonesia, konstitusi, dan pembagian kekuasaan negara secara mendalam.",
    fullDescription:
      "Kursus komprehensif tentang hukum tata negara Indonesia meliputi UUD 1945, sistem pemerintahan, lembaga-lembaga negara, dan perkembangan konstitusi pasca reformasi.",
    category: "Hukum Tata Negara",
    level: "Advanced",
    status: "Published",
    thumbnail: "/thumbnails/hukum-tata-negara.jpg",
    estimatedDuration: "18 jam",
    totalModules: 7,
    modules: [
      {
        id: "mod-3-1",
        title: "Pengantar Hukum Tata Negara",
        description:
          "Memahami konsep dasar hukum tata negara dan hubungannya dengan ilmu politik.",
        learningObjectives: [
          "Mendefinisikan hukum tata negara",
          "Membedakan objek kajian hukum tata negara",
          "Mengidentifikasi sumber hukum tata negara",
        ],
        order: 1,
      },
      {
        id: "mod-3-2",
        title: "Sejarah Konstitusi Indonesia",
        description:
          "Menelusuri perjalanan konstitusi Indonesia dari UUD 1945 hingga amandemen.",
        learningObjectives: [
          "Menganalisis dinamika konstitusi Indonesia",
          "Memahami latar belakang amandemen UUD 1945",
          "Mengevaluasi perubahan substansial pasca amandemen",
        ],
        order: 2,
      },
      {
        id: "mod-3-3",
        title: "Hierarki Peraturan Perundang-undangan",
        description:
          "Memahami tata urutan peraturan perundang-undangan berdasarkan UU No. 12 Tahun 2011.",
        learningObjectives: [
          "Menjelaskan hierarki peraturan perundang-undangan",
          "Menganalisis asas-asas pembentukan peraturan",
          "Mengevaluasi pengujian peraturan perundang-undangan",
        ],
        order: 3,
      },
      {
        id: "mod-3-4",
        title: "Lembaga-lembaga Negara",
        description:
          "Menganalisis kedudukan dan fungsi lembaga-lembaga negara menurut UUD 1945.",
        learningObjectives: [
          "Mengidentifikasi lembaga negara utama",
          "Menganalisis hubungan antar lembaga negara",
          "Memahami checks and balances dalam sistem ketatanegaraan",
        ],
        order: 4,
      },
      {
        id: "mod-3-5",
        title: "Hak Asasi Manusia dalam Konstitusi",
        description:
          "Mempelajari jaminan HAM dalam UUD 1945 dan perkembangannya pasca amandemen.",
        learningObjectives: [
          "Mengidentifikasi HAM dalam UUD 1945",
          "Menganalisis pembatasan HAM yang konstitusional",
          "Mengevaluasi penegakan HAM di Indonesia",
        ],
        order: 5,
      },
      {
        id: "mod-3-6",
        title: "Otonomi Daerah dan Pemerintahan Lokal",
        description:
          "Memahami sistem otonomi daerah dan hubungan pemerintah pusat dengan daerah.",
        learningObjectives: [
          "Menjelaskan konsep desentralisasi dan dekonsentrasi",
          "Menganalisis kewenangan pemerintah daerah",
          "Mengevaluasi pelaksanaan otonomi daerah",
        ],
        order: 6,
      },
      {
        id: "mod-3-7",
        title: "Mahkamah Konstitusi dan Pengujian Undang-undang",
        description:
          "Menganalisis peran MK dalam pengujian undang-undang terhadap UUD 1945.",
        learningObjectives: [
          "Memahami kewenangan Mahkamah Konstitusi",
          "Menganalisis putusan-putusan penting MK",
          "Mengevaluasi dampak putusan MK terhadap sistem hukum",
        ],
        order: 7,
      },
    ],
    author: authors[2],
    createdAt: "2025-06-20",
    updatedAt: "2025-12-01",
    enrolledStudents: 675,
    rating: 4.9,
  },
  {
    id: "course-4",
    title: "Hukum Administrasi Negara",
    shortDescription:
      "Pelajari hukum administrasi negara untuk memahami tindakan pemerintah dan perlindungan hukum masyarakat.",
    category: "Hukum Administrasi Negara",
    level: "Intermediate",
    status: "Draft",
    thumbnail: "/thumbnails/hukum-administrasi.jpg",
    estimatedDuration: "10 jam",
    totalModules: 4,
    modules: [
      {
        id: "mod-4-1",
        title: "Pengantar Hukum Administrasi Negara",
        description:
          "Memahami ruang lingkup dan objek kajian hukum administrasi negara.",
        learningObjectives: [
          "Mendefinisikan hukum administrasi negara",
          "Mengidentifikasi sumber hukum administrasi",
          "Memahami hubungan HAN dengan hukum tata negara",
        ],
        order: 1,
      },
      {
        id: "mod-4-2",
        title: "Tindakan Pemerintah",
        description:
          "Menganalisis berbagai bentuk tindakan hukum pemerintah dan akibat hukumnya.",
        learningObjectives: [
          "Mengklasifikasikan tindakan pemerintah",
          "Menganalisis keputusan tata usaha negara",
          "Memahami diskresi pejabat administrasi",
        ],
        order: 2,
      },
      {
        id: "mod-4-3",
        title: "Perlindungan Hukum Masyarakat",
        description:
          "Mempelajari upaya hukum masyarakat terhadap tindakan pemerintah yang merugikan.",
        learningObjectives: [
          "Mengidentifikasi upaya administratif",
          "Memahami gugatan ke PTUN",
          "Menganalisis putusan PTUN",
        ],
        order: 3,
      },
      {
        id: "mod-4-4",
        title: "Asas-asas Umum Pemerintahan yang Baik",
        description:
          "Memahami AUPB sebagai tolok ukur tindakan pemerintah yang sah.",
        learningObjectives: [
          "Mengidentifikasi AUPB dalam UU AP",
          "Mengaplikasikan AUPB dalam kasus konkret",
          "Mengevaluasi pelanggaran AUPB",
        ],
        order: 4,
      },
    ],
    author: authors[2],
    createdAt: "2025-11-01",
    updatedAt: "2025-12-15",
    enrolledStudents: 0,
    rating: 0,
  },
  {
    id: "course-5",
    title: "Hukum Bisnis dan Perusahaan",
    shortDescription:
      "Kuasai aspek hukum dalam dunia bisnis, dari pendirian perusahaan hingga merger dan akuisisi.",
    category: "Hukum Bisnis",
    level: "Advanced",
    status: "Published",
    thumbnail: "/thumbnails/hukum-bisnis.jpg",
    estimatedDuration: "20 jam",
    totalModules: 6,
    modules: [
      {
        id: "mod-5-1",
        title: "Bentuk-bentuk Badan Usaha",
        description:
          "Memahami berbagai bentuk badan usaha di Indonesia dan karakteristiknya.",
        learningObjectives: [
          "Membedakan PT, CV, Firma, dan badan usaha lainnya",
          "Menganalisis kelebihan dan kekurangan masing-masing bentuk",
          "Memahami prosedur pendirian badan usaha",
        ],
        order: 1,
      },
      {
        id: "mod-5-2",
        title: "Hukum Perseroan Terbatas",
        description:
          "Menganalisis UU PT dan aspek hukum perseroan terbatas secara komprehensif.",
        learningObjectives: [
          "Memahami organ-organ PT dan kewenangannya",
          "Menganalisis tanggung jawab direksi dan komisaris",
          "Mengevaluasi perlindungan pemegang saham minoritas",
        ],
        order: 2,
      },
      {
        id: "mod-5-3",
        title: "Hukum Kontrak Bisnis",
        description:
          "Menyusun dan menganalisis kontrak-kontrak bisnis yang kompleks.",
        learningObjectives: [
          "Menyusun kontrak bisnis yang komprehensif",
          "Menganalisis klausul-klausul krusial dalam kontrak bisnis",
          "Menyelesaikan sengketa kontrak bisnis",
        ],
        order: 3,
      },
      {
        id: "mod-5-4",
        title: "Merger dan Akuisisi",
        description:
          "Memahami aspek hukum dalam transaksi merger, akuisisi, dan konsolidasi.",
        learningObjectives: [
          "Membedakan merger, akuisisi, dan konsolidasi",
          "Menganalisis due diligence dalam M&A",
          "Memahami aspek persaingan usaha dalam M&A",
        ],
        order: 4,
      },
      {
        id: "mod-5-5",
        title: "Hukum Kepailitan dan PKPU",
        description:
          "Mempelajari prosedur kepailitan dan penundaan kewajiban pembayaran utang.",
        learningObjectives: [
          "Memahami syarat dan prosedur kepailitan",
          "Menganalisis PKPU sebagai alternatif kepailitan",
          "Mengevaluasi hak kreditor dalam kepailitan",
        ],
        order: 5,
      },
      {
        id: "mod-5-6",
        title: "Hukum Pasar Modal",
        description:
          "Memahami regulasi pasar modal dan perlindungan investor.",
        learningObjectives: [
          "Mengidentifikasi pelaku pasar modal",
          "Menganalisis keterbukaan informasi dan insider trading",
          "Memahami sanksi pelanggaran hukum pasar modal",
        ],
        order: 6,
      },
    ],
    author: authors[1],
    createdAt: "2025-07-15",
    updatedAt: "2025-12-10",
    enrolledStudents: 542,
    rating: 4.7,
  },
  {
    id: "course-6",
    title: "Hukum Keluarga Indonesia",
    shortDescription:
      "Pelajari hukum perkawinan, perceraian, dan kewarisan di Indonesia dengan pendekatan praktis.",
    category: "Hukum Keluarga",
    level: "Beginner",
    status: "Draft",
    thumbnail: "/thumbnails/hukum-keluarga.jpg",
    estimatedDuration: "8 jam",
    totalModules: 4,
    modules: [
      {
        id: "mod-6-1",
        title: "Hukum Perkawinan",
        description:
          "Memahami syarat, prosedur, dan akibat hukum perkawinan di Indonesia.",
        learningObjectives: [
          "Menganalisis UU Perkawinan No. 1 Tahun 1974",
          "Memahami syarat sahnya perkawinan",
          "Mengidentifikasi hak dan kewajiban suami istri",
        ],
        order: 1,
      },
      {
        id: "mod-6-2",
        title: "Harta Bersama dan Perjanjian Perkawinan",
        description:
          "Mempelajari pengaturan harta dalam perkawinan dan perjanjian pranikah.",
        learningObjectives: [
          "Memahami konsep harta bersama dan harta bawaan",
          "Menyusun perjanjian perkawinan yang sah",
          "Menganalisis pembagian harta saat perceraian",
        ],
        order: 2,
      },
      {
        id: "mod-6-3",
        title: "Perceraian dan Akibat Hukumnya",
        description:
          "Memahami alasan, prosedur perceraian, dan hak-hak pasca perceraian.",
        learningObjectives: [
          "Mengidentifikasi alasan perceraian",
          "Memahami prosedur perceraian di pengadilan",
          "Menganalisis hak asuh anak dan nafkah",
        ],
        order: 3,
      },
      {
        id: "mod-6-4",
        title: "Hukum Kewarisan",
        description:
          "Mempelajari sistem kewarisan menurut hukum perdata, Islam, dan adat.",
        learningObjectives: [
          "Membandingkan sistem kewarisan di Indonesia",
          "Menghitung bagian waris menurut berbagai sistem",
          "Menyelesaikan sengketa waris",
        ],
        order: 4,
      },
    ],
    author: authors[1],
    createdAt: "2025-12-01",
    updatedAt: "2025-12-28",
    enrolledStudents: 0,
    rating: 0,
  },
]

// Category options for forms
export const categoryOptions = [
  { value: "Hukum Pidana", label: "Hukum Pidana" },
  { value: "Hukum Perdata", label: "Hukum Perdata" },
  { value: "Hukum Tata Negara", label: "Hukum Tata Negara" },
  { value: "Hukum Administrasi Negara", label: "Hukum Administrasi Negara" },
  { value: "Hukum Internasional", label: "Hukum Internasional" },
  { value: "Hukum Bisnis", label: "Hukum Bisnis" },
  { value: "Hukum Lingkungan", label: "Hukum Lingkungan" },
  { value: "Hukum Keluarga", label: "Hukum Keluarga" },
]

// Level options for forms
export const levelOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
]

// Status options for forms
export const statusOptions = [
  { value: "Draft", label: "Draft" },
  { value: "Published", label: "Published" },
]

// Helper function to get course by ID
export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id)
}

// Helper function to filter courses
export function filterCourses(
  searchTerm: string,
  category: string,
  status: string
): Course[] {
  return courses.filter((course) => {
    const matchesSearch =
      searchTerm === "" ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = category === "" || category === "all" || course.category === category

    const matchesStatus = status === "" || status === "all" || course.status === status

    return matchesSearch && matchesCategory && matchesStatus
  })
}
