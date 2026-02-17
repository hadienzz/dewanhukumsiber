import axiosInstance from "@/lib/axios";
import { ModuleType } from "@/types/course-module";

export interface SaveWorkshopModulesPayload {
  modules: {
    title: string;
    type: ModuleType;
    date: string;
    order: number;
    youtube_url?: string;
    zoom_url?: string;
    whatsapp_group_url?: string;
    exam_form_url?: string;
  }[];
}

export interface SaveWorkshopModulesResponse {
  status: string;
  message: string;
}

export const saveWorkshopModulesRequest = async (
  workshopId: string,
  payload: SaveWorkshopModulesPayload,
): Promise<SaveWorkshopModulesResponse> => {
  const { data } = await axiosInstance.post<SaveWorkshopModulesResponse>(
    `/api/dashboard/workshops/${workshopId}/modules`,
    payload,
  );

  return data;
};

export default saveWorkshopModulesRequest;
