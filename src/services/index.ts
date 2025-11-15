/**
 * Services Index - Export all services for easy import
 */

// Core services
export { learnerService } from './learner.service';
export { default as parentService } from './parent.service';
export { default as taService } from './ta.service';
export { default as analyticsService } from './analytics.service';

// Re-export individual functions for convenience
export {
  getParentDetail,
  getParentActivities,
  getParentSegmentStats,
  filterParents,
} from './parent.service';

export {
  getProfile,
  updateProfile,
  getDashboard,
  getPerformance,
  getSettings,
  updateSettings,
  getActivities,
  markAlertRead,
} from './ta.service';

export {
  getPurchaseReports,
  getPurchaseDetails,
  exportReport,
  getDashboardAnalytics,
} from './analytics.service';

// Note: learnerService methods are accessed via learnerService.methodName()
