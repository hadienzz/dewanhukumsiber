"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyWorkshopWithCredits } from "@/services/workshop/buy-workshop-credits";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useBuyWorkshopCredits = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (workshopId: string) => buyWorkshopWithCredits(workshopId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["wallet", "transactions"] });
      queryClient.invalidateQueries({ queryKey: ["my-workshops"] });
      queryClient.invalidateQueries({ queryKey: ["workshop-detail"] });
      toast.success(
        `Workshop "${data.data?.workshop_title}" berhasil dibeli! ${data.data?.credit_used} kredit digunakan.`,
      );
      router.push("/kelas");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Gagal membeli workshop";
      toast.error(message);
    },
  });
};

export default useBuyWorkshopCredits;
