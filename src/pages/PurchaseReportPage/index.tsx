import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Button, Space, message, Spin } from 'antd';
import {
  DollarOutlined,
  ShoppingCartOutlined,
  TrophyOutlined,
  RiseOutlined,
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import ReportBuilder from '@/components/analytics/ReportBuilder';
import ReportTable from '@/components/analytics/ReportTable';
import ReportChart from '@/components/analytics/ReportChart';
import analyticsService from '@/services/analytics.service';
import type {
  ReportFilter,
  PurchaseReportData,
  ExportOptions,
} from '@/types/analytics.types';
import dayjs from 'dayjs';
import './index.css';

const PurchaseReportPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [reportData, setReportData] = useState<PurchaseReportData | null>(null);
  const [currentFilter, setCurrentFilter] = useState<ReportFilter>({
    dimension: 'class',
    dateRange: {
      startDate: dayjs().subtract(30, 'days').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
    },
    courseType: 'all',
  });

  useEffect(() => {
    loadReportData(currentFilter);
  }, []);

  const loadReportData = async (filter: ReportFilter) => {
    setLoading(true);
    try {
      const data = await analyticsService.getPurchaseReports(filter);
      setReportData(data);
      setCurrentFilter(filter);
    } catch (error) {
      message.error('Failed to load report data');
      console.error('Error loading report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: 'excel' | 'pdf') => {
    if (!reportData) {
      message.warning('No data to export');
      return;
    }

    setExporting(true);
    const options: ExportOptions = {
      format,
      includeCharts: true,
      includeSummary: true,
      fileName: `purchase_report_${currentFilter.dimension}_${dayjs().format('YYYY-MM-DD')}`,
    };

    try {
      await analyticsService.exportReport(reportData, options);
      message.success(`Report exported successfully as ${format.toUpperCase()}`);
    } catch (error) {
      message.error(`Failed to export report as ${format.toUpperCase()}`);
      console.error('Export error:', error);
    } finally {
      setExporting(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  return (
    <div className="purchase-report-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Purchase Reports</h1>
          <p className="page-description">
            Multi-dimensional analysis of course purchases and revenue
          </p>
        </div>
        <Space>
          <Button
            icon={<FileExcelOutlined />}
            onClick={() => handleExport('excel')}
            loading={exporting}
            size="large"
          >
            Export Excel
          </Button>
          <Button
            icon={<FilePdfOutlined />}
            onClick={() => handleExport('pdf')}
            loading={exporting}
            size="large"
            disabled
          >
            Export PDF
          </Button>
        </Space>
      </div>

      {/* Report Builder */}
      <ReportBuilder onFilterChange={loadReportData} loading={loading} />

      {/* Summary Statistics */}
      {reportData && (
        <>
          <Row gutter={[16, 16]} className="summary-stats">
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card stat-card-primary">
                <Statistic
                  title="Total Revenue"
                  value={reportData.summary.totalRevenue}
                  prefix={<DollarOutlined />}
                  formatter={(value) => formatCurrency(value as number)}
                  valueStyle={{ color: '#0066CC', fontWeight: 700 }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card stat-card-success">
                <Statistic
                  title="Total Purchases"
                  value={reportData.summary.totalPurchases}
                  prefix={<ShoppingCartOutlined />}
                  formatter={(value) => formatNumber(value as number)}
                  valueStyle={{ color: '#28A745', fontWeight: 700 }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card stat-card-warning">
                <Statistic
                  title="Avg Order Value"
                  value={reportData.summary.averageOrderValue}
                  prefix={<DollarOutlined />}
                  formatter={(value) => formatCurrency(value as number)}
                  valueStyle={{ color: '#FFC107', fontWeight: 700 }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card stat-card-info">
                <Statistic
                  title="Growth Rate"
                  value={reportData.summary.growthRate}
                  prefix={<RiseOutlined />}
                  suffix="%"
                  precision={2}
                  valueStyle={{
                    color: reportData.summary.growthRate >= 0 ? '#28A745' : '#DC3545',
                    fontWeight: 700,
                  }}
                />
              </Card>
            </Col>
          </Row>

          {/* Top Performer */}
          <Card className="top-performer-card">
            <div className="top-performer-content">
              <TrophyOutlined className="trophy-icon" />
              <div>
                <div className="top-performer-label">Top Performer</div>
                <div className="top-performer-value">{reportData.summary.topPerformer}</div>
              </div>
            </div>
          </Card>

          {/* Chart */}
          <ReportChart data={reportData.chartData} loading={loading} />

          {/* Table */}
          <ReportTable
            data={reportData.items}
            loading={loading}
            dimension={currentFilter.dimension}
          />
        </>
      )}

      {/* Loading State */}
      {loading && !reportData && (
        <div className="loading-container">
          <Spin size="large" tip="Loading report data..." />
        </div>
      )}

      {/* Empty State */}
      {!loading && !reportData && (
        <Card className="empty-state-card">
          <div className="empty-state">
            <ShoppingCartOutlined className="empty-icon" />
            <h3>No Report Data</h3>
            <p>Configure your report settings and click "Generate Report" to view data</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PurchaseReportPage;
