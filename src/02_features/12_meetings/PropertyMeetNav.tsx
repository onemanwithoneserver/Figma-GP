import { useState } from 'react';
import { SectionTabs } from '../../03_shared/02_ui/SectionTabs';
import SlotBooking from './SlotBooking';

const MEET_TABS = [
  { id: 'direct-site-visit', label: 'Direct Site Visit' },
  { id: 'online-visit', label: 'Online Visit' },
];

export default function PropertyMeetNav() {
  // Preserve the existing unselected visit state until the user chooses a type.
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className="bg-white">
      <SectionTabs items={MEET_TABS} value={activeTab} onChange={setActiveTab}
        label="Project Meet section navigation" idPrefix="meeting"
        tabClassName="text-[14px] rounded-chip h-10 min-w-[120px] m-[1px]" />
      <div id={`meeting-panel-${activeTab || 'booking'}`} role="tabpanel"
        aria-labelledby={activeTab ? `meeting-tab-${activeTab}` : undefined}
        aria-label={activeTab ? undefined : 'Visit booking'}
        className="bg-white overflow-hidden transition-all duration-300">
        <SlotBooking />
      </div>
    </div>
  );
}
