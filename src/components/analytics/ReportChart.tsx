import React, { useState } from 'react';
import { Card, Radio, Empty } from 'antd';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { ChartDataPoint, ChartType } from '@/types/analytics.types';
import './ReportChart.css';

interface ReportChartProps {
  data: ChartDataPoint[];
  loading?: boolean;
}

const COLORS = ['#0066CC', '#28A745', '#FFC107', '#DC3545', '#4ECDC4', '#9C27B0', '#FF9800'];

const ReportChart: React.FC<ReportChartProps> = ({ data, loading = false }) => {
  const [chartType, setChartType] = useState<ChartType>('bar');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const renderChart = () => {
    if (!data || data.length === 0) {
      return <Empty description="No data to display" />;
    }

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="revenue" fill="#0066CC" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0066CC"
                strokeWidth={3}
                name="Revenue"
                dot={{ fill: '#0066CC', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#0066CC"
                fill="#4DA3FF"
                fillOpacity={0.6}
                name="Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="revenue"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card
      className="report-chart-card"
      title="Visual Analytics"
      extra={
        <Radio.Group
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="bar">Bar</Radio.Button>
          <Radio.Button value="line">Line</Radio.Button>
          <Radio.Button value="area">Area</Radio.Button>
          <Radio.Button value="pie">Pie</Radio.Button>
        </Radio.Group>
      }
    >
      <div className="report-chart-container">
        {loading ? <Empty description="Loading chart..." /> : renderChart()}
      </div>
    </Card>
  );
};

export default ReportChart;
