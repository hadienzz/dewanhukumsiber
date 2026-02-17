import axiosInstance from "@/lib/axios";
import type { UserProfile, ProfileResponse } from "./get-profile";

export interface UpdateProfilePayload {
  username?: string;
  phone?: string;
  bio?: string;
  address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  occupation?: string;
  institution?: string;
  date_of_birth?: string;
}

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<UserProfile | null> {
  const { data } = await axiosInstance.patch<ProfileResponse>(
    "/api/profile",
    payload
  );
  return data.data?.profile ?? null;
}

export default updateProfile;
