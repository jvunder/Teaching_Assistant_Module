/**
 * Content Types - Teaching Assistant Module
 *
 * Types for educational content and materials
 * TODO: Implement in Phase 2C
 */

// Placeholder - will be implemented in Phase 2C
export interface Content {
  id: string;
  title: string;
  type: "lesson" | "assignment" | "resource";
  createdAt: string;
  updatedAt: string;
}
