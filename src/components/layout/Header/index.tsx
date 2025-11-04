import { Layout, Avatar, Dropdown, Badge, Button, Space, Typography } from 'antd';
import {
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import './Header.css';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Header = ({ collapsed, onToggle }: HeaderProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu = {
    items: [
      {
        key: 'profile',
        label: t('profile.personalInfo'),
        icon: <UserOutlined />,
        onClick: () => navigate('/profile'),
      },
      {
        key: 'settings',
        label: t('profile.settings'),
        icon: <SettingOutlined />,
      },
      {
        type: 'divider' as const,
      },
      {
        key: 'logout',
        label: t('common.logout'),
        icon: <LogoutOutlined />,
        danger: true,
        onClick: handleLogout,
      },
    ],
  };

  return (
    <AntHeader className="app-header">
      <div className="header-left">
        {onToggle && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggle}
            className="header-trigger"
          />
        )}
      </div>

      <div className="header-right">
        <Space size="large">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Notifications */}
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: 'Bạn có 3 tin nhắn mới',
                },
                {
                  key: '2',
                  label: 'Lớp Toán lớp 5 cần phản hồi',
                },
              ],
            }}
            trigger={['click']}
          >
            <Badge count={5} size="small">
              <Button
                type="text"
                icon={<BellOutlined />}
                className="header-icon-btn"
              />
            </Badge>
          </Dropdown>

          {/* User Menu */}
          <Dropdown menu={userMenu} trigger={['click']}>
            <Space className="header-user" style={{ cursor: 'pointer' }}>
              <Avatar
                src={user?.avatarUrl}
                icon={<UserOutlined />}
                size="small"
              />
              <Text strong>{user?.fullName || 'User'}</Text>
            </Space>
          </Dropdown>
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;

