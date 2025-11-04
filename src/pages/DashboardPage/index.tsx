/**
 * Dashboard Trợ giảng - Tổng quan
 * AnhHuy EduConnect V1 - AI Teaching Assistant Platform
 *
 * Based on: Webapp-Tro-Giang-UI-UX-Design-Spec.pdf (Page 4-6)
 * Priority: P0 (Must Have)
 */

import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Typography, Button, Space, List, Spin, Alert } from 'antd';
import {
  BookOutlined,
  TeamOutlined,
  MessageOutlined,
  BulbOutlined,
  RobotOutlined,
  SendOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { mockDataService, type MockDashboard } from '@/services/mockData.service';
import './DashboardPage.css';

const { Title, Text } = Typography;

interface Activity {
  id: string;
  icon: string;
  message: string;
  time: string;
}

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<MockDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockDataService.getDashboard();
      setDashboardData(data);
    } catch (err: any) {
      setError(err?.message || 'Không thể tải dữ liệu dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <Alert
          message="Lỗi tải dữ liệu"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard-error">
        <Alert message="Không có dữ liệu" type="warning" showIcon />
      </div>
    );
  }

  // Mock data for activities
  const recentActivities: Activity[] = [
    {
      id: '1',
      icon: '✉️',
      message: 'Cô Hoa đã gửi tin nhắn đến lớp 5A',
      time: '10 phút trước',
    },
    {
      id: '2',
      icon: '📚',
      message: '15 phụ huynh hoàn thành khóa học "Nuôi dạy con"',
      time: '1 giờ trước',
    },
    {
      id: '3',
      icon: '📝',
      message: 'Giáo án Toán lớp 6 đã được tạo',
      time: '2 giờ trước',
    },
  ];

  return (
    <div className="ta-dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <Title level={2}>Dashboard Trợ giảng</Title>
        <Text type="secondary">Chào mừng, Cô Lan</Text>
      </div>

      {/* Statistics Cards - 4 cards in row */}
      <Row gutter={[16, 16]} className="dashboard-stats-row">
        {/* Card 1: Tổng lớp */}
        <Col xs={24} sm={12} lg={6}>
          <Card className="ta-stat-card stat-card-primary" bordered={false}>
            <div className="stat-icon-wrapper">
              <div className="stat-icon stat-icon-blue">
                <BookOutlined style={{ fontSize: 24, color: '#0066CC' }} />
              </div>
            </div>
            <Statistic
              value={dashboardData.kpis.totalClasses || 8}
              valueStyle={{ fontSize: 28, fontWeight: 700, color: '#212529' }}
            />
            <div className="stat-label">Tổng lớp học</div>
          </Card>
        </Col>

        {/* Card 2: Học sinh */}
        <Col xs={24} sm={12} lg={6}>
          <Card className="ta-stat-card stat-card-success" bordered={false}>
            <div className="stat-icon-wrapper">
              <div className="stat-icon stat-icon-green">
                <TeamOutlined style={{ fontSize: 24, color: '#28A745' }} />
              </div>
            </div>
            <Statistic
              value={dashboardData.kpis.totalStudents || 240}
              valueStyle={{ fontSize: 28, fontWeight: 700, color: '#212529' }}
            />
            <div className="stat-label">Tổng học sinh</div>
          </Card>
        </Col>

        {/* Card 3: Tin nhắn mới */}
        <Col xs={24} sm={12} lg={6}>
          <Card className="ta-stat-card stat-card-warning" bordered={false}>
            <div className="stat-icon-wrapper">
              <div className="stat-icon stat-icon-orange">
                <MessageOutlined style={{ fontSize: 24, color: '#FFC107' }} />
              </div>
            </div>
            <Statistic
              value={dashboardData.kpis.unreadMessages || 15}
              valueStyle={{ fontSize: 28, fontWeight: 700, color: '#212529' }}
            />
            <div className="stat-label">Tin nhắn mới</div>
          </Card>
        </Col>

        {/* Card 4: Gợi ý AI */}
        <Col xs={24} sm={12} lg={6}>
          <Card className="ta-stat-card stat-card-teal" bordered={false}>
            <div className="stat-icon-wrapper">
              <div className="stat-icon stat-icon-teal">
                <BulbOutlined style={{ fontSize: 24, color: '#4ECDC4' }} />
              </div>
            </div>
            <Statistic
              value={3}
              valueStyle={{ fontSize: 28, fontWeight: 700, color: '#212529' }}
            />
            <div className="stat-label">Gợi ý AI mới</div>
          </Card>
        </Col>
      </Row>

      {/* AI Features Section */}
      <div className="dashboard-ai-section">
        <Title level={3} className="section-title">Tính năng AI</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card
              className="ai-feature-card ai-card-teal"
              bordered={false}
              hoverable
            >
              <div className="ai-card-content">
                <div className="ai-icon">
                  <RobotOutlined style={{ fontSize: 48 }} />
                </div>
                <div className="ai-text">
                  <Title level={4} style={{ color: 'white', margin: 0 }}>
                    Tạo giáo án bằng AI
                  </Title>
                  <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Tiết kiệm thời gian chuẩn bị
                  </Text>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              className="ai-feature-card ai-card-blue"
              bordered={false}
              hoverable
            >
              <div className="ai-card-content">
                <div className="ai-icon">
                  <SendOutlined style={{ fontSize: 48 }} />
                </div>
                <div className="ai-text">
                  <Title level={4} style={{ color: 'white', margin: 0 }}>
                    Gợi ý tin nhắn thông minh
                  </Title>
                  <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
                    AI hỗ trợ giao tiếp
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Recent Activities */}
      <div className="dashboard-activities-section">
        <Title level={3} className="section-title">Hoạt động gần đây</Title>
        <Card bordered={false} className="activities-card">
          <List
            dataSource={recentActivities}
            renderItem={(activity) => (
              <List.Item className="activity-item">
                <div className="activity-content">
                  <span className="activity-icon">{activity.icon}</span>
                  <Space direction="vertical" size={0} style={{ flex: 1 }}>
                    <Text>{activity.message}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      <ClockCircleOutlined /> {activity.time}
                    </Text>
                  </Space>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
