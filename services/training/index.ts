import axiosInstance from "@/lib/axios";
import {
  APIResponse,
  Training,
  TrainingModule,
  LiveSession,
  UserTraining,
  TrainingType,
  TrainingStatus,
  ModuleProgress,
} from "@/types/api.types";

// ==================
// PUBLIC APIs
// ==================

export interface GetTrainingsParams {
  page?: number;
  limit?: number;
  type?: TrainingType;
  search?: string;
}

export async function getPublishedTrainings(
  params?: GetTrainingsParams,
): Promise<APIResponse<Training[]>> {
  const { data } = await axiosInstance.get<APIResponse<Training[]>>(
    "/api/trainings",
    { params },
  );
  return data;
}

export async function getTrainingDetail(
  id: string,
): Promise<APIResponse<{ training: Training }>> {
  const { data } = await axiosInstance.get<APIResponse<{ training: Training }>>(
    `/api/trainings/${id}`,
  );
  return data;
}

export async function getUpcomingLiveSessions(
  limit?: number,
): Promise<APIResponse<{ sessions: LiveSession[] }>> {
  const { data } = await axiosInstance.get<
    APIResponse<{ sessions: LiveSession[] }>
  >("/api/trainings/live/upcoming", { params: { limit } });
  return data;
}

// ==================
// MEMBER APIs
// ==================

export async function getMyTrainings(): Promise<
  APIResponse<{ trainings: UserTraining[] }>
> {
  const { data } = await axiosInstance.get<
    APIResponse<{ trainings: UserTraining[] }>
  >("/api/trainings/my/trainings");
  return data;
}

export async function startTraining(
  trainingId: string,
): Promise<APIResponse<{ user_training: UserTraining }>> {
  const { data } = await axiosInstance.post<
    APIResponse<{ user_training: UserTraining }>
  >(`/api/trainings/${trainingId}/start`);
  return data;
}

export async function getTrainingProgress(
  trainingId: string,
): Promise<
  APIResponse<{ progress: UserTraining & { modules: TrainingModule[] } }>
> {
  const { data } = await axiosInstance.get<
    APIResponse<{ progress: UserTraining & { modules: TrainingModule[] } }>
  >(`/api/trainings/${trainingId}/progress`);
  return data;
}

export interface UpdateProgressPayload {
  watch_time?: number;
  last_position?: number;
  is_completed?: boolean;
}

export async function updateModuleProgress(
  moduleId: string,
  payload: UpdateProgressPayload,
): Promise<APIResponse<{ progress: ModuleProgress }>> {
  const { data } = await axiosInstance.patch<
    APIResponse<{ progress: ModuleProgress }>
  >(`/api/trainings/modules/${moduleId}/progress`, payload);
  return data;
}

export async function getLiveSessionZoomLink(
  sessionId: string,
): Promise<
  APIResponse<{ zoom_link: string; title: string; scheduled_at: string }>
> {
  const { data } = await axiosInstance.get<
    APIResponse<{ zoom_link: string; title: string; scheduled_at: string }>
  >(`/api/trainings/live/${sessionId}/join`);
  return data;
}

// ==================
// ADMIN APIs
// ==================

export interface GetAllTrainingsParams extends GetTrainingsParams {
  status?: TrainingStatus;
}

export async function getAllTrainings(
  params?: GetAllTrainingsParams,
): Promise<APIResponse<Training[]>> {
  const { data } = await axiosInstance.get<APIResponse<Training[]>>(
    "/api/trainings/admin/all",
    { params },
  );
  return data;
}

export async function getTrainingByIdAdmin(
  id: string,
): Promise<APIResponse<{ training: Training }>> {
  const { data } = await axiosInstance.get<APIResponse<{ training: Training }>>(
    `/api/trainings/admin/${id}`,
  );
  return data;
}

export interface CreateTrainingPayload {
  title: string;
  description: string;
  short_description: string;
  thumbnail: string;
  benefits?: string[];
  category: string;
  level: string;
  // training_type: TrainingType;
  // required_plan_id?: string;
  // video_urls?: string[];
  // zoom_link?: string;
  // scheduled_at?: string;
  // duration_minutes?: number;
  // whatsapp_link?: string;
  // discussion_schedule?: string;
}

export async function createTraining(
  payload: CreateTrainingPayload,
): Promise<APIResponse<{ training: Training }>> {
  const { data } = await axiosInstance.post<
    APIResponse<{ training: Training }>
  >("/api/trainings/admin", payload);
  console.log("Created training:", data);
  return data;
}

export async function updateTraining(
  id: string,
  payload: Partial<CreateTrainingPayload & { status: TrainingStatus }>,
): Promise<APIResponse<{ training: Training }>> {
  const { data } = await axiosInstance.patch<
    APIResponse<{ training: Training }>
  >(`/api/trainings/admin/${id}`, payload);
  return data;
}

export async function publishTraining(
  id: string,
): Promise<APIResponse<{ training: Training }>> {
  const { data } = await axiosInstance.post<
    APIResponse<{ training: Training }>
  >(`/api/trainings/admin/${id}/publish`);
  return data;
}

export async function archiveTraining(
  id: string,
): Promise<APIResponse<{ training: Training }>> {
  const { data } = await axiosInstance.post<
    APIResponse<{ training: Training }>
  >(`/api/trainings/admin/${id}/archive`);
  return data;
}

export async function deleteTraining(id: string): Promise<APIResponse<null>> {
  const { data } = await axiosInstance.delete<APIResponse<null>>(
    `/api/trainings/admin/${id}`,
  );
  return data;
}

// Module APIs
export interface CreateModulePayload {
  title: string;
  description?: string;
  video_url?: string;
  duration?: number;
  order: number;
}

export async function createModule(
  trainingId: string,
  payload: CreateModulePayload,
): Promise<APIResponse<{ module: TrainingModule }>> {
  const { data } = await axiosInstance.post<
    APIResponse<{ module: TrainingModule }>
  >(`/api/trainings/admin/${trainingId}/modules`, payload);
  return data;
}

export async function updateModule(
  moduleId: string,
  payload: Partial<CreateModulePayload>,
): Promise<APIResponse<{ module: TrainingModule }>> {
  const { data } = await axiosInstance.patch<
    APIResponse<{ module: TrainingModule }>
  >(`/api/trainings/admin/modules/${moduleId}`, payload);
  return data;
}

export async function deleteModule(
  moduleId: string,
): Promise<APIResponse<null>> {
  const { data } = await axiosInstance.delete<APIResponse<null>>(
    `/api/trainings/admin/modules/${moduleId}`,
  );
  return data;
}

export async function reorderModules(
  trainingId: string,
  orders: { id: string; order: number }[],
): Promise<APIResponse<null>> {
  const { data } = await axiosInstance.put<APIResponse<null>>(
    `/api/trainings/admin/${trainingId}/modules/reorder`,
    { orders },
  );
  return data;
}

// Live Session APIs
export interface CreateLiveSessionPayload {
  title: string;
  description?: string;
  zoom_link: string;
  scheduled_at: string;
  duration_minutes: number;
}

export async function createLiveSession(
  trainingId: string,
  payload: CreateLiveSessionPayload,
): Promise<APIResponse<{ session: LiveSession }>> {
  const { data } = await axiosInstance.post<
    APIResponse<{ session: LiveSession }>
  >(`/api/trainings/admin/${trainingId}/live-sessions`, payload);
  return data;
}

export async function updateLiveSession(
  sessionId: string,
  payload: Partial<CreateLiveSessionPayload>,
): Promise<APIResponse<{ session: LiveSession }>> {
  const { data } = await axiosInstance.patch<
    APIResponse<{ session: LiveSession }>
  >(`/api/trainings/admin/live-sessions/${sessionId}`, payload);
  return data;
}

export async function deleteLiveSession(
  sessionId: string,
): Promise<APIResponse<null>> {
  const { data } = await axiosInstance.delete<APIResponse<null>>(
    `/api/trainings/admin/live-sessions/${sessionId}`,
  );
  return data;
}
