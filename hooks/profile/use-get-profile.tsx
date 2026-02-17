"use client";

import { useQuery } from "@tanstack/react-query";
import getProfile from "@/services/profile/get-profile";

const useGetProfile = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return { data, isLoading, isError, refetch };
};

export default useGetProfile;
