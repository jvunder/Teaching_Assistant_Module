import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Input,
  Button,
  Space,
  Avatar,
  Typography,
  Upload,
  Modal,
  Spin,
  message as antMessage,
  Badge,
  Divider,
  Empty,
  Tooltip,
} from 'antd';
import {
  SendOutlined,
  PictureOutlined,
  CloseOutlined,
  UserOutlined,
  CheckOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import './ParentCommunication.css';

const { TextArea } = Input;
const { Text } = Typography;

// Message Interface
export interface ConversationMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: 'text' | 'image';
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  isOwn: boolean;
}

// Parent Interface
export interface Parent {
  id: string;
  name: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  lastSeen?: string;
}

// Props Interface
export interface ParentCommunicationProps {
  conversationId: string;
  parent?: Parent;
  onClose?: () => void;
  onMessageSent?: (message: ConversationMessage) => void;
}

const ParentCommunication: React.FC<ParentCommunicationProps> = ({
  conversationId,
  parent,
  onClose,
  onMessageSent,
}) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<UploadFile | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<any>(null);

  // Load conversation messages on mount
  useEffect(() => {
    loadMessages();
    // Optional: Set up WebSocket for real-time updates
    // setupWebSocket();

    return () => {
      // Cleanup WebSocket connection
      // cleanupWebSocket();
    };
  }, [conversationId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load messages from API
  const loadMessages = async () => {
    setLoading(true);
    try {
      // Simulate API call - Replace with actual messagingService call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock messages
      const mockMessages: ConversationMessage[] = [
        {
          id: '1',
          conversationId,
          senderId: parent?.id || '1',
          senderName: parent?.name || 'Phå huynh',
          senderAvatar: parent?.avatarUrl,
          content: 'Xin chào th§y/cô! Con em hÍc bài này có v¥n Á gì không ¡?',
          type: 'text',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: 'read',
          isOwn: false,
        },
        {
          id: '2',
          conversationId,
          senderId: 'teacher',
          senderName: 'Trã gi£ng',
          content: 'Chào phå huynh! Con ang hÍc r¥t tÑt. Em ã hoàn thành 80% bài hÍc.',
          type: 'text',
          timestamp: new Date(Date.now() - 3000000).toISOString(),
          status: 'read',
          isOwn: true,
        },
        {
          id: '3',
          conversationId,
          senderId: parent?.id || '1',
          senderName: parent?.name || 'Phå huynh',
          senderAvatar: parent?.avatarUrl,
          content: 'C£m ¡n th§y/cô! V­y em còn ph§n nào c§n c£i thiÇn không ¡?',
          type: 'text',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          status: 'read',
          isOwn: false,
        },
      ];

      setMessages(mockMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
      antMessage.error('Không thÃ t£i tin nh¯n');
    } finally {
      setLoading(false);
    }
  };

  // Handle sending text or image message
  const handleSendMessage = async () => {
    const content = messageInput.trim();

    if (!content && !uploadedImage) {
      return;
    }

    setSending(true);

    try {
      const newMessage: ConversationMessage = {
        id: Date.now().toString(),
        conversationId,
        senderId: 'teacher',
        senderName: 'Trã gi£ng',
        content: uploadedImage ? '=÷ Hình £nh' : content,
        type: uploadedImage ? 'image' : 'text',
        timestamp: new Date().toISOString(),
        status: 'sending',
        isOwn: true,
      };

      // Optimistically add message to UI
      setMessages(prev => [...prev, newMessage]);
      setMessageInput('');
      setUploadedImage(null);
      setImagePreview(null);

      // Simulate API call - Replace with actual messagingService.sendConversationMessage()
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update message status
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );

      // Simulate delivery
      setTimeout(() => {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
          )
        );
      }, 500);

      // Callback
      if (onMessageSent) {
        onMessageSent(newMessage);
      }

      antMessage.success('Tin nh¯n ã °ãc gíi');
    } catch (error) {
      console.error('Error sending message:', error);
      antMessage.error('Gíi tin nh¯n th¥t b¡i');

      // Remove failed message
      setMessages(prev => prev.filter(msg => msg.status !== 'sending'));
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      setUploadedImage({
        uid: Date.now().toString(),
        name: file.name,
        status: 'done',
        url: URL.createObjectURL(file),
      } as UploadFile);

      antMessage.success('ã t£i £nh lên');
    } catch (error) {
      console.error('Error uploading image:', error);
      antMessage.error('T£i £nh lên th¥t b¡i');
    } finally {
      setUploading(false);
    }

    return false; // Prevent default upload
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
  };

  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Vëa xong';
    if (diffMins < 60) return `${diffMins} phút tr°Ûc`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} giÝ tr°Ûc`;

    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Render message status icon
  const renderMessageStatus = (status: ConversationMessage['status']) => {
    switch (status) {
      case 'sending':
        return <Spin size="small" />;
      case 'sent':
        return <CheckOutlined className="status-icon" />;
      case 'delivered':
        return <DoubleRightOutlined className="status-icon" />;
      case 'read':
        return <DoubleRightOutlined className="status-icon status-read" />;
      default:
        return null;
    }
  };

  return (
    <Card
      className="parent-communication-card"
      title={
        <div className="chat-header">
          <Space>
            <Avatar
              src={parent?.avatarUrl}
              icon={<UserOutlined />}
              size="large"
            />
            <div className="parent-info">
              <Text strong>{parent?.name || 'Phå huynh'}</Text>
              {parent?.lastSeen && (
                <Text type="secondary" className="last-seen">
                  Ho¡t Ùng {formatTimestamp(parent.lastSeen)}
                </Text>
              )}
            </div>
          </Space>
        </div>
      }
      extra={
        onClose && (
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
          />
        )
      }
    >
      {/* Messages Area */}
      <div className="messages-container">
        {loading ? (
          <div className="loading-container">
            <Spin tip="ang t£i tin nh¯n..." />
          </div>
        ) : messages.length === 0 ? (
          <Empty
            description="Ch°a có tin nh¯n nào"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-item ${msg.isOwn ? 'own-message' : 'other-message'}`}
              >
                {!msg.isOwn && (
                  <Avatar
                    src={msg.senderAvatar}
                    icon={<UserOutlined />}
                    size="small"
                    className="message-avatar"
                  />
                )}
                <div className="message-content">
                  {!msg.isOwn && (
                    <Text type="secondary" className="sender-name">
                      {msg.senderName}
                    </Text>
                  )}
                  <div className="message-bubble">
                    {msg.type === 'image' ? (
                      <div className="message-image">
                        <img src={msg.content} alt="Sent image" />
                      </div>
                    ) : (
                      <Text>{msg.content}</Text>
                    )}
                  </div>
                  <div className="message-meta">
                    <Text type="secondary" className="message-time">
                      {formatTimestamp(msg.timestamp)}
                    </Text>
                    {msg.isOwn && renderMessageStatus(msg.status)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <Divider style={{ margin: '12px 0' }} />

      {/* Image Preview */}
      {imagePreview && (
        <div className="image-preview-container">
          <Badge
            count={
              <Button
                type="primary"
                shape="circle"
                size="small"
                icon={<CloseOutlined />}
                onClick={handleRemoveImage}
                danger
              />
            }
          >
            <img src={imagePreview} alt="Preview" className="image-preview" />
          </Badge>
        </div>
      )}

      {/* Input Area */}
      <div className="input-area">
        <Space.Compact style={{ width: '100%' }}>
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={handleImageUpload}
            disabled={uploading || sending}
          >
            <Tooltip title="Gíi hình £nh">
              <Button
                icon={<PictureOutlined />}
                loading={uploading}
                disabled={sending}
              />
            </Tooltip>
          </Upload>

          <TextArea
            ref={inputRef}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nh­p tin nh¯n... (Enter Ã gíi, Shift+Enter Ã xuÑng dòng)"
            autoSize={{ minRows: 1, maxRows: 4 }}
            disabled={sending}
            style={{ flex: 1 }}
          />

          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            loading={sending}
            disabled={!messageInput.trim() && !uploadedImage}
          >
            Gíi
          </Button>
        </Space.Compact>
      </div>
    </Card>
  );
};

export default ParentCommunication;
