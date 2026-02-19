"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  ClipboardCheck,
  FileText,
  MessageSquare,
  MonitorPlay,
  Video,
  MoreVertical,
  Trash2,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGetWorkshopDetail from "@/hooks/workshop/use-get-workshop-detail";
import useDeleteWorkshopModule from "@/hooks/workshop/use-delete-workshop-module";
import { moduleTypeLabels, ModuleType } from "@/types/course-module";
import { JSX } from "react";

const moduleTypeIcons: Record<ModuleType, JSX.Element> = {
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
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

export default function WorkshopDetailPage() {
  const params = useParams();
  const workshopId = params?.id as string;
  const { workshop, isLoading } = useGetWorkshopDetail(workshopId);
  const { deleteModule, isDeleting } = useDeleteWorkshopModule(workshopId);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/workshops"
            className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Workshop
          </Link>
          {workshop && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Dibuat pada {formatDate(workshop.created_at)}
            </Badge>
          )}
        </div>

        <Card className="overflow-hidden border-slate-200 bg-linear-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
          <CardContent className="grid gap-6 p-6 md:grid-cols-[2fr,1fr] md:p-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-600 hover:bg-blue-700">
                  {workshop?.category || "Workshop"}
                </Badge>
              </div>

              <h1 className="text-2xl leading-tight font-bold md:text-3xl">
                {workshop?.title ||
                  (isLoading
                    ? "Memuat workshop..."
                    : "Workshop tidak ditemukan")}
              </h1>

              <p className="max-w-2xl text-sm text-slate-200 md:text-base">
                {workshop?.short_description ||
                  "Ringkasan workshop akan tampil di sini."}
              </p>

              {workshop && (
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{workshop.modules.length} modul terjadwal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{workshop.benefits.length} poin manfaat</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-white/5 p-4 text-sm md:p-5">
              <div>
                <p className="text-xs tracking-wide text-slate-300 uppercase">
                  Harga Workshop
                </p>
                <p className="mt-1 text-2xl font-semibold text-emerald-300">
                  {workshop ? `${workshop.credit_price} Credit` : "-"}
                </p>
              </div>
              <Button
                variant="secondary"
                className="w-full justify-center bg-white/10 text-white hover:bg-white/20"
                asChild
              >
                <Link href={`/dashboard/workshops/${workshopId}/modules`}>
                  Kelola Modul Workshop
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
          <Card className="h-fit border-slate-200">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">
                Course Menu
              </CardTitle>
            </CardHeader>
            <CardContent className="-mt-10 text-sm">
              {isLoading && <p className="text-slate-500">Memuat modul...</p>}
              {!isLoading && workshop && workshop.modules.length === 0 && (
                <p className="text-slate-500">
                  Belum ada modul untuk workshop ini.
                </p>
              )}
              {workshop?.modules.map((module) => (
                <div
                  key={module.id}
                  className="flex items-start justify-between rounded-md px-2 py-1.5 hover:bg-slate-50"
                >
                  <div>
                    <p className="text-xs text-slate-500">
                      {formatDate(module.date)}
                    </p>
                    <p className="text-sm font-medium text-slate-900">
                      {module.title}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`ml-2 border ${moduleTypeColors[module.type]}`}
                  >
                    {moduleTypeLabels[module.type]}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-900">
                  Deskripsi Workshop
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                <p>
                  {workshop?.description ||
                    "Deskripsi lengkap workshop akan tampil di sini."}
                </p>

                {workshop && workshop.benefits.length > 0 && (
                  <div>
                    <p className="mb-2 font-medium text-slate-900">
                      Manfaat yang Didapat Peserta
                    </p>
                    <ul className="list-disc space-y-1 pl-5">
                      {workshop.benefits.map((benefit, index) => (
                        <li key={`benefit-${index}`}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-900">
                  Jadwal dan Modul
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isLoading && (
                  <p className="text-sm text-slate-500">
                    Memuat jadwal modul...
                  </p>
                )}
                {!isLoading && workshop && workshop.modules.length === 0 && (
                  <p className="text-sm text-slate-500">
                    Belum ada modul yang tersimpan. Tambahkan modul di halaman
                    "Kelola Modul Workshop".
                  </p>
                )}

                {workshop?.modules.map((module) => (
                  <div
                    key={module.id}
                    className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 text-sm md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex flex-1 items-start gap-3">
                      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                        {moduleTypeIcons[module.type]}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">
                          {formatDate(module.date)}
                        </p>
                        <p className="font-medium text-slate-900">
                          {module.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {moduleTypeLabels[module.type]}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2 md:mt-0">
                      {module.youtube_url && (
                        <Button asChild size="sm" variant="outline">
                          <a
                            href={module.youtube_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Video className="mr-1 h-3 w-3" />
                            Video
                          </a>
                        </Button>
                      )}
                      {module.zoom_url && (
                        <Button asChild size="sm" variant="outline">
                          <a
                            href={module.zoom_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MonitorPlay className="mr-1 h-3 w-3" />
                            Zoom
                          </a>
                        </Button>
                      )}
                      {module.whatsapp_group_url && (
                        <Button asChild size="sm" variant="outline">
                          <a
                            href={module.whatsapp_group_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MessageSquare className="mr-1 h-3 w-3" />
                            WhatsApp
                          </a>
                        </Button>
                      )}
                      {module.exam_form_url && (
                        <Button asChild size="sm" variant="outline">
                          <a
                            href={module.exam_form_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <ClipboardCheck className="mr-1 h-3 w-3" />
                            Ujian
                          </a>
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            variant="destructive"
                            disabled={isDeleting}
                            onClick={() => deleteModule(module.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus modul
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
