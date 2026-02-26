import React from 'react';
import ContentSection from '../ContentSection';
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