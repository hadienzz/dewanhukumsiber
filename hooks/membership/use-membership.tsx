"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getMembershipPlans,
  getMembershipPlanById,
  getMyMembership,
  subscribeMembership,
  cancelSubscription,
  SubscribePayload,
} from "@/services/membership";
import { getErrorMessage } from "@/utils/error";

// ==================
// QUERIES
// ==================

export const useMembershipPlans = () => {
  return useQuery({
    queryKey: ["membership", "plans"],
    queryFn: async () => {
      const response = await getMembershipPlans();
      return response.data?.plans ?? [];
    },
  });
};

export const useMembershipPlan = (id: string) => {
  return useQuery({
    queryKey: ["membership", "plans", id],
    queryFn: async () => {
      const response = await getMembershipPlanById(id);
      return response.data?.plan ?? null;
    },
    enabled: !!id,
  });
};

export const useMyMembership = () => {
  return useQuery({
    queryKey: ["membership", "my"],
    queryFn: async () => {
      const response = await getMyMembership();
      return response.data?.membership ?? null;
    },
  });
};

// ==================
// MUTATIONS
// ==================

export const useSubscribeMembership = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubscribePayload) => subscribeMembership(payload),
    onSuccess: (response) => {
      toast.success(response.message || "Berhasil berlangganan membership");
      queryClient.invalidateQueries({ queryKey: ["membership", "my"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Gagal berlangganan membership"));
    },
  });
};

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscriptionId: string) => cancelSubscription(subscriptionId),
    onSuccess: (response) => {
      toast.success(response.message || "Berhasil membatalkan subscription");
      queryClient.invalidateQueries({ queryKey: ["membership", "my"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Gagal membatalkan subscription"));
    },
  });
};
