import { useState } from 'react';
import {
  Card,
  Row,
  Col,
  DatePicker,
  Button,
  Space,
  Typography,
  Table,
  message,
} from 'antd';
import {
  FileExcelOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import './AnalyticsPage.css';

const { RangePicker } = DatePicker;
const { Title } = Typography;

interface AnalyticsData {
  engagement: Array<{ date: string; value: number }>;
  classPerformance: Array<{ name: string; value: number }>;
  messageStats: Array<{ type: string; count: number }>;
  topClasses: Array<{ name: string; students: number; participation: number }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(30, 'days'),
    dayjs(),
  ]);
  const [analyticsData] = useState<AnalyticsData>({
    engagement: [
      { date: '2025-10-01', value: 65 },
      { date: '2025-10-05', value: 72 },
      { date: '2025-10-10', value: 68 },
      { date: '2025-10-15', value: 80 },
      { date: '2025-10-20', value: 85 },
      { date: '2025-10-25', value: 90 },
      { date: '2025-10-30', value: 88 },
    ],
    classPerformance: [
      { name: 'Toán lớp 5', value: 85 },
      { name: 'Tiếng Việt lớp 4', value: 78 },
      { name: 'Khoa học lớp 3', value: 90 },
      { name: 'Lịch sử lớp 5', value: 72 },
    ],
    messageStats: [
      { type: 'Tin nhắn gửi', count: 450 },
      { type: 'Tin nhắn đã đọc', count: 380 },
      { type: 'Tin nhắn chưa đọc', count: 70 },
    ],
    topClasses: [
      { name: 'Toán lớp 5', students: 35, participation: 85 },
      { name: 'Tiếng Việt lớp 4', students: 32, participation: 78 },
      { name: 'Khoa học lớp 3', students: 28, participation: 90 },
    ],
  });

  const handleExportExcel = () => {
    message.success('Đang xuất file Excel...');
    // Mock export
    setTimeout(() => {
      message.success('Xuất file Excel thành công');
    }, 1500);
  };

  const handleExportPDF = () => {
    message.success('Đang xuất file PDF...');
    // Mock export
    setTimeout(() => {
      message.success('Xuất file PDF thành công');
    }, 1500);
  };

  const handleDateRangeChange = (dates: any) => {
    if (dates) {
      setDateRange(dates);
      // Reload data with new date range
      message.info('Đang tải dữ liệu mới...');
    }
  };

  const topClassesColumns: ColumnsType<AnalyticsData['topClasses'][0]> = [
    {
      title: 'Tên lớp',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số học sinh',
      dataIndex: 'students',
      key: 'students',
      align: 'center',
    },
    {
      title: 'Tỷ lệ tham gia (%)',
      dataIndex: 'participation',
      key: 'participation',
      align: 'center',
      render: (value: number) => <span>{value}%</span>,
    },
  ];

  return (
    <div className="wow-page analytics-page">
      <div className="wow-header analytics-header">
        <Title level={2}>Phân tích & Báo cáo</Title>
        <Space>
          <RangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            format="DD/MM/YYYY"
          />
          <Button className="wow-btn" icon={<FileExcelOutlined />} onClick={handleExportExcel}>
            Xuất Excel
          </Button>
          <Button className="wow-btn" icon={<FilePdfOutlined />} onClick={handleExportPDF}>
            Xuất PDF
          </Button>
        </Space>
      </div>

      {/* Engagement Chart */}
      <Card className="wow-card" title="Xu hướng tương tác" style={{ marginBottom: 24 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData.engagement}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1890ff"
              strokeWidth={2}
              name="Tỷ lệ tương tác (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Charts Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card className="wow-card" title="Hiệu suất lớp học">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.classPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#52c41a" name="Điểm số" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className="wow-card" title="Thống kê tin nhắn">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.messageStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analyticsData.messageStats.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Top Classes Table */}
      <Card className="wow-card" title="Top lớp học">
        <Table
          className="wow-table"
          columns={topClassesColumns}
          dataSource={analyticsData.topClasses}
          rowKey="name"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default AnalyticsPage;
