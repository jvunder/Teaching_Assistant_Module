// Analytics Types for Purchase Reports

export type ReportDimension = 'class' | 'grade' | 'school' | 'province';
export type CourseType = 'all' | 'math' | 'english' | 'science' | 'literature' | 'social';
export type ChartType = 'bar' | 'line' | 'pie' | 'area';

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface ReportFilter {
  dimension: ReportDimension;
  dateRange: DateRange;
  courseType: CourseType;
  searchTerm?: string;
}

export interface PurchaseReportItem {
  id: string;
  dimensionValue: string; // e.g., "Class 10A", "Grade 10", "Hanoi School"
  totalPurchases: number;
  totalRevenue: number;
  averageOrderValue: number;
  courseBreakdown: CourseBreakdown[];
  period: string; // e.g., "2024-01", "2024-Q1"
}

export interface CourseBreakdown {
  courseType: string;
  purchases: number;
  revenue: number;
  percentage: number;
}

export interface PurchaseReportSummary {
  totalPurchases: number;
  totalRevenue: number;
  averageOrderValue: number;
  growthRate: number; // percentage
  topPerformer: string;
  periodComparison: {
    current: number;
    previous: number;
    change: number;
  };
}

export interface PurchaseReportData {
  summary: PurchaseReportSummary;
  items: PurchaseReportItem[];
  chartData: ChartDataPoint[];
}

export interface ChartDataPoint {
  name: string;
  value: number;
  revenue?: number;
  purchases?: number;
  [key: string]: any;
}

export interface ExportOptions {
  format: 'excel' | 'pdf';
  includeCharts: boolean;
  includeSummary: boolean;
  fileName?: string;
}
