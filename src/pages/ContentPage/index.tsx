import { useState, useEffect } from 'react';
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
} from 'antd';
import {
  UploadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
// ReactQuill temporarily disabled due to React 19 compatibility issues
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import type { ColumnsType } from 'antd/es/table';
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

  const handleUpload = async () => {
    try {
      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success('Upload video thành công');
      setShowUploadModal(false);
      uploadForm.resetFields();
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

      {/* Upload Video Modal */}
      <Modal
        title="Upload Video"
        open={showUploadModal}
        onCancel={() => {
          setShowUploadModal(false);
          uploadForm.resetFields();
        }}
        footer={null}
        width={700}
      >
        <Form form={uploadForm} layout="vertical" onFinish={handleUpload}>
          <Form.Item
            name="title"
            label="Tiêu đề video"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input placeholder="Nhập tiêu đề video" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <TextArea rows={4} placeholder="Nhập mô tả video" />
          </Form.Item>

          <Form.Item
            name="file"
            label="Chọn file video"
            rules={[{ required: true, message: 'Vui lòng chọn file' }]}
          >
            <Upload
              accept="video/*"
              maxCount={1}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Chọn file</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="category" label="Danh mục">
            <Select placeholder="Chọn danh mục">
              <Option value="math">Toán học</Option>
              <Option value="literature">Tiếng Việt</Option>
              <Option value="science">Khoa học</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" className="wow-btn" htmlType="submit">
                Upload
              </Button>
              <Button onClick={() => setShowUploadModal(false)}>Hủy</Button>
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
