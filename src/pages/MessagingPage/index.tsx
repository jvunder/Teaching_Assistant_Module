import { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Space,
  Row,
  Col,
  Tag,
  Modal,
  Alert,
  Divider,
  TimePicker,
  message,
} from 'antd';
import {
  SendOutlined,
  UserOutlined,
  FilterOutlined,
  EyeOutlined,
} from '@ant-design/icons';
// ReactQuill temporarily disabled due to React 19 compatibility issues
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import dayjs from 'dayjs';
import './MessagingPage.css';

const { Option } = Select;

interface FilterCondition {
  field: string;
  operator: string;
  value: string;
}

const MessagingPage = () => {
  const [form] = Form.useForm();
  const [showPreview, setShowPreview] = useState(false);
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [messageContent, setMessageContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState<dayjs.Dayjs | null>(null);
  const [scheduledTime, setScheduledTime] = useState<dayjs.Dayjs | null>(null);
  const [recipientCount, setRecipientCount] = useState(0);

  // Mock templates
  const templates = [
    { id: '1', name: 'Chào mừng', body: 'Xin chào quý phụ huynh...' },
    { id: '2', name: 'Nhắc nhở bài tập', body: 'Nhắc nhở: Bài tập về nhà...' },
    { id: '3', name: 'Thông báo kiểm tra', body: 'Thông báo: Lịch kiểm tra...' },
  ];

  // Mock classes for filter
  const classes = [
    { id: '1', name: 'Toán lớp 5' },
    { id: '2', name: 'Tiếng Việt lớp 4' },
    { id: '3', name: 'Khoa học lớp 3' },
  ];

  const handleAddFilter = () => {
    const newFilter: FilterCondition = {
      field: 'class',
      operator: 'equals',
      value: '',
    };
    setFilters([...filters, newFilter]);
  };

  const handleRemoveFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setMessageContent(template.body);
    }
  };

  const handlePreview = () => {
    // Calculate recipient count based on filters
    const count = filters.length > 0 ? Math.floor(Math.random() * 100) + 50 : 0;
    setRecipientCount(count);
    setShowPreview(true);
  };

  const handleSend = async () => {
    try {
      // Anti-spam validation
      if (recipientCount > 100) {
        message.warning('Số lượng người nhận quá lớn. Vui lòng chia nhỏ.');
        return;
      }

      if (!messageContent.trim()) {
        message.error('Vui lòng nhập nội dung tin nhắn');
        return;
      }

      // Simulate send
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (scheduledDate && scheduledTime) {
        message.success(`Tin nhắn đã được lên lịch gửi vào ${scheduledDate.format('DD/MM/YYYY')} ${scheduledTime.format('HH:mm')}`);
      } else {
        message.success('Tin nhắn đã được gửi thành công');
      }

      // Reset form
      form.resetFields();
      setMessageContent('');
      setFilters([]);
      setScheduledDate(null);
      setScheduledTime(null);
    } catch (error) {
      message.error('Gửi tin nhắn thất bại');
    }
  };

  return (
    <div className="messaging-page">
      <h1>Gửi tin nhắn</h1>

      <Row gutter={[16, 16]}>
        {/* Left Column - Message Editor */}
        <Col xs={24} lg={16}>
          <Card title="Soạn tin nhắn" className="message-editor-card">
            <Form form={form} layout="vertical">
              {/* Template Selector */}
              <Form.Item label="Chọn mẫu tin nhắn">
                <Select
                  placeholder="Chọn mẫu tin nhắn (tùy chọn)"
                  value={selectedTemplate}
                  onChange={handleTemplateSelect}
                  allowClear
                >
                  {templates.map((t) => (
                    <Option key={t.id} value={t.id}>
                      {t.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Rich Text Editor - Using TextArea due to React Quill compatibility issues */}
              <Form.Item
                label="Nội dung tin nhắn"
                required
                rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
              >
                <Input.TextArea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Nhập nội dung tin nhắn..."
                  rows={8}
                  showCount
                  maxLength={2000}
                />
              </Form.Item>

              {/* Schedule Picker */}
              <Form.Item label="Lên lịch gửi (tùy chọn)">
                <Space>
                  <DatePicker
                    value={scheduledDate}
                    onChange={setScheduledDate}
                    placeholder="Chọn ngày"
                    format="DD/MM/YYYY"
                  />
                  <TimePicker
                    value={scheduledTime}
                    onChange={setScheduledTime}
                    placeholder="Chọn giờ"
                    format="HH:mm"
                  />
                  {(scheduledDate || scheduledTime) && (
                    <Button
                      type="link"
                      onClick={() => {
                        setScheduledDate(null);
                        setScheduledTime(null);
                      }}
                    >
                      Hủy lịch
                    </Button>
                  )}
                </Space>
              </Form.Item>

              {/* Action Buttons */}
              <Form.Item>
                <Space>
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSend}
                    disabled={!messageContent.trim()}
                  >
                    {scheduledDate && scheduledTime ? 'Lên lịch gửi' : 'Gửi ngay'}
                  </Button>
                  <Button icon={<EyeOutlined />} onClick={handlePreview}>
                    Xem trước
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Right Column - Filter Builder */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <Space>
                <FilterOutlined />
                <span>Lọc người nhận</span>
              </Space>
            }
            className="filter-card"
          >
            <Alert
              message="Chọn điều kiện để lọc danh sách người nhận"
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />

            {/* Filter Conditions */}
            {filters.length === 0 && (
              <Button type="dashed" block icon={<FilterOutlined />} onClick={handleAddFilter}>
                Thêm điều kiện lọc
              </Button>
            )}

            {filters.map((filter, index) => (
              <Card
                key={index}
                size="small"
                style={{ marginBottom: 8 }}
                extra={
                  <Button
                    type="link"
                    danger
                    size="small"
                    onClick={() => handleRemoveFilter(index)}
                  >
                    Xóa
                  </Button>
                }
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Select
                    value={filter.field}
                    onChange={(value) => {
                      const newFilters = [...filters];
                      newFilters[index].field = value;
                      setFilters(newFilters);
                    }}
                    style={{ width: '100%' }}
                  >
                    <Option value="class">Lớp học</Option>
                    <Option value="grade">Khối lớp</Option>
                    <Option value="subject">Môn học</Option>
                    <Option value="student">Học sinh</Option>
                  </Select>

                  <Select
                    value={filter.operator}
                    onChange={(value) => {
                      const newFilters = [...filters];
                      newFilters[index].operator = value;
                      setFilters(newFilters);
                    }}
                    style={{ width: '100%' }}
                  >
                    <Option value="equals">Bằng</Option>
                    <Option value="contains">Chứa</Option>
                    <Option value="not_equals">Khác</Option>
                  </Select>

                  {filter.field === 'class' && (
                    <Select
                      value={filter.value}
                      onChange={(value) => {
                        const newFilters = [...filters];
                        newFilters[index].value = value;
                        setFilters(newFilters);
                      }}
                      placeholder="Chọn lớp"
                      style={{ width: '100%' }}
                    >
                      {classes.map((c) => (
                        <Option key={c.id} value={c.id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                  )}

                  {filter.field !== 'class' && (
                    <Input
                      value={filter.value}
                      onChange={(e) => {
                        const newFilters = [...filters];
                        newFilters[index].value = e.target.value;
                        setFilters(newFilters);
                      }}
                      placeholder="Nhập giá trị"
                    />
                  )}
                </Space>
              </Card>
            ))}

            {filters.length > 0 && (
              <Button
                type="dashed"
                block
                onClick={handleAddFilter}
                style={{ marginTop: 8 }}
              >
                + Thêm điều kiện
              </Button>
            )}

            {/* Recipient Count */}
            {filters.length > 0 && (
              <div style={{ marginTop: 16, padding: 12, background: '#f5f5f5', borderRadius: 4 }}>
                <Space>
                  <UserOutlined />
                  <span>
                    <strong>Số người nhận dự kiến:</strong> ~{recipientCount || 'Tính toán...'}
                  </span>
                </Space>
              </div>
            )}

            {/* Anti-spam Warning */}
            {recipientCount > 100 && (
              <Alert
                message="Số lượng người nhận quá lớn"
                description="Vui lòng chia nhỏ danh sách để tránh spam"
                type="warning"
                showIcon
                style={{ marginTop: 16 }}
              />
            )}
          </Card>
        </Col>
      </Row>

      {/* Preview Modal */}
      <Modal
        title="Xem trước tin nhắn"
        open={showPreview}
        onCancel={() => setShowPreview(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowPreview(false)}>
            Đóng
          </Button>,
          <Button key="send" type="primary" onClick={handleSend}>
            Gửi ngay
          </Button>,
        ]}
        width={600}
      >
        <div className="preview-content">
          <div className="preview-info">
            <Tag color="blue">{recipientCount} người nhận</Tag>
            {scheduledDate && scheduledTime && (
              <Tag color="green">
                Lên lịch: {scheduledDate.format('DD/MM/YYYY')} {scheduledTime.format('HH:mm')}
              </Tag>
            )}
          </div>
          <Divider />
          <div
            className="preview-message"
            dangerouslySetInnerHTML={{ __html: messageContent }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default MessagingPage;
