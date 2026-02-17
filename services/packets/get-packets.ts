import axiosInstance from "@/lib/axios";
import { CreditPackage } from "@/types/types";

export interface GetPackageResponse {
  status: string;
  message: string;
  data?: CreditPackage[];
}

const getPackets = async () => {
  const { data } = await axiosInstance.get<GetPackageResponse>("/api/packets/get");
  return data;
};

export default getPackets
