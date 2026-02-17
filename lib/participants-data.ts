// Participant and Membership Data for DHSI

export type MembershipType = "regular" | "pro";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type RegistrationStatus =
  | "registered"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  company?: string;
  position?: string;
  membership: {
    type: MembershipType;
    expiresAt?: string; // ISO date string for Pro members
    startedAt?: string; // When pro membership started
  };
  registeredAt: string;
  paymentStatus: PaymentStatus;
  registrationStatus: RegistrationStatus;
  paymentMethod?: string;
  paymentAmount?: string;
  paymentDate?: string;
}

// Helper functions
export function getMembershipLabel(type: MembershipType): string {
  const labels: Record<MembershipType, string> = {
    regular: "Member",
    pro: "Pro",
  };
  return labels[type];
}

export function getPaymentStatusLabel(status: PaymentStatus): string {
  const labels: Record<PaymentStatus, string> = {
    pending: "Menunggu Pembayaran",
    paid: "Lunas",
    failed: "Gagal",
    refunded: "Dikembalikan",
  };
  return labels[status];
}

export function getRegistrationStatusLabel(status: RegistrationStatus): string {
  const labels: Record<RegistrationStatus, string> = {
    registered: "Terdaftar",
    confirmed: "Dikonfirmasi",
    completed: "Selesai",
    cancelled: "Dibatalkan",
  };
  return labels[status];
}

export function getRemainingProDays(expiresAt: string): number {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

export function formatMembershipExpiry(expiresAt: string): string {
  const days = getRemainingProDays(expiresAt);
  if (days <= 0) return "Kadaluarsa";
  if (days === 1) return "1 hari lagi";
  if (days <= 7) return `${days} hari lagi`;
  if (days <= 30) return `${Math.ceil(days / 7)} minggu lagi`;
  return `${Math.ceil(days / 30)} bulan lagi`;
}

export function getPaymentStatusColor(status: PaymentStatus): string {
  const colors: Record<PaymentStatus, string> = {
    pending: "bg-amber-100 text-amber-700",
    paid: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    refunded: "bg-slate-100 text-slate-700",
  };
  return colors[status];
}

export function getRegistrationStatusColor(status: RegistrationStatus): string {
  const colors: Record<RegistrationStatus, string> = {
    registered: "bg-blue-100 text-blue-700",
    confirmed: "bg-teal-100 text-teal-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return colors[status];
}

// Dummy participants data
export const participants: Participant[] = [
  {
    id: "participant-1",
    name: "Rizki Pratama, S.H.",
    email: "rizki.pratama@lawfirm.co.id",
    phone: "081234567890",
    avatar: "/avatars/participant-1.jpg",
    company: "Pratama & Partners Law Firm",
    position: "Associate Lawyer",
    membership: {
      type: "pro",
      expiresAt: "2026-06-15",
      startedAt: "2025-06-15",
    },
    registeredAt: "2026-01-05",
    paymentStatus: "paid",
    registrationStatus: "confirmed",
    paymentMethod: "Transfer Bank",
    paymentAmount: "Rp 12.500.000",
    paymentDate: "2026-01-06",
  },
  {
    id: "participant-2",
    name: "Anisa Maharani, S.H., M.H.",
    email: "anisa.maharani@gmail.com",
    phone: "082345678901",
    avatar: "/avatars/participant-2.jpg",
    company: "Kementerian Hukum dan HAM",
    position: "Legal Analyst",
    membership: {
      type: "pro",
      expiresAt: "2026-02-28",
      startedAt: "2025-02-28",
    },
    registeredAt: "2026-01-03",
    paymentStatus: "paid",
    registrationStatus: "confirmed",
    paymentMethod: "Kartu Kredit",
    paymentAmount: "Rp 12.500.000",
    paymentDate: "2026-01-03",
  },
  {
    id: "participant-3",
    name: "Budi Santoso",
    email: "budi.santoso@company.com",
    phone: "083456789012",
    avatar: "/avatars/participant-3.jpg",
    company: "PT Teknologi Digital Indonesia",
    position: "Legal Manager",
    membership: {
      type: "regular",
    },
    registeredAt: "2026-01-08",
    paymentStatus: "pending",
    registrationStatus: "registered",
    paymentMethod: "Transfer Bank",
    paymentAmount: "Rp 12.500.000",
  },
  {
    id: "participant-4",
    name: "Diana Putri, S.H.",
    email: "diana.putri@advocate.id",
    phone: "084567890123",
    avatar: "/avatars/participant-4.jpg",
    company: "Diana Putri & Associates",
    position: "Managing Partner",
    membership: {
      type: "pro",
      expiresAt: "2026-12-31",
      startedAt: "2025-12-01",
    },
    registeredAt: "2026-01-02",
    paymentStatus: "paid",
    registrationStatus: "confirmed",
    paymentMethod: "Transfer Bank",
    paymentAmount: "Rp 12.500.000",
    paymentDate: "2026-01-02",
  },
  {
    id: "participant-5",
    name: "Eko Wijaya, S.H.",
    email: "eko.wijaya@lawcorp.co.id",
    phone: "085678901234",
    avatar: "/avatars/participant-5.jpg",
    company: "LawCorp Indonesia",
    position: "Senior Associate",
    membership: {
      type: "regular",
    },
    registeredAt: "2026-01-07",
    paymentStatus: "paid",
    registrationStatus: "confirmed",
    paymentMethod: "Kartu Kredit",
    paymentAmount: "Rp 12.500.000",
    paymentDate: "2026-01-07",
  },
  {
    id: "participant-6",
    name: "Fitri Handayani",
    email: "fitri.handayani@startup.io",
    phone: "086789012345",
    avatar: "/avatars/participant-6.jpg",
    company: "TechStartup Indonesia",
    position: "Head of Legal",
    membership: {
      type: "pro",
      expiresAt: "2026-01-20",
      startedAt: "2025-01-20",
    },
    registeredAt: "2026-01-06",
    paymentStatus: "paid",
    registrationStatus: "confirmed",
    paymentMethod: "Transfer Bank",
    paymentAmount: "Rp 12.500.000",
    paymentDate: "2026-01-06",
  },
  {
    id: "participant-7",
    name: "Gilang Ramadhan, S.H.",
    email: "gilang.ramadhan@notaris.id",
    phone: "087890123456",
    avatar: "/avatars/participant-7.jpg",
    company: "Kantor Notaris Gilang R.",
    position: "Notaris",
    membership: {
      type: "regular",
    },
    registeredAt: "2026-01-09",
    paymentStatus: "failed",
    registrationStatus: "registered",
    paymentMethod: "Kartu Kredit",
    paymentAmount: "Rp 12.500.000",
  },
  {
    id: "participant-8",
    name: "Hana Setiawan, S.H., LL.M.",
    email: "hana.setiawan@biglaw.com",
    phone: "088901234567",
    avatar: "/avatars/participant-8.jpg",
    company: "BigLaw International",
    position: "Partner",
    membership: {
      type: "pro",
      expiresAt: "2027-01-01",
      startedAt: "2026-01-01",
    },
    registeredAt: "2026-01-01",
    paymentStatus: "paid",
    registrationStatus: "confirmed",
    paymentMethod: "Transfer Bank",
    paymentAmount: "Rp 12.500.000",
    paymentDate: "2026-01-01",
  },
  {
    id: "participant-9",
    name: "Ivan Kurniawan",
    email: "ivan.kurniawan@corporate.co.id",
    phone: "089012345678",
    avatar: "/avatars/participant-9.jpg",
    company: "PT Mega Corporate",
    position: "Legal Counsel",
    membership: {
      type: "regular",
    },
    registeredAt: "2026-01-10",
    paymentStatus: "pending",
    registrationStatus: "registered",
    paymentMethod: "Transfer Bank",
    paymentAmount: "Rp 12.500.000",
  },
  {
    id: "participant-10",
    name: "Julia Permata, S.H.",
    email: "julia.permata@attorney.id",
    phone: "081123456789",
    avatar: "/avatars/participant-10.jpg",
    company: "Permata Legal Consultants",
    position: "Founder",
    membership: {
      type: "pro",
      expiresAt: "2026-08-15",
      startedAt: "2025-08-15",
    },
    registeredAt: "2026-01-04",
    paymentStatus: "paid",
    registrationStatus: "confirmed",
    paymentMethod: "Kartu Kredit",
    paymentAmount: "Rp 12.500.000",
    paymentDate: "2026-01-04",
  },
  {
    id: "participant-11",
    name: "Kevin Susanto",
    email: "kevin.susanto@fintech.com",
    phone: "082234567890",
    avatar: "/avatars/participant-11.jpg",
    company: "FinTech Solutions",
    position: "Compliance Officer",
    membership: {
      type: "regular",
    },
    registeredAt: "2026-01-11",
    paymentStatus: "refunded",
    registrationStatus: "cancelled",
    paymentMethod: "Kartu Kredit",
    paymentAmount: "Rp 12.500.000",
    paymentDate: "2026-01-11",
  },
  {
    id: "participant-12",
    name: "Linda Wulandari, S.H.",
    email: "linda.wulandari@court.go.id",
    phone: "083345678901",
    avatar: "/avatars/participant-12.jpg",
    company: "Pengadilan Negeri Jakarta",
    position: "Hakim",
    membership: {
      type: "pro",
      expiresAt: "2026-04-30",
      startedAt: "2025-04-30",
    },
    registeredAt: "2026-01-02",
    paymentStatus: "paid",
    registrationStatus: "confirmed",
    paymentMethod: "Transfer Bank",
    paymentAmount: "Rp 12.500.000",
    paymentDate: "2026-01-02",
  },
];

// Function to get participants for a specific course or training
export function getParticipantsByCourseId(courseId: string): Participant[] {
  // In real app, this would filter by course enrollment
  // For demo, we return participants based on courseId hash
  const hash = courseId.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const startIndex = hash % Math.max(1, participants.length - 5);
  return participants.slice(startIndex, startIndex + 6);
}

export function getParticipantsByTrainingId(trainingId: string): Participant[] {
  // In real app, this would filter by training enrollment
  // For demo, we return participants based on trainingId hash
  const hash = trainingId.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const startIndex = hash % Math.max(1, participants.length - 7);
  return participants.slice(startIndex, startIndex + 8);
}

// Statistics helpers
export function getParticipantStats(participantList: Participant[]) {
  const total = participantList.length;
  const proMembers = participantList.filter(
    (p) => p.membership.type === "pro"
  ).length;
  const regularMembers = total - proMembers;
  const paidCount = participantList.filter(
    (p) => p.paymentStatus === "paid"
  ).length;
  const pendingCount = participantList.filter(
    (p) => p.paymentStatus === "pending"
  ).length;
  const confirmedCount = participantList.filter(
    (p) => p.registrationStatus === "confirmed"
  ).length;

  return {
    total,
    proMembers,
    regularMembers,
    paidCount,
    pendingCount,
    confirmedCount,
    paidPercentage: total > 0 ? Math.round((paidCount / total) * 100) : 0,
    proPercentage: total > 0 ? Math.round((proMembers / total) * 100) : 0,
  };
}

// Format date helper
export function formatParticipantDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
