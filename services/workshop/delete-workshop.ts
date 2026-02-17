import axiosInstance from "@/lib/axios";

export interface DeleteWorkshopResponse {
  status: string;
  message: string;
}

const deleteWorkshop = async (workshopId: string): Promise<DeleteWorkshopResponse> => {
  const { data } = await axiosInstance.delete<DeleteWorkshopResponse>(
    `/api/workshops/${workshopId}/delete`,
  );

  return data;
};

export default deleteWorkshop;
