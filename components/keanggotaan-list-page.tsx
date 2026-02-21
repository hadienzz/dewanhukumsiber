"use client";

import { useKeanggotaan } from "@/hooks/keanggotaan/use-keanggotaan";
import { formatName } from "@/utils/format-name";
import { getGoogleDriveImageUrl } from "@/utils/google-drive-image";
import { Search, Users, Award } from "lucide-react";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { KATEGORI_TIM } from "@/types/keanggotaan.types";

export default function KeanggotaanListPage() {
  const { data: members, isLoading, isError } = useKeanggotaan();
  const [search, setSearch] = useState("");
  const [selectedKategori, setSelectedKategori] = useState<string>("all");
  const { t } = useLanguage();

  // Filter
  const filtered = useMemo(() => {
    if (!members) return [];
    return members.filter((m) => {
      const nameMatch = formatName(m.nama_lengkap)
        .toLowerCase()
        .includes(search.toLowerCase());
      const kategoriMatch =
        selectedKategori === "all" || m.kategori === selectedKategori;
      return nameMatch && kategoriMatch;
    });
  }, [members, search, selectedKategori]);

  // Group by kategori for display
  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    for (const kat of KATEGORI_TIM) {
      const items = filtered.filter((m) => m.kategori === kat);
      if (items.length > 0) groups[kat] = items;
    }
    return groups;
  }, [filtered]);

  const kategoriColor = (kat: string) => {
    switch (kat) {
      case "Direksi":
        return "bg-blue-100 text-blue-700";
      case "Tim Management":
        return "bg-purple-100 text-purple-700";
      case "Ahli dan Profesi Anggota":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary relative overflow-hidden py-16 md:py-24">
        <div className="from-primary via-primary to-primary/80 absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="bg-primary-foreground/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
            <Award className="text-primary-foreground h-8 w-8" />
          </div>
          <h1 className="text-primary-foreground mb-4 text-4xl font-bold text-balance md:text-5xl">
            {t("Tim Kami DHSI", "DHSI Our Team")}
          </h1>
          <p className="text-primary-foreground/80 mx-auto max-w-2xl text-lg text-balance md:text-xl">
            {t(
              "Daftar tim yang bekerja di bawah naungan Dewan Hukum Siber Indonesia, mencakup Direksi, Tim Management, serta Ahli dan Profesi Anggota.",
              "List of teams working under the Indonesian Cyber Law Council, including Directors, Management Team, and Expert & Professional Members."
            )}
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            <div className="text-primary-foreground/90 flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-lg font-semibold">
                {members?.length ?? "—"}
              </span>
              <span className="text-primary-foreground/70">
                {t("Anggota Tim", "Team Members")}
              </span>
            </div>
            <div className="text-primary-foreground/90 flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span className="text-lg font-semibold">3</span>
              <span className="text-primary-foreground/70">
                {t("Kategori", "Categories")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder={t("Cari berdasarkan nama...", "Search by name...")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={selectedKategori} onValueChange={setSelectedKategori}>
                <TabsList>
                  <TabsTrigger value="all">{t("Semua", "All")}</TabsTrigger>
                  {KATEGORI_TIM.map((kat) => (
                    <TabsTrigger key={kat} value={kat}>
                      {kat === "Ahli dan Profesi Anggota"
                        ? t("Ahli & Profesi", "Experts")
                        : kat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
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
                  <div className="bg-muted mx-auto h-4 w-1/2 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <div className="py-16 text-center">
            <p className="text-destructive text-lg">
              {t("Gagal memuat data tim. Silakan coba lagi.", "Failed to load team data. Please try again.")}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground text-lg">
              {t("Tidak ada anggota tim yang ditemukan.", "No team members found.")}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(grouped).map(([kategori, items]) => (
              <div key={kategori}>
                <div className="mb-6 flex items-center gap-3">
                  <Badge className={`${kategoriColor(kategori)} px-3 py-1 text-sm`}>
                    {kategori}
                  </Badge>
                  <span className="text-muted-foreground text-sm">
                    {items.length} {t("orang", "people")}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((member) => {
                    const imageUrl = getGoogleDriveImageUrl(
                      member.upload_foto_formal,
                    );
                    const isSupabaseUrl =
                      member.upload_foto_formal?.startsWith("http") && !imageUrl;
                    const finalImageUrl =
                      imageUrl ?? (isSupabaseUrl ? member.upload_foto_formal : null);
                    const name = formatName(member.nama_lengkap);
                    const initials = name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <Card
                        key={member.id}
                        className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <CardContent className="p-6 text-center">
                          <div className="relative mx-auto mb-4 h-28 w-28">
                            {finalImageUrl ? (
                              <Image
                                src={finalImageUrl}
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
                          <h3 className="text-foreground mb-1 line-clamp-2 text-lg font-semibold">
                            {name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary hover:bg-primary/20"
                          >
                            <Award className="mr-1 h-3 w-3" />
                            {member.role}
                          </Badge>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
