/**
 * Teaching Assistant Types
 * Types for TA profile, dashboard, performance, and settings
 */

export interface TAProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  role: 'teaching_assistant';
  assignedClasses: string[];
  joinedDate: string;
  bio?: string;
  specializations?: string[];
  certifications?: string[];
  preferredLanguage: 'vi' | 'zh' | 'en';
}

export interface TADashboard {
  overview: {
    totalClasses: number;
    totalParents: number;
    activeParents: number;
    avgAttendanceRate: number;
    avgCompletionRate: number;
  };
  alerts: TAAlert[];
  recentActivities: TAActivity[];
  upcomingSessions: UpcomingSession[];
  performanceMetrics: {
    weeklyEngagement: number;
    monthlyEngagement: number;
    responseTime: number; // in hours
    satisfactionScore: number; // 0-100
  };
}

export interface TAAlert {
  id: string;
  type: 'low_attendance' | 'missed_deadline' | 'parent_concern' | 'system' | 'performance';
  severity: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionRequired?: boolean;
  relatedEntity?: {
    type: 'parent' | 'class' | 'course';
    id: string;
    name: string;
  };
}

export interface TAActivity {
  id: string;
  type: 'message_sent' | 'class_created' | 'content_posted' | 'parent_contacted' | 'report_generated';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface UpcomingSession {
  id: string;
  classId: string;
  className: string;
  date: string;
  time: string;
  location: string;
  topic: string;
  expectedAttendees: number;
}

export interface TAPerformance {
  period: {
    startDate: string;
    endDate: string;
  };
  metrics: {
    messagesHandled: number;
    avgResponseTime: number; // in hours
    parentsSatisfaction: number; // 0-100
    classesManaged: number;
    contentCreated: number;
    attendanceImprovement: number; // percentage change
  };
  classPerformance: Array<{
    classId: string;
    className: string;
    avgAttendance: number;
    avgCompletion: number;
    parentSatisfaction: number;
  }>;
  trends: {
    engagementTrend: Array<{ date: string; value: number }>;
    responseTrend: Array<{ date: string; value: number }>;
  };
}

export interface TASettings {
  notifications: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
    alertTypes: {
      lowAttendance: boolean;
      parentConcerns: boolean;
      missedDeadlines: boolean;
      systemUpdates: boolean;
    };
  };
  preferences: {
    language: 'vi' | 'zh' | 'en';
    timezone: string;
    dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
    theme: 'light' | 'dark' | 'auto';
  };
  workingHours: {
    enabled: boolean;
    schedule: Array<{
      day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
      startTime: string;
      endTime: string;
    }>;
  };
  autoResponses: {
    enabled: boolean;
    templates: Array<{
      id: string;
      trigger: string;
      response: string;
    }>;
  };
}

// API Request/Response Types
export interface GetTAProfileResponse {
  success: boolean;
  data: TAProfile;
  message?: string;
}

export interface UpdateTAProfileRequest {
  fullName?: string;
  phone?: string;
  bio?: string;
  specializations?: string[];
  certifications?: string[];
  avatarUrl?: string;
}

export interface UpdateTAProfileResponse {
  success: boolean;
  data: TAProfile;
  message?: string;
}

export interface GetTADashboardResponse {
  success: boolean;
  data: TADashboard;
  message?: string;
}

export interface GetTAPerformanceRequest {
  startDate?: string;
  endDate?: string;
  classId?: string;
}

export interface GetTAPerformanceResponse {
  success: boolean;
  data: TAPerformance;
  message?: string;
}

export interface GetTASettingsResponse {
  success: boolean;
  data: TASettings;
  message?: string;
}

export interface UpdateTASettingsRequest {
  notifications?: Partial<TASettings['notifications']>;
  preferences?: Partial<TASettings['preferences']>;
  workingHours?: Partial<TASettings['workingHours']>;
  autoResponses?: Partial<TASettings['autoResponses']>;
}

export interface UpdateTASettingsResponse {
  success: boolean;
  data: TASettings;
  message?: string;
}
