import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../index';
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock auth store
vi.mock('@/stores/authStore', () => ({
  useAuthStore: vi.fn(),
}));

const renderLoginPage = () => {
  return render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
};

describe('LoginPage', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();

    // Default mock implementation
    vi.mocked(useAuthStore).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
      user: null,
      accessToken: null,
      logout: vi.fn(),
    });
  });

  describe('Rendering', () => {
    it('should render login form with all fields', () => {
      renderLoginPage();

      expect(screen.getByRole('heading', { name: 'Đăng nhập' })).toBeInTheDocument();
      expect(screen.getByText('Teaching Assistant WebApp')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Mật khẩu')).toBeInTheDocument();
      expect(screen.getByText('Ghi nhớ đăng nhập')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /đăng nhập/i })).toBeInTheDocument();
    });

    it('should render footer with link to admin', () => {
      renderLoginPage();

      expect(screen.getByText('Chưa có tài khoản?')).toBeInTheDocument();
      expect(screen.getByText('Liên hệ quản trị viên')).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should show error when email is empty', async () => {
      const user = userEvent.setup();
      renderLoginPage();

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email là bắt buộc')).toBeInTheDocument();
      });
    });

    it('should show error when email is invalid', async () => {
      const user = userEvent.setup();
      renderLoginPage();

      const emailInput = screen.getByPlaceholderText('Email');
      await user.type(emailInput, 'invalid-email');

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email không hợp lệ')).toBeInTheDocument();
      });
    });

    it('should show error when password is empty', async () => {
      const user = userEvent.setup();
      renderLoginPage();

      const emailInput = screen.getByPlaceholderText('Email');
      await user.type(emailInput, 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Mật khẩu là bắt buộc')).toBeInTheDocument();
      });
    });

    it('should show error when password is less than 6 characters', async () => {
      const user = userEvent.setup();
      renderLoginPage();

      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Mật khẩu');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, '12345');

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Mật khẩu phải có ít nhất 6 ký tự')).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should call login with correct credentials', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValueOnce(undefined);

      renderLoginPage();

      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Mật khẩu');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123', false);
      });
    });

    it('should call login with rememberMe when checkbox is checked', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValueOnce(undefined);

      renderLoginPage();

      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Mật khẩu');
      const rememberMeCheckbox = screen.getByRole('checkbox');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(rememberMeCheckbox);

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123', true);
      });
    });

    it('should navigate to dashboard on successful login', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValueOnce(undefined);

      renderLoginPage();

      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Mật khẩu');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('should display error message on login failure', async () => {
      const user = userEvent.setup();
      const errorMessage = 'Email hoặc mật khẩu không đúng';
      mockLogin.mockRejectedValueOnce(new Error(errorMessage));

      renderLoginPage();

      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Mật khẩu');

      await user.type(emailInput, 'wrong@example.com');
      await user.type(passwordInput, 'wrongpassword');

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });

    it('should show loading state during login', async () => {
      // Mock loading state
      vi.mocked(useAuthStore).mockReturnValue({
        login: mockLogin,
        isLoading: true,
        error: null,
        user: null,
        accessToken: null,
        logout: vi.fn(),
      });

      renderLoginPage();

      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
      expect(submitButton).toHaveClass('ant-btn-loading');

      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Mật khẩu');

      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
    });

    it('should display auth store error if present', () => {
      const errorMessage = 'Session expired';

      vi.mocked(useAuthStore).mockReturnValue({
        login: mockLogin,
        isLoading: false,
        error: errorMessage,
        user: null,
        accessToken: null,
        logout: vi.fn(),
      });

      renderLoginPage();

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('should allow typing in email field', async () => {
      const user = userEvent.setup();
      renderLoginPage();

      const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
      await user.type(emailInput, 'test@example.com');

      expect(emailInput.value).toBe('test@example.com');
    });

    it('should allow typing in password field', async () => {
      const user = userEvent.setup();
      renderLoginPage();

      const passwordInput = screen.getByPlaceholderText('Mật khẩu') as HTMLInputElement;
      await user.type(passwordInput, 'password123');

      expect(passwordInput.value).toBe('password123');
    });

    it('should toggle remember me checkbox', async () => {
      const user = userEvent.setup();
      renderLoginPage();

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);

      await user.click(checkbox);
      expect(checkbox.checked).toBe(true);

      await user.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });
  });
});
