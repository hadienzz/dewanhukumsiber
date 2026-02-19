import axiosInstance from "@/lib/axios";
import { APIResponse } from "@/types/api.types";
import { Advokat } from "@/types/advokat.types";

export async function getAdvokat(): Promise<APIResponse<Advokat[]>> {
  const { data } = await axiosInstance.get<APIResponse<Advokat[]>>(
    "/api/advokat/get",
  );
  return data;
}

export async function createAdvokat(
  formData: FormData,
): Promise<APIResponse<Advokat>> {
  const { data } = await axiosInstance.post<APIResponse<Advokat>>(
    "/api/advokat/create",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data;
}

export async function updateAdvokat(
  id: string,
  formData: FormData,
): Promise<APIResponse<Advokat>> {
  const { data } = await axiosInstance.put<APIResponse<Advokat>>(
    `/api/advokat/${id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data;
}

export async function deleteAdvokat(id: string): Promise<APIResponse<void>> {
  const { data } = await axiosInstance.delete<APIResponse<void>>(
    `/api/advokat/${id}`,
  );
  return data;
}
