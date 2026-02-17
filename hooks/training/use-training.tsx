"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getPublishedTrainings,
  getTrainingDetail,
  getUpcomingLiveSessions,
  getMyTrainings,
  startTraining,
  getTrainingProgress,
  updateModuleProgress,
  getLiveSessionZoomLink,
  GetTrainingsParams,
  UpdateProgressPayload,
} from "@/services/training";
import { getErrorMessage } from "@/utils/error";

// ==================
// QUERIES
// ==================

export const usePublishedTrainings = (params?: GetTrainingsParams) => {
  return useQuery({
    queryKey: ["trainings", "published", params],
    queryFn: async () => {
      const response = await getPublishedTrainings(params);
      return {
        trainings: response.data ?? [],
        meta: response.meta,
      };
    },
  });
};

export const useTrainingDetail = (id: string) => {
  return useQuery({
    queryKey: ["trainings", id],
    queryFn: async () => {
      const response = await getTrainingDetail(id);
      return response.data?.training ?? null;
    },
    enabled: !!id,
  });
};

export const useUpcomingLiveSessions = (limit?: number) => {
  return useQuery({
    queryKey: ["trainings", "live", "upcoming", limit],
    queryFn: async () => {
      const response = await getUpcomingLiveSessions(limit);
      return response.data?.sessions ?? [];
    },
  });
};

export const useMyTrainings = () => {
  return useQuery({
    queryKey: ["trainings", "my"],
    queryFn: async () => {
      const response = await getMyTrainings();
      return response.data?.trainings ?? [];
    },
  });
};

export const useTrainingProgress = (trainingId: string) => {
  return useQuery({
    queryKey: ["trainings", trainingId, "progress"],
    queryFn: async () => {
      const response = await getTrainingProgress(trainingId);
      return response.data?.progress ?? null;
    },
    enabled: !!trainingId,
  });
};

// ==================
// MUTATIONS
// ==================

export const useStartTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trainingId: string) => startTraining(trainingId),
    onSuccess: (response, trainingId) => {
      toast.success(response.message || "Berhasil memulai pelatihan");
      queryClient.invalidateQueries({ queryKey: ["trainings", "my"] });
      queryClient.invalidateQueries({ queryKey: ["trainings", trainingId] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Gagal memulai pelatihan"));
    },
  });
};

export const useUpdateModuleProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ moduleId, data }: { moduleId: string; data: UpdateProgressPayload }) =>
      updateModuleProgress(moduleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainings"] });
      toast.success("Progress berhasil disimpan");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Gagal menyimpan progress"));
    },
  });
};

export const useJoinLiveSession = () => {
  return useMutation({
    mutationFn: (sessionId: string) => getLiveSessionZoomLink(sessionId),
    onSuccess: (response) => {
      if (response.data?.zoom_link) {
        window.open(response.data.zoom_link, "_blank");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Gagal mengakses sesi live"));
    },
  });
};

// ==================
// ADMIN HOOKS
// ==================

interface AdminTrainingParams {
  page?: number;
  limit?: number;
  status?: string;
}

export const useAdminTrainings = (params?: AdminTrainingParams) => {
  return useQuery({
    queryKey: ["admin", "trainings", params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.set("page", params.page.toString());
      if (params?.limit) queryParams.set("limit", params.limit.toString());
      if (params?.status) queryParams.set("status", params.status);
      
      const response = await fetch(`/api/trainings/admin?${queryParams.toString()}`);
      const data = await response.json();
      return {
        trainings: data.data?.trainings ?? [],
        total: data.data?.total ?? 0,
        page: data.data?.page ?? 1,
        limit: data.data?.limit ?? 10,
        totalPages: data.data?.totalPages ?? 1,
      };
    },
  });
};

export const usePublishTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (trainingId: string) => {
      const response = await fetch(`/api/trainings/admin/${trainingId}/publish`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to publish");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Training berhasil dipublish");
      queryClient.invalidateQueries({ queryKey: ["admin", "trainings"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Gagal publish training"));
    },
  });
};

export const useDeleteTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (trainingId: string) => {
      const response = await fetch(`/api/trainings/admin/${trainingId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Training berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["admin", "trainings"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Gagal menghapus training"));
    },
  });
};
