import axiosInstance from "@/lib/axios";

export interface LogoutResponse {
	status: string;
	message: string;
}

export async function logoutRequest(): Promise<LogoutResponse> {
	const { data } = await axiosInstance.post<LogoutResponse>(
		"/api/auth/logout",
	);

	return data;
}

export default logoutRequest;

