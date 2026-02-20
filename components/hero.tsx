"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

export default function Hero() {
  const router = useRouter();
  const { t } = useLanguage();
  return (
    <section className="bg-background relative flex min-h-screen items-center">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-foreground text-5xl leading-tight font-bold text-balance md:text-6xl">
              {t("Dewan Hukum Siber Indonesia", "Indonesian Cyber Law Council")}
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed text-balance">
              {t(
                "Kolaborasi pakar hukum, teknologi, dan regulator untuk membangun ekosistem digital yang aman, beretika, dan berkeadilan di Indonesia.",
                "Collaboration of legal experts, technology professionals, and regulators to build a safe, ethical, and just digital ecosystem in Indonesia.",
              )}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => router.push("/paket")}
              >
                {t("Gabung Sebagai Anggota", "Join as a Member")}{" "}
                <ArrowRight size={20} />
              </Button>
            </div>
            <div className="flex gap-8 text-center text-sm">
              <div>
                <div className="text-primary text-2xl font-bold">120+</div>
                <div className="text-muted-foreground">
                  {t("Pakar & Praktisi", "Experts & Practitioners")}
                </div>
              </div>
              <div>
                <div className="text-primary text-2xl font-bold">30+</div>
                <div className="text-muted-foreground">
                  {t("Program & Inisiatif", "Programs & Initiatives")}
                </div>
              </div>
              <div>
                <div className="text-primary text-2xl font-bold">10+</div>
                <div className="text-muted-foreground">
                  {t("Kolaborasi Strategis", "Strategic Collaborations")}
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-64 w-[520px] sm:h-80 md:h-[550px]">
            {/* <Image
              src="/director.png"
              alt="Ilustrasi Dewan Hukum Siber Indonesia"
              fill
              priority
              className="rounded-2xl object-fill shadow-xl"
            /> */}
            <Image
              src={"/logo.jpeg"}
              alt="Logo DHSI"
              fill
              priority
              className="rounded-2xl bg-black object-fill"
            />
          </div>

          {/* <div className="relative mx-auto h-80 w-80 rounded-md bg-gray-200 md:h-100 md:w-100" /> */}

          {/* Right Image */}
        </div>
      </div>
    </section>
  );
}
