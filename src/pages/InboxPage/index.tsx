import React, { useState, useEffect } from 'react';
import { Card, Tabs, Statistic, Row, Col, message, Spin } from 'antd';
import { InboxOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import TicketList from '@/components/inbox/TicketList';
import TicketDetail from '@/components/inbox/TicketDetail';
import inboxService from '@/services/inbox.service';
import type { Ticket, TicketFilter, TicketStatus, TicketPriority, TicketCategory } from '@/types/inbox.types';
import './index.css';

const { TabPane } = Tabs;

const InboxPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [ticketsCount, setTicketsCount] = useState({
    new: 0,
    in_progress: 0,
    resolved: 0,
    closed: 0,
    total: 0,
  });
  const [filters, setFilters] = useState<TicketFilter>({});

  useEffect(() => {
    loadTickets();
    loadTicketsCount();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tickets, activeTab, filters]);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const data = await inboxService.getTickets();
      setTickets(data);
    } catch (error) {
      message.error('Không thể tải danh sách ticket');
    } finally {
      setLoading(false);
    }
  };

  const loadTicketsCount = async () => {
    try {
      const count = await inboxService.getTicketsCount();
      setTicketsCount(count);
    } catch (error) {
      console.error('Failed to load tickets count:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...tickets];

    // Apply tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter((t) => t.status === activeTab);
    }

    // Apply other filters
    if (filters.status) {
      filtered = filtered.filter((t) => t.status === filters.status);
    }
    if (filters.priority) {
      filtered = filtered.filter((t) => t.priority === filters.priority);
    }
    if (filters.category) {
      filtered = filtered.filter((t) => t.category === filters.category);
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.subject.toLowerCase().includes(term) ||
          t.content.toLowerCase().includes(term) ||
          t.from.toLowerCase().includes(term)
      );
    }

    setFilteredTickets(filtered);
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
    setSelectedTicket(null);
  };

  const handleUpdate = () => {
    loadTickets();
    loadTicketsCount();
  };

  const handleSearch = (term: string) => {
    setFilters({ ...filters, searchTerm: term });
  };

  const handleFilterChange = (newFilters: {
    status?: TicketStatus;
    priority?: TicketPriority;
    category?: TicketCategory;
  }) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="inbox-page">
      {/* Page Header */}
      <div className="inbox-page-header">
        <div>
          <h1 className="inbox-page-title">Hộp thư hỗ trợ</h1>
          <p className="inbox-page-description">Quản lý và phản hồi các yêu cầu hỗ trợ từ phụ huynh</p>
        </div>
      </div>

      {/* Statistics */}
      <Row gutter={[16, 16]} className="inbox-stats">
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card stat-new">
            <Statistic
              title="Ticket mới"
              value={ticketsCount.new}
              prefix={<InboxOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card stat-in-progress">
            <Statistic
              title="Đang xử lý"
              value={ticketsCount.in_progress}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card stat-resolved">
            <Statistic
              title="Đã giải quyết"
              value={ticketsCount.resolved}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card stat-closed">
            <Statistic
              title="Đã đóng"
              value={ticketsCount.closed}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#8c8c8c' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tickets Tabs */}
      <Card className="inbox-tabs-card">
        <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
          <TabPane tab={`Tất cả (${ticketsCount.total})`} key="all" />
          <TabPane tab={`Mới (${ticketsCount.new})`} key="new" />
          <TabPane tab={`Đang xử lý (${ticketsCount.in_progress})`} key="in_progress" />
          <TabPane tab={`Đã giải quyết (${ticketsCount.resolved})`} key="resolved" />
          <TabPane tab={`Đã đóng (${ticketsCount.closed})`} key="closed" />
        </Tabs>

        {loading ? (
          <div className="inbox-loading">
            <Spin size="large" tip="Đang tải tickets..." />
          </div>
        ) : (
          <TicketList
            tickets={filteredTickets}
            loading={loading}
            onTicketClick={handleTicketClick}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
        )}
      </Card>

      {/* Ticket Detail Drawer */}
      <TicketDetail
        ticket={selectedTicket}
        open={detailOpen}
        onClose={handleDetailClose}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default InboxPage;
