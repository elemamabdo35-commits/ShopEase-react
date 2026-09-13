import { apiClient } from "@services/api/axios";
import type { LoginCredentials, LoginResponse } from "../types";

export const authApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>("/auth/login", {
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 60,
    });
    return data;
  },
};
