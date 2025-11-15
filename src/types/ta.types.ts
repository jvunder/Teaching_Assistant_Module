/**
 * Teaching Assistant (TA) Types
 *
 * Core types for authentication and user management
 */

// ===== USER TYPES =====

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'teacher' | 'assistant' | 'admin';
  avatarUrl?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ===== AUTH REQUEST/RESPONSE TYPES =====

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
  message?: string;
}

export interface TokenResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message?: string;
}

export interface UserResponse {
  success: boolean;
  data: User;
  message?: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}

// ===== API ERROR TYPES =====

export interface ApiError {
  success: false;
  error: string;
  message: string;
  statusCode?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
