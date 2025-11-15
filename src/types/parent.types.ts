/**
 * Parent Types - Teaching Assistant Module
 * Types for parent/learner management and tracking
 */

export interface Parent {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  childrenCount: number;
  childrenAges: string;
  enrolledClasses: string[];
  enrollmentDate: string;
  attendanceRate: number;
  completionRate: number;
  lastActive: string;
  coursesCompleted: number;
  totalLearningHours: number;
  preferredLanguage: 'vi' | 'zh' | 'en';
  communicationPreference: 'email' | 'sms' | 'app';
  tags: string[];
  notes?: string;
  avatarUrl?: string;
  purchaseHistory?: PurchaseRecord[];
  segment?: ParentSegment;
}

export interface PurchaseRecord {
  id: string;
  parentId: string;
  courseId: string;
  courseName: string;
  amount: number;
  currency: 'VND' | 'USD';
  purchaseDate: string;
  paymentMethod: 'card' | 'bank_transfer' | 'cash' | 'ewallet';
  status: 'pending' | 'completed' | 'refunded';
}

export interface ParentActivity {
  id: string;
  parentId: string;
  type: 'login' | 'course_access' | 'message_sent' | 'assignment_submit' | 'purchase' | 'attendance';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface ParentSegment {
  id: string;
  name: string;
  criteria: {
    engagementLevel?: 'High' | 'Medium' | 'Low';
    attendanceRange?: { min: number; max: number };
    completionRange?: { min: number; max: number };
    tags?: string[];
  };
}

export interface ParentSegmentStats {
  totalParents: number;
  segments: Array<{
    segment: string;
    count: number;
    percentage: number;
    avgAttendance: number;
    avgCompletion: number;
  }>;
}

// API Request/Response Types
export interface GetParentDetailRequest {
  parentId: string;
}

export interface GetParentDetailResponse {
  success: boolean;
  data: Parent;
  message?: string;
}

export interface GetParentActivitiesRequest {
  parentId: string;
  page?: number;
  limit?: number;
  type?: ParentActivity['type'];
  startDate?: string;
  endDate?: string;
}

export interface GetParentActivitiesResponse {
  success: boolean;
  data: {
    activities: ParentActivity[];
    total: number;
    page: number;
    limit: number;
  };
  message?: string;
}

export interface GetParentSegmentStatsResponse {
  success: boolean;
  data: ParentSegmentStats;
  message?: string;
}

export interface FilterParentsRequest {
  classes?: string[];
  engagementLevel?: 'High' | 'Medium' | 'Low';
  tags?: string[];
  attendanceRange?: { min: number; max: number };
  completionRange?: { min: number; max: number };
  language?: 'vi' | 'zh' | 'en';
  search?: string;
  page?: number;
  limit?: number;
}

export interface FilterParentsResponse {
  success: boolean;
  data: {
    parents: Parent[];
    total: number;
    page: number;
    limit: number;
  };
  message?: string;
}
