// Upload Service for file uploads

export interface UploadResponse {
  url: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
}

export const uploadService = {
  // Upload avatar
  async uploadAvatar(file: File): Promise<UploadResponse> {
    // Validate file
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('Kích thước file không được vượt quá 5MB');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Chỉ chấp nhận file ảnh (JPG, PNG, WEBP)');
    }

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock response
    return {
      url: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
    };
  },

  // Upload document
  async uploadDocument(file: File): Promise<UploadResponse> {
    // Validate file
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error('Kích thước file không được vượt quá 10MB');
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Chỉ chấp nhận file PDF, Word, Excel');
    }

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock response
    return {
      url: `https://example.com/documents/${file.name}`,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
    };
  },

  // Upload image
  async uploadImage(file: File): Promise<UploadResponse> {
    // Validate file
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('Kích thước file không được vượt quá 5MB');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Chỉ chấp nhận file ảnh (JPG, PNG, WEBP, GIF)');
    }

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock response
    return {
      url: `https://picsum.photos/seed/${Date.now()}/800/600`,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
    };
  },
};

export default uploadService;
