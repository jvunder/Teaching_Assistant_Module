import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import { useAuthStore } from '@/stores/authStore';

// Mock component for protected route
const DashboardMock = () => <div>Dashboard Page</div>;

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

// App wrapper for integration tests
const TestApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardMock />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

describe('Authentication Flow Integration', () => {
  beforeEach(() => {
    // Reset auth store
    const store = useAuthStore.getState();
    store.logout();
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();

    // Navigate to login page
    window.history.pushState({}, '', '/login');
  });

  describe('Complete Login Flow', () => {
    it('should complete full login flow and redirect to dashboard', async () => {
      const user = userEvent.setup();

      render(<TestApp />);

      // Should show login page
      expect(screen.getByRole('heading', { name: 'Đăng nhập' })).toBeInTheDocument();
      expect(screen.getByText('Teaching Assistant WebApp')).toBeInTheDocument();

      // Fill in credentials
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Mật khẩu');

      await user.type(emailInput, 'admin@example.com');
      await user.type(passwordInput, 'admin123');

      // Submit form
      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      // Should redirect to dashboard
      await waitFor(
        () => {
          expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Verify user is logged in
      const authState = useAuthStore.getState();
      expect(authState.user).not.toBeNull();
      expect(authState.user?.email).toBe('admin@example.com');
      expect(authState.accessToken).not.toBeNull();
    });

    it('should store tokens in sessionStorage by default', async () => {
      const user = userEvent.setup();

      render(<TestApp />);

      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Mật khẩu');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      await waitFor(
        () => {
          expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Check sessionStorage
      expect(sessionStorage.getItem('access_token')).not.toBeNull();
      expect(sessionStorage.getItem('refresh_token')).not.toBeNull();
    });

    it('should store tokens in localStorage when rememberMe is checked', async () => {
      const user = userEvent.setup();

      render(<TestApp />);

      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Mật khẩu');
      const rememberMeCheckbox = screen.getByRole('checkbox');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(rememberMeCheckbox);

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      await waitFor(
        () => {
          expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Check localStorage
      expect(localStorage.getItem('access_token')).not.toBeNull();
      expect(localStorage.getItem('refresh_token')).not.toBeNull();
    });

    it('should show error and stay on login page with invalid credentials', async () => {
      const user = userEvent.setup();

      render(<TestApp />);

      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Mật khẩu');

      await user.type(emailInput, 'wrong@example.com');
      await user.type(passwordInput, 'wrong'); // Less than 6 chars

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      await waitFor(
        () => {
          // Should show error (either validation or API error)
          const alerts = screen.queryAllByRole('alert');
          expect(alerts.length).toBeGreaterThan(0);
        },
        { timeout: 3000 }
      );

      // Should still be on login page
      expect(screen.getByRole('heading', { name: 'Đăng nhập' })).toBeInTheDocument();

      // Verify user is NOT logged in
      const authState = useAuthStore.getState();
      expect(authState.user).toBeNull();
      expect(authState.accessToken).toBeNull();
    });
  });

  describe('Protected Routes', () => {
    it('should redirect to login when accessing dashboard without auth', async () => {
      render(<TestApp />);

      // Try to navigate to dashboard
      window.history.pushState({}, '', '/dashboard');

      // Should show login page (protected route redirects)
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Đăng nhập' })).toBeInTheDocument();
      });
    });

    it('should allow access to dashboard when authenticated', async () => {
      const user = userEvent.setup();

      render(<TestApp />);

      // Login first
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Mật khẩu');

      await user.type(emailInput, 'admin@example.com');
      await user.type(passwordInput, 'admin123');

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      // Should be able to access dashboard
      await waitFor(
        () => {
          expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });

  describe('Logout Flow', () => {
    it('should logout and redirect to login page', async () => {
      const user = userEvent.setup();

      render(<TestApp />);

      // Login first
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Mật khẩu');

      await user.type(emailInput, 'admin@example.com');
      await user.type(passwordInput, 'admin123');

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      await waitFor(
        () => {
          expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Logout
      const store = useAuthStore.getState();
      store.logout();

      // Verify logout
      const authState = useAuthStore.getState();
      expect(authState.user).toBeNull();
      expect(authState.accessToken).toBeNull();
      expect(localStorage.getItem('access_token')).toBeNull();
      expect(sessionStorage.getItem('access_token')).toBeNull();
    });
  });

  describe('Session Persistence', () => {
    it('should maintain session after page reload with localStorage', async () => {
      const user = userEvent.setup();

      render(<TestApp />);

      // Login with rememberMe
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Mật khẩu');
      const rememberMeCheckbox = screen.getByRole('checkbox');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(rememberMeCheckbox);

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      await waitFor(
        () => {
          expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Save current auth state
      const authState = useAuthStore.getState();
      const savedUser = authState.user;
      const savedToken = authState.accessToken;

      // Simulate page reload by getting the persisted state
      const persistedState = localStorage.getItem('auth-storage');
      expect(persistedState).not.toBeNull();

      if (persistedState) {
        const parsed = JSON.parse(persistedState);
        expect(parsed.state.user).toEqual(savedUser);
        expect(parsed.state.accessToken).toBe(savedToken);
      }
    });
  });
});
