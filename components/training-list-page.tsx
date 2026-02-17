"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, BookOpen, Loader2, Coins } from "lucide-react";
import { useGetWorkshops } from "@/hooks/workshop/use-get-workshops";
import type { WorkshopSummary } from "@/services/workshop/get-workshops";

export default function TrainingListPage() {
  const { workshops, isLoading, isError } = useGetWorkshops();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    ...new Set(workshops.map((w) => w.category).filter(Boolean)),
  ];

  const filtered = workshops.filter((w) => {
    const matchesSearch =
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (w.short_description ?? "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || w.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-background min-h-screen pt-20">
      {/* Hero Section */}
      <section className="from-primary/5 via-background to-primary/10 bg-linear-to-br py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
              Katalog Pelatihan & Workshop
            </h1>
            <p className="text-muted-foreground mb-8 text-xl">
              Temukan program pelatihan dan workshop terbaik untuk meningkatkan
              kompetensi Anda di bidang hukum siber.
            </p>

            {/* Search */}
            <div className="relative mx-auto max-w-xl">
              <Search
                className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2"
                size={20}
              />
              <Input
                placeholder="Cari pelatihan atau workshop..."
                className="py-6 pr-4 pl-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter pills */}
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-teal-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Semua ({workshops.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat!)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-teal-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat} ({workshops.filter((w) => w.category === cat).length})
              </button>
            ))}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="py-20 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-teal-500" />
              <p className="text-muted-foreground mt-3">Memuat pelatihan...</p>
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="py-20 text-center">
              <p className="text-red-500">
                Gagal memuat data pelatihan. Coba lagi nanti.
              </p>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && filtered.length === 0 && (
            <div className="py-16 text-center">
              <BookOpen className="mx-auto mb-3 h-12 w-12 text-slate-300" />
              <p className="text-muted-foreground">
                Tidak ada pelatihan yang ditemukan.
              </p>
            </div>
          )}

          {/* Grid */}
          {!isLoading && !isError && filtered.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function WorkshopCard({ workshop }: { workshop: WorkshopSummary }) {
  return (
    <Card className="group flex cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="bg-muted relative h-48 w-full overflow-hidden">
        <Image
          src={workshop.thumbnail || "/placeholder.svg"}
          alt={workshop.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {workshop.category && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-teal-500 text-white">
              {workshop.category}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="flex-1">
        <CardTitle className="group-hover:text-primary line-clamp-2 text-lg transition-colors">
          {workshop.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {workshop.short_description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Benefits preview */}
        {workshop.benefits && workshop.benefits.length > 0 && (
          <ul className="space-y-1">
            {workshop.benefits.slice(0, 3).map((benefit, i) => (
              <li
                key={i}
                className="text-muted-foreground flex items-start gap-2 text-sm"
              >
                <span className="mt-0.5 text-teal-500">✓</span>
                <span className="line-clamp-1">{benefit}</span>
              </li>
            ))}
            {workshop.benefits.length > 3 && (
              <li className="pl-5 text-xs text-slate-400">
                +{workshop.benefits.length - 3} lainnya
              </li>
            )}
          </ul>
        )}

        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-1.5 font-bold text-teal-600">
            <Coins size={16} />
            <span>{workshop.credit_price} Kredit</span>
          </div>
        </div>

        <Link href={`/workshop/${workshop.id}`}>
          <Button className="w-full gap-2" variant="outline">
            Lihat Detail <ArrowRight size={16} />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
