import React, { useState, useMemo } from 'react';
import {
  List,
  Card,
  Tag,
  Input,
  Select,
  Space,
  Badge,
  Avatar,
  Typography,
  Empty,
  Tooltip,
  Button,
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  MessageOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import './MessagePanel.css';

const { Text } = Typography;
const { Option } = Select;

// Message Interface
export interface Message {
  id: string;
  subject?: string;
  content: string;
  from: string;
  fromAvatar?: string;
  to: string[];
  type: 'text' | 'image' | 'video' | 'notification';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  sentAt: string;
  category?: 'general' | 'homework' | 'attendance' | 'grade' | 'announcement';
  isUnread?: boolean;
  preview?: string;
}

// Props Interface
export interface MessagePanelProps {
  messages: Message[];
  onSelectMessage?: (message: Message) => void;
  loading?: boolean;
  showActions?: boolean;
}

const MessagePanel: React.FC<MessagePanelProps> = ({
  messages,
  onSelectMessage,
  loading = false,
  showActions = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Filter and search messages
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (msg.subject && msg.subject.toLowerCase().includes(searchQuery.toLowerCase()));

      // Status filter
      const matchesStatus = statusFilter === 'all' || msg.status === statusFilter;

      // Type filter
      const matchesType = typeFilter === 'all' || msg.type === typeFilter;

      // Category filter
      const matchesCategory = categoryFilter === 'all' || msg.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesType && matchesCategory;
    });
  }, [messages, searchQuery, statusFilter, typeFilter, categoryFilter]);

  // Get status tag configuration
  const getStatusTag = (status: Message['status']) => {
    const statusConfig = {
      sent: { color: 'blue', icon: <ClockCircleOutlined />, text: 'ã gíi' },
      delivered: { color: 'cyan', icon: <CheckCircleOutlined />, text: 'ã nh­n' },
      read: { color: 'green', icon: <EyeOutlined />, text: 'ã Íc' },
      failed: { color: 'red', icon: <ClockCircleOutlined />, text: 'Th¥t b¡i' },
    };

    const config = statusConfig[status];
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  // Get type tag
  const getTypeTag = (type: Message['type']) => {
    const typeConfig = {
      text: { color: 'default', text: 'Vn b£n' },
      image: { color: 'purple', text: 'Hình £nh' },
      video: { color: 'orange', text: 'Video' },
      notification: { color: 'blue', text: 'Thông báo' },
    };

    const config = typeConfig[type];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  // Get category tag
  const getCategoryTag = (category?: Message['category']) => {
    if (!category) return null;

    const categoryConfig = {
      general: { color: 'default', text: 'Chung' },
      homework: { color: 'blue', text: 'Bài t­p' },
      attendance: { color: 'cyan', text: 'iÃm danh' },
      grade: { color: 'green', text: 'iÃm sÑ' },
      announcement: { color: 'orange', text: 'Thông báo' },
    };

    const config = categoryConfig[category];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Vëa xong';
    if (diffMins < 60) return `${diffMins} phút tr°Ûc`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} giÝ tr°Ûc`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} ngày tr°Ûc`;

    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Truncate content for preview
  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
    setCategoryFilter('all');
  };

  // Count unread messages
  const unreadCount = messages.filter(msg => msg.isUnread).length;

  return (
    <Card
      className="message-panel-card"
      title={
        <Space>
          <MessageOutlined />
          <span>Tin nh¯n</span>
          {unreadCount > 0 && (
            <Badge count={unreadCount} showZero={false} />
          )}
        </Space>
      }
    >
      {/* Filters */}
      <div className="message-filters">
        <Input
          placeholder="Tìm ki¿m tin nh¯n..."
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
          className="search-input"
        />

        <Space wrap className="filter-controls">
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 140 }}
            suffixIcon={<FilterOutlined />}
          >
            <Option value="all">T¥t c£ tr¡ng thái</Option>
            <Option value="sent">ã gíi</Option>
            <Option value="delivered">ã nh­n</Option>
            <Option value="read">ã Íc</Option>
            <Option value="failed">Th¥t b¡i</Option>
          </Select>

          <Select
            value={typeFilter}
            onChange={setTypeFilter}
            style={{ width: 140 }}
            suffixIcon={<FilterOutlined />}
          >
            <Option value="all">T¥t c£ lo¡i</Option>
            <Option value="text">Vn b£n</Option>
            <Option value="image">Hình £nh</Option>
            <Option value="video">Video</Option>
            <Option value="notification">Thông báo</Option>
          </Select>

          <Select
            value={categoryFilter}
            onChange={setCategoryFilter}
            style={{ width: 140 }}
            suffixIcon={<FilterOutlined />}
          >
            <Option value="all">T¥t c£ danh måc</Option>
            <Option value="general">Chung</Option>
            <Option value="homework">Bài t­p</Option>
            <Option value="attendance">iÃm danh</Option>
            <Option value="grade">iÃm sÑ</Option>
            <Option value="announcement">Thông báo</Option>
          </Select>

          {(searchQuery || statusFilter !== 'all' || typeFilter !== 'all' || categoryFilter !== 'all') && (
            <Button size="small" onClick={handleClearFilters}>
              Xóa bÙ lÍc
            </Button>
          )}
        </Space>
      </div>

      {/* Message List */}
      <List
        className="message-list"
        loading={loading}
        dataSource={filteredMessages}
        locale={{
          emptyText: (
            <Empty
              description="Không tìm th¥y tin nh¯n"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
        renderItem={(message) => (
          <List.Item
            key={message.id}
            className={`message-list-item ${message.isUnread ? 'unread' : ''}`}
            onClick={() => onSelectMessage && onSelectMessage(message)}
            style={{ cursor: onSelectMessage ? 'pointer' : 'default' }}
          >
            <List.Item.Meta
              avatar={
                <Badge dot={message.isUnread} offset={[-5, 5]}>
                  <Avatar
                    src={message.fromAvatar}
                    icon={<UserOutlined />}
                    size="large"
                  />
                </Badge>
              }
              title={
                <div className="message-header">
                  <Space size={8} wrap>
                    <Text strong className="message-from">
                      {message.from}
                    </Text>
                    {message.category && getCategoryTag(message.category)}
                    {getTypeTag(message.type)}
                  </Space>
                  <Text type="secondary" className="message-time">
                    {formatTimestamp(message.sentAt)}
                  </Text>
                </div>
              }
              description={
                <div className="message-description">
                  {message.subject && (
                    <Text strong className="message-subject">
                      {message.subject}
                    </Text>
                  )}
                  <Text className="message-preview">
                    {truncateContent(message.preview || message.content)}
                  </Text>
                  <div className="message-meta">
                    <Space size={8}>
                      {getStatusTag(message.status)}
                      <Tooltip title="SÑ ng°Ýi nh­n">
                        <Tag icon={<UserOutlined />}>
                          {message.to.length} ng°Ýi nh­n
                        </Tag>
                      </Tooltip>
                    </Space>
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `TÕng ${total} tin nh¯n`,
          position: 'bottom',
          align: 'center',
        }}
      />
    </Card>
  );
};

export default MessagePanel;
