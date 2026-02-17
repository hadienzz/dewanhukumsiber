// Types for course modules

export type ModuleType =
  | "video_exam"
  | "video_discussion"
  | "live_class_exam"
  | "exam_only";

export interface CourseModule {
  id: string;
  title: string;
  type: ModuleType;
  isExpanded: boolean;
  order: number;
  /** ISO date string (YYYY-MM-DD) for scheduled learning date */
  date: string;
  // URLs depend on module type
  youtubeUrl?: string;
  zoomUrl?: string;
  whatsappGroupUrl?: string;
  examFormUrl?: string;
}

export const moduleTypeLabels: Record<ModuleType, string> = {
  video_exam: "Video + Ujian",
  video_discussion: "Video + Sesi Diskusi",
  live_class_exam: "Live Class + Ujian",
  exam_only: "Ujian Saja",
};
