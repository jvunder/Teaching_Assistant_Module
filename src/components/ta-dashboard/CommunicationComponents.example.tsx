/**
 * Communication Components Usage Example
 *
 * This file demonstrates how to use the three communication components:
 * - ParentCommunication: Chat interface with a parent
 * - MessagePanel: List of messages with filters
 * - ParentCard: Parent information card
 */

import React, { useState } from 'react';
import { Row, Col, Modal } from 'antd';
import ParentCommunication, { ConversationMessage, Parent } from './ParentCommunication';
import MessagePanel, { Message } from './MessagePanel';
import ParentCard, { ParentDetail } from './ParentCard';

const CommunicationComponentsExample: React.FC = () => {
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);

  // Sample parent data
  const sampleParent: ParentDetail = {
    id: '1',
    name: 'Nguyễn Văn An',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    email: 'nguyenvanan@example.com',
    phone: '0901234567',
    segment: 'top-performers',
    learningProgress: 85,
    coursesEnrolled: 3,
    coursesCompleted: 2,
    lastActive: new Date(Date.now() - 3600000).toISOString(),
    totalMessages: 25,
    unreadMessages: 2,
    totalHours: 45,
    certificates: 2,
    children: [
      { id: 'c1', name: 'Nguyễn Minh Anh', age: 8 },
      { id: 'c2', name: 'Nguyễn Tuấn Kiệt', age: 5 },
    ],
  };

  // Sample messages data
  const sampleMessages: Message[] = [
    {
      id: '1',
      subject: 'Thông báo lịch học tuần tới',
      content: 'Kính gửi quý phụ huynh, lịch học tuần tới sẽ có thay đổi...',
      from: 'Cô Nguyễn Thị Hoa',
      fromAvatar: 'https://i.pravatar.cc/150?img=5',
      to: ['Tất cả phụ huynh'],
      type: 'text',
      status: 'read',
      sentAt: new Date(Date.now() - 86400000).toISOString(),
      category: 'announcement',
      isUnread: false,
      preview: 'Kính gửi quý phụ huynh, lịch học tuần tới sẽ có thay đổi...',
    },
    {
      id: '2',
      subject: 'Nhắc nhở bài tập về nhà',
      content: 'Các em cần hoàn thành bài tập trước thứ 6',
      from: 'Thầy Trần Văn Nam',
      fromAvatar: 'https://i.pravatar.cc/150?img=12',
      to: ['Lớp Tâm lý học đường'],
      type: 'text',
      status: 'delivered',
      sentAt: new Date(Date.now() - 43200000).toISOString(),
      category: 'homework',
      isUnread: true,
      preview: 'Các em cần hoàn thành bài tập trước thứ 6',
    },
    {
      id: '3',
      content: 'Hình ảnh buổi học hôm nay',
      from: 'Cô Lê Thị Mai',
      fromAvatar: 'https://i.pravatar.cc/150?img=9',
      to: ['Lớp Nuôi con bằng tình yêu thương'],
      type: 'image',
      status: 'sent',
      sentAt: new Date(Date.now() - 7200000).toISOString(),
      category: 'general',
      isUnread: false,
      preview: '📷 Hình ảnh',
    },
  ];

  const handleMessageClick = (parent: Parent | ParentDetail) => {
    setSelectedParent(parent);
    setShowChatModal(true);
  };

  const handleViewParent = (parent: Parent | ParentDetail) => {
    console.log('View parent details:', parent);
    // Navigate to parent detail page or show modal
  };

  const handleSelectMessage = (message: Message) => {
    console.log('Selected message:', message);
    // Handle message selection (e.g., open message detail)
  };

  const handleMessageSent = (message: ConversationMessage) => {
    console.log('Message sent:', message);
    // Handle post-send actions (e.g., update message list)
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>Communication Components Demo</h1>

      <Row gutter={[16, 16]}>
        {/* Parent Card Example */}
        <Col xs={24} md={12} lg={8}>
          <h3>1. Parent Card Component</h3>
          <ParentCard
            parent={sampleParent}
            showActions={true}
            onMessageClick={handleMessageClick}
            onViewClick={handleViewParent}
          />
        </Col>

        {/* Parent Card Compact Example */}
        <Col xs={24} md={12} lg={8}>
          <h3>2. Parent Card (Compact)</h3>
          <ParentCard
            parent={sampleParent}
            compact={true}
            onClick={() => console.log('Compact card clicked')}
          />
        </Col>

        {/* Message Panel Example */}
        <Col xs={24} lg={16}>
          <h3>3. Message Panel Component</h3>
          <MessagePanel
            messages={sampleMessages}
            onSelectMessage={handleSelectMessage}
            showActions={true}
          />
        </Col>

        {/* Parent Communication Example (in Modal) */}
        <Modal
          title="Chat với phụ huynh"
          open={showChatModal}
          onCancel={() => setShowChatModal(false)}
          footer={null}
          width={800}
          destroyOnClose
        >
          {selectedParent && (
            <ParentCommunication
              conversationId={`conv-${selectedParent.id}`}
              parent={selectedParent}
              onClose={() => setShowChatModal(false)}
              onMessageSent={handleMessageSent}
            />
          )}
        </Modal>
      </Row>

      <div style={{ marginTop: '32px' }}>
        <h3>Component Features:</h3>
        <ul>
          <li>
            <strong>ParentCommunication:</strong> Real-time chat interface, image upload,
            message status tracking, auto-scroll
          </li>
          <li>
            <strong>MessagePanel:</strong> Message list with search, multiple filters
            (status, type, category), pagination
          </li>
          <li>
            <strong>ParentCard:</strong> Parent info display, segment badges, learning progress,
            quick actions, compact mode
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CommunicationComponentsExample;
