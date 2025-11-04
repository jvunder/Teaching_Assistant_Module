import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  TeamOutlined,
  MessageOutlined,
  FileTextOutlined,
  BarChartOutlined,
  InboxOutlined,
  UserOutlined,
  RobotOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './Sidebar.css';

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: 'ai-features',
    icon: <RobotOutlined />,
    label: 'Tính năng AI',
    children: [
      {
        key: '/ai-lesson-plan',
        icon: <BulbOutlined />,
        label: 'Tạo giáo án AI',
      },
      {
        key: '/ai-message-suggestion',
        icon: <MessageOutlined />,
        label: 'Gợi ý tin nhắn AI',
      },
    ],
  },
  {
    key: '/classes',
    icon: <TeamOutlined />,
    label: 'Quản lý lớp học',
  },
  {
    key: '/messaging',
    icon: <MessageOutlined />,
    label: 'Tin nhắn',
  },
  {
    key: '/content',
    icon: <FileTextOutlined />,
    label: 'Nội dung',
  },
  {
    key: '/analytics',
    icon: <BarChartOutlined />,
    label: 'Phân tích',
  },
  {
    key: '/inbox',
    icon: <InboxOutlined />,
    label: 'Hộp thư hỗ trợ',
  },
  {
    key: '/profile',
    icon: <UserOutlined />,
    label: 'Hồ sơ',
  },
];

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

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



