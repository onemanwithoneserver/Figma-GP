import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'overview-highlights', label: 'Overview & Highlights' },
  { id: 'project-timeline',    label: 'Project Timeline'      },
  { id: 'layout-towers',       label: 'Layout & Towers'       },
  { id: 'configurations',      label: 'Configurations'        },
  { id: 'distance-commute',    label: 'Distance / Commute'    },
  { id: 'amenities',           label: 'Amenities'             },
  { id: 'specifications',      label: 'Specifications'        },
  { id: 'payment-plans',       label: 'Payment Plans'         },
  { id: 'project-files',       label: 'Project Files'         },
  { id: 'exit-summary',        label: 'Exit Summary'          },
  { id: 'project-meet',        label: 'Project Meet'          },
];

const HorizontalTabNavigation: React.FC = () => {
  const navRef             = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs            = useRef<Record<string, HTMLButtonElement | null>>({});
  const clickScrollingRef  = useRef(false);
  const unlockTimerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeTab,       setActiveTab]      = useState<string>(TABS[0].id);
  const [showLeftArrow,   setShowLeftArrow]  = useState(false);
  const [showRightArrow,  setShowRightArrow] = useState(false);

  const syncArrows = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setShowLeftArrow(scrollLeft > 4);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  const centerTab = useCallback((tabId: string) => {
    const btn       = tabRefs.current[tabId];
    const container = scrollContainerRef.current;
    if (!btn || !container) return;

    const target = btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
    container.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, []);

  useEffect(() => {
    centerTab(activeTab);
  }, [activeTab, centerTab]);

  useEffect(() => {
    syncArrows();
    window.addEventListener('resize', syncArrows);

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickScrollingRef.current) return;
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (intersecting.length > 0) {
          setActiveTab(intersecting[0].target.id);
        }
      },
      { rootMargin: '-56px 0px -55% 0px', threshold: 0 }
    );

    TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncArrows);
    };
  }, [syncArrows]);

  const handleTabClick = useCallback((tabId: string) => {
    const section = document.getElementById(tabId);
    if (!section) return;

    setActiveTab(tabId);
    clickScrollingRef.current = true;
    if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);

    const navHeight = navRef.current?.getBoundingClientRect().height ?? 56;
    const targetY = section.getBoundingClientRect().top + window.scrollY - navHeight - 8;

    window.scrollTo({ top: targetY, behavior: 'smooth' });

    const unlock = () => { clickScrollingRef.current = false; };
    if ('onscrollend' in window) {
      window.addEventListener('scrollend', unlock, { once: true });
    } else {
      unlockTimerRef.current = setTimeout(unlock, 1200);
    }
  }, []);

  const manualScroll = useCallback((direction: 'left' | 'right') => {
    scrollContainerRef.current?.scrollBy({
      left: direction === 'left' ? -200 : 200,
      behavior: 'smooth',
    });
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Property sections"
      className="w-full bg-[#F9F7F2] border-b border-[#E5DFD4] font-['Outfit']"
    >
      <div className="max-w-[1200px] mx-auto flex items-center">
        <div className="w-8 flex-shrink-0 flex justify-center">
          {showLeftArrow && (
            <button
              onClick={() => manualScroll('left')}
              className="flex items-center justify-center outline-none"
            >
              <ChevronLeft 
                className="w-6 h-6 text-[#6B5E57] hover:text-[#F85B01] hover:scale-105 transition-all duration-300" 
                strokeWidth={2.5} 
              />
            </button>
          )}
        </div>

        <div
          ref={scrollContainerRef}
          role="tablist"
          onScroll={syncArrows}
          className="flex-1 flex items-center gap-2 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            
            // Hide the active tab from the scrollable list
            if (isActive) return null;

            return (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[tab.id] = el; }}
                onClick={() => handleTabClick(tab.id)}
                className="group flex flex-col items-center justify-center flex-shrink-0 px-4 py-1 gap-1.5 transition-all duration-300 outline-none"
              >
                <span className="text-[15px] font-medium text-[#6B5E57] whitespace-nowrap group-hover:text-[#322822] transition-colors duration-300">
                  {tab.label}
                </span>
                <div className="h-[2px] w-full bg-[#E5DFD4] group-hover:bg-[#F85B01] transition-colors duration-300" />
              </button>
            );
          })}
        </div>

        <div className="w-8 flex-shrink-0 flex justify-center">
          {showRightArrow && (
            <button
              onClick={() => manualScroll('right')}
              className="flex items-center justify-center outline-none"
            >
              <ChevronRight 
                className="w-6 h-6 text-[#6B5E57] hover:text-[#F85B01] hover:scale-105 transition-all duration-300" 
                strokeWidth={2.5} 
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HorizontalTabNavigation;