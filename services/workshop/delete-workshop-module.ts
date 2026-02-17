import axiosInstance from "@/lib/axios";

export interface DeleteWorkshopModuleResponse {
  status: string;
  message: string;
}

const deleteWorkshopModule = async (
  workshopId: string,
  moduleId: string,
): Promise<DeleteWorkshopModuleResponse> => {
  const { data } = await axiosInstance.delete<DeleteWorkshopModuleResponse>(
    `/api/dashboard/workshops/${workshopId}/modules/${moduleId}`,
  );

  return data;
};

export default deleteWorkshopModule;
