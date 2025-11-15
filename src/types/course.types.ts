/**
 * Course Types - Teaching Assistant Module
 * Types for course catalog and recommendations
 */

export interface Course {
  id: string;
  name: string;
  title: string;
  description: string;
  topic: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;

  // Instructor
  instructorName: string;
  instructorId: string;

  // Schedule
  schedule: {
    day: string;
    time: string;
    location: string;
    startDate: string;
    endDate: string;
  };

  // Capacity
  capacity: number;
  enrolled: number;
  available: number;

  // Duration
  totalSessions: number;
  sessionDuration: number; // in hours
  totalHours: number;

  // Content
  objectives: string[];
  syllabus?: string[];
  prerequisites?: string[];

  // Pricing
  price: number;
  currency: 'VND' | 'USD';
  discount?: {
    percentage: number;
    validUntil: string;
  };

  // Ratings
  rating: number;
  reviewCount: number;

  // Status
  status: 'Draft' | 'Published' | 'Ongoing' | 'Completed' | 'Cancelled';

  // Media
  thumbnailUrl?: string;
  previewVideoUrl?: string;

  // Tags
  tags: string[];
  ageGroups: string[]; // e.g., "0-3 tuổi", "3-6 tuổi"
}

export interface CourseDetail extends Course {
  // Extended details
  detailedDescription: string;
  syllabus: Array<{
    session: number;
    topic: string;
    objectives: string[];
    materials?: string[];
  }>;
  instructor: {
    id: string;
    name: string;
    bio: string;
    expertise: string[];
    avatarUrl?: string;
  };
  reviews: Array<{
    id: string;
    parentId: string;
    parentName: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  relatedCourses: string[]; // Course IDs
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export interface CourseRecommendation {
  course: Course;
  score: number; // 0-100
  reasons: string[];
  matchCriteria: {
    childAge: boolean;
    interests: boolean;
    previousCourses: boolean;
    popularWithSimilarParents: boolean;
  };
}

// API Request/Response Types
export interface GetCoursesRequest {
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  ageGroup?: string;
  status?: 'Published' | 'Ongoing';
  minRating?: number;
  maxPrice?: number;
  search?: string;
  tags?: string[];
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'rating' | 'popularity' | 'startDate';
  sortOrder?: 'asc' | 'desc';
}

export interface GetCoursesResponse {
  success: boolean;
  data: {
    courses: Course[];
    total: number;
    page: number;
    limit: number;
    filters: {
      categories: string[];
      levels: string[];
      ageGroups: string[];
      priceRange: { min: number; max: number };
    };
  };
  message?: string;
}

export interface GetCourseDetailResponse {
  success: boolean;
  data: CourseDetail;
  message?: string;
}

export interface GetCourseRecommendationsResponse {
  success: boolean;
  data: {
    recommendations: CourseRecommendation[];
    total: number;
  };
  message?: string;
}
