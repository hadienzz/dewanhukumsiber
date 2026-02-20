"use client";

import { Construction } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

export default function ComingSoon({
  title,
  description,
}: ComingSoonProps) {
  const { t } = useLanguage();

  const displayTitle = title || t("Fitur Sedang Dikembangkan", "Feature Under Development");
  const displayDescription = description || t(
    "Halaman ini sedang dalam proses pengembangan. Silakan kembali lagi nanti.",
    "This page is currently under development. Please come back later."
  );

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* Icon */}
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
          <Construction className="h-10 w-10 text-amber-600" />
        </div>

        {/* Title */}
        <h1 className="mb-2 text-2xl font-bold text-slate-900">{displayTitle}</h1>

        {/* Description */}
        <p className="max-w-md text-slate-500">{displayDescription}</p>

        {/* Progress indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-amber-500 [animation-delay:-0.3s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-amber-500 [animation-delay:-0.15s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-amber-500" />
        </div>
        <p className="mt-2 text-sm text-slate-400">{t("Sedang Diproses", "In Progress")}</p>
      </div>
    </div>
  );
}
