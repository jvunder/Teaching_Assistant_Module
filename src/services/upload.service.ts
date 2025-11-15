/**
 * Upload Service - Teaching Assistant Module
 * Handles file uploads (images, videos, documents) with progress tracking
 */

import { api } from './api';
import type { UploadResponse, UploadProgressCallback } from '@/types/content.types';

// Mock delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ========================================
// FILE VALIDATION
// ========================================

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

/**
 * Validate file type and size
 */
function validateFile(file: File, allowedTypes: string[], maxSize: number): void {
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
  }

  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    throw new Error(`File size exceeds ${maxSizeMB}MB limit`);
  }
}

/**
 * Generate mock upload response
 */
function generateMockUploadResponse(file: File): UploadResponse {
  const fileId = `FILE${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
  const fileExtension = file.name.split('.').pop();
  const url = `https://cdn.example.com/uploads/${fileId}.${fileExtension}`;

  return {
    success: true,
    data: {
      fileId,
      url,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      uploadedAt: new Date().toISOString(),
    },
  };
}

/**
 * Simulate upload progress
 */
async function simulateUploadProgress(
  file: File,
  onProgress?: UploadProgressCallback
): Promise<UploadResponse> {
  if (onProgress) {
    // Simulate progress updates
    for (let progress = 0; progress <= 100; progress += 10) {
      await delay(100);
      onProgress(progress);
    }
  } else {
    await delay(1000);
  }

  return generateMockUploadResponse(file);
}

// ========================================
// SERVICE FUNCTIONS
// ========================================

// Use mock data in development if API is not available
const USE_MOCK = import.meta.env.DEV || import.meta.env.MODE === 'development';

export const uploadService = {
  /**
   * Upload image file
   * @param file - Image file to upload
   * @returns Upload response with file URL
   */
  async uploadImage(file: File): Promise<UploadResponse> {
    // Validate file
    validateFile(file, ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE);

    if (USE_MOCK) {
      return simulateUploadProgress(file);
    }

    const formData = new FormData();
    formData.append('file', file);

    const { data } = await api.post<UploadResponse>('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  },

  /**
   * Upload video file with progress tracking
   * @param file - Video file to upload
   * @param onProgress - Optional progress callback (0-100)
   * @returns Upload response with file URL
   */
  async uploadVideo(file: File, onProgress?: UploadProgressCallback): Promise<UploadResponse> {
    // Validate file
    validateFile(file, ALLOWED_VIDEO_TYPES, MAX_VIDEO_SIZE);

    if (USE_MOCK) {
      return simulateUploadProgress(file, onProgress);
    }

    const formData = new FormData();
    formData.append('file', file);

    const { data } = await api.post<UploadResponse>('/upload/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    });

    return data;
  },

  /**
   * Upload document file
   * @param file - Document file to upload
   * @returns Upload response with file URL
   */
  async uploadFile(file: File): Promise<UploadResponse> {
    // Validate file
    validateFile(file, ALLOWED_FILE_TYPES, MAX_FILE_SIZE);

    if (USE_MOCK) {
      return simulateUploadProgress(file);
    }

    const formData = new FormData();
    formData.append('file', file);

    const { data } = await api.post<UploadResponse>('/upload/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  },

  /**
   * Delete uploaded file
   * @param fileId - ID of the file to delete
   */
  async deleteUpload(fileId: string): Promise<void> {
    if (USE_MOCK) {
      await delay(300);
      return;
    }

    await api.delete(`/upload/${fileId}`);
  },

  /**
   * Validate image file before upload
   * @param file - File to validate
   * @returns True if valid, throws error if invalid
   */
  validateImage(file: File): boolean {
    validateFile(file, ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE);
    return true;
  },

  /**
   * Validate video file before upload
   * @param file - File to validate
   * @returns True if valid, throws error if invalid
   */
  validateVideo(file: File): boolean {
    validateFile(file, ALLOWED_VIDEO_TYPES, MAX_VIDEO_SIZE);
    return true;
  },

  /**
   * Validate document file before upload
   * @param file - File to validate
   * @returns True if valid, throws error if invalid
   */
  validateDocument(file: File): boolean {
    validateFile(file, ALLOWED_FILE_TYPES, MAX_FILE_SIZE);
    return true;
  },
};
