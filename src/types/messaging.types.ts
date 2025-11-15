/**
 * Messaging Types - Teaching Assistant Module
 *
 * Types for messaging and communication features
 * TODO: Implement in Phase 2B
 */

// Placeholder - will be implemented in Phase 2B
export interface Message {
  id: string;
  to: string[];
  content: string;
  type: "text" | "image" | "video";
  sentAt: string;
  status: "sent" | "delivered" | "read";
}
