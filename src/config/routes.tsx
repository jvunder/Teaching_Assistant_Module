import { lazy } from 'react';

// Lazy load pages
export const LoginPage = lazy(() => import('@/pages/LoginPage'));
export const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
export const ClassesPage = lazy(() => import('@/pages/ClassesPage'));
export const ClassDetailPage = lazy(() => import('@/pages/ClassDetailPage'));
export const MessagingPage = lazy(() => import('@/pages/MessagingPage'));
export const ContentPage = lazy(() => import('@/pages/ContentPage'));
export const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'));
export const PurchaseReportPage = lazy(() => import('@/pages/PurchaseReportPage'));
export const InboxPage = lazy(() => import('@/pages/InboxPage'));
export const ProfilePage = lazy(() => import('@/pages/ProfilePage'));



