import { AxiosError } from "axios";

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data as ApiErrorResponse;
    if (data.message) return data.message;
    if (data.error) return data.error;
  }
  return fallback;
}
