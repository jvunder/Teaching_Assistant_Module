import { useState, useCallback } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Space,
  Upload,
  Modal,
  Alert,
  Tag,
  Divider,
  List,
  Progress,
  message as antdMessage,
  Typography,
  Row,
  Col,
} from 'antd';
import {
  SendOutlined,
  EyeOutlined,
  PaperClipOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  FileOutlined,
  DeleteOutlined,
  FilterOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import dayjs, { Dayjs } from 'dayjs';
import './MessageComposer.css';

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

interface MessageComposerProps {
  defaultRecipients?: string[];
  onSent?: (message: Message) => void;
}

interface Message {
  id: string;
  recipients: string[];
  content: string;
  attachments: AttachmentFile[];
  scheduledDate?: string;
  template?: string;
}

interface AttachmentFile {
  uid: string;
  name: string;
  type: 'image' | 'video' | 'file';
  url: string;
  size: number;
}

interface FilterCondition {
  field: string;
  operator: string;
  value: string;
}

interface MessageTemplate {
  id: string;
  name: string;
  body: string;
  category: string;
}

const MessageComposer = ({ defaultRecipients = [], onSent }: MessageComposerProps) => {
  const [form] = Form.useForm();
  const [messageContent, setMessageContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const [scheduledDate, setScheduledDate] = useState<Dayjs | null>(null);
  const [scheduledTime, setScheduledTime] = useState<Dayjs | null>(null);
  const [recipientCount, setRecipientCount] = useState(defaultRecipients.length);
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock templates
  const templates: MessageTemplate[] = [
    {
      id: '1',
      name: 'Chào mëng hÍc viên mÛi',
      body: 'Xin chào quý phå huynh,\n\nChúng tôi r¥t vui °ãc chào ón b¡n tham gia khóa hÍc nuôi d¡y con. Hãy cùng nhau hÍc hÏi và phát triÃn!\n\nTrân trÍng.',
      category: 'Chào mëng',
    },
    {
      id: '2',
      name: 'Nh¯c nhß bài t­p',
      body: 'Kính gíi quý phå huynh,\n\nNh¯c nhß: Bài t­p vÁ nhà tu§n này c§n °ãc hoàn thành và nÙp tr°Ûc ngày [ngày]. Vui lòng kiÃm tra và hoàn thành úng h¡n.\n\nC£m ¡n!',
      category: 'Nh¯c nhß',
    },
    {
      id: '3',
      name: 'Thông báo kiÃm tra',
      body: 'Thông báo ¿n quý phå huynh,\n\nLËch kiÃm tra giïa kó s½ °ãc tÕ chéc vào [ngày]. Vui lòng chu©n bË và ôn t­p kù.\n\nChúc các b¡n thi tÑt!',
      category: 'Thông báo',
    },
    {
      id: '4',
      name: 'Khuy¿n khích hÍc t­p',
      body: 'Chào các b¡n,\n\nChúng tôi r¥t vui khi th¥y ti¿n bÙ cça b¡n trong khóa hÍc. Hãy ti¿p tåc phát huy và hÍc t­p chm chÉ!\n\nChúc b¡n thành công!',
      category: 'Ùng viên',
    },
  ];

  // Mock classes for filter
  const classes = [
    { id: '1', name: 'Nuôi d¡y con 0-3 tuÕi' },
    { id: '2', name: 'Tâm lý hÍc °Ýng' },
    { id: '3', name: 'Nuôi con b±ng tình yêu th°¡ng' },
    { id: '4', name: 'Kù nng giao ti¿p vÛi con' },
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setMessageContent(template.body);
      form.setFieldsValue({ content: template.body });
    }
  };

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
    // Recalculate recipient count
    calculateRecipientCount(filters.filter((_, i) => i !== index));
  };

  const handleFilterChange = (index: number, field: keyof FilterCondition, value: string) => {
    const newFilters = [...filters];
    newFilters[index][field] = value;
    setFilters(newFilters);
    calculateRecipientCount(newFilters);
  };

  const calculateRecipientCount = (currentFilters: FilterCondition[]) => {
    // Simulate recipient count calculation based on filters
    if (currentFilters.length === 0) {
      setRecipientCount(defaultRecipients.length || 0);
    } else {
      // Mock calculation: each filter reduces count
      const count = Math.floor(Math.random() * 50) + 20;
      setRecipientCount(count);
    }
  };

  const handleFileUpload: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;

    try {
      setUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      clearInterval(interval);
      setUploadProgress(100);

      // Determine file type
      const uploadedFile = file as File;
      let fileType: 'image' | 'video' | 'file' = 'file';
      if (uploadedFile.type.startsWith('image/')) {
        fileType = 'image';
      } else if (uploadedFile.type.startsWith('video/')) {
        fileType = 'video';
      }

      // Mock attachment
      const newAttachment: AttachmentFile = {
        uid: `${Date.now()}-${uploadedFile.name}`,
        name: uploadedFile.name,
        type: fileType,
        url: URL.createObjectURL(uploadedFile),
        size: uploadedFile.size,
      };

      setAttachments([...attachments, newAttachment]);
      setUploading(false);
      setUploadProgress(0);

      if (onSuccess) {
        onSuccess('OK');
      }
      antdMessage.success(`${uploadedFile.name} ã °ãc t£i lên thành công`);
    } catch (error) {
      setUploading(false);
      setUploadProgress(0);
      if (onError) {
        onError(new Error('Upload failed'));
      }
      antdMessage.error('T£i lên th¥t b¡i');
    }
  };

  const handleRemoveAttachment = (uid: string) => {
    setAttachments(attachments.filter((att) => att.uid !== uid));
  };

  const handlePreview = () => {
    if (!messageContent.trim()) {
      antdMessage.error('Vui lòng nh­p nÙi dung tin nh¯n');
      return;
    }
    setShowPreview(true);
  };

  const handleSend = async () => {
    try {
      // Validation
      if (!messageContent.trim()) {
        antdMessage.error('Vui lòng nh­p nÙi dung tin nh¯n');
        return;
      }

      // Anti-spam validation
      if (recipientCount > 100) {
        antdMessage.warning('SÑ l°ãng ng°Ýi nh­n quá lÛn (>100). Vui lòng chia nhÏ danh sách.');
        return;
      }

      // Check attachment size limit (10MB total)
      const totalSize = attachments.reduce((sum, att) => sum + att.size, 0);
      if (totalSize > 10 * 1024 * 1024) {
        antdMessage.warning('TÕng dung l°ãng file ính kèm v°ãt quá 10MB');
        return;
      }

      // Simulate send
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        recipients: defaultRecipients,
        content: messageContent,
        attachments: attachments,
        scheduledDate:
          scheduledDate && scheduledTime
            ? `${scheduledDate.format('YYYY-MM-DD')} ${scheduledTime.format('HH:mm')}`
            : undefined,
        template: selectedTemplate,
      };

      if (scheduledDate && scheduledTime) {
        antdMessage.success(
          `Tin nh¯n ã °ãc lên lËch gíi vào ${scheduledDate.format('DD/MM/YYYY')} ${scheduledTime.format('HH:mm')}`
        );
      } else {
        antdMessage.success(`Tin nh¯n ã °ãc gíi thành công ¿n ${recipientCount} ng°Ýi nh­n`);
      }

      // Call callback
      if (onSent) {
        onSent(newMessage);
      }

      // Reset form
      handleReset();
      setShowPreview(false);
    } catch (error) {
      antdMessage.error('Gíi tin nh¯n th¥t b¡i');
    }
  };

  const handleReset = () => {
    form.resetFields();
    setMessageContent('');
    setSelectedTemplate('');
    setAttachments([]);
    setFilters([]);
    setScheduledDate(null);
    setScheduledTime(null);
    setRecipientCount(defaultRecipients.length);
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <PictureOutlined className="attachment-icon icon-blue" />;
      case 'video':
        return <VideoCameraOutlined className="attachment-icon icon-purple" />;
      default:
        return <FileOutlined className="attachment-icon icon-gray" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="message-composer">
      <Row gutter={[16, 16]}>
        {/* Left Column - Message Editor */}
        <Col xs={24} lg={16}>
          <Card title="So¡n tin nh¯n" className="composer-card">
            <Form form={form} layout="vertical">
              {/* Template Selector */}
              <Form.Item label="ChÍn m«u tin nh¯n (tùy chÍn)">
                <Select
                  placeholder="ChÍn m«u có sµn"
                  value={selectedTemplate}
                  onChange={handleTemplateSelect}
                  allowClear
                  onClear={() => setSelectedTemplate('')}
                >
                  {templates.map((template) => (
                    <Option key={template.id} value={template.id}>
                      <Space>
                        <Tag color="blue">{template.category}</Tag>
                        {template.name}
                      </Space>
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Message Content */}
              <Form.Item
                label="NÙi dung tin nh¯n"
                name="content"
                rules={[{ required: true, message: 'Vui lòng nh­p nÙi dung' }]}
              >
                <TextArea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Nh­p nÙi dung tin nh¯n..."
                  rows={10}
                  showCount
                  maxLength={2000}
                />
              </Form.Item>

              {/* Attachments */}
              <Form.Item label="ính kèm file (hình £nh, video, tài liÇu)">
                <Upload
                  customRequest={handleFileUpload}
                  showUploadList={false}
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
                >
                  <Button icon={<PaperClipOutlined />} disabled={uploading}>
                    ChÍn file
                  </Button>
                </Upload>
                {uploading && (
                  <div style={{ marginTop: 8 }}>
                    <Progress percent={uploadProgress} status="active" />
                  </div>
                )}
                {attachments.length > 0 && (
                  <List
                    className="attachment-list"
                    dataSource={attachments}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button
                            type="text"
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() => handleRemoveAttachment(item.uid)}
                          >
                            Xóa
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={getAttachmentIcon(item.type)}
                          title={item.name}
                          description={formatFileSize(item.size)}
                        />
                      </List.Item>
                    )}
                  />
                )}
              </Form.Item>

              {/* Schedule Picker */}
              <Form.Item label="Lên lËch gíi (tùy chÍn)">
                <Space>
                  <DatePicker
                    value={scheduledDate}
                    onChange={setScheduledDate}
                    placeholder="ChÍn ngày"
                    format="DD/MM/YYYY"
                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                  />
                  <TimePicker
                    value={scheduledTime}
                    onChange={setScheduledTime}
                    placeholder="ChÍn giÝ"
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
                      Hçy lËch
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
                    disabled={!messageContent.trim() || recipientCount === 0}
                  >
                    {scheduledDate && scheduledTime ? 'Lên lËch gíi' : 'Gíi ngay'}
                  </Button>
                  <Button icon={<EyeOutlined />} onClick={handlePreview}>
                    Xem tr°Ûc
                  </Button>
                  <Button onClick={handleReset}>Làm mÛi</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Right Column - Recipient Filter */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <Space>
                <FilterOutlined />
                <span>LÍc ng°Ýi nh­n</span>
              </Space>
            }
            className="filter-card"
          >
            <Alert
              message="ChÍn iÁu kiÇn Ã lÍc danh sách ng°Ýi nh­n"
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />

            {/* Add Filter Button */}
            {filters.length === 0 && (
              <Button type="dashed" block icon={<FilterOutlined />} onClick={handleAddFilter}>
                Thêm iÁu kiÇn lÍc
              </Button>
            )}

            {/* Filter Conditions */}
            {filters.map((filter, index) => (
              <Card
                key={index}
                size="small"
                className="filter-condition"
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
                    onChange={(value) => handleFilterChange(index, 'field', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="class">LÛp hÍc</Option>
                    <Option value="segment">Phân lo¡i</Option>
                    <Option value="paid">Tr¡ng thái thanh toán</Option>
                    <Option value="points">iÃm tích liy</Option>
                  </Select>

                  <Select
                    value={filter.operator}
                    onChange={(value) => handleFilterChange(index, 'operator', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="equals">B±ng</Option>
                    <Option value="contains">Chéa</Option>
                    <Option value="greater">LÛn h¡n</Option>
                    <Option value="less">NhÏ h¡n</Option>
                  </Select>

                  {filter.field === 'class' ? (
                    <Select
                      value={filter.value}
                      onChange={(value) => handleFilterChange(index, 'value', value)}
                      placeholder="ChÍn lÛp"
                      style={{ width: '100%' }}
                    >
                      {classes.map((c) => (
                        <Option key={c.id} value={c.id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      value={filter.value}
                      onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
                      placeholder="Nh­p giá trË"
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
                + Thêm iÁu kiÇn
              </Button>
            )}

            <Divider />

            {/* Recipient Count */}
            <div className="recipient-count">
              <Space>
                <UserOutlined style={{ fontSize: 20, color: '#0066CC' }} />
                <div>
                  <Text strong style={{ fontSize: 24, color: '#0066CC' }}>
                    {recipientCount}
                  </Text>
                  <br />
                  <Text type="secondary">ng°Ýi nh­n</Text>
                </div>
              </Space>
            </div>

            {/* Anti-spam Warning */}
            {recipientCount > 100 && (
              <Alert
                message="C£nh báo sÑ l°ãng lÛn"
                description="SÑ l°ãng ng°Ýi nh­n v°ãt quá 100. Ã tránh spam, vui lòng chia nhÏ danh sách ho·c lên lËch gíi."
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
        title="Xem tr°Ûc tin nh¯n"
        open={showPreview}
        onCancel={() => setShowPreview(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowPreview(false)}>
            óng
          </Button>,
          <Button key="send" type="primary" icon={<SendOutlined />} onClick={handleSend}>
            {scheduledDate && scheduledTime ? 'Lên lËch gíi' : 'Gíi ngay'}
          </Button>,
        ]}
        width={700}
      >
        <div className="preview-content">
          {/* Preview Info */}
          <div className="preview-info">
            <Space wrap>
              <Tag color="blue" icon={<UserOutlined />}>
                {recipientCount} ng°Ýi nh­n
              </Tag>
              {scheduledDate && scheduledTime && (
                <Tag color="green" icon={<ClockCircleOutlined />}>
                  Lên lËch: {scheduledDate.format('DD/MM/YYYY')} {scheduledTime.format('HH:mm')}
                </Tag>
              )}
              {attachments.length > 0 && (
                <Tag color="orange" icon={<PaperClipOutlined />}>
                  {attachments.length} file ính kèm
                </Tag>
              )}
            </Space>
          </div>

          <Divider />

          {/* Preview Message */}
          <div className="preview-message">
            <Text strong>NÙi dung:</Text>
            <div className="preview-text">{messageContent}</div>
          </div>

          {/* Preview Attachments */}
          {attachments.length > 0 && (
            <>
              <Divider />
              <div className="preview-attachments">
                <Text strong>File ính kèm:</Text>
                <List
                  dataSource={attachments}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={getAttachmentIcon(item.type)}
                        title={item.name}
                        description={formatFileSize(item.size)}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MessageComposer;
