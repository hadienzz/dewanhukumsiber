import axiosInstance from "@/lib/axios";
import { ModuleType } from "@/types/course-module";

export interface WorkshopModuleDetailResponse {
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

export interface GetWorkshopDetailResponse {
  status: string;
  message: string;
  data?: {
    id: string;
    title: string;
    short_description: string;
    description: string;
    category: string;
    thumbnail: string;
    price: number;
    credit_price: number;
    benefits: string[];
    created_at: string;
    updated_at: string;
    modules: WorkshopModuleDetailResponse[];
    is_owned?: boolean;
  };
}

const getWorkshopDetail = async (
  id: string,
): Promise<GetWorkshopDetailResponse> => {
  const { data } = await axiosInstance.get<GetWorkshopDetailResponse>(
    `/api/workshops/detail/${id}`,
  );

  return data;
};

export default getWorkshopDetail;
