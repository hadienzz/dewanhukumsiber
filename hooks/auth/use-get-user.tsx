"use client";

import { useQuery } from "@tanstack/react-query";

import getCurrentUser from "@/services/auth/me";

export const useGetUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const hasLoggedin = !isLoading && data;

  return {
    data: data,
    isLoading,
    hasLoggedin,
  };
};

export default useGetUser;
