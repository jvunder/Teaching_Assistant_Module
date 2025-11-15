/**
 * Content Types - Teaching Assistant Module
 *
 * Handles content management functionality including:
 * - Video content (YouTube, Vimeo, uploaded videos)
 * - Article content (blog posts, guides)
 * - Micro-course content (TikTok-style short lessons)
 * - Content analytics and performance tracking
 * - Upload and publishing workflows
 */

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Type of content
 */
export enum ContentType {
  VIDEO = 'video',
  ARTICLE = 'article',
  MICRO_COURSE = 'micro_course', // TikTok-style short content
  INFOGRAPHIC = 'infographic',
  PDF = 'pdf',
  PODCAST = 'podcast',
  WEBINAR = 'webinar'
}

/**
 * Content status in publishing workflow
 */
export enum ContentStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  APPROVED = 'approved',
  PUBLISHED = 'published',
  SCHEDULED = 'scheduled',
  ARCHIVED = 'archived',
  REJECTED = 'rejected'
}

/**
 * Video platform for video content
 */
export enum VideoPlatform {
  YOUTUBE = 'youtube',
  VIMEO = 'vimeo',
  UPLOADED = 'uploaded', // Self-hosted
  FACEBOOK = 'facebook',
  TIKTOK = 'tiktok'
}

/**
 * Content visibility
 */
export enum ContentVisibility {
  PUBLIC = 'public', // Visible to all
  MEMBERS_ONLY = 'members_only', // Only enrolled parents
  CLASS_SPECIFIC = 'class_specific', // Specific classes
  PREMIUM = 'premium', // Paid content only
  PRIVATE = 'private' // TA/Admin only
}

/**
 * Content category
 */
export enum ContentCategory {
  PARENTING_TIPS = 'parenting_tips',
  CHILD_DEVELOPMENT = 'child_development',
  EDUCATION_METHODS = 'education_methods',
  HEALTH_NUTRITION = 'health_nutrition',
  PSYCHOLOGY = 'psychology',
  SUCCESS_STORIES = 'success_stories',
  EVENT_COVERAGE = 'event_coverage',
  ANNOUNCEMENTS = 'announcements',
  TUTORIAL = 'tutorial',
  OTHER = 'other'
}

// ============================================================================
// INTERFACES - CORE TYPES
// ============================================================================

/**
 * Video content item
 */
export interface VideoContent {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;

  // Video details
  platform: VideoPlatform;
  videoUrl: string; // YouTube/Vimeo URL or uploaded video URL
  videoId?: string; // Platform-specific ID
  duration: number; // seconds
  embedCode?: string;

  // Metadata
  type: ContentType.VIDEO;
  status: ContentStatus;
  visibility: ContentVisibility;
  category: ContentCategory;

  // Target audience
  targetClasses?: string[]; // Class IDs if class-specific
  targetAge?: string; // e.g., "0-3 tu’i", "3-6 tu’i"
  tags: string[];

  // Publishing
  publishedAt?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string; // TA ID

  // Analytics
  analytics: ContentAnalytics;

  // Language
  language: 'vi' | 'zh';
  hasSubtitles: boolean;
  subtitleLanguages?: ('vi' | 'zh' | 'en')[];

  // Engagement
  allowComments: boolean;
  isPinned: boolean;
  isFeatured: boolean;
}

/**
 * Article/Blog content item
 */
export interface ArticleContent {
  id: string;
  title: string;
  excerpt: string; // Short summary
  content: string; // HTML content
  coverImageUrl: string;

  // Metadata
  type: ContentType.ARTICLE;
  status: ContentStatus;
  visibility: ContentVisibility;
  category: ContentCategory;

  // Author
  authorId: string; // TA ID
  authorName: string;
  authorAvatarUrl?: string;

  // Target audience
  targetClasses?: string[];
  targetAge?: string;
  tags: string[];

  // Publishing
  publishedAt?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;

  // Reading info
  readingTime: number; // minutes
  wordCount: number;

  // Analytics
  analytics: ContentAnalytics;

  // Language
  language: 'vi' | 'zh';

  // Engagement
  allowComments: boolean;
  isPinned: boolean;
  isFeatured: boolean;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  slug: string; // URL-friendly identifier
}

/**
 * Micro-course content (TikTok-style short lessons)
 */
export interface MicroCourseContent {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;

  // Content
  videoUrl: string;
  duration: number; // seconds (typically 15-60s)
  transcript?: string;

  // Micro-course specific
  lessonNumber?: number;
  seriesId?: string; // Group related micro-courses
  seriesName?: string;
  nextLessonId?: string;
  previousLessonId?: string;

  // Metadata
  type: ContentType.MICRO_COURSE;
  status: ContentStatus;
  visibility: ContentVisibility;
  category: ContentCategory;

  // Target audience
  targetClasses?: string[];
  targetAge?: string;
  tags: string[];

  // Publishing
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string; // TA ID

  // Analytics
  analytics: ContentAnalytics;

  // Language
  language: 'vi' | 'zh';

  // Gamification
  pointsAwarded?: number; // Points for completing
  badgeAwarded?: string;

  // Engagement
  allowComments: boolean;
  isVertical: boolean; // TikTok-style vertical video
}

/**
 * Content analytics and performance metrics
 */
export interface ContentAnalytics {
  contentId: string;

  // View metrics
  totalViews: number;
  uniqueViews: number;
  viewsByDate: ViewsByDate[];
  viewsByClass: ViewsByClass[];

  // Engagement metrics
  averageViewDuration: number; // seconds
  completionRate: number; // Percentage who watched/read to end
  engagementRate: number; // Likes, comments, shares / views

  // Interaction metrics
  likes: number;
  comments: number;
  shares: number;
  downloads: number; // For PDFs
  saves: number; // Bookmarked

  // Performance
  clickThroughRate: number; // CTR from thumbnails/links
  bounceRate: number; // Left without engaging

  // Audience
  viewerDemographics: {
    byAge: { ageGroup: string; count: number }[];
    byClass: { className: string; count: number }[];
    byLanguage: { language: string; count: number }[];
  };

  // Trends
  trendingScore: number; // 0-100, algorithm-based
  viralityScore: number; // Share rate * engagement

  // Time-based
  peakViewingTime: string; // When most views occur
  lastViewedAt?: string;

  // Generated at
  updatedAt: string;
}

/**
 * Views broken down by date
 */
export interface ViewsByDate {
  date: string; // YYYY-MM-DD
  views: number;
  uniqueViews: number;
  averageDuration: number; // seconds
  completionRate: number; // percentage
}

/**
 * Views broken down by class
 */
export interface ViewsByClass {
  classId: string;
  className: string;
  views: number;
  uniqueViewers: number;
  averageDuration: number;
  completionRate: number;
}

/**
 * Content comment
 */
export interface ContentComment {
  id: string;
  contentId: string;
  parentId: string; // Parent (user) ID
  parentName: string;
  parentAvatarUrl?: string;

  // Comment content
  content: string;
  replyToCommentId?: string; // For nested replies

  // Status
  isApproved: boolean;
  isFlagged: boolean;
  isEdited: boolean;

  // Engagement
  likes: number;
  replies: number;

  // Metadata
  createdAt: string;
  updatedAt?: string;
}

/**
 * Content series (for organizing related content)
 */
export interface ContentSeries {
  id: string;
  name: string;
  description: string;
  coverImageUrl: string;

  // Content
  contentIds: string[];
  contentCount: number;

  // Metadata
  category: ContentCategory;
  tags: string[];
  language: 'vi' | 'zh';

  // Publishing
  status: ContentStatus;
  createdAt: string;
  createdBy: string; // TA ID

  // Analytics
  totalViews: number;
  totalLikes: number;
  completionRate: number; // % who viewed all content
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

/**
 * Request to get content list
 */
export interface GetContentRequest {
  page?: number;
  pageSize?: number;
  type?: ContentType[];
  status?: ContentStatus[];
  category?: ContentCategory[];
  visibility?: ContentVisibility[];
  search?: string;
  tags?: string[];
  createdBy?: string; // TA ID
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'createdAt' | 'publishedAt' | 'views' | 'likes' | 'trending';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Response for get content
 */
export interface GetContentResponse {
  content: (VideoContent | ArticleContent | MicroCourseContent)[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  statistics: {
    totalViews: number;
    totalLikes: number;
    averageEngagement: number;
  };
}

/**
 * Request to create video content
 */
export interface CreateVideoRequest {
  title: string;
  description: string;
  thumbnailUrl?: string;
  platform: VideoPlatform;
  videoUrl: string;
  duration: number;
  category: ContentCategory;
  visibility: ContentVisibility;
  targetClasses?: string[];
  targetAge?: string;
  tags?: string[];
  language: 'vi' | 'zh';
  hasSubtitles?: boolean;
  subtitleLanguages?: ('vi' | 'zh' | 'en')[];
  allowComments?: boolean;
  scheduledAt?: string;
}

/**
 * Request to create article content
 */
export interface CreateArticleRequest {
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  category: ContentCategory;
  visibility: ContentVisibility;
  targetClasses?: string[];
  targetAge?: string;
  tags?: string[];
  language: 'vi' | 'zh';
  allowComments?: boolean;
  scheduledAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
}

/**
 * Request to create micro-course
 */
export interface CreateMicroCourseRequest {
  title: string;
  description: string;
  thumbnailUrl?: string;
  videoUrl: string;
  duration: number;
  transcript?: string;
  seriesId?: string;
  category: ContentCategory;
  visibility: ContentVisibility;
  targetClasses?: string[];
  targetAge?: string;
  tags?: string[];
  language: 'vi' | 'zh';
  pointsAwarded?: number;
  isVertical?: boolean;
}

/**
 * Request to update content
 */
export interface UpdateContentRequest {
  title?: string;
  description?: string;
  content?: string; // For articles
  thumbnailUrl?: string;
  coverImageUrl?: string;
  status?: ContentStatus;
  visibility?: ContentVisibility;
  category?: ContentCategory;
  tags?: string[];
  targetClasses?: string[];
  allowComments?: boolean;
  isPinned?: boolean;
  isFeatured?: boolean;
  scheduledAt?: string;
}

/**
 * Request to upload video file
 */
export interface UploadVideoRequest {
  file: File;
  title: string;
  description?: string;
  generateThumbnail?: boolean;
  thumbnailTimestamp?: number; // seconds - where to generate thumbnail from
}

/**
 * Response after uploading video
 */
export interface UploadVideoResponse {
  videoId: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number;
  fileSize: number;
  uploadSuccess: boolean;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
}

/**
 * Request to get content analytics
 */
export interface GetContentAnalyticsRequest {
  contentId: string;
  dateFrom?: string;
  dateTo?: string;
  breakdown?: ('date' | 'class' | 'age' | 'language')[];
}

/**
 * Response for content analytics
 */
export interface GetContentAnalyticsResponse {
  analytics: ContentAnalytics;
  comparisons?: {
    vsLastWeek: number; // Percentage change
    vsLastMonth: number;
    vsAverage: number; // Compared to average content
  };
}

/**
 * Request to get trending content
 */
export interface GetTrendingContentRequest {
  limit?: number;
  timeRange?: '24h' | '7d' | '30d' | 'all';
  contentType?: ContentType;
  category?: ContentCategory;
}

/**
 * Response for trending content
 */
export interface GetTrendingContentResponse {
  trending: {
    content: VideoContent | ArticleContent | MicroCourseContent;
    trendingScore: number;
    viewGrowth: number; // Percentage
    engagementGrowth: number; // Percentage
  }[];
}

/**
 * Request to add comment to content
 */
export interface AddCommentRequest {
  contentId: string;
  content: string;
  replyToCommentId?: string;
}

/**
 * Request to get comments for content
 */
export interface GetCommentsRequest {
  contentId: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'newest' | 'oldest' | 'mostLiked';
}

/**
 * Response for get comments
 */
export interface GetCommentsResponse {
  comments: ContentComment[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Request to moderate comment
 */
export interface ModerateCommentRequest {
  commentId: string;
  action: 'approve' | 'reject' | 'flag' | 'delete';
  reason?: string;
}

/**
 * Request to create content series
 */
export interface CreateSeriesRequest {
  name: string;
  description: string;
  coverImageUrl: string;
  category: ContentCategory;
  tags?: string[];
  language: 'vi' | 'zh';
  contentIds?: string[];
}

/**
 * Request to add content to series
 */
export interface AddToSeriesRequest {
  seriesId: string;
  contentId: string;
  position?: number; // Order in series
}
