"use client";

import { useQuery } from "@tanstack/react-query";
import { getWorkshopContent } from "@/services/workshop/get-workshop-content";

const useGetWorkshopContent = (workshopId: string | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["workshop-content", workshopId],
    enabled: !!workshopId,
    queryFn: () => getWorkshopContent(workshopId as string),
    staleTime: 30 * 1000,
  });

  const workshop = data?.data;

  const totalModules = workshop?.modules.length ?? 0;
  const completedModules =
    workshop?.modules.filter(
      (m) => m.progresses.length > 0 && m.progresses[0].is_completed,
    ).length ?? 0;
  const progressPercentage =
    totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return {
    workshop,
    isLoading,
    isError,
    totalModules,
    completedModules,
    progressPercentage,
  };
};

export default useGetWorkshopContent;
