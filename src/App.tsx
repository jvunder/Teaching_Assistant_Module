import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { ConfigProvider, App as AntApp, Spin } from 'antd';
import { useAuthStore } from '@/stores/authStore';
import MainLayout from '@/components/layout/MainLayout';
import { LoginPage, DashboardPage, ClassesPage, ClassDetailPage, MessagingPage, ContentPage, AnalyticsPage, InboxPage, ProfilePage } from '@/config/routes';

// Loading component
const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spin size="large" />
  </div>
);

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Ant Design theme configuration - TA Design System
const antdTheme = {
  token: {
    colorPrimary: '#0066CC', // TA Primary Blue
    colorSuccess: '#28A745', // TA Success Green
    colorWarning: '#FFC107', // TA Warning Orange
    colorError: '#DC3545', // TA Danger Red
    colorInfo: '#4ECDC4', // TA Teal
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 16,
    lineHeight: 1.5,
  },
  components: {
    Card: {
      borderRadiusLG: 12,
      boxShadowTertiary: '0 2px 8px rgba(0, 0, 0, 0.08)',
    },
    Button: {
      borderRadius: 8,
      controlHeight: 40,
    },
    Input: {
      borderRadius: 8,
      controlHeight: 40,
    },
    Select: {
      borderRadius: 8,
      controlHeight: 40,
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <AntApp>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/classes" element={<ClassesPage />} />
                <Route path="/classes/:id" element={<ClassDetailPage />} />
                <Route path="/messaging" element={<MessagingPage />} />
                <Route path="/content" element={<ContentPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/inbox" element={<InboxPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
