"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCalculatorCredit } from "@/services/calculator";
import { toast } from "sonner";

export const useCalculatorCreditMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (calculatorType: string) => useCalculatorCredit(calculatorType),
    onSuccess: (data) => {
      // Invalidate wallet and transaction queries
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["wallet", "transactions"] });
      toast.success(
        `Berhasil! ${data.data?.credit_used} kredit digunakan. Sisa saldo: ${data.data?.balance_after} kredit.`,
      );
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Gagal menggunakan kredit kalkulator";
      toast.error(message);
    },
  });
};

export default useCalculatorCreditMutation;
