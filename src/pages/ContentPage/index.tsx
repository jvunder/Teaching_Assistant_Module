import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Select,
  Space,
  Tabs,
  Typography,
  message,
  Progress,
  List,
} from 'antd';
import {
  UploadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  InboxOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import uploadService, { UploadProgress } from '../../services/upload.service';
import type { ContentAttachment } from '../../types/content.types';
import './ContentPage.css';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Title } = Typography;

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'article';
  status: 'draft' | 'published';
  views: number;
  createdAt: string;
  thumbnail?: string;
}

const ContentPage = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [uploadForm] = Form.useForm();
  const [articleForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('all');

  // Upload tracking
  const [uploadingFiles, setUploadingFiles] = useState<Map<string, UploadProgress>>(new Map());
  const [uploadedFiles, setUploadedFiles] = useState<ContentAttachment[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadContents();
  }, []);

  const loadContents = async () => {
    setLoading(true);
    try {
      // Mock data
      await new Promise((resolve) => setTimeout(resolve, 500));
      setContents([
        {
          id: '1',
          title: 'Video hướng dẫn Toán lớp 5',
          type: 'video',
          status: 'published',
          views: 1250,
          createdAt: '2025-10-28',
        },
        {
          id: '2',
          title: 'Bài viết: Phương pháp học hiệu quả',
          type: 'article',
          status: 'published',
          views: 856,
          createdAt: '2025-10-27',
        },
        {
          id: '3',
          title: 'Video giới thiệu khóa học',
          type: 'video',
          status: 'draft',
          views: 0,
          createdAt: '2025-10-29',
        },
      ]);
    } catch (error) {
      message.error('Không thể tải danh sách nội dung');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle file upload with progress
   */
  const handleFileUpload = useCallback(async (file: File) => {
    // Determine file type
    let type: 'image' | 'video' | 'document';
    if (file.type.startsWith('image/')) {
      type = 'image';
    } else if (file.type.startsWith('video/')) {
      type = 'video';
    } else if (file.type === 'application/pdf') {
      type = 'document';
    } else {
      message.error('Loại file không được hỗ trợ');
      return;
    }

    // Upload file
    try {
      const result = await uploadService.uploadFile(file, type, {
        onProgress: (progress) => {
          setUploadingFiles((prev) => new Map(prev).set(progress.fileId, progress));
        },
      });

      if (result.success && result.url) {
        const attachment: ContentAttachment = {
          id: result.fileId,
          type,
          name: file.name,
          url: result.url,
          size: file.size,
          thumbnail: result.thumbnail,
        };

        setUploadedFiles((prev) => [...prev, attachment]);
        setUploadingFiles((prev) => {
          const newMap = new Map(prev);
          newMap.delete(result.fileId);
          return newMap;
        });

        message.success(`Upload ${type === 'image' ? 'hình ảnh' : type === 'video' ? 'video' : 'file'} thành công`);
      } else {
        message.error(result.error || 'Upload thất bại');
      }
    } catch (error) {
      message.error('Upload thất bại');
      console.error('Upload error:', error);
    }
  }, []);

  /**
   * Handle multiple file upload
   */
  const handleMultipleFileUpload = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      handleFileUpload(file);
    });
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
      handleMultipleFileUpload(files);
    }
  }, [handleMultipleFileUpload]);

  /**
   * Handle file input change
   */
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleMultipleFileUpload(files);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleMultipleFileUpload]);

  /**
   * Remove uploaded file
   */
  const handleRemoveFile = useCallback((fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  }, []);

  /**
   * Cancel uploading file
   */
  const handleCancelUpload = useCallback((fileId: string) => {
    uploadService.cancelUpload(fileId);
    setUploadingFiles((prev) => {
      const newMap = new Map(prev);
      newMap.delete(fileId);
      return newMap;
    });
  }, []);

  const handleUpload = async () => {
    try {
      if (uploadingFiles.size > 0) {
        message.warning('Vui lòng đợi upload hoàn tất');
        return;
      }

      if (uploadedFiles.length === 0) {
        message.warning('Vui lòng upload ít nhất một file');
        return;
      }

      // Simulate saving content
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success('Upload nội dung thành công');
      setShowUploadModal(false);
      uploadForm.resetFields();
      setUploadedFiles([]);
      setUploadingFiles(new Map());
      loadContents();
    } catch (error) {
      message.error('Upload thất bại');
    }
  };

  const handleCreateArticle = async () => {
    try {
      // Simulate create
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success('Tạo bài viết thành công');
      setShowArticleModal(false);
      articleForm.resetFields();
      loadContents();
    } catch (error) {
      message.error('Tạo bài viết thất bại');
    }
  };

  const handlePreview = (content: ContentItem) => {
    setSelectedContent(content);
    setShowPreviewModal(true);
  };

  const filteredContents =
    activeTab === 'all'
      ? contents
      : contents.filter((c) => c.status === activeTab);

  const columns: ColumnsType<ContentItem> = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          {record.type === 'video' ? (
            <PlayCircleOutlined className="icon-blue" />
          ) : (
            <FileTextOutlined className="icon-green" />
          )}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'video' ? 'blue' : 'green'}>
          {type === 'video' ? 'Video' : 'Bài viết'}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'published' ? 'green' : 'orange'}>
          {status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
        </Tag>
      ),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      align: 'center',
      sorter: (a, b) => a.views - b.views,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handlePreview(record)}
          >
            Xem
          </Button>
          <Button type="link" icon={<EditOutlined />}>
            Sửa
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="wow-page content-page">
      <div className="wow-header content-header">
        <Title level={2}>Quản lý nội dung</Title>
        <Space>
          <Button
            type="primary"
            className="wow-btn"
            icon={<UploadOutlined />}
            onClick={() => setShowUploadModal(true)}
          >
            Upload Video
          </Button>
          <Button
            type="default"
            icon={<FileTextOutlined />}
            onClick={() => setShowArticleModal(true)}
          >
            Tạo bài viết
          </Button>
        </Space>
      </div>

      <Card className="wow-card">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Tất cả" key="all" />
          <TabPane tab="Đã xuất bản" key="published" />
          <TabPane tab="Bản nháp" key="draft" />
        </Tabs>

        <Table
          className="wow-table"
          columns={columns}
          dataSource={filteredContents}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} nội dung`,
          }}
        />
      </Card>

      {/* Upload Video Modal - Enhanced with Drag & Drop */}
      <Modal
        title="Upload Nội dung (Video, Hình ảnh, PDF)"
        open={showUploadModal}
        onCancel={() => {
          setShowUploadModal(false);
          uploadForm.resetFields();
          setUploadedFiles([]);
          setUploadingFiles(new Map());
        }}
        footer={null}
        width={800}
      >
        <Form form={uploadForm} layout="vertical" onFinish={handleUpload}>
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input placeholder="Nhập tiêu đề" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <TextArea rows={4} placeholder="Nhập mô tả" />
          </Form.Item>

          {/* Drag & Drop Upload Area */}
          <Form.Item label="Upload Files (Video, Hình ảnh, PDF)">
            <div
              className={`upload-drag-area ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <InboxOutlined style={{ fontSize: 48, color: '#1890ff' }} />
              <p className="upload-text">Click hoặc kéo thả file vào đây để upload</p>
              <p className="upload-hint">
                Hỗ trợ: Video (max 100MB), Hình ảnh (max 5MB), PDF (max 10MB)
              </p>
              <Button icon={<UploadOutlined />} style={{ marginTop: 16 }}>
                Chọn Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*,image/*,application/pdf"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
              />
            </div>
          </Form.Item>

          {/* Uploading Files List */}
          {uploadingFiles.size > 0 && (
            <List
              size="small"
              header={<div><strong>Đang upload...</strong></div>}
              bordered
              dataSource={Array.from(uploadingFiles.values())}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      key="cancel"
                      type="text"
                      size="small"
                      danger
                      icon={<CloseCircleOutlined />}
                      onClick={() => handleCancelUpload(item.fileId)}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={item.fileName}
                    description={
                      <div>
                        <Progress percent={item.progress} size="small" status={item.status === 'error' ? 'exception' : 'active'} />
                        <div style={{ fontSize: 12, marginTop: 4 }}>
                          {uploadService.formatFileSize(item.uploadedBytes)} / {uploadService.formatFileSize(item.totalBytes)}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          )}

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <List
              size="small"
              header={<div><strong>Files đã upload ({uploadedFiles.length})</strong></div>}
              bordered
              dataSource={uploadedFiles}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      key="remove"
                      type="text"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveFile(item.id)}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      item.type === 'image' && item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                      ) : item.type === 'video' ? (
                        <PlayCircleOutlined style={{ fontSize: 32, color: '#722ed1' }} />
                      ) : (
                        <FileTextOutlined style={{ fontSize: 32, color: '#ff4d4f' }} />
                      )
                    }
                    title={item.name}
                    description={
                      <Space>
                        <Tag color={item.type === 'image' ? 'blue' : item.type === 'video' ? 'purple' : 'red'}>
                          {item.type === 'image' ? 'Hình ảnh' : item.type === 'video' ? 'Video' : 'PDF'}
                        </Tag>
                        <span>{uploadService.formatFileSize(item.size)}</span>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          )}

          <Form.Item name="category" label="Danh mục" style={{ marginTop: 16 }}>
            <Select placeholder="Chọn danh mục">
              <Option value="math">Toán học</Option>
              <Option value="literature">Tiếng Việt</Option>
              <Option value="science">Khoa học</Option>
              <Option value="education">Giáo dục</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                className="wow-btn"
                htmlType="submit"
                disabled={uploadingFiles.size > 0 || uploadedFiles.length === 0}
                loading={uploadingFiles.size > 0}
              >
                {uploadingFiles.size > 0 ? 'Đang upload...' : 'Lưu nội dung'}
              </Button>
              <Button onClick={() => {
                setShowUploadModal(false);
                setUploadedFiles([]);
                setUploadingFiles(new Map());
              }}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Article Modal */}
      <Modal
        title="Tạo bài viết"
        open={showArticleModal}
        onCancel={() => {
          setShowArticleModal(false);
          articleForm.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form form={articleForm} layout="vertical" onFinish={handleCreateArticle}>
          <Form.Item
            name="title"
            label="Tiêu đề bài viết"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input placeholder="Nhập tiêu đề bài viết" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
          >
            <TextArea
              rows={12}
              placeholder="Nhập nội dung bài viết..."
              showCount
              maxLength={5000}
            />
          </Form.Item>

          <Form.Item name="category" label="Danh mục">
            <Select placeholder="Chọn danh mục">
              <Option value="education">Giáo dục</Option>
              <Option value="tips">Mẹo học tập</Option>
              <Option value="news">Tin tức</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" className="wow-btn" htmlType="submit">
                Tạo bài viết
              </Button>
              <Button onClick={() => setShowArticleModal(false)}>Hủy</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Preview Modal */}
      <Modal
        title={selectedContent?.title}
        open={showPreviewModal}
        onCancel={() => setShowPreviewModal(false)}
        footer={null}
        width={900}
      >
        {selectedContent && (
          <div className="content-preview">
            <Space>
              <Tag color={selectedContent.type === 'video' ? 'blue' : 'green'}>
                {selectedContent.type === 'video' ? 'Video' : 'Bài viết'}
              </Tag>
              <Tag color={selectedContent.status === 'published' ? 'green' : 'orange'}>
                {selectedContent.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
              </Tag>
              <span>Lượt xem: {selectedContent.views}</span>
            </Space>
            <div style={{ marginTop: 16 }}>
              {/* Preview content would go here */}
              <p>Nội dung preview...</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ContentPage;
