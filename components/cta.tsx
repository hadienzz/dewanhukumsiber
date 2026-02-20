"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="bg-primary py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-primary-foreground mb-6 text-4xl font-bold text-balance md:text-5xl">
          {t(
            "Siap Berkolaborasi Menguatkan Hukum Siber Indonesia?",
            "Ready to Collaborate in Strengthening Indonesia's Cyber Law?"
          )}
        </h2>
        <p className="text-primary-foreground/80 mx-auto mb-8 max-w-2xl text-xl text-balance">
          {t(
            "Bergabunglah bersama regulator, penegak hukum, industri, akademisi, dan komunitas untuk membangun ekosistem digital yang aman dan berkeadilan.",
            "Join regulators, law enforcement, industry, academia, and communities to build a safe and just digital ecosystem."
          )}
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/mitra">
            <Button size="lg" variant="secondary" className="gap-2">
              {t("Daftar Sebagai Mitra", "Register as a Partner")} <ArrowRight size={20} />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            {t("Lihat Dokumen Mandat", "View Mandate Document")}
          </Button>
        </div>
      </div>
    </section>
  );
}
