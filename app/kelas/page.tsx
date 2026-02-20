"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  BookOpen,
  Loader2,
  PlayCircle,
  CheckCircle,
  GraduationCap,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import useGetUser from "@/hooks/auth/use-get-user";
import { useQuery } from "@tanstack/react-query";
import { getMyWorkshops } from "@/services/workshop/get-my-workshops";
import type { SelectedWorkshopItem } from "@/services/workshop/get-my-workshops";
import { useLanguage } from "@/lib/language-context";

function getWorkshopProgress(item: SelectedWorkshopItem) {
  const total = item.workshop.modules.length;
  if (total === 0) return { completed: 0, total: 0, percentage: 0 };
  const completed = item.workshop.modules.filter(
    (m) => m.progresses.length > 0 && m.progresses[0].is_completed,
  ).length;
  return {
    completed,
    total,
    percentage: Math.round((completed / total) * 100),
  };
}

export default function KelasPage() {
  const router = useRouter();
  const { hasLoggedin, isLoading: authLoading } = useGetUser();

  useEffect(() => {
    if (!authLoading && !hasLoggedin) {
      router.push("/login");
    }
  }, [authLoading, hasLoggedin, router]);

  const { data, isLoading } = useQuery({
    queryKey: ["my-workshops"],
    queryFn: getMyWorkshops,
    enabled: !!hasLoggedin,
    staleTime: 30 * 1000,
  });

  const myWorkshops = data?.data ?? [];
  const { t } = useLanguage();

  if (authLoading || isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-linear-to-r from-slate-800 to-slate-900 py-8 text-white">
          <div className="container mx-auto px-4">
            <Link
              href="/"
              className="mb-4 inline-flex items-center text-sm text-slate-300 transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("Kembali ke Beranda", "Back to Home")}
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500 shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold md:text-3xl">{t("Kelas Saya", "My Classes")}</h1>
                <p className="text-slate-300">
                  {t("Workshop yang sudah Anda beli dan ikuti", "Workshops you have purchased and joined")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          {myWorkshops.length === 0 ? (
            /* ─── Empty State ─── */
            <Card className="mx-auto max-w-lg">
              <CardContent className="py-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <BookOpen className="h-8 w-8 text-slate-400" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-slate-900">
                  {t("Anda belum memiliki kelas apapun", "You don't have any classes yet")}
                </h2>
                <p className="mb-6 text-sm text-slate-500">
                  {t("Jelajahi workshop yang tersedia dan mulai belajar sekarang", "Explore available workshops and start learning now")}
                </p>
                <Link href="/workshop">
                  <Button className="bg-teal-500 hover:bg-teal-600">
                    {t("Lihat Workshop", "View Workshops")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            /* ─── Workshop Grid ─── */
            <>
              <p className="mb-6 text-sm text-slate-500">
                {myWorkshops.length} workshop {t("dimiliki", "owned")}
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myWorkshops.map((item) => {
                  const { completed, total, percentage } =
                    getWorkshopProgress(item);
                  const isComplete = total > 0 && completed === total;

                  return (
                    <Card
                      key={item.id}
                      className="overflow-hidden transition-shadow hover:shadow-lg"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-44 bg-slate-200">
                        <Image
                          src={item.workshop.thumbnail || "/placeholder.jpg"}
                          alt={item.workshop.title}
                          fill
                          className="object-cover"
                        />
                        {item.workshop.category && (
                          <Badge className="absolute top-3 left-3 bg-purple-500">
                            {item.workshop.category}
                          </Badge>
                        )}
                        {isComplete && (
                          <Badge className="absolute top-3 right-3 gap-1 bg-green-500">
                            <CheckCircle className="h-3 w-3" />
                            {t("Selesai", "Completed")}
                          </Badge>
                        )}
                      </div>

                      <CardContent className="p-4">
                        <h3 className="mb-1 line-clamp-2 text-lg font-bold text-slate-900">
                          {item.workshop.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-sm text-slate-500">
                          {item.workshop.short_description}
                        </p>

                        {/* Progress */}
                        <div className="mb-4 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">
                              {completed}/{total} {t("modul", "modules")}
                            </span>
                            <span className="font-semibold text-teal-600">
                              {percentage}%
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>

                        {/* Action */}
                        <Link href={`/workshop/${item.workshop.id}/learn`}>
                          <Button
                            className={`w-full gap-2 ${
                              isComplete
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-teal-500 hover:bg-teal-600"
                            }`}
                          >
                            <PlayCircle className="h-4 w-4" />
                            {isComplete ? t("Review Materi", "Review Material") : t("Lanjutkan Belajar", "Continue Learning")}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
