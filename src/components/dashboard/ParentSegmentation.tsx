import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import SegmentButton from './SegmentButton';
import './ParentSegmentation.css';

export interface ParentSegment {
  notStarted: number;
  slowProgress: number;
  topPerformers: number;
}

export interface ParentSegmentationProps {
  segments: ParentSegment;
}

const ParentSegmentation: React.FC<ParentSegmentationProps> = ({ segments }) => {
  const navigate = useNavigate();

  const handleSegmentClick = (segment: string) => {
    // Navigate to parent list with filter
    navigate(`/parents?segment=${segment}`);
  };

  return (
    <div className="parent-segmentation-section">
      <div className="section-header">
        <h2 className="section-title">Parent Segments</h2>
        <p className="section-description">
          Quick access to parent groups by progress level
        </p>
      </div>

      <Row gutter={[16, 16]} className="segment-buttons-row">
        <Col xs={24} sm={24} md={8}>
          <SegmentButton
            icon="🔴"
            count={segments.notStarted}
            label="Not Started"
            description="0% progress"
            gradient="linear-gradient(135deg, #DC3545 0%, #C82333 100%)"
            onClick={() => handleSegmentClick('not-started')}
          />
        </Col>

        <Col xs={24} sm={24} md={8}>
          <SegmentButton
            icon="🟡"
            count={segments.slowProgress}
            label="Slow Progress"
            description="<50% in 14 days"
            gradient="linear-gradient(135deg, #FFC107 0%, #E0A800 100%)"
            onClick={() => handleSegmentClick('slow-progress')}
          />
        </Col>

        <Col xs={24} sm={24} md={8}>
          <SegmentButton
            icon="🟢"
            count={segments.topPerformers}
            label="TOP Performers"
            description="≥80% completion"
            gradient="linear-gradient(135deg, #28A745 0%, #1E7E34 100%)"
            onClick={() => handleSegmentClick('top-performers')}
          />
        </Col>
      </Row>

      <div className="segment-help-text">
        💡 <strong>Pro Tip:</strong> Click on any segment to view and message parents in that category.
        You have <strong>2 messages/week</strong> quota per parent.
      </div>
    </div>
  );
};

export default ParentSegmentation;
