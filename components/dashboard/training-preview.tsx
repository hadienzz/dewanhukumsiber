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
import { ParticipantList } from "@/components/dashboard/participant-list";
import { getParticipantsByTrainingId } from "@/lib/participants-data";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  MapPin,
  Quote,
  Star,
  ThumbsUp,
  Users,
  Video,
  Building2,
  Award,
  BookOpen,
  Target,
  ExternalLink,
} from "lucide-react";
import {
  TrainingSession,
  TrainingReview,
  formatDate,
  getStatusLabel,
  getTypeLabel,
} from "@/lib/training-data";

interface TrainingPreviewProps {
  training: TrainingSession;
  reviews: TrainingReview[];
}

export function TrainingPreview({ training, reviews }: TrainingPreviewProps) {
  const participants = getParticipantsByTrainingId(training.id);
  const enrolledParticipants =
    training.enrolledParticipants ?? training.enrolled_participants ?? 0;
  const maxParticipants = training.maxParticipants ?? training.max_participants ?? 0;
  const participantProgress =
    maxParticipants > 0 ? (enrolledParticipants / maxParticipants) * 100 : 0;

  const statusColors: Record<string, string> = {
    upcoming: "bg-blue-100 text-blue-700",
    ongoing: "bg-amber-100 text-amber-700",
    completed: "bg-slate-100 text-slate-700",
  };

  const typeColors: Record<string, string> = {
    pelatihan: "bg-purple-100 text-purple-700",
    workshop: "bg-teal-100 text-teal-700",
  };

  const levelColors: Record<string, string> = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/training">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Preview Program
              </h1>
              <p className="text-sm text-slate-600">
                Lihat tampilan program seperti yang akan dilihat peserta
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/training/${training.id}`} target="_blank">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Lihat di Website
              </Button>
            </Link>
            <Link href={`/dashboard/training/${training.id}/edit`}>
              <Button className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Program
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Hero Card */}
            <Card className="overflow-hidden">
              <div className="relative h-64 w-full overflow-hidden bg-muted">
                <Image
                  src={training.thumbnail || "/placeholder.svg"}
                  alt={training.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge className={typeColors[training.type]}>
                    {getTypeLabel(training.type)}
                  </Badge>
                  <Badge className={statusColors[training.status]}>
                    {getStatusLabel(training.status)}
                  </Badge>
                  <Badge className={levelColors[training.level]}>
                    {training.level}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <Badge variant="outline" className="w-fit">
                  {training.category}
                </Badge>
                <CardTitle className="text-2xl">{training.title}</CardTitle>
                <CardDescription className="text-base">
                  {training.fullDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                    <Image
                      src={training.instructor.avatar || "/placeholder.svg"}
                      alt={training.instructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{training.instructor.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {training.instructor.title}
                    </p>
                  </div>
                </div>

                {training.rating && (
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(training.rating!)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{training.rating}</span>
                    <span className="text-muted-foreground">
                      ({training.totalReviews} review)
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Schedule Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Jadwal & Lokasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tanggal</p>
                      <p className="font-medium">{formatDate(training.date)}</p>
                      {training.endDate && (
                        <p className="text-sm text-muted-foreground">
                          s/d {formatDate(training.endDate)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Waktu</p>
                      <p className="font-medium">{training.time}</p>
                      <p className="text-sm text-muted-foreground">
                        {training.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:col-span-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      {training.isOnline ? (
                        <Video className="h-5 w-5 text-primary" />
                      ) : (
                        <Building2 className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lokasi</p>
                      <p className="font-medium">{training.location}</p>
                      <Badge variant="outline" className="mt-1">
                        {training.isOnline ? "Online" : "Offline"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Syllabus */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5" />
                  Materi Pembelajaran
                </CardTitle>
                <CardDescription>
                  {training.syllabus.length} topik yang akan dipelajari
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {training.syllabus.map((topic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {index + 1}
                      </div>
                      <p className="pt-1">{topic}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5" />
                  Persyaratan Peserta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {training.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="h-5 w-5" />
                  Yang Akan Didapatkan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {training.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 rounded-lg bg-primary/5 p-3"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            {reviews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="h-5 w-5" />
                    Review dari Alumni
                  </CardTitle>
                  <CardDescription>{reviews.length} review</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="space-y-3 border-b pb-4 last:border-0"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                            <Image
                              src={review.reviewer_avatar || "/placeholder.svg"}
                              alt={review.reviewer_name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{review.reviewer_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {review.reviewer_role}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Quote className="h-4 w-4 shrink-0 text-muted-foreground mt-1" />
                        <p className="text-sm text-muted-foreground">
                          {review.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{formatDate(review.date)}</span>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{review.helpful} orang terbantu</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="sticky top-6">
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {training.price}
                  </p>
                  <p className="text-sm text-muted-foreground">per peserta</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Kuota Peserta</span>
                    <span className="font-medium">
                      {enrolledParticipants}/{maxParticipants}
                    </span>
                  </div>
                  <Progress value={participantProgress} className="h-2" />
                  {participantProgress >= 80 && (
                    <p className="text-xs text-amber-600 font-medium">
                      ⚠️ Kuota hampir penuh!
                    </p>
                  )}
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(training.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{training.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Maks. {maxParticipants} peserta</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {training.isOnline ? (
                      <Video className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="truncate">
                      {training.isOnline ? "Online" : training.location}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button className="w-full" disabled>
                    Daftar Sekarang
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    *Ini adalah preview, tombol tidak aktif
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistik</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Peserta Terdaftar
                  </span>
                  <span className="font-semibold">
                    {enrolledParticipants}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sisa Kuota</span>
                  <span className="font-semibold">
                    {maxParticipants - enrolledParticipants}
                  </span>
                </div>
                {training.rating && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{training.rating}</span>
                    </div>
                  </div>
                )}
                {training.totalReviews && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Review</span>
                    <span className="font-semibold">
                      {training.totalReviews}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Participant List Section */}
        <div className="mt-8">
          <ParticipantList
            participants={participants}
            title="Peserta Terdaftar Program"
          />
        </div>
      </div>
    </div>
  );
}
