import axiosInstance from "@/lib/axios";
import { APIResponse } from "@/types/api.types";
import { PesertaPelatihan } from "@/types/peserta-pelatihan.types";

export async function getPesertaPelatihan(): Promise<
  APIResponse<PesertaPelatihan[]>
> {
  const { data } = await axiosInstance.get<APIResponse<PesertaPelatihan[]>>(
    "/api/peserta-pelatihan/get",
  );
  return data;
}

export async function getPesertaPelatihanPaginated(
  page: number,
  limit: number,
): Promise<APIResponse<PesertaPelatihan[]>> {
  const { data } = await axiosInstance.get<APIResponse<PesertaPelatihan[]>>(
    `/api/peserta-pelatihan/get?page=${page}&limit=${limit}`,
  );
  return data;
}

export async function createPesertaPelatihan(
  body: {
    nama_lengkap: string;
    email: string;
    nama_pelatihan: string;
  },
): Promise<APIResponse<PesertaPelatihan>> {
  const { data } = await axiosInstance.post<APIResponse<PesertaPelatihan>>(
    "/api/peserta-pelatihan/create",
    body,
  );
  return data;
}

export async function deletePesertaPelatihan(
  id: string,
): Promise<APIResponse<void>> {
  const { data } = await axiosInstance.delete<APIResponse<void>>(
    `/api/peserta-pelatihan/${id}`,
  );
  return data;
}
