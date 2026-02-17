"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  FileQuestion,
  Lock,
  MessageSquare,
  Play,
  PlayCircle,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useTrainingDetail, useStartTraining, useUpdateModuleProgress } from "@/hooks/training/use-training";

export default function TrainingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const trainingId = params.trainingId as string;
  
  const { data: training, isLoading, error } = useTrainingDetail(trainingId);
  const startMutation = useStartTraining();
  const updateProgressMutation = useUpdateModuleProgress();
  
  const [openModules, setOpenModules] = useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleStartTraining = async () => {
    try {
      await startMutation.mutateAsync(trainingId);
      // Refresh or continue
    } catch (error) {
      // Error handled in mutation
    }
  };

  const handleCompleteModule = async (moduleId: string) => {
    try {
      await updateProgressMutation.mutateAsync({
        moduleId,
        data: { is_completed: true },
      });
    } catch (error) {
      // Error handled in mutation
    }
  };

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

  if (error || !training) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-slate-600 mb-4">Training tidak ditemukan</p>
          <Button asChild>
            <Link href="/dashboard/trainings">Kembali</Link>
          </Button>
        </div>
      </div>
    );
  }

  const completedModules = training.modules?.filter((m) => m.is_completed).length ?? 0;
  const totalModules = training.modules?.length ?? 0;
  const progressPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/dashboard/trainings"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Training
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Training Header */}
            <Card>
              {training.thumbnail && (
                <div className="relative h-56 w-full">
                  <Image
                    src={training.thumbnail}
                    alt={training.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">{training.title}</CardTitle>
                    {training.description && (
                      <CardDescription className="mt-2">
                        {training.description}
                      </CardDescription>
                    )}
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {training.training_type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{totalModules} modul</span>
                  </div>
                  {training._count?.exams && training._count.exams > 0 && (
                    <div className="flex items-center gap-1">
                      <FileQuestion className="h-4 w-4" />
                      <span>{training._count.exams} ujian</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Module List */}
            <Card>
              <CardHeader>
                <CardTitle>Materi Training</CardTitle>
                <CardDescription>
                  Selesaikan semua modul untuk menyelesaikan training ini
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {training.modules?.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">
                    Belum ada modul tersedia
                  </p>
                ) : (
                  training.modules?.map((module, idx) => {
                    const isOpen = openModules.includes(module.id);
                    const isLocked = idx > 0 && !training.modules?.[idx - 1]?.is_completed;

                    return (
                      <Collapsible
                        key={module.id}
                        open={isOpen && !isLocked}
                        onOpenChange={() => !isLocked && toggleModule(module.id)}
                      >
                        <CollapsibleTrigger
                          className={cn(
                            "w-full flex items-center gap-4 p-4 rounded-lg transition-colors",
                            isLocked
                              ? "bg-slate-100 cursor-not-allowed"
                              : "bg-slate-50 hover:bg-slate-100"
                          )}
                          disabled={isLocked}
                        >
                          {/* Status Icon */}
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                              module.is_completed
                                ? "bg-green-100 text-green-600"
                                : isLocked
                                ? "bg-slate-200 text-slate-400"
                                : "bg-blue-100 text-blue-600"
                            )}
                          >
                            {module.is_completed ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : isLocked ? (
                              <Lock className="h-5 w-5" />
                            ) : module.module_type === "video" ? (
                              <Video className="h-5 w-5" />
                            ) : module.module_type === "quiz" ? (
                              <FileQuestion className="h-5 w-5" />
                            ) : (
                              <BookOpen className="h-5 w-5" />
                            )}
                          </div>

                          {/* Module Info */}
                          <div className="flex-1 text-left">
                            <p
                              className={cn(
                                "font-medium",
                                isLocked ? "text-slate-400" : "text-slate-900"
                              )}
                            >
                              {idx + 1}. {module.title}
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                              <Badge variant="outline" className="text-xs">
                                {module.module_type}
                              </Badge>
                              {module.duration_minutes && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {module.duration_minutes} menit
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Expand Icon */}
                          {!isLocked && (
                            <ChevronDown
                              className={cn(
                                "h-5 w-5 text-slate-400 transition-transform",
                                isOpen && "rotate-180"
                              )}
                            />
                          )}
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <div className="px-4 py-4 ml-14 border-l-2 border-slate-200">
                            {module.description && (
                              <p className="text-slate-600 mb-4">{module.description}</p>
                            )}

                            {/* Video Player Placeholder */}
                            {module.module_type === "video" && module.video_url && (
                              <div className="mb-4 rounded-lg overflow-hidden bg-slate-900 aspect-video flex items-center justify-center">
                                <Button
                                  variant="ghost"
                                  size="lg"
                                  className="text-white hover:text-white hover:bg-white/20"
                                >
                                  <PlayCircle className="h-16 w-16" />
                                </Button>
                              </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3">
                              {!module.is_completed && (
                                <Button
                                  onClick={() => handleCompleteModule(module.id)}
                                  disabled={updateProgressMutation.isPending}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Tandai Selesai
                                </Button>
                              )}
                              {module.module_type === "quiz" && module.exam_id && (
                                <Button asChild variant="outline">
                                  <Link href={`/dashboard/exams/${module.exam_id}`}>
                                    <FileQuestion className="h-4 w-4 mr-2" />
                                    Kerjakan Quiz
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress Training</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600">{progressPercent}%</p>
                  <p className="text-sm text-slate-600 mt-1">
                    {completedModules} dari {totalModules} modul selesai
                  </p>
                </div>
                <Progress value={progressPercent} className="h-3" />
                
                {progressPercent === 100 ? (
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="font-medium text-green-800">
                      Selamat! Training selesai
                    </p>
                  </div>
                ) : !training.is_enrolled ? (
                  <Button
                    className="w-full"
                    onClick={handleStartTraining}
                    disabled={startMutation.isPending}
                  >
                    {startMutation.isPending ? "Memulai..." : "Mulai Training"}
                  </Button>
                ) : null}
              </CardContent>
            </Card>

            {/* Exam Card */}
            {training.exams && training.exams.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ujian</CardTitle>
                  <CardDescription>
                    Selesaikan ujian untuk mendapat sertifikat
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {training.exams.map((exam) => (
                    <div
                      key={exam.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileQuestion className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm">{exam.title}</p>
                          <p className="text-xs text-slate-500">
                            {exam.duration_minutes} menit
                          </p>
                        </div>
                      </div>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/dashboard/exams/${exam.id}`}>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Discussion Link */}
            {training.training_type === "video_discussion" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Diskusi</CardTitle>
                  <CardDescription>
                    Bergabung dalam forum diskusi training ini
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Buka Forum Diskusi
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
