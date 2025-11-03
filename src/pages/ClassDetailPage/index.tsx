import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Table,
  Tag,
  Button,
  Modal,
  Space,
  Row,
  Col,
  Statistic,
  Progress,
  Tabs,
  Input,
  message,
  Avatar,
  Descriptions,
  Alert,
} from 'antd';
import {
  ArrowLeftOutlined,
  UserOutlined,
  MessageOutlined,
  FileTextOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { mockDataService, type MockClass } from '@/services/mockData.service';
import type { ColumnsType } from 'antd/es/table';
import './ClassDetailPage.css';

const { TabPane } = Tabs;

interface Parent {
  id: string;
  name: string;
  phone: string;
  email: string;
  studentName: string;
  relationship: string;
  lastContact: string;
}

interface LearningProgress {
  studentName: string;
  completionRate: number;
  averageScore: number;
  assignmentsCompleted: number;
  lastActivity: string;
}

const ClassDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [classData, setClassData] = useState<MockClass | null>(null);
  const [parents, setParents] = useState<Parent[]>([]);
  const [progress, setProgress] = useState<LearningProgress[]>([]);
  const [showParentModal, setShowParentModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (id) {
      loadClassData();
      loadParents();
      loadProgress();
    }
  }, [id]);

  const loadClassData = async () => {
    try {
      const classes = await mockDataService.getClasses();
      const found = classes.find((c) => c.id === id);
      setClassData(found || null);
    } catch (error) {
      message.error('Không thể tải thông tin lớp học');
    }
  };

  const loadParents = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Mock parents data
      setParents([
        {
          id: '1',
          name: 'Nguyễn Văn A',
          phone: '0901234567',
          email: 'nguyenvana@email.com',
          studentName: 'Nguyễn Thị B',
          relationship: 'Bố',
          lastContact: '2025-10-30',
        },
        {
          id: '2',
          name: 'Trần Thị C',
          phone: '0912345678',
          email: 'tranthic@email.com',
          studentName: 'Trần Văn D',
          relationship: 'Mẹ',
          lastContact: '2025-10-29',
        },
      ]);
    } catch (error) {
      message.error('Không thể tải danh sách phụ huynh');
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Mock progress data
      setProgress([
        {
          studentName: 'Nguyễn Thị B',
          completionRate: 85,
          averageScore: 8.5,
          assignmentsCompleted: 12,
          lastActivity: '2025-10-30',
        },
        {
          studentName: 'Trần Văn D',
          completionRate: 92,
          averageScore: 9.0,
          assignmentsCompleted: 15,
          lastActivity: '2025-10-30',
        },
      ]);
    } catch (error) {
      message.error('Không thể tải tiến độ học tập');
    }
  };

  const handleViewParent = (parent: Parent) => {
    setSelectedParent(parent);
    setShowParentModal(true);
  };

  const handleSendMessage = () => {
    navigate('/messaging', { state: { classId: id } });
  };

  const filteredParents = parents.filter(
    (p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase()) ||
      p.studentName.toLowerCase().includes(searchText.toLowerCase())
  );

  const parentColumns: ColumnsType<Parent> = [
    {
      title: 'Tên phụ huynh',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Học sinh',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Quan hệ',
      dataIndex: 'relationship',
      key: 'relationship',
      render: (rel: string) => <Tag>{rel}</Tag>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Liên hệ cuối',
      dataIndex: 'lastContact',
      key: 'lastContact',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Parent) => (
        <Button type="link" onClick={() => handleViewParent(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const progressColumns: ColumnsType<LearningProgress> = [
    {
      title: 'Học sinh',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Tỷ lệ hoàn thành',
      dataIndex: 'completionRate',
      key: 'completionRate',
      render: (rate: number) => (
        <Progress percent={rate} status={rate >= 80 ? 'success' : 'active'} />
      ),
    },
    {
      title: 'Điểm trung bình',
      dataIndex: 'averageScore',
      key: 'averageScore',
      render: (score: number) => <Tag color="blue">{score}/10</Tag>,
    },
    {
      title: 'Bài tập đã làm',
      dataIndex: 'assignmentsCompleted',
      key: 'assignmentsCompleted',
      align: 'center',
    },
    {
      title: 'Hoạt động cuối',
      dataIndex: 'lastActivity',
      key: 'lastActivity',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
  ];

  if (!classData) {
    return <Alert message="Không tìm thấy lớp học" type="error" />;
  }

  return (
    <div className="class-detail-page">
      <div className="class-detail-header">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/classes')}>
          Quay lại
        </Button>
        <h1>{classData.name}</h1>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Số học sinh"
              value={classData.studentCount}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Số phụ huynh"
              value={classData.parentCount}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Khối lớp"
              value={classData.grade}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Môn học"
              value={classData.subject}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Tabs */}
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button
              type="primary"
              icon={<MessageOutlined />}
              onClick={handleSendMessage}
            >
              Gửi tin nhắn cho lớp
            </Button>
          </Space>
        </div>

        <Tabs defaultActiveKey="parents">
          <TabPane tab="Danh sách phụ huynh" key="parents">
            <Input
              placeholder="Tìm kiếm phụ huynh..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ marginBottom: 16, maxWidth: 400 }}
              allowClear
            />
            <Table
              columns={parentColumns}
              dataSource={filteredParents}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Tổng ${total} phụ huynh`,
              }}
              scroll={{ y: 400 }}
            />
          </TabPane>

          <TabPane tab="Tiến độ học tập" key="progress">
            <Table
              columns={progressColumns}
              dataSource={progress}
              rowKey="studentName"
              pagination={false}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Parent Detail Modal */}
      <Modal
        title="Thông tin phụ huynh"
        open={showParentModal}
        onCancel={() => setShowParentModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowParentModal(false)}>
            Đóng
          </Button>,
          <Button
            key="message"
            type="primary"
            icon={<MessageOutlined />}
            onClick={() => {
              setShowParentModal(false);
              navigate('/messaging', { state: { parentId: selectedParent?.id } });
            }}
          >
            Gửi tin nhắn
          </Button>,
        ]}
        width={600}
      >
        {selectedParent && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Tên phụ huynh">
              {selectedParent.name}
            </Descriptions.Item>
            <Descriptions.Item label="Quan hệ">
              {selectedParent.relationship}
            </Descriptions.Item>
            <Descriptions.Item label="Học sinh">
              {selectedParent.studentName}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {selectedParent.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedParent.email}
            </Descriptions.Item>
            <Descriptions.Item label="Liên hệ cuối cùng">
              {new Date(selectedParent.lastContact).toLocaleDateString('vi-VN')}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default ClassDetailPage;
