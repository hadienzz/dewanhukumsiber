"use client";

import { useQuery } from "@tanstack/react-query";
import getWorkshopDetail from "@/services/workshop/get-workshop-detail";

const useGetWorkshopDetail = (workshopId: string | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ["workshop-detail", workshopId],
    enabled: !!workshopId,
    queryFn: () => getWorkshopDetail(workshopId as string),
  });

  const workshopNotFound = !isLoading && !data?.data;

  return {
    workshop: data?.data,
    isLoading,
    workshopNotFound,
  };
};
export default useGetWorkshopDetail;
