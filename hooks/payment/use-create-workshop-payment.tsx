"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createWorkshopCheckout,
  WorkshopCheckoutParams,
} from "@/services/workshop/create-workshop-payment";

const useCreateWorkshopPayment = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["workshop-checkout"],
    mutationFn: (params: WorkshopCheckoutParams) =>
      createWorkshopCheckout(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["wallet", "transactions"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Gagal memproses pembayaran workshop.";
      toast.error(message);
    },
  });

  const checkout = async (params: WorkshopCheckoutParams) => {
    const response = await mutateAsync(params);
    const token = response.data?.transaction_token;

    if (!token) {
      toast.error("Gagal mendapatkan token pembayaran.");
      return null;
    }

    return token;
  };

  return {
    checkout,
    isProcessing: isPending,
  };
};

export default useCreateWorkshopPayment;
