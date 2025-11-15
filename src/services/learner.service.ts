/**
 * Learner Service - Mock Data for Adult Education Platform
 *
 * Mock data for learners (adult parents) taking parenting courses
 * Extended with course catalog and recommendation features
 */

import type { Learner, Class, AttendanceRecord, LearnerProgress } from '@/types/learner.types';
import type {
  Course,
  CourseDetail,
  CourseRecommendation,
  GetCoursesRequest,
  GetCoursesResponse,
  GetCourseDetailResponse,
  GetCourseRecommendationsResponse,
} from '@/types/course.types';

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
// MOCK DATA: Courses (Catalog)
// ========================================

export const mockCourses: Course[] = [
  {
    id: 'C001',
    name: 'nuoi-day-con-0-3-tuoi',
    title: 'Nuôi dạy con 0-3 tuổi',
    description: 'Khóa học toàn diện về chăm sóc và nuôi dạy trẻ từ 0-3 tuổi',
    topic: 'Parenting Infants & Toddlers',
    level: 'Beginner',
    category: 'Parenting',
    instructorName: 'Cô Nguyễn Thị Hoa',
    instructorId: 'INST001',
    schedule: {
      day: 'Thứ 3, Thứ 5',
      time: '19:00-21:00',
      location: 'Phòng A101',
      startDate: '2025-09-01',
      endDate: '2025-12-15',
    },
    capacity: 30,
    enrolled: 25,
    available: 5,
    totalSessions: 24,
    sessionDuration: 2,
    totalHours: 48,
    objectives: [
      'Hiểu phát triển tâm sinh lý trẻ 0-3 tuổi',
      'Kỹ năng chăm sóc cơ bản',
      'Giao tiếp với trẻ nhỏ',
    ],
    price: 2500000,
    currency: 'VND',
    rating: 4.7,
    reviewCount: 45,
    status: 'Ongoing',
    tags: ['Parenting', 'Infants', 'Toddlers', 'Development'],
    ageGroups: ['0-3 tuổi'],
  },
  {
    id: 'C002',
    name: 'tam-ly-hoc-duong',
    title: 'Tâm lý học đường',
    description: 'Khóa học về tâm lý trẻ độ tuổi đi học và hỗ trợ con học tập',
    topic: 'School Psychology for Parents',
    level: 'Intermediate',
    category: 'Psychology',
    instructorName: 'Thầy Trần Văn Nam',
    instructorId: 'INST002',
    schedule: {
      day: 'Thứ 7',
      time: '14:00-17:00',
      location: 'Phòng B202',
      startDate: '2025-09-10',
      endDate: '2025-12-20',
    },
    capacity: 25,
    enrolled: 20,
    available: 5,
    totalSessions: 16,
    sessionDuration: 3,
    totalHours: 48,
    objectives: [
      'Hiểu tâm lý trẻ 6-12 tuổi',
      'Hỗ trợ con học tập',
      'Giải quyết vấn đề hành vi',
    ],
    price: 3000000,
    currency: 'VND',
    rating: 4.5,
    reviewCount: 32,
    status: 'Ongoing',
    tags: ['Psychology', 'School-age', 'Learning', 'Behavior'],
    ageGroups: ['6-12 tuổi'],
  },
  {
    id: 'C003',
    name: 'nuoi-con-bang-tinh-yeu-thuong',
    title: 'Nuôi con bằng tình yêu thương',
    description: 'Khóa học về nuôi dạy con bằng tình yêu thương và kỷ luật tích cực',
    topic: 'Positive Parenting',
    level: 'Beginner',
    category: 'Parenting',
    instructorName: 'Cô Lê Thị Mai',
    instructorId: 'INST003',
    schedule: {
      day: 'Chủ nhật',
      time: '09:00-12:00',
      location: 'Phòng C303',
      startDate: '2025-10-01',
      endDate: '2025-12-30',
    },
    capacity: 30,
    enrolled: 18,
    available: 12,
    totalSessions: 12,
    sessionDuration: 3,
    totalHours: 36,
    objectives: [
      'Xây dựng mối quan hệ cha mẹ - con',
      'Kỹ năng kỷ luật tích cực',
      'Giao tiếp hiệu quả',
    ],
    price: 2800000,
    currency: 'VND',
    discount: {
      percentage: 10,
      validUntil: '2025-11-30',
    },
    rating: 4.8,
    reviewCount: 28,
    status: 'Ongoing',
    tags: ['Positive Parenting', 'Communication', 'Discipline'],
    ageGroups: ['0-3 tuổi', '3-6 tuổi'],
  },
  {
    id: 'C004',
    name: 'phat-trien-tri-tue-cam-xuc',
    title: 'Phát triển trí tuệ cảm xúc',
    description: 'Hướng dẫn phát triển EQ cho trẻ từ 3-10 tuổi',
    topic: 'Emotional Intelligence',
    level: 'Intermediate',
    category: 'Development',
    instructorName: 'Cô Phạm Thị Hà',
    instructorId: 'INST004',
    schedule: {
      day: 'Thứ 4',
      time: '18:30-20:30',
      location: 'Phòng D404',
      startDate: '2025-11-15',
      endDate: '2026-02-15',
    },
    capacity: 20,
    enrolled: 8,
    available: 12,
    totalSessions: 12,
    sessionDuration: 2,
    totalHours: 24,
    objectives: [
      'Nhận diện cảm xúc của trẻ',
      'Dạy trẻ quản lý cảm xúc',
      'Phát triển kỹ năng xã hội',
    ],
    price: 3500000,
    currency: 'VND',
    rating: 4.9,
    reviewCount: 15,
    status: 'Published',
    tags: ['EQ', 'Emotions', 'Social Skills'],
    ageGroups: ['3-6 tuổi', '6-12 tuổi'],
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

  // ========================================
  // COURSE CATALOG FUNCTIONS
  // ========================================

  /**
   * Get courses with filtering and pagination
   * Endpoint: GET /api/v1/ta/courses
   */
  async getCourses(params: GetCoursesRequest): Promise<GetCoursesResponse> {
    await delay(500);

    const {
      category,
      level,
      ageGroup,
      status,
      minRating,
      maxPrice,
      search,
      tags,
      page = 1,
      limit = 20,
      sortBy = 'rating',
      sortOrder = 'desc',
    } = params;

    let filteredCourses = [...mockCourses];

    // Apply filters
    if (category) {
      filteredCourses = filteredCourses.filter((c) => c.category === category);
    }
    if (level) {
      filteredCourses = filteredCourses.filter((c) => c.level === level);
    }
    if (ageGroup) {
      filteredCourses = filteredCourses.filter((c) => c.ageGroups.includes(ageGroup));
    }
    if (status) {
      filteredCourses = filteredCourses.filter((c) => c.status === status);
    }
    if (minRating !== undefined) {
      filteredCourses = filteredCourses.filter((c) => c.rating >= minRating);
    }
    if (maxPrice !== undefined) {
      filteredCourses = filteredCourses.filter((c) => c.price <= maxPrice);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCourses = filteredCourses.filter(
        (c) =>
          c.title.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower) ||
          c.topic.toLowerCase().includes(searchLower)
      );
    }
    if (tags && tags.length > 0) {
      filteredCourses = filteredCourses.filter((c) => tags.some((tag) => c.tags.includes(tag)));
    }

    // Sorting
    filteredCourses.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'popularity':
          comparison = a.enrolled - b.enrolled;
          break;
        case 'startDate':
          comparison =
            new Date(a.schedule.startDate).getTime() - new Date(b.schedule.startDate).getTime();
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    // Pagination
    const total = filteredCourses.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedCourses = filteredCourses.slice(start, end);

    // Get filter options
    const categories = [...new Set(mockCourses.map((c) => c.category))];
    const levels = [...new Set(mockCourses.map((c) => c.level))];
    const ageGroups = [...new Set(mockCourses.flatMap((c) => c.ageGroups))];
    const prices = mockCourses.map((c) => c.price);
    const priceRange = { min: Math.min(...prices), max: Math.max(...prices) };

    return {
      success: true,
      data: {
        courses: paginatedCourses,
        total,
        page,
        limit,
        filters: {
          categories,
          levels,
          ageGroups,
          priceRange,
        },
      },
      message: 'Courses retrieved successfully',
    };
  },

  /**
   * Get course detail by ID
   * Endpoint: GET /api/v1/ta/courses/:id
   */
  async getCourseDetail(courseId: string): Promise<GetCourseDetailResponse> {
    await delay(400);

    const course = mockCourses.find((c) => c.id === courseId);

    if (!course) {
      return {
        success: false,
        data: {} as CourseDetail,
        message: 'Course not found',
      };
    }

    // Build detailed course info
    const courseDetail: CourseDetail = {
      ...course,
      detailedDescription: `${course.description}\n\nKhóa học này được thiết kế dành riêng cho phụ huynh muốn nâng cao kỹ năng nuôi dạy con. Với ${course.totalSessions} buổi học tập trung và thực hành, bạn sẽ học được những kiến thức và kỹ năng cần thiết để hỗ trợ sự phát triển toàn diện của con.`,
      syllabus: Array.from({ length: Math.min(course.totalSessions, 6) }, (_, i) => ({
        session: i + 1,
        topic: `Buổi ${i + 1}: ${course.objectives[i % course.objectives.length]}`,
        objectives: [
          'Hiểu rõ lý thuyết cơ bản',
          'Thực hành kỹ năng',
          'Áp dụng vào thực tế',
        ],
        materials: ['Slide bài giảng', 'Tài liệu tham khảo', 'Video minh họa'],
      })),
      instructor: {
        id: course.instructorId,
        name: course.instructorName,
        bio: `${course.instructorName} có hơn 10 năm kinh nghiệm trong lĩnh vực giáo dục gia đình và tư vấn phụ huynh.`,
        expertise: ['Tâm lý học phát triển', 'Giáo dục gia đình', 'Tư vấn phụ huynh'],
        avatarUrl: '',
      },
      reviews: [
        {
          id: 'REV001',
          parentId: 'PAR001',
          parentName: 'Nguyễn Thị Lan',
          rating: 5,
          comment: 'Khóa học rất bổ ích! Giáo viên nhiệt tình và kiến thức thực tế.',
          date: '2025-11-10',
        },
        {
          id: 'REV002',
          parentId: 'PAR002',
          parentName: 'Trần Văn Minh',
          rating: 4,
          comment: 'Nội dung hay, tuy nhiên mong có thêm nhiều ví dụ thực tế hơn.',
          date: '2025-11-08',
        },
      ],
      relatedCourses: mockCourses
        .filter((c) => c.id !== courseId && c.category === course.category)
        .slice(0, 3)
        .map((c) => c.id),
      faqs: [
        {
          question: 'Khóa học có phù hợp với người mới bắt đầu không?',
          answer: 'Có, khóa học được thiết kế phù hợp cho cả người mới và có kinh nghiệm.',
        },
        {
          question: 'Tôi có thể học bù buổi bỏ lỡ không?',
          answer: 'Có, chúng tôi cung cấp video ghi hình và tài liệu cho các buổi bỏ lỡ.',
        },
        {
          question: 'Có chứng chỉ sau khi hoàn thành không?',
          answer: 'Có, bạn sẽ nhận được chứng chỉ hoàn thành khóa học.',
        },
      ],
    };

    return {
      success: true,
      data: courseDetail,
      message: 'Course details retrieved successfully',
    };
  },

  /**
   * Get course recommendations for a parent
   * Endpoint: GET /api/v1/ta/parents/:id/recommendations
   */
  async getRecommendations(parentId: string): Promise<GetCourseRecommendationsResponse> {
    await delay(600);

    const parent = mockLearners.find((l) => l.id === parentId);

    if (!parent) {
      return {
        success: false,
        data: { recommendations: [], total: 0 },
        message: 'Parent not found',
      };
    }

    // Get courses not already enrolled
    const availableCourses = mockCourses.filter(
      (c) => !parent.enrolledClasses.includes(c.id) && c.status === 'Published' || c.status === 'Ongoing'
    );

    // Calculate recommendation scores
    const recommendations: CourseRecommendation[] = availableCourses.map((course) => {
      let score = 50; // Base score
      const reasons: string[] = [];
      const matchCriteria = {
        childAge: false,
        interests: false,
        previousCourses: false,
        popularWithSimilarParents: false,
      };

      // Match based on child age
      const childAges = parent.childrenAges.toLowerCase();
      const courseAges = course.ageGroups.join(' ').toLowerCase();
      if (
        (childAges.includes('0') || childAges.includes('1') || childAges.includes('2') || childAges.includes('3')) &&
        courseAges.includes('0-3')
      ) {
        score += 20;
        matchCriteria.childAge = true;
        reasons.push('Phù hợp với độ tuổi con bạn');
      } else if (childAges.match(/\d+/) && courseAges.includes('6-12')) {
        const age = parseInt(childAges.match(/\d+/)![0]);
        if (age >= 6 && age <= 12) {
          score += 20;
          matchCriteria.childAge = true;
          reasons.push('Phù hợp với độ tuổi con bạn');
        }
      }

      // High rating bonus
      if (course.rating >= 4.5) {
        score += 15;
        reasons.push(`Đánh giá cao (${course.rating}/5)`);
      }

      // Popular course
      if (course.enrolled >= 15) {
        score += 10;
        matchCriteria.popularWithSimilarParents = true;
        reasons.push('Nhiều phụ huynh đã tham gia');
      }

      // Parent's previous courses in same category
      const enrolledCourses = mockCourses.filter((c) => parent.enrolledClasses.includes(c.id));
      if (enrolledCourses.some((c) => c.category === course.category)) {
        score += 15;
        matchCriteria.previousCourses = true;
        reasons.push('Liên quan đến khóa học bạn đã tham gia');
      }

      // Available spots
      if (course.available > 0) {
        score += 5;
      }

      // Discount bonus
      if (course.discount) {
        score += 10;
        reasons.push(`Giảm giá ${course.discount.percentage}%`);
      }

      return {
        course,
        score: Math.min(score, 100),
        reasons,
        matchCriteria,
      };
    });

    // Sort by score (highest first)
    recommendations.sort((a, b) => b.score - a.score);

    // Return top recommendations
    const topRecommendations = recommendations.slice(0, 5);

    return {
      success: true,
      data: {
        recommendations: topRecommendations,
        total: topRecommendations.length,
      },
      message: 'Course recommendations retrieved successfully',
    };
  },
};
