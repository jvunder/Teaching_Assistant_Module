import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  DashboardOutlined,
  TeamOutlined,
  MessageOutlined,
  FileTextOutlined,
  BarChartOutlined,
  InboxOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './Sidebar.css';

type MenuItem = Required<MenuProps>['items'][number];

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: t('menu.dashboard'),
    },
    {
      key: '/classes',
      icon: <TeamOutlined />,
      label: t('menu.classes'),
    },
    {
      key: '/messaging',
      icon: <MessageOutlined />,
      label: t('menu.messaging'),
    },
    {
      key: '/content',
      icon: <FileTextOutlined />,
      label: t('menu.content'),
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: t('menu.analytics'),
    },
    {
      key: '/inbox',
      icon: <InboxOutlined />,
      label: t('menu.inbox'),
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: t('menu.profile'),
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <div className="app-sidebar">
      <div className="sidebar-logo">
        {!collapsed && <span>TA WebApp</span>}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        className="sidebar-menu"
      />
    </div>
  );
};

export default Sidebar;