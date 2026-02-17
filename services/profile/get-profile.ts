import axiosInstance from "@/lib/axios";

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  phone: string | null;
  role: "admin" | "user";
  bio: string | null;
  avatar_url: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  postal_code: string | null;
  occupation: string | null;
  institution: string | null;
  date_of_birth: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface ProfileResponse {
  status: string;
  message: string;
  data?: { profile: UserProfile };
}

export async function getProfile(): Promise<UserProfile | null> {
  const { data } = await axiosInstance.get<ProfileResponse>("/api/profile");
  return data.data?.profile ?? null;
}

export default getProfile;
