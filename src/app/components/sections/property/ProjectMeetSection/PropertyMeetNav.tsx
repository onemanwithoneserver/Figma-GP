import React from 'react';
import SlotBooking from './SlotBooking';

// Define the tabs for the meet navigation
const MEET_TABS = [
  { id: 'direct-site-visit', label: 'Direct Site Visit' },
  { id: 'online-visit', label: 'Online Visit' },
];

const PropertyMeetNav: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('consultation');
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
  };

  React.useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    updateScrollButtons();
    node.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      node.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const handleTabClick = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(id);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    requestAnimationFrame(updateScrollButtons);
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -140 : 140, behavior: 'smooth' });
  };

  const renderContent = () => {
    // Show SlotBooking for all tabs as placeholder
    return <SlotBooking />;
  };

  return (
    <div className="font-['Outfit',_sans-serif] bg-white">
      <div className="relative">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollTabs('left')}
            aria-label="Scroll tabs left"
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-[4px] bg-[#F3EEE6] text-[#322822] flex items-center justify-center"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide gap-2 px-2 pt-2 pb-1.5 bg-white"
          role="tablist"
          aria-label="Project Meet section navigation"
        >
          {MEET_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive ? 'true' : 'false'}
                aria-controls={`panel-${tab.id}`}
                onClick={(e) => handleTabClick(tab.id, e)}
                  className="flex-shrink-0 flex items-center justify-center px-4 py-2 text-[14px] leading-none font-semibold rounded-[5px] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#E76F26]/25 h-10 min-w-[120px] m-[1px]"
                style={isActive ? { background: '#E76F26', color: '#FFFFFF' } : { background: '#F3EEE6', color: '#322822' }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollTabs('right')}
            aria-label="Scroll tabs right"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-[4px] bg-[#F3EEE6] text-[#322822] flex items-center justify-center"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      <div id={`panel-${activeTab}`} role="tabpanel" className="bg-white overflow-hidden transition-all duration-300">
        {renderContent()}
      </div>
    </div>
  );
};

export default PropertyMeetNav;