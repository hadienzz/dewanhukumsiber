"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import createWorkshopPaymentRequest from "@/services/workshop/create-workshop-payment";

const useCreateWorkshopPayment = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["workshop-checkout"],
    mutationFn: (workshopId: string) => createWorkshopPaymentRequest(workshopId),
    onError: () => {
      toast.error("Gagal memproses pembayaran workshop.");
    },
  });

  const checkout = async (workshopId: string) => {
    const response = await mutateAsync(workshopId);
    const redirectUrl = response.data?.redirect_url;

    if (!redirectUrl) {
      toast.error("Gagal mendapatkan URL pembayaran.");
      return null;
    }

    return redirectUrl;
  };

  return {
    checkout,
    isProcessing: isPending,
  };
};

export default useCreateWorkshopPayment;
