/**
 * MessageComposer Component
 * Phase 4: Upload Features - Complete implementation with image, video, PDF uploads
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  Input,
  Button,
  Space,
  Upload,
  Progress,
  Card,
  Image,
  Modal,
  message,
  Tooltip,
  Tag,
} from 'antd';
import {
  SendOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  DeleteOutlined,
  EyeOutlined,
  PaperClipOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import uploadService, { UploadProgress, UploadResult } from '../../services/upload.service';
import type { MessageAttachment } from '../../types/messaging.types';
import './MessageComposer.css';

const { TextArea } = Input;

interface MessageComposerProps {
  onSend?: (content: string, attachments: MessageAttachment[]) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
}

const MessageComposer: React.FC<MessageComposerProps> = ({
  onSend,
  placeholder = 'Nh­p nÙi dung tin nh¯n...',
  maxLength = 2000,
  disabled = false,
}) => {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<MessageAttachment[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<Map<string, UploadProgress>>(new Map());
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState<MessageAttachment | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handle file upload with progress tracking
   */
  const handleFileUpload = useCallback(async (
    file: File,
    type: 'image' | 'video' | 'document'
  ) => {
    // Validate file
    let validation;
    if (type === 'image') {
      validation = uploadService.validateFile(file, {
        allowedTypes: ['image/*'],
        maxSize: 5 * 1024 * 1024, // 5MB
      });
    } else if (type === 'video') {
      validation = uploadService.validateFile(file, {
        allowedTypes: ['video/*'],
        maxSize: 100 * 1024 * 1024, // 100MB
      });
    } else {
      validation = uploadService.validateFile(file, {
        allowedTypes: ['application/pdf'],
        maxSize: 10 * 1024 * 1024, // 10MB
      });
    }

    if (!validation.valid) {
      message.error(validation.error);
      return;
    }

    // Start upload
    try {
      const result: UploadResult = await (
        type === 'image'
          ? uploadService.uploadImage(file, {
              onProgress: (progress) => {
                setUploadingFiles((prev) => new Map(prev).set(progress.fileId, progress));
              },
            })
          : type === 'video'
          ? uploadService.uploadVideo(file, {
              onProgress: (progress) => {
                setUploadingFiles((prev) => new Map(prev).set(progress.fileId, progress));
              },
            })
          : uploadService.uploadPDF(file, {
              onProgress: (progress) => {
                setUploadingFiles((prev) => new Map(prev).set(progress.fileId, progress));
              },
            })
      );

      if (result.success && result.url) {
        // Add to attachments
        const attachment: MessageAttachment = {
          id: result.fileId,
          type,
          name: file.name,
          url: result.url,
          size: file.size,
          thumbnail: result.thumbnail,
        };

        setAttachments((prev) => [...prev, attachment]);
        setUploadingFiles((prev) => {
          const newMap = new Map(prev);
          newMap.delete(result.fileId);
          return newMap;
        });

        message.success(`${type === 'image' ? 'Hình £nh' : type === 'video' ? 'Video' : 'File PDF'} ã °ãc t£i lên`);
      } else {
        message.error(result.error || 'Upload th¥t b¡i');
      }
    } catch (error) {
      message.error('Upload th¥t b¡i');
      console.error('Upload error:', error);
    }
  }, []);

  /**
   * Handle image upload
   */
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        handleFileUpload(file, 'image');
      });
    }
    // Reset input
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  }, [handleFileUpload]);

  /**
   * Handle video upload
   */
  const handleVideoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        handleFileUpload(file, 'video');
      });
    }
    // Reset input
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  }, [handleFileUpload]);

  /**
   * Handle PDF upload
   */
  const handlePDFUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        handleFileUpload(file, 'document');
      });
    }
    // Reset input
    if (pdfInputRef.current) {
      pdfInputRef.current.value = '';
    }
  }, [handleFileUpload]);

  /**
   * Handle drag and drop
   */
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        // Determine file type
        if (file.type.startsWith('image/')) {
          handleFileUpload(file, 'image');
        } else if (file.type.startsWith('video/')) {
          handleFileUpload(file, 'video');
        } else if (file.type === 'application/pdf') {
          handleFileUpload(file, 'document');
        } else {
          message.warning(`File "${file.name}" không °ãc h× trã`);
        }
      });
    }
  }, [handleFileUpload]);

  /**
   * Delete attachment
   */
  const handleDeleteAttachment = useCallback((attachmentId: string) => {
    setAttachments((prev) => prev.filter((att) => att.id !== attachmentId));
    message.success('ã xóa file ính kèm');
  }, []);

  /**
   * Preview attachment
   */
  const handlePreviewAttachment = useCallback((attachment: MessageAttachment) => {
    setPreviewFile(attachment);
    setPreviewVisible(true);
  }, []);

  /**
   * Send message
   */
  const handleSend = useCallback(() => {
    if (!content.trim() && attachments.length === 0) {
      message.warning('Vui lòng nh­p nÙi dung ho·c ính kèm file');
      return;
    }

    if (uploadingFiles.size > 0) {
      message.warning('Vui lòng ãi upload hoàn t¥t');
      return;
    }

    onSend?.(content, attachments);

    // Reset form
    setContent('');
    setAttachments([]);
  }, [content, attachments, uploadingFiles, onSend]);

  /**
   * Format file size
   */
  const formatFileSize = (bytes: number): string => {
    return uploadService.formatFileSize(bytes);
  };

  return (
    <div className="message-composer">
      {/* Drag and drop overlay */}
      {dragActive && (
        <div className="drag-overlay">
          <PaperClipOutlined style={{ fontSize: 48, color: '#1890ff' }} />
          <p>Th£ file vào ây Ã upload</p>
        </div>
      )}

      {/* Text area */}
      <div
        className="composer-input-area"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          showCount
          autoSize={{ minRows: 3, maxRows: 8 }}
          disabled={disabled}
        />

        {/* Attachments preview */}
        {(attachments.length > 0 || uploadingFiles.size > 0) && (
          <div className="attachments-preview">
            {/* Uploaded attachments */}
            {attachments.map((attachment) => (
              <Card
                key={attachment.id}
                size="small"
                className="attachment-card"
                cover={
                  attachment.type === 'image' && attachment.thumbnail ? (
                    <div className="attachment-image-preview">
                      <img src={attachment.thumbnail} alt={attachment.name} />
                    </div>
                  ) : attachment.type === 'video' && attachment.thumbnail ? (
                    <div className="attachment-video-preview">
                      <img src={attachment.thumbnail} alt={attachment.name} />
                      <VideoCameraOutlined className="video-icon" />
                    </div>
                  ) : (
                    <div className="attachment-file-preview">
                      <FileTextOutlined style={{ fontSize: 48, color: '#ff4d4f' }} />
                    </div>
                  )
                }
                actions={[
                  <Button
                    key="preview"
                    type="text"
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={() => handlePreviewAttachment(attachment)}
                  />,
                  <Button
                    key="delete"
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteAttachment(attachment.id)}
                  />,
                ]}
              >
                <Card.Meta
                  title={
                    <Tooltip title={attachment.name}>
                      <div className="attachment-name">{attachment.name}</div>
                    </Tooltip>
                  }
                  description={
                    <Space>
                      <Tag color={
                        attachment.type === 'image' ? 'blue' :
                        attachment.type === 'video' ? 'purple' : 'red'
                      }>
                        {attachment.type === 'image' ? 'Hình £nh' :
                         attachment.type === 'video' ? 'Video' : 'PDF'}
                      </Tag>
                      <span>{formatFileSize(attachment.size)}</span>
                    </Space>
                  }
                />
              </Card>
            ))}

            {/* Uploading files */}
            {Array.from(uploadingFiles.values()).map((upload) => (
              <Card key={upload.fileId} size="small" className="attachment-card uploading">
                <Card.Meta
                  title={
                    <Tooltip title={upload.fileName}>
                      <div className="attachment-name">{upload.fileName}</div>
                    </Tooltip>
                  }
                  description={
                    <div>
                      <Progress
                        percent={upload.progress}
                        size="small"
                        status={upload.status === 'error' ? 'exception' : 'active'}
                      />
                      <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                        {formatFileSize(upload.uploadedBytes)} / {formatFileSize(upload.totalBytes)}
                      </div>
                    </div>
                  }
                />
              </Card>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="composer-actions">
          <Space>
            {/* Image upload button */}
            <Tooltip title="Upload hình £nh (max 5MB)">
              <Button
                type="text"
                icon={<PictureOutlined />}
                onClick={() => imageInputRef.current?.click()}
                disabled={disabled}
              >
                Hình £nh
              </Button>
            </Tooltip>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />

            {/* Video upload button */}
            <Tooltip title="Upload video (max 100MB)">
              <Button
                type="text"
                icon={<VideoCameraOutlined />}
                onClick={() => videoInputRef.current?.click()}
                disabled={disabled}
              >
                Video
              </Button>
            </Tooltip>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleVideoUpload}
            />

            {/* PDF upload button */}
            <Tooltip title="Upload PDF (max 10MB)">
              <Button
                type="text"
                icon={<FileTextOutlined />}
                onClick={() => pdfInputRef.current?.click()}
                disabled={disabled}
              >
                PDF
              </Button>
            </Tooltip>
            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf"
              multiple
              style={{ display: 'none' }}
              onChange={handlePDFUpload}
            />
          </Space>

          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={disabled || uploadingFiles.size > 0}
            loading={uploadingFiles.size > 0}
          >
            Gíi
          </Button>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        open={previewVisible}
        title="Xem tr°Ûc file ính kèm"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width={800}
      >
        {previewFile && (
          <div className="attachment-preview-modal">
            <h3>{previewFile.name}</h3>
            <Space style={{ marginBottom: 16 }}>
              <Tag color={
                previewFile.type === 'image' ? 'blue' :
                previewFile.type === 'video' ? 'purple' : 'red'
              }>
                {previewFile.type === 'image' ? 'Hình £nh' :
                 previewFile.type === 'video' ? 'Video' : 'PDF'}
              </Tag>
              <span>{formatFileSize(previewFile.size)}</span>
            </Space>

            {previewFile.type === 'image' && (
              <Image src={previewFile.url} alt={previewFile.name} style={{ maxWidth: '100%' }} />
            )}

            {previewFile.type === 'video' && (
              <video src={previewFile.url} controls style={{ maxWidth: '100%' }}>
                Trình duyÇt không h× trã video
              </video>
            )}

            {previewFile.type === 'document' && (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <FileTextOutlined style={{ fontSize: 64, color: '#ff4d4f' }} />
                <p style={{ marginTop: 16 }}>
                  <a href={previewFile.url} target="_blank" rel="noopener noreferrer">
                    Mß PDF trong tab mÛi
                  </a>
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MessageComposer;
