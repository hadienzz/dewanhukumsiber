"use client";

import { useParalegals } from "@/hooks/paralegal/use-paralegal";
import { formatName } from "@/utils/format-name";
import { getGoogleDriveImageUrl } from "@/utils/google-drive-image";
import {
  Search,
  MapPin,
  Shield,
  Users,
  Mail,
} from "lucide-react";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function ParalegalListPage() {
  const { data: paralegals, isLoading, isError } = useParalegals();
  const [search, setSearch] = useState("");
  const [selectedWilayah, setSelectedWilayah] = useState<string>("all");

  // Daftar wilayah unik
  const wilayahList = useMemo(() => {
    if (!paralegals) return [];
    const set = new Set(
      paralegals.map((p) => p.rencana_kantor_wilayah.trim()),
    );
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary via-primary to-primary/80" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/10 mb-6">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 text-balance">
            Paralegal DHSI
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto text-balance">
            Daftar paralegal yang terdaftar di Dewan Hukum Siber Indonesia,
            siap memberikan bantuan hukum di seluruh wilayah Indonesia.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <Users className="h-5 w-5" />
              <span className="text-lg font-semibold">
                {paralegals?.length ?? "—"}
              </span>
              <span className="text-primary-foreground/70">Paralegal Terdaftar</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <MapPin className="h-5 w-5" />
              <span className="text-lg font-semibold">
                {wilayahList.length || "—"}
              </span>
              <span className="text-primary-foreground/70">Wilayah</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="shadow-lg border-0">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari berdasarkan nama..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedWilayah}
                onChange={(e) => setSelectedWilayah(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="all">Semua Wilayah</option>
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="mx-auto h-28 w-28 rounded-full bg-muted mb-4" />
                  <div className="h-5 bg-muted rounded w-3/4 mx-auto mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-16">
            <p className="text-destructive text-lg">
              Gagal memuat data paralegal. Silakan coba lagi.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              Tidak ada paralegal yang ditemukan.
            </p>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6 text-sm">
              Menampilkan {filtered.length} dari {paralegals?.length ?? 0} paralegal
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <CardContent className="p-6 text-center">
                      {/* Avatar */}
                      <div className="relative mx-auto mb-4 h-28 w-28">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className="rounded-full object-cover ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-primary/80 to-primary text-2xl font-bold text-primary-foreground ring-4 ring-primary/10">
                            {initials}
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <h3 className="text-foreground font-semibold text-lg mb-1 line-clamp-2">
                        {name}
                      </h3>

                      {/* Role Badge */}
                      <Badge
                        variant="secondary"
                        className="mb-3 bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        {paralegal.sebagai}
                      </Badge>

                      {/* Location */}
                      <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="line-clamp-1">
                          {paralegal.rencana_kantor_wilayah}
                        </span>
                      </div>

                      {/* Email */}
                      <a
                        href={`mailto:${paralegal.email_address}`}
                        className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="h-3 w-3" />
                        <span className="truncate max-w-[180px]">
                          {paralegal.email_address}
                        </span>
                      </a>
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
