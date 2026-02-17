"use client";

import { useQuery } from "@tanstack/react-query";
import { getParalegals } from "@/services/paralegal";

export const useParalegals = () => {
  return useQuery({
    queryKey: ["paralegals"],
    queryFn: async () => {
      const response = await getParalegals();
      return response.data ?? [];
    },
    staleTime: 5 * 1000 // 5 minutes
  });
};
