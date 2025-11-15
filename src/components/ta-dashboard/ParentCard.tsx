import React from 'react';
import {
  Card,
  Avatar,
  Space,
  Typography,
  Badge,
  Tag,
  Button,
  Progress,
  Tooltip,
  Divider,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  MessageOutlined,
  EyeOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import './ParentCard.css';

const { Text } = Typography;

// Parent Interface
export interface Parent {
  id: string;
  name: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  segment?: 'not-started' | 'slow-progress' | 'top-performers' | 'active';
  learningProgress?: number; // 0-100
  coursesEnrolled?: number;
  coursesCompleted?: number;
  lastActive?: string;
  nextLesson?: string;
  children?: Array<{
    id: string;
    name: string;
    age?: number;
  }>;
}

// ParentDetail extends Parent with more details
export interface ParentDetail extends Parent {
  totalMessages?: number;
  unreadMessages?: number;
  joinedDate?: string;
  totalHours?: number;
  certificates?: number;
}

// Props Interface
export interface ParentCardProps {
  parent: Parent | ParentDetail;
  onClick?: () => void;
  showActions?: boolean;
  onMessageClick?: (parent: Parent | ParentDetail) => void;
  onViewClick?: (parent: Parent | ParentDetail) => void;
  compact?: boolean;
}

const ParentCard: React.FC<ParentCardProps> = ({
  parent,
  onClick,
  showActions = true,
  onMessageClick,
  onViewClick,
  compact = false,
}) => {
  // Get segment badge configuration
  const getSegmentBadge = (segment?: Parent['segment']) => {
    if (!segment) return null;

    const segmentConfig = {
      'not-started': {
        color: 'red',
        icon: '=4',
        text: 'Ch°a b¯t §u',
        status: 'error' as const,
      },
      'slow-progress': {
        color: 'orange',
        icon: '=á',
        text: 'Ti¿n Ù ch­m',
        status: 'warning' as const,
      },
      'top-performers': {
        color: 'green',
        icon: '=â',
        text: 'Xu¥t s¯c',
        status: 'success' as const,
      },
      'active': {
        color: 'blue',
        icon: '=5',
        text: 'ang hÍc',
        status: 'processing' as const,
      },
    };

    const config = segmentConfig[segment];
    return (
      <Badge
        status={config.status}
        text={
          <Tag color={config.color} icon={<span>{config.icon}</span>}>
            {config.text}
          </Tag>
        }
      />
    );
  };

  // Get progress status
  const getProgressStatus = (progress: number) => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'normal';
    if (progress >= 20) return 'active';
    return 'exception';
  };

  // Format last active time
  const formatLastActive = (lastActive?: string) => {
    if (!lastActive) return 'Ch°a rõ';

    const date = new Date(lastActive);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Vëa xong';
    if (diffMins < 60) return `${diffMins} phút tr°Ûc`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} giÝ tr°Ûc`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} ngày tr°Ûc`;

    return date.toLocaleDateString('vi-VN');
  };

  // Render compact card
  if (compact) {
    return (
      <Card
        className="parent-card compact"
        hoverable={!!onClick}
        onClick={onClick}
      >
        <div className="compact-content">
          <Avatar
            src={parent.avatarUrl}
            icon={<UserOutlined />}
            size={48}
          />
          <div className="compact-info">
            <Text strong>{parent.name}</Text>
            {parent.segment && getSegmentBadge(parent.segment)}
            {parent.learningProgress !== undefined && (
              <Progress
                percent={parent.learningProgress}
                size="small"
                status={getProgressStatus(parent.learningProgress)}
              />
            )}
          </div>
        </div>
      </Card>
    );
  }

  // Render full card
  return (
    <Card
      className="parent-card"
      hoverable={!!onClick}
      onClick={onClick}
    >
      {/* Header with Avatar and Basic Info */}
      <div className="card-header">
        <Space size={12}>
          <Avatar
            src={parent.avatarUrl}
            icon={<UserOutlined />}
            size={64}
            className="parent-avatar"
          />
          <div className="parent-basic-info">
            <Text strong className="parent-name">
              {parent.name}
            </Text>
            {parent.segment && (
              <div className="segment-badge">
                {getSegmentBadge(parent.segment)}
              </div>
            )}
            {parent.lastActive && (
              <Text type="secondary" className="last-active">
                <ClockCircleOutlined /> Ho¡t Ùng {formatLastActive(parent.lastActive)}
              </Text>
            )}
          </div>
        </Space>
      </div>

      <Divider style={{ margin: '12px 0' }} />

      {/* Contact Information */}
      <div className="contact-info">
        {parent.email && (
          <Tooltip title="Email">
            <div className="info-item">
              <MailOutlined className="info-icon" />
              <Text className="info-text">{parent.email}</Text>
            </div>
          </Tooltip>
        )}
        {parent.phone && (
          <Tooltip title="SÑ iÇn tho¡i">
            <div className="info-item">
              <PhoneOutlined className="info-icon" />
              <Text className="info-text">{parent.phone}</Text>
            </div>
          </Tooltip>
        )}
      </div>

      {/* Learning Progress */}
      {parent.learningProgress !== undefined && (
        <>
          <Divider style={{ margin: '12px 0' }} />
          <div className="learning-progress">
            <div className="progress-header">
              <Text strong>Ti¿n Ù hÍc t­p</Text>
              <Text type="secondary">{parent.learningProgress}%</Text>
            </div>
            <Progress
              percent={parent.learningProgress}
              status={getProgressStatus(parent.learningProgress)}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
            <Space className="progress-stats" size={16}>
              {parent.coursesEnrolled !== undefined && (
                <Tooltip title="Khóa hÍc ã ng ký">
                  <Text type="secondary">
                    =Ú {parent.coursesEnrolled} khóa hÍc
                  </Text>
                </Tooltip>
              )}
              {parent.coursesCompleted !== undefined && (
                <Tooltip title="Khóa hÍc ã hoàn thành">
                  <Text type="success">
                    <TrophyOutlined /> {parent.coursesCompleted} hoàn thành
                  </Text>
                </Tooltip>
              )}
            </Space>
          </div>
        </>
      )}

      {/* Children Info */}
      {parent.children && parent.children.length > 0 && (
        <>
          <Divider style={{ margin: '12px 0' }} />
          <div className="children-info">
            <Text strong>Con em:</Text>
            <div className="children-list">
              {parent.children.map((child) => (
                <Tag key={child.id} color="blue">
                  {child.name} {child.age && `(${child.age} tuÕi)`}
                </Tag>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Additional Info for ParentDetail */}
      {'totalMessages' in parent && parent.totalMessages !== undefined && (
        <>
          <Divider style={{ margin: '12px 0' }} />
          <div className="additional-stats">
            <Space wrap size={8}>
              <Tag icon={<MessageOutlined />}>
                {parent.totalMessages} tin nh¯n
              </Tag>
              {parent.unreadMessages && parent.unreadMessages > 0 && (
                <Badge count={parent.unreadMessages} showZero={false}>
                  <Tag color="red">Ch°a Íc</Tag>
                </Badge>
              )}
              {parent.totalHours !== undefined && (
                <Tag icon={<ClockCircleOutlined />}>
                  {parent.totalHours}h hÍc t­p
                </Tag>
              )}
              {parent.certificates !== undefined && (
                <Tag color="gold" icon={<TrophyOutlined />}>
                  {parent.certificates} chéng chÉ
                </Tag>
              )}
            </Space>
          </div>
        </>
      )}

      {/* Quick Actions */}
      {showActions && (
        <>
          <Divider style={{ margin: '12px 0' }} />
          <Space className="card-actions" size={8}>
            <Button
              type="primary"
              icon={<MessageOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onMessageClick && onMessageClick(parent);
              }}
              size="small"
            >
              Nh¯n tin
            </Button>
            <Button
              icon={<EyeOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onViewClick && onViewClick(parent);
              }}
              size="small"
            >
              Xem chi ti¿t
            </Button>
          </Space>
        </>
      )}
    </Card>
  );
};

export default ParentCard;
