# 🚀 GETTING STARTED - TEACHING ASSISTANT WEBAPP
# Hướng dẫn Bắt đầu Development

**Dự án:** Teaching Assistant WebApp - Frontend
**Ngày:** 01/11/2025
**Mục đích:** Hướng dẫn từng bước setup và start development

---

## 📋 PREREQUISITES / YÊU CẦU TRƯỚC KHI BẮT ĐẦU

### Phần mềm cần cài

```bash
# 1. Node.js v18+
node --version  # v18.0.0 hoặc cao hơn
npm --version   # 9.0.0 hoặc cao hơn

# Download: https://nodejs.org

# 2. Git
git --version   # 2.30.0 hoặc cao hơn

# 3. Code Editor
# VS Code (Recommended): https://code.visualstudio.com
```

### VS Code Extensions (Recommended)

```
1. ESLint
2. Prettier
3. TypeScript Vue Plugin (Volar)
4. Tailwind CSS IntelliSense (nếu dùng Tailwind)
5. GitLens
6. Auto Rename Tag
7. Path Intellisense
```

---

## 🏗️ SETUP PROJECT - BƯỚC 1: TẠO PROJECT

### Option A: Create Vite Project (Recommended)

```bash
# 1. Tạo project mới
npx create-vite@latest ta-webapp --template react-ts

# 2. Di chuyển vào folder
cd ta-webapp

# 3. Cài dependencies
npm install

# 4. Test chạy
npm run dev
# → Mở http://localhost:5173
```

### Option B: Clone từ Git (nếu có template)

```bash
# 1. Clone repo
git clone [REPO_URL] ta-webapp
cd ta-webapp

# 2. Cài dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.development
cp .env.example .env.production

# 4. Chỉnh sửa .env.development
nano .env.development
# VITE_API_BASE_URL=http://localhost:3000/api/v1/ta
```

---

## 📦 BƯỚC 2: CÀI DEPENDENCIES

### Core Dependencies

```bash
# UI Framework (Choose one)
npm install antd  # Ant Design
# OR
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled

# Routing
npm install react-router-dom

# State Management
npm install zustand

# HTTP Client
npm install axios axios-retry

# Forms
npm install react-hook-form zod @hookform/resolvers

# Charts
npm install recharts

# Rich Text Editor
npm install quill react-quill

# File Upload
npm install react-dropzone

# Date/Time
npm install dayjs

# Utilities
npm install lodash-es clsx

# Real-time (optional, nếu backend có WebSocket)
npm install socket.io-client

# Icons (nếu không dùng Ant Design/MUI icons)
npm install lucide-react
```

### Dev Dependencies

```bash
# TypeScript Types
npm install -D @types/node @types/lodash-es

# Testing
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# E2E Testing
npm install -D cypress

# Linting & Formatting
npm install -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Build optimization
npm install -D vite-plugin-compression
```

---

## 📁 BƯỚC 3: TẠO FOLDER STRUCTURE

```bash
# Tạo tất cả folders cần thiết
mkdir -p src/{assets/{images,icons,fonts},components/{common,layout,features},pages,services,stores,hooks,types,utils,config,styles}

# Hoặc copy-paste structure này:
```

```
src/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── components/
│   ├── common/           # Button, Input, Card, Modal, Table
│   ├── layout/           # Header, Sidebar, Footer, MainLayout
│   └── features/         # Feature-specific components
│       ├── Dashboard/
│       ├── ClassManagement/
│       ├── Messaging/
│       ├── Content/
│       ├── Analytics/
│       └── Inbox/
├── pages/
│   ├── LoginPage/
│   ├── DashboardPage/
│   ├── ClassesPage/
│   ├── ClassDetailPage/
│   ├── MessagingPage/
│   ├── ContentPage/
│   ├── AnalyticsPage/
│   ├── InboxPage/
│   └── ProfilePage/
├── services/             # API services
│   ├── api.ts            # Axios instance
│   ├── auth.service.ts
│   ├── classes.service.ts
│   ├── messaging.service.ts
│   ├── content.service.ts
│   ├── analytics.service.ts
│   └── inbox.service.ts
├── stores/               # Zustand stores
│   ├── authStore.ts
│   ├── classesStore.ts
│   ├── messagingStore.ts
│   └── uiStore.ts
├── hooks/                # Custom hooks
│   ├── useAuth.ts
│   ├── useClasses.ts
│   └── useDebounce.ts
├── types/                # TypeScript types
│   ├── api.types.ts
│   ├── models.types.ts
│   └── index.ts
├── utils/                # Utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   └── constants.ts
├── config/               # Configuration
│   ├── routes.ts
│   ├── env.ts
│   └── theme.ts
├── styles/               # Global styles
│   ├── globals.css
│   └── variables.css
├── App.tsx
└── main.tsx
```

---

## ⚙️ BƯỚC 4: CẤU HÌNH FILES

### 4.1. Environment Variables

**File: `.env.development`**
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api/v1/ta
VITE_WS_URL=ws://localhost:3000

# Environment
VITE_ENV=development

# Optional: Analytics
VITE_GA_ID=
```

**File: `.env.production`**
```bash
# API Configuration
VITE_API_BASE_URL=https://api.educonnect.vn/api/v1/ta
VITE_WS_URL=wss://api.educonnect.vn

# Environment
VITE_ENV=production
```

---

### 4.2. TypeScript Configuration

**File: `tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path Aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/pages/*": ["src/pages/*"],
      "@/services/*": ["src/services/*"],
      "@/stores/*": ["src/stores/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/types/*": ["src/types/*"],
      "@/utils/*": ["src/utils/*"],
      "@/config/*": ["src/config/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

### 4.3. Vite Configuration

**File: `vite.config.ts`**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/stores': path.resolve(__dirname, './src/stores'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/config': path.resolve(__dirname, './src/config')
    }
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd'],
          charts: ['recharts']
        }
      }
    }
  }
});
```

---

### 4.4. ESLint Configuration

**File: `.eslintrc.json`**
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "no-console": "warn"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

---

### 4.5. Prettier Configuration

**File: `.prettierrc.json`**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

---

## 🎨 BƯỚC 5: SETUP DESIGN SYSTEM

### 5.1. Theme Configuration

**File: `src/config/theme.ts`**
```typescript
export const theme = {
  colors: {
    primary: {
      main: '#1890ff',
      light: '#40a9ff',
      dark: '#096dd9'
    },
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e8e8e8',
      500: '#8c8c8c',
      900: '#1f1f1f'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    sm: '2px',
    base: '4px',
    md: '8px',
    lg: '12px'
  }
};
```

---

### 5.2. Global Styles

**File: `src/styles/globals.css`**
```css
/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Body */
body {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #262626;
  background-color: #f0f2f5;
}

/* Links */
a {
  color: #1890ff;
  text-decoration: none;
}

a:hover {
  color: #40a9ff;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #d9d9d9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #bfbfbf;
}

/* Utilities */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}
```

---

## 🔌 BƯỚC 6: SETUP API SERVICE

### 6.1. Axios Instance

**File: `src/services/api.ts`**
```typescript
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1/ta';

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Retry failed requests
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error);
  }
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
```

---

### 6.2. Auth Service Example

**File: `src/services/auth.service.ts`**
```typescript
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

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async refreshToken(refreshToken: string) {
    const { data } = await api.post('/auth/refresh', { refreshToken });
    return data;
  }
};
```

---

## 🏪 BƯỚC 7: SETUP STATE MANAGEMENT

### Auth Store Example

**File: `src/stores/authStore.ts`**
```typescript
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
            isLoading: false
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.error?.message || 'Đăng nhập thất bại',
            isLoading: false
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
          error: null
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken
      })
    }
  )
);
```

---

## 🧭 BƯỚC 8: SETUP ROUTING

### Routes Configuration

**File: `src/config/routes.tsx`**
```typescript
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const ClassesPage = lazy(() => import('@/pages/ClassesPage'));
// ... other imports

export const routes = [
  {
    path: '/login',
    element: <LoginPage />,
    public: true
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'classes', element: <ClassesPage /> },
      { path: 'messaging', element: <MessagingPage /> },
      { path: 'content', element: <ContentPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'inbox', element: <InboxPage /> },
      { path: 'profile', element: <ProfilePage /> }
    ]
  }
];
```

---

## ✅ BƯỚC 9: VERIFY SETUP

### Checklist

```bash
# 1. Check Node version
node --version  # ≥ v18

# 2. Check dependencies installed
npm list react react-dom
npm list antd zustand axios

# 3. Check TypeScript compiles
npm run build

# 4. Check linting
npm run lint

# 5. Start dev server
npm run dev
# → Mở http://localhost:5173
# → Không có errors trong console
```

---

## 🎯 BƯỚC 10: START CODING

### First Task: Build Login Page

1. **Create LoginPage component**
   ```bash
   mkdir -p src/pages/LoginPage
   touch src/pages/LoginPage/index.tsx
   ```

2. **Follow PRD Section 3: User Stories**
   - US-TA-001: Đăng nhập WebApp
   - Copy code từ PRD làm starting point

3. **Test login flow**
   - Mock API response (nếu backend chưa sẵn sàng)
   - Verify JWT stored in localStorage
   - Verify redirect to /dashboard

---

## 📚 NEXT STEPS / BƯỚC TIẾP THEO

### Week 1: Setup & Core UI

- [x] Setup project
- [ ] Build common components (Button, Input, Card)
- [ ] Build layout (Header, Sidebar)
- [ ] Build Login page
- [ ] Build Dashboard page (basic)

### Week 2: Dashboard & Classes

- [ ] Complete Dashboard with charts
- [ ] Build Classes list page
- [ ] Build Class detail page
- [ ] Integrate APIs

### Continue...

Follow timeline in **PRD_TRO_GIANG_FRONTEND_ONLY.md Section 12**

---

## 🐛 TROUBLESHOOTING / XỬ LÝ LỖI

### Common Issues

**1. Path aliases not working**
```bash
# Check tsconfig.json has paths configured
# Check vite.config.ts has resolve.alias configured
# Restart VS Code
```

**2. Ant Design styles not loading**
```bash
# Import styles in main.tsx
import 'antd/dist/reset.css';
```

**3. API CORS errors**
```bash
# Backend needs to whitelist frontend origin
# Or use Vite proxy in vite.config.ts
```

**4. TypeScript errors**
```bash
# Check @types packages installed
npm install -D @types/node @types/react
```

---

## 📞 SUPPORT / HỖ TRỢ

**Issues?**
- Check PRD: `PRD_TRO_GIANG_FRONTEND_ONLY.md`
- Check README: `README.md`
- Contact team lead

---

**Last Updated:** 01/11/2025
**Status:** ✅ Ready to use

---

# 🎉 HAPPY CODING!
