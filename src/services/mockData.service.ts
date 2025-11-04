// Mock Data Service for Development
// This service provides mock API responses when backend is not available

export interface MockUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  avatarUrl?: string;
}

export interface MockClass {
  id: string;
  name: string;
  grade: string;
  subject: string;
  studentCount: number;
  parentCount: number;
  teacherName: string;
}

export interface MockDashboard {
  kpis: {
    totalClasses: number;
    totalStudents: number;
    totalParents: number;
    unreadMessages: number;
  };
  parentSegments: {
    notStarted: number;
    slowProgress: number;
    topPerformers: number;
  };
  recentActivities: Array<{
    id: string;
    type: string;
    message: string;
    time: string;
  }>;
  classPerformance: Array<{
    className: string;
    participation: number;
    attendance: number;
  }>;
}

export interface MockMessage {
  id: string;
  to: string[];
  content: string;
  type: 'text' | 'image' | 'video';
  sentAt: string;
  status: 'sent' | 'delivered' | 'read';
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockDataService = {
  // Mock login
  async login(email: string, password: string) {
    await delay(1000);
    
    // Mock successful login - accept any email and password (≥6 chars)
    if (email && password && password.length >= 6) {
      return {
        success: true,
        data: {
          accessToken: 'mock_access_token_' + Date.now(),
          refreshToken: 'mock_refresh_token_' + Date.now(),
          user: {
            id: '1',
            email: email,
            fullName: 'Trợ Giảng Demo',
            role: 'assistant',
            avatarUrl: '',
          },
        },
      };
    }
    
    throw new Error('Email hoặc mật khẩu không đúng');
  },

  // Mock dashboard data - ADULT EDUCATION PLATFORM
  async getDashboard(): Promise<MockDashboard> {
    await delay(800);

    return {
      kpis: {
        totalClasses: 8,        // Adult parenting courses
        totalStudents: 68,      // Adult learners (NOT 356!)
        totalParents: 68,       // Same as totalStudents (they ARE the learners)
        unreadMessages: 15,     // Reduced from 23
      },
      parentSegments: {
        notStarted: 12,
        slowProgress: 18,
        topPerformers: 38,
      },
      recentActivities: [
        {
          id: '1',
          type: 'message',
          message: 'Gửi tin nhắn đến 25 học viên lớp "Nuôi dạy con 0-3 tuổi"',
          time: '30 phút trước',
        },
        {
          id: '2',
          type: 'class',
          message: '15 học viên hoàn thành khóa "Tâm lý học đường"',
          time: '2 giờ trước',
        },
        {
          id: '3',
          type: 'attendance',
          message: '20 học viên đã điểm danh buổi học tối nay',
          time: '3 giờ trước',
        },
      ],
      classPerformance: [
        { className: 'Nuôi dạy con 0-3 tuổi', participation: 92, attendance: 95 },
        { className: 'Tâm lý học đường', participation: 85, attendance: 88 },
        { className: 'Nuôi con bằng tình yêu thương', participation: 90, attendance: 92 },
        { className: 'Kỹ năng giao tiếp với con', participation: 78, attendance: 85 },
      ],
    };
  },

  // Mock classes - ADULT PARENTING COURSES
  async getClasses(): Promise<MockClass[]> {
    await delay(600);

    return [
      {
        id: '1',
        name: 'Nuôi dạy con 0-3 tuổi',
        grade: 'Cơ bản',
        subject: 'Nuôi dạy con',
        studentCount: 25,
        parentCount: 25,  // Same (learners ARE parents)
        teacherName: 'Cô Nguyễn Thị Hoa',
      },
      {
        id: '2',
        name: 'Tâm lý học đường',
        grade: 'Trung cấp',
        subject: 'Tâm lý trẻ em',
        studentCount: 20,
        parentCount: 20,
        teacherName: 'Thầy Trần Văn Nam',
      },
      {
        id: '3',
        name: 'Nuôi con bằng tình yêu thương',
        grade: 'Cơ bản',
        subject: 'Nuôi dạy con',
        studentCount: 18,
        parentCount: 18,
        teacherName: 'Cô Lê Thị Mai',
      },
      {
        id: '4',
        name: 'Kỹ năng giao tiếp với con',
        grade: 'Nâng cao',
        subject: 'Kỹ năng nuôi dạy',
        studentCount: 15,
        parentCount: 15,
        teacherName: 'Thầy Phạm Văn Đức',
      },
    ];
  },

  // Mock messages
  async getMessages(): Promise<MockMessage[]> {
    await delay(500);
    
    return [
      {
        id: '1',
        to: ['Phụ huynh A', 'Phụ huynh B'],
        content: 'Nhắc nhở: Bài tập về nhà tuần này cần nộp trước thứ 6',
        type: 'text',
        sentAt: '2025-11-01T10:30:00',
        status: 'read',
      },
      {
        id: '2',
        to: ['Lớp Toán lớp 5'],
        content: 'Thông báo: Lịch kiểm tra giữa kỳ sẽ được công bố vào tuần tới',
        type: 'text',
        sentAt: '2025-11-01T09:15:00',
        status: 'delivered',
      },
    ];
  },
};

