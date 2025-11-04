import { Card } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './SegmentButton.css';

export interface SegmentButtonProps {
  icon: string;
  count: number;
  label: string;
  description: string;
  gradient: string;
  onClick: () => void;
}

const SegmentButton: React.FC<SegmentButtonProps> = ({
  icon,
  count,
  label,
  description,
  gradient,
  onClick,
}) => {
  return (
    <Card
      className="segment-button"
      style={{ background: gradient }}
      onClick={onClick}
      hoverable
    >
      <div className="segment-button-content">
        <div className="segment-icon">{icon}</div>
        <div className="segment-count">{count}</div>
        <div className="segment-label">{label}</div>
        <div className="segment-description">{description}</div>
        <div className="segment-arrow">
          <ArrowRightOutlined />
        </div>
      </div>
    </Card>
  );
};

export default SegmentButton;
