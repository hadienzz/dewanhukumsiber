"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyWallet } from "@/services/wallet";

export const useWallet = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["wallet"],
    queryFn: getMyWallet,
    staleTime: 30 * 1000,
    retry: false,
  });

  return {
    wallet: data?.data,
    isLoading,
    activeBalance: data?.data?.active_balance ?? 0,
  };
};

export default useWallet;
