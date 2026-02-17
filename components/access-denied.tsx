"use client";

import Link from "next/link";
import { ShieldX, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccessDenied() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="text-center">
        {/* Icon */}
        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10">
          <ShieldX className="h-12 w-12 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="mb-2 text-3xl font-bold text-white">
          Halaman Ini Tidak Tersedia
        </h1>

        {/* Description */}
        <p className="mb-8 max-w-md text-slate-400">
          Maaf, Anda tidak memiliki akses untuk melihat halaman ini. Halaman ini
          hanya tersedia untuk administrator.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="default" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="gap-2 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Link href="/login">
              <ArrowLeft className="h-4 w-4" />
              Login dengan Akun Lain
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
