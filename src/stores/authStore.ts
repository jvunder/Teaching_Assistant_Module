import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/services/auth.service';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  avatarUrl: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoading: false,
      error: null,

      login: async (email, password, rememberMe = false) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.login(email, password);
          const { accessToken, refreshToken, user } = response.data;

          // Store tokens
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem('access_token', accessToken);
          storage.setItem('refresh_token', refreshToken);

          set({
            user,
            accessToken,
            isLoading: false,
          });
        } catch (error: any) {
          // Handle both axios errors and regular errors (from mock service)
          const errorMessage = 
            error?.response?.data?.error?.message || 
            error?.message || 
            'Đăng nhập thất bại. Vui lòng thử lại.';
          
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        localStorage.clear();
        sessionStorage.clear();
        set({
          user: null,
          accessToken: null,
          error: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);

