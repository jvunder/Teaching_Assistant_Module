import React from 'react';
import { Select, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const { Option } = Select;

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const handleChange = (value: string) => {
    console.log('Language changing to:', value);
    i18n.changeLanguage(value);
    localStorage.setItem('language', value);
    // Force reload to ensure changes take effect
    window.location.reload();
  };

  return (
    <div className="language-switcher">
      <Space>
        <GlobalOutlined style={{ color: '#333', fontSize: 18 }} />
        <Select
          value={i18n.language}
          onChange={handleChange}
          style={{ width: 140 }}
          bordered={true}
          className="language-select"
          popupMatchSelectWidth={false}
          getPopupContainer={(trigger) => trigger.parentElement || document.body}
        >
          <Option value="vi">
            <span className="flag">🇻🇳</span> Tiếng Việt
          </Option>
          <Option value="zh">
            <span className="flag">🇨🇳</span> 中文
          </Option>
        </Select>
      </Space>
    </div>
  );
};

export default LanguageSwitcher;