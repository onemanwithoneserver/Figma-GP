import React from 'react';

interface ContentSectionProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, action, children }) => {
  return (
    <div className="w-full ">
      <div className="bg-gradient-to-br from-white via-gray-50/50 to-white rounded-[7px] shadow-xl shadow-black/5 border border-gray-100">
        <div className="flex items-center justify-between pt-1 pb-2">
          <h2 className="text-[18px] font-bold text-[#1F2933] drop-shadow-sm px-2">{title}</h2>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default ContentSection;
