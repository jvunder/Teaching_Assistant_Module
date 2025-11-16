/**
 * Authentication Service
 *
 * Handles all authentication-related API calls including:
 * - Login/Logout
 * - Token refresh
 * - User profile retrieval
 * - Password management
 */

import { api } from './api';
import type {
  AuthResponse,
  TokenResponse,
  UserResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from '../types';

// Use mock data in development if API is not available
const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === 'true';

/**
 * Authenticates a user with email and password
 *
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise resolving to authentication response with tokens and user data
 * @throws Error if authentication fails
 *
 * @example
 * ```ts
 * const response = await authService.login('teacher@example.com', 'password123');
 * localStorage.setItem('access_token', response.data.accessToken);
 * ```
 */
async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    if (USE_MOCK) {
      const { mockDataService } = await import('./mockData.service');
      const result = await mockDataService.login(email, password);
      return {
        ...result,
        data: {
          ...result.data,
          user: {
            ...result.data.user,
            avatarUrl: result.data.user.avatarUrl || '',
          },
        },
      } as AuthResponse;
    }

    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });

    // Store tokens
    if (data.success && data.data.accessToken) {
      localStorage.setItem('access_token', data.data.accessToken);
      localStorage.setItem('refresh_token', data.data.refreshToken);
    }

    return data;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
}

/**
 * Logs out the current user and clears session data
 *
 * @returns Promise resolving when logout is complete
 * @throws Error if logout fails
 *
 * @example
 * ```ts
 * await authService.logout();
 * // User is logged out, tokens are cleared
 * ```
 */
async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } catch (error: any) {
    console.error('Logout error:', error);
    // Continue with local cleanup even if API call fails
  } finally {
    // Clear local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.clear();
  }
}

/**
 * Refreshes the access token using the refresh token
 *
 * @returns Promise resolving to new token pair
 * @throws Error if token refresh fails
 *
 * @example
 * ```ts
 * const response = await authService.refreshToken();
 * localStorage.setItem('access_token', response.data.accessToken);
 * ```
 */
async function refreshToken(): Promise<TokenResponse> {
  try {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const { data } = await api.post<TokenResponse>('/auth/refresh', {
      refreshToken,
    });

    // Update stored tokens
    if (data.success && data.data.accessToken) {
      localStorage.setItem('access_token', data.data.accessToken);
      localStorage.setItem('refresh_token', data.data.refreshToken);
    }

    return data;
  } catch (error: any) {
    console.error('Token refresh error:', error);
    // Clear tokens and redirect to login
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    throw new Error(error.response?.data?.message || 'Token refresh failed');
  }
}

/**
 * Gets the current authenticated user's profile
 *
 * @returns Promise resolving to user profile data
 * @throws Error if request fails or user is not authenticated
 *
 * @example
 * ```ts
 * const response = await authService.getCurrentUser();
 * console.log('Current user:', response.data.fullName);
 * ```
 */
async function getCurrentUser(): Promise<UserResponse> {
  try {
    if (USE_MOCK) {
      const { mockDataService } = await import('./mockData.service');
      return mockDataService.getCurrentUser();
    }

    const { data } = await api.get<UserResponse>('/auth/me');
    return data;
  } catch (error: any) {
    console.error('Get current user error:', error);
    throw new Error(error.response?.data?.message || 'Failed to get user profile');
  }
}

/**
 * Updates the current user's password
 *
 * @param oldPassword - Current password for verification
 * @param newPassword - New password to set
 * @returns Promise resolving to update confirmation
 * @throws Error if password update fails
 *
 * @example
 * ```ts
 * await authService.updatePassword('oldPass123', 'newSecurePass456');
 * ```
 */
async function updatePassword(
  oldPassword: string,
  newPassword: string
): Promise<UpdatePasswordResponse> {
  try {
    const requestData: UpdatePasswordRequest = {
      oldPassword,
      newPassword,
    };

    const { data } = await api.put<UpdatePasswordResponse>('/auth/password', requestData);

    return data;
  } catch (error: any) {
    console.error('Update password error:', error);
    throw new Error(error.response?.data?.message || 'Failed to update password');
  }
}

/**
 * Checks if user is currently authenticated
 *
 * @returns Boolean indicating if user has a valid access token
 */
function isAuthenticated(): boolean {
  const token = localStorage.getItem('access_token');
  return !!token;
}

/**
 * Gets the stored access token
 *
 * @returns The access token or null if not found
 */
function getAccessToken(): string | null {
  return localStorage.getItem('access_token');
}

// Export service object with all methods
export const authService = {
  login,
  logout,
  refreshToken,
  getCurrentUser,
  updatePassword,
  isAuthenticated,
  getAccessToken,
};

export default authService;
