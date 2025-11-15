/**
 * Parent Service - Teaching Assistant Module
 * Mock service for parent/learner management and tracking
 */

import type {
  Parent,
  ParentActivity,
  GetParentDetailResponse,
  GetParentActivitiesRequest,
  GetParentActivitiesResponse,
  GetParentSegmentStatsResponse,
  FilterParentsRequest,
  FilterParentsResponse,
  PurchaseRecord,
} from '@/types/parent.types';

// Mock delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ========================================
// MOCK DATA: Parents
// ========================================

const mockPurchases: PurchaseRecord[] = [
  {
    id: 'P001',
    parentId: 'PAR001',
    courseId: 'C001',
    courseName: 'Nuôi dạy con 0-3 tuổi',
    amount: 2500000,
    currency: 'VND',
    purchaseDate: '2025-08-15',
    paymentMethod: 'bank_transfer',
    status: 'completed',
  },
  {
    id: 'P002',
    parentId: 'PAR001',
    courseId: 'C002',
    courseName: 'Tâm lý học đường',
    amount: 3000000,
    currency: 'VND',
    purchaseDate: '2025-09-01',
    paymentMethod: 'card',
    status: 'completed',
  },
];

const mockParents: Parent[] = [
  {
    id: 'PAR001',
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
    lastActive: '2025-11-14',
    coursesCompleted: 3,
    totalLearningHours: 45,
    preferredLanguage: 'vi',
    communicationPreference: 'app',
    tags: ['Active', 'Working Parent', 'High Engagement'],
    avatarUrl: '',
    purchaseHistory: mockPurchases.filter(p => p.parentId === 'PAR001'),
    segment: {
      id: 'SEG001',
      name: 'High Engagement',
      criteria: { engagementLevel: 'High', attendanceRange: { min: 80, max: 100 } },
    },
  },
  {
    id: 'PAR002',
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
    lastActive: '2025-11-13',
    coursesCompleted: 2,
    totalLearningHours: 30,
    preferredLanguage: 'vi',
    communicationPreference: 'email',
    tags: ['Active', 'First-time Parent'],
    avatarUrl: '',
    segment: {
      id: 'SEG002',
      name: 'Medium Engagement',
      criteria: { engagementLevel: 'Medium', attendanceRange: { min: 60, max: 79 } },
    },
  },
  {
    id: 'PAR003',
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
    lastActive: '2025-11-14',
    coursesCompleted: 1,
    totalLearningHours: 18,
    preferredLanguage: 'zh',
    communicationPreference: 'app',
    tags: ['Active', 'New Parent', 'High Engagement'],
    avatarUrl: '',
    segment: {
      id: 'SEG001',
      name: 'High Engagement',
      criteria: { engagementLevel: 'High', attendanceRange: { min: 80, max: 100 } },
    },
  },
  {
    id: 'PAR004',
    fullName: 'Phạm Thị Hương',
    email: 'huong.pham@email.com',
    phone: '0934567890',
    age: 30,
    childrenCount: 2,
    childrenAges: '4 tuổi, 7 tuổi',
    enrolledClasses: ['C002'],
    enrollmentDate: '2025-09-10',
    attendanceRate: 55,
    completionRate: 48,
    lastActive: '2025-11-10',
    coursesCompleted: 1,
    totalLearningHours: 15,
    preferredLanguage: 'vi',
    communicationPreference: 'sms',
    tags: ['At Risk', 'Working Parent'],
    avatarUrl: '',
    segment: {
      id: 'SEG003',
      name: 'Low Engagement',
      criteria: { engagementLevel: 'Low', attendanceRange: { min: 0, max: 59 } },
    },
  },
];

// ========================================
// MOCK DATA: Activities
// ========================================

const mockActivities: ParentActivity[] = [
  {
    id: 'ACT001',
    parentId: 'PAR001',
    type: 'login',
    title: 'Đăng nhập hệ thống',
    description: 'Phụ huynh đăng nhập vào hệ thống',
    timestamp: '2025-11-14T08:30:00Z',
  },
  {
    id: 'ACT002',
    parentId: 'PAR001',
    type: 'course_access',
    title: 'Truy cập khóa học',
    description: 'Xem bài giảng: Nuôi dạy con 0-3 tuổi - Bài 5',
    timestamp: '2025-11-14T09:00:00Z',
    metadata: { courseId: 'C001', lessonId: 'L005' },
  },
  {
    id: 'ACT003',
    parentId: 'PAR001',
    type: 'assignment_submit',
    title: 'Nộp bài tập',
    description: 'Nộp bài tập tuần 3',
    timestamp: '2025-11-13T20:15:00Z',
    metadata: { assignmentId: 'ASG003' },
  },
  {
    id: 'ACT004',
    parentId: 'PAR001',
    type: 'message_sent',
    title: 'Gửi tin nhắn',
    description: 'Gửi câu hỏi cho giáo viên',
    timestamp: '2025-11-13T18:45:00Z',
  },
];

// ========================================
// SERVICE FUNCTIONS
// ========================================

/**
 * Get parent detail by ID
 * Endpoint: GET /api/v1/ta/parents/:id
 */
export async function getParentDetail(parentId: string): Promise<GetParentDetailResponse> {
  await delay(400);

  const parent = mockParents.find((p) => p.id === parentId);

  if (!parent) {
    return {
      success: false,
      data: {} as Parent,
      message: 'Parent not found',
    };
  }

  return {
    success: true,
    data: parent,
    message: 'Parent details retrieved successfully',
  };
}

/**
 * Get parent activities with filtering
 * Endpoint: GET /api/v1/ta/parents/:id/activities
 */
export async function getParentActivities(
  params: GetParentActivitiesRequest
): Promise<GetParentActivitiesResponse> {
  await delay(500);

  const { parentId, page = 1, limit = 20, type, startDate, endDate } = params;

  let activities = mockActivities.filter((a) => a.parentId === parentId);

  // Filter by type
  if (type) {
    activities = activities.filter((a) => a.type === type);
  }

  // Filter by date range
  if (startDate) {
    activities = activities.filter((a) => new Date(a.timestamp) >= new Date(startDate));
  }
  if (endDate) {
    activities = activities.filter((a) => new Date(a.timestamp) <= new Date(endDate));
  }

  // Sort by timestamp (newest first)
  activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Pagination
  const total = activities.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedActivities = activities.slice(start, end);

  return {
    success: true,
    data: {
      activities: paginatedActivities,
      total,
      page,
      limit,
    },
    message: 'Activities retrieved successfully',
  };
}

/**
 * Get parent segment statistics
 * Endpoint: GET /api/v1/ta/parents/segment-stats
 */
export async function getParentSegmentStats(): Promise<GetParentSegmentStatsResponse> {
  await delay(600);

  const totalParents = mockParents.length;

  // Calculate segment stats
  const segmentMap = new Map<string, Parent[]>();
  mockParents.forEach((parent) => {
    const segmentName = parent.segment?.name || 'Unassigned';
    if (!segmentMap.has(segmentName)) {
      segmentMap.set(segmentName, []);
    }
    segmentMap.get(segmentName)!.push(parent);
  });

  const segments = Array.from(segmentMap.entries()).map(([segmentName, parents]) => {
    const count = parents.length;
    const percentage = (count / totalParents) * 100;
    const avgAttendance = parents.reduce((sum, p) => sum + p.attendanceRate, 0) / count;
    const avgCompletion = parents.reduce((sum, p) => sum + p.completionRate, 0) / count;

    return {
      segment: segmentName,
      count,
      percentage: Math.round(percentage * 10) / 10,
      avgAttendance: Math.round(avgAttendance * 10) / 10,
      avgCompletion: Math.round(avgCompletion * 10) / 10,
    };
  });

  return {
    success: true,
    data: {
      totalParents,
      segments,
    },
    message: 'Segment statistics retrieved successfully',
  };
}

/**
 * Filter parents by various criteria
 * Endpoint: POST /api/v1/ta/parents/filter
 */
export async function filterParents(
  params: FilterParentsRequest
): Promise<FilterParentsResponse> {
  await delay(500);

  const {
    classes,
    engagementLevel,
    tags,
    attendanceRange,
    completionRange,
    language,
    search,
    page = 1,
    limit = 20,
  } = params;

  let filteredParents = [...mockParents];

  // Filter by classes
  if (classes && classes.length > 0) {
    filteredParents = filteredParents.filter((p) =>
      p.enrolledClasses.some((classId) => classes.includes(classId))
    );
  }

  // Filter by engagement level
  if (engagementLevel) {
    filteredParents = filteredParents.filter((p) => p.segment?.criteria.engagementLevel === engagementLevel);
  }

  // Filter by tags
  if (tags && tags.length > 0) {
    filteredParents = filteredParents.filter((p) =>
      tags.some((tag) => p.tags.includes(tag))
    );
  }

  // Filter by attendance range
  if (attendanceRange) {
    filteredParents = filteredParents.filter(
      (p) => p.attendanceRate >= attendanceRange.min && p.attendanceRate <= attendanceRange.max
    );
  }

  // Filter by completion range
  if (completionRange) {
    filteredParents = filteredParents.filter(
      (p) => p.completionRate >= completionRange.min && p.completionRate <= completionRange.max
    );
  }

  // Filter by language
  if (language) {
    filteredParents = filteredParents.filter((p) => p.preferredLanguage === language);
  }

  // Filter by search (name, email, phone)
  if (search) {
    const searchLower = search.toLowerCase();
    filteredParents = filteredParents.filter(
      (p) =>
        p.fullName.toLowerCase().includes(searchLower) ||
        p.email.toLowerCase().includes(searchLower) ||
        p.phone.includes(search)
    );
  }

  // Pagination
  const total = filteredParents.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedParents = filteredParents.slice(start, end);

  return {
    success: true,
    data: {
      parents: paginatedParents,
      total,
      page,
      limit,
    },
    message: 'Parents filtered successfully',
  };
}

// Export service object for convenience
export const parentService = {
  getParentDetail,
  getParentActivities,
  getParentSegmentStats,
  filterParents,
};

export default parentService;
