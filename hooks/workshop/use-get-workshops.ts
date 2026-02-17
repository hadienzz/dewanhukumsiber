"use client";

import { useQuery } from "@tanstack/react-query";
import { getWorkshopsRequest } from "@/services/workshop/get-workshops";

export const useGetWorkshops = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["workshops"],
    queryFn: () => getWorkshopsRequest(),
  });

  return {
    workshops: data?.data ?? [],
    isLoading,
    isError,
  };
};
