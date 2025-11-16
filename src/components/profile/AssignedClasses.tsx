import React from 'react';
import { List, Card, Tag, Empty, Badge, Space } from 'antd';
import {
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { AssignedClass } from '@/types/ta.types';
import './AssignedClasses.css';

interface AssignedClassesProps {
  classes: AssignedClass[];
  loading?: boolean;
}

const AssignedClasses: React.FC<AssignedClassesProps> = ({ classes, loading = false }) => {
  const getStatusBadge = (status: AssignedClass['status']) => {
    const statusConfig = {
      active: { status: 'processing' as const, text: 'Đang dạy' },
      completed: { status: 'success' as const, text: 'Đã kết thúc' },
      upcoming: { status: 'default' as const, text: 'Sắp bắt đầu' },
    };
    const config = statusConfig[status];
    return <Badge status={config.status} text={config.text} />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="assigned-classes">
      <List
        loading={loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={classes}
        locale={{
          emptyText: (
            <Empty
              description="Chưa có lớp học nào được giao"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
        renderItem={(classItem) => (
          <List.Item>
            <Card
              className={`class-card class-card-${classItem.status}`}
              hoverable
              title={
                <Space>
                  <BookOutlined />
                  <span>{classItem.className}</span>
                </Space>
              }
              extra={getStatusBadge(classItem.status)}
            >
              <div className="class-info">
                <div className="class-info-item">
                  <Tag color="blue">{classItem.grade}</Tag>
                  <Tag color="green">{classItem.subject}</Tag>
                </div>

                <div className="class-info-item">
                  <TeamOutlined />
                  <span>
                    {classItem.studentCount} học sinh
                  </span>
                </div>

                <div className="class-info-item">
                  <UserOutlined />
                  <span>
                    {classItem.parentCount} phụ huynh
                  </span>
                </div>

                <div className="class-info-item">
                  <ClockCircleOutlined />
                  <span>{classItem.schedule}</span>
                </div>

                <div className="class-info-item">
                  <CalendarOutlined />
                  <span>
                    Từ {formatDate(classItem.startDate)}
                    {classItem.endDate && ` đến ${formatDate(classItem.endDate)}`}
                  </span>
                </div>

                {classItem.status === 'completed' && (
                  <div className="class-completed-badge">
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    <span style={{ color: '#52c41a', marginLeft: 8 }}>
                      Hoàn thành
                    </span>
                  </div>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default AssignedClasses;
