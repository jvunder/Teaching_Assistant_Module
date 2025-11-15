/**
 * Types Index - Teaching Assistant Module
 *
 * Central export point for all TypeScript type definitions
 */

// API Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

// Re-export all types from individual modules
export * from './ta.types';
export * from './class.types';
export * from './parent.types';
export * from './learner.types';
export * from './messaging.types';
export * from './content.types';

// Common utility types
export type Status = 'active' | 'inactive' | 'archived';
export type Language = 'vi' | 'en' | 'zh';
export type CommunicationMethod = 'email' | 'sms' | 'app';

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
}
