import { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Input,
  Button,
  Space,
  Tag,
  Select,
  Dropdown,
  Modal,
  message,
  Row,
  Col,
  Tooltip,
  Badge,
  Typography,
} from 'antd';
import type { TableProps, TableColumnsType } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  MessageOutlined,
  EyeOutlined,
  UserOutlined,
  MoreOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StarOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import './ParentListTable.css';

const { Option } = Select;
const { Text } = Typography;

interface ParentListTableProps {
  classId?: string;
  showFilters?: boolean;
  onSelectParent?: (parent: Parent) => void;
}

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  className: string;
  segment: 'not_started' | 'slow_progress' | 'top_performer';
  paidStatus: 'paid' | 'unpaid' | 'partial';
  points: number;
  lastActivity: string;
  enrollmentDate: string;
  studentName?: string;
}

const ParentListTable = ({
  classId,
  showFilters = true,
  onSelectParent,
}: ParentListTableProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Parent[]>([]);
  const [filteredData, setFilteredData] = useState<Parent[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState('');
  const [segmentFilter, setSegmentFilter] = useState<string>('all');
  const [paidFilter, setPaidFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>(classId || 'all');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  useEffect(() => {
    loadParentData();
  }, [classId]);

  useEffect(() => {
    applyFilters();
  }, [searchText, segmentFilter, paidFilter, classFilter, data]);

  const loadParentData = async () => {
    try {
      setLoading(true);

      // Mock data - Adult learners (who are also parents)
      const mockParents: Parent[] = [
        {
          id: '1',
          name: 'NguyÅn ThË Hoa',
          email: 'hoanguyen@email.com',
          phone: '0901234567',
          className: 'Nuôi d¡y con 0-3 tuÕi',
          segment: 'top_performer',
          paidStatus: 'paid',
          points: 450,
          lastActivity: '2 giÝ tr°Ûc',
          enrollmentDate: '2025-09-15',
          studentName: 'NguyÅn Minh An',
        },
        {
          id: '2',
          name: 'Tr§n Vn Nam',
          email: 'namtran@email.com',
          phone: '0912345678',
          className: 'Tâm lý hÍc °Ýng',
          segment: 'slow_progress',
          paidStatus: 'paid',
          points: 180,
          lastActivity: '1 ngày tr°Ûc',
          enrollmentDate: '2025-09-20',
          studentName: 'Tr§n B£o NgÍc',
        },
        {
          id: '3',
          name: 'Lê ThË Mai',
          email: 'maile@email.com',
          phone: '0923456789',
          className: 'Nuôi con b±ng tình yêu th°¡ng',
          segment: 'top_performer',
          paidStatus: 'paid',
          points: 520,
          lastActivity: '30 phút tr°Ûc',
          enrollmentDate: '2025-08-10',
          studentName: 'Lê Hoàng Anh',
        },
        {
          id: '4',
          name: 'Ph¡m Vn éc',
          email: 'ducpham@email.com',
          phone: '0934567890',
          className: 'Kù nng giao ti¿p vÛi con',
          segment: 'not_started',
          paidStatus: 'partial',
          points: 50,
          lastActivity: '5 ngày tr°Ûc',
          enrollmentDate: '2025-10-01',
          studentName: 'Ph¡m Thu Hà',
        },
        {
          id: '5',
          name: 'Hoàng ThË Lan',
          email: 'lanhoang@email.com',
          phone: '0945678901',
          className: 'Nuôi d¡y con 0-3 tuÕi',
          segment: 'top_performer',
          paidStatus: 'paid',
          points: 380,
          lastActivity: '1 giÝ tr°Ûc',
          enrollmentDate: '2025-09-18',
          studentName: 'Hoàng Minh Tu¥n',
        },
        {
          id: '6',
          name: '× Vn Hùng',
          email: 'hungdo@email.com',
          phone: '0956789012',
          className: 'Tâm lý hÍc °Ýng',
          segment: 'slow_progress',
          paidStatus: 'unpaid',
          points: 120,
          lastActivity: '3 ngày tr°Ûc',
          enrollmentDate: '2025-10-05',
          studentName: '× Khánh Linh',
        },
        {
          id: '7',
          name: 'Vi ThË Thu',
          email: 'thuvu@email.com',
          phone: '0967890123',
          className: 'Kù nng giao ti¿p vÛi con',
          segment: 'top_performer',
          paidStatus: 'paid',
          points: 410,
          lastActivity: '4 giÝ tr°Ûc',
          enrollmentDate: '2025-09-25',
          studentName: 'Vi Minh Quân',
        },
        {
          id: '8',
          name: 'Bùi Vn Tùng',
          email: 'tungbui@email.com',
          phone: '0978901234',
          className: 'Nuôi con b±ng tình yêu th°¡ng',
          segment: 'not_started',
          paidStatus: 'paid',
          points: 90,
          lastActivity: '1 tu§n tr°Ûc',
          enrollmentDate: '2025-10-10',
          studentName: 'Bùi NgÍc Ánh',
        },
      ];

      // Filter by classId if provided
      const filteredByClass = classId
        ? mockParents.filter((p) => p.className === classId)
        : mockParents;

      setData(filteredByClass);
      setPagination({ ...pagination, total: filteredByClass.length });
    } catch (error) {
      console.error('Failed to load parent data:', error);
      message.error('Không thÃ t£i dï liÇu phå huynh');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...data];

    // Search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (parent) =>
          parent.name.toLowerCase().includes(searchLower) ||
          parent.email.toLowerCase().includes(searchLower) ||
          parent.phone.includes(searchLower)
      );
    }

    // Segment filter
    if (segmentFilter !== 'all') {
      filtered = filtered.filter((parent) => parent.segment === segmentFilter);
    }

    // Paid status filter
    if (paidFilter !== 'all') {
      filtered = filtered.filter((parent) => parent.paidStatus === paidFilter);
    }

    // Class filter
    if (classFilter !== 'all') {
      filtered = filtered.filter((parent) => parent.className === classFilter);
    }

    setFilteredData(filtered);
    setPagination({ ...pagination, total: filtered.length, current: 1 });
  };

  const handleExportExcel = () => {
    // Mock export - in real implementation, use library like xlsx or SheetJS
    const selectedData = selectedRowKeys.length > 0
      ? filteredData.filter((item) => selectedRowKeys.includes(item.id))
      : filteredData;

    message.success(`ang xu¥t ${selectedData.length} dòng dï liÇu ra Excel...`);

    // Simulate export delay
    setTimeout(() => {
      message.success('Xu¥t Excel thành công!');
    }, 1500);
  };

  const handleBulkMessage = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chÍn ít nh¥t mÙt phå huynh');
      return;
    }

    Modal.confirm({
      title: 'Gíi tin nh¯n hàng lo¡t',
      content: `B¡n có muÑn gíi tin nh¯n ¿n ${selectedRowKeys.length} phå huynh ã chÍn?`,
      okText: 'Gíi',
      cancelText: 'Hçy',
      onOk: () => {
        message.success(`ã chu©n bË gíi tin nh¯n ¿n ${selectedRowKeys.length} ng°Ýi nh­n`);
        // In real app, navigate to message composer with selected recipients
      },
    });
  };

  const handleViewDetail = (parent: Parent) => {
    if (onSelectParent) {
      onSelectParent(parent);
    } else {
      Modal.info({
        title: 'Thông tin phå huynh',
        width: 600,
        content: (
          <div style={{ marginTop: 16 }}>
            <p>
              <strong>HÍ tên:</strong> {parent.name}
            </p>
            <p>
              <strong>Email:</strong> {parent.email}
            </p>
            <p>
              <strong>SÑ iÇn tho¡i:</strong> {parent.phone}
            </p>
            <p>
              <strong>LÛp hÍc:</strong> {parent.className}
            </p>
            <p>
              <strong>Tên con:</strong> {parent.studentName || 'Không có'}
            </p>
            <p>
              <strong>Phân lo¡i:</strong> {getSegmentLabel(parent.segment)}
            </p>
            <p>
              <strong>Thanh toán:</strong> {getPaidStatusLabel(parent.paidStatus)}
            </p>
            <p>
              <strong>iÃm tích liy:</strong> {parent.points}
            </p>
            <p>
              <strong>Ho¡t Ùng g§n nh¥t:</strong> {parent.lastActivity}
            </p>
            <p>
              <strong>Ngày ng ký:</strong> {parent.enrollmentDate}
            </p>
          </div>
        ),
      });
    }
  };

  const handleSendMessage = (parent: Parent) => {
    message.info(`Chu©n bË gíi tin nh¯n ¿n ${parent.name}`);
    // In real app, open message composer
  };

  const getSegmentTag = (segment: string) => {
    switch (segment) {
      case 'top_performer':
        return <Tag color="success">Xu¥t s¯c</Tag>;
      case 'slow_progress':
        return <Tag color="warning">Ti¿n Ù ch­m</Tag>;
      case 'not_started':
        return <Tag color="error">Ch°a b¯t §u</Tag>;
      default:
        return <Tag>Ch°a rõ</Tag>;
    }
  };

  const getSegmentLabel = (segment: string) => {
    switch (segment) {
      case 'top_performer':
        return 'Xu¥t s¯c';
      case 'slow_progress':
        return 'Ti¿n Ù ch­m';
      case 'not_started':
        return 'Ch°a b¯t §u';
      default:
        return 'Ch°a rõ';
    }
  };

  const getPaidStatusTag = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            ã thanh toán
          </Tag>
        );
      case 'partial':
        return (
          <Tag icon={<CloseCircleOutlined />} color="warning">
            Thanh toán mÙt ph§n
          </Tag>
        );
      case 'unpaid':
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Ch°a thanh toán
          </Tag>
        );
      default:
        return <Tag>Ch°a rõ</Tag>;
    }
  };

  const getPaidStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'ã thanh toán';
      case 'partial':
        return 'Thanh toán mÙt ph§n';
      case 'unpaid':
        return 'Ch°a thanh toán';
      default:
        return 'Ch°a rõ';
    }
  };

  const columns: TableColumnsType<Parent> = [
    {
      title: 'HÍ tên',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 180,
      render: (text: string, record: Parent) => (
        <Space>
          <UserOutlined className="user-icon" />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.studentName}
            </Text>
          </div>
        </Space>
      ),
      sorter: (a: Parent, b: Parent) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'SÑ iÇn tho¡i',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
    },
    {
      title: 'LÛp hÍc',
      dataIndex: 'className',
      key: 'className',
      width: 180,
      ellipsis: true,
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: 'Phân lo¡i',
      dataIndex: 'segment',
      key: 'segment',
      width: 140,
      render: (segment: string) => getSegmentTag(segment),
      filters: [
        { text: 'Xu¥t s¯c', value: 'top_performer' },
        { text: 'Ti¿n Ù ch­m', value: 'slow_progress' },
        { text: 'Ch°a b¯t §u', value: 'not_started' },
      ],
      onFilter: (value: any, record: Parent) => record.segment === value,
    },
    {
      title: 'Thanh toán',
      dataIndex: 'paidStatus',
      key: 'paidStatus',
      width: 160,
      render: (status: string) => getPaidStatusTag(status),
      filters: [
        { text: 'ã thanh toán', value: 'paid' },
        { text: 'Thanh toán mÙt ph§n', value: 'partial' },
        { text: 'Ch°a thanh toán', value: 'unpaid' },
      ],
      onFilter: (value: any, record: Parent) => record.paidStatus === value,
    },
    {
      title: 'iÃm',
      dataIndex: 'points',
      key: 'points',
      width: 100,
      render: (points: number) => (
        <Space>
          <StarOutlined style={{ color: '#FFC107' }} />
          <Text strong>{points}</Text>
        </Space>
      ),
      sorter: (a: Parent, b: Parent) => a.points - b.points,
    },
    {
      title: 'Ho¡t Ùng',
      dataIndex: 'lastActivity',
      key: 'lastActivity',
      width: 130,
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
    {
      title: 'Hành Ùng',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (_: any, record: Parent) => (
        <Space>
          <Tooltip title="Xem chi ti¿t">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetail(record)}
            />
          </Tooltip>
          <Tooltip title="Gíi tin nh¯n">
            <Button
              type="text"
              size="small"
              icon={<MessageOutlined />}
              onClick={() => handleSendMessage(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const uniqueClasses = Array.from(new Set(data.map((p) => p.className)));

  return (
    <div className="parent-list-table">
      <Card className="table-card">
        {/* Filters & Actions */}
        {showFilters && (
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col xs={24} sm={12} md={6}>
              <Input
                placeholder="Tìm ki¿m theo tên, email, ST"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Select
                placeholder="Phân lo¡i"
                value={segmentFilter}
                onChange={setSegmentFilter}
                style={{ width: '100%' }}
              >
                <Option value="all">T¥t c£</Option>
                <Option value="top_performer">Xu¥t s¯c</Option>
                <Option value="slow_progress">Ti¿n Ù ch­m</Option>
                <Option value="not_started">Ch°a b¯t §u</Option>
              </Select>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Select
                placeholder="Thanh toán"
                value={paidFilter}
                onChange={setPaidFilter}
                style={{ width: '100%' }}
              >
                <Option value="all">T¥t c£</Option>
                <Option value="paid">ã thanh toán</Option>
                <Option value="partial">MÙt ph§n</Option>
                <Option value="unpaid">Ch°a thanh toán</Option>
              </Select>
            </Col>
            {!classId && (
              <Col xs={12} sm={6} md={5}>
                <Select
                  placeholder="LÛp hÍc"
                  value={classFilter}
                  onChange={setClassFilter}
                  style={{ width: '100%' }}
                >
                  <Option value="all">T¥t c£</Option>
                  {uniqueClasses.map((className) => (
                    <Option key={className} value={className}>
                      {className}
                    </Option>
                  ))}
                </Select>
              </Col>
            )}
            <Col xs={24} sm={12} md={5}>
              <Space>
                <Button
                  type="primary"
                  icon={<MessageOutlined />}
                  onClick={handleBulkMessage}
                  disabled={selectedRowKeys.length === 0}
                >
                  Gíi tin ({selectedRowKeys.length})
                </Button>
                <Button icon={<ExportOutlined />} onClick={handleExportExcel}>
                  Xu¥t Excel
                </Button>
              </Space>
            </Col>
          </Row>
        )}

        {/* Table */}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showTotal: (total) => `TÕng ${total} phå huynh`,
            onChange: (page, pageSize) => {
              setPagination({ ...pagination, current: page, pageSize });
            },
          }}
          scroll={{ x: 1200 }}
          size="middle"
        />

        {/* Summary */}
        {selectedRowKeys.length > 0 && (
          <div className="table-summary">
            <Badge count={selectedRowKeys.length} showZero>
              <Text strong>ã chÍn {selectedRowKeys.length} phå huynh</Text>
            </Badge>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ParentListTable;
