/**
 * Upload Service - Handles file uploads with progress tracking
 * Phase 4: Upload Features
 */

export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number; // 0-100
  status: 'pending' | 'uploading' | 'completed' | 'error' | 'paused';
  uploadedBytes: number;
  totalBytes: number;
  error?: string;
  url?: string;
}

export interface UploadOptions {
  onProgress?: (progress: UploadProgress) => void;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  autoCompress?: boolean;
}

export interface UploadResult {
  success: boolean;
  fileId: string;
  url?: string;
  error?: string;
  thumbnail?: string;
}

class UploadService {
  private activeUploads: Map<string, AbortController> = new Map();
  private uploadQueue: Map<string, UploadProgress> = new Map();

  /**
   * Validate file before upload
   */
  validateFile(
    file: File,
    options?: UploadOptions
  ): { valid: boolean; error?: string } {
    // Check file size
    const maxSize = options?.maxSize || 100 * 1024 * 1024; // Default 100MB
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File quá lớn. Kích thước tối đa: ${this.formatFileSize(maxSize)}`,
      };
    }

    // Check file type
    if (options?.allowedTypes && options.allowedTypes.length > 0) {
      const fileType = file.type;
      const isAllowed = options.allowedTypes.some((type) => {
        if (type.endsWith('/*')) {
          return fileType.startsWith(type.replace('/*', ''));
        }
        return fileType === type;
      });

      if (!isAllowed) {
        return {
          valid: false,
          error: `Loại file không hợp lệ. Chỉ chấp nhận: ${options.allowedTypes.join(', ')}`,
        };
      }
    }

    return { valid: true };
  }

  /**
   * Upload image file
   */
  async uploadImage(
    file: File,
    options?: UploadOptions
  ): Promise<UploadResult> {
    const validation = this.validateFile(file, {
      ...options,
      allowedTypes: options?.allowedTypes || ['image/*'],
      maxSize: options?.maxSize || 5 * 1024 * 1024, // 5MB default for images
    });

    if (!validation.valid) {
      return {
        success: false,
        fileId: '',
        error: validation.error,
      };
    }

    return this.uploadFile(file, 'image', options);
  }

  /**
   * Upload video file
   */
  async uploadVideo(
    file: File,
    options?: UploadOptions
  ): Promise<UploadResult> {
    const validation = this.validateFile(file, {
      ...options,
      allowedTypes: options?.allowedTypes || ['video/*'],
      maxSize: options?.maxSize || 100 * 1024 * 1024, // 100MB default for videos
    });

    if (!validation.valid) {
      return {
        success: false,
        fileId: '',
        error: validation.error,
      };
    }

    return this.uploadFile(file, 'video', options);
  }

  /**
   * Upload PDF file
   */
  async uploadPDF(
    file: File,
    options?: UploadOptions
  ): Promise<UploadResult> {
    const validation = this.validateFile(file, {
      ...options,
      allowedTypes: options?.allowedTypes || ['application/pdf'],
      maxSize: options?.maxSize || 10 * 1024 * 1024, // 10MB default for PDFs
    });

    if (!validation.valid) {
      return {
        success: false,
        fileId: '',
        error: validation.error,
      };
    }

    return this.uploadFile(file, 'document', options);
  }

  /**
   * Upload any file
   */
  async uploadFile(
    file: File,
    type: 'image' | 'video' | 'document',
    options?: UploadOptions
  ): Promise<UploadResult> {
    const fileId = this.generateFileId();
    const abortController = new AbortController();
    this.activeUploads.set(fileId, abortController);

    const uploadProgress: UploadProgress = {
      fileId,
      fileName: file.name,
      progress: 0,
      status: 'uploading',
      uploadedBytes: 0,
      totalBytes: file.size,
    };

    this.uploadQueue.set(fileId, uploadProgress);

    try {
      // Simulate upload with progress
      const result = await this.simulateUpload(
        file,
        fileId,
        type,
        options,
        abortController.signal
      );

      // Update final status
      uploadProgress.status = 'completed';
      uploadProgress.progress = 100;
      uploadProgress.url = result.url;
      this.uploadQueue.set(fileId, uploadProgress);

      if (options?.onProgress) {
        options.onProgress(uploadProgress);
      }

      return result;
    } catch (error) {
      uploadProgress.status = 'error';
      uploadProgress.error = error instanceof Error ? error.message : 'Upload failed';
      this.uploadQueue.set(fileId, uploadProgress);

      if (options?.onProgress) {
        options.onProgress(uploadProgress);
      }

      return {
        success: false,
        fileId,
        error: uploadProgress.error,
      };
    } finally {
      this.activeUploads.delete(fileId);
    }
  }

  /**
   * Simulate file upload with progress (mock implementation)
   * In production, replace with actual API call
   */
  private async simulateUpload(
    file: File,
    fileId: string,
    type: 'image' | 'video' | 'document',
    options?: UploadOptions,
    signal?: AbortSignal
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const totalChunks = 10;
      let currentChunk = 0;

      const interval = setInterval(() => {
        if (signal?.aborted) {
          clearInterval(interval);
          reject(new Error('Upload cancelled'));
          return;
        }

        currentChunk++;
        const progress = Math.round((currentChunk / totalChunks) * 100);

        const uploadProgress = this.uploadQueue.get(fileId);
        if (uploadProgress) {
          uploadProgress.progress = progress;
          uploadProgress.uploadedBytes = Math.round((file.size * progress) / 100);
          this.uploadQueue.set(fileId, uploadProgress);

          if (options?.onProgress) {
            options.onProgress(uploadProgress);
          }
        }

        if (currentChunk >= totalChunks) {
          clearInterval(interval);

          // Generate mock URL
          const mockUrl = URL.createObjectURL(file);

          // Generate thumbnail for images/videos
          let thumbnail: string | undefined;
          if (type === 'image') {
            thumbnail = mockUrl;
          } else if (type === 'video') {
            thumbnail = this.generateVideoThumbnail(file);
          }

          resolve({
            success: true,
            fileId,
            url: mockUrl,
            thumbnail,
          });
        }
      }, 200); // Update every 200ms
    });
  }

  /**
   * Generate video thumbnail (mock)
   */
  private generateVideoThumbnail(file: File): string {
    // In production, use canvas to extract first frame
    // For now, return a placeholder
    return URL.createObjectURL(file);
  }

  /**
   * Pause upload
   */
  pauseUpload(fileId: string): boolean {
    const abortController = this.activeUploads.get(fileId);
    if (abortController) {
      abortController.abort();
      const progress = this.uploadQueue.get(fileId);
      if (progress) {
        progress.status = 'paused';
        this.uploadQueue.set(fileId, progress);
      }
      return true;
    }
    return false;
  }

  /**
   * Cancel upload
   */
  cancelUpload(fileId: string): boolean {
    const abortController = this.activeUploads.get(fileId);
    if (abortController) {
      abortController.abort();
      this.activeUploads.delete(fileId);
      this.uploadQueue.delete(fileId);
      return true;
    }
    return false;
  }

  /**
   * Get upload progress
   */
  getUploadProgress(fileId: string): UploadProgress | undefined {
    return this.uploadQueue.get(fileId);
  }

  /**
   * Get all active uploads
   */
  getActiveUploads(): UploadProgress[] {
    return Array.from(this.uploadQueue.values()).filter(
      (upload) => upload.status === 'uploading' || upload.status === 'pending'
    );
  }

  /**
   * Get all uploads (including completed and failed)
   */
  getAllUploads(): UploadProgress[] {
    return Array.from(this.uploadQueue.values());
  }

  /**
   * Clear completed uploads
   */
  clearCompletedUploads(): void {
    for (const [fileId, progress] of this.uploadQueue.entries()) {
      if (progress.status === 'completed') {
        this.uploadQueue.delete(fileId);
      }
    }
  }

  /**
   * Format file size
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Generate unique file ID
   */
  private generateFileId(): string {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Compress image (optional feature)
   */
  async compressImage(file: File, maxWidth: number = 1920): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                reject(new Error('Compression failed'));
              }
            },
            file.type,
            0.8
          );
        };
        img.onerror = () => reject(new Error('Image load failed'));
      };
      reader.onerror = () => reject(new Error('File read failed'));
    });
  }
}

// Export singleton instance
export const uploadService = new UploadService();
export default uploadService;
