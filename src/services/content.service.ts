/**
 * Content Service - Teaching Assistant Module
 * Handles content management, video/article creation, and content analytics
 */

import { api } from './api';
import type {
  Content,
  Category,
  GetContentsRequest,
  GetContentsResponse,
  GetContentDetailResponse,
  UploadVideoResponse,
  CreateArticleRequest,
  CreateVideoRequest,
  UpdateContentRequest,
  GetContentAnalyticsResponse,
  GetCategoriesResponse,
} from '@/types/content.types';

// Mock delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ========================================
// MOCK DATA: Categories
// ========================================

export const mockCategories: Category[] = [
  {
    id: 'CAT001',
    name: 'Nuôi dạy con 0-3 tuổi',
    description: 'Nội dung về chăm sóc và nuôi dạy trẻ sơ sinh đến 3 tuổi',
    contentCount: 24,
    icon: '👶',
    color: '#FF6B6B',
  },
  {
    id: 'CAT002',
    name: 'Tâm lý trẻ em',
    description: 'Kiến thức về phát triển tâm lý trẻ em',
    contentCount: 18,
    icon: '🧠',
    color: '#4ECDC4',
  },
  {
    id: 'CAT003',
    name: 'Giáo dục sớm',
    description: 'Phương pháp giáo dục sớm hiệu quả',
    contentCount: 15,
    icon: '📚',
    color: '#95E1D3',
  },
  {
    id: 'CAT004',
    name: 'Dinh dưỡng',
    description: 'Dinh dưỡng và chế độ ăn cho trẻ',
    contentCount: 12,
    icon: '🍎',
    color: '#FFD93D',
  },
  {
    id: 'CAT005',
    name: 'Kỹ năng sống',
    description: 'Dạy con các kỹ năng sống cần thiết',
    contentCount: 20,
    icon: '🌟',
    color: '#A8E6CF',
  },
];

// ========================================
// MOCK DATA: Contents
// ========================================

export const mockContents: Content[] = [
  {
    id: 'CNT001',
    title: 'Cách ru con ngủ hiệu quả',
    description: 'Hướng dẫn chi tiết về các phương pháp ru con ngủ an toàn và hiệu quả',
    type: 'video',
    status: 'published',
    categoryId: 'CAT001',
    categoryName: 'Nuôi dạy con 0-3 tuổi',
    thumbnailUrl: 'https://via.placeholder.com/320x180/FF6B6B/FFFFFF?text=Video+1',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: 480, // 8 minutes
    viewCount: 1250,
    likeCount: 89,
    shareCount: 23,
    createdBy: 'Cô Nguyễn Thị Hoa',
    createdAt: '2025-10-15T10:00:00Z',
    updatedAt: '2025-10-15T10:00:00Z',
    publishedAt: '2025-10-15T10:00:00Z',
    tags: ['ru con', 'ngủ', 'trẻ sơ sinh'],
  },
  {
    id: 'CNT002',
    title: 'Phát triển ngôn ngữ ở trẻ 2-3 tuổi',
    description: 'Các mốc phát triển ngôn ngữ và cách kích thích trẻ nói',
    type: 'article',
    status: 'published',
    categoryId: 'CAT002',
    categoryName: 'Tâm lý trẻ em',
    thumbnailUrl: 'https://via.placeholder.com/320x180/4ECDC4/FFFFFF?text=Article+1',
    articleContent: '<h2>Phát triển ngôn ngữ</h2><p>Nội dung bài viết chi tiết...</p>',
    viewCount: 890,
    likeCount: 67,
    shareCount: 15,
    createdBy: 'Thầy Trần Văn Nam',
    createdAt: '2025-10-20T14:30:00Z',
    updatedAt: '2025-10-20T14:30:00Z',
    publishedAt: '2025-10-20T14:30:00Z',
    tags: ['ngôn ngữ', 'phát triển', '2-3 tuổi'],
  },
  {
    id: 'CNT003',
    title: 'Phương pháp Montessori tại nhà',
    description: 'Áp dụng phương pháp Montessori trong giáo dục gia đình',
    type: 'video',
    status: 'published',
    categoryId: 'CAT003',
    categoryName: 'Giáo dục sớm',
    thumbnailUrl: 'https://via.placeholder.com/320x180/95E1D3/FFFFFF?text=Video+2',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: 720, // 12 minutes
    viewCount: 2100,
    likeCount: 156,
    shareCount: 45,
    createdBy: 'Cô Lê Thị Mai',
    createdAt: '2025-11-01T09:00:00Z',
    updatedAt: '2025-11-01T09:00:00Z',
    publishedAt: '2025-11-01T09:00:00Z',
    tags: ['montessori', 'giáo dục sớm', 'phương pháp'],
  },
  {
    id: 'CNT004',
    title: 'Thực đơn dinh dưỡng cho trẻ 1-2 tuổi',
    description: 'Hướng dẫn xây dựng thực đơn cân bằng dinh dưỡng',
    type: 'article',
    status: 'draft',
    categoryId: 'CAT004',
    categoryName: 'Dinh dưỡng',
    thumbnailUrl: 'https://via.placeholder.com/320x180/FFD93D/FFFFFF?text=Article+2',
    articleContent: '<h2>Thực đơn dinh dưỡng</h2><p>Nội dung đang được hoàn thiện...</p>',
    viewCount: 0,
    likeCount: 0,
    shareCount: 0,
    createdBy: 'Cô Nguyễn Thị Hoa',
    createdAt: '2025-11-10T16:00:00Z',
    updatedAt: '2025-11-12T10:00:00Z',
    tags: ['dinh dưỡng', 'thực đơn', '1-2 tuổi'],
  },
  {
    id: 'CNT005',
    title: 'Dạy con kỹ năng tự phục vụ',
    description: 'Cách dạy trẻ tự ăn, tự mặc quần áo, tự vệ sinh',
    type: 'video',
    status: 'published',
    categoryId: 'CAT005',
    categoryName: 'Kỹ năng sống',
    thumbnailUrl: 'https://via.placeholder.com/320x180/A8E6CF/FFFFFF?text=Video+3',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: 600, // 10 minutes
    viewCount: 1580,
    likeCount: 112,
    shareCount: 34,
    createdBy: 'Thầy Trần Văn Nam',
    createdAt: '2025-11-05T11:00:00Z',
    updatedAt: '2025-11-05T11:00:00Z',
    publishedAt: '2025-11-05T11:00:00Z',
    tags: ['kỹ năng sống', 'tự phục vụ', 'độc lập'],
  },
];

// ========================================
// SERVICE FUNCTIONS
// ========================================

// Use mock data in development if API is not available
const USE_MOCK = import.meta.env.DEV || import.meta.env.MODE === 'development';

export const contentService = {
  /**
   * Get list of contents with filters and pagination
   */
  async getContents(params: GetContentsRequest = {}): Promise<GetContentsResponse> {
    if (USE_MOCK) {
      await delay(400);

      let filteredContents = [...mockContents];

      // Apply filters
      if (params.type) {
        filteredContents = filteredContents.filter((c) => c.type === params.type);
      }
      if (params.status) {
        filteredContents = filteredContents.filter((c) => c.status === params.status);
      }
      if (params.categoryId) {
        filteredContents = filteredContents.filter((c) => c.categoryId === params.categoryId);
      }
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filteredContents = filteredContents.filter(
          (c) =>
            c.title.toLowerCase().includes(searchLower) ||
            c.description.toLowerCase().includes(searchLower) ||
            c.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      }

      // Apply sorting
      const sortBy = params.sortBy || 'createdAt';
      const sortOrder = params.sortOrder || 'desc';
      filteredContents.sort((a, b) => {
        let aVal: any = a[sortBy];
        let bVal: any = b[sortBy];

        if (sortBy === 'createdAt') {
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        }

        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });

      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedContents = filteredContents.slice(startIndex, endIndex);

      return {
        success: true,
        data: {
          contents: paginatedContents,
          pagination: {
            page,
            limit,
            total: filteredContents.length,
            totalPages: Math.ceil(filteredContents.length / limit),
          },
        },
      };
    }

    const { data } = await api.get<GetContentsResponse>('/contents', { params });
    return data;
  },

  /**
   * Get content detail by ID with related contents
   */
  async getContentDetail(contentId: string): Promise<GetContentDetailResponse> {
    if (USE_MOCK) {
      await delay(300);

      const content = mockContents.find((c) => c.id === contentId);
      if (!content) {
        throw new Error('Content not found');
      }

      // Get related contents from same category
      const relatedContents = mockContents
        .filter((c) => c.categoryId === content.categoryId && c.id !== contentId && c.status === 'published')
        .slice(0, 4);

      return {
        success: true,
        data: {
          content,
          relatedContents,
        },
      };
    }

    const { data } = await api.get<GetContentDetailResponse>(`/contents/${contentId}`);
    return data;
  },

  /**
   * Upload video content
   */
  async uploadVideo(formData: FormData): Promise<UploadVideoResponse> {
    if (USE_MOCK) {
      await delay(1500);

      // Simulate video upload
      const newContent: Content = {
        id: `CNT${String(mockContents.length + 1).padStart(3, '0')}`,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        type: 'video',
        status: 'draft',
        categoryId: formData.get('categoryId') as string,
        categoryName: mockCategories.find((c) => c.id === formData.get('categoryId'))?.name || '',
        thumbnailUrl: 'https://via.placeholder.com/320x180',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 600,
        viewCount: 0,
        likeCount: 0,
        shareCount: 0,
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: [],
      };

      mockContents.push(newContent);

      return {
        success: true,
        data: {
          content: newContent,
          uploadedUrl: newContent.videoUrl!,
        },
      };
    }

    const { data } = await api.post<UploadVideoResponse>('/contents/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  /**
   * Create article content
   */
  async createArticle(articleData: CreateArticleRequest): Promise<Content> {
    if (USE_MOCK) {
      await delay(500);

      const newContent: Content = {
        id: `CNT${String(mockContents.length + 1).padStart(3, '0')}`,
        title: articleData.title,
        description: articleData.description,
        type: 'article',
        status: articleData.status || 'draft',
        categoryId: articleData.categoryId,
        categoryName: mockCategories.find((c) => c.id === articleData.categoryId)?.name || '',
        thumbnailUrl: articleData.thumbnailUrl,
        articleContent: articleData.content,
        viewCount: 0,
        likeCount: 0,
        shareCount: 0,
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: articleData.tags || [],
      };

      mockContents.push(newContent);
      return newContent;
    }

    const { data } = await api.post<{ success: boolean; data: Content }>('/contents/article', articleData);
    return data.data;
  },

  /**
   * Update content
   */
  async updateContent(contentId: string, updates: UpdateContentRequest): Promise<Content> {
    if (USE_MOCK) {
      await delay(400);

      const index = mockContents.findIndex((c) => c.id === contentId);
      if (index === -1) {
        throw new Error('Content not found');
      }

      mockContents[index] = {
        ...mockContents[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      return mockContents[index];
    }

    const { data } = await api.put<{ success: boolean; data: Content }>(`/contents/${contentId}`, updates);
    return data.data;
  },

  /**
   * Delete content
   */
  async deleteContent(contentId: string): Promise<void> {
    if (USE_MOCK) {
      await delay(300);

      const index = mockContents.findIndex((c) => c.id === contentId);
      if (index !== -1) {
        mockContents.splice(index, 1);
      }
      return;
    }

    await api.delete(`/contents/${contentId}`);
  },

  /**
   * Publish content (change status from draft to published)
   */
  async publishContent(contentId: string): Promise<Content> {
    if (USE_MOCK) {
      await delay(300);

      const index = mockContents.findIndex((c) => c.id === contentId);
      if (index === -1) {
        throw new Error('Content not found');
      }

      mockContents[index] = {
        ...mockContents[index],
        status: 'published',
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return mockContents[index];
    }

    const { data } = await api.post<{ success: boolean; data: Content }>(`/contents/${contentId}/publish`);
    return data.data;
  },

  /**
   * Get content analytics
   */
  async getContentAnalytics(contentId: string): Promise<GetContentAnalyticsResponse> {
    if (USE_MOCK) {
      await delay(500);

      const content = mockContents.find((c) => c.id === contentId);
      if (!content) {
        throw new Error('Content not found');
      }

      // Generate mock analytics data
      const dailyViews = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        count: Math.floor(Math.random() * 100) + 10,
      }));

      return {
        success: true,
        data: {
          contentId,
          title: content.title,
          views: {
            total: content.viewCount,
            trend: 15.5, // +15.5%
            daily: dailyViews,
          },
          engagement: {
            likes: content.likeCount,
            shares: content.shareCount,
            averageWatchTime: content.duration ? content.duration * 0.65 : 0,
            completionRate: 65,
          },
          demographics: {
            byAge: [
              { ageGroup: '18-25', count: 120 },
              { ageGroup: '26-35', count: 450 },
              { ageGroup: '36-45', count: 380 },
              { ageGroup: '46+', count: 150 },
            ],
            byLocation: [
              { city: 'Hà Nội', count: 450 },
              { city: 'TP.HCM', count: 380 },
              { city: 'Đà Nẵng', count: 120 },
              { city: 'Cần Thơ', count: 80 },
              { city: 'Khác', count: 70 },
            ],
          },
        },
      };
    }

    const { data } = await api.get<GetContentAnalyticsResponse>(`/contents/${contentId}/analytics`);
    return data;
  },

  /**
   * Get all categories
   */
  async getCategories(): Promise<GetCategoriesResponse> {
    if (USE_MOCK) {
      await delay(200);

      return {
        success: true,
        data: {
          categories: mockCategories,
        },
      };
    }

    const { data } = await api.get<GetCategoriesResponse>('/contents/categories');
    return data;
  },
};
