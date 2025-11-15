import type {
  TAProfile,
  AssignedClass,
  PerformanceMetrics,
  UserSettings,
  UpdateProfileRequest,
  ChangePasswordRequest,
  UpdateSettingsRequest,
} from '@/types/ta.types';

// Mock data for TA profile
const mockTAProfile: TAProfile = {
  id: 'ta001',
  fullName: 'Nguyễn Văn An',
  email: 'nguyenvanan@educonnect.vn',
  phone: '+84 123 456 789',
  avatarUrl: 'https://i.pravatar.cc/150?img=12',
  role: 'assistant',
  bio: 'Trợ giảng chuyên ngành Toán, có 3 năm kinh nghiệm hỗ trợ học sinh THPT.',
  school: 'Trường THPT Nguyễn Huệ',
  department: 'Khoa Toán',
  joinedDate: '2022-01-15',
  status: 'active',
};

// Mock data for assigned classes
const mockAssignedClasses: AssignedClass[] = [
  {
    id: 'class001',
    className: 'Lớp 12A1',
    grade: '12',
    subject: 'Toán',
    studentCount: 45,
    parentCount: 42,
    schedule: 'Thứ 2, 4, 6 - 7h00-8h30',
    startDate: '2024-09-01',
    status: 'active',
  },
  {
    id: 'class002',
    className: 'Lớp 11A3',
    grade: '11',
    subject: 'Toán',
    studentCount: 40,
    parentCount: 38,
    schedule: 'Thứ 3, 5, 7 - 9h00-10h30',
    startDate: '2024-09-01',
    status: 'active',
  },
  {
    id: 'class003',
    className: 'Lớp 10B2',
    grade: '10',
    subject: 'Toán',
    studentCount: 35,
    parentCount: 33,
    schedule: 'Thứ 2, 4 - 13h00-14h30',
    startDate: '2024-09-01',
    status: 'active',
  },
  {
    id: 'class004',
    className: 'Lớp 12A2',
    grade: '12',
    subject: 'Toán',
    studentCount: 43,
    parentCount: 40,
    schedule: 'Thứ 2, 4, 6 - 13h30-15h00',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    status: 'completed',
  },
];

// Mock data for performance metrics
const mockPerformanceMetrics: PerformanceMetrics = {
  messagesCount: {
    total: 1250,
    thisMonth: 180,
    growth: 15.5,
  },
  ticketsResolved: {
    total: 95,
    thisMonth: 12,
    averageResponseTime: 45, // 45 minutes
  },
  classesManaged: {
    total: 4,
    active: 3,
  },
  satisfactionRate: {
    rating: 4.7,
    totalReviews: 87,
  },
  activityScore: {
    score: 88,
    trend: 'up',
  },
};

// Mock data for user settings
const mockUserSettings: UserSettings = {
  notifications: {
    email: true,
    push: true,
    messages: true,
    tickets: true,
    announcements: false,
  },
  preferences: {
    language: 'vi',
    theme: 'light',
    timezone: 'Asia/Ho_Chi_Minh',
  },
  privacy: {
    showEmail: false,
    showPhone: false,
    showProfile: true,
  },
};

// TA Service
export const taService = {
  // Get TA profile
  async getProfile(): Promise<TAProfile> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockTAProfile;
  },

  // Update TA profile
  async updateProfile(data: UpdateProfileRequest): Promise<TAProfile> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    Object.assign(mockTAProfile, data);
    return mockTAProfile;
  },

  // Change password
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation
    if (data.currentPassword === 'wrong') {
      throw new Error('Mật khẩu hiện tại không đúng');
    }
  },

  // Get assigned classes
  async getAssignedClasses(): Promise<AssignedClass[]> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return mockAssignedClasses;
  },

  // Get performance metrics
  async getPerformanceMetrics(): Promise<PerformanceMetrics> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockPerformanceMetrics;
  },

  // Get user settings
  async getSettings(): Promise<UserSettings> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockUserSettings;
  },

  // Update user settings
  async updateSettings(data: UpdateSettingsRequest): Promise<UserSettings> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (data.notifications) {
      Object.assign(mockUserSettings.notifications, data.notifications);
    }
    if (data.preferences) {
      Object.assign(mockUserSettings.preferences, data.preferences);
    }
    if (data.privacy) {
      Object.assign(mockUserSettings.privacy, data.privacy);
    }

    return mockUserSettings;
  },
};

export default taService;
