import axiosInstance from "@/lib/axios";
import { APIResponse } from "@/types/api.types";

export interface ToggleModuleProgressResponse {
  module_id: string;
  is_completed: boolean;
  completed_at: string | null;
}

export async function toggleModuleProgress(
  moduleId: string,
): Promise<APIResponse<ToggleModuleProgressResponse>> {
  const { data } = await axiosInstance.patch<
    APIResponse<ToggleModuleProgressResponse>
  >(`/api/workshops/modules/${moduleId}/toggle-progress`);
  return data;
}
