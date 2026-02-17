import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-primary py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-primary-foreground mb-6 text-4xl font-bold text-balance md:text-5xl">
          Siap Berkolaborasi Menguatkan Hukum Siber Indonesia?
        </h2>
        <p className="text-primary-foreground/80 mx-auto mb-8 max-w-2xl text-xl text-balance">
          Bergabunglah bersama regulator, penegak hukum, industri, akademisi,
          dan komunitas untuk membangun ekosistem digital yang aman dan
          berkeadilan.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/mitra">
            <Button size="lg" variant="secondary" className="gap-2">
              Daftar Sebagai Mitra <ArrowRight size={20} />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            Lihat Dokumen Mandat
          </Button>
        </div>
      </div>
    </section>
  );
}
