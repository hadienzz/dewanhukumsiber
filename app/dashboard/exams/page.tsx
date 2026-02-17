"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileQuestion,
  Filter,
  Search,
  XCircle,
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
import { useMyExams } from "@/hooks/exam/use-exam";

type FilterStatus = "all" | "available" | "passed" | "failed";

export default function ExamsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  
  const { data: exams, isLoading, error } = useMyExams();

  // Filter exams
  const filteredExams = exams?.filter((exam) => {
    // Search filter
    if (search && !exam.title.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    // Status filter
    if (statusFilter === "available") {
      return !exam.best_score || exam.best_score < exam.passing_score;
    }
    if (statusFilter === "passed") {
      return exam.best_score && exam.best_score >= exam.passing_score;
    }
    if (statusFilter === "failed") {
      return (
        exam.attempt_count > 0 &&
        exam.best_score &&
        exam.best_score < exam.passing_score &&
        exam.attempt_count >= exam.max_attempts
      );
    }

    return true;
  });

  // Stats calculation
  const totalExams = exams?.length ?? 0;
  const passedExams = exams?.filter(
    (e) => e.best_score && e.best_score >= e.passing_score
  ).length ?? 0;
  const pendingExams = totalExams - passedExams;

  const getExamStatus = (exam: NonNullable<typeof exams>[0]) => {
    if (!exam.attempt_count || exam.attempt_count === 0) {
      return { label: "Belum Dikerjakan", color: "secondary", icon: Clock };
    }
    if (exam.best_score && exam.best_score >= exam.passing_score) {
      return { label: "Lulus", color: "success", icon: CheckCircle };
    }
    if (exam.attempt_count >= exam.max_attempts) {
      return { label: "Gagal", color: "destructive", icon: XCircle };
    }
    return { label: "Belum Lulus", color: "warning", icon: AlertTriangle };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Memuat ujian...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-slate-600">Gagal memuat ujian</p>
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
          <h1 className="text-3xl font-bold text-slate-900">Ujian Saya</h1>
          <p className="text-slate-600 mt-2">
            Daftar ujian yang tersedia untuk Anda
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileQuestion className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Ujian</p>
                  <p className="text-2xl font-bold">{totalExams}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Lulus</p>
                  <p className="text-2xl font-bold">{passedExams}</p>
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
                  <p className="text-sm text-slate-600">Belum Lulus</p>
                  <p className="text-2xl font-bold">{pendingExams}</p>
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
                  placeholder="Cari ujian..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as FilterStatus)}
              >
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="available">Tersedia</SelectItem>
                  <SelectItem value="passed">Lulus</SelectItem>
                  <SelectItem value="failed">Gagal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Exam List */}
        {filteredExams?.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileQuestion className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">Tidak ada ujian yang ditemukan</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams?.map((exam) => {
              const status = getExamStatus(exam);
              const StatusIcon = status.icon;
              const canAttempt =
                exam.attempt_count < exam.max_attempts &&
                (!exam.best_score || exam.best_score < exam.passing_score);

              return (
                <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{exam.title}</CardTitle>
                        {exam.description && (
                          <CardDescription className="mt-1 line-clamp-2">
                            {exam.description}
                          </CardDescription>
                        )}
                      </div>
                      <Badge
                        variant={
                          status.color === "success"
                            ? "default"
                            : status.color === "destructive"
                            ? "destructive"
                            : "secondary"
                        }
                        className={cn(
                          status.color === "success" && "bg-green-600",
                          status.color === "warning" && "bg-yellow-600"
                        )}
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Exam Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Durasi</p>
                        <p className="font-medium">{exam.duration_minutes} menit</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Jumlah Soal</p>
                        <p className="font-medium">{exam._count?.questions ?? 0} soal</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Nilai Lulus</p>
                        <p className="font-medium">{exam.passing_score}%</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Percobaan</p>
                        <p className="font-medium">
                          {exam.attempt_count ?? 0} / {exam.max_attempts}
                        </p>
                      </div>
                    </div>

                    {/* Best Score */}
                    {exam.best_score !== undefined && exam.best_score > 0 && (
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-600">Nilai Terbaik</span>
                          <span
                            className={cn(
                              "font-medium",
                              exam.best_score >= exam.passing_score
                                ? "text-green-600"
                                : "text-red-600"
                            )}
                          >
                            {exam.best_score.toFixed(1)}%
                          </span>
                        </div>
                        <Progress
                          value={exam.best_score}
                          className={cn(
                            "h-2",
                            exam.best_score >= exam.passing_score
                              ? "[&>div]:bg-green-600"
                              : "[&>div]:bg-red-600"
                          )}
                        />
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      asChild
                      className="w-full"
                      variant={canAttempt ? "default" : "secondary"}
                      disabled={!canAttempt}
                    >
                      <Link href={`/dashboard/exams/${exam.id}`}>
                        {canAttempt
                          ? exam.attempt_count > 0
                            ? "Ulangi Ujian"
                            : "Mulai Ujian"
                          : "Lihat Detail"}
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
