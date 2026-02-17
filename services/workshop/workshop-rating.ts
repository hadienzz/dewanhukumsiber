import axiosInstance from "@/lib/axios";

export interface WorkshopRatingUser {
  id: string;
  username: string;
  avatar_url: string | null;
}

export interface WorkshopRatingItem {
  id: string;
  rating: number;
  review: string | null;
  created_at: string;
  updated_at: string | null;
  user: WorkshopRatingUser;
}

export interface WorkshopRatingsResponse {
  status: string;
  message: string;
  data: {
    ratings: WorkshopRatingItem[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    average_rating: number;
    total_ratings: number;
    user_rating: {
      id: string;
      rating: number;
      review: string | null;
      created_at: string;
      updated_at: string | null;
    } | null;
  };
}

export const getWorkshopRatings = async (
  workshopId: string,
  page: number = 1,
  limit: number = 5,
): Promise<WorkshopRatingsResponse> => {
  const { data } = await axiosInstance.get<WorkshopRatingsResponse>(
    `/api/workshops/${workshopId}/ratings`,
    { params: { page, limit } },
  );
  return data;
};

export interface SubmitRatingPayload {
  workshop_id: string;
  rating: number;
  review?: string;
}

export const submitWorkshopRating = async (payload: SubmitRatingPayload) => {
  const { data } = await axiosInstance.post("/api/workshops/ratings", payload);
  return data;
};
