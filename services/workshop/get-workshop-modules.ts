import axiosInstance from "@/lib/axios";
import { ModuleType } from "@/types/course-module";

export interface WorkshopModuleItem {
  id: string;
  title: string;
  type: ModuleType;
  date: string;
  order: number;
  youtube_url?: string;
  zoom_url?: string;
  whatsapp_group_url?: string;
  exam_form_url?: string;
}

export interface GetWorkshopModulesResponse {
  status: string;
  message: string;
  data?: WorkshopModuleItem[];
}

const getWorkshopModules = async (
  workshopId: string,
): Promise<GetWorkshopModulesResponse> => {
  const { data } = await axiosInstance.get<GetWorkshopModulesResponse>(
    `/api/dashboard/workshops/${workshopId}/modules`,
  );

  return data;
};

export default getWorkshopModules;
