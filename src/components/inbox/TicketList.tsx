import React from 'react';
import { List, Tag, Space, Input, Select, Badge, Empty } from 'antd';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import type { Ticket, TicketStatus, TicketPriority, TicketCategory } from '@/types/inbox.types';
import './TicketList.css';

const { Search } = Input;
const { Option } = Select;

interface TicketListProps {
  tickets: Ticket[];
  loading?: boolean;
  onTicketClick: (ticket: Ticket) => void;
  onSearch?: (term: string) => void;
  onFilterChange?: (filters: { status?: TicketStatus; priority?: TicketPriority; category?: TicketCategory }) => void;
}

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  loading = false,
  onTicketClick,
  onSearch,
  onFilterChange,
}) => {
  const getStatusIcon = (status: TicketStatus) => {
    switch (status) {
      case 'new':
        return <ExclamationCircleOutlined style={{ color: '#1890ff' }} />;
      case 'in_progress':
        return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      case 'resolved':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'closed':
        return <CloseCircleOutlined style={{ color: '#8c8c8c' }} />;
      default:
        return null;
    }
  };

  const getStatusTag = (status: TicketStatus) => {
    const statusConfig = {
      new: { color: 'blue', text: 'Mới' },
      in_progress: { color: 'orange', text: 'Đang xử lý' },
      resolved: { color: 'green', text: 'Đã giải quyết' },
      closed: { color: 'default', text: 'Đã đóng' },
    };
    const config = statusConfig[status];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getPriorityTag = (priority: TicketPriority) => {
    const priorityConfig = {
      low: { color: 'default', text: 'Thấp' },
      medium: { color: 'orange', text: 'Trung bình' },
      high: { color: 'red', text: 'Cao' },
      urgent: { color: 'magenta', text: 'Khẩn cấp' },
    };
    const config = priorityConfig[priority];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getCategoryIcon = (category: TicketCategory) => {
    const categoryMap: Record<TicketCategory, string> = {
      schedule: '📅',
      grade: '📊',
      feedback: '💬',
      technical: '🔧',
      payment: '💰',
      other: '📝',
    };
    return categoryMap[category];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `${diffMins} phút trước`;
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else if (diffDays < 7) {
      return `${diffDays} ngày trước`;
    } else {
      return date.toLocaleDateString('vi-VN');
    }
  };

  return (
    <div className="ticket-list-container">
      {/* Filters */}
      <div className="ticket-list-filters">
        <Search
          placeholder="Tìm kiếm ticket..."
          prefix={<SearchOutlined />}
          onSearch={onSearch}
          allowClear
          size="large"
          className="ticket-search"
        />

        <Space className="ticket-filters">
          <Select
            placeholder="Trạng thái"
            allowClear
            size="large"
            style={{ width: 150 }}
            onChange={(value) => onFilterChange?.({ status: value })}
            suffixIcon={<FilterOutlined />}
          >
            <Option value="new">Mới</Option>
            <Option value="in_progress">Đang xử lý</Option>
            <Option value="resolved">Đã giải quyết</Option>
            <Option value="closed">Đã đóng</Option>
          </Select>

          <Select
            placeholder="Ưu tiên"
            allowClear
            size="large"
            style={{ width: 140 }}
            onChange={(value) => onFilterChange?.({ priority: value })}
            suffixIcon={<FilterOutlined />}
          >
            <Option value="urgent">Khẩn cấp</Option>
            <Option value="high">Cao</Option>
            <Option value="medium">Trung bình</Option>
            <Option value="low">Thấp</Option>
          </Select>

          <Select
            placeholder="Danh mục"
            allowClear
            size="large"
            style={{ width: 140 }}
            onChange={(value) => onFilterChange?.({ category: value })}
            suffixIcon={<FilterOutlined />}
          >
            <Option value="schedule">Lịch học</Option>
            <Option value="grade">Điểm số</Option>
            <Option value="feedback">Phản hồi</Option>
            <Option value="technical">Kỹ thuật</Option>
            <Option value="payment">Thanh toán</Option>
            <Option value="other">Khác</Option>
          </Select>
        </Space>
      </div>

      {/* Ticket List */}
      <List
        className="ticket-list"
        loading={loading}
        dataSource={tickets}
        locale={{
          emptyText: (
            <Empty
              description="Không có ticket nào"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
        renderItem={(ticket) => (
          <List.Item
            className="ticket-list-item"
            onClick={() => onTicketClick(ticket)}
          >
            <div className="ticket-item-content">
              <div className="ticket-item-header">
                <Space>
                  {getStatusIcon(ticket.status)}
                  <span className="ticket-category-icon">
                    {getCategoryIcon(ticket.category)}
                  </span>
                  <strong className="ticket-subject">{ticket.subject}</strong>
                </Space>
                <Space>
                  {getPriorityTag(ticket.priority)}
                  {getStatusTag(ticket.status)}
                </Space>
              </div>

              <div className="ticket-item-body">
                <p className="ticket-content">{ticket.content}</p>
              </div>

              <div className="ticket-item-footer">
                <Space size="large">
                  <span className="ticket-from">
                    👤 {ticket.from}
                  </span>
                  <span className="ticket-time">
                    🕒 {formatDate(ticket.createdAt)}
                  </span>
                  {ticket.assignedTo && (
                    <span className="ticket-assigned">
                      👨‍💼 Assigned to: {ticket.assignedTo}
                    </span>
                  )}
                  {ticket.tags && ticket.tags.length > 0 && (
                    <Space size={4}>
                      {ticket.tags.slice(0, 3).map((tag) => (
                        <Tag key={tag} className="ticket-tag">
                          {tag}
                        </Tag>
                      ))}
                    </Space>
                  )}
                </Space>
                {ticket.dueDate && (
                  <Badge
                    status={
                      new Date(ticket.dueDate) < new Date() ? 'error' : 'processing'
                    }
                    text={`Due: ${formatDate(ticket.dueDate)}`}
                  />
                )}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TicketList;
