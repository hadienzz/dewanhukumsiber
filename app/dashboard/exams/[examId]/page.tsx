"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  FileQuestion,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useExamInfo, useExamSession } from "@/hooks/exam/use-exam";
import Link from "next/link";

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;
  
  const { data: examInfo, isLoading: isLoadingInfo } = useExamInfo(examId);
  const examSession = useExamSession(examId);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  // Loading state
  if (isLoadingInfo) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Memuat ujian...</p>
        </div>
      </div>
    );
  }

  // Exam info not found
  if (!examInfo) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <FileQuestion className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Ujian tidak ditemukan
          </h1>
          <Button asChild>
            <Link href="/dashboard/exams">Kembali ke Daftar Ujian</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Exam not started - Show exam info
  if (!examSession.isStarted) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link
            href="/dashboard/exams"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Daftar Ujian
          </Link>

          <Card>
            <CardHeader className="text-center">
              <Badge className="w-fit mx-auto mb-4">Ujian</Badge>
              <CardTitle className="text-2xl">{examInfo.title}</CardTitle>
              {examInfo.description && (
                <CardDescription>{examInfo.description}</CardDescription>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Exam Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Durasi</p>
                  <p className="font-semibold">{examInfo.duration_minutes} menit</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <FileQuestion className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Jumlah Soal</p>
                  <p className="font-semibold">{examInfo._count?.questions ?? 0} soal</p>
                </div>
              </div>

              {/* Passing Score */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Nilai Minimum Lulus</span>
                  <span className="font-semibold text-green-600">{examInfo.passing_score}%</span>
                </div>
                <Progress value={examInfo.passing_score} className="h-2" />
              </div>

              {/* Attempt Info */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Kesempatan Mengerjakan</span>
                  <span className="font-semibold">
                    {examInfo.attempt_count ?? 0} / {examInfo.max_attempts}
                  </span>
                </div>
                {examInfo.best_score !== undefined && examInfo.best_score > 0 && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-slate-600">Nilai Terbaik</span>
                    <span className="font-semibold text-blue-600">{examInfo.best_score.toFixed(1)}%</span>
                  </div>
                )}
              </div>

              {/* Anti-cheat Warning */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Peraturan Ujian</h4>
                    <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                      <li>• Urutan soal dan jawaban akan diacak</li>
                      <li>• Jangan berpindah tab/aplikasi selama ujian</li>
                      <li>• Copy dan klik kanan akan dinonaktifkan</li>
                      <li>• Timer akan berjalan otomatis</li>
                      <li>• Jawaban tersimpan otomatis</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              {examInfo.can_attempt ? (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={examSession.handleStart}
                  disabled={examSession.isStarting}
                >
                  {examSession.isStarting ? "Memulai..." : "Mulai Ujian"}
                </Button>
              ) : (
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                  <p className="text-red-700 font-medium">
                    Kesempatan mengerjakan sudah habis
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Exam submitted - Show result
  if (examSession.isSubmitted && examSession.submitResult) {
    const result = examSession.submitResult;
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div
                className={cn(
                  "w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center",
                  result.is_passed ? "bg-green-100" : "bg-red-100"
                )}
              >
                {result.is_passed ? (
                  <Check className="h-10 w-10 text-green-600" />
                ) : (
                  <AlertTriangle className="h-10 w-10 text-red-600" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {result.is_passed ? "Selamat, Anda Lulus!" : "Maaf, Belum Lulus"}
              </CardTitle>
              <CardDescription>
                {result.is_passed
                  ? "Anda telah berhasil menyelesaikan ujian ini"
                  : "Tingkatkan pemahaman Anda dan coba lagi"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-5xl font-bold text-slate-900">
                  {result.score.toFixed(1)}%
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  Nilai minimum: {result.passing_score}%
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <p className="text-sm text-slate-600">Jawaban Benar</p>
                  <p className="text-2xl font-bold text-green-600">
                    {result.correct_count}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <p className="text-sm text-slate-600">Total Soal</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {result.total_questions}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/dashboard/exams">Kembali</Link>
                </Button>
                {!result.is_passed && (
                  <Button
                    className="flex-1"
                    onClick={() => window.location.reload()}
                  >
                    Coba Lagi
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Exam in progress
  const currentQuestion = examSession.currentQuestion;
  const selectedAnswer = currentQuestion
    ? examSession.answers[currentQuestion.id]
    : undefined;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header with Timer */}
      <header className="sticky top-0 z-50 bg-slate-800 border-b border-slate-700 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">{examInfo.title}</Badge>
            <span className="text-sm text-slate-400">
              Soal {examSession.currentQuestionIndex + 1} dari {examSession.totalQuestions}
            </span>
          </div>
          
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg",
              examSession.isTimeCritical
                ? "bg-red-600 text-white animate-pulse"
                : examSession.isTimeWarning
                ? "bg-yellow-600 text-white"
                : "bg-slate-700 text-white"
            )}
          >
            <Clock className="h-5 w-5" />
            {examSession.formattedTime}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Question Navigation */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">Navigasi Soal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {examSession.questions.map((q, idx) => {
                    const isAnswered = examSession.answers[q.id] !== undefined;
                    const isCurrent = idx === examSession.currentQuestionIndex;
                    
                    return (
                      <button
                        key={q.id}
                        onClick={() => examSession.handleGoToQuestion(idx)}
                        className={cn(
                          "w-10 h-10 rounded-lg text-sm font-medium transition-colors",
                          isCurrent
                            ? "bg-blue-600 text-white"
                            : isAnswered
                            ? "bg-green-600 text-white"
                            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        )}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-600" />
                    <span className="text-slate-400">Sudah dijawab</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-slate-700" />
                    <span className="text-slate-400">Belum dijawab</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-sm text-slate-400 mb-2">
                    Terjawab: {examSession.answeredCount} / {examSession.totalQuestions}
                  </p>
                  <Progress
                    value={(examSession.answeredCount / examSession.totalQuestions) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Soal {examSession.currentQuestionIndex + 1}</Badge>
                  <Badge variant="outline" className="text-slate-400 border-slate-600">
                    {currentQuestion?.points ?? 1} poin
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Question Text */}
                <div className="p-6 bg-slate-700/50 rounded-lg">
                  <p className="text-lg text-white leading-relaxed">
                    {currentQuestion?.question}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion?.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        currentQuestion &&
                        examSession.handleSelectAnswer(currentQuestion.id, idx)
                      }
                      className={cn(
                        "w-full p-4 rounded-lg text-left transition-all flex items-start gap-4",
                        selectedAnswer === idx
                          ? "bg-blue-600 text-white ring-2 ring-blue-400"
                          : "bg-slate-700 text-slate-200 hover:bg-slate-600"
                      )}
                    >
                      <span
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
                          selectedAnswer === idx
                            ? "bg-white text-blue-600"
                            : "bg-slate-600 text-slate-300"
                        )}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="pt-1">{option}</span>
                    </button>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <Button
                    variant="ghost"
                    onClick={examSession.handlePrevQuestion}
                    disabled={examSession.currentQuestionIndex === 0}
                    className="text-slate-300 hover:text-white hover:bg-slate-700"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Sebelumnya
                  </Button>

                  {examSession.currentQuestionIndex === examSession.totalQuestions - 1 ? (
                    <Button onClick={() => setShowSubmitDialog(true)}>
                      Selesai & Kirim
                    </Button>
                  ) : (
                    <Button
                      onClick={examSession.handleNextQuestion}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Selanjutnya
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kirim Jawaban?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda telah menjawab {examSession.answeredCount} dari {examSession.totalQuestions} soal.
              {examSession.answeredCount < examSession.totalQuestions && (
                <span className="block mt-2 text-yellow-600">
                  Masih ada {examSession.totalQuestions - examSession.answeredCount} soal yang belum dijawab.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Kembali</AlertDialogCancel>
            <AlertDialogAction
              onClick={examSession.handleSubmit}
              disabled={examSession.isSubmitting}
            >
              {examSession.isSubmitting ? "Mengirim..." : "Kirim Jawaban"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
