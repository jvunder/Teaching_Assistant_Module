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
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<MockDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
      setError(err?.message || t('common.loadError'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Spin size="large" tip={t('common.loading')} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <Alert
          message={t('common.loadError')}
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
        <Alert message={t('common.noData')} type="warning" showIcon />
      </div>
    );
  }

  // Activities using i18n translations
  const recentActivities: Activity[] = [
    {
      id: '1',
      icon: '✉️',
      message: t('dashboard.activities.message1'),
      time: t('dashboard.time.minutes_ago', { count: 10 }),
    },
    {
      id: '2',
      icon: '📚',
      message: t('dashboard.activities.message2'),
      time: t('dashboard.time.hours_ago', { count: 1 }),
    },
    {
      id: '3',
      icon: '📝',
      message: t('dashboard.activities.message3'),
      time: t('dashboard.time.hours_ago', { count: 2 }),
    },
  ];

  return (
    <div className="ta-dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <Title level={2}>{t('dashboard.title')}</Title>
        <Text type="secondary">{t('dashboard.welcome', { name: 'Cô Lan' })}</Text>
      </div>

      {/* Statistics Cards - 4 cards in row */}
      <Row gutter={[16, 16]} className="dashboard-stats-row">
        {/* Card 1: Tổng lớp */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            className="ta-stat-card stat-card-primary"
            bordered={false}
            onMouseEnter={() => setHoveredCard('classes')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="stat-icon-wrapper">
              <div className="stat-icon stat-icon-blue">
                <BookOutlined style={{ fontSize: 24, color: 'white' }} />
              </div>
            </div>
            <Statistic
              value={dashboardData.kpis.totalClasses || 8}
              valueStyle={{
                fontSize: 32,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            />
            <div className="stat-label">{t('dashboard.stats.totalClasses')}</div>
          </Card>
        </Col>

        {/* Card 2: Học sinh */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            className="ta-stat-card stat-card-success"
            bordered={false}
            onMouseEnter={() => setHoveredCard('students')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="stat-icon-wrapper">
              <div className="stat-icon stat-icon-green">
                <TeamOutlined style={{ fontSize: 24, color: 'white' }} />
              </div>
            </div>
            <Statistic
              value={dashboardData.kpis.totalStudents || 240}
              valueStyle={{
                fontSize: 32,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #11998e, #38ef7d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            />
            <div className="stat-label">{t('dashboard.stats.totalStudents')}</div>
          </Card>
        </Col>

        {/* Card 3: Tin nhắn mới */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            className="ta-stat-card stat-card-warning"
            bordered={false}
            onMouseEnter={() => setHoveredCard('messages')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="stat-icon-wrapper">
              <div className="stat-icon stat-icon-orange">
                <MessageOutlined style={{ fontSize: 24, color: 'white' }} />
              </div>
            </div>
            <Statistic
              value={dashboardData.kpis.unreadMessages || 15}
              valueStyle={{
                fontSize: 32,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            />
            <div className="stat-label">{t('dashboard.stats.newMessages')}</div>
          </Card>
        </Col>

        {/* Card 4: Thông báo mới */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            className="ta-stat-card stat-card-teal"
            bordered={false}
            onMouseEnter={() => setHoveredCard('notifications')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="stat-icon-wrapper">
              <div className="stat-icon stat-icon-teal">
                <BulbOutlined style={{ fontSize: 24, color: 'white' }} />
              </div>
            </div>
            <Statistic
              value={5}
              valueStyle={{
                fontSize: 32,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            />
            <div className="stat-label">{t('dashboard.stats.notifications')}</div>
          </Card>
        </Col>
      </Row>


      {/* Recent Activities */}
      <div className="dashboard-activities-section">
        <Title level={3} className="section-title">{t('dashboard.recentActivities')}</Title>
        <Card bordered={false} className="activities-card">
          <List
            dataSource={recentActivities}
            renderItem={(activity) => (
              <List.Item className="activity-item">
                <div className="activity-content">
                  <span className="activity-icon">{activity.icon}</span>
                  <div className="activity-text">
                    <Text style={{ display: 'block' }}>{activity.message}</Text>
                    <Text type="secondary" className="activity-time">
                      <ClockCircleOutlined style={{ marginRight: 4 }} />
                      {activity.time}
                    </Text>
                  </div>
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
