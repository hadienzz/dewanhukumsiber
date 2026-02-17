// Training, Workshop, and Review Data for DHSI

export type TrainingType = "pelatihan" | "workshop";
export type TrainingStatus = "upcoming" | "ongoing" | "completed";

export interface TrainingSession {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  type: TrainingType;
  status: TrainingStatus;
  thumbnail: string;
  date: string;
  end_date?: string;
  time: string;
  end_time: string;
  location: string;
  is_online: boolean;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  category: string;
  level: string;
  max_participants: number;
  enrolled_participants: number;
  price: string;
  syllabus: string[];
  requirements: string[];
  benefits: string[];
  rating?: number;
  total_reviews?: number;
}

export interface TrainingReview {
  id: string;
  training_id: string;
  training_title: string;
  training_type: TrainingType;
  reviewer_name: string;
  reviewer_role: string;
  reviewer_avatar: string;
  rating: number;
  content: string;
  date: string;
  helpful: number;
}

// Pelatihan Terbaru (Latest Training)
export const latestTrainings: TrainingSession[] = [
  {
    id: "training-1",
    title: "Certified Cyber Law Practitioner (CCLP)",
    short_description:
      "Sertifikasi profesional untuk praktisi hukum siber dengan standar internasional.",
    full_description:
      "Program sertifikasi komprehensif yang dirancang untuk para praktisi hukum yang ingin mendalami aspek hukum siber. Peserta akan mempelajari regulasi data pribadi, kejahatan siber, forensik digital, dan penyelesaian sengketa online. Sertifikasi ini diakui secara nasional dan memberikan kredensial yang kuat dalam industri hukum teknologi.",
    type: "pelatihan",
    status: "upcoming",
    thumbnail: "https://placehold.co/800x600/1e3a5f/ffffff?text=Cyber+Law",
    date: "2026-02-15",
    end_date: "2026-02-20",
    time: "09:00 - 16:00 WIB",
    duration: "6 hari (48 jam)",
    location: "Hotel Pullman Jakarta Central Park",
    is_online: false,
    instructor: {
      name: "Prof. Dr. Ahmad Sudirman, S.H., M.H.",
      title: "Guru Besar Hukum Pidana & Pakar Hukum Siber",
      avatar: "https://placehold.co/200x200/6b7280/ffffff?text=AS",
    },
    category: "Sertifikasi Profesional",
    level: "Advanced",
    max_participants: 30,
    enrolled_participants: 22,
    price: "Rp 12.500.000",
    syllabus: [
      "Pengantar Hukum Siber Indonesia dan Internasional",
      "UU ITE dan Peraturan Pelaksanaannya",
      "Perlindungan Data Pribadi (UU PDP)",
      "Kejahatan Siber dan Pembuktian Digital",
      "Forensik Digital untuk Praktisi Hukum",
      "Penyelesaian Sengketa E-Commerce",
      "Studi Kasus dan Simulasi Sidang",
      "Ujian Sertifikasi CCLP",
    ],
    requirements: [
      "Sarjana Hukum atau bidang terkait",
      "Pengalaman minimal 2 tahun di bidang hukum",
      "Memahami dasar-dasar teknologi informasi",
    ],
    benefits: [
      "Sertifikat CCLP yang diakui nasional",
      "Akses ke jaringan alumni DHSI",
      "Materi pelatihan komprehensif",
      "Konsultasi pasca-pelatihan selama 3 bulan",
    ],
  },
  {
    id: "training-2",
    title: "Digital Forensics for Legal Professionals",
    short_description:
      "Pelatihan intensif forensik digital untuk profesional hukum.",
    full_description:
      "Pelatihan hands-on yang mengajarkan teknik pengumpulan, preservasi, dan analisis bukti digital. Ditujukan untuk advokat, jaksa, dan hakim yang menangani kasus-kasus terkait teknologi. Peserta akan belajar menggunakan tools forensik standar industri.",
    type: "pelatihan",
    status: "ongoing",
    thumbnail:
      "https://placehold.co/800x600/1e3a5f/ffffff?text=Digital+Forensics",
    date: "2026-01-10",
    end_date: "2026-01-14",
    time: "09:00 - 17:00 WIB",
    duration: "5 hari (40 jam)",
    location: "Online via Zoom",
    is_online: true,
    instructor: {
      name: "Dr. Ir. Rudi Hartono, M.Kom.",
      title: "Pakar Forensik Digital & Konsultan Keamanan",
      avatar: "https://placehold.co/200x200/6b7280/ffffff?text=RH",
    },
    category: "Forensik Digital",
    level: "Intermediate",
    max_participants: 25,
    enrolled_participants: 25,
    price: "Rp 8.500.000",
    syllabus: [
      "Prinsip Dasar Forensik Digital",
      "Legal Framework untuk Digital Evidence",
      "Teknik Akuisisi dan Preservasi Data",
      "Analisis Media Penyimpanan",
      "Mobile Device Forensics",
      "Network Forensics",
      "Penyusunan Laporan Forensik",
      "Expert Witness Preparation",
    ],
    requirements: [
      "Profesional hukum atau IT security",
      "Laptop dengan spesifikasi minimal 8GB RAM",
      "Familiar dengan sistem operasi Windows/Linux",
    ],
    benefits: [
      "Sertifikat Kompetensi Forensik Digital",
      "Software forensik berlisensi edukasi",
      "Akses ke lab virtual selama 6 bulan",
      "E-book dan materi referensi",
    ],
    rating: 4.9,
    total_reviews: 45,
  },
  {
    id: "training-3",
    title: "Privacy & Data Protection Officer Training",
    short_description:
      "Pelatihan DPO sesuai standar UU Perlindungan Data Pribadi.",
    full_description:
      "Program pelatihan lengkap untuk calon Data Protection Officer sesuai dengan UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi. Mencakup aspek legal, teknis, dan manajerial dari perlindungan data.",
    type: "pelatihan",
    status: "upcoming",
    thumbnail:
      "https://placehold.co/800x600/1e3a5f/ffffff?text=Data+Protection",
    date: "2026-03-01",
    end_date: "2026-03-03",
    time: "09:00 - 16:00 WIB",
    duration: "3 hari (24 jam)",
    location: "Aston Priority Simatupang Hotel",
    is_online: false,
    instructor: {
      name: "Dr. Siti Rahayu, S.H., M.Hum.",
      title: "Pakar Hukum Perdata & Perlindungan Data",
      avatar: "https://placehold.co/200x200/6b7280/ffffff?text=SR",
    },
    category: "Perlindungan Data",
    level: "Intermediate",
    max_participants: 35,
    enrolled_participants: 18,
    price: "Rp 7.500.000",
    syllabus: [
      "Framework UU PDP Indonesia",
      "Peran dan Tanggung Jawab DPO",
      "Data Processing Principles",
      "Hak-hak Subjek Data",
      "Data Protection Impact Assessment",
      "Breach Notification Procedures",
      "Cross-border Data Transfer",
      "Compliance Audit dan Monitoring",
    ],
    requirements: [
      "Profesional hukum, IT, atau compliance",
      "Minimal S1 dari berbagai disiplin ilmu",
      "Memahami operasional organisasi",
    ],
    benefits: [
      "Sertifikat DPO yang diakui",
      "Template dokumen compliance",
      "Membership komunitas DPO Indonesia",
      "Update regulasi berkala",
    ],
  },
];

// Workshop Mendatang (Upcoming Workshops)
export const upcomingWorkshops: TrainingSession[] = [
  {
    id: "workshop-1",
    title: "Workshop: Menyusun Kebijakan Privasi yang Efektif",
    short_description: "Praktik langsung menyusun privacy policy sesuai UU PDP.",
    full_description:
      "Workshop praktis satu hari untuk menyusun kebijakan privasi yang compliant dengan UU Perlindungan Data Pribadi. Peserta akan membawa pulang template dan framework yang dapat langsung diimplementasikan di organisasinya.",
    type: "workshop",
    status: "upcoming",
    thumbnail: "https://placehold.co/800x600/1e3a5f/ffffff?text=Privacy+Policy",
    date: "2026-01-25",
    time: "09:00 - 16:00 WIB",
    duration: "1 hari (7 jam)",
    location: "Swiss-Belhotel Mangga Besar",
    is_online: false,
    instructor: {
      name: "Andi Prasetyo, S.H., LL.M.",
      title: "Privacy Counsel & CIPP/E",
      avatar: "https://placehold.co/200x200/6b7280/ffffff?text=AP",
    },
    category: "Compliance",
    level: "Beginner",
    max_participants: 40,
    enrolled_participants: 28,
    price: "Rp 2.500.000",
    syllabus: [
      "Elemen Wajib Privacy Policy",
      "Drafting Techniques",
      "Common Mistakes to Avoid",
      "Workshop: Hands-on Drafting",
      "Peer Review Session",
    ],
    requirements: ["Terbuka untuk semua profesional", "Membawa laptop"],
    benefits: [
      "Template Privacy Policy",
      "Checklist Compliance",
      "Sertifikat Partisipasi",
    ],
  },
  {
    id: "workshop-2",
    title: "Workshop: Incident Response & Crisis Communication",
    short_description:
      "Simulasi penanganan insiden siber dan komunikasi krisis.",
    full_description:
      "Workshop tabletop exercise yang mensimulasikan skenario insiden siber nyata. Peserta akan belajar koordinasi lintas tim, pengambilan keputusan cepat, dan strategi komunikasi krisis yang efektif.",
    type: "workshop",
    status: "upcoming",
    thumbnail:
      "https://placehold.co/800x600/1e3a5f/ffffff?text=Incident+Response",
    date: "2026-02-08",
    time: "08:30 - 17:00 WIB",
    duration: "1 hari (8 jam)",
    location: "Online via Zoom",
    is_online: true,
    instructor: {
      name: "Ir. Budi Santoso, CISSP, CISM",
      title: "Chief Security Officer & Incident Response Expert",
      avatar: "https://placehold.co/200x200/6b7280/ffffff?text=BS",
    },
    category: "Keamanan Siber",
    level: "Intermediate",
    max_participants: 30,
    enrolled_participants: 15,
    price: "Rp 3.000.000",
    syllabus: [
      "Incident Response Framework",
      "Tabletop Exercise: Ransomware Attack",
      "Communication Protocol",
      "Legal Considerations",
      "Post-Incident Review",
    ],
    requirements: [
      "Tim IT, Legal, atau Communications",
      "Direkomendasikan mengikuti secara tim",
    ],
    benefits: [
      "Incident Response Playbook",
      "Communication Templates",
      "Sertifikat Partisipasi",
    ],
  },
  {
    id: "workshop-3",
    title: "Workshop: AI Governance & Legal Compliance",
    short_description: "Memahami regulasi AI dan menyusun governance framework.",
    full_description:
      "Workshop eksklusif yang membahas landscape regulasi AI di Indonesia dan global, serta cara menyusun AI governance framework yang sesuai dengan prinsip-prinsip etika dan hukum yang berlaku.",
    type: "workshop",
    status: "upcoming",
    thumbnail: "https://placehold.co/800x600/1e3a5f/ffffff?text=AI+Governance",
    date: "2026-02-22",
    time: "09:00 - 16:00 WIB",
    duration: "1 hari (7 jam)",
    location: "The Westin Jakarta",
    is_online: false,
    instructor: {
      name: "Prof. Dr. Bambang Wijaya, S.H., LL.M.",
      title: "Ahli Hukum Tata Negara & AI Ethics Researcher",
      avatar: "https://placehold.co/200x200/6b7280/ffffff?text=BW",
    },
    category: "AI & Emerging Tech",
    level: "Advanced",
    max_participants: 25,
    enrolled_participants: 20,
    price: "Rp 4.500.000",
    syllabus: [
      "AI Regulatory Landscape",
      "Ethical AI Principles",
      "Risk Assessment Framework",
      "Governance Structure Design",
      "Case Studies from Global Organizations",
    ],
    requirements: [
      "Legal, Compliance, atau Tech Leaders",
      "Familiar dengan konsep AI/ML",
    ],
    benefits: [
      "AI Governance Framework Template",
      "Risk Assessment Toolkit",
      "Exclusive Networking Session",
    ],
  },
];

// Kelas yang Sudah Selesai dengan Review
export const completedTrainings: TrainingSession[] = [
  {
    id: "completed-1",
    title: "Masterclass: Cyber Crime Investigation",
    short_description:
      "Pelatihan investigasi kejahatan siber untuk penegak hukum.",
    full_description:
      "Program masterclass intensif yang membekali peserta dengan keterampilan investigasi kejahatan siber mulai dari pengumpulan bukti hingga penyusunan berkas perkara.",
    type: "pelatihan",
    status: "completed",
    thumbnail: "https://placehold.co/800x600/1e3a5f/ffffff?text=Cyber+Crime",
    date: "2025-11-15",
    end_date: "2025-11-19",
    time: "09:00 - 17:00 WIB",
    duration: "5 hari (40 jam)",
    location: "Jakarta Convention Center",
    is_online: false,
    instructor: {
      name: "AKBP Dr. Hendri Wijaya, S.IK., M.H.",
      title: "Kepala Unit Cyber Crime Polri",
      avatar: "https://placehold.co/200x200/6b7280/ffffff?text=HW",
    },
    category: "Penegakan Hukum",
    level: "Advanced",
    max_participants: 30,
    enrolled_participants: 30,
    price: "Rp 15.000.000",
    syllabus: [
      "Tipologi Kejahatan Siber",
      "Teknik Investigasi Digital",
      "Koordinasi Lintas Yurisdiksi",
      "Penyusunan Berkas Perkara",
    ],
    requirements: ["Penegak hukum atau profesional keamanan"],
    benefits: ["Sertifikat Masterclass", "Networking dengan praktisi"],
    rating: 4.9,
    total_reviews: 28,
  },
  {
    id: "completed-2",
    title: "Workshop: Smart Contract & Blockchain Legal Issues",
    short_description: "Aspek hukum smart contract dan teknologi blockchain.",
    full_description:
      "Workshop yang mengupas tuntas aspek legal dari smart contract, cryptocurrency, dan teknologi blockchain di Indonesia.",
    type: "workshop",
    status: "completed",
    thumbnail: "https://placehold.co/800x600/1e3a5f/ffffff?text=Blockchain",
    date: "2025-10-20",
    time: "09:00 - 16:00 WIB",
    duration: "1 hari (7 jam)",
    location: "Online via Zoom",
    is_online: true,
    instructor: {
      name: "Dr. Lisa Permata, S.H., M.Kn.",
      title: "Notaris & Blockchain Legal Expert",
      avatar: "https://placehold.co/200x200/6b7280/ffffff?text=LP",
    },
    category: "Fintech & Blockchain",
    level: "Intermediate",
    max_participants: 50,
    enrolled_participants: 48,
    price: "Rp 2.000.000",
    syllabus: [
      "Blockchain Technology Overview",
      "Legal Status of Smart Contracts",
      "Cryptocurrency Regulations",
      "NFT & Digital Assets",
    ],
    requirements: ["Terbuka untuk semua profesional"],
    benefits: ["Materi presentasi", "Sertifikat"],
    rating: 4.8,
    total_reviews: 42,
  },
  {
    id: "completed-3",
    title: "Certified Information Privacy Professional (CIPP)",
    short_description: "Sertifikasi internasional untuk profesional privasi.",
    full_description:
      "Program persiapan ujian sertifikasi CIPP/E yang diakui secara internasional oleh IAPP.",
    type: "pelatihan",
    status: "completed",
    thumbnail: "https://placehold.co/800x600/1e3a5f/ffffff?text=CIPP",
    date: "2025-09-01",
    end_date: "2025-09-05",
    time: "09:00 - 16:00 WIB",
    duration: "5 hari (35 jam)",
    location: "Hotel Mulia Senayan",
    is_online: false,
    instructor: {
      name: "Maria Gonzales, CIPP/E, CIPM",
      title: "IAPP Certified Trainer",
      avatar: "https://placehold.co/200x200/6b7280/ffffff?text=MG",
    },
    category: "Sertifikasi Internasional",
    level: "Advanced",
    max_participants: 25,
    enrolled_participants: 25,
    price: "Rp 18.000.000",
    syllabus: [
      "European Data Protection Framework",
      "GDPR Deep Dive",
      "Cross-border Data Transfers",
      "Exam Preparation",
    ],
    requirements: ["Profesional dengan pengalaman di bidang privasi"],
    benefits: ["Voucher ujian CIPP/E", "Study materials resmi IAPP"],
    rating: 4.9,
    total_reviews: 23,
  },
  {
    id: "completed-4",
    title: "Workshop: E-Commerce Dispute Resolution",
    short_description:
      "Penyelesaian sengketa e-commerce dan perlindungan konsumen.",
    full_description:
      "Workshop praktis tentang mekanisme penyelesaian sengketa dalam transaksi e-commerce.",
    type: "workshop",
    status: "completed",
    thumbnail: "https://placehold.co/800x600/1e3a5f/ffffff?text=E-Commerce",
    date: "2025-08-15",
    time: "09:00 - 15:00 WIB",
    duration: "1 hari (6 jam)",
    location: "Mercure Jakarta Sabang",
    is_online: false,
    instructor: {
      name: "Dewi Kartika, S.H., M.H.",
      title: "Arbiter BANI & E-Commerce Expert",
      avatar: "https://placehold.co/200x200/6b7280/ffffff?text=DK",
    },
    category: "E-Commerce",
    level: "Beginner",
    max_participants: 45,
    enrolled_participants: 40,
    price: "Rp 1.500.000",
    syllabus: [
      "Regulasi E-Commerce Indonesia",
      "Hak Konsumen Digital",
      "Mekanisme ODR",
      "Studi Kasus",
    ],
    requirements: ["Terbuka untuk umum"],
    benefits: ["Template dokumen", "Sertifikat"],
    rating: 4.7,
    total_reviews: 35,
  },
];

// Review dengan informasi kelas yang direview
export const trainingReviews: TrainingReview[] = [
  {
    id: "review-1",
    training_id: "completed-1",
    training_title: "Masterclass: Cyber Crime Investigation",
    training_type: "pelatihan",
    reviewer_name: "Kompol Agus Dermawan, S.H.",
    reviewer_role: "Penyidik Cyber Crime",
    reviewer_avatar: "https://placehold.co/100x100/6b7280/ffffff?text=AD",
    rating: 5,
    content:
      "Pelatihan yang sangat komprehensif dan aplikatif. Instruktur sangat berpengalaman dan materi langsung bisa diterapkan dalam investigasi nyata. Simulasi kasusnya sangat membantu memahami alur investigasi yang benar.",
    date: "2025-11-22",
    helpful: 45,
  },
  {
    id: "review-2",
    training_id: "completed-1",
    training_title: "Masterclass: Cyber Crime Investigation",
    training_type: "pelatihan",
    reviewer_name: "Iptu Ratna Sari, S.Kom.",
    reviewer_role: "Analis Digital Forensik",
    reviewer_avatar: "https://placehold.co/100x100/6b7280/ffffff?text=RS",
    rating: 5,
    content:
      "Materi forensik digitalnya sangat detail dan up-to-date. Saya mendapatkan banyak insight baru tentang teknik investigasi modern yang belum pernah saya pelajari sebelumnya.",
    date: "2025-11-21",
    helpful: 38,
  },
  {
    id: "review-3",
    training_id: "completed-2",
    training_title: "Workshop: Smart Contract & Blockchain Legal Issues",
    training_type: "workshop",
    reviewer_name: "Rina Handayani, S.H., M.Kn.",
    reviewer_role: "Corporate Lawyer",
    reviewer_avatar: "https://placehold.co/100x100/6b7280/ffffff?text=RH",
    rating: 5,
    content:
      "Workshop yang sangat membuka wawasan tentang aspek legal blockchain. Dr. Lisa menjelaskan konsep teknis dengan bahasa yang mudah dipahami oleh praktisi hukum.",
    date: "2025-10-22",
    helpful: 52,
  },
  {
    id: "review-4",
    training_id: "completed-2",
    training_title: "Workshop: Smart Contract & Blockchain Legal Issues",
    training_type: "workshop",
    reviewer_name: "Dimas Prakoso, S.H.",
    reviewer_role: "Fintech Legal Counsel",
    reviewer_avatar: "https://placehold.co/100x100/6b7280/ffffff?text=DP",
    rating: 4,
    content:
      "Materi bagus dan relevan dengan perkembangan industri fintech saat ini. Akan lebih baik jika ada sesi hands-on untuk melihat langsung cara kerja smart contract.",
    date: "2025-10-21",
    helpful: 28,
  },
  {
    id: "review-5",
    training_id: "completed-3",
    training_title: "Certified Information Privacy Professional (CIPP)",
    training_type: "pelatihan",
    reviewer_name: "Ayu Lestari, S.Kom., M.M.",
    reviewer_role: "Data Protection Officer",
    reviewer_avatar: "https://placehold.co/100x100/6b7280/ffffff?text=AL",
    rating: 5,
    content:
      "Persiapan ujian yang sangat terstruktur. Maria adalah trainer yang luar biasa dengan pemahaman mendalam tentang GDPR. Saya berhasil lulus ujian CIPP/E di percobaan pertama!",
    date: "2025-09-15",
    helpful: 67,
  },
  {
    id: "review-6",
    training_id: "completed-3",
    training_title: "Certified Information Privacy Professional (CIPP)",
    training_type: "pelatihan",
    reviewer_name: "Benny Kurniawan, S.H., LL.M.",
    reviewer_role: "Privacy Counsel",
    reviewer_avatar: "https://placehold.co/100x100/6b7280/ffffff?text=BK",
    rating: 5,
    content:
      "Investasi yang sangat worth it untuk karir di bidang privasi. Materi lengkap, instructor berpengalaman, dan networking dengan sesama peserta sangat valuable.",
    date: "2025-09-12",
    helpful: 54,
  },
  {
    id: "review-7",
    training_id: "completed-4",
    training_title: "Workshop: E-Commerce Dispute Resolution",
    training_type: "workshop",
    reviewer_name: "Sinta Dewi, S.H.",
    reviewer_role: "Legal Staff Marketplace",
    reviewer_avatar: "https://placehold.co/100x100/6b7280/ffffff?text=SD",
    rating: 5,
    content:
      "Workshop praktis yang langsung bisa diaplikasikan. Template dokumen yang diberikan sangat membantu dalam pekerjaan sehari-hari di marketplace.",
    date: "2025-08-18",
    helpful: 41,
  },
  {
    id: "review-8",
    training_id: "completed-4",
    training_title: "Workshop: E-Commerce Dispute Resolution",
    training_type: "workshop",
    reviewer_name: "Fajar Rahman, S.E., S.H.",
    reviewer_role: "Consumer Protection Advocate",
    reviewer_avatar: "https://placehold.co/100x100/6b7280/ffffff?text=FR",
    rating: 4,
    content:
      "Memberikan pemahaman yang baik tentang mekanisme ODR. Studi kasus yang dibahas sangat relevan dengan kondisi e-commerce Indonesia saat ini.",
    date: "2025-08-17",
    helpful: 33,
  },
];

// Helper functions
export function getTrainingById(id: string): TrainingSession | undefined {
  const allTrainings = [
    ...latestTrainings,
    ...upcomingWorkshops,
    ...completedTrainings,
  ];
  return allTrainings.find((t) => t.id === id);
}

export function getReviewsByTrainingId(trainingId: string): TrainingReview[] {
  return trainingReviews.filter((r) => r.training_id === trainingId);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getStatusBadgeVariant(
  status: TrainingStatus,
): "default" | "secondary" | "outline" {
  switch (status) {
    case "upcoming":
      return "default";
    case "ongoing":
      return "secondary";
    case "completed":
      return "outline";
  }
}

export function getStatusLabel(status: TrainingStatus): string {
  switch (status) {
    case "upcoming":
      return "Segera Hadir";
    case "ongoing":
      return "Sedang Berlangsung";
    case "completed":
      return "Selesai";
  }
}

export function getTypeBadgeVariant(
  type: TrainingType,
): "default" | "secondary" {
  return type === "pelatihan" ? "default" : "secondary";
}

export function getTypeLabel(type: TrainingType): string {
  return type === "pelatihan" ? "Pelatihan" : "Workshop";
}

// Get all trainings combined
export function getAllTrainings(): TrainingSession[] {
  return [...latestTrainings, ...upcomingWorkshops, ...completedTrainings];
}

// Filter trainings
export function filterTrainings(
  searchTerm: string,
  typeFilter: string,
  statusFilter: string,
  categoryFilter: string,
): TrainingSession[] {
  const allTrainings = getAllTrainings();
  return allTrainings.filter((training) => {
    const matchesSearch =
      searchTerm === "" ||
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.short_description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "" || typeFilter === "all" || training.type === typeFilter;

    const matchesStatus =
      statusFilter === "" ||
      statusFilter === "all" ||
      training.status === statusFilter;

    const matchesCategory =
      categoryFilter === "" ||
      categoryFilter === "all" ||
      training.category === categoryFilter;

    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });
}

// Options for selects
export const trainingTypeOptions = [
  { value: "pelatihan", label: "Pelatihan" },
  { value: "workshop", label: "Workshop" },
];

export const trainingStatusOptions = [
  { value: "upcoming", label: "Segera Hadir" },
  { value: "ongoing", label: "Sedang Berlangsung" },
  { value: "completed", label: "Selesai" },
];

export const trainingCategoryOptions = [
  { value: "Sertifikasi Profesional", label: "Sertifikasi Profesional" },
  { value: "Forensik Digital", label: "Forensik Digital" },
  { value: "Perlindungan Data", label: "Perlindungan Data" },
  { value: "Compliance", label: "Compliance" },
  { value: "Keamanan Siber", label: "Keamanan Siber" },
  { value: "AI & Emerging Tech", label: "AI & Emerging Tech" },
  { value: "Penegakan Hukum", label: "Penegakan Hukum" },
  { value: "Fintech & Blockchain", label: "Fintech & Blockchain" },
  { value: "Sertifikasi Internasional", label: "Sertifikasi Internasional" },
  { value: "E-Commerce", label: "E-Commerce" },
];

export const trainingLevelOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];
