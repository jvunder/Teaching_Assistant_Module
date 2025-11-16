import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../auth.service';

// Mock the API module
vi.mock('../api', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set environment to test mode (will use mock)
    vi.stubEnv('DEV', true);
  });

  describe('login', () => {
    it('should successfully login with valid credentials in development mode', async () => {
      const email = 'admin@example.com';
      const password = 'admin123';

      const response = await authService.login(email, password);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty('accessToken');
      expect(response.data).toHaveProperty('refreshToken');
      expect(response.data).toHaveProperty('user');
      expect(response.data.user).toHaveProperty('email', email);
      expect(response.data.user).toHaveProperty('fullName');
      expect(response.data.user).toHaveProperty('role');
      expect(response.data.user).toHaveProperty('avatarUrl');
    });

    it('should fail login with invalid credentials', async () => {
      const email = 'wrong@example.com';
      const password = 'short'; // Less than 6 characters will fail

      await expect(authService.login(email, password)).rejects.toThrow();
    });

    it('should return user with default avatarUrl if not provided', async () => {
      const email = 'admin@example.com';
      const password = 'admin123';

      const response = await authService.login(email, password);

      expect(response.data.user.avatarUrl).toBeDefined();
      expect(typeof response.data.user.avatarUrl).toBe('string');
    });

    it('should handle empty email', async () => {
      const email = '';
      const password = 'admin123';

      await expect(authService.login(email, password)).rejects.toThrow();
    });

    it('should handle empty password', async () => {
      const email = 'admin@example.com';
      const password = '';

      await expect(authService.login(email, password)).rejects.toThrow();
    });
  });

  describe('logout', () => {
    it('should call logout endpoint', async () => {
      const { api } = await import('../api');

      await authService.logout();

      expect(api.post).toHaveBeenCalledWith('/auth/logout');
    });
  });

  describe('refreshToken', () => {
    it('should call refresh endpoint with token', async () => {
      const { api } = await import('../api');
      const refreshToken = 'test-refresh-token';

      vi.mocked(api.post).mockResolvedValueOnce({
        data: {
          accessToken: 'new-access-token',
          refreshToken: 'new-refresh-token'
        }
      });

      const result = await authService.refreshToken(refreshToken);

      expect(api.post).toHaveBeenCalledWith('/auth/refresh', { refreshToken });
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });
  });
});
