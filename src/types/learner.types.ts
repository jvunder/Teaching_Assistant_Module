/**
 * Learner Types - Adult Education Platform
 *
 * Context: This platform is for adult learners (parents age 25-45)
 * taking parenting and child development courses.
 * NOT for K-12 students.
 */

export interface Learner {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;

  // Children information
  childrenCount: number;
  childrenAges: string; // e.g., "3 tuổi, 5 tuổi"

  // Enrollment
  enrolledClasses: string[]; // Class IDs
  enrollmentDate: string;

  // Engagement
  attendanceRate: number; // 0-100
  completionRate: number; // 0-100
  lastActive: string;

  // Progress
  coursesCompleted: number;
  totalLearningHours: number;

  // Communication
  preferredLanguage: 'vi' | 'zh';
  communicationPreference: 'email' | 'sms' | 'app';

  // Tags for filtering
  tags: string[]; // e.g., ["Active", "Beginner", "Working Parent"]

  // Notes
  notes?: string;
  avatarUrl?: string;
}

export interface Class {
  id: string;
  name: string;
  topic: string; // e.g., "Nuôi dạy con 0-3 tuổi"
  level: 'Beginner' | 'Intermediate' | 'Advanced';

  // Schedule
  schedule: {
    day: string; // e.g., "Thứ 3, Thứ 5"
    time: string; // e.g., "19:00-21:00"
    location: string;
  };

  // Enrollment
  capacity: number;
  enrolled: number;
  teacherName: string;

  // Dates
  startDate: string;
  endDate: string;
  totalSessions: number;
  completedSessions: number;

  // Content
  description: string;
  objectives: string[];

  // Status
  status: 'Upcoming' | 'Ongoing' | 'Completed';
}

export interface AttendanceRecord {
  id: string;
  learnerId: string;
  classId: string;
  sessionDate: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  notes?: string;
}

export interface LearnerProgress {
  learnerId: string;
  classId: string;

  // Attendance
  sessionsAttended: number;
  totalSessions: number;
  attendanceRate: number;

  // Assignments
  assignmentsCompleted: number;
  totalAssignments: number;
  averageScore: number;

  // Engagement
  participationScore: number; // 0-100
  lastActivity: string;

  // Overall
  overallProgress: number; // 0-100
  grade?: string; // "Xuất sắc", "Giỏi", "Khá", "Trung bình"
}

export interface ClassStats {
  classId: string;
  className: string;

  // Enrollment
  totalLearners: number;
  activeLearners: number;
  dropoutRate: number;

  // Attendance
  averageAttendance: number;

  // Performance
  averageCompletionRate: number;
  averageScore: number;

  // Engagement
  averageParticipation: number;
  messagesSent: number;
  messagesReceived: number;
}

// Filter options for LearnerFilterPanel
export interface LearnerFilterOptions {
  classes?: string[]; // Class IDs
  engagementLevel?: 'High' | 'Medium' | 'Low';
  tags?: string[];
  attendanceRange?: {
    min: number;
    max: number;
  };
  language?: 'vi' | 'zh';
}
