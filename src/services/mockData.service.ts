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

  // Mock dashboard data
  async getDashboard(): Promise<MockDashboard> {
    await delay(800);

    return {
      kpis: {
        totalClasses: 12,
        totalStudents: 356,
        totalParents: 385,
        unreadMessages: 23,
      },
      parentSegments: {
        notStarted: 85,
        slowProgress: 42,
        topPerformers: 128,
      },
      recentActivities: [
        {
          id: '1',
          type: 'message',
          message: 'Nhận được tin nhắn từ phụ huynh Nguyễn Văn A',
          time: '10 phút trước',
        },
        {
          id: '2',
          type: 'class',
          message: 'Lớp Toán lớp 5 - Bài tập mới được gửi',
          time: '1 giờ trước',
        },
        {
          id: '3',
          type: 'survey',
          message: 'Khảo sát "Phương pháp học tập" đã có 45 phản hồi',
          time: '2 giờ trước',
        },
      ],
      classPerformance: [
        { className: 'Toán lớp 5', participation: 85, attendance: 92 },
        { className: 'Tiếng Việt lớp 4', participation: 78, attendance: 88 },
        { className: 'Khoa học lớp 3', participation: 90, attendance: 95 },
        { className: 'Lịch sử lớp 5', participation: 72, attendance: 85 },
      ],
    };
  },

  // Mock classes
  async getClasses(): Promise<MockClass[]> {
    await delay(600);
    
    return [
      {
        id: '1',
        name: 'Toán lớp 5',
        grade: 'Lớp 5',
        subject: 'Toán học',
        studentCount: 35,
        parentCount: 42,
        teacherName: 'Cô Nguyễn Thị Lan',
      },
      {
        id: '2',
        name: 'Tiếng Việt lớp 4',
        grade: 'Lớp 4',
        subject: 'Tiếng Việt',
        studentCount: 32,
        parentCount: 38,
        teacherName: 'Thầy Trần Văn Nam',
      },
      {
        id: '3',
        name: 'Khoa học lớp 3',
        grade: 'Lớp 3',
        subject: 'Khoa học',
        studentCount: 28,
        parentCount: 31,
        teacherName: 'Cô Lê Thị Hoa',
      },
      {
        id: '4',
        name: 'Lịch sử lớp 5',
        grade: 'Lớp 5',
        subject: 'Lịch sử',
        studentCount: 30,
        parentCount: 35,
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

