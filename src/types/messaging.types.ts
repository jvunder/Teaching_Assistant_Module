/**
 * Messaging Types - Teaching Assistant Module
 *
 * Handles all messaging functionality including:
 * - Targeted messaging to parents
 * - Message templates
 * - Anti-spam quota system
 * - Conversation tracking
 * - Message analytics
 */

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Type of message being sent
 */
export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  FILE = 'file',
  TEMPLATE = 'template',
  ANNOUNCEMENT = 'announcement',
  REMINDER = 'reminder',
  SURVEY_LINK = 'survey_link'
}

/**
 * Current status of a message
 */
export enum MessageStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  SENDING = 'sending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed'
}

/**
 * Message priority level
 */
export enum MessagePriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

/**
 * Delivery channel for messages
 */
export enum DeliveryChannel {
  APP = 'app',
  EMAIL = 'email',
  SMS = 'sms',
  ZALO = 'zalo'
}

// ============================================================================
// INTERFACES - CORE TYPES
// ============================================================================

/**
 * File attachment for messages
 */
export interface Attachment {
  id: string;
  fileName: string;
  fileSize: number; // bytes
  fileType: string; // MIME type
  url: string;
  thumbnailUrl?: string;
  uploadedAt: string; // ISO 8601
  uploadedBy: string; // TA ID
}

/**
 * Reusable message template
 */
export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  variables: string[]; // e.g., ['parentName', 'childName', 'className']
  category: 'greeting' | 'reminder' | 'announcement' | 'follow-up' | 'custom';
  language: 'vi' | 'zh';
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string; // TA ID
}

/**
 * Message recipient details
 */
export interface MessageRecipient {
  id: string;
  parentId: string;
  parentName: string;
  email: string;
  phone: string;
  language: 'vi' | 'zh';
  deliveryChannel: DeliveryChannel;
  status: MessageStatus;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  failedReason?: string;
}

/**
 * Filter criteria for selecting message recipients
 */
export interface MessageFilter {
  classIds?: string[];
  grades?: string[];
  engagementLevel?: ('high' | 'medium' | 'low')[];
  attendanceRange?: {
    min: number; // 0-100
    max: number; // 0-100
  };
  language?: ('vi' | 'zh')[];
  tags?: string[];
  excludeParentIds?: string[];
  includeParentIds?: string[]; // Specific parents to include
}

/**
 * Main Message object
 */
export interface Message {
  id: string;
  subject?: string;
  content: string;
  type: MessageType;
  priority: MessagePriority;
  status: MessageStatus;

  // Sender
  senderId: string; // TA ID
  senderName: string;

  // Recipients
  recipients: MessageRecipient[];
  recipientCount: number;
  filter?: MessageFilter; // How recipients were selected

  // Attachments
  attachments: Attachment[];

  // Scheduling
  scheduledAt?: string; // ISO 8601 - for scheduled messages
  sentAt?: string;

  // Analytics
  deliveredCount: number;
  readCount: number;
  failedCount: number;

  // Template
  templateId?: string;
  templateVariables?: Record<string, string>;

  // Metadata
  createdAt: string;
  updatedAt: string;

  // Notes
  notes?: string; // Internal notes for TA
  isArchived: boolean;
}

/**
 * Message statistics and analytics
 */
export interface MessageStats {
  // Overall stats
  totalMessagesSent: number;
  totalMessagesThisMonth: number;
  totalMessagesThisWeek: number;

  // Delivery stats
  deliveryRate: number; // Percentage
  readRate: number; // Percentage
  failureRate: number; // Percentage

  // Response stats
  averageReadTime: number; // Minutes
  repliesReceived: number;

  // By channel
  statsByChannel: {
    channel: DeliveryChannel;
    sent: number;
    delivered: number;
    read: number;
    failed: number;
  }[];

  // By type
  statsByType: {
    type: MessageType;
    count: number;
    readRate: number;
  }[];

  // Trending
  messagesByDate: {
    date: string; // YYYY-MM-DD
    sent: number;
    delivered: number;
    read: number;
  }[];
}

/**
 * Conversation thread between TA and parent
 */
export interface MessageConversation {
  id: string;
  parentId: string;
  parentName: string;
  taId: string;
  taName: string;

  // Conversation status
  status: 'active' | 'resolved' | 'archived';
  priority: MessagePriority;

  // Messages
  lastMessageId: string;
  lastMessageContent: string;
  lastMessageAt: string;
  unreadCount: number; // Unread by TA

  // Metadata
  createdAt: string;
  updatedAt: string;

  // Tags
  tags: string[]; // e.g., ['urgent', 'attendance-issue', 'payment']
}

/**
 * Individual message in a conversation
 */
export interface ConversationMessage {
  id: string;
  conversationId: string;

  // Sender
  senderId: string;
  senderType: 'ta' | 'parent';
  senderName: string;

  // Content
  content: string;
  type: MessageType;
  attachments: Attachment[];

  // Status
  status: MessageStatus;
  readAt?: string;

  // Metadata
  sentAt: string;

  // Reply reference
  replyToMessageId?: string;
}

/**
 * Message quota for anti-spam system
 */
export interface MessageQuota {
  taId: string;

  // Daily limits
  dailyLimit: number;
  dailySent: number;
  dailyRemaining: number;

  // Monthly limits
  monthlyLimit: number;
  monthlySent: number;
  monthlyRemaining: number;

  // Cooldown
  lastMessageSentAt?: string;
  nextAvailableAt?: string; // If in cooldown
  cooldownMinutes: number;

  // Warnings
  isNearLimit: boolean;
  warningMessage?: string;

  // Reset times
  dailyResetAt: string; // ISO 8601
  monthlyResetAt: string; // ISO 8601
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

/**
 * Request to get list of messages
 */
export interface GetMessagesRequest {
  page?: number;
  pageSize?: number;
  status?: MessageStatus[];
  type?: MessageType[];
  dateFrom?: string; // ISO 8601
  dateTo?: string;
  search?: string; // Search in subject/content
  sortBy?: 'sentAt' | 'createdAt' | 'readCount';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Response for get messages
 */
export interface GetMessagesResponse {
  messages: Message[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Request to send a new message
 */
export interface SendMessageRequest {
  subject?: string;
  content: string;
  type: MessageType;
  priority: MessagePriority;

  // Recipients selection
  filter?: MessageFilter;
  recipientIds?: string[]; // Specific parent IDs

  // Attachments
  attachmentIds?: string[];

  // Scheduling
  scheduledAt?: string; // ISO 8601

  // Template
  templateId?: string;
  templateVariables?: Record<string, string>;

  // Delivery
  deliveryChannels: DeliveryChannel[];

  // Notes
  notes?: string;
}

/**
 * Response after sending message
 */
export interface SendMessageResponse {
  messageId: string;
  status: MessageStatus;
  recipientCount: number;
  estimatedDeliveryTime?: string;
  quotaRemaining: {
    daily: number;
    monthly: number;
  };
}

/**
 * Request to update message template
 */
export interface UpdateTemplateRequest {
  name?: string;
  content?: string;
  variables?: string[];
  category?: MessageTemplate['category'];
}

/**
 * Request to get conversations
 */
export interface GetConversationsRequest {
  page?: number;
  pageSize?: number;
  status?: MessageConversation['status'][];
  unreadOnly?: boolean;
  search?: string;
  sortBy?: 'lastMessageAt' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Response for get conversations
 */
export interface GetConversationsResponse {
  conversations: MessageConversation[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  totalUnread: number;
}

/**
 * Request to send message in conversation
 */
export interface SendConversationMessageRequest {
  conversationId: string;
  content: string;
  type: MessageType;
  attachmentIds?: string[];
  replyToMessageId?: string;
}

/**
 * Request to upload attachment
 */
export interface UploadAttachmentRequest {
  file: File;
  type: 'image' | 'video' | 'document';
}

/**
 * Response after uploading attachment
 */
export interface UploadAttachmentResponse {
  attachment: Attachment;
  uploadSuccess: boolean;
  error?: string;
}

/**
 * Request to get recipient preview
 * (Shows how many recipients match the filter before sending)
 */
export interface GetRecipientPreviewRequest {
  filter: MessageFilter;
}

/**
 * Response for recipient preview
 */
export interface GetRecipientPreviewResponse {
  recipientCount: number;
  recipients: {
    id: string;
    name: string;
    className: string;
    language: 'vi' | 'zh';
  }[];
  breakdown: {
    byClass: { className: string; count: number }[];
    byLanguage: { language: 'vi' | 'zh'; count: number }[];
    byEngagement: { level: string; count: number }[];
  };
}
