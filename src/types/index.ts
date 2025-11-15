// API Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'teacher' | 'assistant' | 'admin';
  avatarUrl?: string;
  phone?: string;
}

// Class Types
export interface Class {
  id: string;
  name: string;
  grade: string;
  subject: string;
  schoolId: string;
  teacherId: string;
  studentCount: number;
  parentCount: number;
}

// Message Types
export interface Message {
  id: string;
  to: string[];
  content: string;
  type: 'text' | 'image' | 'video';
  sentAt: string;
  status: 'sent' | 'delivered' | 'read';
}

// Re-export analytics types
export * from './analytics.types';
