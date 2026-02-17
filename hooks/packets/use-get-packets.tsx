import getPackets from "@/services/packets/get-packets";
import { useQuery } from "@tanstack/react-query";

const useGetPackets = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getPackets,
    queryKey: ["packets"],
    staleTime: 60 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    isError,
  };
};

export default useGetPackets;
