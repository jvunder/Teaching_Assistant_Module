import type {
  Ticket,
  TicketReply,
  CannedResponse,
  TicketFilter,
  TicketSLA,
  AssignTicketRequest,
  CloseTicketRequest,
  ReplyTicketRequest,
} from '@/types/inbox.types';

// Mock data for canned responses
const mockCannedResponses: CannedResponse[] = [
  {
    id: '1',
    title: 'Welcome Response',
    content: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ xử lý yêu cầu của bạn sớm nhất có thể.',
    category: 'general',
    tags: ['welcome', 'general'],
  },
  {
    id: '2',
    title: 'Escalation Notice',
    content: 'Vấn đề này đã được ghi nhận và sẽ được chuyển đến bộ phận liên quan để xử lý chi tiết hơn.',
    category: 'escalation',
    tags: ['escalation', 'transfer'],
  },
  {
    id: '3',
    title: 'Apology Message',
    content: 'Xin lỗi vì sự bất tiện. Chúng tôi đang tích cực xử lý vấn đề này và sẽ thông báo kết quả sớm nhất.',
    category: 'apology',
    tags: ['apology', 'delay'],
  },
  {
    id: '4',
    title: 'Schedule Information',
    content: 'Thông tin lịch học đã được cập nhật. Vui lòng kiểm tra lại trong hệ thống.',
    category: 'schedule',
    tags: ['schedule', 'information'],
  },
  {
    id: '5',
    title: 'Grade Information',
    content: 'Điểm số đã được cập nhật. Bạn có thể xem chi tiết trong phần báo cáo học tập.',
    category: 'grade',
    tags: ['grade', 'information'],
  },
];

// Mock data for tickets
const mockTickets: Ticket[] = [
  {
    id: '1',
    subject: 'Hỏi về lịch học bù sau Tết',
    content: 'Em muốn hỏi về lịch học bù sau kỳ nghỉ Tết Nguyên Đán. Lớp em sẽ học bù vào thứ mấy ạ?',
    status: 'new',
    priority: 'high',
    category: 'schedule',
    from: 'Phụ huynh Nguyễn Văn A',
    fromEmail: 'nguyenvana@email.com',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    tags: ['schedule', 'makeup-class'],
  },
  {
    id: '2',
    subject: 'Yêu cầu xem điểm kiểm tra giữa kỳ',
    content: 'Tôi muốn xem điểm kiểm tra giữa kỳ của con tôi. Hệ thống hiện chưa cập nhật.',
    status: 'in_progress',
    priority: 'medium',
    category: 'grade',
    from: 'Phụ huynh Trần Thị B',
    fromEmail: 'tranthib@email.com',
    assignedTo: 'admin',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    lastReply: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    tags: ['grade', 'midterm'],
  },
  {
    id: '3',
    subject: 'Phản ánh về chất lượng bài giảng',
    content: 'Bài giảng môn Toán tuần trước có vẻ hơi khó hiểu với các em. Mong thầy cô giải thích rõ hơn.',
    status: 'resolved',
    priority: 'low',
    category: 'feedback',
    from: 'Phụ huynh Lê Văn C',
    fromEmail: 'levanc@email.com',
    assignedTo: 'teacher',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastReply: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['feedback', 'teaching'],
  },
  {
    id: '4',
    subject: 'Không thể đăng nhập vào hệ thống',
    content: 'Tôi không thể đăng nhập vào hệ thống. Nó báo lỗi "Invalid credentials".',
    status: 'new',
    priority: 'urgent',
    category: 'technical',
    from: 'Phụ huynh Phạm Thị D',
    fromEmail: 'phamthid@email.com',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    tags: ['technical', 'login', 'urgent'],
  },
  {
    id: '5',
    subject: 'Hỏi về phí học phí tháng 11',
    content: 'Tôi muốn hỏi về học phí tháng 11. Có thay đổi gì không ạ?',
    status: 'in_progress',
    priority: 'medium',
    category: 'payment',
    from: 'Phụ huynh Hoàng Văn E',
    fromEmail: 'hoangvane@email.com',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    lastReply: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
    tags: ['payment', 'tuition'],
  },
];

// Mock data for ticket replies
const mockReplies: Record<string, TicketReply[]> = {
  '2': [
    {
      id: 'r1',
      ticketId: '2',
      content: 'Cảm ơn bạn đã liên hệ. Chúng tôi đang kiểm tra hệ thống điểm.',
      from: 'Admin',
      isStaff: true,
      createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'r2',
      ticketId: '2',
      content: 'Vâng, cảm ơn. Tôi sẽ chờ thông tin.',
      from: 'Trần Thị B',
      isStaff: false,
      createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'r3',
      ticketId: '2',
      content: 'Điểm đã được cập nhật. Vui lòng kiểm tra lại.',
      from: 'Teacher',
      isStaff: true,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
  ],
  '3': [
    {
      id: 'r4',
      ticketId: '3',
      content: 'Cảm ơn phụ huynh đã góp ý. Chúng tôi sẽ điều chỉnh phương pháp giảng dạy phù hợp hơn.',
      from: 'Teacher',
      isStaff: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  '5': [
    {
      id: 'r5',
      ticketId: '5',
      content: 'Học phí tháng 11 không thay đổi. Vui lòng thanh toán trước ngày 10/11.',
      from: 'Admin',
      isStaff: true,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

// Calculate SLA for a ticket
const calculateSLA = (ticket: Ticket): TicketSLA => {
  const createdTime = new Date(ticket.createdAt).getTime();
  const currentTime = Date.now();
  const responseTime = ticket.lastReply
    ? (new Date(ticket.lastReply).getTime() - createdTime) / (1000 * 60)
    : (currentTime - createdTime) / (1000 * 60);

  // SLA targets based on priority
  const slaTargets = {
    urgent: { response: 60, resolution: 240 }, // 1h response, 4h resolution
    high: { response: 120, resolution: 480 }, // 2h response, 8h resolution
    medium: { response: 240, resolution: 1440 }, // 4h response, 24h resolution
    low: { response: 480, resolution: 2880 }, // 8h response, 48h resolution
  };

  const target = slaTargets[ticket.priority];
  const breached = responseTime > target.response;

  let resolutionTime: number | undefined;
  if (ticket.status === 'resolved' || ticket.status === 'closed') {
    resolutionTime = (new Date(ticket.updatedAt).getTime() - createdTime) / (1000 * 60);
  }

  return {
    ticketId: ticket.id,
    responseTime,
    resolutionTime,
    breached,
    targetResponseTime: target.response,
    targetResolutionTime: target.resolution,
  };
};

// Inbox Service
export const inboxService = {
  // Get all tickets
  async getTickets(filter?: TicketFilter): Promise<Ticket[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filtered = [...mockTickets];

    if (filter) {
      if (filter.status) {
        filtered = filtered.filter((t) => t.status === filter.status);
      }
      if (filter.priority) {
        filtered = filtered.filter((t) => t.priority === filter.priority);
      }
      if (filter.category) {
        filtered = filtered.filter((t) => t.category === filter.category);
      }
      if (filter.assignedTo) {
        filtered = filtered.filter((t) => t.assignedTo === filter.assignedTo);
      }
      if (filter.searchTerm) {
        const term = filter.searchTerm.toLowerCase();
        filtered = filtered.filter(
          (t) =>
            t.subject.toLowerCase().includes(term) ||
            t.content.toLowerCase().includes(term) ||
            t.from.toLowerCase().includes(term)
        );
      }
      if (filter.fromDate) {
        filtered = filtered.filter((t) => t.createdAt >= filter.fromDate!);
      }
      if (filter.toDate) {
        filtered = filtered.filter((t) => t.createdAt <= filter.toDate!);
      }
    }

    return filtered;
  },

  // Get ticket by ID
  async getTicketById(id: string): Promise<Ticket | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockTickets.find((t) => t.id === id) || null;
  },

  // Get ticket replies
  async getTicketReplies(ticketId: string): Promise<TicketReply[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockReplies[ticketId] || [];
  },

  // Reply to ticket
  async replyToTicket(request: ReplyTicketRequest): Promise<TicketReply> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newReply: TicketReply = {
      id: `r${Date.now()}`,
      ticketId: request.ticketId,
      content: request.content,
      from: 'Teaching Assistant',
      isStaff: true,
      createdAt: new Date().toISOString(),
    };

    // Update mock data
    if (!mockReplies[request.ticketId]) {
      mockReplies[request.ticketId] = [];
    }
    mockReplies[request.ticketId].push(newReply);

    // Update ticket status
    const ticket = mockTickets.find((t) => t.id === request.ticketId);
    if (ticket) {
      ticket.status = 'in_progress';
      ticket.lastReply = new Date().toISOString();
      ticket.updatedAt = new Date().toISOString();
    }

    return newReply;
  },

  // Assign ticket
  async assignTicket(request: AssignTicketRequest): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const ticket = mockTickets.find((t) => t.id === request.ticketId);
    if (ticket) {
      ticket.assignedTo = request.assignTo;
      ticket.updatedAt = new Date().toISOString();
    }
  },

  // Close ticket
  async closeTicket(request: CloseTicketRequest): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const ticket = mockTickets.find((t) => t.id === request.ticketId);
    if (ticket) {
      ticket.status = 'closed';
      ticket.updatedAt = new Date().toISOString();
    }
  },

  // Get canned responses
  async getCannedResponses(): Promise<CannedResponse[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockCannedResponses;
  },

  // Get ticket SLA
  async getTicketSLA(ticketId: string): Promise<TicketSLA | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const ticket = mockTickets.find((t) => t.id === ticketId);
    if (!ticket) return null;

    return calculateSLA(ticket);
  },

  // Get tickets count by status
  async getTicketsCount(): Promise<Record<string, number>> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
      new: mockTickets.filter((t) => t.status === 'new').length,
      in_progress: mockTickets.filter((t) => t.status === 'in_progress').length,
      resolved: mockTickets.filter((t) => t.status === 'resolved').length,
      closed: mockTickets.filter((t) => t.status === 'closed').length,
      total: mockTickets.length,
    };
  },
};

export default inboxService;
