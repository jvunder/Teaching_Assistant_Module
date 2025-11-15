/**
 * Messaging Types
 * Phase 4: Upload Features
 */

export interface MessageAttachment {
  id: string;
  type: 'image' | 'video' | 'document';
  name: string;
  url: string;
  size: number;
  thumbnail?: string;
  uploadProgress?: number;
}

export interface Message {
  id: string;
  content: string;
  attachments?: MessageAttachment[];
  createdAt: Date;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  recipients?: string[];
  status?: 'draft' | 'sent' | 'scheduled';
  scheduledDate?: Date;
}

export interface MessageDraft {
  content: string;
  attachments: MessageAttachment[];
}
