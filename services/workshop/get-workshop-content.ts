import axiosInstance from "@/lib/axios";
import { APIResponse } from "@/types/api.types";
import { ModuleType } from "@/types/course-module";

export interface WorkshopModuleWithProgress {
  id: string;
  title: string;
  type: ModuleType;
  schedule_at: string;
  order: number;
  youtube_url?: string;
  zoom_url?: string;
  whatsapp_group_url?: string;
  exam_form_url?: string;
  description?: string;
  content_text?: string;
  progresses: {
    is_completed: boolean;
    completed_at: string | null;
  }[];
}

export interface WorkshopContentResponse {
  id: string;
  title: string;
  short_description: string;
  description: string;
  category: string;
  thumbnail: string;
  credit_price: number;
  benefits: string[];
  created_at: string;
  updated_at: string;
  modules: WorkshopModuleWithProgress[];
}

export async function getWorkshopContent(
  workshopId: string,
): Promise<APIResponse<WorkshopContentResponse>> {
  const { data } = await axiosInstance.get<
    APIResponse<WorkshopContentResponse>
  >(`/api/workshops/content/${workshopId}`);
  return data;
}
