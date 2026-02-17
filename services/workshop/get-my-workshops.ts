import axiosInstance from "@/lib/axios";
import { APIResponse } from "@/types/api.types";
import { ModuleType } from "@/types/course-module";

export interface ModuleProgressInfo {
  is_completed: boolean;
  completed_at: string | null;
}

export interface MyWorkshopModule {
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
  progresses: ModuleProgressInfo[];
}

export interface MyWorkshop {
  id: string;
  title: string;
  short_description: string;
  thumbnail: string;
  category: string;
  credit_price: number;
  created_at: string;
  modules: MyWorkshopModule[];
}

export interface SelectedWorkshopItem {
  id: string;
  user_id: string;
  workshop_id: string;
  created_at: string;
  workshop: MyWorkshop;
}

export async function getMyWorkshops(): Promise<
  APIResponse<SelectedWorkshopItem[]>
> {
  const { data } = await axiosInstance.get<APIResponse<SelectedWorkshopItem[]>>(
    "/api/workshops/my-workshops",
  );
  return data;
}
