import { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Spin, Alert } from 'antd';
import {
  TeamOutlined,
  UserOutlined,
  MessageOutlined,
  BookOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockDataService, type MockDashboard } from '@/services/mockData.service';
import './DashboardPage.css';

const DashboardPage = () => {
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
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  if (!dashboardData) {
    return <Alert message="Không có dữ liệu" type="warning" />;
  }

  // Prepare chart data
  const chartData = dashboardData.classPerformance.map((item) => ({
    name: item.className,
    'Tỷ lệ tham gia': item.participation,
    'Điểm danh': item.attendance,
  }));

  // Recent activities table
  const activitiesColumns = [
    {
      title: 'Hoạt động',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const colors: Record<string, string> = {
          message: 'blue',
          class: 'green',
          survey: 'orange',
        };
        return <Tag color={colors[type] || 'default'}>{type}</Tag>;
      },
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* KPI Cards */}
      <Row gutter={[16, 16]} className="dashboard-kpis">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng số lớp"
              value={dashboardData.kpis.totalClasses}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng số học sinh"
              value={dashboardData.kpis.totalStudents}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng số phụ huynh"
              value={dashboardData.kpis.totalParents}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tin nhắn chưa đọc"
              value={dashboardData.kpis.unreadMessages}
              prefix={<MessageOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]} className="dashboard-charts">
        <Col xs={24} lg={12}>
          <Card title="Hiệu suất lớp học" className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Tỷ lệ tham gia" fill="#1890ff" />
                <Bar dataKey="Điểm danh" fill="#52c41a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Xu hướng tham gia" className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Tỷ lệ tham gia" stroke="#1890ff" />
                <Line type="monotone" dataKey="Điểm danh" stroke="#52c41a" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Recent Activities */}
      <Row gutter={[16, 16]} className="dashboard-activities">
        <Col xs={24}>
          <Card title="Hoạt động gần đây">
            <Table
              dataSource={dashboardData.recentActivities}
              columns={activitiesColumns}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
