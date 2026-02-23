import axios from "axios";
import { API_ENDPOINTS } from "@/config/endpoints";
import type { SignInResponse } from "@/types/auth";
import api from "./api";

export const authService = {
  signIn: async (username: string, password: string): Promise<SignInResponse> => {
    const authHeader = "Basic " + btoa(`${username}:${password}`);
    const response = await axios.post<SignInResponse>(
      API_ENDPOINTS.auth.signIn,
      {},
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  },

  refreshToken: async (): Promise<string> => {
    const response = await axios.post<SignInResponse>(
      API_ENDPOINTS.auth.refreshToken,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data.access_token;
  },

  logout: async (): Promise<void> => {
    await api.post(API_ENDPOINTS.auth.logout);
  },
};
