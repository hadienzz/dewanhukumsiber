import axiosInstance from "@/lib/axios";
import { APIResponse, MembershipPlan, UserMembership } from "@/types/api.types";

// ==================
// PUBLIC APIs
// ==================

export interface GetPlansResponse {
  plans: MembershipPlan[];
}

export async function getMembershipPlans(): Promise<APIResponse<GetPlansResponse>> {
  const { data } = await axiosInstance.get<APIResponse<GetPlansResponse>>(
    "/api/membership/plans"
  );
  return data;
}

export async function getMembershipPlanById(
  id: string
): Promise<APIResponse<{ plan: MembershipPlan }>> {
  const { data } = await axiosInstance.get<APIResponse<{ plan: MembershipPlan }>>(
    `/api/membership/plans/${id}`
  );
  return data;
}

// ==================
// MEMBER APIs
// ==================

export async function getMyMembership(): Promise<APIResponse<{ membership: UserMembership | null }>> {
  const { data } = await axiosInstance.get<APIResponse<{ membership: UserMembership | null }>>(
    "/api/membership/my-membership"
  );
  return data;
}

export interface SubscribePayload {
  plan_id: string;
  duration_months?: number;
}

export async function subscribeMembership(
  payload: SubscribePayload
): Promise<APIResponse<{ subscription: UserMembership }>> {
  const { data } = await axiosInstance.post<APIResponse<{ subscription: UserMembership }>>(
    "/api/membership/subscribe",
    payload
  );
  return data;
}

export async function cancelSubscription(
  subscriptionId: string
): Promise<APIResponse<null>> {
  const { data } = await axiosInstance.delete<APIResponse<null>>(
    `/api/membership/subscriptions/${subscriptionId}/cancel`
  );
  return data;
}

// ==================
// ADMIN APIs
// ==================

export interface CreatePlanPayload {
  name: string;
  tier: "basic" | "pro" | "elite";
  price: number;
  description: string;
  features: string[];
  is_popular?: boolean;
}

export async function createMembershipPlan(
  payload: CreatePlanPayload
): Promise<APIResponse<{ plan: MembershipPlan }>> {
  const { data } = await axiosInstance.post<APIResponse<{ plan: MembershipPlan }>>(
    "/api/membership/admin/plans",
    payload
  );
  return data;
}

export async function updateMembershipPlan(
  id: string,
  payload: Partial<CreatePlanPayload>
): Promise<APIResponse<{ plan: MembershipPlan }>> {
  const { data } = await axiosInstance.patch<APIResponse<{ plan: MembershipPlan }>>(
    `/api/membership/admin/plans/${id}`,
    payload
  );
  return data;
}

export async function deleteMembershipPlan(id: string): Promise<APIResponse<null>> {
  const { data } = await axiosInstance.delete<APIResponse<null>>(
    `/api/membership/admin/plans/${id}`
  );
  return data;
}

export interface GetSubscriptionsParams {
  page?: number;
  limit?: number;
  status?: "active" | "expired" | "all";
}

export interface SubscriptionWithUser extends UserMembership {
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export async function getAllSubscriptions(
  params?: GetSubscriptionsParams
): Promise<APIResponse<SubscriptionWithUser[]>> {
  const { data } = await axiosInstance.get<APIResponse<SubscriptionWithUser[]>>(
    "/api/membership/admin/subscriptions",
    { params }
  );
  return data;
}

export async function extendSubscription(
  subscriptionId: string,
  months: number
): Promise<APIResponse<{ subscription: UserMembership }>> {
  const { data } = await axiosInstance.post<APIResponse<{ subscription: UserMembership }>>(
    `/api/membership/admin/subscriptions/${subscriptionId}/extend`,
    { months }
  );
  return data;
}

export async function adminCancelSubscription(
  subscriptionId: string
): Promise<APIResponse<null>> {
  const { data } = await axiosInstance.delete<APIResponse<null>>(
    `/api/membership/admin/subscriptions/${subscriptionId}`
  );
  return data;
}
