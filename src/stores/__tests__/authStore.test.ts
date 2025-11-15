import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '../authStore';
import { authService } from '@/services/auth.service';

// Mock auth service
vi.mock('@/services/auth.service', () => ({
  authService: {
    login: vi.fn(),
    logout: vi.fn(),
    refreshToken: vi.fn(),
  },
}));

describe('authStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const store = useAuthStore.getState();
    store.logout();
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have null user and accessToken initially', () => {
      const state = useAuthStore.getState();

      expect(state.user).toBeNull();
      expect(state.accessToken).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('login', () => {
    it('should successfully login and store user data', async () => {
      const mockResponse = {
        data: {
          accessToken: 'test-access-token',
          refreshToken: 'test-refresh-token',
          user: {
            id: '1',
            email: 'test@example.com',
            fullName: 'Test User',
            role: 'assistant',
            avatarUrl: '',
          },
        },
      };

      vi.mocked(authService.login).mockResolvedValueOnce(mockResponse as any);

      const store = useAuthStore.getState();
      await store.login('test@example.com', 'password123', true);

      const newState = useAuthStore.getState();
      expect(newState.user).toEqual(mockResponse.data.user);
      expect(newState.accessToken).toBe('test-access-token');
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBeNull();
    });

    it('should store tokens in localStorage when rememberMe is true', async () => {
      const mockResponse = {
        data: {
          accessToken: 'test-access-token',
          refreshToken: 'test-refresh-token',
          user: {
            id: '1',
            email: 'test@example.com',
            fullName: 'Test User',
            role: 'assistant',
            avatarUrl: '',
          },
        },
      };

      vi.mocked(authService.login).mockResolvedValueOnce(mockResponse as any);

      const store = useAuthStore.getState();
      await store.login('test@example.com', 'password123', true);

      expect(localStorage.getItem('access_token')).toBe('test-access-token');
      expect(localStorage.getItem('refresh_token')).toBe('test-refresh-token');
    });

    it('should store tokens in sessionStorage when rememberMe is false', async () => {
      const mockResponse = {
        data: {
          accessToken: 'test-access-token',
          refreshToken: 'test-refresh-token',
          user: {
            id: '1',
            email: 'test@example.com',
            fullName: 'Test User',
            role: 'assistant',
            avatarUrl: '',
          },
        },
      };

      vi.mocked(authService.login).mockResolvedValueOnce(mockResponse as any);

      const store = useAuthStore.getState();
      await store.login('test@example.com', 'password123', false);

      expect(sessionStorage.getItem('access_token')).toBe('test-access-token');
      expect(sessionStorage.getItem('refresh_token')).toBe('test-refresh-token');
    });

    it('should set loading state during login', async () => {
      const mockResponse = {
        data: {
          accessToken: 'test-access-token',
          refreshToken: 'test-refresh-token',
          user: {
            id: '1',
            email: 'test@example.com',
            fullName: 'Test User',
            role: 'assistant',
            avatarUrl: '',
          },
        },
      };

      let isLoadingDuringCall = false;

      vi.mocked(authService.login).mockImplementationOnce(async () => {
        // Check loading state during the call
        isLoadingDuringCall = useAuthStore.getState().isLoading;
        return mockResponse as any;
      });

      const store = useAuthStore.getState();
      await store.login('test@example.com', 'password123');

      expect(isLoadingDuringCall).toBe(true);
      expect(useAuthStore.getState().isLoading).toBe(false);
    });

    it('should handle login error', async () => {
      const errorMessage = 'Email hoặc mật khẩu không đúng';
      vi.mocked(authService.login).mockRejectedValueOnce(new Error(errorMessage));

      const store = useAuthStore.getState();

      await expect(
        store.login('wrong@example.com', 'wrongpassword')
      ).rejects.toThrow();

      const newState = useAuthStore.getState();
      expect(newState.error).toBe(errorMessage);
      expect(newState.isLoading).toBe(false);
      expect(newState.user).toBeNull();
    });

    it('should handle axios error response', async () => {
      const axiosError = {
        response: {
          data: {
            error: {
              message: 'Invalid credentials'
            }
          }
        }
      };

      vi.mocked(authService.login).mockRejectedValueOnce(axiosError);

      const store = useAuthStore.getState();

      await expect(
        store.login('wrong@example.com', 'wrongpassword')
      ).rejects.toThrow();

      const newState = useAuthStore.getState();
      expect(newState.error).toBe('Invalid credentials');
      expect(newState.isLoading).toBe(false);
    });
  });

  describe('logout', () => {
    it('should clear user data and tokens', async () => {
      // First login
      const mockResponse = {
        data: {
          accessToken: 'test-access-token',
          refreshToken: 'test-refresh-token',
          user: {
            id: '1',
            email: 'test@example.com',
            fullName: 'Test User',
            role: 'assistant',
            avatarUrl: '',
          },
        },
      };

      vi.mocked(authService.login).mockResolvedValueOnce(mockResponse as any);

      const store = useAuthStore.getState();
      await store.login('test@example.com', 'password123', true);

      // Then logout
      store.logout();

      const newState = useAuthStore.getState();
      expect(newState.user).toBeNull();
      expect(newState.accessToken).toBeNull();
      expect(newState.error).toBeNull();
    });

    it('should clear localStorage and sessionStorage', async () => {
      // Set some data
      localStorage.setItem('access_token', 'test-token');
      sessionStorage.setItem('access_token', 'test-token');

      const store = useAuthStore.getState();
      store.logout();

      expect(localStorage.getItem('access_token')).toBeNull();
      expect(sessionStorage.getItem('access_token')).toBeNull();
    });
  });
});
