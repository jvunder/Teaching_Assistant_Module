/**
 * Analytics Types - Teaching Assistant Module
 * Types for analytics, reporting, and purchase tracking
 */

export interface PurchaseReport {
  id: string;
  reportDate: string;
  totalRevenue: number;
  totalPurchases: number;
  avgPurchaseValue: number;
  currency: 'VND' | 'USD';
  topCourses: Array<{
    courseId: string;
    courseName: string;
    purchases: number;
    revenue: number;
  }>;
  purchasesByMethod: Array<{
    method: 'card' | 'bank_transfer' | 'cash' | 'ewallet';
    count: number;
    revenue: number;
  }>;
  purchasesBySegment: Array<{
    segment: string;
    count: number;
    revenue: number;
  }>;
}

export interface PurchaseDetail {
  id: string;
  parentId: string;
  parentName: string;
  courseId: string;
  courseName: string;
  amount: number;
  currency: 'VND' | 'USD';
  purchaseDate: string;
  paymentMethod: 'card' | 'bank_transfer' | 'cash' | 'ewallet';
  status: 'pending' | 'completed' | 'refunded';
  refundReason?: string;
  notes?: string;
}

export interface DashboardAnalytics {
  overview: {
    totalRevenue: number;
    totalPurchases: number;
    totalParents: number;
    avgPurchaseValue: number;
  };
  trends: {
    revenueTrend: Array<{ date: string; value: number }>;
    purchasesTrend: Array<{ date: string; value: number }>;
    parentsTrend: Array<{ date: string; value: number }>;
  };
  topCourses: Array<{
    courseId: string;
    courseName: string;
    enrollments: number;
    revenue: number;
    avgRating: number;
  }>;
  parentEngagement: {
    highEngagement: number;
    mediumEngagement: number;
    lowEngagement: number;
  };
  performanceMetrics: {
    avgAttendanceRate: number;
    avgCompletionRate: number;
    avgSatisfactionScore: number;
    retentionRate: number;
  };
}

export interface ExportFormat {
  format: 'excel' | 'pdf' | 'csv';
  includeCharts: boolean;
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

// API Request/Response Types
export interface GetReportsRequest {
  startDate?: string;
  endDate?: string;
  courseId?: string;
  segment?: string;
  groupBy?: 'day' | 'week' | 'month';
}

export interface GetReportsResponse {
  success: boolean;
  data: {
    reports: PurchaseReport[];
    total: number;
    summary: {
      totalRevenue: number;
      totalPurchases: number;
      avgPurchaseValue: number;
    };
  };
  message?: string;
}

export interface GetPurchaseDetailsRequest {
  startDate?: string;
  endDate?: string;
  courseId?: string;
  parentId?: string;
  status?: 'pending' | 'completed' | 'refunded';
  paymentMethod?: 'card' | 'bank_transfer' | 'cash' | 'ewallet';
  page?: number;
  limit?: number;
}

export interface GetPurchaseDetailsResponse {
  success: boolean;
  data: {
    purchases: PurchaseDetail[];
    total: number;
    page: number;
    limit: number;
  };
  message?: string;
}

export interface ExportReportRequest {
  reportType: 'purchases' | 'parents' | 'courses' | 'analytics';
  format: 'excel' | 'pdf' | 'csv';
  dateRange: {
    startDate: string;
    endDate: string;
  };
  filters?: {
    courseId?: string;
    parentId?: string;
    segment?: string;
  };
  includeCharts?: boolean;
}

export interface GetAnalyticsRequest {
  startDate?: string;
  endDate?: string;
  classId?: string;
  courseId?: string;
}

export interface GetAnalyticsResponse {
  success: boolean;
  data: DashboardAnalytics;
  message?: string;
}
