import { api } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
      avatarUrl: string;
    };
  };
}

// Use mock data in development if API is not available
const USE_MOCK = import.meta.env.DEV || import.meta.env.MODE === 'development';

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
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
      } as LoginResponse;
    }
    
    const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async refreshToken(refreshToken: string) {
    const { data } = await api.post('/auth/refresh', { refreshToken });
    return data;
  },
};

