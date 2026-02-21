"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  ArrowRight,
  Sparkles,
  Star,
  Users,
  Pin,
  MapPin,
  Clock,
} from "lucide-react";
import { formatDate, getTypeLabel } from "@/lib/training-data";
import { useGetWorkshops } from "@/hooks/workshop/use-get-workshops";
import { formatPrice } from "@/utils/format-price";
import { useLanguage } from "@/lib/language-context";
export default function LatestTrainingSection() {
  const { workshops, isLoading, isError } = useGetWorkshops();
  const { t } = useLanguage();

  return (
    <section id="latest-training" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <Sparkles size={16} />
            <span className="text-sm font-medium">
              {t("Pelatihan Terbaru", "Latest Training")}
            </span>
          </div>
          <h2 className="text-foreground mb-4 text-4xl font-bold text-balance md:text-5xl">
            {t("Pelatihan Terkini", "Recent Training")}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-balance">
            {t(
              "Tingkatkan kompetensi Anda dengan program pelatihan terbaru dari Dewan Hukum Siber Indonesia.",
              "Enhance your competencies with the latest training programs from the Indonesian Cyber Law Council.",
            )}
          </p>
        </div>

        {isLoading && (
          <p className="text-muted-foreground text-center">
            {t("Memuat data pelatihan...", "Loading training data...")}
          </p>
        )}

        {isError && !isLoading && (
          <p className="text-destructive text-center">
            {t(
              "Gagal memuat data pelatihan. Silakan coba lagi nanti.",
              "Failed to load training data. Please try again later.",
            )}
          </p>
        )}

        {!isLoading && !isError && workshops.length === 0 && (
          <p className="text-muted-foreground text-center">
            {t(
              "Belum ada pelatihan yang tersedia saat ini.",
              "No training available at this time.",
            )}
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {workshops.slice(0, 3).map((workshop) => (
            <Card
              key={workshop.id}
              className="group flex cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="bg-muted relative h-48 w-full overflow-hidden">
                <Image
                  src={workshop.thumbnail || "/placeholder.svg"}
                  alt={workshop.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge
                    variant="default"
                    className="bg-primary text-primary-foreground"
                  >
                    {getTypeLabel("pelatihan")}
                  </Badge>
                </div>
              </div>
              <CardHeader className="flex-1">
                <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="text-xs">
                    {workshop.category ?? "Pelatihan DHSI"}
                  </Badge>
                </div>
                <CardTitle className="group-hover:text-primary line-clamp-2 text-lg transition-colors">
                  {workshop.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {workshop.short_description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-muted relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={"/placeholder.svg"}
                      alt={"Instructor"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold">
                      Dewan Hukum Siber Indonesia
                    </div>
                    <div className="text-xs text-gray-500">
                      Dewan Hukum Siber Indonesia
                    </div>
                  </div>
                </div>

                <div className="text-muted-foreground space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>
                      {workshop.start_date
                        ? formatDate(workshop.start_date)
                        : formatDate(workshop.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>
                      {workshop.module_count}{" "}
                      {t("modul", "modules")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="text-sm font-semibold">
                        {workshop.avg_rating > 0
                          ? workshop.avg_rating
                          : "-"}
                      </span>
                    </div>

                    <div className="text-muted-foreground flex items-center gap-1 text-sm">
                      <Users size={14} />
                      <span>
                        {workshop.participant_count} {t("peserta", "participants")}
                      </span>
                    </div>
                  </div>
                  <span className="text-primary font-bold">
                    {formatPrice(workshop.price)}
                  </span>
                </div>

                <Link href={`/workshop/${workshop.id}`}>
                  <Button className="mt-2 w-full gap-2" variant="outline">
                    {t("Lihat Detail", "View Details")} <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* TODO: Tambahkan halaman listing semua workshop bila sudah tersedia */}
      </div>
    </section>
  );
}
