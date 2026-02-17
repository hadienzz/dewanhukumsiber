"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyWorkshops } from "@/services/workshop/get-my-workshops";

export const useGetMyWorkshops = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-workshops"],
    queryFn: async () => {
      const response = await getMyWorkshops();
      return response.data;
    },
    staleTime: 30 * 1000,
  });

  return {
    workshops: data ?? [],
    isLoading,
    isError,
  };
};

export default useGetMyWorkshops;
