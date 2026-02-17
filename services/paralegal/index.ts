import axiosInstance from "@/lib/axios";
import { APIResponse } from "@/types/api.types";
import { Paralegal } from "@/types/paralegal.types";

export async function getParalegals(): Promise<APIResponse<Paralegal[]>> {
  const { data } = await axiosInstance.get<APIResponse<Paralegal[]>>(
    "/api/paralegal/get",
  );
  return data;
}
