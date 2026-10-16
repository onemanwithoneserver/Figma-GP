import React from 'react';
import ContentSection from '../../03_shared/01_components/ContentSection';
import TimelineView from './TimelineView';

const ProjectTimeline: React.FC = () => {
  return (
    <ContentSection title="Project Progress">
      <div className="w-full flex flex-col px-4 pb-4">
        <div className="w-full relative h-auto">
          <TimelineView />
        </div>
      </div>
    </ContentSection>
  );
};

export default ProjectTimeline;