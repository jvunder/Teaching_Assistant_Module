/**
 * Messaging Types - Teaching Assistant Module
 *
 * Types for messaging, conversations, templates, and quota management
 */

// ========================================
// MESSAGE TYPES
// ========================================

export type MessageType = 'announcement' | 'reminder' | 'feedback' | 'individual';
export type MessageStatus = 'draft' | 'scheduled' | 'sent' | 'failed' | 'cancelled';
export type MessagePriority = 'low' | 'normal' | 'high' | 'urgent';
export type DeliveryStatus = 'pending' | 'delivered' | 'read' | 'failed';
export type CommunicationChannel = 'app' | 'email' | 'sms' | 'all';

// ========================================
// MESSAGE FILTERS
// ========================================

export interface MessageFilter {
  field: 'class' | 'attendanceRate' | 'completionRate' | 'lastActive' | 'tag' | 'childAge';
  operator: 'equals' | 'greaterThan' | 'lessThan' | 'contains' | 'in';
  value: string | number | string[];
}

// ========================================
// MESSAGE DATA
// ========================================

export interface MessageData {
  type: MessageType;
  priority: MessagePriority;
  subject: string;
  content: string;
  recipientIds?: string[]; // Specific learner IDs
  filters?: MessageFilter[]; // Dynamic filtering
  channels: CommunicationChannel[];
  scheduledFor?: string; // ISO datetime string
  attachments?: MessageAttachment[];
  templateId?: string; // Optional template to use
}

export interface MessageAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

// ========================================
// MESSAGE OBJECT
// ========================================

export interface Message {
  id: string;
  type: MessageType;
  priority: MessagePriority;
  subject: string;
  content: string;
  senderId: string;
  senderName: string;
  recipientCount: number;
  recipientIds: string[];
  channels: CommunicationChannel[];
  status: MessageStatus;
  scheduledFor?: string;
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
  attachments?: MessageAttachment[];
  filters?: MessageFilter[];
  templateId?: string;
  stats?: MessageStats;
}

// ========================================
// MESSAGE STATISTICS
// ========================================

export interface MessageStats {
  messageId: string;
  totalRecipients: number;
  deliveryStats: {
    pending: number;
    delivered: number;
    read: number;
    failed: number;
  };
  channelBreakdown: {
    app: number;
    email: number;
    sms: number;
  };
  readRate: number; // percentage
  deliveryRate: number; // percentage
  avgReadTime?: number; // seconds
  engagementScore?: number;
  lastUpdated: string;
}

// ========================================
// RECIPIENT DATA
// ========================================

export interface MessageRecipient {
  id: string;
  messageId: string;
  recipientId: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone?: string;
  deliveryStatus: DeliveryStatus;
  channel: CommunicationChannel;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  failureReason?: string;
}

// ========================================
// MESSAGE TEMPLATES
// ========================================

export interface MessageTemplate {
  id: string;
  name: string;
  description: string;
  type: MessageType;
  category: string;
  subject: string;
  content: string;
  variables: TemplateVariable[];
  isActive: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface TemplateVariable {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'list';
  required: boolean;
  defaultValue?: string;
  description?: string;
}

// ========================================
// CONVERSATIONS
// ========================================

export interface MessageConversation {
  id: string;
  participantIds: string[];
  participantNames: string[];
  lastMessage: ConversationMessage;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  createdAt: string;
  updatedAt: string;
  metadata?: {
    learnerId?: string;
    classId?: string;
    topic?: string;
  };
}

export interface ConversationMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'teacher' | 'parent' | 'admin';
  content: string;
  attachments?: MessageAttachment[];
  isRead: boolean;
  readAt?: string;
  createdAt: string;
  updatedAt: string;
  replyToId?: string;
}

// ========================================
// QUOTA MANAGEMENT
// ========================================

export interface MessageQuota {
  planType: 'free' | 'basic' | 'premium' | 'enterprise';
  totalQuota: number;
  usedQuota: number;
  remainingQuota: number;
  resetDate: string;
  quotaByChannel: {
    app: { total: number; used: number; remaining: number };
    email: { total: number; used: number; remaining: number };
    sms: { total: number; used: number; remaining: number };
  };
  isUnlimited: boolean;
}

// ========================================
// API REQUEST/RESPONSE TYPES
// ========================================

export interface SendMessageRequest {
  message: MessageData;
}

export interface SendMessageResponse {
  success: boolean;
  messageId: string;
  message: Message;
  estimatedDelivery?: string;
  quotaUsed: number;
  quotaRemaining: number;
}

export interface GetMessagesRequest {
  status?: MessageStatus;
  type?: MessageType;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'sentAt' | 'priority';
  sortOrder?: 'asc' | 'desc';
}

export interface GetMessagesResponse {
  messages: Message[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetQuotaResponse {
  quota: MessageQuota;
  usageHistory: QuotaUsageHistory[];
}

export interface QuotaUsageHistory {
  date: string;
  messagesCount: number;
  recipientsCount: number;
  channelBreakdown: {
    app: number;
    email: number;
    sms: number;
  };
}

export interface FilterParentsRequest {
  filters: MessageFilter[];
  preview?: boolean; // If true, just return count
}

export interface FilterParentsResponse {
  count: number;
  parents?: Array<{
    id: string;
    name: string;
    email: string;
    phone?: string;
    classes: string[];
    tags: string[];
  }>;
}

// ========================================
// ERROR TYPES
// ========================================

export interface MessagingError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export type QuotaExceededError = MessagingError & {
  code: 'QUOTA_EXCEEDED';
  quotaLimit: number;
  quotaUsed: number;
  resetDate: string;
};

export type InvalidRecipientError = MessagingError & {
  code: 'INVALID_RECIPIENT';
  invalidRecipients: string[];
};
