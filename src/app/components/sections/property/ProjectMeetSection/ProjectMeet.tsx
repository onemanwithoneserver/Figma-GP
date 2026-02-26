import React from 'react';
import ContentSection from '../ContentSection';

const ProjectMeetSection: React.FC = () => {
  return (
    <ContentSection title="Project Meet">
      <div className="space-y-3 mb-6">
        <div className="h-32 bg-[#F4F4F4] rounded-[7px] border-2 border-dashed border-[#D1D5DB] flex items-center justify-center shadow-sm">
          <span className="text-[#6B7280] text-sm">📅 Calendar & Contact Area</span>
        </div>
      </div>
    </ContentSection>
  );
};

export default ProjectMeetSection;
