/**
 * Parent Types - Teaching Assistant Module
 *
 * Types for parent management and approval workflows
 */

// ===== PARENT TYPES =====

export interface Parent {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  studentIds: string[];
  classIds: string[];

  // Approval status
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvalDate?: string;
  approvedBy?: string;
  rejectionReason?: string;

  // Communication
  preferredLanguage?: 'vi' | 'en' | 'zh';
  communicationPreference?: 'email' | 'sms' | 'app';

  // Metadata
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  lastActive?: string;
}

export interface ParentWithStudent extends Parent {
  studentNames?: string[];
}

// ===== PARENT REQUEST/RESPONSE TYPES =====

export interface GetParentsRequest {
  classId?: string;
  page?: number;
  limit?: number;
  search?: string;
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  sortBy?: 'createdAt' | 'fullName' | 'approvalDate';
  sortOrder?: 'asc' | 'desc';
}

export interface GetParentsResponse {
  success: boolean;
  data: {
    parents: ParentWithStudent[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
}

export interface ApproveParentRequest {
  approve: boolean;
  reason?: string;
}

export interface ApproveParentResponse {
  success: boolean;
  data: {
    parentId: string;
    approvalStatus: 'approved' | 'rejected';
    approvedBy: string;
    approvalDate: string;
    reason?: string;
  };
  message?: string;
}

export interface ParentDetail extends Parent {
  children?: Array<{
    id: string;
    fullName: string;
    grade: string;
    className: string;
  }>;
  messageHistory?: {
    total: number;
    lastMessageDate?: string;
  };
}

export interface GetParentDetailResponse {
  success: boolean;
  data: ParentDetail;
  message?: string;
}
