/**
 * Content Types - Teaching Assistant Module
 * Types for content management, video/article creation, and content analytics
 */

// ========================================
// CONTENT TYPES
// ========================================

export type ContentType = 'video' | 'article' | 'document';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface Content {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  status: ContentStatus;
  categoryId: string;
  categoryName: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  articleContent?: string;
  documentUrl?: string;
  duration?: number; // in seconds for videos
  viewCount: number;
  likeCount: number;
  shareCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  contentCount: number;
  icon?: string;
  color?: string;
}

// ========================================
// REQUEST TYPES
// ========================================

export interface GetContentsRequest {
  page?: number;
  limit?: number;
  type?: ContentType;
  status?: ContentStatus;
  categoryId?: string;
  search?: string;
  sortBy?: 'createdAt' | 'viewCount' | 'likeCount' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface CreateArticleRequest {
  title: string;
  description: string;
  categoryId: string;
  content: string;
  thumbnailUrl?: string;
  tags?: string[];
  status?: ContentStatus;
}

export interface CreateVideoRequest {
  title: string;
  description: string;
  categoryId: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number;
  tags?: string[];
  status?: ContentStatus;
}

export interface UpdateContentRequest {
  title?: string;
  description?: string;
  categoryId?: string;
  content?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  tags?: string[];
  status?: ContentStatus;
}

// ========================================
// RESPONSE TYPES
// ========================================

export interface GetContentsResponse {
  success: boolean;
  data: {
    contents: Content[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface GetContentDetailResponse {
  success: boolean;
  data: {
    content: Content;
    relatedContents: Content[];
  };
}

export interface UploadVideoResponse {
  success: boolean;
  data: {
    content: Content;
    uploadedUrl: string;
  };
}

export interface GetContentAnalyticsResponse {
  success: boolean;
  data: {
    contentId: string;
    title: string;
    views: {
      total: number;
      trend: number; // percentage change
      daily: Array<{ date: string; count: number }>;
    };
    engagement: {
      likes: number;
      shares: number;
      averageWatchTime: number; // in seconds
      completionRate: number; // percentage
    };
    demographics: {
      byAge: Array<{ ageGroup: string; count: number }>;
      byLocation: Array<{ city: string; count: number }>;
    };
  };
}

export interface GetCategoriesResponse {
  success: boolean;
  data: {
    categories: Category[];
  };
}

// ========================================
// UPLOAD TYPES
// ========================================

export interface UploadResponse {
  success: boolean;
  data: {
    fileId: string;
    url: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    uploadedAt: string;
  };
}

export interface UploadProgressCallback {
  (progress: number): void;
}
