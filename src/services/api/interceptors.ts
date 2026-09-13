import { AxiosError } from "axios";
import { apiClient } from "./axios";
import { storage } from "@shared/lib/storage";
import { STORAGE_KEYS } from "@shared/constants/storage-keys";
import type { ApiError } from "@shared/types/api";


let onUnauthorized: (() => void) | null = null;

export function registerUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

export function setupInterceptors() {
  apiClient.interceptors.request.use((config) => {
    const token = storage.get<string | null>(STORAGE_KEYS.AUTH_TOKEN, null);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string }>) => {
      const status = error.response?.status;

      if (status === 401) {
        storage.remove(STORAGE_KEYS.AUTH_TOKEN);
        storage.remove(STORAGE_KEYS.AUTH_USER);
        onUnauthorized?.();
      }

      const normalized: ApiError = {
        message:
          error.response?.data?.message ??
          error.message ??
          "Something went wrong. Please try again.",
        status,
      };

      return Promise.reject(normalized);
    },
  );
}
