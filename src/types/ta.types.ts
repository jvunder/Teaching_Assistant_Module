/**
 * Teaching Assistant (TA) Types
 *
 * Handles TA-specific functionality including:
 * - TA profile and permissions
 * - Dashboard and KPIs
 * - Performance metrics
 * - Tasks and alerts
 * - TA settings and preferences
 */

// ============================================================================
// ENUMS
// ============================================================================

/**
 * TA role/level in the system
 */
export enum TARole {
  JUNIOR_TA = 'junior_ta', // Limited permissions
  SENIOR_TA = 'senior_ta', // Full TA permissions
  LEAD_TA = 'lead_ta', // Manages other TAs
  ADMIN = 'admin' // Full system access
}

/**
 * TA permissions for different actions
 */
export enum TAPermission {
  // Class management
  VIEW_CLASSES = 'view_classes',
  CREATE_CLASSES = 'create_classes',
  EDIT_CLASSES = 'edit_classes',
  DELETE_CLASSES = 'delete_classes',

  // Parent management
  VIEW_PARENTS = 'view_parents',
  EDIT_PARENTS = 'edit_parents',
  DELETE_PARENTS = 'delete_parents',
  EXPORT_PARENT_DATA = 'export_parent_data',

  // Messaging
  SEND_MESSAGES = 'send_messages',
  SEND_BULK_MESSAGES = 'send_bulk_messages',
  VIEW_MESSAGE_HISTORY = 'view_message_history',

  // Content
  CREATE_CONTENT = 'create_content',
  PUBLISH_CONTENT = 'publish_content',
  DELETE_CONTENT = 'delete_content',
  MODERATE_COMMENTS = 'moderate_comments',

  // Analytics
  VIEW_ANALYTICS = 'view_analytics',
  EXPORT_REPORTS = 'export_reports',
  VIEW_FINANCIAL_DATA = 'view_financial_data',

  // Surveys
  CREATE_SURVEYS = 'create_surveys',
  VIEW_SURVEY_RESULTS = 'view_survey_results',

  // System
  MANAGE_TAS = 'manage_tas',
  MANAGE_SETTINGS = 'manage_settings',
  VIEW_AUDIT_LOGS = 'view_audit_logs'
}

/**
 * TA status
 */
export enum TAStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ON_LEAVE = 'on_leave',
  SUSPENDED = 'suspended'
}

/**
 * Task priority level
 */
export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

/**
 * Task status
 */
export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  OVERDUE = 'overdue'
}

/**
 * Alert type
 */
export enum AlertType {
  LOW_ATTENDANCE = 'low_attendance',
  AT_RISK_PARENT = 'at_risk_parent',
  MESSAGE_QUOTA_LOW = 'message_quota_low',
  SURVEY_RESPONSE = 'survey_response',
  CONTENT_COMMENT = 'content_comment',
  CLASS_FULL = 'class_full',
  PAYMENT_RECEIVED = 'payment_received',
  SYSTEM_UPDATE = 'system_update',
  DEADLINE_APPROACHING = 'deadline_approaching'
}

// ============================================================================
// INTERFACES - CORE TYPES
// ============================================================================

/**
 * Teaching Assistant profile
 */
export interface TAProfile {
  id: string;

  // Basic info
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  dateOfBirth?: string;

  // Employment
  employeeId?: string;
  role: TARole;
  department?: string;
  hireDate: string;
  status: TAStatus;

  // Permissions
  permissions: TAPermission[];
  customPermissions?: string[]; // Additional custom permissions

  // Assigned classes
  assignedClassIds: string[];
  totalClassesManaged: number;
  totalParentsManaged: number;

  // Contact preferences
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
    desktop: boolean;
  };

  // Work schedule
  workSchedule?: {
    monday?: { start: string; end: string };
    tuesday?: { start: string; end: string };
    wednesday?: { start: string; end: string };
    thursday?: { start: string; end: string };
    friday?: { start: string; end: string };
    saturday?: { start: string; end: string };
    sunday?: { start: string; end: string };
  };

  // Performance
  performanceRating?: number; // 0-5
  totalMessagesHandled: number;
  averageResponseTime: number; // minutes
  satisfactionScore?: number; // 0-100

  // Metadata
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;

  // Settings
  language: 'vi' | 'zh' | 'en';
  timezone: string;
  theme?: 'light' | 'dark' | 'auto';
}

/**
 * TA Dashboard overview data
 */
export interface TADashboard {
  taId: string;
  generatedAt: string;

  // Quick stats
  quickStats: {
    totalClasses: number;
    totalParents: number;
    totalMessagesToday: number;
    pendingTasks: number;
    unreadMessages: number;
    activeAlerts: number;
  };

  // KPIs
  kpis: TAKPIs;

  // Recent activity
  recentActivity: {
    type: 'message_sent' | 'class_updated' | 'content_published' | 'survey_created' | 'parent_enrolled';
    description: string;
    timestamp: string;
    relatedId?: string;
  }[];

  // Upcoming tasks
  upcomingTasks: TATask[];

  // Active alerts
  activeAlerts: TAAlert[];

  // Class performance summary
  classPerformanceSummary: {
    classId: string;
    className: string;
    enrolled: number;
    averageAttendance: number;
    trend: 'up' | 'down' | 'stable';
  }[];

  // Message quota status
  messageQuota: {
    dailyUsed: number;
    dailyLimit: number;
    monthlyUsed: number;
    monthlyLimit: number;
  };
}

/**
 * TA Key Performance Indicators
 */
export interface TAKPIs {
  // Engagement metrics
  parentEngagement: {
    current: number; // Average engagement score
    target: number;
    achievement: number; // Percentage of target
    trend: 'improving' | 'stable' | 'declining';
  };

  // Response metrics
  averageResponseTime: {
    current: number; // minutes
    target: number;
    achievement: number;
    trend: 'improving' | 'stable' | 'declining';
  };

  // Attendance metrics
  classAttendance: {
    current: number; // Average attendance rate
    target: number;
    achievement: number;
    trend: 'improving' | 'stable' | 'declining';
  };

  // Message metrics
  messageEffectiveness: {
    readRate: number; // Percentage
    responseRate: number; // Percentage
    target: number;
    achievement: number;
  };

  // Content metrics
  contentPerformance: {
    totalViews: number;
    averageEngagement: number;
    topPerformingContentId?: string;
  };

  // Parent satisfaction
  satisfactionScore: {
    current: number; // 0-100
    target: number;
    achievement: number;
    totalResponses: number;
  };

  // Overall performance
  overallScore: number; // 0-100, weighted average of all KPIs
  rank?: number; // Rank among all TAs
  totalTAs?: number;
}

/**
 * TA task/to-do item
 */
export interface TATask {
  id: string;
  taId: string;

  // Task details
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;

  // Related entities
  relatedType?: 'class' | 'parent' | 'message' | 'content' | 'survey';
  relatedId?: string;
  relatedName?: string;

  // Due date
  dueDate?: string;
  isOverdue: boolean;

  // Assignment
  assignedBy?: string; // TA ID or system
  assignedAt: string;

  // Completion
  completedAt?: string;
  completedBy?: string;

  // Notes
  notes?: string;

  // Recurrence
  isRecurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly';

  // Metadata
  createdAt: string;
  updatedAt: string;
}

/**
 * TA alert/notification
 */
export interface TAAlert {
  id: string;
  taId: string;

  // Alert details
  type: AlertType;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';

  // Related entities
  relatedType?: 'class' | 'parent' | 'message' | 'content' | 'survey' | 'system';
  relatedId?: string;

  // Action
  actionUrl?: string; // URL to navigate to
  actionLabel?: string; // e.g., "View Class", "Respond Now"

  // Status
  isRead: boolean;
  readAt?: string;
  isDismissed: boolean;
  dismissedAt?: string;

  // Metadata
  createdAt: string;
  expiresAt?: string; // Auto-dismiss after this time
}

/**
 * TA performance metrics over time
 */
export interface TAPerformanceMetrics {
  taId: string;
  periodStart: string;
  periodEnd: string;

  // Message metrics
  messages: {
    sent: number;
    delivered: number;
    read: number;
    replied: number;
    averageResponseTime: number; // minutes
  };

  // Class metrics
  classes: {
    totalManaged: number;
    averageAttendance: number;
    averageCompletion: number;
    parentsEnrolled: number;
  };

  // Content metrics
  content: {
    created: number;
    published: number;
    totalViews: number;
    totalEngagement: number;
  };

  // Parent metrics
  parents: {
    totalManaged: number;
    activePercentage: number;
    atRiskCount: number;
    satisfactionScore: number;
  };

  // Efficiency metrics
  efficiency: {
    tasksCompleted: number;
    tasksOnTime: number;
    averageTaskCompletionTime: number; // hours
    workload: 'low' | 'normal' | 'high' | 'overloaded';
  };

  // Quality metrics
  quality: {
    parentSatisfactionScore: number; // 0-100
    contentQualityScore: number; // 0-100
    communicationEffectiveness: number; // 0-100
  };
}

/**
 * TA settings and preferences
 */
export interface TASettings {
  taId: string;

  // Display preferences
  display: {
    theme: 'light' | 'dark' | 'auto';
    language: 'vi' | 'zh' | 'en';
    timezone: string;
    dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
    timeFormat: '12h' | '24h';
  };

  // Notification settings
  notifications: {
    email: {
      enabled: boolean;
      newMessage: boolean;
      taskReminders: boolean;
      classUpdates: boolean;
      alerts: boolean;
      dailyDigest: boolean;
      weeklyReport: boolean;
    };
    push: {
      enabled: boolean;
      newMessage: boolean;
      taskReminders: boolean;
      alerts: boolean;
    };
    sms: {
      enabled: boolean;
      urgentOnly: boolean;
    };
  };

  // Dashboard customization
  dashboard: {
    defaultView: 'overview' | 'classes' | 'messages' | 'analytics';
    widgetsEnabled: {
      quickStats: boolean;
      recentActivity: boolean;
      upcomingTasks: boolean;
      classPerformance: boolean;
      messageQuota: boolean;
      kpis: boolean;
    };
    refreshInterval: number; // seconds
  };

  // Work preferences
  work: {
    autoAssignClasses: boolean;
    maxClassesPerTA: number;
    workingHours: {
      start: string; // HH:mm
      end: string; // HH:mm
    };
    breakReminders: boolean;
  };

  // Privacy
  privacy: {
    showOnlineStatus: boolean;
    allowParentContact: boolean;
    sharePerformanceData: boolean;
  };

  // Metadata
  updatedAt: string;
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

/**
 * Request to get TA profile
 */
export interface GetTAProfileRequest {
  taId?: string; // If not provided, returns current user's profile
  includePermissions?: boolean;
  includeMetrics?: boolean;
}

/**
 * Response for get TA profile
 */
export interface GetTAProfileResponse {
  profile: TAProfile;
  metrics?: TAPerformanceMetrics;
}

/**
 * Request to update TA profile
 */
export interface UpdateTAProfileRequest {
  fullName?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  workSchedule?: TAProfile['workSchedule'];
  notificationPreferences?: TAProfile['notificationPreferences'];
  language?: 'vi' | 'zh' | 'en';
  timezone?: string;
  theme?: 'light' | 'dark' | 'auto';
}

/**
 * Request to get TA dashboard
 */
export interface GetTADashboardRequest {
  taId?: string; // If not provided, returns current user's dashboard
  dateRange?: {
    from: string;
    to: string;
  };
}

/**
 * Response for get TA dashboard
 */
export interface GetTADashboardResponse {
  dashboard: TADashboard;
}

/**
 * Request to create task
 */
export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string;
  relatedType?: TATask['relatedType'];
  relatedId?: string;
  assignToTaId?: string; // If not provided, assigns to current user
  isRecurring?: boolean;
  recurrencePattern?: TATask['recurrencePattern'];
}

/**
 * Request to update task
 */
export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string;
  notes?: string;
}

/**
 * Request to get tasks
 */
export interface GetTasksRequest {
  taId?: string;
  status?: TaskStatus[];
  priority?: TaskPriority[];
  dueFrom?: string;
  dueTo?: string;
  isOverdue?: boolean;
  page?: number;
  pageSize?: number;
}

/**
 * Response for get tasks
 */
export interface GetTasksResponse {
  tasks: TATask[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  statistics: {
    totalTodo: number;
    totalInProgress: number;
    totalCompleted: number;
    totalOverdue: number;
  };
}

/**
 * Request to get alerts
 */
export interface GetAlertsRequest {
  taId?: string;
  type?: AlertType[];
  severity?: TAAlert['severity'][];
  isRead?: boolean;
  isDismissed?: boolean;
  page?: number;
  pageSize?: number;
}

/**
 * Response for get alerts
 */
export interface GetAlertsResponse {
  alerts: TAAlert[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  unreadCount: number;
}

/**
 * Request to mark alert as read
 */
export interface MarkAlertRequest {
  alertId: string;
  action: 'read' | 'dismiss' | 'undismiss';
}

/**
 * Request to update TA settings
 */
export interface UpdateTASettingsRequest {
  display?: Partial<TASettings['display']>;
  notifications?: Partial<TASettings['notifications']>;
  dashboard?: Partial<TASettings['dashboard']>;
  work?: Partial<TASettings['work']>;
  privacy?: Partial<TASettings['privacy']>;
}

/**
 * Request to get TA performance metrics
 */
export interface GetTAPerformanceRequest {
  taId?: string;
  periodStart: string;
  periodEnd: string;
  compareWithPrevious?: boolean; // Compare with previous period
}

/**
 * Response for get TA performance
 */
export interface GetTAPerformanceResponse {
  current: TAPerformanceMetrics;
  previous?: TAPerformanceMetrics;
  comparison?: {
    messagesChange: number; // Percentage
    attendanceChange: number;
    satisfactionChange: number;
    efficiencyChange: number;
  };
}
