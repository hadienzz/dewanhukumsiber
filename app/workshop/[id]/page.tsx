"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Lock,
  Coins,
  Loader2,
  PlayCircle,
  Star,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";
import useGetWorkshopDetail from "@/hooks/workshop/use-get-workshop-detail";
import useGetUser from "@/hooks/auth/use-get-user";
import { formatDate, getTypeLabel } from "@/lib/training-data";
import { moduleTypeLabels } from "@/types/course-module";
import { useParams, useRouter } from "next/navigation";
import useCreateWorkshopPayment from "@/hooks/payment/use-create-workshop-payment";
import { useBuyWorkshopCredits } from "@/hooks/workshop/use-buy-workshop-credits";
import {
  useWorkshopRatings,
  useSubmitWorkshopRating,
} from "@/hooks/workshop/use-workshop-rating";
import { useState } from "react";

// ── Star Rating Component ──
function StarRating({
  value,
  onChange,
  size = 20,
  readonly = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  readonly?: boolean;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          className={`transition-colors ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"}`}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
        >
          <Star
            size={size}
            className={`transition-colors ${
              star <= (hovered || value)
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function WorkshopDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { workshop, isLoading, workshopNotFound } = useGetWorkshopDetail(
    id as string,
  );
  const { hasLoggedin } = useGetUser();
  const { checkout, isProcessing } = useCreateWorkshopPayment();
  const buyWithCredits = useBuyWorkshopCredits();

  // Rating state
  const [ratingPage, setRatingPage] = useState(1);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const workshopId = typeof id === "string" ? id : undefined;
  const { data: ratingsData, isLoading: ratingsLoading } = useWorkshopRatings(
    workshopId,
    ratingPage,
    5,
  );
  const submitRating = useSubmitWorkshopRating();

  const requireAuth = (callback: () => void) => {
    if (!hasLoggedin) {
      router.push("/login");
      return;
    }
    callback();
  };

  const handleCheckout = async () => {
    if (!workshop || !id || typeof id !== "string") return;

    if (!hasLoggedin) {
      router.push("/login");
      return;
    }

    const redirectUrl = await checkout(id);
    if (!redirectUrl) return;

    window.location.href = redirectUrl;
  };

  const handleSubmitRating = () => {
    if (!workshopId || newRating === 0) return;

    submitRating.mutate(
      {
        workshop_id: workshopId,
        rating: newRating,
        review: newReview.trim() || undefined,
      },
      {
        onSuccess: () => {
          setNewRating(0);
          setNewReview("");
        },
      },
    );
  };

  const ratingSummary = ratingsData?.data;
  const ratings = ratingSummary?.ratings ?? [];
  const userRating = ratingSummary?.user_rating;

  return (
    <>
      <Navbar />

      <main className="bg-background min-h-screen">
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4">
            {/* Back Button */}
            <Link
              href="/#latest-training"
              className="text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-2 text-sm"
            >
              <ArrowLeft size={16} />
              Kembali ke daftar pelatihan
            </Link>

            {/* Loading */}
            {isLoading && (
              <p className="text-muted-foreground py-20 text-center">
                Memuat detail pelatihan...
              </p>
            )}

            {workshopNotFound && (
              <p className="text-muted-foreground py-20 text-center">
                Pelatihan tidak ditemukan.
              </p>
            )}

            {!isLoading && workshop && (
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
                {/* ================= LEFT CONTENT ================= */}
                <div className="space-y-8">
                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge>{getTypeLabel("pelatihan")}</Badge>
                      {workshop.category && (
                        <Badge variant="secondary">{workshop.category}</Badge>
                      )}
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar size={14} />
                        {formatDate(workshop.created_at)}
                      </Badge>

                      {/* Rating summary badge */}
                      {ratingSummary && ratingSummary.total_ratings > 0 && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 border-amber-200 bg-amber-50 text-amber-700"
                        >
                          <Star
                            size={12}
                            className="fill-amber-400 text-amber-400"
                          />
                          {ratingSummary.average_rating.toFixed(1)}
                          <span className="text-amber-500">
                            ({ratingSummary.total_ratings})
                          </span>
                        </Badge>
                      )}
                    </div>

                    <h1 className="text-3xl leading-tight font-bold md:text-4xl">
                      {workshop.title}
                    </h1>

                    {workshop.short_description && (
                      <p className="text-muted-foreground text-lg">
                        {workshop.short_description}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  {workshop.description && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Deskripsi</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {workshop.description}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Benefits */}
                  {workshop.benefits?.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Apa yang Akan Anda Pelajari</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {workshop.benefits.map((benefit, index) => (
                            <li
                              key={index}
                              className="text-muted-foreground flex items-start gap-2 text-sm"
                            >
                              <CheckCircle
                                size={16}
                                className="mt-0.5 text-green-600"
                              />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Curriculum */}
                  {workshop.modules?.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Materi Pelatihan</CardTitle>
                        <CardDescription>
                          {workshop.is_owned
                            ? "Klik 'Kerjakan Sekarang' untuk mulai belajar"
                            : "Preview struktur sesi (terkunci sebelum pembelian)"}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        {workshop.modules
                          .slice()
                          .sort((a, b) => a.order - b.order)
                          .map((module) => (
                            <div
                              key={module.id}
                              className="flex items-center justify-between rounded-lg border px-4 py-3"
                            >
                              <div>
                                <p className="text-sm font-medium">
                                  {module.order}. {module.title}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  {moduleTypeLabels[module.type]}
                                </p>
                              </div>

                              {workshop.is_owned ? (
                                <CheckCircle
                                  size={18}
                                  className="text-green-500"
                                />
                              ) : (
                                <Lock
                                  size={18}
                                  className="text-muted-foreground"
                                />
                              )}
                            </div>
                          ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* ================= RATINGS & REVIEWS ================= */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <MessageSquare size={20} />
                            Ulasan & Rating
                          </CardTitle>
                          <CardDescription>
                            {ratingSummary && ratingSummary.total_ratings > 0
                              ? `${ratingSummary.total_ratings} ulasan dari peserta`
                              : "Belum ada ulasan"}
                          </CardDescription>
                        </div>

                        {/* Rating summary */}
                        {ratingSummary && ratingSummary.total_ratings > 0 && (
                          <div className="flex items-center gap-3 rounded-lg border bg-amber-50 px-4 py-2">
                            <span className="text-3xl font-bold text-amber-600">
                              {ratingSummary.average_rating.toFixed(1)}
                            </span>
                            <div>
                              <StarRating
                                value={Math.round(ratingSummary.average_rating)}
                                readonly
                                size={16}
                              />
                              <p className="text-muted-foreground text-xs">
                                {ratingSummary.total_ratings} ulasan
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Submit rating form — only for workshop owners */}
                      {workshop.is_owned && (
                        <div className="rounded-lg border bg-slate-50 p-5">
                          <h4 className="mb-3 text-sm font-semibold">
                            {userRating
                              ? "Perbarui Review Anda"
                              : "Tulis Review"}
                          </h4>

                          {userRating && (
                            <p className="text-muted-foreground mb-3 text-xs">
                              Anda sudah memberikan rating{" "}
                              <strong>{userRating.rating}/5</strong>. Perbarui
                              di bawah ini jika ingin mengubah.
                            </p>
                          )}

                          <div className="mb-3 flex items-center gap-3">
                            <span className="text-muted-foreground text-sm">
                              Rating:
                            </span>
                            <StarRating
                              value={newRating || (userRating?.rating ?? 0)}
                              onChange={setNewRating}
                              size={24}
                            />
                            {newRating || userRating?.rating ? (
                              <span className="text-sm font-medium text-amber-600">
                                {newRating || userRating?.rating}/5
                              </span>
                            ) : null}
                          </div>

                          <Textarea
                            placeholder="Bagikan pengalaman Anda tentang workshop ini... (opsional)"
                            value={newReview || (userRating?.review ?? "")}
                            onChange={(e) => setNewReview(e.target.value)}
                            rows={3}
                            className="mb-3 bg-white"
                          />

                          <Button
                            onClick={handleSubmitRating}
                            disabled={
                              submitRating.isPending ||
                              (newRating === 0 && !userRating)
                            }
                            className="gap-2"
                          >
                            {submitRating.isPending ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Menyimpan...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4" />
                                {userRating
                                  ? "Perbarui Review"
                                  : "Kirim Review"}
                              </>
                            )}
                          </Button>
                        </div>
                      )}

                      {/* Ratings list */}
                      {ratingsLoading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
                        </div>
                      ) : ratings.length === 0 ? (
                        <div className="py-8 text-center">
                          <MessageSquare className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                          <p className="text-muted-foreground text-sm">
                            Belum ada ulasan untuk workshop ini.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {ratings.map((review) => (
                            <div
                              key={review.id}
                              className="rounded-lg border p-4 transition-shadow hover:shadow-sm"
                            >
                              <div className="mb-2 flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="from-primary/80 to-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br text-sm font-bold">
                                    {review.user.avatar_url ? (
                                      <Image
                                        src={review.user.avatar_url}
                                        alt={review.user.username}
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover"
                                      />
                                    ) : (
                                      review.user.username
                                        .charAt(0)
                                        .toUpperCase()
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold">
                                      {review.user.username}
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                      {formatDate(review.created_at)}
                                    </p>
                                  </div>
                                </div>
                                <StarRating
                                  value={review.rating}
                                  readonly
                                  size={14}
                                />
                              </div>
                              {review.review && (
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                  {review.review}
                                </p>
                              )}
                            </div>
                          ))}

                          {/* Pagination */}
                          {ratingSummary && ratingSummary.total_pages > 1 && (
                            <div className="flex items-center justify-between border-t pt-4">
                              <p className="text-muted-foreground text-xs">
                                Halaman {ratingPage} dari{" "}
                                {ratingSummary.total_pages}
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  disabled={ratingPage <= 1}
                                  onClick={() =>
                                    setRatingPage((p) => Math.max(1, p - 1))
                                  }
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  disabled={
                                    ratingPage >= ratingSummary.total_pages
                                  }
                                  onClick={() => setRatingPage((p) => p + 1)}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* ================= RIGHT STICKY ASIDE ================= */}
                <aside className="h-fit lg:sticky lg:top-24">
                  <Card className="overflow-hidden shadow-xl">
                    {/* Thumbnail */}
                    <div className="relative h-52 w-full">
                      <Image
                        src={workshop.thumbnail || "/placeholder.svg"}
                        alt={workshop.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <CardContent className="space-y-4 p-6">
                      {workshop.is_owned ? (
                        <>
                          {/* Already purchased — show learn button only */}
                          <div className="text-center">
                            <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100">
                              <CheckCircle size={14} />
                              Workshop Sudah Dibeli
                            </Badge>
                          </div>

                          <Button
                            size="lg"
                            className="w-full gap-2 bg-green-500 hover:bg-green-600"
                            onClick={() => router.push(`/workshop/${id}/learn`)}
                          >
                            <PlayCircle className="h-4 w-4" />
                            Kerjakan Sekarang
                          </Button>
                        </>
                      ) : (
                        <>
                          {/* Not purchased — show price and buy buttons */}
                          <div className="text-center">
                            <p className="text-3xl font-bold text-amber-600">
                              {workshop.credit_price} Kredit
                            </p>
                            <p className="text-muted-foreground text-xs">
                              Akses penuh workshop
                            </p>
                          </div>

                          <Button
                            size="lg"
                            className="w-full gap-2 bg-amber-500 hover:bg-amber-600"
                            onClick={() =>
                              requireAuth(() => {
                                if (id && typeof id === "string") {
                                  buyWithCredits.mutate(id);
                                }
                              })
                            }
                            disabled={buyWithCredits.isPending}
                          >
                            {buyWithCredits.isPending ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Memproses...
                              </>
                            ) : (
                              <>
                                <Coins className="h-4 w-4" />
                                Beli dengan {workshop.credit_price} Kredit
                              </>
                            )}
                          </Button>

                          <Button
                            size="lg"
                            className="w-full"
                            onClick={handleCheckout}
                            disabled={isProcessing}
                          >
                            {isProcessing ? "Memproses..." : "Daftar Sekarang"}
                          </Button>
                        </>
                      )}

                      <Separator />

                      {/* Info */}
                      <ul className="text-muted-foreground space-y-2 text-sm">
                        <li>✔ Akses semua materi</li>
                        <li>✔ Sertifikat kelulusan</li>
                        <li>✔ Update materi jika ada</li>
                      </ul>
                    </CardContent>
                  </Card>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
