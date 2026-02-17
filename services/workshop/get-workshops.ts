import axiosInstance from "@/lib/axios";

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
}

export interface GetWorkshopsResponse {
  data: WorkshopSummary[];
}

export const getWorkshopsRequest = async () => {
  const response =
    await axiosInstance.get<GetWorkshopsResponse>("/api/workshops");
  return response.data;
};
