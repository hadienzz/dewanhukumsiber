"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getWorkshopRatings,
  submitWorkshopRating,
  SubmitRatingPayload,
} from "@/services/workshop/workshop-rating";
import { toast } from "sonner";

export const useWorkshopRatings = (
  workshopId: string | undefined,
  page: number = 1,
  limit: number = 5,
) => {
  return useQuery({
    queryKey: ["workshop-ratings", workshopId, page, limit],
    queryFn: () => getWorkshopRatings(workshopId as string, page, limit),
    enabled: !!workshopId,
    staleTime: 30 * 1000,
  });
};

export const useSubmitWorkshopRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitRatingPayload) => submitWorkshopRating(payload),
    onSuccess: (_, variables) => {
      toast.success("Rating berhasil disimpan!");
      queryClient.invalidateQueries({
        queryKey: ["workshop-ratings", variables.workshop_id],
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Gagal menyimpan rating";
      toast.error(message);
    },
  });
};
