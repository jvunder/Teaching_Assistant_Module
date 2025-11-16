/**
 * Parent Types - Teaching Assistant Module
 *
 * Handles parent-specific functionality including:
 * - Parent segmentation (Active, At-Risk, VIP, etc.)
 * - Parent details and profiles
 * - Paid courses and certificates
 * - Parent filtering and analytics
 * - Parent activity tracking
 *
 * Note: Parents are adult learners in the education platform
 */

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Parent segment categories for targeted communication
 */
export enum ParentSegment {
  ACTIVE = 'active', // Regular attendance, high engagement
  NEW = 'new', // Recently enrolled (< 1 month)
  AT_RISK = 'at_risk', // Low attendance or engagement
  INACTIVE = 'inactive', // No activity in 30+ days
  VIP = 'vip', // Multiple courses, high completion
  POTENTIAL_DROPOUT = 'potential_dropout', // Missing classes, declining engagement
  HIGH_ACHIEVER = 'high_achiever', // Top performers
  NEEDS_SUPPORT = 'needs_support', // Struggling with content
  ENGAGED_PARENT = 'engaged_parent', // Active in messaging and activities
  PREMIUM = 'premium' // Paid for premium courses
}

/**
 * Parent engagement level
 */
export enum EngagementLevel {
  HIGH = 'high', // >80% attendance, active participation
  MEDIUM = 'medium', // 50-80% attendance
  LOW = 'low' // <50% attendance or inactive
}

/**
 * Parent account status
 */
export enum ParentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification'
}

/**
 * Course payment status
 */
export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

// ============================================================================
// INTERFACES - CORE TYPES
// ============================================================================

/**
 * Detailed parent profile (extended version)
 */
export interface ParentDetail {
  id: string;

  // Basic information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  avatarUrl?: string;

  // Location
  address?: string;
  city?: string;
  province?: string;
  country: string; // Default: 'Vietnam'

  // Children information
  children: {
    id: string;
    name: string;
    dateOfBirth: string;
    age: number;
    gender?: 'male' | 'female';
    grade?: string;
    school?: string;
  }[];

  // Account info
  registeredAt: string;
  lastLoginAt: string;
  status: ParentStatus;
  emailVerified: boolean;
  phoneVerified: boolean;

  // Segmentation
  segment: ParentSegment;
  engagementLevel: EngagementLevel;
  tags: string[]; // e.g., ['working-parent', 'single-parent', 'first-time-parent']

  // Communication preferences
  language: 'vi' | 'zh';
  preferredChannel: 'email' | 'sms' | 'app' | 'zalo';
  timezone: string; // e.g., 'Asia/Ho_Chi_Minh'
  communicationConsent: {
    marketing: boolean;
    newsletter: boolean;
    classUpdates: boolean;
    promotions: boolean;
  };

  // Learning profile
  enrolledClasses: ParentStudent[];
  totalClassesEnrolled: number;
  totalClassesCompleted: number;
  totalLearningHours: number;
  averageAttendance: number; // 0-100
  averageCompletion: number; // 0-100

  // Paid courses
  paidCourses: PaidCourse[];
  totalSpent: number; // VND
  lifetimeValue: number; // VND

  // Certificates
  certificates: Certificate[];
  totalCertificates: number;

  // Engagement metrics
  lastActive: string;
  activeDays: number; // Total days active on platform
  messagesReceived: number;
  messagesSent: number;
  surveyResponses: number;

  // Notes
  notes?: string; // TA's internal notes
  privateNotes?: string; // Private notes not visible to parent

  // Metadata
  createdAt: string;
  updatedAt: string;
  updatedBy?: string; // TA ID who last updated
}

/**
 * Parent's enrollment in a specific class
 */
export interface ParentStudent {
  id: string;
  parentId: string;
  classId: string;
  className: string;
  classTopic: string;

  // Enrollment details
  enrollmentDate: string;
  enrollmentStatus: 'active' | 'inactive' | 'dropped' | 'completed';
  isPaid: boolean;
  paymentAmount?: number;
  paymentStatus?: PaymentStatus;

  // Progress
  sessionsAttended: number;
  totalSessions: number;
  attendanceRate: number; // 0-100
  completionRate: number; // 0-100
  currentGrade?: string;

  // Last activity
  lastAttendedDate?: string;
  lastActivityDate?: string;
}

/**
 * Paid course enrollment
 */
export interface PaidCourse {
  id: string;
  courseId: string;
  courseName: string;
  courseType: 'live' | 'recorded' | 'hybrid';

  // Payment
  price: number; // VND
  discountApplied?: number; // VND
  finalPrice: number; // VND
  paymentStatus: PaymentStatus;
  paymentDate?: string;
  paymentMethod?: 'bank_transfer' | 'credit_card' | 'momo' | 'zalopay';
  transactionId?: string;

  // Enrollment
  enrolledAt: string;
  expiresAt?: string; // For time-limited courses
  accessStatus: 'active' | 'expired' | 'refunded';

  // Progress
  completionRate: number; // 0-100
  certificateIssued: boolean;
  certificateId?: string;
}

/**
 * Certificate earned by parent
 */
export interface Certificate {
  id: string;
  parentId: string;
  classId: string;
  className: string;

  // Certificate details
  title: string;
  description: string;
  certificateUrl: string; // PDF or image URL
  certificateNumber: string; // Unique identifier

  // Issuance
  issuedAt: string;
  issuedBy: string; // TA or teacher ID
  validUntil?: string; // For renewable certificates

  // Verification
  verificationCode: string; // For external verification
  isVerified: boolean;

  // Metadata
  templateId?: string;
  metadata?: Record<string, any>; // Additional certificate data
}

/**
 * Filter conditions for parent segmentation
 */
export interface ParentFilterCondition {
  // Demographics
  city?: string[];
  province?: string[];
  childrenAgeRange?: {
    min: number;
    max: number;
  };

  // Segmentation
  segment?: ParentSegment[];
  engagementLevel?: EngagementLevel[];
  tags?: string[];

  // Class enrollment
  enrolledInClass?: string[]; // Class IDs
  notEnrolledInClass?: string[]; // Exclude these classes
  classStatus?: ('active' | 'completed' | 'dropped')[];

  // Activity
  lastActiveFrom?: string; // ISO 8601
  lastActiveTo?: string;
  attendanceRate?: {
    min: number;
    max: number;
  };

  // Payment
  hasPaidCourses?: boolean;
  totalSpentMin?: number;
  totalSpentMax?: number;

  // Communication
  language?: ('vi' | 'zh')[];
  preferredChannel?: ('email' | 'sms' | 'app' | 'zalo')[];

  // Advanced
  customQuery?: string; // For complex queries
}

/**
 * Statistics for a parent segment
 */
export interface ParentSegmentStats {
  segment: ParentSegment;
  count: number;
  percentage: number;

  // Aggregated metrics
  averageAttendance: number;
  averageCompletion: number;
  averageEngagement: number;

  // Financial
  totalRevenue: number;
  averageSpending: number;

  // Trend
  trend: 'growing' | 'stable' | 'declining';
  changeFromLastMonth: number; // Percentage
}

/**
 * Parent activity log entry
 */
export interface ParentActivity {
  id: string;
  parentId: string;
  activityType:
    | 'login'
    | 'class_attended'
    | 'assignment_submitted'
    | 'message_sent'
    | 'message_received'
    | 'survey_completed'
    | 'course_enrolled'
    | 'certificate_earned'
    | 'payment_made'
    | 'profile_updated';

  // Activity details
  description: string;
  metadata?: Record<string, any>; // Additional activity data

  // Related entities
  relatedClassId?: string;
  relatedMessageId?: string;
  relatedSurveyId?: string;

  // Timestamp
  timestamp: string;

  // Source
  source: 'web' | 'mobile' | 'api' | 'system';
  ipAddress?: string;
  userAgent?: string;
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

/**
 * Request to get list of parents
 */
export interface GetParentsRequest {
  page?: number;
  pageSize?: number;
  filter?: ParentFilterCondition;
  search?: string; // Search in name, email, phone
  sortBy?: 'name' | 'lastActive' | 'attendanceRate' | 'registeredAt';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Response for get parents
 */
export interface GetParentsResponse {
  parents: ParentDetail[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  statistics: {
    totalActive: number;
    totalInactive: number;
    averageEngagement: number;
  };
}

/**
 * Request to get parent by ID
 */
export interface GetParentRequest {
  parentId: string;
  includeClasses?: boolean;
  includeCertificates?: boolean;
  includeActivities?: boolean;
}

/**
 * Response for get parent
 */
export interface GetParentResponse {
  parent: ParentDetail;
  recentActivities?: ParentActivity[];
}

/**
 * Request to update parent information
 */
export interface UpdateParentRequest {
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  language?: 'vi' | 'zh';
  tags?: string[];
  notes?: string;
  privateNotes?: string;
  communicationConsent?: ParentDetail['communicationConsent'];
}

/**
 * Request to segment parents
 */
export interface SegmentParentsRequest {
  filter: ParentFilterCondition;
  segmentName: string;
  saveSegment?: boolean; // Save for future use
}

/**
 * Response for segment parents
 */
export interface SegmentParentsResponse {
  segmentId?: string; // If saved
  segmentName: string;
  parentCount: number;
  parents: {
    id: string;
    name: string;
    email: string;
    segment: ParentSegment;
    engagementLevel: EngagementLevel;
  }[];
  statistics: {
    bySegment: ParentSegmentStats[];
    byEngagement: {
      level: EngagementLevel;
      count: number;
      percentage: number;
    }[];
  };
}

/**
 * Request to get parent activities
 */
export interface GetParentActivitiesRequest {
  parentId: string;
  page?: number;
  pageSize?: number;
  activityTypes?: ParentActivity['activityType'][];
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Response for get parent activities
 */
export interface GetParentActivitiesResponse {
  activities: ParentActivity[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Request to add note to parent
 */
export interface AddParentNoteRequest {
  parentId: string;
  note: string;
  isPrivate?: boolean;
}

/**
 * Request to enroll parent in class
 */
export interface EnrollParentRequest {
  parentId: string;
  classId: string;
  isPaid?: boolean;
  paymentAmount?: number;
  paymentMethod?: string;
  notes?: string;
}

/**
 * Response for enroll parent
 */
export interface EnrollParentResponse {
  enrollmentId: string;
  parentId: string;
  classId: string;
  enrollmentDate: string;
  success: boolean;
  message?: string;
}
