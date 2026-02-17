"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Video,
  MessageSquare,
  MonitorPlay,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";
import { ModuleType } from "@/types/course-module";

interface ModuleTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectType: (type: ModuleType) => void;
}

const moduleOptions: {
  type: ModuleType;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}[] = [
  {
    type: "video_exam",
    title: "Nonton Video + Ujian",
    description:
      "Peserta menonton video pembelajaran dan mengerjakan ujian di akhir modul.",
    icon: <Video className="h-6 w-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50 hover:bg-blue-100 border-blue-200",
  },
  {
    type: "video_discussion",
    title: "Nonton Video + Sesi Diskusi",
    description:
      "Peserta menonton video dan mengikuti sesi diskusi di akhir bulan.",
    icon: <MessageSquare className="h-6 w-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50 hover:bg-purple-100 border-purple-200",
  },
  {
    type: "live_class_exam",
    title: "Live Class Zoom + Ujian",
    description:
      "Peserta mengikuti kelas live via Zoom dan mengerjakan ujian setelahnya.",
    icon: <MonitorPlay className="h-6 w-6" />,
    color: "text-green-600",
    bgColor: "bg-green-50 hover:bg-green-100 border-green-200",
  },
  {
    type: "exam_only",
    title: "Ujian Saja",
    description:
      "Modul khusus ujian tanpa materi pembelajaran, cocok untuk tes atau evaluasi.",
    icon: <ClipboardCheck className="h-6 w-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-50 hover:bg-orange-100 border-orange-200",
  },
];

export function ModuleTypeDialog({
  open,
  onOpenChange,
  onSelectType,
}: ModuleTypeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Pilih Tipe Modul</DialogTitle>
          <DialogDescription>
            Pilih jenis modul pembelajaran yang ingin Anda tambahkan ke kursus
            ini.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {moduleOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => onSelectType(option.type)}
              className={`w-full flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${option.bgColor} text-left group`}
            >
              <div className={`p-2 rounded-lg bg-white shadow-sm ${option.color}`}>
                {option.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-1">
                  {option.title}
                </h4>
                <p className="text-sm text-slate-600">{option.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 mt-2 transition-colors" />
            </button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
