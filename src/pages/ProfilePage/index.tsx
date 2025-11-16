import React, { useState, useEffect } from 'react';
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
  Row,
  Col,
  Tag,
  Select,
  Spin,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  UploadOutlined,
  SettingOutlined,
  TeamOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';
import AssignedClasses from '@/components/profile/AssignedClasses';
import PerformanceMetrics from '@/components/profile/PerformanceMetrics';
import taService from '@/services/ta.service';
import uploadService from '@/services/upload.service';
import type {
  TAProfile,
  AssignedClass,
  PerformanceMetrics as PerformanceMetricsType,
  UserSettings,
} from '@/types/ta.types';
import './index.css';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<TAProfile | null>(null);
  const [assignedClasses, setAssignedClasses] = useState<AssignedClass[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetricsType | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    setLoading(true);
    try {
      const [profileData, classesData, metricsData, settingsData] = await Promise.all([
        taService.getProfile(),
        taService.getAssignedClasses(),
        taService.getPerformanceMetrics(),
        taService.getSettings(),
      ]);

      setProfile(profileData);
      setAssignedClasses(classesData);
      setPerformanceMetrics(metricsData);
      setSettings(settingsData);
      setAvatarUrl(profileData.avatarUrl || '');

      // Update form values
      profileForm.setFieldsValue({
        fullName: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        bio: profileData.bio,
        school: profileData.school,
        department: profileData.department,
      });
    } catch (error) {
      message.error('Không thể tải dữ liệu hồ sơ');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (values: any) => {
    try {
      setLoading(true);
      await taService.updateProfile(values);
      message.success('Cập nhật thông tin thành công');
      await loadProfileData();
    } catch (error) {
      message.error('Cập nhật thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values: any) => {
    try {
      setLoading(true);
      await taService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success('Đổi mật khẩu thành công');
      passwordForm.resetFields();
    } catch (error: any) {
      message.error(error.message || 'Đổi mật khẩu thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (info: any) => {
    const file = info.file.originFileObj || info.file;

    try {
      setUploading(true);
      const response = await uploadService.uploadAvatar(file);
      setAvatarUrl(response.url);
      message.success('Upload ảnh đại diện thành công');
    } catch (error: any) {
      message.error(error.message || 'Upload ảnh đại diện thất bại');
    } finally {
      setUploading(false);
    }
  };

  const handleSettingsChange = async (key: keyof UserSettings, value: any) => {
    if (!settings) return;

    try {
      await taService.updateSettings({ [key]: value });
      setSettings({ ...settings, [key]: value });
      message.success('Cập nhật cài đặt thành công');
    } catch (error) {
      message.error('Cập nhật cài đặt thất bại');
    }
  };

  if (!profile || !settings) {
    return (
      <div className="profile-loading">
        <Spin size="large" tip="Đang tải hồ sơ..." />
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Page Header */}
      <div className="profile-page-header">
        <h1 className="profile-page-title">Hồ sơ cá nhân</h1>
        <p className="profile-page-description">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
      </div>

      <Row gutter={[24, 24]}>
        {/* Left Sidebar - Profile Card */}
        <Col xs={24} lg={6}>
          <Card className="profile-card">
            <div className="profile-avatar-section">
              <Avatar size={120} src={avatarUrl} icon={<UserOutlined />} />
              <Upload
                name="avatar"
                showUploadList={false}
                onChange={handleAvatarUpload}
                beforeUpload={() => false}
                accept="image/*"
              >
                <Button
                  icon={<UploadOutlined />}
                  loading={uploading}
                  style={{ marginTop: 16 }}
                >
                  Đổi ảnh đại diện
                </Button>
              </Upload>

              <div className="profile-user-info">
                <h3>{profile.fullName}</h3>
                <p>{profile.email}</p>
                <Tag color="blue" style={{ marginTop: 8 }}>
                  {profile.role === 'teacher'
                    ? 'Giáo viên'
                    : profile.role === 'assistant'
                    ? 'Trợ giảng'
                    : 'Quản trị viên'}
                </Tag>
              </div>

              {profile.bio && (
                <div className="profile-bio">
                  <Divider />
                  <p>{profile.bio}</p>
                </div>
              )}

              <Divider />

              <div className="profile-stats">
                <div className="profile-stat-item">
                  <TeamOutlined />
                  <div>
                    <strong>{assignedClasses.filter((c) => c.status === 'active').length}</strong>
                    <span>Lớp đang dạy</span>
                  </div>
                </div>
                <div className="profile-stat-item">
                  <TrophyOutlined />
                  <div>
                    <strong>{performanceMetrics?.activityScore.score || 0}</strong>
                    <span>Điểm hoạt động</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Right Content Area - Tabs */}
        <Col xs={24} lg={18}>
          <Card className="profile-tabs-card">
            <Tabs defaultActiveKey="profile" size="large">
              {/* Personal Information Tab */}
              <TabPane tab="Thông tin cá nhân" key="profile" icon={<UserOutlined />}>
                <Form
                  form={profileForm}
                  layout="vertical"
                  onFinish={handleUpdateProfile}
                >
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="fullName"
                        label="Họ và tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" size="large" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Vui lòng nhập email' },
                          { type: 'email', message: 'Email không hợp lệ' },
                        ]}
                      >
                        <Input prefix={<MailOutlined />} placeholder="Nhập email" size="large" disabled />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item name="phone" label="Số điện thoại">
                        <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" size="large" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item name="school" label="Trường">
                        <Input placeholder="Nhập tên trường" size="large" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item name="department" label="Khoa/Bộ môn">
                        <Input placeholder="Nhập khoa/bộ môn" size="large" />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Form.Item name="bio" label="Giới thiệu bản thân">
                        <TextArea rows={4} placeholder="Nhập giới thiệu ngắn về bản thân..." maxLength={500} showCount />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={<SaveOutlined />}
                          loading={loading}
                          size="large"
                        >
                          Lưu thay đổi
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </TabPane>

              {/* Change Password Tab */}
              <TabPane tab="Đổi mật khẩu" key="password" icon={<LockOutlined />}>
                <Form
                  form={passwordForm}
                  layout="vertical"
                  onFinish={handleChangePassword}
                >
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="currentPassword"
                        label="Mật khẩu hiện tại"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
                      >
                        <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu hiện tại" size="large" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}></Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        name="newPassword"
                        label="Mật khẩu mới"
                        rules={[
                          { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                          { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                        ]}
                      >
                        <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu mới" size="large" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        name="confirmPassword"
                        label="Xác nhận mật khẩu"
                        dependencies={['newPassword']}
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
                        <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu mới" size="large" />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={<SaveOutlined />}
                          loading={loading}
                          size="large"
                        >
                          Đổi mật khẩu
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </TabPane>

              {/* Assigned Classes Tab */}
              <TabPane tab="Lớp học" key="classes" icon={<TeamOutlined />}>
                <AssignedClasses classes={assignedClasses} loading={loading} />
              </TabPane>

              {/* Performance Metrics Tab */}
              <TabPane tab="Hiệu suất" key="performance" icon={<TrophyOutlined />}>
                {performanceMetrics && (
                  <PerformanceMetrics metrics={performanceMetrics} loading={loading} />
                )}
              </TabPane>

              {/* Settings Tab */}
              <TabPane tab="Cài đặt" key="settings" icon={<SettingOutlined />}>
                <div className="settings-section">
                  <h3>Thông báo</h3>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div className="setting-item">
                      <div>
                        <strong>Tin nhắn mới</strong>
                        <p>Nhận thông báo khi có tin nhắn mới từ phụ huynh</p>
                      </div>
                      <Switch
                        checked={settings.notifications.messages}
                        onChange={(checked) =>
                          handleSettingsChange('notifications', { ...settings.notifications, messages: checked })
                        }
                      />
                    </div>

                    <Divider />

                    <div className="setting-item">
                      <div>
                        <strong>Ticket mới</strong>
                        <p>Nhận thông báo khi có ticket hỗ trợ mới</p>
                      </div>
                      <Switch
                        checked={settings.notifications.tickets}
                        onChange={(checked) =>
                          handleSettingsChange('notifications', { ...settings.notifications, tickets: checked })
                        }
                      />
                    </div>

                    <Divider />

                    <div className="setting-item">
                      <div>
                        <strong>Thông báo email</strong>
                        <p>Nhận thông báo qua email</p>
                      </div>
                      <Switch
                        checked={settings.notifications.email}
                        onChange={(checked) =>
                          handleSettingsChange('notifications', { ...settings.notifications, email: checked })
                        }
                      />
                    </div>

                    <Divider />

                    <div className="setting-item">
                      <div>
                        <strong>Thông báo push</strong>
                        <p>Nhận thông báo trên trình duyệt</p>
                      </div>
                      <Switch
                        checked={settings.notifications.push}
                        onChange={(checked) =>
                          handleSettingsChange('notifications', { ...settings.notifications, push: checked })
                        }
                      />
                    </div>
                  </Space>

                  <Divider />

                  <h3>Tùy chọn</h3>
                  <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <div className="setting-item">
                      <div>
                        <strong>Ngôn ngữ</strong>
                        <p>Chọn ngôn ngữ hiển thị</p>
                      </div>
                      <Select
                        value={settings.preferences.language}
                        onChange={(value) =>
                          handleSettingsChange('preferences', { ...settings.preferences, language: value })
                        }
                        style={{ width: 150 }}
                      >
                        <Option value="vi">Tiếng Việt</Option>
                        <Option value="en">English</Option>
                      </Select>
                    </div>

                    <div className="setting-item">
                      <div>
                        <strong>Giao diện</strong>
                        <p>Chọn chủ đề hiển thị</p>
                      </div>
                      <Select
                        value={settings.preferences.theme}
                        onChange={(value) =>
                          handleSettingsChange('preferences', { ...settings.preferences, theme: value })
                        }
                        style={{ width: 150 }}
                      >
                        <Option value="light">Sáng</Option>
                        <Option value="dark">Tối</Option>
                        <Option value="auto">Tự động</Option>
                      </Select>
                    </div>
                  </Space>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
