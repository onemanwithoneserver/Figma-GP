import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  sectionId: string;
}

const TABS: TabItem[] = [
  { id: 'overview-highlights', label: 'Overview & Highlights', sectionId: 'overview-highlights' },
  { id: 'project-timeline',    label: 'Project Timeline',     sectionId: 'project-timeline'    },
  { id: 'layout-towers',       label: 'Layout & Towers',      sectionId: 'layout-towers'       },
  { id: 'configurations',      label: 'Configurations',       sectionId: 'configurations'      },
  { id: 'distance-commute',    label: 'Distance / Commute',   sectionId: 'distance-commute'    },
  { id: 'amenities',           label: 'Amenities',            sectionId: 'amenities'           },
  { id: 'specifications',      label: 'Specifications',       sectionId: 'specifications'      },
  { id: 'payment-plans',       label: 'Payment Plans',        sectionId: 'payment-plans'       },
  { id: 'project-files',       label: 'Project Files',        sectionId: 'project-files'       },
  { id: 'exit-summary',        label: 'Exit Summary',         sectionId: 'exit-summary'        },
  { id: 'project-meet',        label: 'Project Meet',         sectionId: 'project-meet'        },
];

const OBSERVED_SECTIONS = [
  'overview-highlights',
  'project-timeline',
  'layout-towers',
  'configurations',
  'distance-commute',
  'amenities',
  'specifications',
  'payment-plans',
  'project-files',
  'exit-summary',
  'project-meet',
] as const;

const HorizontalTabNavigation: React.FC = () => {
  const navRef             = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs            = useRef<Record<string, HTMLButtonElement | null>>({});
  const clickScrollingRef  = useRef(false);
  const unlockTimerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeTab,       setActiveTab]      = useState<string>(TABS[0].id);
  const [showLeftArrow,   setShowLeftArrow]  = useState(false);
  const [showRightArrow,  setShowRightArrow] = useState(false);
  const [isBarVisible,    setIsBarVisible]   = useState(false);

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
    const updateBarVisibility = () => {
      const nextSection = document.getElementById('project-timeline');
      if (!nextSection) {
        setIsBarVisible(false);
        return;
      }

      const navHeight = navRef.current?.getBoundingClientRect().height ?? 56;
      const revealAtY = nextSection.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      setIsBarVisible(window.scrollY >= revealAtY);
    };

    updateBarVisibility();
    window.addEventListener('scroll', updateBarVisibility, { passive: true });
    window.addEventListener('resize', updateBarVisibility);

    return () => {
      window.removeEventListener('scroll', updateBarVisibility);
      window.removeEventListener('resize', updateBarVisibility);
    };
  }, []);

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
          const sectionId = intersecting[0].target.id;
          setActiveTab(sectionId);
        }
      },
      { rootMargin: '-56px 0px -55% 0px', threshold: 0 }
    );

    OBSERVED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncArrows);
    };
  }, [syncArrows]);

  const handleTabClick = useCallback((tab: TabItem) => {
    const section = document.getElementById(tab.sectionId);
    if (!section) return;

    setActiveTab(tab.id);
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
      className={`w-full bg-[#F9F7F2] font-['Outfit'] overflow-hidden transition-all duration-300 ${
        isBarVisible
          ? 'max-h-20 opacity-100 translate-y-0 pointer-events-auto border-b border-[#E5DFD4]'
          : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center">
        <div className="w-8 flex-shrink-0 flex justify-center">
          {showLeftArrow && (
            <button
              onClick={() => manualScroll('left')}
              aria-label="Scroll tabs left"
              title="Scroll tabs left"
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
                onClick={() => handleTabClick(tab)}
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
              aria-label="Scroll tabs right"
              title="Scroll tabs right"
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