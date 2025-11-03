import { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  Space,
  Tabs,
  Switch,
  Divider,
  message,
  Avatar,
  Typography,
  Row,
  Col,
  Tag,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';
import './ProfilePage.css';

const { TabPane } = Tabs;
const { Title } = Typography;

const ProfilePage = () => {
  const { user } = useAuthStore();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

  const handleUpdateProfile = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success('Cập nhật thông tin thành công');
    } catch (error) {
      message.error('Cập nhật thất bại');
    }
  };

  const handleChangePassword = async (values: any) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        message.error('Mật khẩu xác nhận không khớp');
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success('Đổi mật khẩu thành công');
      passwordForm.resetFields();
    } catch (error) {
      message.error('Đổi mật khẩu thất bại');
    }
  };

  const handleAvatarUpload = (info: any) => {
    // Mock upload
    if (info.file.status === 'done') {
      setAvatarUrl('https://via.placeholder.com/150');
      message.success('Upload ảnh đại diện thành công');
    }
  };

  return (
    <div className="profile-page">
      <Title level={2}>Hồ sơ cá nhân</Title>

      <Card>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={6}>
            <div className="profile-avatar-section">
              <Avatar size={120} src={avatarUrl} icon={<UserOutlined />} />
              <Upload
                name="avatar"
                showUploadList={false}
                onChange={handleAvatarUpload}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />} style={{ marginTop: 16 }}>
                  Đổi ảnh đại diện
                </Button>
              </Upload>
              <div style={{ marginTop: 16 }}>
                <Title level={4}>{user?.fullName || 'User'}</Title>
                <p>{user?.email || ''}</p>
                <Tag color="blue">{user?.role || 'assistant'}</Tag>
              </div>
            </div>
          </Col>

          <Col xs={24} md={18}>
            <Tabs defaultActiveKey="profile">
              <TabPane tab="Thông tin cá nhân" key="profile">
                <Form
                  form={profileForm}
                  layout="vertical"
                  initialValues={{
                    fullName: user?.fullName,
                    email: user?.email,
                    phone: '',
                  }}
                  onFinish={handleUpdateProfile}
                >
                  <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email' },
                      { type: 'email', message: 'Email không hợp lệ' },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Nhập email" disabled />
                  </Form.Item>

                  <Form.Item name="phone" label="Số điện thoại">
                    <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                      Lưu thay đổi
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Đổi mật khẩu" key="password">
                <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword}>
                  <Form.Item
                    name="currentPassword"
                    label="Mật khẩu hiện tại"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu hiện tại" />
                  </Form.Item>

                  <Form.Item
                    name="newPassword"
                    label="Mật khẩu mới"
                    rules={[
                      { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                      { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu mới" />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    rules={[
                      { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu mới" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                      Đổi mật khẩu
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Cài đặt thông báo" key="notifications">
                <div className="notification-settings">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div className="notification-item">
                      <div>
                        <Title level={5}>Tin nhắn mới</Title>
                        <p>Nhận thông báo khi có tin nhắn mới</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Divider />

                    <div className="notification-item">
                      <div>
                        <Title level={5}>Ticket mới</Title>
                        <p>Nhận thông báo khi có ticket hỗ trợ mới</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Divider />

                    <div className="notification-item">
                      <div>
                        <Title level={5}>Thông báo email</Title>
                        <p>Nhận thông báo qua email</p>
                      </div>
                      <Switch />
                    </div>

                    <Divider />

                    <div className="notification-item">
                      <div>
                        <Title level={5}>Thông báo push</Title>
                        <p>Nhận thông báo trên trình duyệt</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Divider />

                    <Button type="primary" icon={<SaveOutlined />}>
                      Lưu cài đặt
                    </Button>
                  </Space>
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProfilePage;
