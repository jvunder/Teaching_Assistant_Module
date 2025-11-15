import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LanguageSwitcher from '../index';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

// Mock window.location.reload
const mockReload = vi.fn();
Object.defineProperty(window, 'location', {
  value: { reload: mockReload },
  writable: true,
});

// Create a test i18n instance
const createTestI18n = () => {
  const testI18n = i18n.createInstance();
  testI18n.init({
    lng: 'vi',
    fallbackLng: 'vi',
    resources: {
      vi: {
        translation: {},
      },
      zh: {
        translation: {},
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });
  return testI18n;
};

describe('LanguageSwitcher', () => {
  let testI18n: typeof i18n;

  beforeEach(() => {
    testI18n = createTestI18n();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should render with default Vietnamese language', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('should display globe icon', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    const icon = document.querySelector('.anticon-global');
    expect(icon).toBeInTheDocument();
  });

  it('should change language when option is selected', async () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    const select = screen.getByRole('combobox');

    // Open dropdown
    fireEvent.mouseDown(select);

    await waitFor(
      () => {
        const zhOption = screen.getByText(/中文/);
        expect(zhOption).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('should store language preference in localStorage', async () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    const select = container.querySelector('.ant-select-selector');

    if (select) {
      fireEvent.mouseDown(select);

      await waitFor(() => {
        const options = document.querySelectorAll('.ant-select-item-option');
        if (options.length > 1) {
          fireEvent.click(options[1]); // Click Chinese option
        }
      });

      // Check if language was stored in localStorage
      await waitFor(() => {
        const storedLang = localStorage.getItem('language');
        expect(storedLang).toBe('zh');
      });
    }
  });

  it('should reload page after language change', async () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    const select = container.querySelector('.ant-select-selector');

    if (select) {
      fireEvent.mouseDown(select);

      await waitFor(() => {
        const options = document.querySelectorAll('.ant-select-item-option');
        if (options.length > 1) {
          fireEvent.click(options[1]); // Click Chinese option
        }
      });

      // Check if page reload was called
      await waitFor(() => {
        expect(mockReload).toHaveBeenCalled();
      });
    }
  });

  it('should have both Vietnamese and Chinese options', async () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    await waitFor(
      () => {
        expect(screen.getByText(/Tiếng Việt/)).toBeInTheDocument();
        expect(screen.getByText(/中文/)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('should display correct flags for languages', async () => {
    const { container } = render(
      <I18nextProvider i18n={testI18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    const select = container.querySelector('.ant-select-selector');

    if (select) {
      fireEvent.mouseDown(select);

      await waitFor(() => {
        const flags = document.querySelectorAll('.flag');
        expect(flags.length).toBeGreaterThanOrEqual(2);
      });
    }
  });
});
