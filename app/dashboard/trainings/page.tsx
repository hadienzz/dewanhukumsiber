"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Clock,
  FileQuestion,
  Filter,
  Play,
  Search,
  Video,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useMyTrainings } from "@/hooks/training/use-training";

type FilterType = "all" | "video_exam" | "video_discussion" | "live_exam" | "exam_only";

const TRAINING_TYPE_LABELS: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  video_exam: { label: "Video + Ujian", icon: Video, color: "bg-blue-100 text-blue-700" },
  video_discussion: { label: "Video + Diskusi", icon: Users, color: "bg-purple-100 text-purple-700" },
  live_exam: { label: "Live + Ujian", icon: Play, color: "bg-green-100 text-green-700" },
  exam_only: { label: "Ujian Saja", icon: FileQuestion, color: "bg-orange-100 text-orange-700" },
};

export default function MyTrainingsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  
  const { data: trainings, isLoading, error } = useMyTrainings();

  // Filter trainings
  const filteredTrainings = trainings?.filter((training) => {
    if (search && !training.title.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (typeFilter !== "all" && training.training_type !== typeFilter) {
      return false;
    }
    return true;
  });

  // Stats calculation
  const totalTrainings = trainings?.length ?? 0;
  const completedTrainings = trainings?.filter((t) => t.progress === 100).length ?? 0;
  const inProgressTrainings = trainings?.filter((t) => t.progress && t.progress > 0 && t.progress < 100).length ?? 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Memuat training...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-slate-600">Gagal memuat training</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Training Saya</h1>
          <p className="text-slate-600 mt-2">
            Daftar training yang sedang Anda ikuti
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Training</p>
                  <p className="text-2xl font-bold">{totalTrainings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Play className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Selesai</p>
                  <p className="text-2xl font-bold">{completedTrainings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Sedang Berjalan</p>
                  <p className="text-2xl font-bold">{inProgressTrainings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Cari training..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value as FilterType)}
              >
                <SelectTrigger className="w-full md:w-56">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="video_exam">Video + Ujian</SelectItem>
                  <SelectItem value="video_discussion">Video + Diskusi</SelectItem>
                  <SelectItem value="live_exam">Live + Ujian</SelectItem>
                  <SelectItem value="exam_only">Ujian Saja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Training List */}
        {filteredTrainings?.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 mb-4">Belum ada training yang diikuti</p>
              <Button asChild>
                <Link href="/kelas">Jelajahi Training</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainings?.map((training) => {
              const typeInfo = TRAINING_TYPE_LABELS[training.training_type];
              const TypeIcon = typeInfo?.icon ?? BookOpen;

              return (
                <Card key={training.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Thumbnail */}
                  <div className="relative h-40 bg-slate-200">
                    {training.thumbnail ? (
                      <Image
                        src={training.thumbnail}
                        alt={training.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-slate-400" />
                      </div>
                    )}
                    <Badge
                      className={cn(
                        "absolute top-3 left-3",
                        typeInfo?.color ?? "bg-slate-100 text-slate-700"
                      )}
                    >
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {typeInfo?.label ?? training.training_type}
                    </Badge>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{training.title}</CardTitle>
                    {training.description && (
                      <CardDescription className="line-clamp-2">
                        {training.description}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Module count */}
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <BookOpen className="h-4 w-4" />
                      <span>{training._count?.modules ?? 0} modul</span>
                    </div>

                    {/* Progress */}
                    {training.progress !== undefined && (
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-600">Progress</span>
                          <span
                            className={cn(
                              "font-medium",
                              training.progress === 100
                                ? "text-green-600"
                                : "text-blue-600"
                            )}
                          >
                            {training.progress}%
                          </span>
                        </div>
                        <Progress
                          value={training.progress}
                          className={cn(
                            "h-2",
                            training.progress === 100 && "[&>div]:bg-green-600"
                          )}
                        />
                      </div>
                    )}

                    {/* Action Button */}
                    <Button asChild className="w-full">
                      <Link href={`/dashboard/trainings/${training.id}`}>
                        {training.progress === 100
                          ? "Lihat Ulang"
                          : training.progress && training.progress > 0
                          ? "Lanjutkan"
                          : "Mulai Training"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
