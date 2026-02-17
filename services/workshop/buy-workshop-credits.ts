import axiosInstance from "@/lib/axios";
import { APIResponse } from "@/types/api.types";

export interface BuyWorkshopCreditsResponse {
  credit_used: number;
  balance_after: number;
  workshop_title: string;
}

export async function buyWorkshopWithCredits(
  workshopId: string,
): Promise<APIResponse<BuyWorkshopCreditsResponse>> {
  const { data } = await axiosInstance.post<
    APIResponse<BuyWorkshopCreditsResponse>
  >("/api/workshops/buy-workshop", {
    workshop_id: workshopId,
  });
  return data;
}
