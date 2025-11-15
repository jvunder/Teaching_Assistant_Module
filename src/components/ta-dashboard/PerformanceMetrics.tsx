import { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Space,
  Select,
  Typography,
  Spin,
  Tag,
  Divider,
} from 'antd';
import {
  RiseOutlined,
  FallOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import './PerformanceMetrics.css';

const { Title, Text } = Typography;
const { Option } = Select;

interface PerformanceMetricsProps {
  period: 'week' | 'month' | 'quarter';
}

interface MetricData {
  deliveryRate: number;
  readRate: number;
  avgResponseTime: number; // in hours
  conversionRate: number;
  performanceScore: number;
}

interface TrendData {
  period: string;
  messages: number;
  responses: number;
  conversions: number;
}

const PerformanceMetrics = ({ period: initialPeriod = 'week' }: PerformanceMetricsProps) => {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter'>(initialPeriod);
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [previousMetrics, setPreviousMetrics] = useState<MetricData | null>(null);

  useEffect(() => {
    loadMetricsData();
  }, [period]);

  const loadMetricsData = async () => {
    try {
      setLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock current metrics
      const currentMetrics: MetricData = {
        deliveryRate: 98.5,
        readRate: 85.2,
        avgResponseTime: 2.3,
        conversionRate: 72.8,
        performanceScore: 88.5,
      };

      // Mock previous period metrics (for comparison)
      const prevMetrics: MetricData = {
        deliveryRate: 97.2,
        readRate: 82.1,
        avgResponseTime: 3.1,
        conversionRate: 68.5,
        performanceScore: 84.2,
      };

      // Mock trend data based on period
      let mockTrendData: TrendData[] = [];

      if (period === 'week') {
        mockTrendData = [
          { period: 'Thé 2', messages: 45, responses: 38, conversions: 32 },
          { period: 'Thé 3', messages: 52, responses: 44, conversions: 38 },
          { period: 'Thé 4', messages: 48, responses: 41, conversions: 35 },
          { period: 'Thé 5', messages: 61, responses: 52, conversions: 45 },
          { period: 'Thé 6', messages: 55, responses: 47, conversions: 40 },
          { period: 'Thé 7', messages: 38, responses: 32, conversions: 28 },
          { period: 'CN', messages: 28, responses: 24, conversions: 20 },
        ];
      } else if (period === 'month') {
        mockTrendData = [
          { period: 'Tu§n 1', messages: 180, responses: 155, conversions: 130 },
          { period: 'Tu§n 2', messages: 210, responses: 178, conversions: 150 },
          { period: 'Tu§n 3', messages: 195, responses: 168, conversions: 145 },
          { period: 'Tu§n 4', messages: 225, responses: 192, conversions: 165 },
        ];
      } else {
        mockTrendData = [
          { period: 'Tháng 1', messages: 720, responses: 615, conversions: 520 },
          { period: 'Tháng 2', messages: 780, responses: 665, conversions: 565 },
          { period: 'Tháng 3', messages: 850, responses: 725, conversions: 615 },
        ];
      }

      setMetrics(currentMetrics);
      setPreviousMetrics(prevMetrics);
      setTrendData(mockTrendData);
    } catch (error) {
      console.error('Failed to load metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change >= 0,
    };
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { label: 'Xu¥t s¯c', color: 'success' };
    if (score >= 75) return { label: 'TÑt', color: 'processing' };
    if (score >= 60) return { label: 'Trung bình', color: 'warning' };
    return { label: 'C§n c£i thiÇn', color: 'error' };
  };

  const getPeriodLabel = () => {
    switch (period) {
      case 'week':
        return 'Tu§n này';
      case 'month':
        return 'Tháng này';
      case 'quarter':
        return 'Quý này';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="metrics-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!metrics || !previousMetrics) {
    return <div>Không có dï liÇu</div>;
  }

  const deliveryChange = calculateChange(metrics.deliveryRate, previousMetrics.deliveryRate);
  const readChange = calculateChange(metrics.readRate, previousMetrics.readRate);
  const responseChange = calculateChange(
    previousMetrics.avgResponseTime,
    metrics.avgResponseTime
  ); // Inverted: lower is better
  const conversionChange = calculateChange(metrics.conversionRate, previousMetrics.conversionRate);
  const scoreChange = calculateChange(metrics.performanceScore, previousMetrics.performanceScore);

  const performanceLevel = getPerformanceLevel(metrics.performanceScore);

  return (
    <div className="performance-metrics">
      {/* Header */}
      <div className="metrics-header">
        <Space align="center">
          <Title level={3} style={{ margin: 0 }}>
            HiÇu su¥t làm viÇc
          </Title>
          <Select
            value={period}
            onChange={(value) => setPeriod(value)}
            style={{ width: 150 }}
          >
            <Option value="week">Tu§n</Option>
            <Option value="month">Tháng</Option>
            <Option value="quarter">Quý</Option>
          </Select>
        </Space>
      </div>

      {/* Performance Score Card */}
      <Card className="score-card">
        <Row align="middle" gutter={24}>
          <Col xs={24} md={12}>
            <Space direction="vertical" size={4}>
              <Text type="secondary">iÃm hiÇu su¥t tÕng thÃ</Text>
              <Space align="baseline">
                <Title level={1} style={{ margin: 0, color: '#0066CC' }}>
                  {metrics.performanceScore}
                </Title>
                <Text type="secondary" style={{ fontSize: 20 }}>
                  / 100
                </Text>
                <Tag color={performanceLevel.color} icon={<TrophyOutlined />}>
                  {performanceLevel.label}
                </Tag>
              </Space>
              <Space>
                {scoreChange.isPositive ? (
                  <ArrowUpOutlined style={{ color: '#28A745' }} />
                ) : (
                  <ArrowDownOutlined style={{ color: '#DC3545' }} />
                )}
                <Text type={scoreChange.isPositive ? 'success' : 'danger'}>
                  {scoreChange.value}% so vÛi kó tr°Ûc
                </Text>
              </Space>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <div className="score-progress">
              <Progress
                type="dashboard"
                percent={metrics.performanceScore}
                strokeColor={{
                  '0%': '#0066CC',
                  '100%': '#4ECDC4',
                }}
                format={(percent) => `${percent}`}
              />
            </div>
          </Col>
        </Row>
      </Card>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {/* Delivery Rate */}
        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card">
            <Statistic
              title="T÷ lÇ gíi thành công"
              value={metrics.deliveryRate}
              precision={1}
              suffix="%"
              prefix={<CheckCircleOutlined className="metric-icon icon-green" />}
              valueStyle={{ color: '#28A745' }}
            />
            <div className="metric-change">
              {deliveryChange.isPositive ? (
                <RiseOutlined className="change-icon-up" />
              ) : (
                <FallOutlined className="change-icon-down" />
              )}
              <Text type={deliveryChange.isPositive ? 'success' : 'danger'}>
                {deliveryChange.value}%
              </Text>
            </div>
            <Progress
              percent={metrics.deliveryRate}
              showInfo={false}
              strokeColor="#28A745"
              size="small"
            />
          </Card>
        </Col>

        {/* Read Rate */}
        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card">
            <Statistic
              title="T÷ lÇ Íc tin nh¯n"
              value={metrics.readRate}
              precision={1}
              suffix="%"
              prefix={<EyeOutlined className="metric-icon icon-blue" />}
              valueStyle={{ color: '#0066CC' }}
            />
            <div className="metric-change">
              {readChange.isPositive ? (
                <RiseOutlined className="change-icon-up" />
              ) : (
                <FallOutlined className="change-icon-down" />
              )}
              <Text type={readChange.isPositive ? 'success' : 'danger'}>
                {readChange.value}%
              </Text>
            </div>
            <Progress
              percent={metrics.readRate}
              showInfo={false}
              strokeColor="#0066CC"
              size="small"
            />
          </Card>
        </Col>

        {/* Response Time */}
        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card">
            <Statistic
              title="ThÝi gian ph£n hÓi TB"
              value={metrics.avgResponseTime}
              precision={1}
              suffix="giÝ"
              prefix={<ClockCircleOutlined className="metric-icon icon-orange" />}
              valueStyle={{ color: '#FFC107' }}
            />
            <div className="metric-change">
              {responseChange.isPositive ? (
                <RiseOutlined className="change-icon-up" />
              ) : (
                <FallOutlined className="change-icon-down" />
              )}
              <Text type={responseChange.isPositive ? 'success' : 'danger'}>
                {responseChange.value}% {responseChange.isPositive ? 'nhanh h¡n' : 'ch­m h¡n'}
              </Text>
            </div>
            <Progress
              percent={Math.max(0, 100 - metrics.avgResponseTime * 10)}
              showInfo={false}
              strokeColor="#FFC107"
              size="small"
            />
          </Card>
        </Col>

        {/* Conversion Rate */}
        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card">
            <Statistic
              title="T÷ lÇ chuyÃn Õi"
              value={metrics.conversionRate}
              precision={1}
              suffix="%"
              prefix={<TrophyOutlined className="metric-icon icon-teal" />}
              valueStyle={{ color: '#4ECDC4' }}
            />
            <div className="metric-change">
              {conversionChange.isPositive ? (
                <RiseOutlined className="change-icon-up" />
              ) : (
                <FallOutlined className="change-icon-down" />
              )}
              <Text type={conversionChange.isPositive ? 'success' : 'danger'}>
                {conversionChange.value}%
              </Text>
            </div>
            <Progress
              percent={metrics.conversionRate}
              showInfo={false}
              strokeColor="#4ECDC4"
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Trend Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {/* Message & Response Trend */}
        <Col xs={24} lg={12}>
          <Card title={`Xu h°Ûng tin nh¯n & ph£n hÓi - ${getPeriodLabel()}`} className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="messages"
                  stackId="1"
                  stroke="#0066CC"
                  fill="#0066CC"
                  name="Tin nh¯n gíi"
                />
                <Area
                  type="monotone"
                  dataKey="responses"
                  stackId="2"
                  stroke="#28A745"
                  fill="#28A745"
                  name="Ph£n hÓi"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Conversion Trend */}
        <Col xs={24} lg={12}>
          <Card title={`Xu h°Ûng chuyÃn Õi - ${getPeriodLabel()}`} className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="conversions" fill="#4ECDC4" name="ChuyÃn Õi thành công" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Insights & Recommendations */}
      <Card
        title="Nh­n xét & Á xu¥t"
        className="insights-card"
        style={{ marginTop: 16 }}
      >
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          {metrics.deliveryRate >= 98 && (
            <div className="insight-item insight-success">
              <CheckCircleOutlined className="insight-icon" />
              <Text>
                <strong>Xu¥t s¯c:</strong> T÷ lÇ gíi tin nh¯n thành công r¥t cao ({metrics.deliveryRate}%).
                Hãy duy trì ch¥t l°ãng danh sách ng°Ýi nh­n.
              </Text>
            </div>
          )}

          {metrics.readRate < 85 && (
            <div className="insight-item insight-warning">
              <ClockCircleOutlined className="insight-icon" />
              <Text>
                <strong>C£i thiÇn:</strong> T÷ lÇ Íc tin nh¯n ({metrics.readRate}%) có thÃ tÑt h¡n.
                Hãy thí tÑi °u tiêu Á và thÝi gian gíi.
              </Text>
            </div>
          )}

          {metrics.avgResponseTime < 3 && (
            <div className="insight-item insight-success">
              <CheckCircleOutlined className="insight-icon" />
              <Text>
                <strong>TÑt:</strong> ThÝi gian ph£n hÓi trung bình ({metrics.avgResponseTime} giÝ) r¥t nhanh.
                Phå huynh ánh giá cao sñ nhiÇt tình cça b¡n.
              </Text>
            </div>
          )}

          {metrics.conversionRate >= 70 && (
            <div className="insight-item insight-success">
              <CheckCircleOutlined className="insight-icon" />
              <Text>
                <strong>Xu¥t s¯c:</strong> T÷ lÇ chuyÃn Õi ({metrics.conversionRate}%) r¥t ¥n t°ãng.
                Chi¿n l°ãc giao ti¿p cça b¡n ang hiÇu qu£.
              </Text>
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
