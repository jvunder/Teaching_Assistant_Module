/**
 * Learner Service - Mock Data for Adult Education Platform
 *
 * Mock data for learners (adult parents) taking parenting courses
 */

import type { Learner, Class, AttendanceRecord, LearnerProgress } from '@/types/learner.types';

// Mock delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ========================================
// MOCK DATA: Learners (Adult Parents)
// ========================================

export const mockLearners: Learner[] = [
  {
    id: 'L001',
    fullName: 'Nguyễn Thị Lan',
    email: 'lan.nguyen@email.com',
    phone: '0901234567',
    age: 32,
    childrenCount: 2,
    childrenAges: '3 tuổi, 5 tuổi',
    enrolledClasses: ['C001', 'C002'],
    enrollmentDate: '2025-09-01',
    attendanceRate: 92,
    completionRate: 85,
    lastActive: '2025-11-04',
    coursesCompleted: 3,
    totalLearningHours: 45,
    preferredLanguage: 'vi',
    communicationPreference: 'app',
    tags: ['Active', 'Working Parent', 'High Engagement'],
    avatarUrl: '',
  },
  {
    id: 'L002',
    fullName: 'Trần Văn Minh',
    email: 'minh.tran@email.com',
    phone: '0912345678',
    age: 35,
    childrenCount: 1,
    childrenAges: '2 tuổi',
    enrolledClasses: ['C001', 'C003'],
    enrollmentDate: '2025-09-15',
    attendanceRate: 78,
    completionRate: 72,
    lastActive: '2025-11-03',
    coursesCompleted: 2,
    totalLearningHours: 30,
    preferredLanguage: 'vi',
    communicationPreference: 'email',
    tags: ['Active', 'First-time Parent'],
    avatarUrl: '',
  },
  {
    id: 'L003',
    fullName: '李美华',
    email: 'meihua.li@email.com',
    phone: '0923456789',
    age: 28,
    childrenCount: 1,
    childrenAges: '6 tháng',
    enrolledClasses: ['C001'],
    enrollmentDate: '2025-10-01',
    attendanceRate: 95,
    completionRate: 90,
    lastActive: '2025-11-04',
    coursesCompleted: 1,
    totalLearningHours: 18,
    preferredLanguage: 'zh',
    communicationPreference: 'app',
    tags: ['Active', 'New Parent', 'High Engagement'],
    avatarUrl: '',
  },
];

// ========================================
// MOCK DATA: Classes (Parenting Courses)
// ========================================

export const mockClasses: Class[] = [
  {
    id: 'C001',
    name: 'Nuôi dạy con 0-3 tuổi',
    topic: 'Parenting Infants & Toddlers',
    level: 'Beginner',
    schedule: {
      day: 'Thứ 3, Thứ 5',
      time: '19:00-21:00',
      location: 'Phòng A101',
    },
    capacity: 30,
    enrolled: 25,
    teacherName: 'Cô Nguyễn Thị Hoa',
    startDate: '2025-09-01',
    endDate: '2025-12-15',
    totalSessions: 24,
    completedSessions: 18,
    description: 'Khóa học về chăm sóc và nuôi dạy trẻ từ 0-3 tuổi',
    objectives: [
      'Hiểu phát triển tâm sinh lý trẻ 0-3 tuổi',
      'Kỹ năng chăm sóc cơ bản',
      'Giao tiếp với trẻ nhỏ',
    ],
    status: 'Ongoing',
  },
  {
    id: 'C002',
    name: 'Tâm lý học đường',
    topic: 'School Psychology for Parents',
    level: 'Intermediate',
    schedule: {
      day: 'Thứ 7',
      time: '14:00-17:00',
      location: 'Phòng B202',
    },
    capacity: 25,
    enrolled: 20,
    teacherName: 'Thầy Trần Văn Nam',
    startDate: '2025-09-10',
    endDate: '2025-12-20',
    totalSessions: 16,
    completedSessions: 12,
    description: 'Khóa học về tâm lý trẻ độ tuổi đi học',
    objectives: [
      'Hiểu tâm lý trẻ 6-12 tuổi',
      'Hỗ trợ con học tập',
      'Giải quyết vấn đề hành vi',
    ],
    status: 'Ongoing',
  },
  {
    id: 'C003',
    name: 'Nuôi con bằng tình yêu thương',
    topic: 'Positive Parenting',
    level: 'Beginner',
    schedule: {
      day: 'Chủ nhật',
      time: '09:00-12:00',
      location: 'Phòng C303',
    },
    capacity: 30,
    enrolled: 18,
    teacherName: 'Cô Lê Thị Mai',
    startDate: '2025-10-01',
    endDate: '2025-12-30',
    totalSessions: 12,
    completedSessions: 6,
    description: 'Khóa học về nuôi dạy con bằng tình yêu thương và kỷ luật tích cực',
    objectives: [
      'Xây dựng mối quan hệ cha mẹ - con',
      'Kỹ năng kỷ luật tích cực',
      'Giao tiếp hiệu quả',
    ],
    status: 'Ongoing',
  },
];

// ========================================
// MOCK SERVICE FUNCTIONS
// ========================================

export const learnerService = {
  // Get all learners
  async getLearners(): Promise<Learner[]> {
    await delay(500);
    return mockLearners;
  },

  // Get learner by ID
  async getLearnerById(id: string): Promise<Learner | null> {
    await delay(300);
    return mockLearners.find((l) => l.id === id) || null;
  },

  // Get learners by class
  async getLearnersByClass(classId: string): Promise<Learner[]> {
    await delay(400);
    return mockLearners.filter((l) => l.enrolledClasses.includes(classId));
  },

  // Get all classes
  async getClasses(): Promise<Class[]> {
    await delay(500);
    return mockClasses;
  },

  // Get class by ID
  async getClassById(id: string): Promise<Class | null> {
    await delay(300);
    return mockClasses.find((c) => c.id === id) || null;
  },

  // Get learner progress for a class
  async getLearnerProgress(learnerId: string, classId: string): Promise<LearnerProgress | null> {
    await delay(400);

    const learner = mockLearners.find((l) => l.id === learnerId);
    if (!learner || !learner.enrolledClasses.includes(classId)) {
      return null;
    }

    // Mock progress data
    return {
      learnerId,
      classId,
      sessionsAttended: Math.floor(Math.random() * 20) + 10,
      totalSessions: 24,
      attendanceRate: learner.attendanceRate,
      assignmentsCompleted: 8,
      totalAssignments: 10,
      averageScore: 85,
      participationScore: 90,
      lastActivity: learner.lastActive,
      overallProgress: learner.completionRate,
      grade: learner.completionRate >= 85 ? 'Xuất sắc' : 'Giỏi',
    };
  },

  // Get attendance records
  async getAttendanceRecords(learnerId: string): Promise<AttendanceRecord[]> {
    await delay(400);

    // Mock attendance data
    return [
      {
        id: 'A001',
        learnerId,
        classId: 'C001',
        sessionDate: '2025-11-01',
        status: 'Present',
      },
      {
        id: 'A002',
        learnerId,
        classId: 'C001',
        sessionDate: '2025-11-03',
        status: 'Present',
      },
    ];
  },

  // Update learner
  async updateLearner(id: string, updates: Partial<Learner>): Promise<Learner | null> {
    await delay(500);

    const index = mockLearners.findIndex((l) => l.id === id);
    if (index === -1) return null;

    mockLearners[index] = { ...mockLearners[index], ...updates };
    return mockLearners[index];
  },

  // Search learners
  async searchLearners(query: string): Promise<Learner[]> {
    await delay(400);

    const lowerQuery = query.toLowerCase();
    return mockLearners.filter(
      (l) =>
        l.fullName.toLowerCase().includes(lowerQuery) ||
        l.email.toLowerCase().includes(lowerQuery) ||
        l.phone.includes(query)
    );
  },
};
