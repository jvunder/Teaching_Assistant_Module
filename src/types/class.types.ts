/**
 * Class Types - Teaching Assistant Module
 *
 * Types for class management, parent relationships, and class statistics
 */

// ===== CLASS TYPES =====

export interface Class {
  id: string;
  name: string;
  grade: string;
  subject: string;
  schoolId: string;
  teacherId: string;
  teacherName?: string;
  studentCount: number;
  parentCount: number;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface ClassDetail extends Class {
  description?: string;
  schedule?: {
    day: string;
    time: string;
    location: string;
  };
  students?: Student[];
  parents?: Parent[];
}

export interface Student {
  id: string;
  fullName: string;
  grade: string;
  parentIds: string[];
  avatarUrl?: string;
  status: 'active' | 'inactive';
}

// ===== CLASS REQUEST/RESPONSE TYPES =====

export interface GetClassesRequest {
  page?: number;
  limit?: number;
  search?: string;
  grade?: string;
  subject?: string;
  status?: 'active' | 'inactive' | 'archived';
  teacherId?: string;
}

export interface GetClassesResponse {
  success: boolean;
  data: {
    classes: Class[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
}

export interface GetClassDetailResponse {
  success: boolean;
  data: ClassDetail;
  message?: string;
}

// ===== CLASS STATISTICS =====

export interface ClassStats {
  classId: string;
  className: string;

  // Enrollment
  totalStudents: number;
  activeStudents: number;
  totalParents: number;
  activeParents: number;

  // Engagement
  averageAttendance: number;
  averageParticipation: number;

  // Communication
  messagesSent: number;
  messagesReceived: number;
  unreadMessages: number;

  // Parent approval
  pendingApprovals: number;
  approvedParents: number;
  rejectedParents: number;

  // Timeline
  lastActivityDate?: string;
}

export interface GetClassStatsResponse {
  success: boolean;
  data: ClassStats;
  message?: string;
}
