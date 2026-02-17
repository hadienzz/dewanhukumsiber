"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  PlayCircle,
  FileText,
  Video,
  ExternalLink,
  Loader2,
  Trophy,
  ChevronRight,
  MessageCircle,
  ClipboardCheck,
  X,
  Menu,
} from "lucide-react";
import { moduleTypeLabels } from "@/types/course-module";
import useGetWorkshopContent from "@/hooks/workshop/use-get-workshop-content";
import useToggleModuleProgress from "@/hooks/workshop/use-toggle-module-progress";
import useGetUser from "@/hooks/auth/use-get-user";
import type { WorkshopModuleWithProgress } from "@/services/workshop/get-workshop-content";

function getModuleIcon(type: string, size = 16) {
  switch (type) {
    case "video_exam":
    case "video_discussion":
      return <Video size={size} />;
    case "live_class_exam":
      return <PlayCircle size={size} />;
    case "exam_only":
      return <FileText size={size} />;
    default:
      return <FileText size={size} />;
  }
}

function isModuleCompleted(module: WorkshopModuleWithProgress): boolean {
  return module.progresses.length > 0 && module.progresses[0].is_completed;
}

function convertToEmbedUrl(url: string): string {
  const watchMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
  );
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  return url;
}

export default function WorkshopLearnPage() {
  const { id } = useParams();
  const router = useRouter();
  const workshopId = id as string;
  const { hasLoggedin, isLoading: authLoading } = useGetUser();

  useEffect(() => {
    if (!authLoading && !hasLoggedin) {
      router.push("/login");
    }
  }, [authLoading, hasLoggedin, router]);

  const {
    workshop,
    isLoading,
    isError,
    totalModules,
    completedModules,
    progressPercentage,
  } = useGetWorkshopContent(workshopId);

  const toggleProgress = useToggleModuleProgress(workshopId);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const activeModule = workshop?.modules.find((m) => m.id === activeModuleId);

  // Auto-select first incomplete or first module
  if (workshop && !activeModuleId && workshop.modules.length > 0) {
    const first =
      workshop.modules.find((m) => !isModuleCompleted(m)) ||
      workshop.modules[0];
    setActiveModuleId(first.id);
  }

  const isAllCompleted = totalModules > 0 && completedModules === totalModules;

  const selectModule = (moduleId: string) => {
    setActiveModuleId(moduleId);
    setMobileSidebarOpen(false);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
          <span className="ml-3 text-slate-500">Memuat konten workshop...</span>
        </div>
      </>
    );
  }

  if (isError || !workshop) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <Card className="mx-auto max-w-md">
            <CardContent className="py-10 text-center">
              <p className="text-slate-500">
                Gagal memuat konten workshop. Pastikan Anda sudah membeli
                workshop ini.
              </p>
              <Button
                className="mt-4 bg-teal-500 hover:bg-teal-600"
                onClick={() => router.push(`/workshop/${workshopId}`)}
              >
                Kembali ke Detail
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* ═══ Header ═══ */}
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <Link
                  href="/kelas"
                  className="flex shrink-0 items-center gap-1 text-sm text-slate-500 transition-colors hover:text-teal-600"
                >
                  <ArrowLeft size={16} />
                  <span className="hidden sm:inline">Kembali</span>
                </Link>
                <Separator orientation="vertical" className="h-5" />
                <h1 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
                  {workshop.title}
                </h1>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                {/* Progress */}
                <div className="hidden items-center gap-2 sm:flex">
                  <Progress value={progressPercentage} className="h-2 w-24" />
                  <span className="text-xs whitespace-nowrap text-slate-500">
                    {completedModules}/{totalModules} modul
                  </span>
                </div>

                {isAllCompleted && (
                  <Badge className="gap-1 bg-green-500 text-white">
                    <Trophy size={12} />
                    Selesai
                  </Badge>
                )}

                {/* Mobile sidebar toggle */}
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
                >
                  <Menu size={14} />
                  Modul
                </button>
              </div>
            </div>

            {/* Mobile progress bar */}
            <div className="mt-2 sm:hidden">
              <div className="flex items-center gap-2">
                <Progress value={progressPercentage} className="h-1.5 flex-1" />
                <span className="text-xs text-slate-400">
                  {completedModules}/{totalModules}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Main Layout ═══ */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
            {/* ─── Content Area ─── */}
            <div className="space-y-6">
              {activeModule ? (
                <ModuleContent
                  module={activeModule}
                  onToggleComplete={() =>
                    toggleProgress.mutate(activeModule.id)
                  }
                  isToggling={toggleProgress.isPending}
                />
              ) : (
                <Card>
                  <CardContent className="py-16 text-center">
                    <p className="text-slate-500">
                      Pilih modul dari daftar untuk mulai belajar.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* ─── Desktop Sidebar ─── */}
            <aside className="sticky top-20 hidden h-fit lg:block">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Daftar Modul</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <ModuleSidebar
                    modules={workshop.modules}
                    activeModuleId={activeModuleId}
                    onSelectModule={selectModule}
                    completedModules={completedModules}
                    totalModules={totalModules}
                    progressPercentage={progressPercentage}
                  />
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>

        {/* ─── Mobile Sidebar Overlay ─── */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <aside className="absolute top-0 right-0 h-full w-[320px] max-w-[85vw] overflow-y-auto bg-white shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3">
                <h2 className="text-sm font-semibold text-slate-900">
                  Daftar Modul
                </h2>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-3">
                <ModuleSidebar
                  modules={workshop.modules}
                  activeModuleId={activeModuleId}
                  onSelectModule={selectModule}
                  completedModules={completedModules}
                  totalModules={totalModules}
                  progressPercentage={progressPercentage}
                />
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

// ─────────────────────────────────────────
// MODULE SIDEBAR
// ─────────────────────────────────────────
function ModuleSidebar({
  modules,
  activeModuleId,
  onSelectModule,
  completedModules,
  totalModules,
  progressPercentage,
}: {
  modules: WorkshopModuleWithProgress[];
  activeModuleId: string | null;
  onSelectModule: (id: string) => void;
  completedModules: number;
  totalModules: number;
  progressPercentage: number;
}) {
  return (
    <div className="space-y-3">
      {/* Progress summary */}
      <div className="space-y-2 rounded-lg bg-slate-50 p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {completedModules} dari {totalModules} modul selesai
          </span>
          <span className="font-semibold text-teal-600">
            {progressPercentage}%
          </span>
        </div>
        <Progress value={progressPercentage} className="h-1.5" />
      </div>

      {/* Module list */}
      <div className="space-y-1">
        {modules.map((module) => {
          const completed = isModuleCompleted(module);
          const isActive = module.id === activeModuleId;
          const hasVideo = !!module.youtube_url;

          return (
            <button
              key={module.id}
              onClick={() => onSelectModule(module.id)}
              className={`group flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                isActive
                  ? "bg-teal-50 ring-1 ring-teal-200"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {completed ? (
                  <CheckCircle size={18} className="text-green-500" />
                ) : isActive ? (
                  <PlayCircle size={18} className="text-teal-500" />
                ) : (
                  <Circle
                    size={18}
                    className="text-slate-300 group-hover:text-slate-400"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm leading-tight font-medium ${
                    isActive
                      ? "text-teal-700"
                      : completed
                        ? "text-green-700"
                        : "text-slate-700 group-hover:text-slate-900"
                  }`}
                >
                  {module.order}. {module.title}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">
                    {moduleTypeLabels[module.type]}
                  </span>
                  {hasVideo && (
                    <Badge
                      variant="outline"
                      className="h-4 px-1 text-[10px] text-slate-400"
                    >
                      <Video size={10} className="mr-0.5" />
                      Video
                    </Badge>
                  )}
                </div>
              </div>

              {isActive && (
                <ChevronRight
                  size={14}
                  className="mt-1 shrink-0 text-teal-400"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// MODULE CONTENT
// ─────────────────────────────────────────
function ModuleContent({
  module,
  onToggleComplete,
  isToggling,
}: {
  module: WorkshopModuleWithProgress;
  onToggleComplete: () => void;
  isToggling: boolean;
}) {
  const completed = isModuleCompleted(module);
  const showVideo =
    (module.type === "video_exam" || module.type === "video_discussion") &&
    module.youtube_url;

  return (
    <div className="space-y-6">
      {/* ═══ Video Player (video_exam & video_discussion) ═══ */}
      {showVideo && (
        <Card className="overflow-hidden">
          <div className="aspect-video w-full bg-black">
            <iframe
              src={convertToEmbedUrl(module.youtube_url!)}
              title={module.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </Card>
      )}

      {/* ═══ Module Header ═══ */}
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-teal-600">
                  {getModuleIcon(module.type, 20)}
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {module.order}. {module.title}
                </h2>
              </div>
              <Badge variant="secondary" className="text-xs">
                {moduleTypeLabels[module.type]}
              </Badge>
            </div>

            <Button
              variant={completed ? "outline" : "default"}
              size="sm"
              onClick={onToggleComplete}
              disabled={isToggling}
              className={
                completed
                  ? "shrink-0 border-green-500 text-green-600 hover:bg-green-50"
                  : "shrink-0 bg-teal-500 hover:bg-teal-600"
              }
            >
              {isToggling ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : completed ? (
                <CheckCircle className="mr-1.5 h-4 w-4" />
              ) : (
                <Circle className="mr-1.5 h-4 w-4" />
              )}
              {completed ? "Selesai ✓" : "Tandai Selesai"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ═══ Description ═══ */}
      {(module.description || module.content_text) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Tentang Modul Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none leading-relaxed whitespace-pre-line text-slate-600">
              {module.content_text || module.description}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ═══ Action Buttons (type-driven) ═══ */}
      <ModuleActionButtons module={module} />
    </div>
  );
}

// ─────────────────────────────────────────
// MODULE ACTION BUTTONS (type-driven)
// ─────────────────────────────────────────
function ModuleActionButtons({
  module,
}: {
  module: WorkshopModuleWithProgress;
}) {
  const actions: {
    url: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
  }[] = [];

  switch (module.type) {
    case "video_exam":
      // Nonton Video + Ujian → link ujian (Google Form)
      if (module.exam_form_url) {
        actions.push({
          url: module.exam_form_url,
          label: "Kerjakan Ujian",
          description: "Tes pemahaman materi setelah menonton video",
          icon: <ClipboardCheck size={20} />,
          iconBg: "bg-amber-100",
          iconColor: "text-amber-600",
        });
      }
      break;

    case "video_discussion":
      // Nonton Video + Sesi Diskusi → link diskusi (Zoom)
      if (module.zoom_url) {
        actions.push({
          url: module.zoom_url,
          label: "Ikuti Sesi Diskusi",
          description:
            "Bergabung ke sesi diskusi via Zoom setelah menonton video",
          icon: <Video size={20} />,
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
        });
      }
      break;

    case "live_class_exam":
      // Live Class Zoom + Ujian → link Zoom + link ujian (Google Form)
      if (module.zoom_url) {
        actions.push({
          url: module.zoom_url,
          label: "Ikuti Live Class",
          description: "Bergabung ke sesi kelas online via Zoom",
          icon: <Video size={20} />,
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
        });
      }
      if (module.exam_form_url) {
        actions.push({
          url: module.exam_form_url,
          label: "Kerjakan Ujian",
          description: "Kerjakan ujian setelah mengikuti live class",
          icon: <ClipboardCheck size={20} />,
          iconBg: "bg-amber-100",
          iconColor: "text-amber-600",
        });
      }
      break;

    case "exam_only":
      // Ujian Saja → link ujian (Google Form)
      if (module.exam_form_url) {
        actions.push({
          url: module.exam_form_url,
          label: "Kerjakan Ujian",
          description: "Kerjakan ujian untuk menyelesaikan modul ini",
          icon: <ClipboardCheck size={20} />,
          iconBg: "bg-amber-100",
          iconColor: "text-amber-600",
        });
      }
      break;
  }

  if (actions.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Tautan & Aktivitas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-slate-50"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.iconBg} ${action.iconColor} shrink-0`}
            >
              {action.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900">
                {action.label}
              </p>
              <p className="text-xs text-slate-500">{action.description}</p>
            </div>
            <ExternalLink size={16} className="shrink-0 text-slate-400" />
          </a>
        ))}
      </CardContent>
    </Card>
  );
}
