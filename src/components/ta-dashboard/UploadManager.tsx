/**
 * UploadManager Component
 * Phase 4: Upload Features - Global upload queue management
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Drawer,
  List,
  Button,
  Progress,
  Space,
  Typography,
  Tag,
  Empty,
  Tooltip,
  Badge,
} from 'antd';
import {
  UploadOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import uploadService, { UploadProgress } from '../../services/upload.service';
import './UploadManager.css';

const { Text } = Typography;

interface UploadManagerProps {
  visible: boolean;
  onClose: () => void;
}

const UploadManager: React.FC<UploadManagerProps> = ({ visible, onClose }) => {
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Refresh upload list periodically
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      const allUploads = uploadService.getAllUploads();
      setUploads(allUploads);
      setRefreshKey((prev) => prev + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [visible]);

  // Load initial uploads when drawer opens
  useEffect(() => {
    if (visible) {
      const allUploads = uploadService.getAllUploads();
      setUploads(allUploads);
    }
  }, [visible]);

  /**
   * Pause upload
   */
  const handlePause = useCallback((fileId: string) => {
    uploadService.pauseUpload(fileId);
    setRefreshKey((prev) => prev + 1);
  }, []);

  /**
   * Cancel upload
   */
  const handleCancel = useCallback((fileId: string) => {
    uploadService.cancelUpload(fileId);
    setRefreshKey((prev) => prev + 1);
  }, []);

  /**
   * Clear completed uploads
   */
  const handleClearCompleted = useCallback(() => {
    uploadService.clearCompletedUploads();
    const allUploads = uploadService.getAllUploads();
    setUploads(allUploads);
  }, []);

  /**
   * Get status color
   */
  const getStatusColor = (status: UploadProgress['status']): string => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'uploading':
        return 'processing';
      case 'error':
        return 'error';
      case 'paused':
        return 'warning';
      default:
        return 'default';
    }
  };

  /**
   * Get status text
   */
  const getStatusText = (status: UploadProgress['status']): string => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'uploading':
        return 'Đang upload';
      case 'error':
        return 'Lỗi';
      case 'paused':
        return 'Tạm dừng';
      case 'pending':
        return 'Chờ xử lý';
      default:
        return status;
    }
  };

  /**
   * Get file icon
   */
  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
      return <PictureOutlined style={{ fontSize: 24, color: '#1890ff' }} />;
    } else if (['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(ext || '')) {
      return <VideoCameraOutlined style={{ fontSize: 24, color: '#722ed1' }} />;
    } else {
      return <FileTextOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />;
    }
  };

  // Count uploads by status
  const activeUploads = uploads.filter((u) => u.status === 'uploading' || u.status === 'pending');
  const completedUploads = uploads.filter((u) => u.status === 'completed');
  const errorUploads = uploads.filter((u) => u.status === 'error');

  return (
    <Drawer
      title={
        <Space>
          <UploadOutlined />
          <span>Quản lý Upload</span>
          <Badge count={activeUploads.length} offset={[10, 0]} />
        </Space>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={500}
      extra={
        <Space>
          {completedUploads.length > 0 && (
            <Button
              size="small"
              icon={<DeleteOutlined />}
              onClick={handleClearCompleted}
            >
              Xóa hoàn thành
            </Button>
          )}
        </Space>
      }
    >
      {/* Statistics */}
      <div className="upload-stats">
        <Space size="large">
          <div className="stat-item">
            <Text type="secondary">Đang upload</Text>
            <Text strong style={{ fontSize: 18, color: '#1890ff' }}>
              {activeUploads.length}
            </Text>
          </div>
          <div className="stat-item">
            <Text type="secondary">Hoàn thành</Text>
            <Text strong style={{ fontSize: 18, color: '#52c41a' }}>
              {completedUploads.length}
            </Text>
          </div>
          <div className="stat-item">
            <Text type="secondary">Lỗi</Text>
            <Text strong style={{ fontSize: 18, color: '#ff4d4f' }}>
              {errorUploads.length}
            </Text>
          </div>
        </Space>
      </div>

      {/* Upload list */}
      {uploads.length === 0 ? (
        <Empty
          description="Chưa có file nào được upload"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: 60 }}
        />
      ) : (
        <List
          className="upload-list"
          dataSource={uploads}
          renderItem={(item) => (
            <List.Item
              key={item.fileId}
              className={`upload-item upload-item-${item.status}`}
              actions={[
                // Pause button (only for uploading)
                item.status === 'uploading' && (
                  <Tooltip title="Tạm dừng" key="pause">
                    <Button
                      type="text"
                      size="small"
                      icon={<PauseCircleOutlined />}
                      onClick={() => handlePause(item.fileId)}
                    />
                  </Tooltip>
                ),
                // Resume button (only for paused)
                item.status === 'paused' && (
                  <Tooltip title="Tiếp tục" key="resume">
                    <Button
                      type="text"
                      size="small"
                      icon={<PlayCircleOutlined />}
                      onClick={() => {
                        // Resume logic would go here
                        // For now, this is not implemented in the service
                      }}
                    />
                  </Tooltip>
                ),
                // Retry button (only for error)
                item.status === 'error' && (
                  <Tooltip title="Thử lại" key="retry">
                    <Button
                      type="text"
                      size="small"
                      icon={<ReloadOutlined />}
                      onClick={() => {
                        // Retry logic would go here
                      }}
                    />
                  </Tooltip>
                ),
                // Cancel/Delete button
                (item.status === 'uploading' ||
                  item.status === 'pending' ||
                  item.status === 'paused') && (
                  <Tooltip title="Hủy" key="cancel">
                    <Button
                      type="text"
                      size="small"
                      danger
                      icon={<CloseCircleOutlined />}
                      onClick={() => handleCancel(item.fileId)}
                    />
                  </Tooltip>
                ),
              ].filter(Boolean)}
            >
              <List.Item.Meta
                avatar={getFileIcon(item.fileName)}
                title={
                  <div className="upload-item-title">
                    <Tooltip title={item.fileName}>
                      <Text ellipsis style={{ maxWidth: 280 }}>
                        {item.fileName}
                      </Text>
                    </Tooltip>
                    <Tag color={getStatusColor(item.status)} style={{ marginLeft: 8 }}>
                      {getStatusText(item.status)}
                    </Tag>
                  </div>
                }
                description={
                  <div className="upload-item-progress">
                    {item.status === 'completed' ? (
                      <Space>
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                        <Text type="success">
                          {uploadService.formatFileSize(item.totalBytes)}
                        </Text>
                      </Space>
                    ) : item.status === 'error' ? (
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Space>
                          <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                          <Text type="danger">{item.error || 'Upload thất bại'}</Text>
                        </Space>
                      </Space>
                    ) : (
                      <>
                        <Progress
                          percent={item.progress}
                          size="small"
                          status={
                            item.status === 'error'
                              ? 'exception'
                              : item.status === 'paused'
                              ? 'normal'
                              : 'active'
                          }
                        />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {uploadService.formatFileSize(item.uploadedBytes)} /{' '}
                          {uploadService.formatFileSize(item.totalBytes)}
                        </Text>
                      </>
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
};

export default UploadManager;
