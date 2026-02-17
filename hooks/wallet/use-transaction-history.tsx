"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransactionHistory } from "@/services/wallet";

export const useTransactionHistory = () => {
  return useQuery({
    queryKey: ["wallet", "transactions"],
    queryFn: async () => {
      const response = await getTransactionHistory();
      return response.data;
    },
    staleTime: 30 * 1000,
  });
};

export default useTransactionHistory;
