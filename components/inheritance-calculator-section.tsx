"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Calculator,
  Scale,
  Users,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function InheritanceCalculatorSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Scale,
      title: t("Dua Sistem Hukum", "Two Legal Systems"),
      description: t(
        "Pilih perhitungan berdasarkan Hukum Islam (Faraid) atau Hukum Perdata Indonesia",
        "Choose calculations based on Islamic Law (Faraid) or Indonesian Civil Law"
      ),
    },
    {
      icon: Users,
      title: t("Semua Ahli Waris", "All Heirs"),
      description: t(
        "Dukung berbagai hubungan keluarga: anak, orang tua, saudara, kakek/nenek",
        "Support various family relations: children, parents, siblings, grandparents"
      ),
    },
    {
      icon: BookOpen,
      title: t("Penjelasan Detail", "Detailed Explanation"),
      description: t(
        "Setiap hasil dilengkapi dengan penjelasan dasar hukum yang jelas",
        "Every result comes with a clear legal basis explanation"
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Decorations */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 hover:bg-teal-500/30">
              <Sparkles className="h-3 w-3 mr-1" />
              {t("Fitur Baru", "New Feature")}
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {t("Butuh Perhitungan", "Need an")}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-400">
                {t("Ahli Waris?", "Inheritance Calculation?")}
              </span>
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
              {t(
                "Hitung pembagian harta warisan secara akurat dengan kalkulator digital kami. Pilih antara Hukum Islam (Faraid) atau Hukum Perdata Indonesia sesuai kebutuhan Anda.",
                "Calculate inheritance distribution accurately with our digital calculator. Choose between Islamic Law (Faraid) or Indonesian Civil Law according to your needs."
              )}
            </p>

            <div className="space-y-3">
              {[
                t("Perhitungan otomatis berdasarkan jumlah ahli waris", "Automatic calculation based on number of heirs"),
                t("Mendukung berbagai skenario keluarga", "Supports various family scenarios"),
                t("Hasil dapat diunduh sebagai dokumen", "Results can be downloaded as a document"),
                t("Gratis dan mudah digunakan", "Free and easy to use"),
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/kalkulator-waris">
                <Button
                  size="lg"
                  className="bg-teal-500 hover:bg-teal-600 text-white gap-2 shadow-lg shadow-teal-500/25"
                >
                  <Calculator className="h-5 w-5" />
                  {t("Coba Sekarang", "Try Now")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/kalkulator-waris#panduan">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-800 hover:bg-slate-800 gap-2"
                >
                  <BookOpen className="h-5 w-5" />
                  {t("Pelajari Lebih Lanjut", "Learn More")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
              >
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-teal-500 to-blue-500 shadow-lg">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1 group-hover:text-teal-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Stats Card */}
            <Card className="bg-linear-to-br from-teal-500/20 to-blue-500/20 border-teal-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-white">2</p>
                    <p className="text-xs text-slate-400">{t("Sistem Hukum", "Legal Systems")}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">15+</p>
                    <p className="text-xs text-slate-400">{t("Jenis Ahli Waris", "Types of Heirs")}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">100%</p>
                    <p className="text-xs text-slate-400">{t("Gratis", "Free")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
