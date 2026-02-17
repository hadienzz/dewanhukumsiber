import axiosInstance from "@/lib/axios";
import type { RegisterUserPayload } from "@/types/types";

export interface RegisterResponse {
	status: string;
	message: string;
}

export async function registerRequest(
	payload: RegisterUserPayload,
): Promise<RegisterResponse> {
	const { data } = await axiosInstance.post<RegisterResponse>(
		"/api/auth/register",
		payload,
	);

	return data;
}

export default registerRequest;

