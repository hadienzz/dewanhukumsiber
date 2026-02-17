"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Scale,
  Users,
  BookOpen,
  Award,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Heart,
  Globe,
  Phone,
} from "lucide-react";

const WHATSAPP_NUMBER = "6281234567890";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Halo DHSI, saya tertarik untuk bergabung sebagai Mitra Paralegal. Mohon informasi lebih lanjut.",
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const benefits = [
  {
    icon: Shield,
    title: "Sertifikasi Resmi",
    description:
      "Dapatkan sertifikat paralegal yang diakui oleh Dewan Hukum Siber Indonesia.",
  },
  {
    icon: BookOpen,
    title: "Pelatihan Berkala",
    description:
      "Akses pelatihan dan workshop eksklusif untuk meningkatkan kompetensi hukum siber Anda.",
  },
  {
    icon: Users,
    title: "Jaringan Profesional",
    description:
      "Bergabung dengan komunitas paralegal dan praktisi hukum siber se-Indonesia.",
  },
  {
    icon: Briefcase,
    title: "Kesempatan Karir",
    description:
      "Buka peluang karir di bidang hukum siber yang terus berkembang pesat.",
  },
  {
    icon: Globe,
    title: "Jangkauan Nasional",
    description:
      "Berkontribusi memberikan bantuan hukum siber di seluruh wilayah Indonesia.",
  },
  {
    icon: Heart,
    title: "Dampak Sosial",
    description:
      "Bantu masyarakat yang membutuhkan pendampingan hukum di ranah digital.",
  },
];

const requirements = [
  "Warga Negara Indonesia (WNI)",
  // "Minimal lulusan SMA/sederajat",
  "Memiliki ketertarikan di bidang hukum, khususnya hukum siber",
  "Bersedia mengikuti pelatihan dasar paralegal DHSI",
  "Memiliki integritas dan komitmen tinggi",
  "Mampu berkomunikasi dengan baik",
  // "Bersedia ditempatkan sesuai wilayah domisili",
];

const steps = [
  {
    number: "01",
    title: "Hubungi Kami",
    description:
      "Kirim pesan melalui WhatsApp untuk menyatakan minat bergabung sebagai mitra paralegal.",
    icon: Phone,
  },
  {
    number: "02",
    title: "Verifikasi Data",
    description:
      "Tim kami akan menghubungi Anda untuk verifikasi data dan wawancara awal.",
    icon: CheckCircle,
  },
  {
    number: "03",
    title: "Ikuti Pelatihan",
    description:
      "Selesaikan program pelatihan dasar paralegal hukum siber dari DHSI.",
    icon: GraduationCap,
  },
  {
    number: "04",
    title: "Mulai Bertugas",
    description:
      "Setelah lulus pelatihan, Anda resmi menjadi mitra paralegal DHSI.",
    icon: Award,
  },
];

export default function MitraPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="from-primary via-primary to-primary/80 relative overflow-hidden bg-linear-to-br py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.05),transparent_60%)]" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/15 mb-6 px-4 py-1.5 text-sm">
            <Scale className="mr-2 h-4 w-4" />
            Program Mitra Paralegal
          </Badge>

          <h1 className="text-primary-foreground mb-6 text-4xl leading-tight font-bold text-balance md:text-5xl lg:text-6xl">
            Bergabunglah Menjadi{" "}
            <span className="from-primary-foreground to-primary-foreground/70 bg-linear-to-r bg-clip-text">
              Mitra Paralegal
            </span>{" "}
            DHSI
          </h1>

          <p className="text-primary-foreground/80 mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-balance md:text-xl">
            Jadilah bagian dari garda depan perlindungan hukum siber di
            Indonesia. Bersama DHSI, Anda dapat memberikan dampak nyata dalam
            mewujudkan keadilan di era digital.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 px-8 py-6 text-base shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                Hubungi via WhatsApp
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="bg-primary-foreground/10 rounded-2xl px-6 py-4 backdrop-blur-sm">
              <p className="text-primary-foreground text-3xl font-bold">100+</p>
              <p className="text-primary-foreground/70 text-sm">
                Paralegal Aktif
              </p>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl px-6 py-4 backdrop-blur-sm">
              <p className="text-primary-foreground text-3xl font-bold">34</p>
              <p className="text-primary-foreground/70 text-sm">
                Provinsi Terjangkau
              </p>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl px-6 py-4 backdrop-blur-sm">
              <p className="text-primary-foreground text-3xl font-bold">500+</p>
              <p className="text-primary-foreground/70 text-sm">
                Kasus Ditangani
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <Award className="mr-2 h-4 w-4" />
              Keuntungan
            </Badge>
            <h2 className="text-foreground mb-4 text-3xl font-bold text-balance md:text-4xl">
              Mengapa Bergabung Sebagai Mitra?
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-balance">
              Nikmati berbagai keuntungan eksklusif sebagai mitra paralegal
              DHSI.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="group border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300">
                      <Icon className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-foreground mb-2 text-lg font-semibold">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="bg-muted/50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-4 px-4 py-1.5">
                <CheckCircle className="mr-2 h-4 w-4" />
                Persyaratan
              </Badge>
              <h2 className="text-foreground mb-4 text-3xl font-bold text-balance md:text-4xl">
                Syarat Menjadi Mitra Paralegal
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Pastikan Anda memenuhi persyaratan berikut untuk bergabung
                sebagai mitra paralegal DHSI.
              </p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Daftar Sekarang
                </Button>
              </a>
            </div>

            <div className="space-y-3">
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className="bg-background border-border/50 flex items-start gap-3 rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <p className="text-foreground text-sm font-medium">{req}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <ArrowRight className="mr-2 h-4 w-4" />
              Alur Pendaftaran
            </Badge>
            <h2 className="text-foreground mb-4 text-3xl font-bold text-balance md:text-4xl">
              Cara Bergabung
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-balance">
              4 langkah mudah untuk menjadi mitra paralegal DHSI.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="from-primary/30 to-primary/10 absolute top-12 left-[60%] hidden h-0.5 w-[80%] bg-linear-to-r lg:block" />
                  )}
                  <Card className="group border-border/50 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="text-primary/20 mb-3 text-4xl font-bold">
                        {step.number}
                      </div>
                      <div className="bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300">
                        <Icon className="text-primary group-hover:text-primary-foreground h-7 w-7 transition-colors duration-300" />
                      </div>
                      <h3 className="text-foreground mb-2 text-lg font-semibold">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-primary via-primary to-primary/90 relative overflow-hidden bg-linear-to-br py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="bg-primary-foreground/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
            <MessageCircle className="text-primary-foreground h-8 w-8" />
          </div>

          <h2 className="text-primary-foreground mb-6 text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
            Siap Bergabung Sebagai Mitra Paralegal?
          </h2>
          <p className="text-primary-foreground/80 mx-auto mb-10 max-w-2xl text-lg text-balance md:text-xl">
            Hubungi kami sekarang melalui WhatsApp untuk informasi lebih lanjut
            dan mulai perjalanan Anda sebagai paralegal hukum siber.
          </p>

          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              variant="secondary"
              className="gap-3 px-10 py-7 text-lg shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <MessageCircle className="h-6 w-6" />
              Hubungi via WhatsApp
              <ArrowRight className="h-5 w-5" />
            </Button>
          </a>

          <p className="text-primary-foreground/60 mt-6 text-sm">
            Atau hubungi langsung di{" "}
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="text-primary-foreground/80 hover:text-primary-foreground underline transition-colors"
            >
              +62 812-3456-7890
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
