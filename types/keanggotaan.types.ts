export interface Keanggotaan {
  id: string;
  nama_lengkap: string;
  role: string;
  kategori: string;
  upload_foto_formal: string;
}

export const KATEGORI_TIM = [
  "Direksi",
  "Tim Management",
  "Ahli dan Profesi Anggota",
] as const;

export const PROFESI_ANGGOTA = [
  "Contract Drafter",
  "Legislative Drafter",
  "Mediator",
  "Mediator Kesehatan",
  "Praktisi Siber",
  "Advokat",
  "Paralegal",
] as const;

export type KategoriTim = (typeof KATEGORI_TIM)[number];
export type ProfesiAnggota = (typeof PROFESI_ANGGOTA)[number];
