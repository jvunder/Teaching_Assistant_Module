import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1/ta';

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Retry failed requests
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error);
  },
});

// Request interceptor: Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired → redirect to login
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ========================================
// UPLOAD HELPERS
// ========================================

export type UploadProgressCallback = (progress: number) => void;

/**
 * Create axios config for file upload with progress tracking
 */
export function createUploadConfig(onProgress?: UploadProgressCallback): AxiosRequestConfig {
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 300000, // 5 minutes for large file uploads
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      }
    },
  };
}

/**
 * Upload file with progress tracking
 */
export async function uploadFile<T>(
  endpoint: string,
  file: File,
  additionalData?: Record<string, any>,
  onProgress?: UploadProgressCallback
) {
  const formData = new FormData();
  formData.append('file', file);

  // Add additional data to form
  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
  }

  const config = createUploadConfig(onProgress);
  return api.post<T>(endpoint, formData, config);
}

/**
 * Upload multiple files with progress tracking
 */
export async function uploadMultipleFiles<T>(
  endpoint: string,
  files: File[],
  additionalData?: Record<string, any>,
  onProgress?: UploadProgressCallback
) {
  const formData = new FormData();

  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });

  // Add additional data to form
  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
  }

  const config = createUploadConfig(onProgress);
  return api.post<T>(endpoint, formData, config);
}

