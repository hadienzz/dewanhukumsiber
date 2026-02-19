import axiosInstance from "@/lib/axios";
import { APIResponse } from "@/types/api.types";
import { Keanggotaan } from "@/types/keanggotaan.types";

export async function getKeanggotaan(): Promise<APIResponse<Keanggotaan[]>> {
  const { data } = await axiosInstance.get<APIResponse<Keanggotaan[]>>(
    "/api/keanggotaan/get",
  );
  return data;
}

export async function createKeanggotaan(
  formData: FormData,
): Promise<APIResponse<Keanggotaan>> {
  const { data } = await axiosInstance.post<APIResponse<Keanggotaan>>(
    "/api/keanggotaan/create",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data;
}

export async function updateKeanggotaan(
  id: string,
  formData: FormData,
): Promise<APIResponse<Keanggotaan>> {
  const { data } = await axiosInstance.put<APIResponse<Keanggotaan>>(
    `/api/keanggotaan/${id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data;
}

export async function deleteKeanggotaan(
  id: string,
): Promise<APIResponse<void>> {
  const { data } = await axiosInstance.delete<APIResponse<void>>(
    `/api/keanggotaan/${id}`,
  );
  return data;
}
