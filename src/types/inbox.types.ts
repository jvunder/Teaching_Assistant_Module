// Inbox/Support System Types

export type TicketStatus = 'new' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketCategory = 'schedule' | 'grade' | 'feedback' | 'technical' | 'payment' | 'other';

export interface Ticket {
  id: string;
  subject: string;
  content: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  from: string;
  fromEmail: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  lastReply?: string;
  dueDate?: string;
  tags?: string[];
  attachments?: TicketAttachment[];
}

export interface TicketAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: string;
}

export interface TicketReply {
  id: string;
  ticketId: string;
  content: string;
  from: string;
  isStaff: boolean;
  createdAt: string;
  attachments?: TicketAttachment[];
}

export interface CannedResponse {
  id: string;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
}

export interface TicketFilter {
  status?: TicketStatus;
  priority?: TicketPriority;
  category?: TicketCategory;
  assignedTo?: string;
  searchTerm?: string;
  fromDate?: string;
  toDate?: string;
}

export interface TicketSLA {
  ticketId: string;
  responseTime: number; // in minutes
  resolutionTime?: number; // in minutes
  breached: boolean;
  targetResponseTime: number;
  targetResolutionTime: number;
}

export interface AssignTicketRequest {
  ticketId: string;
  assignTo: string;
}

export interface CloseTicketRequest {
  ticketId: string;
  resolution: string;
}

export interface ReplyTicketRequest {
  ticketId: string;
  content: string;
  attachments?: File[];
}
