"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  BookOpen,
  Plus,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Video,
  FileText,
  MessageSquare,
  MonitorPlay,
  ClipboardCheck,
} from "lucide-react";
import {
  ModuleType,
  moduleTypeLabels,
} from "@/types/course-module";
import { ModuleTypeDialog } from "./module-type-dialog";
import useCourseModulesBuilder from "@/hooks/modules/use-course-modules-builder";

const moduleTypeIcons: Record<ModuleType, React.ReactNode> = {
  video_exam: <Video className="h-4 w-4" />,
  video_discussion: <MessageSquare className="h-4 w-4" />,
  live_class_exam: <MonitorPlay className="h-4 w-4" />,
  exam_only: <ClipboardCheck className="h-4 w-4" />,
};

const moduleTypeColors: Record<ModuleType, string> = {
  video_exam: "bg-blue-100 text-blue-700 border-blue-200",
  video_discussion: "bg-purple-100 text-purple-700 border-purple-200",
  live_class_exam: "bg-green-100 text-green-700 border-green-200",
  exam_only: "bg-orange-100 text-orange-700 border-orange-200",
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

export function CourseModulesBuilder() {
  const {
    courseId,
    title,
    formik,
    modules,
    isTypeDialogOpen,
    isScheduleDialogOpen,
    openTypeDialog,
    handleTypeDialogChange,
    handleScheduleDialogChange,
    handleSelectType,
    handleCancelSchedule,
    handleConfirmSchedule,
    toggleModuleExpand,
    handleChangeDraftTitle,
    handleChangeDraftDate,
    handleChangeModuleField,
    handleSave,
    isSaveDisabled,
  } = useCourseModulesBuilder();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/workshops"
            className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Workshop
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
              <p className="text-sm text-slate-600">
                Tambahkan dan atur modul pembelajaran untuk kursus Anda.
              </p>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              ID: {courseId}
            </Badge>
          </div>
        </div>

        {/* Course Info Card */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Struktur Modul Pembelajaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600">
              Buat modul-modul pembelajaran sesuai dengan metode yang Anda
              inginkan. Setiap modul dapat berisi video, ujian, atau sesi
              interaktif.
            </p>

            {/* Modules List */}
            {modules.length > 0 ? (
              <div className="mb-6 space-y-3">
                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    className="overflow-hidden rounded-lg border bg-white"
                  >
                    {/* Module Header */}
                    <div
                      className="flex cursor-pointer items-center gap-3 p-4 transition-colors hover:bg-slate-50"
                      onClick={() => toggleModuleExpand(module.id)}
                    >
                      <GripVertical className="h-5 w-5 cursor-grab text-slate-400" />

                      <div className="flex flex-1 items-center gap-2">
                        <span className="font-medium text-slate-900">
                          {module.title}
                        </span>
                        {module.date && (
                          <span className="text-xs text-slate-500">
                            ({formatDate(module.date)})
                          </span>
                        )}
                        <Badge
                          variant="outline"
                          className={moduleTypeColors[module.type]}
                        >
                          <span className="mr-1.5">
                            {moduleTypeIcons[module.type]}
                          </span>
                          {moduleTypeLabels[module.type]}
                        </Badge>
                      </div>

                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {module.isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Module Content (Expanded) */}
                    {module.isExpanded && (
                      <div className="border-t bg-slate-50 p-4">
                        <div className="space-y-3">
                          {(() => {
                            const errs = (formik.errors as any)?.modules;
                            const moduleErr = Array.isArray(errs) ? errs[index] : undefined;
                            return moduleErr ? (
                              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                Ada data modul yang belum lengkap. Lengkapi field wajib agar bisa disimpan.
                              </div>
                            ) : null;
                          })()}
                          {/* Content based on module type */}
                          {module.type === "video_exam" && (
                            <>
                              <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-3">
                                <Video className="h-5 w-5 text-slate-400" />
                                <div className="flex-1 space-y-1">
                                  <span className="block text-sm font-medium text-slate-700">
                                    URL YouTube Video
                                  </span>
                                  <Input
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={module.youtubeUrl ?? ""}
                                    onChange={(e) =>
                                      handleChangeModuleField(
                                        module.id,
                                        "youtubeUrl",
                                        e.target.value,
                                      )
                                    }
                                    className={
                                      (formik.errors as any)?.modules?.[index]?.youtubeUrl
                                        ? "border-red-500"
                                        : undefined
                                    }
                                  />
                                  <p className="text-xs text-slate-500">
                                    Siswa akan melihat video ini dalam bentuk embed.
                                  </p>
                                  {(formik.errors as any)?.modules?.[index]?.youtubeUrl && (
                                    <p className="text-xs text-red-600">
                                      {(formik.errors as any)?.modules?.[index]?.youtubeUrl}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-3">
                                <FileText className="h-5 w-5 text-slate-400" />
                                <div className="flex-1 space-y-1">
                                  <span className="block text-sm font-medium text-slate-700">
                                    URL Google Form Ujian
                                  </span>
                                  <Input
                                    placeholder="https://docs.google.com/forms/..."
                                    value={module.examFormUrl ?? ""}
                                    onChange={(e) =>
                                      handleChangeModuleField(
                                        module.id,
                                        "examFormUrl",
                                        e.target.value,
                                      )
                                    }
                                    className={
                                      (formik.errors as any)?.modules?.[index]?.examFormUrl
                                        ? "border-red-500"
                                        : undefined
                                    }
                                  />
                                  <p className="text-xs text-slate-500">
                                    Link form ini akan dibuka ketika siswa mengerjakan ujian.
                                  </p>
                                  {(formik.errors as any)?.modules?.[index]?.examFormUrl && (
                                    <p className="text-xs text-red-600">
                                      {(formik.errors as any)?.modules?.[index]?.examFormUrl}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </>
                          )}

                          {module.type === "video_discussion" && (
                            <>
                              <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-3">
                                <Video className="h-5 w-5 text-slate-400" />
                                <div className="flex-1 space-y-1">
                                  <span className="block text-sm font-medium text-slate-700">
                                    URL Zoom Sesi Video
                                  </span>
                                  <Input
                                    placeholder="https://zoom.us/j/..."
                                    value={module.zoomUrl ?? ""}
                                    onChange={(e) =>
                                      handleChangeModuleField(
                                        module.id,
                                        "zoomUrl",
                                        e.target.value,
                                      )
                                    }
                                    className={
                                      (formik.errors as any)?.modules?.[index]?.zoomUrl
                                        ? "border-red-500"
                                        : undefined
                                    }
                                  />
                                  <p className="text-xs text-slate-500">
                                    Link Zoom untuk sesi video/diskusi sinkron.
                                  </p>
                                  {(formik.errors as any)?.modules?.[index]?.zoomUrl && (
                                    <p className="text-xs text-red-600">
                                      {(formik.errors as any)?.modules?.[index]?.zoomUrl}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-3">
                                <MessageSquare className="h-5 w-5 text-slate-400" />
                                <div className="flex-1 space-y-1">
                                  <span className="block text-sm font-medium text-slate-700">
                                    Link Grup WhatsApp Diskusi
                                  </span>
                                  <Input
                                    placeholder="https://chat.whatsapp.com/..."
                                    value={module.whatsappGroupUrl ?? ""}
                                    onChange={(e) =>
                                      handleChangeModuleField(
                                        module.id,
                                        "whatsappGroupUrl",
                                        e.target.value,
                                      )
                                    }
                                    className={
                                      (formik.errors as any)?.modules?.[index]?.whatsappGroupUrl
                                        ? "border-red-500"
                                        : undefined
                                    }
                                  />
                                  <p className="text-xs text-slate-500">
                                    Peserta akan diarahkan ke grup WhatsApp untuk diskusi.
                                  </p>
                                  {(formik.errors as any)?.modules?.[index]?.whatsappGroupUrl && (
                                    <p className="text-xs text-red-600">
                                      {(formik.errors as any)?.modules?.[index]?.whatsappGroupUrl}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </>
                          )}

                          {module.type === "live_class_exam" && (
                            <>
                              <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-3">
                                <MonitorPlay className="h-5 w-5 text-slate-400" />
                                <div className="flex-1 space-y-1">
                                  <span className="block text-sm font-medium text-slate-700">
                                    URL Zoom Live Class
                                  </span>
                                  <Input
                                    placeholder="https://zoom.us/j/..."
                                    value={module.zoomUrl ?? ""}
                                    onChange={(e) =>
                                      handleChangeModuleField(
                                        module.id,
                                        "zoomUrl",
                                        e.target.value,
                                      )
                                    }
                                    className={
                                      (formik.errors as any)?.modules?.[index]?.zoomUrl
                                        ? "border-red-500"
                                        : undefined
                                    }
                                  />
                                  <p className="text-xs text-slate-500">
                                    Link Zoom untuk live class.
                                  </p>
                                  {(formik.errors as any)?.modules?.[index]?.zoomUrl && (
                                    <p className="text-xs text-red-600">
                                      {(formik.errors as any)?.modules?.[index]?.zoomUrl}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-3">
                                <FileText className="h-5 w-5 text-slate-400" />
                                <div className="flex-1 space-y-1">
                                  <span className="block text-sm font-medium text-slate-700">
                                    URL Google Form Ujian
                                  </span>
                                  <Input
                                    placeholder="https://docs.google.com/forms/..."
                                    value={module.examFormUrl ?? ""}
                                    onChange={(e) =>
                                      handleChangeModuleField(
                                        module.id,
                                        "examFormUrl",
                                        e.target.value,
                                      )
                                    }
                                    className={
                                      (formik.errors as any)?.modules?.[index]?.examFormUrl
                                        ? "border-red-500"
                                        : undefined
                                    }
                                  />
                                  <p className="text-xs text-slate-500">
                                    Link form untuk ujian setelah live class.
                                  </p>
                                  {(formik.errors as any)?.modules?.[index]?.examFormUrl && (
                                    <p className="text-xs text-red-600">
                                      {(formik.errors as any)?.modules?.[index]?.examFormUrl}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </>
                          )}

                          {module.type === "exam_only" && (
                            <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-3">
                              <ClipboardCheck className="h-5 w-5 text-slate-400" />
                              <div className="flex-1 space-y-1">
                                <span className="block text-sm font-medium text-slate-700">
                                  URL Google Form Ujian
                                </span>
                                <Input
                                  placeholder="https://docs.google.com/forms/..."
                                  value={module.examFormUrl ?? ""}
                                  onChange={(e) =>
                                    handleChangeModuleField(
                                      module.id,
                                      "examFormUrl",
                                      e.target.value,
                                    )
                                  }
                                  className={
                                    (formik.errors as any)?.modules?.[index]?.examFormUrl
                                      ? "border-red-500"
                                      : undefined
                                  }
                                />
                                <p className="text-xs text-slate-500">
                                  Ujian hanya berupa form tanpa video.
                                </p>
                                {(formik.errors as any)?.modules?.[index]?.examFormUrl && (
                                  <p className="text-xs text-red-600">
                                    {(formik.errors as any)?.modules?.[index]?.examFormUrl}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-6 rounded-lg border-2 border-dashed border-slate-200 py-12 text-center">
                <BookOpen className="mx-auto mb-3 h-12 w-12 text-slate-300" />
                <h3 className="mb-1 text-lg font-medium text-slate-600">
                  Belum ada modul
                </h3>
                <p className="mb-4 text-sm text-slate-500">
                  Mulai dengan menambahkan modul pertama Anda
                </p>
              </div>
            )}

            {/* Add Module Button */}
            <Button
              onClick={openTypeDialog}
              className="w-full bg-slate-900 hover:bg-slate-800"
            >
              <Plus className="mr-2 h-4 w-4" />
              Tambah Modul Baru
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Link href={`/dashboard/workshops/${courseId}`}>
            <Button variant="outline">Kembali ke Detail Workshop</Button>
          </Link>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isSaveDisabled}
            onClick={handleSave}
          >
            Simpan & Selesai
          </Button>
        </div>
      </div>

      {/* Module Type Dialog */}
      <ModuleTypeDialog
        open={isTypeDialogOpen}
        onOpenChange={handleTypeDialogChange}
        onSelectType={handleSelectType}
      />

      {/* Schedule Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={handleScheduleDialogChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Atur Jadwal Modul</DialogTitle>
            <DialogDescription>
              Pilih judul modul dan tanggal pelaksanaannya. Jadwal ini akan
              digunakan sebagai acuan pembelajaran siswa.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="space-y-1">
              <Label htmlFor="module-title">Judul Modul</Label>
              <Input
                id="module-title"
                value={formik.values.draftTitle}
                onChange={(e) => handleChangeDraftTitle(e.target.value)}
                placeholder="Contoh: Pertemuan 1 - Pengantar"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="module-date">Tanggal Pelaksanaan</Label>
              <Input
                id="module-date"
                type="date"
                value={formik.values.draftDate}
                onChange={(e) => handleChangeDraftDate(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCancelSchedule}
           >
              Batal
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleConfirmSchedule}
              disabled={!formik.values.draftDate}
           >
              Simpan Modul
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
