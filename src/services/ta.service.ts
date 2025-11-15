/**
 * Teaching Assistant Service - Teaching Assistant Module
 * Mock service for TA profile, dashboard, performance, and settings
 */

import type {
  TAProfile,
  TADashboard,
  TAPerformance,
  TASettings,
  TAActivity,
  TAAlert,
  GetTAProfileResponse,
  UpdateTAProfileRequest,
  UpdateTAProfileResponse,
  GetTADashboardResponse,
  GetTAPerformanceRequest,
  GetTAPerformanceResponse,
  GetTASettingsResponse,
  UpdateTASettingsRequest,
  UpdateTASettingsResponse,
} from '@/types/ta.types';

// Mock delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ========================================
// MOCK DATA: TA Profile
// ========================================

let mockTAProfile: TAProfile = {
  id: 'TA001',
  fullName: 'Nguyễn Văn Hùng',
  email: 'hung.nguyen@educonnect.vn',
  phone: '0987654321',
  avatarUrl: '',
  role: 'teaching_assistant',
  assignedClasses: ['C001', 'C002', 'C003'],
  joinedDate: '2025-01-15',
  bio: 'Trợ giảng có kinh nghiệm trong lĩnh vực giáo dục gia đình và phát triển trẻ em.',
  specializations: ['Tâm lý học phát triển', 'Giáo dục mầm non', 'Tư vấn gia đình'],
  certifications: ['Chứng chỉ Tâm lý học Trẻ em', 'Chứng chỉ Giảng viên Giáo dục Phụ huynh'],
  preferredLanguage: 'vi',
};

// ========================================
// MOCK DATA: Alerts
// ========================================

let mockAlerts: TAAlert[] = [
  {
    id: 'ALERT001',
    type: 'low_attendance',
    severity: 'high',
    title: 'Tỷ lệ tham dự thấp',
    message: 'Lớp C002 có tỷ lệ tham dự giảm 15% trong tuần qua',
    timestamp: '2025-11-14T10:00:00Z',
    isRead: false,
    actionRequired: true,
    relatedEntity: {
      type: 'class',
      id: 'C002',
      name: 'Tâm lý học đường',
    },
  },
  {
    id: 'ALERT002',
    type: 'parent_concern',
    severity: 'medium',
    title: 'Phụ huynh cần hỗ trợ',
    message: 'Phạm Thị Hương đã gửi 3 tin nhắn chưa được trả lời',
    timestamp: '2025-11-14T08:30:00Z',
    isRead: false,
    actionRequired: true,
    relatedEntity: {
      type: 'parent',
      id: 'PAR004',
      name: 'Phạm Thị Hương',
    },
  },
  {
    id: 'ALERT003',
    type: 'missed_deadline',
    severity: 'urgent',
    title: 'Hạn chót báo cáo',
    message: 'Báo cáo tháng 11 cần nộp trước 15/11',
    timestamp: '2025-11-13T15:00:00Z',
    isRead: false,
    actionRequired: true,
  },
  {
    id: 'ALERT004',
    type: 'system',
    severity: 'low',
    title: 'Cập nhật hệ thống',
    message: 'Phiên bản mới của hệ thống đã có sẵn',
    timestamp: '2025-11-12T09:00:00Z',
    isRead: true,
    actionRequired: false,
  },
];

// ========================================
// MOCK DATA: Activities
// ========================================

const mockTAActivities: TAActivity[] = [
  {
    id: 'TAACT001',
    type: 'message_sent',
    title: 'Gửi tin nhắn nhóm',
    description: 'Gửi thông báo buổi học tuần tới cho lớp C001',
    timestamp: '2025-11-14T09:30:00Z',
    metadata: { classId: 'C001', recipientCount: 25 },
  },
  {
    id: 'TAACT002',
    type: 'content_posted',
    title: 'Đăng tài liệu',
    description: 'Tải lên tài liệu "Kỹ năng giao tiếp với trẻ"',
    timestamp: '2025-11-13T16:45:00Z',
    metadata: { contentId: 'DOC123', classId: 'C002' },
  },
  {
    id: 'TAACT003',
    type: 'parent_contacted',
    title: 'Liên hệ phụ huynh',
    description: 'Trao đổi với Trần Văn Minh về tiến độ học tập',
    timestamp: '2025-11-13T14:20:00Z',
    metadata: { parentId: 'PAR002' },
  },
  {
    id: 'TAACT004',
    type: 'report_generated',
    title: 'Tạo báo cáo',
    description: 'Xuất báo cáo tháng 10 cho lớp C003',
    timestamp: '2025-11-12T11:00:00Z',
    metadata: { reportId: 'REP456', classId: 'C003' },
  },
];

// ========================================
// MOCK DATA: Settings
// ========================================

let mockTASettings: TASettings = {
  notifications: {
    email: true,
    sms: false,
    inApp: true,
    alertTypes: {
      lowAttendance: true,
      parentConcerns: true,
      missedDeadlines: true,
      systemUpdates: false,
    },
  },
  preferences: {
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    dateFormat: 'DD/MM/YYYY',
    theme: 'light',
  },
  workingHours: {
    enabled: true,
    schedule: [
      { day: 'monday', startTime: '08:00', endTime: '17:00' },
      { day: 'tuesday', startTime: '08:00', endTime: '17:00' },
      { day: 'wednesday', startTime: '08:00', endTime: '17:00' },
      { day: 'thursday', startTime: '08:00', endTime: '17:00' },
      { day: 'friday', startTime: '08:00', endTime: '17:00' },
    ],
  },
  autoResponses: {
    enabled: true,
    templates: [
      {
        id: 'TEMP001',
        trigger: 'ngoài giờ làm việc',
        response:
          'Cảm ơn bạn đã liên hệ. Tôi sẽ trả lời trong giờ làm việc (8:00-17:00, Thứ 2-6).',
      },
      {
        id: 'TEMP002',
        trigger: 'câu hỏi thường gặp',
        response: 'Bạn có thể tham khảo trang FAQ của chúng tôi tại đây: [link]',
      },
    ],
  },
};

// ========================================
// SERVICE FUNCTIONS
// ========================================

/**
 * Get TA profile
 * Endpoint: GET /api/v1/ta/profile
 */
export async function getProfile(): Promise<GetTAProfileResponse> {
  await delay(300);

  return {
    success: true,
    data: mockTAProfile,
    message: 'Profile retrieved successfully',
  };
}

/**
 * Update TA profile
 * Endpoint: PUT /api/v1/ta/profile
 */
export async function updateProfile(
  data: UpdateTAProfileRequest
): Promise<UpdateTAProfileResponse> {
  await delay(500);

  // Update mock profile
  mockTAProfile = {
    ...mockTAProfile,
    ...data,
  };

  return {
    success: true,
    data: mockTAProfile,
    message: 'Profile updated successfully',
  };
}

/**
 * Get TA dashboard data
 * Endpoint: GET /api/v1/ta/dashboard
 */
export async function getDashboard(): Promise<GetTADashboardResponse> {
  await delay(600);

  const dashboard: TADashboard = {
    overview: {
      totalClasses: 3,
      totalParents: 63,
      activeParents: 58,
      avgAttendanceRate: 82.5,
      avgCompletionRate: 78.3,
    },
    alerts: mockAlerts.filter((a) => !a.isRead).slice(0, 5),
    recentActivities: mockTAActivities.slice(0, 10),
    upcomingSessions: [
      {
        id: 'SES001',
        classId: 'C001',
        className: 'Nuôi dạy con 0-3 tuổi',
        date: '2025-11-16',
        time: '19:00-21:00',
        location: 'Phòng A101',
        topic: 'Phát triển ngôn ngữ ở trẻ nhỏ',
        expectedAttendees: 25,
      },
      {
        id: 'SES002',
        classId: 'C002',
        className: 'Tâm lý học đường',
        date: '2025-11-17',
        time: '14:00-17:00',
        location: 'Phòng B202',
        topic: 'Hỗ trợ con vượt qua khó khăn học tập',
        expectedAttendees: 20,
      },
    ],
    performanceMetrics: {
      weeklyEngagement: 85,
      monthlyEngagement: 82,
      responseTime: 2.5,
      satisfactionScore: 4.5,
    },
  };

  return {
    success: true,
    data: dashboard,
    message: 'Dashboard data retrieved successfully',
  };
}

/**
 * Get TA performance metrics
 * Endpoint: GET /api/v1/ta/performance
 */
export async function getPerformance(
  params: GetTAPerformanceRequest
): Promise<GetTAPerformanceResponse> {
  await delay(700);

  const { startDate = '2025-11-01', endDate = '2025-11-30', classId } = params;

  const performance: TAPerformance = {
    period: {
      startDate,
      endDate,
    },
    metrics: {
      messagesHandled: 245,
      avgResponseTime: 2.5,
      parentsSatisfaction: 4.5,
      classesManaged: classId ? 1 : 3,
      contentCreated: 12,
      attendanceImprovement: 8.5,
    },
    classPerformance: [
      {
        classId: 'C001',
        className: 'Nuôi dạy con 0-3 tuổi',
        avgAttendance: 88.5,
        avgCompletion: 82.0,
        parentSatisfaction: 4.6,
      },
      {
        classId: 'C002',
        className: 'Tâm lý học đường',
        avgAttendance: 75.2,
        avgCompletion: 70.5,
        parentSatisfaction: 4.3,
      },
      {
        classId: 'C003',
        className: 'Nuôi con bằng tình yêu thương',
        avgAttendance: 84.0,
        avgCompletion: 82.5,
        parentSatisfaction: 4.7,
      },
    ].filter((c) => !classId || c.classId === classId),
    trends: {
      engagementTrend: [
        { date: '2025-11-01', value: 78 },
        { date: '2025-11-08', value: 82 },
        { date: '2025-11-15', value: 85 },
      ],
      responseTrend: [
        { date: '2025-11-01', value: 3.2 },
        { date: '2025-11-08', value: 2.8 },
        { date: '2025-11-15', value: 2.5 },
      ],
    },
  };

  return {
    success: true,
    data: performance,
    message: 'Performance metrics retrieved successfully',
  };
}

/**
 * Get TA settings
 * Endpoint: GET /api/v1/ta/settings
 */
export async function getSettings(): Promise<GetTASettingsResponse> {
  await delay(300);

  return {
    success: true,
    data: mockTASettings,
    message: 'Settings retrieved successfully',
  };
}

/**
 * Update TA settings
 * Endpoint: PUT /api/v1/ta/settings
 */
export async function updateSettings(
  data: UpdateTASettingsRequest
): Promise<UpdateTASettingsResponse> {
  await delay(500);

  // Deep merge settings
  if (data.notifications) {
    mockTASettings.notifications = {
      ...mockTASettings.notifications,
      ...data.notifications,
      alertTypes: {
        ...mockTASettings.notifications.alertTypes,
        ...(data.notifications.alertTypes || {}),
      },
    };
  }

  if (data.preferences) {
    mockTASettings.preferences = {
      ...mockTASettings.preferences,
      ...data.preferences,
    };
  }

  if (data.workingHours) {
    mockTASettings.workingHours = {
      ...mockTASettings.workingHours,
      ...data.workingHours,
    };
  }

  if (data.autoResponses) {
    mockTASettings.autoResponses = {
      ...mockTASettings.autoResponses,
      ...data.autoResponses,
    };
  }

  return {
    success: true,
    data: mockTASettings,
    message: 'Settings updated successfully',
  };
}

/**
 * Get TA activities with pagination
 * Endpoint: GET /api/v1/ta/activities
 */
export async function getActivities(page = 1, limit = 20): Promise<TAActivity[]> {
  await delay(400);

  const start = (page - 1) * limit;
  const end = start + limit;

  return mockTAActivities.slice(start, end);
}

/**
 * Mark alert as read
 * Endpoint: POST /api/v1/ta/alerts/:id/read
 */
export async function markAlertRead(alertId: string): Promise<void> {
  await delay(300);

  const alert = mockAlerts.find((a) => a.id === alertId);
  if (alert) {
    alert.isRead = true;
  }
}

// Export service object for convenience
export const taService = {
  getProfile,
  updateProfile,
  getDashboard,
  getPerformance,
  getSettings,
  updateSettings,
  getActivities,
  markAlertRead,
};

export default taService;
