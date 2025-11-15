/**
 * Content Types
 * Phase 4: Upload Features
 */

export interface ContentAttachment {
  id: string;
  type: 'image' | 'video' | 'document';
  name: string;
  url: string;
  size: number;
  thumbnail?: string;
  duration?: number; // for videos
}

export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  type: 'video' | 'article' | 'mixed';
  status: 'draft' | 'published';
  attachments?: ContentAttachment[];
  views: number;
  createdAt: string;
  updatedAt?: string;
  category?: string;
  tags?: string[];
}

export interface ContentUploadOptions {
  autoPublish?: boolean;
  category?: string;
  tags?: string[];
}
