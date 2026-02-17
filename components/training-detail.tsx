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
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Users,
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Award,
  BookOpen,
  Target,
  ThumbsUp,
  Quote,
  Video,
  Building2,
  Share2,
  Heart,
  Download,
} from "lucide-react";
import {
  TrainingSession,
  getReviewsByTrainingId,
  formatDate,
  getStatusBadgeVariant,
  getStatusLabel,
  getTypeLabel,
  getTypeBadgeVariant,
} from "@/lib/training-data";

interface TrainingDetailProps {
  training: TrainingSession;
}

export default function TrainingDetail({ training }: TrainingDetailProps) {
  const reviews = getReviewsByTrainingId(training.id);
  const participantProgress =
    (training.enrolledParticipants / training.maxParticipants) * 100;

  // Calculate rating distribution (mock data)
  const ratingDistribution = [
    { stars: 5, count: Math.floor((training.totalReviews || 0) * 0.7) },
    { stars: 4, count: Math.floor((training.totalReviews || 0) * 0.2) },
    { stars: 3, count: Math.floor((training.totalReviews || 0) * 0.07) },
    { stars: 2, count: Math.floor((training.totalReviews || 0) * 0.02) },
    { stars: 1, count: Math.floor((training.totalReviews || 0) * 0.01) },
  ];

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary/5 via-background to-primary/10 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#past-training"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Daftar</span>
          </Link>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={getStatusBadgeVariant(training.status)}>
                  {getStatusLabel(training.status)}
                </Badge>
                <Badge variant={getTypeBadgeVariant(training.type)}>
                  {getTypeLabel(training.type)}
                </Badge>
                <Badge variant="secondary">{training.category}</Badge>
                <Badge variant="outline">{training.level}</Badge>
                <Badge variant="outline" className="gap-1">
                  {training.is_online ? (
                    <Video size={12} />
                  ) : (
                    <Building2 size={12} />
                  )}
                  {training.is_online ? "Online" : "Offline"}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {training.title}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {training.full_description}
              </p>

              {/* Instructor Info */}
              <div className="flex items-center gap-4 p-4 bg-card rounded-xl border">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted shrink-0">
                  <Image
                    src={training.instructor.avatar || "/placeholder.svg"}
                    alt={training.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instruktur</p>
                  <p className="font-semibold text-lg">
                    {training.instructor.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {training.instructor.title}
                  </p>
                </div>
              </div>

              {/* Stats */}
              {training.rating && (
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={
                            i < Math.floor(training.rating!)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xl font-bold">{training.rating}</span>
                    <span className="text-muted-foreground">
                      ({training.totalReviews} review)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users size={18} />
                    <span>
                      {training.enrolled_participants} peserta terdaftar
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Card - Registration */}
            <div className="lg:sticky lg:top-24">
              <Card className="overflow-hidden shadow-xl">
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={training.thumbnail || "/placeholder.svg"}
                    alt={training.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {training.price}
                    </p>
                    <p className="text-sm text-muted-foreground">per peserta</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Kuota Peserta
                      </span>
                      <span className="font-medium">
                        {training.enrolled_participants}/
                        {training.max_participants}
                      </span>
                    </div>
                    <Progress value={participantProgress} className="h-2" />
                    {participantProgress >= 80 && (
                      <p className="text-xs text-destructive font-medium">
                        ⚠️ Kuota hampir penuh!
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-primary" />
                      <div>
                        <p className="text-muted-foreground">Tanggal</p>
                        <p className="font-medium">
                          {formatDate(training.date)}
                        </p>
                        {training.end_date && (
                          <p className="font-medium">
                            s/d {formatDate(training.end_date)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-primary" />
                      <div>
                        <p className="text-muted-foreground">Waktu</p>
                        <p className="font-medium">{training.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-primary" />
                      <div>
                        <p className="text-muted-foreground">Lokasi</p>
                        <p className="font-medium">{training.location}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {training.status !== "completed" ? (
                    <Button className="w-full" size="lg">
                      Daftar Sekarang
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      size="lg"
                      variant="secondary"
                      disabled
                    >
                      Program Telah Selesai
                    </Button>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-2">
                      <Heart size={16} />
                      Simpan
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Share2 size={16} />
                      Bagikan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
            <div className="space-y-12">
              {/* Syllabus */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen size={20} className="text-primary" />
                    Materi Pembelajaran
                  </CardTitle>
                  <CardDescription>
                    {training.syllabus.length} topik • {training.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" className="w-full">
                    {training.syllabus.map((topic, index) => (
                      <AccordionItem key={index} value={`topic-${index}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                              {index + 1}
                            </div>
                            <span className="text-left">{topic}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-11">
                          <p className="text-muted-foreground">
                            Materi mendalam tentang {topic.toLowerCase()} dengan
                            contoh kasus praktis dan diskusi interaktif.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target size={20} className="text-primary" />
                    Persyaratan Peserta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {training.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="text-primary mt-0.5 shrink-0"
                        />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award size={20} className="text-primary" />
                    Yang Akan Anda Dapatkan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {training.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-primary mt-0.5 shrink-0"
                        />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Section */}
              {reviews.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star size={20} className="text-primary" />
                      Review dari Alumni
                    </CardTitle>
                    <CardDescription>
                      {training.totalReviews} review dari peserta sebelumnya
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Rating Summary */}
                    <div className="grid sm:grid-cols-[auto_1fr] gap-6 p-4 bg-muted/50 rounded-xl">
                      <div className="text-center">
                        <p className="text-5xl font-bold text-primary">
                          {training.rating}
                        </p>
                        <div className="flex justify-center gap-0.5 my-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < Math.floor(training.rating!)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {training.totalReviews} review
                        </p>
                      </div>
                      <div className="space-y-2">
                        {ratingDistribution.map(({ stars, count }) => (
                          <div key={stars} className="flex items-center gap-2">
                            <span className="text-sm w-6">{stars}</span>
                            <Star
                              size={12}
                              className="fill-yellow-400 text-yellow-400"
                            />
                            <Progress
                              value={
                                (count / (training.totalReviews || 1)) * 100
                              }
                              className="h-2 flex-1"
                            />
                            <span className="text-sm text-muted-foreground w-8">
                              {count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Individual Reviews */}
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                                <Image
                                  src={
                                    review.reviewerAvatar || "/placeholder.svg"
                                  }
                                  alt={review.reviewerName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-semibold">
                                  {review.reviewerName}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {review.reviewerRole}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
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
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatDate(review.date)}
                              </p>
                            </div>
                          </div>
                          <div className="relative pl-5">
                            <Quote
                              size={16}
                              className="absolute left-0 top-0 text-primary/30"
                            />
                            <p className="text-foreground leading-relaxed">
                              {review.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-2 text-muted-foreground"
                            >
                              <ThumbsUp size={14} />
                              Membantu ({review.helpful})
                            </Button>
                          </div>
                          <Separator />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Butuh Bantuan?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Hubungi tim kami untuk informasi lebih lanjut tentang
                    program ini.
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download size={16} />
                    Download Brosur
                  </Button>
                  <Button variant="outline" className="w-full">
                    Hubungi Kami
                  </Button>
                  <Separator />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-2">Kontak:</p>
                    <p>📧 training@dhsi.or.id</p>
                    <p>📞 +62 21 1234 5678</p>
                    <p>💬 WhatsApp: +62 812 3456 7890</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
