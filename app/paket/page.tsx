"use client";

import Link from "next/link";
import {
  Loader2,
  Sparkles,
  Clock,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import useGetUser from "@/hooks/auth/use-get-user";
import useGetPackets from "@/hooks/packets/use-get-packets";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import usePayment from "@/hooks/payment/use-payment";
import { formatPrice } from "@/utils/format-price";
import { useLanguage } from "@/lib/language-context";

/* ============================= */
/* Skeleton Card Component */
/* ============================= */

const PackageCardSkeleton = () => {
  return (
    <Card className="border-border bg-card flex h-full flex-col shadow-sm">
      <CardHeader className="pb-3 text-center">
        <Skeleton className="mx-auto h-5 w-32" />

        <div className="mt-3 flex flex-col items-center gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-3 w-28" />
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-16" />
        </div>

        <Skeleton className="mt-2 h-3 w-full" />
      </CardContent>

      <CardFooter>
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
};

/* ============================= */
/* Main Page */
/* ============================= */

const PaketPage = () => {
  const { isLoading: isUserLoading, hasLoggedin } = useGetUser();
  const { handleCreatePayment, isPaymentError, isPending } = usePayment();
  const { t } = useLanguage();

  const {
    data: creditPackages,
    isLoading: isPacketsLoading,
    isError,
  } = useGetPackets();

  /* ============================= */
  /* Global User Loading */
  /* ============================= */

  if (isUserLoading && hasLoggedin) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <section className="bg-background relative min-h-screen py-16">
        {/* Background Gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_55%),radial-gradient(circle_at_bottom,rgba(45,212,191,0.14),transparent_55%)]" />

        <div className="container mx-auto mb-10 px-4">
          {/* ============================= */}
          {/* Header */}
          {/* ============================= */}

          <div className="mb-12 text-center">
            <Badge className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Paket Kredit DHSI
            </Badge>

            <h1 className="text-foreground mb-3 text-3xl font-bold md:text-4xl">
              {t("Tingkatkan Akses Belajar dengan Kredit", "Enhance Your Learning Access with Credits")}
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base">
              {t(
                "Top up kredit untuk mengakses kelas, pelatihan, dan fitur eksklusif di DHSI. Semakin besar paket yang Anda pilih, semakin besar bonus kredit yang didapatkan.",
                "Top up credits to access classes, training, and exclusive features at DHSI. The bigger the package you choose, the bigger the bonus credits you get."
              )}
            </p>

            <p className="text-muted-foreground mt-3 text-xs md:text-sm">
              {t("Untuk melanjutkan pembelian, Anda perlu login terlebih dahulu.", "To continue purchasing, you need to login first.")}
            </p>
          </div>

          {/* ============================= */}
          {/* Highlight Banner */}
          {/* ============================= */}

          <div className="border-primary/10 bg-primary/5 text-muted-foreground mb-10 flex flex-col items-center justify-between gap-4 rounded-2xl border px-4 py-4 text-center text-xs shadow-sm sm:flex-row sm:text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-primary h-4 w-4" />
              <span>
                {t(
                  "Semua transaksi paket kredit diproses dengan aman dan dapat digunakan untuk berbagai program pelatihan DHSI.",
                  "All credit package transactions are processed securely and can be used for various DHSI training programs."
                )}
              </span>
            </div>

            <div className="flex gap-2 text-[11px] sm:text-xs">
              <span className="bg-background/80 text-primary rounded-full px-3 py-1 font-medium">
                Bonus hingga 20% kredit
              </span>
              <span className="bg-background/80 text-muted-foreground hidden rounded-full px-3 py-1 sm:inline">
                {t("Masa aktif hingga 60 hari", "Valid for up to 60 days")}
              </span>
            </div>
          </div>

          {/* ============================= */}
          {/* Error State */}
          {/* ============================= */}

          {isError && (
            <div className="text-muted-foreground mb-6 text-center text-sm">
              {t("Gagal memuat paket. Silakan refresh halaman.", "Failed to load packages. Please refresh the page.")}
            </div>
          )}

          {/* ============================= */}
          {/* Packages Grid */}
          {/* ============================= */}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isPacketsLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <PackageCardSkeleton key={index} />
                ))
              : creditPackages?.data?.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className="border-border bg-card relative flex h-full flex-col shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    {pkg.highlight && !pkg.isCustom && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge
                          className={
                            pkg.highlight === "popular"
                              ? "bg-blue-600 text-white"
                              : "bg-amber-500 text-white"
                          }
                        >
                          {pkg.highlight === "popular"
                            ? t("Paling Populer", "Most Popular")
                            : t("Paling Hemat", "Best Value")}
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="pb-3 text-center">
                      <CardTitle className="text-foreground text-xl font-semibold">
                        {pkg.name}
                      </CardTitle>

                      <div className="mt-3 flex flex-col items-center gap-1">
                        <span className="text-primary text-3xl font-bold">
                          {formatPrice(pkg.price)}
                        </span>

                        {!pkg.isCustom && (
                          <span className="text-muted-foreground text-xs">
                            {t("Satu kali pembayaran", "One-time payment")}
                          </span>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="text-muted-foreground flex-1 space-y-2 text-sm">
                      {!pkg.isCustom ? (
                        <>
                          {pkg.credits !== undefined && (
                            <div className="flex items-center justify-between">
                              <span>{t("Kredit", "Credits")}</span>
                              <span className="font-semibold">
                                {pkg.credits}
                              </span>
                            </div>
                          )}

                          {pkg.bonus !== undefined && (
                            <div className="flex items-center justify-between">
                              <span>Bonus</span>
                              <span className="font-semibold">
                                {pkg.bonus}{" "}
                                {pkg.bonusLabel && (
                                  <span className="text-primary text-xs">
                                    ({pkg.bonusLabel})
                                  </span>
                                )}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <span>Total</span>
                            <span className="font-semibold">
                              {(pkg.bonus ?? 0) + (pkg.credits ?? 0)}
                            </span>
                          </div>

                          <div className="text-foreground flex items-center justify-between">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {t("Masa aktif", "Validity")}
                            </span>
                            <span className="font-medium">{pkg.validity}</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-muted-foreground flex items-start gap-2 text-sm">
                          <PlusCircle className="text-primary mt-0.5 h-4 w-4" />
                          <span>{pkg.description}</span>
                        </div>
                      )}

                      {pkg.description && !pkg.isCustom && (
                        <p className="text-muted-foreground/90 mt-2 text-xs">
                          {pkg.description}
                        </p>
                      )}
                    </CardContent>

                    <CardFooter className="mt-2 flex flex-col gap-2">
                      {pkg.isCustom ? (
                        hasLoggedin ? (
                          <Button className="w-full" variant="outline">
                            {t("Hubungi tim kami untuk paket custom", "Contact our team for custom packages")}
                          </Button>
                        ) : (
                          <Button asChild className="w-full" variant="outline">
                            <Link href="/login?redirect=/paket">
                              {t("Login untuk ajukan paket custom", "Login to request custom package")}
                            </Link>
                          </Button>
                        )
                      ) : hasLoggedin ? (
                        <Button
                          className="w-full"
                          onClick={() =>
                            handleCreatePayment({ package_id: pkg.id })
                          }
                          disabled={isPending}
                        >
                          {t("Beli Sekarang", "Buy Now")}
                        </Button>
                      ) : (
                        <Button asChild className="w-full" variant="outline">
                          <Link href="/login?redirect=/paket">
                            {t("Login untuk Beli", "Login to Buy")}
                          </Link>
                        </Button>
                      )}

                      {!hasLoggedin && !pkg.isCustom && (
                        <p className="text-muted-foreground/70 text-center text-[11px]">
                          {t(
                            "Anda akan diarahkan ke halaman login sebelum melanjutkan pembelian.",
                            "You will be redirected to the login page before continuing your purchase."
                          )}
                        </p>
                      )}
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
};

export default PaketPage;
