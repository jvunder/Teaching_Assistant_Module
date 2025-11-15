import { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  List,
  Alert,
  Space,
  Tag,
  Badge,
  Spin,
  Typography,
  Divider,
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  MessageOutlined,
  BookOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  RiseOutlined,
  FallOutlined,
} from '@ant-design/icons';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { mockDataService } from '@/services/mockData.service';
import './TADashboard.css';

const { Title, Text } = Typography;

interface TADashboardProps {
  taId: string;
}

interface KPIData {
  totalClasses: number;
  totalStudents: number;
  totalParents: number;
  unreadMessages: number;
}

interface ParentSegment {
  notStarted: number;
  slowProgress: number;
  topPerformers: number;
}

interface Activity {
  id: string;
  type: string;
  message: string;
  time: string;
}

interface ClassPerformance {
  className: string;
  participation: number;
  attendance: number;
}

interface UpcomingTask {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress';
}

const TADashboard = ({ taId }: TADashboardProps) => {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<KPIData | null>(null);
  const [parentSegments, setParentSegments] = useState<ParentSegment | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [classPerformance, setClassPerformance] = useState<ClassPerformance[]>([]);
  const [upcomingTasks] = useState<UpcomingTask[]>([
    {
      id: '1',
      title: 'Chu©n bË tài liÇu buÕi hÍc "Nuôi d¡y con 0-3 tuÕi"',
      dueDate: 'Hôm nay, 14:00',
      priority: 'high',
      status: 'pending',
    },
    {
      id: '2',
      title: 'Gíi nh¯c nhß bài t­p cho hÍc viên lÛp "Tâm lý hÍc °Ýng"',
      dueDate: 'Mai, 09:00',
      priority: 'medium',
      status: 'in_progress',
    },
    {
      id: '3',
      title: 'TÕng hãp báo cáo tháng cho gi£ng viên',
      dueDate: '2 ngày nïa',
      priority: 'medium',
      status: 'pending',
    },
  ]);
  const [alerts] = useState([
    {
      id: '1',
      type: 'warning',
      message: '5 hÍc viên ch°a hoàn thành bài t­p tu§n tr°Ûc',
    },
    {
      id: '2',
      type: 'info',
      message: 'BuÕi hÍc "Kù nng giao ti¿p vÛi con" s½ b¯t §u trong 2 giÝ',
    },
  ]);

  useEffect(() => {
    loadDashboardData();
  }, [taId]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await mockDataService.getDashboard();

      setKpis({
        totalClasses: data.kpis.totalClasses,
        totalStudents: data.kpis.totalStudents,
        totalParents: data.kpis.totalParents,
        unreadMessages: data.kpis.unreadMessages,
      });

      setParentSegments({
        notStarted: data.parentSegments.notStarted,
        slowProgress: data.parentSegments.slowProgress,
        topPerformers: data.parentSegments.topPerformers,
      });

      setActivities(data.recentActivities);
      setClassPerformance(data.classPerformance);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
  const segmentChartData = parentSegments
    ? [
        { name: 'Ch°a b¯t §u', value: parentSegments.notStarted, color: '#DC3545' },
        { name: 'Ti¿n Ù ch­m', value: parentSegments.slowProgress, color: '#FFC107' },
        { name: 'Xu¥t s¯c', value: parentSegments.topPerformers, color: '#28A745' },
      ]
    : [];

  // Table columns for class performance
  const performanceColumns = [
    {
      title: 'LÛp hÍc',
      dataIndex: 'className',
      key: 'className',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Tham gia (%)',
      dataIndex: 'participation',
      key: 'participation',
      render: (value: number) => (
        <Space>
          <Text>{value}%</Text>
          {value >= 90 ? (
            <RiseOutlined style={{ color: '#28A745' }} />
          ) : (
            <FallOutlined style={{ color: '#DC3545' }} />
          )}
        </Space>
      ),
      sorter: (a: ClassPerformance, b: ClassPerformance) => a.participation - b.participation,
    },
    {
      title: 'iÃm danh (%)',
      dataIndex: 'attendance',
      key: 'attendance',
      render: (value: number) => (
        <Space>
          <Text>{value}%</Text>
          {value >= 90 ? (
            <RiseOutlined style={{ color: '#28A745' }} />
          ) : (
            <FallOutlined style={{ color: '#DC3545' }} />
          )}
        </Space>
      ),
      sorter: (a: ClassPerformance, b: ClassPerformance) => a.attendance - b.attendance,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'blue';
      default:
        return 'default';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageOutlined className="activity-icon icon-blue" />;
      case 'class':
        return <BookOutlined className="activity-icon icon-green" />;
      case 'attendance':
        return <CheckCircleOutlined className="activity-icon icon-teal" />;
      default:
        return <ClockCircleOutlined className="activity-icon" />;
    }
  };

  if (loading) {
    return (
      <div className="ta-dashboard-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="ta-dashboard">
      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="dashboard-alerts">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              message={alert.message}
              type={alert.type as 'warning' | 'info'}
              showIcon
              closable
              style={{ marginBottom: 16 }}
            />
          ))}
        </div>
      )}

      {/* KPIs Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="kpi-card">
            <Statistic
              title="TÕng sÑ lÛp"
              value={kpis?.totalClasses || 0}
              prefix={<BookOutlined className="kpi-icon icon-blue" />}
              valueStyle={{ color: '#0066CC' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="kpi-card">
            <Statistic
              title="HÍc viên"
              value={kpis?.totalStudents || 0}
              prefix={<UserOutlined className="kpi-icon icon-green" />}
              valueStyle={{ color: '#28A745' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="kpi-card">
            <Statistic
              title="Phå huynh"
              value={kpis?.totalParents || 0}
              prefix={<TeamOutlined className="kpi-icon icon-teal" />}
              valueStyle={{ color: '#4ECDC4' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="kpi-card">
            <Badge count={kpis?.unreadMessages || 0} offset={[-10, 10]}>
              <Statistic
                title="Tin nh¯n ch°a Íc"
                value={kpis?.unreadMessages || 0}
                prefix={<MessageOutlined className="kpi-icon icon-orange" />}
                valueStyle={{ color: '#FFC107' }}
              />
            </Badge>
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {/* Parent Segmentation Chart */}
        <Col xs={24} lg={12}>
          <Card title="Phân lo¡i hÍc viên" className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={segmentChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {segmentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="chart-legend">
              {segmentChartData.map((item) => (
                <div key={item.name} className="legend-item">
                  <div className="legend-color" style={{ background: item.color }} />
                  <Text>{item.name}: {item.value}</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col xs={24} lg={12}>
          <Card
            title="Ho¡t Ùng g§n ây"
            className="activities-card"
            extra={<Text type="secondary">Hôm nay</Text>}
          >
            <List
              dataSource={activities}
              renderItem={(item) => (
                <List.Item className="activity-item">
                  <List.Item.Meta
                    avatar={getActivityIcon(item.type)}
                    title={item.message}
                    description={
                      <Text type="secondary">
                        <ClockCircleOutlined /> {item.time}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Class Performance & Upcoming Tasks */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {/* Class Performance Table */}
        <Col xs={24} lg={14}>
          <Card title="HiÇu su¥t lÛp hÍc" className="performance-card">
            <Table
              dataSource={classPerformance}
              columns={performanceColumns}
              rowKey="className"
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        {/* Upcoming Tasks */}
        <Col xs={24} lg={10}>
          <Card
            title={
              <Space>
                <ClockCircleOutlined />
                <span>Công viÇc s¯p tÛi</span>
              </Space>
            }
            className="tasks-card"
          >
            <List
              dataSource={upcomingTasks}
              renderItem={(task) => (
                <List.Item className="task-item">
                  <List.Item.Meta
                    avatar={
                      task.status === 'in_progress' ? (
                        <ClockCircleOutlined className="task-icon-inprogress" />
                      ) : (
                        <WarningOutlined className="task-icon-pending" />
                      )
                    }
                    title={
                      <Space direction="vertical" size={4} style={{ width: '100%' }}>
                        <Text>{task.title}</Text>
                        <Space size={8}>
                          <Tag color={getPriorityColor(task.priority)}>
                            {task.priority === 'high'
                              ? 'Cao'
                              : task.priority === 'medium'
                              ? 'Trung bình'
                              : 'Th¥p'}
                          </Tag>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            <ClockCircleOutlined /> {task.dueDate}
                          </Text>
                        </Space>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TADashboard;
