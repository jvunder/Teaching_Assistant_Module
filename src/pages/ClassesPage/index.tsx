import { useEffect, useState } from 'react';
import { Card, Table, Tag, Button, Space, Input, Alert } from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockDataService, type MockClass } from '@/services/mockData.service';
import type { ColumnsType } from 'antd/es/table';
import './ClassesPage.css';

const ClassesPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<MockClass[]>([]);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockDataService.getClasses();
      setClasses(data);
    } catch (err: any) {
      setError(err?.message || 'Không thể tải danh sách lớp học');
    } finally {
      setLoading(false);
    }
  };

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchText.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<MockClass> = [
    {
      title: 'Tên lớp',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Khối lớp',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Môn học',
      dataIndex: 'subject',
      key: 'subject',
      render: (subject: string) => <Tag color="blue">{subject}</Tag>,
    },
    {
      title: 'Giáo viên',
      dataIndex: 'teacherName',
      key: 'teacherName',
    },
    {
      title: 'Số học sinh',
      dataIndex: 'studentCount',
      key: 'studentCount',
      align: 'center',
      sorter: (a, b) => a.studentCount - b.studentCount,
    },
    {
      title: 'Số phụ huynh',
      dataIndex: 'parentCount',
      key: 'parentCount',
      align: 'center',
      sorter: (a, b) => a.parentCount - b.parentCount,
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/classes/${record.id}`)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <div className="classes-page">
      <div className="classes-header">
        <h1>Quản lý lớp học</h1>
        <Space>
          <Input
            placeholder="Tìm kiếm lớp học..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
        </Space>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredClasses}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} lớp học`,
          }}
        />
      </Card>
    </div>
  );
};

export default ClassesPage;
