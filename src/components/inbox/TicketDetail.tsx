import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Descriptions,
  Tag,
  Button,
  Space,
  Form,
  Input,
  Select,
  message,
  Timeline,
  Card,
  Divider,
  Alert,
  Progress,
  Spin,
} from 'antd';
import {
  SendOutlined,
  CloseOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { Ticket, TicketReply, CannedResponse, TicketSLA } from '@/types/inbox.types';
import inboxService from '@/services/inbox.service';
import './TicketDetail.css';

const { TextArea } = Input;
const { Option } = Select;

interface TicketDetailProps {
  ticket: Ticket | null;
  open: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, open, onClose, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [replies, setReplies] = useState<TicketReply[]>([]);
  const [cannedResponses, setCannedResponses] = useState<CannedResponse[]>([]);
  const [sla, setSla] = useState<TicketSLA | null>(null);

  useEffect(() => {
    if (ticket && open) {
      loadTicketData();
    }
  }, [ticket, open]);

  const loadTicketData = async () => {
    if (!ticket) return;

    try {
      setRepliesLoading(true);
      const [repliesData, cannedData, slaData] = await Promise.all([
        inboxService.getTicketReplies(ticket.id),
        inboxService.getCannedResponses(),
        inboxService.getTicketSLA(ticket.id),
      ]);

      setReplies(repliesData);
      setCannedResponses(cannedData);
      setSla(slaData);
    } catch (error) {
      message.error('Không thể tải dữ liệu ticket');
    } finally {
      setRepliesLoading(false);
    }
  };

  const handleReply = async (values: { content: string }) => {
    if (!ticket) return;

    try {
      setLoading(true);
      await inboxService.replyToTicket({
        ticketId: ticket.id,
        content: values.content,
      });

      message.success('Gửi phản hồi thành công');
      form.resetFields();
      await loadTicketData();
      onUpdate?.();
    } catch (error) {
      message.error('Gửi phản hồi thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (assignTo: string) => {
    if (!ticket) return;

    try {
      await inboxService.assignTicket({
        ticketId: ticket.id,
        assignTo,
      });

      message.success(`Đã chuyển ticket cho ${assignTo}`);
      onUpdate?.();
    } catch (error) {
      message.error('Chuyển ticket thất bại');
    }
  };

  const handleClose = async () => {
    if (!ticket) return;

    try {
      await inboxService.closeTicket({
        ticketId: ticket.id,
        resolution: 'Đã xử lý xong',
      });

      message.success('Đã đóng ticket');
      onUpdate?.();
      onClose();
    } catch (error) {
      message.error('Đóng ticket thất bại');
    }
  };

  const handleCannedResponseSelect = (responseId: string) => {
    const response = cannedResponses.find((r) => r.id === responseId);
    if (response) {
      form.setFieldsValue({ content: response.content });
    }
  };

  const getStatusTag = (status: string) => {
    const statusConfig = {
      new: { color: 'blue', text: 'Mới' },
      in_progress: { color: 'orange', text: 'Đang xử lý' },
      resolved: { color: 'green', text: 'Đã giải quyết' },
      closed: { color: 'default', text: 'Đã đóng' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getPriorityTag = (priority: string) => {
    const priorityConfig = {
      low: { color: 'default', text: 'Thấp' },
      medium: { color: 'orange', text: 'Trung bình' },
      high: { color: 'red', text: 'Cao' },
      urgent: { color: 'magenta', text: 'Khẩn cấp' },
    };
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const getSLAProgress = () => {
    if (!sla) return 0;
    const percentage = (sla.responseTime / sla.targetResponseTime) * 100;
    return Math.min(percentage, 100);
  };

  const getSLAStatus = () => {
    if (!sla) return 'normal';
    if (sla.breached) return 'exception';
    if (sla.responseTime > sla.targetResponseTime * 0.8) return 'active';
    return 'success';
  };

  if (!ticket) return null;

  return (
    <Drawer
      title="Chi tiết Ticket"
      placement="right"
      width={720}
      open={open}
      onClose={onClose}
      className="ticket-detail-drawer"
      extra={
        <Space>
          <Button onClick={onClose} icon={<CloseOutlined />}>
            Đóng
          </Button>
        </Space>
      }
    >
      {/* Ticket Information */}
      <Card className="ticket-info-card">
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Chủ đề">
            <strong>{ticket.subject}</strong>
          </Descriptions.Item>
          <Descriptions.Item label="Người gửi">
            <Space>
              <UserOutlined />
              {ticket.from}
              <Tag>{ticket.fromEmail}</Tag>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">{getStatusTag(ticket.status)}</Descriptions.Item>
          <Descriptions.Item label="Ưu tiên">{getPriorityTag(ticket.priority)}</Descriptions.Item>
          <Descriptions.Item label="Danh mục">
            <Tag color="blue">{ticket.category}</Tag>
          </Descriptions.Item>
          {ticket.assignedTo && (
            <Descriptions.Item label="Được giao cho">
              <Tag icon={<UserOutlined />} color="cyan">
                {ticket.assignedTo}
              </Tag>
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Ngày tạo">
            <Space>
              <ClockCircleOutlined />
              {formatDate(ticket.createdAt)}
            </Space>
          </Descriptions.Item>
          {ticket.dueDate && (
            <Descriptions.Item label="Hạn xử lý">
              <Tag color={new Date(ticket.dueDate) < new Date() ? 'red' : 'green'}>
                {formatDate(ticket.dueDate)}
              </Tag>
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>

      {/* SLA Tracking */}
      {sla && (
        <Card className="sla-card" title="SLA Tracking">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <span>Thời gian phản hồi: </span>
              <strong>
                {Math.floor(sla.responseTime)} phút / {sla.targetResponseTime} phút
              </strong>
            </div>
            <Progress
              percent={getSLAProgress()}
              status={getSLAStatus()}
              strokeColor={sla.breached ? '#ff4d4f' : '#52c41a'}
            />
            {sla.breached && (
              <Alert
                message="SLA Breach!"
                description="Ticket này đã vượt quá thời gian phản hồi mục tiêu."
                type="error"
                showIcon
              />
            )}
          </Space>
        </Card>
      )}

      {/* Original Message */}
      <Card className="ticket-content-card" title="Nội dung ban đầu">
        <Alert message={ticket.content} type="info" showIcon />
        {ticket.tags && ticket.tags.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <strong>Tags: </strong>
            {ticket.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </Card>

      {/* Reply History */}
      <Card className="replies-card" title={`Lịch sử phản hồi (${replies.length})`}>
        {repliesLoading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Spin />
          </div>
        ) : replies.length > 0 ? (
          <Timeline>
            {replies.map((reply) => (
              <Timeline.Item
                key={reply.id}
                dot={reply.isStaff ? <CheckCircleOutlined /> : <UserOutlined />}
                color={reply.isStaff ? 'green' : 'blue'}
              >
                <div className="reply-item">
                  <div className="reply-header">
                    <Space>
                      <strong>{reply.from}</strong>
                      {reply.isStaff && <Tag color="green">Staff</Tag>}
                    </Space>
                    <span className="reply-time">{formatDate(reply.createdAt)}</span>
                  </div>
                  <div className="reply-content">{reply.content}</div>
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        ) : (
          <Alert message="Chưa có phản hồi nào" type="info" showIcon />
        )}
      </Card>

      <Divider />

      {/* Reply Form */}
      <Card className="reply-form-card" title="Gửi phản hồi">
        <Form form={form} layout="vertical" onFinish={handleReply}>
          <Form.Item label="Chọn phản hồi nhanh (tùy chọn)">
            <Select
              placeholder="Chọn phản hồi mẫu..."
              onChange={handleCannedResponseSelect}
              allowClear
            >
              {cannedResponses.map((response) => (
                <Option key={response.id} value={response.id}>
                  {response.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung phản hồi"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung phản hồi' }]}
          >
            <TextArea
              rows={6}
              placeholder="Nhập nội dung phản hồi..."
              showCount
              maxLength={2000}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SendOutlined />}
                loading={loading}
              >
                Gửi phản hồi
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* Actions */}
      <Card className="actions-card" title="Thao tác">
        <Space wrap>
          <Select
            placeholder="Chuyển cho..."
            style={{ width: 200 }}
            onChange={handleAssign}
          >
            <Option value="admin">Admin</Option>
            <Option value="teacher">Giáo viên</Option>
            <Option value="support">Hỗ trợ kỹ thuật</Option>
          </Select>

          {ticket.status !== 'closed' && (
            <Button onClick={handleClose} danger>
              Đóng Ticket
            </Button>
          )}
        </Space>
      </Card>
    </Drawer>
  );
};

export default TicketDetail;
