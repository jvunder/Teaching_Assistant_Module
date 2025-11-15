/**
 * Class Types - Teaching Assistant Module
 *
 * Handles all class-related functionality including:
 * - Class management
 * - Student/Parent (learner) management
 * - Class statistics and performance
 * - Assignments and attendance
 * - Parent learning progress tracking
 *
 * Note: In this adult education context, "students" are parents taking courses
 */

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Status of a class
 */
export enum ClassStatus {
  DRAFT = 'draft',
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  ARCHIVED = 'archived'
}

/**
 * Class topic categories
 */
export enum ClassTopic {
  EARLY_CHILDHOOD = 'early_childhood', // 0-3 tu’i
  PRESCHOOL = 'preschool', // 3-6 tu’i
  SCHOOL_AGE = 'school_age', // 6-12 tu’i
  ADOLESCENT = 'adolescent', // 12-18 tu’i
  GENERAL_PARENTING = 'general_parenting',
  CHILD_PSYCHOLOGY = 'child_psychology',
  EDUCATION_METHODS = 'education_methods',
  HEALTH_NUTRITION = 'health_nutrition',
  SPECIAL_NEEDS = 'special_needs'
}

/**
 * Class level/difficulty
 */
export enum ClassLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

/**
 * Attendance status
 */
export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused'
}

/**
 * Assignment status
 */
export enum AssignmentStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  SUBMITTED = 'submitted',
  GRADED = 'graded',
  OVERDUE = 'overdue'
}

// ============================================================================
// INTERFACES - CORE TYPES
// ============================================================================

/**
 * Basic class information
 */
export interface Class {
  id: string;
  name: string;
  code: string; // e.g., "NC-0-3-001"
  topic: ClassTopic;
  level: ClassLevel;
  status: ClassStatus;

  // Description
  description: string;
  objectives: string[];

  // Schedule
  schedule: {
    day: string; // e.g., "ThÈ 3, ThÈ 5"
    time: string; // e.g., "19:00-21:00"
    timezone: string; // e.g., "Asia/Ho_Chi_Minh"
    location: string;
    locationUrl?: string; // Google Maps link
  };

  // Dates
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  totalSessions: number;
  completedSessions: number;

  // Enrollment
  capacity: number;
  enrolled: number;
  availableSlots: number;

  // Teacher/TA
  teacherId: string;
  teacherName: string;
  taId?: string; // Teaching Assistant ID
  taName?: string;

  // School/Center info
  schoolId: string;
  schoolName: string;
  grade?: string; // Optional grade level

  // Statistics
  studentCount: number;
  parentCount: number;
  averageAttendance: number; // 0-100
  averageCompletion: number; // 0-100

  // Settings
  language: 'vi' | 'zh';
  isPublic: boolean; // Visible to parents for enrollment
  allowLateEnrollment: boolean;

  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;

  // Tags
  tags: string[]; // e.g., ['weekend', 'online', 'popular']

  // Thumbnail
  thumbnailUrl?: string;
}

/**
 * Student (Parent) in a class
 * Note: Students are adult learners (parents) in this context
 */
export interface Student {
  id: string;
  parentId: string; // Link to Parent entity
  classId: string;

  // Basic info
  fullName: string;
  email: string;
  phone: string;
  age: number;

  // Children information
  childrenCount: number;
  childrenAges: string; // e.g., "3 tu’i, 5 tu’i"

  // Enrollment
  enrollmentDate: string;
  enrollmentStatus: 'active' | 'inactive' | 'dropped' | 'completed';

  // Progress
  sessionsAttended: number;
  totalSessions: number;
  attendanceRate: number; // 0-100
  completionRate: number; // 0-100
  averageScore: number; // 0-100

  // Engagement
  lastActive: string;
  participationScore: number; // 0-100
  messagesReceived: number;
  messagesSent: number;

  // Performance
  assignmentsCompleted: number;
  totalAssignments: number;
  grade?: string; // "Xu•t sØc", "Giœi", "Kh·", "Trung bÏnh"

  // Communication
  preferredLanguage: 'vi' | 'zh';
  communicationPreference: 'email' | 'sms' | 'app';

  // Metadata
  notes?: string; // TA's notes
  tags: string[]; // e.g., ["Active", "Beginner", "Working Parent"]
  avatarUrl?: string;
}

/**
 * Basic parent information (referenced in Student)
 */
export interface Parent {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  language: 'vi' | 'zh';

  // Children
  children: {
    name: string;
    age: number;
    grade?: string;
  }[];

  // Classes enrolled
  enrolledClassIds: string[];
  totalClassesCompleted: number;

  // Account info
  registeredAt: string;
  lastLoginAt: string;
  status: 'active' | 'inactive' | 'suspended';
}

/**
 * Parent's learning progress in a specific class
 */
export interface ParentLearningProgress {
  parentId: string;
  classId: string;
  className: string;

  // Attendance
  sessionsAttended: number;
  totalSessions: number;
  attendanceRate: number; // 0-100
  attendanceHistory: {
    sessionDate: string;
    status: AttendanceStatus;
    notes?: string;
  }[];

  // Assignments
  assignmentsCompleted: number;
  totalAssignments: number;
  completionRate: number; // 0-100
  averageScore: number; // 0-100

  // Engagement
  participationScore: number; // 0-100
  lastActivity: string;
  activeDays: number; // Days active in the class

  // Performance
  overallProgress: number; // 0-100
  grade?: string; // "Xu•t sØc", "Giœi", "Kh·", "Trung bÏnh"
  certificateEligible: boolean;

  // Milestones
  milestones: {
    name: string;
    achievedAt?: string;
    progress: number; // 0-100
  }[];

  // Last updated
  updatedAt: string;
}

/**
 * Detailed class information with all relationships
 */
export interface ClassDetail extends Class {
  // Students
  students: Student[];

  // Sessions
  sessions: {
    id: string;
    sessionNumber: number;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    attendanceCount: number;
    materials?: {
      title: string;
      url: string;
      type: 'pdf' | 'video' | 'link';
    }[];
  }[];

  // Assignments
  assignments: ClassAssignment[];

  // Materials
  materials: {
    id: string;
    title: string;
    type: 'pdf' | 'video' | 'link' | 'document';
    url: string;
    uploadedAt: string;
    downloadCount: number;
  }[];

  // Announcements
  announcements: {
    id: string;
    title: string;
    content: string;
    postedAt: string;
    postedBy: string;
    isPinned: boolean;
  }[];
}

/**
 * Class statistics for analytics
 */
export interface ClassStats {
  classId: string;
  className: string;

  // Enrollment
  totalLearners: number;
  activeLearners: number;
  inactiveLearners: number;
  dropoutRate: number; // Percentage

  // Attendance
  averageAttendance: number; // Percentage
  attendanceTrend: {
    date: string;
    rate: number;
  }[];

  // Performance
  averageCompletionRate: number; // Percentage
  averageScore: number; // 0-100
  performanceDistribution: {
    grade: string;
    count: number;
    percentage: number;
  }[];

  // Engagement
  averageParticipation: number; // 0-100
  messagesSent: number;
  messagesReceived: number;
  totalActiveDays: number;

  // Content
  totalSessions: number;
  completedSessions: number;
  totalAssignments: number;
  assignmentCompletionRate: number;

  // Generated at
  generatedAt: string;
}

/**
 * Class performance metrics
 */
export interface ClassPerformance {
  classId: string;

  // Compared to other classes
  performanceRank: number; // Out of total classes
  totalClasses: number;

  // Key metrics
  metrics: {
    attendance: {
      current: number;
      average: number; // Average across all classes
      trend: 'improving' | 'stable' | 'declining';
    };
    completion: {
      current: number;
      average: number;
      trend: 'improving' | 'stable' | 'declining';
    };
    engagement: {
      current: number;
      average: number;
      trend: 'improving' | 'stable' | 'declining';
    };
  };

  // Top performers
  topPerformers: {
    parentId: string;
    parentName: string;
    score: number;
    rank: number;
  }[];

  // At-risk learners
  atRiskLearners: {
    parentId: string;
    parentName: string;
    attendanceRate: number;
    lastActive: string;
    riskLevel: 'high' | 'medium' | 'low';
  }[];
}

/**
 * Class assignment
 */
export interface ClassAssignment {
  id: string;
  classId: string;
  title: string;
  description: string;

  // Type and content
  type: 'reading' | 'video' | 'quiz' | 'project' | 'reflection';
  content?: string;
  fileUrl?: string;

  // Dates
  assignedDate: string;
  dueDate: string;
  isOverdue: boolean;

  // Scoring
  maxScore: number;
  passingScore: number;

  // Statistics
  totalSubmissions: number;
  totalStudents: number;
  completionRate: number;
  averageScore: number;

  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

/**
 * Request to get list of classes
 */
export interface GetClassesRequest {
  page?: number;
  pageSize?: number;
  status?: ClassStatus[];
  topic?: ClassTopic[];
  level?: ClassLevel[];
  search?: string;
  taId?: string;
  schoolId?: string;
  sortBy?: 'startDate' | 'name' | 'enrolled';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Response for get classes
 */
export interface GetClassesResponse {
  classes: Class[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Request to create a new class
 */
export interface CreateClassRequest {
  name: string;
  code: string;
  topic: ClassTopic;
  level: ClassLevel;
  description: string;
  objectives: string[];
  schedule: Class['schedule'];
  startDate: string;
  endDate: string;
  totalSessions: number;
  capacity: number;
  teacherId: string;
  schoolId: string;
  language: 'vi' | 'zh';
  isPublic: boolean;
  allowLateEnrollment: boolean;
  tags?: string[];
  thumbnailUrl?: string;
}

/**
 * Request to update class information
 */
export interface UpdateClassRequest {
  name?: string;
  description?: string;
  objectives?: string[];
  schedule?: Class['schedule'];
  capacity?: number;
  status?: ClassStatus;
  tags?: string[];
  thumbnailUrl?: string;
}

/**
 * Request to get students in a class
 */
export interface GetStudentsRequest {
  classId: string;
  page?: number;
  pageSize?: number;
  search?: string;
  engagementLevel?: 'high' | 'medium' | 'low';
  sortBy?: 'name' | 'attendanceRate' | 'lastActive';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Response for get students
 */
export interface GetStudentsResponse {
  students: Student[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  statistics: {
    totalActive: number;
    averageAttendance: number;
    averageCompletion: number;
  };
}

/**
 * Request to add student to class
 */
export interface AddStudentRequest {
  classId: string;
  parentId: string;
  enrollmentDate?: string; // Defaults to now
  notes?: string;
}

/**
 * Request to update student information
 */
export interface UpdateStudentRequest {
  notes?: string;
  tags?: string[];
  enrollmentStatus?: Student['enrollmentStatus'];
}

/**
 * Request to record attendance
 */
export interface RecordAttendanceRequest {
  classId: string;
  sessionId: string;
  attendanceRecords: {
    studentId: string;
    status: AttendanceStatus;
    notes?: string;
  }[];
}

/**
 * Request to create assignment
 */
export interface CreateAssignmentRequest {
  classId: string;
  title: string;
  description: string;
  type: ClassAssignment['type'];
  content?: string;
  fileUrl?: string;
  dueDate: string;
  maxScore: number;
  passingScore: number;
}

/**
 * Response for class statistics
 */
export interface GetClassStatsResponse {
  stats: ClassStats;
  performance: ClassPerformance;
}
