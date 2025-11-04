import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Tabs,
  Typography,
  message,
  Descriptions,
  Alert,
} from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SendOutlined,
} from '@ant-design/icons';
// ReactQuill temporarily disabled due to React 19 compatibility issues
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import type { ColumnsType } from 'antd/es/table';
import './InboxPage.css';

const { Option } = Select;
const { TabPane } = Tabs;
const { Title } = Typography;
const { TextArea } = Input;

interface Ticket {
  id: string;
  subject: string;
  status: 'new' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  from: string;
  createdAt: string;
  lastReply: string;
  category: string;
}

const InboxPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [activeTab, setActiveTab] = useState('new');
  const [replyForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Mock canned responses
  const cannedResponses = [
    { id: '1', text: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ xử lý yêu cầu của bạn sớm nhất có thể.' },
    { id: '2', text: 'Vấn đề này đã được ghi nhận và sẽ được chuyển đến bộ phận liên quan.' },
    { id: '3', text: 'Xin lỗi vì sự bất tiện. Chúng tôi đang xử lý vấn đề này.' },
  ];

  useEffect(() => {
    loadTickets();
  }, [activeTab]);

  const loadTickets = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Mock tickets
      const mockTickets: Ticket[] = [
        {
          id: '1',
          subject: 'Hỏi về lịch học bù',
          status: 'new',
          priority: 'high',
          from: 'Phụ huynh Nguyễn Văn A',
          createdAt: '2025-10-30T10:00:00',
          lastReply: '2025-10-30T10:00:00',
          category: 'Schedule',
        },
        {
          id: '2',
          subject: 'Yêu cầu xem điểm kiểm tra',
          status: 'in_progress',
          priority: 'medium',
          from: 'Phụ huynh Trần Thị B',
          createdAt: '2025-10-29T14:30:00',
          lastReply: '2025-10-30T09:00:00',
          category: 'Grade',
        },
        {
          id: '3',
          subject: 'Phản ánh về bài giảng',
          status: 'resolved',
          priority: 'low',
          from: 'Phụ huynh Lê Văn C',
          createdAt: '2025-10-28T16:00:00',
          lastReply: '2025-10-29T11:00:00',
          category: 'Feedback',
        },
      ];

      const filtered =
        activeTab === 'all'
          ? mockTickets
          : mockTickets.filter((t) => t.status === activeTab);

      setTickets(filtered);
    } catch (error) {
      message.error('Không thể tải danh sách ticket');
    } finally {
      setLoading(false);
    }
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowDetailModal(true);
  };

  const handleReply = () => {
    setShowReplyModal(true);
  };

  const handleSubmitReply = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success('Phản hồi đã được gửi');
      setShowReplyModal(false);
      replyForm.resetFields();
      loadTickets();
    } catch (error) {
      message.error('Gửi phản hồi thất bại');
    }
  };

  const handleTransferToAdmin = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      message.success('Ticket đã được chuyển đến quản trị viên');
      setShowDetailModal(false);
      loadTickets();
    } catch (error) {
      message.error('Chuyển ticket thất bại');
    }
  };

  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; icon: React.ReactNode; text: string }> = {
      new: { color: 'blue', icon: <ClockCircleOutlined />, text: 'Mới' },
      in_progress: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Đang xử lý' },
      resolved: { color: 'green', icon: <CheckCircleOutlined />, text: 'Đã giải quyết' },
    };
    const config = statusMap[status] || statusMap.new;
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const getPriorityTag = (priority: string) => {
    const priorityMap: Record<string, { color: string; text: string }> = {
      low: { color: 'default', text: 'Thấp' },
      medium: { color: 'orange', text: 'Trung bình' },
      high: { color: 'red', text: 'Cao' },
    };
    const config = priorityMap[priority] || priorityMap.medium;
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns: ColumnsType<Ticket> = [
    {
      title: 'Chủ đề',
      dataIndex: 'subject',
      key: 'subject',
      render: (text, record) => (
        <Button type="link" onClick={() => handleViewTicket(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Người gửi',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (cat: string) => <Tag>{cat}</Tag>,
    },
    {
      title: 'Mức độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      render: getPriorityTag,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: getStatusTag,
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
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewTicket(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="wow-page inbox-page">
      <div className="wow-header inbox-header">
        <Title level={2}>Hộp thư hỗ trợ</Title>
      </div>

      <Card className="wow-card">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span>
                Mới <Tag color="blue">{tickets.filter((t) => t.status === 'new').length}</Tag>
              </span>
            }
            key="new"
          />
          <TabPane
            tab={
              <span>
                Đang xử lý{' '}
                <Tag color="orange">
                  {tickets.filter((t) => t.status === 'in_progress').length}
                </Tag>
              </span>
            }
            key="in_progress"
          />
          <TabPane
            tab={
              <span>
                Đã giải quyết{' '}
                <Tag color="green">
                  {tickets.filter((t) => t.status === 'resolved').length}
                </Tag>
              </span>
            }
            key="resolved"
          />
          <TabPane tab="Tất cả" key="all" />
        </Tabs>

        <Table
          className="wow-table"
          columns={columns}
          dataSource={tickets}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} ticket`,
          }}
        />
      </Card>

      {/* Ticket Detail Modal */}
      <Modal
        title="Chi tiết ticket"
        open={showDetailModal}
        onCancel={() => setShowDetailModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowDetailModal(false)}>
            Đóng
          </Button>,
          <Button key="transfer" onClick={handleTransferToAdmin}>
            Chuyển đến admin
          </Button>,
          <Button key="reply" type="primary" className="wow-btn" icon={<SendOutlined />} onClick={handleReply}>
            Phản hồi
          </Button>,
        ]}
        width={800}
      >
        {selectedTicket && (
          <div>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Chủ đề">
                {selectedTicket.subject}
              </Descriptions.Item>
              <Descriptions.Item label="Người gửi">
                {selectedTicket.from}
              </Descriptions.Item>
              <Descriptions.Item label="Danh mục">
                <Tag>{selectedTicket.category}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Mức độ ưu tiên">
                {getPriorityTag(selectedTicket.priority)}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {getStatusTag(selectedTicket.status)}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {new Date(selectedTicket.createdAt).toLocaleString('vi-VN')}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24 }}>
              <Title level={4}>Nội dung tin nhắn</Title>
              <Alert
                message="Đây là nội dung tin nhắn từ phụ huynh..."
                type="info"
                showIcon
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Reply Modal */}
      <Modal
        title="Phản hồi ticket"
        open={showReplyModal}
        onCancel={() => {
          setShowReplyModal(false);
          replyForm.resetFields();
        }}
        footer={null}
        width={700}
      >
        <Form form={replyForm} layout="vertical" onFinish={handleSubmitReply}>
          <Form.Item label="Chọn phản hồi nhanh (tùy chọn)">
            <Select
              placeholder="Chọn phản hồi nhanh"
              onChange={(value) => {
                const response = cannedResponses.find((r) => r.id === value);
                if (response) {
                  replyForm.setFieldsValue({ content: response.text });
                }
              }}
            >
              {cannedResponses.map((r) => (
                <Option key={r.id} value={r.id}>
                  {r.text.substring(0, 50)}...
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung phản hồi"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
          >
            <TextArea
              rows={8}
              placeholder="Nhập nội dung phản hồi..."
              showCount
              maxLength={2000}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" className="wow-btn" htmlType="submit" icon={<SendOutlined />}>
                Gửi phản hồi
              </Button>
              <Button onClick={() => setShowReplyModal(false)}>Hủy</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InboxPage;
