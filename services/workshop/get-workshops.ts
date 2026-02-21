import axiosInstance from "@/lib/axios";

export interface WorkshopModuleSummary {
  id: string;
  title: string;
  schedule_at: string;
  type: string;
  order: number;
}

export interface WorkshopSummary {
  id: string;
  title: string;
  short_description: string | null;
  description: string | null;
  category: string | null;
  thumbnail: string | null;
  price: number;
  credit_price: number;
  benefits: string[];
  created_at: string;
  participant_count: number;
  avg_rating: number;
  rating_count: number;
  module_count: number;
  start_date: string | null;
  modules: WorkshopModuleSummary[];
}

export interface GetWorkshopsResponse {
  data: WorkshopSummary[];
}

export const getWorkshopsRequest = async () => {
  const response =
    await axiosInstance.get<GetWorkshopsResponse>("/api/workshops");
  return response.data;
};
