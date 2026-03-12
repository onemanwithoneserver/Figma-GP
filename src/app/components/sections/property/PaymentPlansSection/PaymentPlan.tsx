import React, { useEffect, useRef, useState } from 'react';

import BankingPartners from './BankingPartners';
import Cost from './Cost';
import Offers from './Offers';
import PaymentSchedule from './PaymentSchedule';
import Sellers from './Sellers';

const TABS = [
  { id: 'offers', label: 'Offers' },
  { id: 'cost', label: 'Cost' },
  { id: 'sellers', label: 'Sellers' },
  { id: 'banking', label: 'Banking' },
  { id: 'schedule', label: 'Schedule' },
];

const PaymentPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('cost');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
  };

  useEffect(() => {
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
    switch (activeTab) {
      case 'cost':
        return <Cost />;
      case 'offers':
        return <Offers />;
      case 'sellers':
        return <Sellers />;
      case 'banking':
        return <BankingPartners />;
      case 'schedule':
        return <PaymentSchedule />;
      default:
        return <Cost />;
    }
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
          aria-label="Payment section navigation"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={(e) => handleTabClick(tab.id, e)}
                className="flex-shrink-0 flex items-center justify-center px-4 py-2 text-[12px] leading-none font-semibold rounded-[4px] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#E76F26]/25"
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

      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        className={`bg-white overflow-hidden transition-all duration-300${['cost', 'schedule'].includes(activeTab) ? ' min-h-[320px]' : ''}`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default PaymentPlan;
