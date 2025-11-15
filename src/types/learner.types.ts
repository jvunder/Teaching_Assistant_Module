/**
 * Learner Types - Adult Education Platform
 *
 * Context: This platform is for adult learners (parents age 25-45)
 * taking parenting and child development courses.
 * NOT for K-12 students.
 *
 * Includes:
 * - Course management
 * - Learning progress tracking
 * - Gamification (points, certificates)
 * - Course recommendations
 */

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Type of course offered
 */
export enum CourseType {
  LIVE = 'live', // Live online classes
  RECORDED = 'recorded', // Pre-recorded video courses
  HYBRID = 'hybrid', // Mix of live and recorded
  SELF_PACED = 'self_paced', // Learn at your own pace
  MICRO_LEARNING = 'micro_learning' // Short-form content
}

/**
 * Course status
 */
export enum CourseStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  ARCHIVED = 'archived'
}

/**
 * Lesson type
 */
export enum LessonType {
  VIDEO = 'video',
  READING = 'reading',
  QUIZ = 'quiz',
  ASSIGNMENT = 'assignment',
  DISCUSSION = 'discussion',
  LIVE_SESSION = 'live_session'
}

/**
 * Certificate type
 */
export enum CertificateType {
  COMPLETION = 'completion', // Just completed the course
  ACHIEVEMENT = 'achievement', // Met performance criteria
  EXCELLENCE = 'excellence', // Top performer
  PARTICIPATION = 'participation' // Participated in course
}

// ============================================================================
// INTERFACES - CORE TYPES (Original + Enhanced)
// ============================================================================

/**
 * Adult learner (parent) taking courses
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

/**
 * Course offering
 */
export interface Course {
  id: string;
  name: string;
  description: string;
  topic: string; // e.g., "Nuôi dạy con 0-3 tuổi"
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  type: CourseType;
  status: CourseStatus;

  // Content
  thumbnailUrl?: string;
  coverImageUrl?: string;
  objectives: string[];
  syllabus?: string;

  // Structure
  totalLessons: number;
  totalDuration: number; // minutes
  lessons: CourseLesson[];

  // Enrollment
  capacity?: number;
  enrolled: number;
  price: number; // VND, 0 for free courses
  isPremium: boolean;

  // Instructor
  instructorId: string;
  instructorName: string;
  instructorAvatarUrl?: string;

  // Dates
  startDate?: string; // For scheduled courses
  endDate?: string;
  createdAt: string;
  updatedAt: string;

  // Language
  language: 'vi' | 'zh';

  // Tags and categories
  tags: string[];
  category: string;

  // Statistics
  averageRating?: number; // 0-5
  totalReviews?: number;
  completionRate?: number; // Percentage of enrollees who complete
}

/**
 * Individual lesson within a course
 */
export interface CourseLesson {
  id: string;
  courseId: string;
  lessonNumber: number;
  title: string;
  description?: string;
  type: LessonType;

  // Content
  content?: string; // HTML content for reading lessons
  videoUrl?: string;
  duration: number; // minutes
  materials?: {
    title: string;
    url: string;
    type: 'pdf' | 'doc' | 'link';
  }[];

  // Access
  isFree: boolean; // Free preview lessons
  isLocked: boolean; // Requires previous lessons completion

  // Order
  sortOrder: number;

  // Status
  isPublished: boolean;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

/**
 * Class (kept from original for backwards compatibility)
 */
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

/**
 * Parent's enrollment in a course
 */
export interface ParentEnrollment {
  id: string;
  parentId: string;
  courseId: string;
  courseName: string;

  // Enrollment details
  enrolledAt: string;
  completedAt?: string;
  status: 'active' | 'completed' | 'dropped' | 'paused';

  // Progress
  lessonsCompleted: number;
  totalLessons: number;
  progressPercentage: number; // 0-100

  // Time tracking
  totalTimeSpent: number; // minutes
  lastAccessedAt?: string;

  // Performance
  averageScore?: number; // 0-100
  certificateEarned: boolean;
  certificateId?: string;

  // Payment (if paid course)
  isPaid: boolean;
  amountPaid?: number;
  paymentDate?: string;
}

/**
 * Parent's progress in a specific lesson
 */
export interface ParentLessonProgress {
  id: string;
  parentId: string;
  courseId: string;
  lessonId: string;

  // Progress
  status: 'not_started' | 'in_progress' | 'completed';
  progressPercentage: number; // 0-100
  timeSpent: number; // minutes

  // Completion
  completedAt?: string;
  score?: number; // 0-100, for quizzes/assignments

  // Tracking
  startedAt?: string;
  lastAccessedAt?: string;

  // Notes
  notes?: string; // Parent's personal notes on the lesson
}

/**
 * Attendance record (kept from original)
 */
export interface AttendanceRecord {
  id: string;
  learnerId: string;
  classId: string;
  sessionDate: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  notes?: string;
}

/**
 * Learner progress in a class (kept from original)
 */
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

/**
 * Gamification: Parent points system
 */
export interface ParentPoints {
  parentId: string;
  totalPoints: number;
  level: number; // Gamification level
  levelName: string; // e.g., "Beginner", "Explorer", "Expert", "Master"

  // Point breakdown
  pointsByActivity: {
    lessonCompletion: number;
    quizPassing: number;
    perfectAttendance: number;
    contentEngagement: number;
    referrals: number;
    other: number;
  };

  // Next level
  pointsToNextLevel: number;
  nextLevel: number;
  nextLevelName: string;

  // Leaderboard
  rank?: number;
  totalParticipants?: number;

  // History
  lastEarned?: {
    points: number;
    activity: string;
    timestamp: string;
  };
}

/**
 * Points transaction history
 */
export interface PointsTransaction {
  id: string;
  parentId: string;

  // Transaction details
  points: number; // Positive for earned, negative for spent
  activity: string;
  description: string;

  // Related entity
  relatedType?: 'lesson' | 'quiz' | 'course' | 'referral' | 'reward';
  relatedId?: string;

  // Metadata
  timestamp: string;
  balanceAfter: number;
}

/**
 * Parent certificate
 */
export interface ParentCertificate {
  id: string;
  parentId: string;
  courseId: string;
  courseName: string;

  // Certificate details
  certificateNumber: string;
  type: CertificateType;
  title: string;
  description?: string;

  // File
  certificateUrl: string; // PDF URL
  thumbnailUrl?: string;

  // Issuance
  issuedAt: string;
  issuedBy: string; // TA or instructor ID
  validUntil?: string;

  // Verification
  verificationCode: string;
  isVerified: boolean;

  // Sharing
  isPublic: boolean; // Can be shared on social media
  shareUrl?: string;
}

/**
 * Class statistics (kept from original)
 */
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

/**
 * Course recommendation for parent
 */
export interface CourseRecommendation {
  courseId: string;
  courseName: string;
  reason: string; // Why recommended
  relevanceScore: number; // 0-100

  // Recommendation basis
  basedOn: 'completion_history' | 'child_age' | 'interests' | 'popular' | 'similar_parents';

  // Course preview
  course: {
    thumbnailUrl?: string;
    level: string;
    duration: number;
    enrolled: number;
    rating?: number;
  };
}

/**
 * Filter options for LearnerFilterPanel (kept from original)
 */
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

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

/**
 * Request to get courses
 */
export interface GetCoursesRequest {
  page?: number;
  pageSize?: number;
  type?: CourseType[];
  status?: CourseStatus[];
  level?: ('Beginner' | 'Intermediate' | 'Advanced')[];
  isPremium?: boolean;
  search?: string;
  tags?: string[];
  sortBy?: 'popular' | 'newest' | 'rating' | 'name';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Response for get courses
 */
export interface GetCoursesResponse {
  courses: Course[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Request to enroll in course
 */
export interface EnrollInCourseRequest {
  parentId: string;
  courseId: string;
  isPaid?: boolean;
  paymentMethod?: string;
  promoCode?: string;
}

/**
 * Response for enroll in course
 */
export interface EnrollInCourseResponse {
  enrollmentId: string;
  success: boolean;
  message?: string;
  accessUntil?: string;
}

/**
 * Request to get parent progress
 */
export interface GetParentProgressRequest {
  parentId: string;
  courseId?: string; // If provided, get progress for specific course
}

/**
 * Response for get parent progress
 */
export interface GetParentProgressResponse {
  enrollments: ParentEnrollment[];
  totalCoursesCompleted: number;
  totalLearningHours: number;
  averageCompletionRate: number;
}

/**
 * Request to update lesson progress
 */
export interface UpdateLessonProgressRequest {
  parentId: string;
  lessonId: string;
  progressPercentage: number;
  timeSpent: number;
  completed?: boolean;
  score?: number;
  notes?: string;
}

/**
 * Request to get course recommendations
 */
export interface GetRecommendationsRequest {
  parentId: string;
  limit?: number;
}

/**
 * Response for get recommendations
 */
export interface GetRecommendationsResponse {
  recommendations: CourseRecommendation[];
}
