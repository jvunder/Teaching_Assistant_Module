import React from 'react';
import { Form, Select, DatePicker, Button, Card, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ReportFilter, ReportDimension, CourseType } from '@/types/analytics.types';
import dayjs from 'dayjs';
import './ReportBuilder.css';

const { RangePicker } = DatePicker;

interface ReportBuilderProps {
  onFilterChange: (filter: ReportFilter) => void;
  loading?: boolean;
}

const ReportBuilder: React.FC<ReportBuilderProps> = ({ onFilterChange, loading = false }) => {
  const [form] = Form.useForm();

  const dimensionOptions = [
    { label: 'By Class', value: 'class' },
    { label: 'By Grade', value: 'grade' },
    { label: 'By School', value: 'school' },
    { label: 'By Province', value: 'province' },
  ];

  const courseTypeOptions = [
    { label: 'All Courses', value: 'all' },
    { label: 'Mathematics', value: 'math' },
    { label: 'English', value: 'english' },
    { label: 'Science', value: 'science' },
    { label: 'Literature', value: 'literature' },
    { label: 'Social Studies', value: 'social' },
  ];

  const handleSubmit = (values: any) => {
    const filter: ReportFilter = {
      dimension: values.dimension as ReportDimension,
      dateRange: {
        startDate: values.dateRange[0].format('YYYY-MM-DD'),
        endDate: values.dateRange[1].format('YYYY-MM-DD'),
      },
      courseType: values.courseType as CourseType,
      searchTerm: values.searchTerm,
    };

    onFilterChange(filter);
  };

  const handleReset = () => {
    form.resetFields();
    // Set default values
    const defaultFilter: ReportFilter = {
      dimension: 'class',
      dateRange: {
        startDate: dayjs().subtract(30, 'days').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
      },
      courseType: 'all',
    };
    onFilterChange(defaultFilter);
  };

  return (
    <Card className="report-builder" title="Report Configuration">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          dimension: 'class',
          courseType: 'all',
          dateRange: [dayjs().subtract(30, 'days'), dayjs()],
        }}
      >
        <div className="report-builder-grid">
          <Form.Item
            label="Report Dimension"
            name="dimension"
            rules={[{ required: true, message: 'Please select a dimension' }]}
          >
            <Select
              options={dimensionOptions}
              placeholder="Select dimension"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Course Type"
            name="courseType"
            rules={[{ required: true, message: 'Please select a course type' }]}
          >
            <Select
              options={courseTypeOptions}
              placeholder="Select course type"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Date Range"
            name="dateRange"
            rules={[{ required: true, message: 'Please select date range' }]}
            className="date-range-field"
          >
            <RangePicker
              size="large"
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </div>

        <Form.Item className="report-builder-actions">
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              size="large"
              loading={loading}
            >
              Generate Report
            </Button>
            <Button
              icon={<ReloadOutlined />}
              size="large"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ReportBuilder;
