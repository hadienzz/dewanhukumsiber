"use client";

import { useParalegals } from "@/hooks/paralegal/use-paralegal";
import { formatName } from "@/utils/format-name";
import { getGoogleDriveImageUrl } from "@/utils/google-drive-image";
import { Search, MapPin, Shield, Users, Mail } from "lucide-react";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export default function ParalegalListPage() {
  const { data: paralegals, isLoading, isError } = useParalegals();
  const [search, setSearch] = useState("");
  const [selectedWilayah, setSelectedWilayah] = useState<string>("all");
  const { t } = useLanguage();

  // Daftar wilayah unik
  const wilayahList = useMemo(() => {
    if (!paralegals) return [];
    const set = new Set(paralegals.map((p) => p.rencana_kantor_wilayah.trim()));
    return Array.from(set).sort();
  }, [paralegals]);

  // Filter paralegal
  const filtered = useMemo(() => {
    if (!paralegals) return [];
    return paralegals.filter((p) => {
      const nameMatch = formatName(p.nama_lengkap)
        .toLowerCase()
        .includes(search.toLowerCase());
      const wilayahMatch =
        selectedWilayah === "all" ||
        p.rencana_kantor_wilayah.trim() === selectedWilayah;
      return nameMatch && wilayahMatch;
    });
  }, [paralegals, search, selectedWilayah]);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary relative overflow-hidden py-16 md:py-24">
        <div className="from-primary via-primary to-primary/80 absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="bg-primary-foreground/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
            <Shield className="text-primary-foreground h-8 w-8" />
          </div>
          <h1 className="text-primary-foreground mb-4 text-4xl font-bold text-balance md:text-5xl">
            {t("Paralegal DHSI", "DHSI Paralegals")}
          </h1>
          <p className="text-primary-foreground/80 mx-auto max-w-2xl text-lg text-balance md:text-xl">
            {t(
              "Daftar paralegal yang terdaftar di Dewan Hukum Siber Indonesia, siap memberikan bantuan hukum di seluruh wilayah Indonesia.",
              "List of paralegals registered with the Indonesian Cyber Law Council, ready to provide legal assistance across all regions of Indonesia."
            )}
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            <div className="text-primary-foreground/90 flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-lg font-semibold">
                {paralegals?.length ?? "—"}
              </span>
              <span className="text-primary-foreground/70">
                {t("Paralegal Terdaftar", "Registered Paralegals")}
              </span>
            </div>
            <div className="text-primary-foreground/90 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="text-lg font-semibold">
                {wilayahList.length || "—"}
              </span>
              <span className="text-primary-foreground/70">{t("Wilayah", "Regions")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder={t("Cari berdasarkan nama...", "Search by name...")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedWilayah}
                onChange={(e) => setSelectedWilayah(e.target.value)}
                className="border-input bg-background ring-offset-background focus:ring-ring rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                <option value="all">{t("Semua Wilayah", "All Regions")}</option>
                {wilayahList.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="bg-muted mx-auto mb-4 h-28 w-28 rounded-full" />
                  <div className="bg-muted mx-auto mb-2 h-5 w-3/4 rounded" />
                  <div className="bg-muted mx-auto mb-2 h-4 w-1/2 rounded" />
                  <div className="bg-muted mx-auto h-4 w-2/3 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <div className="py-16 text-center">
            <p className="text-destructive text-lg">
              {t("Gagal memuat data paralegal. Silakan coba lagi.", "Failed to load paralegal data. Please try again.")}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground text-lg">
              {t("Tidak ada paralegal yang ditemukan.", "No paralegals found.")}
            </p>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6 text-sm">
              {t("Menampilkan", "Showing")} {filtered.length} {t("dari", "of")} {paralegals?.length ?? 0}{" "}
              paralegal
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((paralegal) => {
                const imageUrl = getGoogleDriveImageUrl(
                  paralegal.upload_foto_formal,
                );
                const name = formatName(paralegal.nama_lengkap);
                const initials = name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <Card
                    key={paralegal.id}
                    className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <CardContent className="p-6 text-center">
                      {/* Avatar */}
                      <div className="relative mx-auto mb-4 h-28 w-28">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className="ring-primary/10 group-hover:ring-primary/30 rounded-full object-cover ring-4 transition-all"
                          />
                        ) : (
                          <div className="from-primary/80 to-primary text-primary-foreground ring-primary/10 flex h-full w-full items-center justify-center rounded-full bg-linear-to-br text-2xl font-bold ring-4">
                            {initials}
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <h3 className="text-foreground mb-1 line-clamp-2 text-lg font-semibold">
                        {name}
                      </h3>

                      {/* Role Badge */}
                      {/* <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20 mb-3"
                      >
                        <Shield className="mr-1 h-3 w-3" />
                        {paralegal.sebagai}
                      </Badge> */}

                      {/* Location */}
                      <div className="text-muted-foreground flex items-center justify-center gap-1 text-sm">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="line-clamp-1">
                          {paralegal.rencana_kantor_wilayah}
                        </span>
                      </div>

                      {/* Email */}
                      {/* <a
                        href={`mailto:${paralegal.email_address}`}
                        className="text-muted-foreground hover:text-primary mt-2 inline-flex items-center gap-1 text-xs transition-colors"
                      >
                        <Mail className="h-3 w-3" />
                        <span className="max-w-[180px] truncate">
                          {paralegal.email_address}
                        </span>
                      </a> */}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
