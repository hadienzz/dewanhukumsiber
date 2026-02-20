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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Users,
  Calendar,
  ArrowRight,
  ThumbsUp,
  Quote,
  Video,
  Building2,
} from "lucide-react";
import {
  completedTrainings,
  trainingReviews,
  formatDate,
  getTypeLabel,
  getTypeBadgeVariant,
} from "@/lib/training-data";
import { useLanguage } from "@/lib/language-context";

export default function PastTrainingReviewSection() {
  const [selectedType, setSelectedType] = useState<
    "all" | "pelatihan" | "workshop"
  >("all");
  const { t } = useLanguage();

  const filteredTrainings =
    selectedType === "all"
      ? completedTrainings
      : completedTrainings.filter((t) => t.type === selectedType);

  const getReviewsForTraining = (trainingId: string) => {
    return trainingReviews.filter((r) => r.training_id === trainingId);
  };

  return (
    <section id="past-training" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <Star size={16} />
            <span className="text-sm font-medium">
              {t("Kelas Sebelumnya", "Previous Classes")}
            </span>
          </div>
          <h2 className="text-foreground mb-4 text-4xl font-bold text-balance md:text-5xl">
            {t(
              "Pelatihan & Workshop yang Telah Selesai",
              "Completed Training & Workshops",
            )}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-balance">
            {t(
              "Lihat rekam jejak program kami beserta testimoni dari para alumni.",
              "View our program track record along with testimonials from alumni.",
            )}
          </p>
        </div>

        <Tabs
          value={selectedType}
          onValueChange={(value) =>
            setSelectedType(value as typeof selectedType)
          }
          className="mb-8"
        >
          <div className="mb-8 flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">{t("Semua", "All")}</TabsTrigger>
              <TabsTrigger value="pelatihan">
                {t("Pelatihan", "Training")}
              </TabsTrigger>
              <TabsTrigger value="workshop">Workshop</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={selectedType} className="mt-0">
            <TrainingGrid
              trainings={filteredTrainings}
              getReviewsForTraining={getReviewsForTraining}
            />
          </TabsContent>
        </Tabs>

        {/* Featured Reviews Section */}
        <div className="mt-20">
          <h3 className="text-foreground mb-8 text-center text-2xl font-bold md:text-3xl">
            {t("Apa Kata Alumni Kami?", "What Our Alumni Say?")}
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trainingReviews.slice(0, 6).map((review) => (
              <Card
                key={review.id}
                className="bg-card transition-shadow hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="mb-3 flex items-start justify-between">
                    <Badge
                      variant={getTypeBadgeVariant(review.training_type)}
                      className="text-xs"
                    >
                      {getTypeLabel(review.training_type)}
                    </Badge>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/training/${review.training_id}`}
                    className="hover:text-primary transition-colors"
                  >
                    <p className="text-primary line-clamp-1 text-sm font-medium">
                      {review.training_title}
                    </p>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Quote
                      size={24}
                      className="text-primary/20 absolute -top-1 -left-1"
                    />
                    <p className="text-foreground line-clamp-4 pl-5 leading-relaxed">
                      {review.content}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={review.reviewer_avatar || "/placeholder.svg"}
                          alt={review.reviewer_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          {review.reviewer_name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {review.reviewer_role}
                        </p>
                      </div>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <ThumbsUp size={14} />
                      <span className="text-xs">{review.helpful}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TrainingGridProps {
  trainings: typeof completedTrainings;
  getReviewsForTraining: (id: string) => typeof trainingReviews;
}

function TrainingGrid({ trainings, getReviewsForTraining }: TrainingGridProps) {
  const { t } = useLanguage();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {trainings.map((training) => {
        const reviews = getReviewsForTraining(training.id);
        const topReview = reviews[0];

        return (
          <Card
            key={training.id}
            className="group overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="grid sm:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
              <div className="bg-muted relative h-40 min-h-[160px] overflow-hidden sm:h-full">
                <Image
                  src={training.thumbnail || "/placeholder.svg"}
                  alt={training.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                  <Badge
                    variant={getTypeBadgeVariant(training.type)}
                    className="text-xs"
                  >
                    {getTypeLabel(training.type)}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col">
                <CardHeader className="pb-2">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {training.category}
                    </Badge>
                    <Badge variant="outline" className="gap-1 text-xs">
                      {training.is_online ? (
                        <Video size={10} />
                      ) : (
                        <Building2 size={10} />
                      )}
                      {training.is_online ? "Online" : "Offline"}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary line-clamp-2 text-base transition-colors lg:text-lg">
                    {training.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-sm">
                    {training.short_description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col justify-between pt-0">
                  <div className="text-muted-foreground mb-3 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(training.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>
                        {training.enrolled_participants}{" "}
                        {t("peserta", "participants")}
                      </span>
                    </div>
                  </div>

                  {training.rating && (
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < Math.floor(training.rating!)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold">
                        {training.rating}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        ({training.totalReviews} {t("ulasan", "reviews")})
                      </span>
                    </div>
                  )}

                  {topReview && (
                    <div className="bg-muted/50 mb-3 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Quote
                          size={14}
                          className="text-primary/60 mt-0.5 shrink-0"
                        />
                        <p className="text-muted-foreground line-clamp-2 text-xs italic">
                          &ldquo;{topReview.content}&rdquo;
                        </p>
                      </div>
                      <p className="mt-2 text-right text-xs font-medium">
                        — {topReview.reviewer_name}
                      </p>
                    </div>
                  )}

                  <Link href={`/training/${training.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                    >
                      {t("Lihat Detail & Review", "View Details & Reviews")}
                      <ArrowRight size={14} />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
