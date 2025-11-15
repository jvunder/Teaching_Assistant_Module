// Teaching Assistant Profile Types

export interface TAProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: 'teacher' | 'assistant' | 'admin';
  bio?: string;
  school?: string;
  department?: string;
  joinedDate: string;
  status: 'active' | 'inactive';
}

export interface AssignedClass {
  id: string;
  className: string;
  grade: string;
  subject: string;
  studentCount: number;
  parentCount: number;
  schedule: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface PerformanceMetrics {
  messagesCount: {
    total: number;
    thisMonth: number;
    growth: number;
  };
  ticketsResolved: {
    total: number;
    thisMonth: number;
    averageResponseTime: number; // in minutes
  };
  classesManaged: {
    total: number;
    active: number;
  };
  satisfactionRate: {
    rating: number; // 0-5
    totalReviews: number;
  };
  activityScore: {
    score: number; // 0-100
    trend: 'up' | 'down' | 'stable';
  };
}

export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    messages: boolean;
    tickets: boolean;
    announcements: boolean;
  };
  preferences: {
    language: 'vi' | 'en';
    theme: 'light' | 'dark' | 'auto';
    timezone: string;
  };
  privacy: {
    showEmail: boolean;
    showPhone: boolean;
    showProfile: boolean;
  };
}

export interface UpdateProfileRequest {
  fullName?: string;
  phone?: string;
  bio?: string;
  school?: string;
  department?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateSettingsRequest {
  notifications?: Partial<UserSettings['notifications']>;
  preferences?: Partial<UserSettings['preferences']>;
  privacy?: Partial<UserSettings['privacy']>;
}
