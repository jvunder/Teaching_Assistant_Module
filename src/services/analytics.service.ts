/**
 * Analytics Service - Teaching Assistant Module
 * Mock service for analytics, reporting, and purchase tracking
 */

import type {
  PurchaseReport,
  PurchaseDetail,
  DashboardAnalytics,
  GetReportsRequest,
  GetReportsResponse,
  GetPurchaseDetailsRequest,
  GetPurchaseDetailsResponse,
  ExportReportRequest,
  GetAnalyticsRequest,
  GetAnalyticsResponse,
} from '@/types/analytics.types';

// Mock delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ========================================
// MOCK DATA: Purchase Details
// ========================================

const mockPurchaseDetails: PurchaseDetail[] = [
  {
    id: 'PUR001',
    parentId: 'PAR001',
    parentName: 'Nguyễn Thị Lan',
    courseId: 'C001',
    courseName: 'Nuôi dạy con 0-3 tuổi',
    amount: 2500000,
    currency: 'VND',
    purchaseDate: '2025-10-15',
    paymentMethod: 'bank_transfer',
    status: 'completed',
  },
  {
    id: 'PUR002',
    parentId: 'PAR001',
    parentName: 'Nguyễn Thị Lan',
    courseId: 'C002',
    courseName: 'Tâm lý học đường',
    amount: 3000000,
    currency: 'VND',
    purchaseDate: '2025-10-20',
    paymentMethod: 'card',
    status: 'completed',
  },
  {
    id: 'PUR003',
    parentId: 'PAR002',
    parentName: 'Trần Văn Minh',
    courseId: 'C001',
    courseName: 'Nuôi dạy con 0-3 tuổi',
    amount: 2500000,
    currency: 'VND',
    purchaseDate: '2025-10-22',
    paymentMethod: 'ewallet',
    status: 'completed',
  },
  {
    id: 'PUR004',
    parentId: 'PAR003',
    parentName: '李美华',
    courseId: 'C001',
    courseName: 'Nuôi dạy con 0-3 tuổi',
    amount: 2500000,
    currency: 'VND',
    purchaseDate: '2025-11-01',
    paymentMethod: 'bank_transfer',
    status: 'completed',
  },
  {
    id: 'PUR005',
    parentId: 'PAR004',
    parentName: 'Phạm Thị Hương',
    courseId: 'C002',
    courseName: 'Tâm lý học đường',
    amount: 3000000,
    currency: 'VND',
    purchaseDate: '2025-11-05',
    paymentMethod: 'card',
    status: 'completed',
  },
  {
    id: 'PUR006',
    parentId: 'PAR002',
    parentName: 'Trần Văn Minh',
    courseId: 'C003',
    courseName: 'Nuôi con bằng tình yêu thương',
    amount: 2800000,
    currency: 'VND',
    purchaseDate: '2025-11-08',
    paymentMethod: 'bank_transfer',
    status: 'completed',
  },
  {
    id: 'PUR007',
    parentId: 'PAR005',
    parentName: 'Lê Thị Mai',
    courseId: 'C001',
    courseName: 'Nuôi dạy con 0-3 tuổi',
    amount: 2500000,
    currency: 'VND',
    purchaseDate: '2025-11-10',
    paymentMethod: 'cash',
    status: 'completed',
  },
  {
    id: 'PUR008',
    parentId: 'PAR006',
    parentName: 'Hoàng Văn Đức',
    courseId: 'C002',
    courseName: 'Tâm lý học đường',
    amount: 3000000,
    currency: 'VND',
    purchaseDate: '2025-11-12',
    paymentMethod: 'ewallet',
    status: 'pending',
  },
  {
    id: 'PUR009',
    parentId: 'PAR007',
    parentName: 'Vũ Thị Hoa',
    courseId: 'C003',
    courseName: 'Nuôi con bằng tình yêu thương',
    amount: 2800000,
    currency: 'VND',
    purchaseDate: '2025-11-13',
    paymentMethod: 'card',
    status: 'completed',
  },
];

// ========================================
// SERVICE FUNCTIONS
// ========================================

/**
 * Get purchase reports with filtering and grouping
 * Endpoint: GET /api/v1/ta/analytics/purchases
 */
export async function getPurchaseReports(
  params: GetReportsRequest
): Promise<GetReportsResponse> {
  await delay(700);

  const { startDate, endDate, courseId, segment, groupBy = 'month' } = params;

  let filteredPurchases = [...mockPurchaseDetails].filter((p) => p.status === 'completed');

  // Filter by date range
  if (startDate) {
    filteredPurchases = filteredPurchases.filter(
      (p) => new Date(p.purchaseDate) >= new Date(startDate)
    );
  }
  if (endDate) {
    filteredPurchases = filteredPurchases.filter(
      (p) => new Date(p.purchaseDate) <= new Date(endDate)
    );
  }

  // Filter by course
  if (courseId) {
    filteredPurchases = filteredPurchases.filter((p) => p.courseId === courseId);
  }

  // Calculate summary
  const totalRevenue = filteredPurchases.reduce((sum, p) => sum + p.amount, 0);
  const totalPurchases = filteredPurchases.length;
  const avgPurchaseValue = totalPurchases > 0 ? totalRevenue / totalPurchases : 0;

  // Calculate top courses
  const courseMap = new Map<string, { count: number; revenue: number; name: string }>();
  filteredPurchases.forEach((p) => {
    const existing = courseMap.get(p.courseId);
    if (existing) {
      existing.count += 1;
      existing.revenue += p.amount;
    } else {
      courseMap.set(p.courseId, {
        count: 1,
        revenue: p.amount,
        name: p.courseName,
      });
    }
  });

  const topCourses = Array.from(courseMap.entries())
    .map(([courseId, data]) => ({
      courseId,
      courseName: data.name,
      purchases: data.count,
      revenue: data.revenue,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // Calculate purchases by method
  const methodMap = new Map<string, { count: number; revenue: number }>();
  filteredPurchases.forEach((p) => {
    const existing = methodMap.get(p.paymentMethod);
    if (existing) {
      existing.count += 1;
      existing.revenue += p.amount;
    } else {
      methodMap.set(p.paymentMethod, { count: 1, revenue: p.amount });
    }
  });

  const purchasesByMethod = Array.from(methodMap.entries()).map(([method, data]) => ({
    method: method as 'card' | 'bank_transfer' | 'cash' | 'ewallet',
    count: data.count,
    revenue: data.revenue,
  }));

  // Mock report
  const report: PurchaseReport = {
    id: 'REP_' + Date.now(),
    reportDate: new Date().toISOString(),
    totalRevenue,
    totalPurchases,
    avgPurchaseValue,
    currency: 'VND',
    topCourses,
    purchasesByMethod,
    purchasesBySegment: [
      { segment: 'High Engagement', count: 15, revenue: 42000000 },
      { segment: 'Medium Engagement', count: 8, revenue: 22000000 },
      { segment: 'Low Engagement', count: 3, revenue: 8400000 },
    ],
  };

  return {
    success: true,
    data: {
      reports: [report],
      total: 1,
      summary: {
        totalRevenue,
        totalPurchases,
        avgPurchaseValue,
      },
    },
    message: 'Purchase reports retrieved successfully',
  };
}

/**
 * Get detailed purchase transactions with filtering
 * Endpoint: GET /api/v1/ta/analytics/purchases/details
 */
export async function getPurchaseDetails(
  params: GetPurchaseDetailsRequest
): Promise<GetPurchaseDetailsResponse> {
  await delay(500);

  const {
    startDate,
    endDate,
    courseId,
    parentId,
    status,
    paymentMethod,
    page = 1,
    limit = 20,
  } = params;

  let filteredPurchases = [...mockPurchaseDetails];

  // Apply filters
  if (startDate) {
    filteredPurchases = filteredPurchases.filter(
      (p) => new Date(p.purchaseDate) >= new Date(startDate)
    );
  }
  if (endDate) {
    filteredPurchases = filteredPurchases.filter(
      (p) => new Date(p.purchaseDate) <= new Date(endDate)
    );
  }
  if (courseId) {
    filteredPurchases = filteredPurchases.filter((p) => p.courseId === courseId);
  }
  if (parentId) {
    filteredPurchases = filteredPurchases.filter((p) => p.parentId === parentId);
  }
  if (status) {
    filteredPurchases = filteredPurchases.filter((p) => p.status === status);
  }
  if (paymentMethod) {
    filteredPurchases = filteredPurchases.filter((p) => p.paymentMethod === paymentMethod);
  }

  // Sort by date (newest first)
  filteredPurchases.sort(
    (a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
  );

  // Pagination
  const total = filteredPurchases.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedPurchases = filteredPurchases.slice(start, end);

  return {
    success: true,
    data: {
      purchases: paginatedPurchases,
      total,
      page,
      limit,
    },
    message: 'Purchase details retrieved successfully',
  };
}

/**
 * Export analytics report in various formats
 * Endpoint: POST /api/v1/ta/analytics/export
 */
export async function exportReport(params: ExportReportRequest): Promise<Blob> {
  await delay(1000);

  const { reportType, format, dateRange, filters, includeCharts = true } = params;

  // Mock export data
  const exportData = {
    reportType,
    format,
    dateRange,
    filters,
    includeCharts,
    generatedAt: new Date().toISOString(),
    data: mockPurchaseDetails,
  };

  // Create a mock blob (in real implementation, this would generate actual file)
  const content = JSON.stringify(exportData, null, 2);
  const blob = new Blob([content], { type: getMimeType(format) });

  return blob;
}

/**
 * Get dashboard analytics with trends and metrics
 * Endpoint: GET /api/v1/ta/analytics/dashboard
 */
export async function getDashboardAnalytics(
  params: GetAnalyticsRequest
): Promise<GetAnalyticsResponse> {
  await delay(600);

  const { startDate, endDate, classId, courseId } = params;

  const analytics: DashboardAnalytics = {
    overview: {
      totalRevenue: 72400000,
      totalPurchases: 26,
      totalParents: 63,
      avgPurchaseValue: 2784615,
    },
    trends: {
      revenueTrend: [
        { date: '2025-10-01', value: 12500000 },
        { date: '2025-10-08', value: 15000000 },
        { date: '2025-10-15', value: 18200000 },
        { date: '2025-10-22', value: 14800000 },
        { date: '2025-10-29', value: 11900000 },
      ],
      purchasesTrend: [
        { date: '2025-10-01', value: 5 },
        { date: '2025-10-08', value: 6 },
        { date: '2025-10-15', value: 7 },
        { date: '2025-10-22', value: 5 },
        { date: '2025-10-29', value: 3 },
      ],
      parentsTrend: [
        { date: '2025-10-01', value: 45 },
        { date: '2025-10-08', value: 52 },
        { date: '2025-10-15', value: 58 },
        { date: '2025-10-22', value: 61 },
        { date: '2025-10-29', value: 63 },
      ],
    },
    topCourses: [
      {
        courseId: 'C001',
        courseName: 'Nuôi dạy con 0-3 tuổi',
        enrollments: 25,
        revenue: 62500000,
        avgRating: 4.7,
      },
      {
        courseId: 'C002',
        courseName: 'Tâm lý học đường',
        enrollments: 20,
        revenue: 60000000,
        avgRating: 4.5,
      },
      {
        courseId: 'C003',
        courseName: 'Nuôi con bằng tình yêu thương',
        enrollments: 18,
        revenue: 50400000,
        avgRating: 4.8,
      },
    ],
    parentEngagement: {
      highEngagement: 42,
      mediumEngagement: 15,
      lowEngagement: 6,
    },
    performanceMetrics: {
      avgAttendanceRate: 82.5,
      avgCompletionRate: 78.3,
      avgSatisfactionScore: 4.6,
      retentionRate: 91.5,
    },
  };

  return {
    success: true,
    data: analytics,
    message: 'Dashboard analytics retrieved successfully',
  };
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function getMimeType(format: 'excel' | 'pdf' | 'csv'): string {
  switch (format) {
    case 'excel':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'pdf':
      return 'application/pdf';
    case 'csv':
      return 'text/csv';
    default:
      return 'application/octet-stream';
  }
}

// Export service object for convenience
export const analyticsService = {
  getPurchaseReports,
  getPurchaseDetails,
  exportReport,
  getDashboardAnalytics,
};

export default analyticsService;
