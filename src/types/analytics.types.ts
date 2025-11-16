/**
 * Analytics Types - Teaching Assistant Module
 *
 * Handles analytics and reporting functionality including:
 * - Purchase reports by dimension (class, grade, school, province)
 * - Data export (Excel, PDF, CSV)
 * - Performance metrics and KPIs
 * - Trend analysis
 * - Custom report generation
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * Dimension for grouping report data
 */
export type ReportDimension = 'class' | 'grade' | 'school' | 'province' | 'teacher' | 'month' | 'quarter';

/**
 * Export format for reports
 */
export type ExportFormat = 'excel' | 'pdf' | 'csv' | 'json';

/**
 * Time period for reports
 */
export type TimePeriod = 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'this_month' | 'last_month' | 'this_quarter' | 'this_year' | 'custom';

/**
 * Metric type
 */
export type MetricType = 'count' | 'sum' | 'average' | 'percentage' | 'growth';

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Report type
 */
export enum ReportType {
  PURCHASE = 'purchase',
  ENROLLMENT = 'enrollment',
  ATTENDANCE = 'attendance',
  PERFORMANCE = 'performance',
  ENGAGEMENT = 'engagement',
  REVENUE = 'revenue',
  PARENT_ACTIVITY = 'parent_activity',
  CONTENT_PERFORMANCE = 'content_performance',
  MESSAGE_EFFECTIVENESS = 'message_effectiveness'
}

/**
 * Report status
 */
export enum ReportStatus {
  PENDING = 'pending',
  GENERATING = 'generating',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

// ============================================================================
// INTERFACES - CORE TYPES
// ============================================================================

/**
 * Purchase report aggregated by dimension
 */
export interface PurchaseReport {
  id: string;
  reportName: string;
  dimension: ReportDimension;
  generatedAt: string;

  // Time period
  periodStart: string;
  periodEnd: string;

  // Summary
  summary: {
    totalPurchases: number;
    totalRevenue: number; // VND
    totalRefunds: number; // VND
    netRevenue: number; // VND
    averagePurchaseValue: number; // VND
    conversionRate: number; // Percentage
  };

  // Breakdown by dimension
  breakdown: {
    dimensionValue: string; // e.g., class name, grade, school name
    purchases: number;
    revenue: number; // VND
    refunds: number;
    netRevenue: number;
    averagePurchaseValue: number;
    conversionRate: number;
    percentageOfTotal: number;
  }[];

  // Details
  details: PurchaseDetail[];

  // Trends
  trends: {
    date: string; // YYYY-MM-DD
    purchases: number;
    revenue: number;
  }[];
}

/**
 * Individual purchase detail
 */
export interface PurchaseDetail {
  id: string;
  purchaseDate: string;

  // Parent info
  parentId: string;
  parentName: string;
  parentEmail: string;

  // Course info
  courseId: string;
  courseName: string;
  courseType: string;

  // Class/School info
  classId?: string;
  className?: string;
  grade?: string;
  schoolId?: string;
  schoolName?: string;
  province?: string;

  // Payment
  amount: number; // VND
  discount: number; // VND
  finalAmount: number; // VND
  paymentMethod: 'bank_transfer' | 'credit_card' | 'momo' | 'zalopay' | 'cash';
  paymentStatus: 'completed' | 'pending' | 'failed' | 'refunded';

  // Transaction
  transactionId: string;
  invoiceNumber?: string;

  // Refund info (if applicable)
  isRefunded: boolean;
  refundDate?: string;
  refundAmount?: number;
  refundReason?: string;
}

/**
 * Filter options for reports
 */
export interface ReportFilter {
  // Time period
  timePeriod?: TimePeriod;
  dateFrom?: string; // ISO 8601
  dateTo?: string;

  // Dimensions
  classIds?: string[];
  grades?: string[];
  schoolIds?: string[];
  provinces?: string[];
  teacherIds?: string[];

  // Course filters
  courseIds?: string[];
  courseTypes?: ('live' | 'recorded' | 'hybrid' | 'self_paced')[];
  isPremium?: boolean;

  // Parent filters
  parentSegments?: string[];
  engagementLevels?: ('high' | 'medium' | 'low')[];

  // Payment filters
  paymentMethods?: ('bank_transfer' | 'credit_card' | 'momo' | 'zalopay' | 'cash')[];
  paymentStatus?: ('completed' | 'pending' | 'failed' | 'refunded')[];
  minAmount?: number;
  maxAmount?: number;

  // Other
  includeRefunds?: boolean;
}

/**
 * Enrollment analytics
 */
export interface EnrollmentAnalytics {
  reportId: string;
  generatedAt: string;

  // Period
  periodStart: string;
  periodEnd: string;

  // Summary
  summary: {
    totalEnrollments: number;
    newEnrollments: number;
    activeEnrollments: number;
    completedEnrollments: number;
    droppedEnrollments: number;
    dropoutRate: number; // Percentage
  };

  // By dimension
  byClass: {
    classId: string;
    className: string;
    enrollments: number;
    capacity: number;
    fillRate: number; // Percentage
    dropoutRate: number;
  }[];

  byGrade: {
    grade: string;
    enrollments: number;
    dropoutRate: number;
  }[];

  byProvince: {
    province: string;
    enrollments: number;
    percentageOfTotal: number;
  }[];

  // Trends
  trends: {
    date: string;
    enrollments: number;
    dropouts: number;
  }[];
}

/**
 * Attendance analytics
 */
export interface AttendanceAnalytics {
  reportId: string;
  generatedAt: string;

  // Period
  periodStart: string;
  periodEnd: string;

  // Summary
  summary: {
    totalSessions: number;
    averageAttendance: number; // Percentage
    totalAbsences: number;
    totalLateArrivals: number;
    attendanceTrend: 'improving' | 'stable' | 'declining';
  };

  // By class
  byClass: {
    classId: string;
    className: string;
    totalSessions: number;
    averageAttendance: number;
    trend: 'improving' | 'stable' | 'declining';
  }[];

  // By parent
  topAttenders: {
    parentId: string;
    parentName: string;
    attendanceRate: number;
  }[];

  lowAttenders: {
    parentId: string;
    parentName: string;
    attendanceRate: number;
    lastAttended?: string;
  }[];

  // Patterns
  attendanceByDayOfWeek: {
    day: string;
    averageAttendance: number;
  }[];

  attendanceByTimeOfDay: {
    hour: number;
    averageAttendance: number;
  }[];
}

/**
 * Performance metrics dashboard
 */
export interface PerformanceDashboard {
  generatedAt: string;
  periodStart: string;
  periodEnd: string;

  // Key metrics
  metrics: {
    enrollment: {
      value: number;
      change: number; // Percentage vs previous period
      trend: 'up' | 'down' | 'stable';
    };
    revenue: {
      value: number;
      change: number;
      trend: 'up' | 'down' | 'stable';
    };
    attendance: {
      value: number; // Percentage
      change: number;
      trend: 'up' | 'down' | 'stable';
    };
    completion: {
      value: number; // Percentage
      change: number;
      trend: 'up' | 'down' | 'stable';
    };
    satisfaction: {
      value: number; // 0-100
      change: number;
      trend: 'up' | 'down' | 'stable';
    };
    engagement: {
      value: number; // 0-100
      change: number;
      trend: 'up' | 'down' | 'stable';
    };
  };

  // Top performers
  topClasses: {
    classId: string;
    className: string;
    score: number;
    metric: 'enrollment' | 'attendance' | 'completion';
  }[];

  topTeachers: {
    teacherId: string;
    teacherName: string;
    score: number;
    classesManaged: number;
  }[];

  // Growth indicators
  growth: {
    newParentsThisPeriod: number;
    newParentsGrowth: number; // Percentage
    revenueGrowth: number; // Percentage
    enrollmentGrowth: number; // Percentage
  };
}

/**
 * Custom report configuration
 */
export interface CustomReport {
  id: string;
  name: string;
  description?: string;
  type: ReportType;

  // Configuration
  dimension: ReportDimension;
  metrics: {
    name: string;
    type: MetricType;
    field: string; // Field to aggregate
  }[];
  filter: ReportFilter;

  // Schedule
  isScheduled: boolean;
  scheduleFrequency?: 'daily' | 'weekly' | 'monthly';
  scheduleDay?: number; // Day of week (1-7) or month (1-31)
  scheduleTime?: string; // HH:mm
  recipients?: string[]; // Email addresses

  // Export
  autoExport: boolean;
  exportFormat?: ExportFormat;

  // Metadata
  createdBy: string; // TA ID
  createdAt: string;
  updatedAt: string;
  lastGenerated?: string;
}

/**
 * Generated report instance
 */
export interface GeneratedReport {
  id: string;
  reportId: string; // Custom report ID if from template
  reportName: string;
  type: ReportType;

  // Status
  status: ReportStatus;
  progress?: number; // 0-100

  // Files
  fileUrl?: string; // URL to download report
  format: ExportFormat;
  fileSize?: number; // bytes

  // Generation details
  generatedAt: string;
  generatedBy: string; // TA ID
  expiresAt?: string; // Auto-delete after this time

  // Parameters used
  filter: ReportFilter;
  dimension?: ReportDimension;

  // Error (if failed)
  error?: string;
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

/**
 * Request to get purchase report
 */
export interface GetPurchaseReportRequest {
  dimension: ReportDimension;
  filter: ReportFilter;
  includeDetails?: boolean;
  includeTrends?: boolean;
}

/**
 * Response for purchase report
 */
export interface GetPurchaseReportResponse {
  report: PurchaseReport;
}

/**
 * Request to get enrollment analytics
 */
export interface GetEnrollmentAnalyticsRequest {
  filter: ReportFilter;
  breakdown?: ('class' | 'grade' | 'province')[];
}

/**
 * Response for enrollment analytics
 */
export interface GetEnrollmentAnalyticsResponse {
  analytics: EnrollmentAnalytics;
}

/**
 * Request to get attendance analytics
 */
export interface GetAttendanceAnalyticsRequest {
  filter: ReportFilter;
  includePatterns?: boolean;
  topN?: number; // Number of top/low attenders to include
}

/**
 * Response for attendance analytics
 */
export interface GetAttendanceAnalyticsResponse {
  analytics: AttendanceAnalytics;
}

/**
 * Request to get performance dashboard
 */
export interface GetPerformanceDashboardRequest {
  periodStart: string;
  periodEnd: string;
  compareWithPrevious?: boolean;
  filter?: ReportFilter;
}

/**
 * Response for performance dashboard
 */
export interface GetPerformanceDashboardResponse {
  dashboard: PerformanceDashboard;
}

/**
 * Request to create custom report
 */
export interface CreateCustomReportRequest {
  name: string;
  description?: string;
  type: ReportType;
  dimension: ReportDimension;
  metrics: CustomReport['metrics'];
  filter: ReportFilter;
  isScheduled?: boolean;
  scheduleFrequency?: CustomReport['scheduleFrequency'];
  scheduleDay?: number;
  scheduleTime?: string;
  recipients?: string[];
  autoExport?: boolean;
  exportFormat?: ExportFormat;
}

/**
 * Request to update custom report
 */
export interface UpdateCustomReportRequest {
  name?: string;
  description?: string;
  metrics?: CustomReport['metrics'];
  filter?: ReportFilter;
  isScheduled?: boolean;
  scheduleFrequency?: CustomReport['scheduleFrequency'];
  scheduleDay?: number;
  scheduleTime?: string;
  recipients?: string[];
  autoExport?: boolean;
  exportFormat?: ExportFormat;
}

/**
 * Request to generate report
 */
export interface GenerateReportRequest {
  reportId?: string; // Custom report ID, if using template
  type: ReportType;
  filter: ReportFilter;
  dimension?: ReportDimension;
  format: ExportFormat;
  includeCharts?: boolean;
}

/**
 * Response for generate report
 */
export interface GenerateReportResponse {
  generatedReportId: string;
  status: ReportStatus;
  estimatedTime?: number; // seconds
  message?: string;
}

/**
 * Request to get generated reports
 */
export interface GetGeneratedReportsRequest {
  page?: number;
  pageSize?: number;
  type?: ReportType[];
  status?: ReportStatus[];
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Response for get generated reports
 */
export interface GetGeneratedReportsResponse {
  reports: GeneratedReport[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Request to export data
 */
export interface ExportDataRequest {
  type: 'parents' | 'classes' | 'enrollments' | 'purchases' | 'attendance';
  format: ExportFormat;
  filter?: ReportFilter;
  fields?: string[]; // Specific fields to include
  includeHeaders?: boolean;
}

/**
 * Response for export data
 */
export interface ExportDataResponse {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  format: ExportFormat;
  recordCount: number;
  expiresAt: string;
}

/**
 * Request to get analytics summary
 */
export interface GetAnalyticsSummaryRequest {
  period: TimePeriod;
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Response for analytics summary
 */
export interface GetAnalyticsSummaryResponse {
  summary: {
    totalParents: number;
    activeParents: number;
    totalClasses: number;
    totalEnrollments: number;
    totalRevenue: number;
    averageAttendance: number;
    averageCompletion: number;
    averageSatisfaction: number;
  };
  trends: {
    metric: string;
    value: number;
    change: number; // Percentage
    trend: 'up' | 'down' | 'stable';
  }[];
}
