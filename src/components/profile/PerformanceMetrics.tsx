import React from 'react';
import { Row, Col, Card, Statistic, Progress, Tag, Space, Divider } from 'antd';
import {
  MessageOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  StarOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import type { PerformanceMetrics } from '@/types/ta.types';
import './PerformanceMetrics.css';

interface PerformanceMetricsProps {
  metrics: PerformanceMetrics;
  loading?: boolean;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics, loading = false }) => {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <RiseOutlined style={{ color: '#52c41a' }} />;
    if (trend === 'down') return <FallOutlined style={{ color: '#ff4d4f' }} />;
    return null;
  };

  const formatResponseTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} phút`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}p` : `${hours} giờ`;
  };

  return (
    <div className="performance-metrics">
      {/* Top Statistics */}
      <Row gutter={[16, 16]} className="metrics-row">
        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card metric-messages" loading={loading}>
            <Statistic
              title="Tin nhắn đã gửi"
              value={metrics.messagesCount.total}
              prefix={<MessageOutlined />}
              suffix={
                <Tag color={metrics.messagesCount.growth >= 0 ? 'green' : 'red'}>
                  {metrics.messagesCount.growth >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  {Math.abs(metrics.messagesCount.growth)}%
                </Tag>
              }
            />
            <div className="metric-subtitle">
              Tháng này: <strong>{metrics.messagesCount.thisMonth}</strong>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card metric-tickets" loading={loading}>
            <Statistic
              title="Ticket đã xử lý"
              value={metrics.ticketsResolved.total}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div className="metric-subtitle">
              Tháng này: <strong>{metrics.ticketsResolved.thisMonth}</strong>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div className="metric-detail">
              <span>Thời gian phản hồi TB:</span>
              <strong>{formatResponseTime(metrics.ticketsResolved.averageResponseTime)}</strong>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card metric-classes" loading={loading}>
            <Statistic
              title="Lớp học quản lý"
              value={metrics.classesManaged.active}
              prefix={<TeamOutlined />}
              suffix={`/ ${metrics.classesManaged.total}`}
              valueStyle={{ color: '#0066CC' }}
            />
            <div className="metric-subtitle">
              Đang hoạt động: <strong>{metrics.classesManaged.active} lớp</strong>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card metric-satisfaction" loading={loading}>
            <Statistic
              title="Đánh giá hài lòng"
              value={metrics.satisfactionRate.rating}
              prefix={<StarOutlined />}
              suffix="/ 5.0"
              precision={1}
              valueStyle={{ color: '#faad14' }}
            />
            <div className="metric-subtitle">
              Từ <strong>{metrics.satisfactionRate.totalReviews}</strong> đánh giá
            </div>
          </Card>
        </Col>
      </Row>

      {/* Activity Score */}
      <Card className="activity-score-card" loading={loading}>
        <Row gutter={16} align="middle">
          <Col xs={24} md={12}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div className="activity-score-header">
                <TrophyOutlined className="activity-icon" />
                <div>
                  <h3>Điểm hoạt động</h3>
                  <p>Đánh giá tổng thể hiệu suất làm việc</p>
                </div>
              </div>

              <div className="activity-score-value">
                <span className="score-number">{metrics.activityScore.score}</span>
                <span className="score-total">/100</span>
                {getTrendIcon(metrics.activityScore.trend)}
              </div>

              <div className="activity-trend">
                {metrics.activityScore.trend === 'up' && (
                  <Tag color="success" icon={<RiseOutlined />}>
                    Xu hướng tăng
                  </Tag>
                )}
                {metrics.activityScore.trend === 'down' && (
                  <Tag color="error" icon={<FallOutlined />}>
                    Xu hướng giảm
                  </Tag>
                )}
                {metrics.activityScore.trend === 'stable' && (
                  <Tag color="default">Ổn định</Tag>
                )}
              </div>
            </Space>
          </Col>

          <Col xs={24} md={12}>
            <Progress
              type="circle"
              percent={metrics.activityScore.score}
              strokeColor={{
                '0%': '#0066CC',
                '100%': '#4ECDC4',
              }}
              format={(percent) => `${percent}%`}
              width={180}
            />
          </Col>
        </Row>
      </Card>

      {/* Performance Insights */}
      <Card className="insights-card" title="Thông tin chi tiết" loading={loading}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <div className="insight-item">
              <div className="insight-header">
                <MessageOutlined className="insight-icon" />
                <span>Hiệu suất tin nhắn</span>
              </div>
              <Progress
                percent={(metrics.messagesCount.thisMonth / metrics.messagesCount.total) * 100}
                strokeColor="#0066CC"
                showInfo={false}
              />
              <div className="insight-detail">
                <span>Tháng này chiếm</span>
                <strong>
                  {((metrics.messagesCount.thisMonth / metrics.messagesCount.total) * 100).toFixed(1)}%
                </strong>
              </div>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className="insight-item">
              <div className="insight-header">
                <CheckCircleOutlined className="insight-icon" />
                <span>Tỷ lệ giải quyết</span>
              </div>
              <Progress
                percent={(metrics.ticketsResolved.thisMonth / metrics.ticketsResolved.total) * 100}
                strokeColor="#52c41a"
                showInfo={false}
              />
              <div className="insight-detail">
                <span>Tháng này chiếm</span>
                <strong>
                  {((metrics.ticketsResolved.thisMonth / metrics.ticketsResolved.total) * 100).toFixed(1)}%
                </strong>
              </div>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className="insight-item">
              <div className="insight-header">
                <StarOutlined className="insight-icon" />
                <span>Mức độ hài lòng</span>
              </div>
              <Progress
                percent={(metrics.satisfactionRate.rating / 5) * 100}
                strokeColor="#faad14"
                showInfo={false}
              />
              <div className="insight-detail">
                <span>Đạt</span>
                <strong>{((metrics.satisfactionRate.rating / 5) * 100).toFixed(1)}%</strong>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
