import {
  ReportFilter,
  PurchaseReportData,
  PurchaseReportItem,
  PurchaseReportSummary,
  ChartDataPoint,
  ExportOptions
} from '@/types/analytics.types';

// Mock data generator for purchase reports
const generateMockPurchaseData = (filter: ReportFilter): PurchaseReportData => {
  const { dimension, courseType } = filter;

  // Generate mock items based on dimension
  const items: PurchaseReportItem[] = [];
  const dimensionValues = getDimensionValues(dimension);

  dimensionValues.forEach((value, index) => {
    const totalPurchases = Math.floor(Math.random() * 500) + 100;
    const totalRevenue = totalPurchases * (Math.random() * 1000000 + 500000);

    items.push({
      id: `item-${index}`,
      dimensionValue: value,
      totalPurchases,
      totalRevenue,
      averageOrderValue: totalRevenue / totalPurchases,
      courseBreakdown: generateCourseBreakdown(totalPurchases, totalRevenue, courseType),
      period: filter.dateRange.startDate,
    });
  });

  // Calculate summary
  const summary: PurchaseReportSummary = {
    totalPurchases: items.reduce((sum, item) => sum + item.totalPurchases, 0),
    totalRevenue: items.reduce((sum, item) => sum + item.totalRevenue, 0),
    averageOrderValue: 0,
    growthRate: Math.random() * 30 - 10, // Random growth between -10% and +20%
    topPerformer: items.sort((a, b) => b.totalRevenue - a.totalRevenue)[0]?.dimensionValue || 'N/A',
    periodComparison: {
      current: 0,
      previous: 0,
      change: 0,
    },
  };
  summary.averageOrderValue = summary.totalRevenue / summary.totalPurchases;
  summary.periodComparison.current = summary.totalRevenue;
  summary.periodComparison.previous = summary.totalRevenue / (1 + summary.growthRate / 100);
  summary.periodComparison.change = summary.growthRate;

  // Generate chart data
  const chartData: ChartDataPoint[] = items.map(item => ({
    name: item.dimensionValue,
    value: item.totalRevenue,
    revenue: item.totalRevenue,
    purchases: item.totalPurchases,
  }));

  return {
    summary,
    items,
    chartData,
  };
};

const getDimensionValues = (dimension: string): string[] => {
  switch (dimension) {
    case 'class':
      return ['Class 10A', 'Class 10B', 'Class 11A', 'Class 11B', 'Class 12A', 'Class 12B'];
    case 'grade':
      return ['Grade 10', 'Grade 11', 'Grade 12'];
    case 'school':
      return ['Hanoi International School', 'HCMC High School', 'Da Nang Academy', 'Can Tho School', 'Hai Phong College'];
    case 'province':
      return ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Can Tho', 'Hai Phong'];
    default:
      return [];
  }
};

const generateCourseBreakdown = (totalPurchases: number, totalRevenue: number, filterCourseType: string) => {
  const courses = filterCourseType === 'all'
    ? ['math', 'english', 'science', 'literature', 'social']
    : [filterCourseType];

  const breakdown = courses.map(courseType => {
    const purchases = Math.floor(totalPurchases / courses.length * (0.5 + Math.random()));
    const revenue = Math.floor(totalRevenue / courses.length * (0.5 + Math.random()));

    return {
      courseType,
      purchases,
      revenue,
      percentage: 0,
    };
  });

  // Calculate percentages
  const totalBreakdownRevenue = breakdown.reduce((sum, item) => sum + item.revenue, 0);
  breakdown.forEach(item => {
    item.percentage = (item.revenue / totalBreakdownRevenue) * 100;
  });

  return breakdown;
};

// Analytics Service
export const analyticsService = {
  // Get purchase reports based on filters
  async getPurchaseReports(filter: ReportFilter): Promise<PurchaseReportData> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    return generateMockPurchaseData(filter);
  },

  // Export report data
  async exportReport(data: PurchaseReportData, options: ExportOptions): Promise<void> {
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (options.format === 'excel') {
      // In a real implementation, use a library like xlsx or exceljs
      console.log('Exporting to Excel:', options.fileName);

      // Create a simple CSV for demonstration
      const csvContent = generateCSV(data, options);
      downloadFile(csvContent, options.fileName || 'purchase_report.csv', 'text/csv');
    } else if (options.format === 'pdf') {
      // In a real implementation, use a library like jspdf
      console.log('Exporting to PDF:', options.fileName);
      alert('PDF export will be available soon. For now, please use Excel export.');
    }
  },
};

// Helper function to generate CSV
const generateCSV = (data: PurchaseReportData, options: ExportOptions): string => {
  let csv = '';

  // Add summary if requested
  if (options.includeSummary) {
    csv += 'PURCHASE REPORT SUMMARY\n';
    csv += `Total Purchases,${data.summary.totalPurchases}\n`;
    csv += `Total Revenue,${data.summary.totalRevenue.toFixed(2)}\n`;
    csv += `Average Order Value,${data.summary.averageOrderValue.toFixed(2)}\n`;
    csv += `Growth Rate,${data.summary.growthRate.toFixed(2)}%\n`;
    csv += `Top Performer,${data.summary.topPerformer}\n`;
    csv += '\n';
  }

  // Add detailed data
  csv += 'Dimension,Total Purchases,Total Revenue,Average Order Value\n';
  data.items.forEach(item => {
    csv += `${item.dimensionValue},${item.totalPurchases},${item.totalRevenue.toFixed(2)},${item.averageOrderValue.toFixed(2)}\n`;
  });

  return csv;
};

// Helper function to download file
const downloadFile = (content: string, fileName: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export default analyticsService;
