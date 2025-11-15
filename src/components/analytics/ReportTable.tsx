import React from 'react';
import { Table, Tag, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { PurchaseReportItem } from '@/types/analytics.types';
import './ReportTable.css';

interface ReportTableProps {
  data: PurchaseReportItem[];
  loading?: boolean;
  dimension: string;
}

const ReportTable: React.FC<ReportTableProps> = ({ data, loading = false, dimension }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const columns: ColumnsType<PurchaseReportItem> = [
    {
      title: dimension.charAt(0).toUpperCase() + dimension.slice(1),
      dataIndex: 'dimensionValue',
      key: 'dimensionValue',
      fixed: 'left',
      width: 200,
      sorter: (a, b) => a.dimensionValue.localeCompare(b.dimensionValue),
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Total Purchases',
      dataIndex: 'totalPurchases',
      key: 'totalPurchases',
      align: 'right',
      sorter: (a, b) => a.totalPurchases - b.totalPurchases,
      render: (value) => (
        <Tag color="blue" style={{ fontSize: '14px', padding: '4px 12px' }}>
          {formatNumber(value)}
        </Tag>
      ),
    },
    {
      title: 'Total Revenue',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      align: 'right',
      sorter: (a, b) => a.totalRevenue - b.totalRevenue,
      defaultSortOrder: 'descend',
      render: (value) => (
        <span style={{ fontWeight: 600, color: '#28A745' }}>
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      title: 'Avg Order Value',
      dataIndex: 'averageOrderValue',
      key: 'averageOrderValue',
      align: 'right',
      sorter: (a, b) => a.averageOrderValue - b.averageOrderValue,
      render: (value) => (
        <span style={{ color: '#666' }}>{formatCurrency(value)}</span>
      ),
    },
    {
      title: 'Top Course',
      key: 'topCourse',
      align: 'center',
      render: (_, record) => {
        const topCourse = record.courseBreakdown.reduce((max, course) =>
          course.revenue > max.revenue ? course : max
        );
        return (
          <Tag color="green">
            {topCourse.courseType.toUpperCase()} ({topCourse.percentage.toFixed(1)}%)
          </Tag>
        );
      },
    },
  ];

  return (
    <Card className="report-table-card" title="Detailed Report">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        scroll={{ x: 800 }}
        className="report-table"
      />
    </Card>
  );
};

export default ReportTable;
