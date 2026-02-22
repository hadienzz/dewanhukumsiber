"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

const mitraLogos = [
  { src: "/mitra-1.webp", alt: "Mitra 1" },
  { src: "/mitra-2.webp", alt: "Mitra 2" },
  { src: "/mitra-3.jpg", alt: "Mitra 3" },
  { src: "/mitra-4.webp", alt: "Mitra 4" },
  { src: "/mitra-5.png", alt: "Mitra 5" },
  { src: "/mitra-6.jpg", alt: "Mitra 6" },
  { src: "/mitra-7.png", alt: "Mitra 7" },
  { src: "/mitra-8.webp", alt: "Mitra 8" },
  { src: "/mitra-9.png", alt: "Mitra 9" },
  { src: "/mitra-10.png", alt: "Mitra 10" },
  { src: "/mitra-11.png", alt: "Mitra 11" },
];

export default function MitraCarousel() {
  const { t } = useLanguage();

  return (
    <section className="bg-muted/50 overflow-hidden py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-muted-foreground mb-8 text-center text-sm font-medium tracking-widest uppercase">
          {t("Mitra dan Partnership", "Partners and Partnerships")}
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="from-muted/50 pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r to-transparent" />
        <div className="from-muted/50 pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l to-transparent" />

        {/* Scrolling track */}
        <div className="animate-marquee flex items-center gap-16">
          {/* First set */}
          {mitraLogos.map((logo, i) => (
            <div
              key={`first-${i}`}
              className="group flex h-16 w-36 shrink-0 items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={144}
                height={64}
                className="h-auto max-h-14 w-auto max-w-[120px] object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {mitraLogos.map((logo, i) => (
            <div
              key={`second-${i}`}
              className="group flex h-16 w-36 shrink-0 items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={144}
                height={64}
                className="h-auto max-h-14 w-auto max-w-[120px] object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
