/**
 * Messaging Service - Teaching Assistant Module
 *
 * Comprehensive messaging service for sending messages, managing conversations,
 * templates, and quota tracking
 */

import { api } from './api';
import type {
  Message,
  MessageData,
  SendMessageRequest,
  SendMessageResponse,
  GetMessagesRequest,
  GetMessagesResponse,
  MessageStats,
  MessageQuota,
  GetQuotaResponse,
  MessageTemplate,
  MessageFilter,
  FilterParentsRequest,
  FilterParentsResponse,
  MessageConversation,
  ConversationMessage,
  QuotaExceededError,
  InvalidRecipientError,
} from '@/types/messaging.types';

// ========================================
// ERROR HANDLING
// ========================================

class MessagingServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'MessagingServiceError';
  }
}

class QuotaExceededError extends MessagingServiceError {
  constructor(
    public quotaLimit: number,
    public quotaUsed: number,
    public resetDate: string
  ) {
    super(
      `Quota exceeded. Used ${quotaUsed}/${quotaLimit}. Resets on ${resetDate}`,
      'QUOTA_EXCEEDED',
      { quotaLimit, quotaUsed, resetDate }
    );
  }
}

class InvalidRecipientsError extends MessagingServiceError {
  constructor(public invalidRecipients: string[]) {
    super(
      `Invalid recipients: ${invalidRecipients.join(', ')}`,
      'INVALID_RECIPIENT',
      { invalidRecipients }
    );
  }
}

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Validate message data before sending
 */
function validateMessageData(data: MessageData): void {
  if (!data.subject?.trim()) {
    throw new MessagingServiceError('Subject is required', 'VALIDATION_ERROR');
  }

  if (!data.content?.trim()) {
    throw new MessagingServiceError('Content is required', 'VALIDATION_ERROR');
  }

  if (!data.channels || data.channels.length === 0) {
    throw new MessagingServiceError('At least one channel is required', 'VALIDATION_ERROR');
  }

  if (!data.recipientIds?.length && !data.filters?.length) {
    throw new MessagingServiceError(
      'Either recipientIds or filters must be provided',
      'VALIDATION_ERROR'
    );
  }

  // Validate scheduled time is in the future
  if (data.scheduledFor) {
    const scheduledDate = new Date(data.scheduledFor);
    if (scheduledDate <= new Date()) {
      throw new MessagingServiceError(
        'Scheduled time must be in the future',
        'VALIDATION_ERROR'
      );
    }
  }
}

/**
 * Check if quota is available for sending
 */
async function checkQuota(recipientCount: number): Promise<void> {
  try {
    const quotaResponse = await messagingService.getQuota();
    const { quota } = quotaResponse;

    if (!quota.isUnlimited && quota.remainingQuota < recipientCount) {
      throw new QuotaExceededError(quota.totalQuota, quota.usedQuota, quota.resetDate);
    }
  } catch (error) {
    if (error instanceof QuotaExceededError) {
      throw error;
    }
    // If quota check fails, log but don't block (fail open)
    console.warn('Quota check failed, proceeding with message send:', error);
  }
}

/**
 * Format error response from API
 */
function handleApiError(error: unknown): never {
  if (error instanceof MessagingServiceError) {
    throw error;
  }

  const apiError = error as any;
  const message = apiError?.response?.data?.message || 'An error occurred';
  const code = apiError?.response?.data?.code || 'UNKNOWN_ERROR';
  const details = apiError?.response?.data?.details;

  throw new MessagingServiceError(message, code, details);
}

// ========================================
// MESSAGING SERVICE
// ========================================

export const messagingService = {
  /**
   * Send a message to recipients
   * @param data - Message data including content, recipients, and channels
   * @returns Promise with message details and quota info
   */
  async sendMessage(data: MessageData): Promise<SendMessageResponse> {
    try {
      // Validate message data
      validateMessageData(data);

      // Estimate recipient count
      let recipientCount = data.recipientIds?.length || 0;
      if (data.filters?.length && !recipientCount) {
        const filterResult = await this.filterRecipients(data.filters);
        recipientCount = filterResult.count;
      }

      // Check quota before sending
      await checkQuota(recipientCount);

      // Send message
      const response = await api.post<SendMessageResponse>('/messages/send', {
        message: data,
      });

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get messages with optional filtering and pagination
   * @param params - Query parameters for filtering and pagination
   * @returns Promise with paginated messages
   */
  async getMessages(params: GetMessagesRequest = {}): Promise<GetMessagesResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params.status) queryParams.append('status', params.status);
      if (params.type) queryParams.append('type', params.type);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const response = await api.get<GetMessagesResponse>(
        `/messages?${queryParams.toString()}`
      );

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get detailed information about a specific message
   * @param messageId - The ID of the message
   * @returns Promise with message details
   */
  async getMessageDetail(messageId: string): Promise<Message> {
    try {
      if (!messageId?.trim()) {
        throw new MessagingServiceError('Message ID is required', 'VALIDATION_ERROR');
      }

      const response = await api.get<Message>(`/messages/${messageId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Schedule a message for future delivery
   * @param data - Message data including scheduledFor timestamp
   * @returns Promise with scheduled message details
   */
  async scheduleMessage(data: MessageData): Promise<SendMessageResponse> {
    try {
      // Validate message data
      validateMessageData(data);

      if (!data.scheduledFor) {
        throw new MessagingServiceError(
          'scheduledFor is required for scheduling',
          'VALIDATION_ERROR'
        );
      }

      // Estimate recipient count for quota check
      let recipientCount = data.recipientIds?.length || 0;
      if (data.filters?.length && !recipientCount) {
        const filterResult = await this.filterRecipients(data.filters);
        recipientCount = filterResult.count;
      }

      // Check quota (scheduled messages count towards quota)
      await checkQuota(recipientCount);

      const response = await api.post<SendMessageResponse>('/messages/schedule', {
        message: data,
      });

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Cancel a scheduled message
   * @param messageId - The ID of the scheduled message
   */
  async cancelScheduledMessage(messageId: string): Promise<void> {
    try {
      if (!messageId?.trim()) {
        throw new MessagingServiceError('Message ID is required', 'VALIDATION_ERROR');
      }

      await api.delete(`/messages/${messageId}/schedule`);
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get statistics for a sent message
   * @param messageId - The ID of the message
   * @returns Promise with message statistics
   */
  async getMessageStats(messageId: string): Promise<MessageStats> {
    try {
      if (!messageId?.trim()) {
        throw new MessagingServiceError('Message ID is required', 'VALIDATION_ERROR');
      }

      const response = await api.get<MessageStats>(`/messages/${messageId}/stats`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get current message quota and usage
   * @returns Promise with quota information
   */
  async getQuota(): Promise<GetQuotaResponse> {
    try {
      const response = await api.get<GetQuotaResponse>('/messages/quota');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get available message templates
   * @returns Promise with list of templates
   */
  async getTemplates(): Promise<MessageTemplate[]> {
    try {
      const response = await api.get<MessageTemplate[]>('/messages/templates');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get a specific template by ID
   * @param templateId - The ID of the template
   * @returns Promise with template details
   */
  async getTemplateById(templateId: string): Promise<MessageTemplate> {
    try {
      if (!templateId?.trim()) {
        throw new MessagingServiceError('Template ID is required', 'VALIDATION_ERROR');
      }

      const response = await api.get<MessageTemplate>(`/messages/templates/${templateId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Filter recipients based on criteria
   * @param filters - Array of filter conditions
   * @param preview - If true, only return count
   * @returns Promise with filtered recipients
   */
  async filterRecipients(
    filters: MessageFilter[],
    preview: boolean = false
  ): Promise<FilterParentsResponse> {
    try {
      if (!filters || filters.length === 0) {
        throw new MessagingServiceError('At least one filter is required', 'VALIDATION_ERROR');
      }

      const response = await api.post<FilterParentsResponse>('/messages/filter-recipients', {
        filters,
        preview,
      });

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get all conversations for the current user
   * @returns Promise with list of conversations
   */
  async getConversations(): Promise<MessageConversation[]> {
    try {
      const response = await api.get<MessageConversation[]>('/conversations');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get messages in a specific conversation
   * @param conversationId - The ID of the conversation
   * @param page - Page number for pagination
   * @param limit - Number of messages per page
   * @returns Promise with conversation messages
   */
  async getConversationMessages(
    conversationId: string,
    page: number = 1,
    limit: number = 50
  ): Promise<ConversationMessage[]> {
    try {
      if (!conversationId?.trim()) {
        throw new MessagingServiceError('Conversation ID is required', 'VALIDATION_ERROR');
      }

      const response = await api.get<ConversationMessage[]>(
        `/conversations/${conversationId}/messages?page=${page}&limit=${limit}`
      );

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Send a message in a conversation
   * @param conversationId - The ID of the conversation
   * @param content - Message content
   * @param attachments - Optional file attachments
   * @returns Promise with sent message
   */
  async sendConversationMessage(
    conversationId: string,
    content: string,
    attachments?: File[]
  ): Promise<ConversationMessage> {
    try {
      if (!conversationId?.trim()) {
        throw new MessagingServiceError('Conversation ID is required', 'VALIDATION_ERROR');
      }

      if (!content?.trim()) {
        throw new MessagingServiceError('Message content is required', 'VALIDATION_ERROR');
      }

      // Handle file uploads if attachments provided
      let attachmentData;
      if (attachments && attachments.length > 0) {
        const formData = new FormData();
        formData.append('content', content);
        attachments.forEach((file) => {
          formData.append('attachments', file);
        });

        const response = await api.post<ConversationMessage>(
          `/conversations/${conversationId}/messages`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        return response.data;
      }

      // Send text-only message
      const response = await api.post<ConversationMessage>(
        `/conversations/${conversationId}/messages`,
        { content }
      );

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Mark a conversation as read
   * @param conversationId - The ID of the conversation
   */
  async markConversationAsRead(conversationId: string): Promise<void> {
    try {
      if (!conversationId?.trim()) {
        throw new MessagingServiceError('Conversation ID is required', 'VALIDATION_ERROR');
      }

      await api.put(`/conversations/${conversationId}/read`);
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Create a new conversation
   * @param participantIds - Array of participant IDs
   * @param initialMessage - Optional initial message
   * @returns Promise with new conversation
   */
  async createConversation(
    participantIds: string[],
    initialMessage?: string
  ): Promise<MessageConversation> {
    try {
      if (!participantIds || participantIds.length === 0) {
        throw new MessagingServiceError('At least one participant is required', 'VALIDATION_ERROR');
      }

      const response = await api.post<MessageConversation>('/conversations', {
        participantIds,
        initialMessage,
      });

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Apply a template to create message data
   * @param templateId - The ID of the template
   * @param variables - Template variable values
   * @returns Message data with template applied
   */
  async applyTemplate(
    templateId: string,
    variables: Record<string, string>
  ): Promise<Partial<MessageData>> {
    try {
      const template = await this.getTemplateById(templateId);

      // Replace variables in subject and content
      let subject = template.subject;
      let content = template.content;

      template.variables.forEach((variable) => {
        const value = variables[variable.key] || variable.defaultValue || '';
        const regex = new RegExp(`{{${variable.key}}}`, 'g');
        subject = subject.replace(regex, value);
        content = content.replace(regex, value);
      });

      return {
        type: template.type,
        subject,
        content,
        templateId: template.id,
        priority: 'normal',
        channels: ['app', 'email'],
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};

// Export error classes for external use
export { MessagingServiceError, QuotaExceededError, InvalidRecipientsError };
