import axios, { AxiosError } from "axios";

export type ErrorResponseShape = {
  status?: string;
  message?: string;
  errors?: unknown;
};

export function getErrorMessage(
  error: unknown,
  fallbackMessage = "Terjadi kesalahan. Silakan coba lagi."
): string {
  if (axios.isAxiosError<ErrorResponseShape>(error)) {
    const apiMessage = error.response?.data?.message;

    if (apiMessage) {
      return apiMessage;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}
