"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Coins, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getWorkshopsRequest } from "@/services/workshop/get-workshops";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useLanguage } from "@/lib/language-context";

export default function WorkshopListPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["workshops"],
    queryFn: () => getWorkshopsRequest(),
    staleTime: 30 * 1000,
  });

  const workshops = data?.data ?? [];
  const { t } = useLanguage();

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
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold md:text-3xl">Workshop</h1>
                <p className="text-slate-300">
                  {t("Pelajari keterampilan hukum praktis melalui workshop kami", "Learn practical legal skills through our workshops")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
            </div>
          ) : workshops.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="mx-auto mb-3 h-12 w-12 text-slate-300" />
                <p className="text-slate-500">
                  {t("Belum ada workshop yang tersedia", "No workshops available yet")}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {workshops.map((workshop) => (
                <Link
                  key={workshop.id}
                  href={`/workshop/${workshop.id}`}
                  className="block"
                >
                  <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="relative h-48 bg-slate-200">
                      <Image
                        src={workshop.thumbnail || "/placeholder.jpg"}
                        alt={workshop.title}
                        fill
                        className="object-cover"
                      />
                      {workshop.category && (
                        <Badge className="absolute top-3 left-3 bg-purple-500">
                          {workshop.category}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-2 line-clamp-2 text-lg font-bold text-slate-900">
                        {workshop.title}
                      </h3>
                      <p className="mb-4 line-clamp-2 text-sm text-slate-500">
                        {workshop.short_description}
                      </p>

                      <div className="flex items-center justify-between border-t pt-4">
                        <div className="flex items-center gap-1 text-amber-600">
                          <Coins className="h-4 w-4" />
                          <span className="text-lg font-bold">
                            {workshop.credit_price} {t("Kredit", "Credits")}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-teal-500 hover:bg-teal-600"
                        >
                          {t("Lihat Detail", "View Details")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
