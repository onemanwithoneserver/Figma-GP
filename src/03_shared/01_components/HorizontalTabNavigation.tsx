import { getScrollBehavior } from '../04_motion/useMotionSettings';
import { ActionButton } from '../02_ui/ActionButton';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import ChevronLeft from '@mui/icons-material/ChevronLeftRounded';
import ChevronRight from '@mui/icons-material/ChevronRightRounded';

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
    container.scrollTo({ left: Math.max(0, target), behavior: getScrollBehavior() });
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

    window.scrollTo({ top: targetY, behavior: getScrollBehavior() });

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
      behavior: getScrollBehavior(),
    });
  }, []);

  return (
    <Box component="nav"
      ref={navRef}
      aria-label="Property sections"
      className={`w-full glass !rounded-none !border-x-0 !border-t-0 overflow-hidden transition-all duration-300 ${
        isBarVisible
          ? 'max-h-20 opacity-100 translate-y-0 pointer-events-auto'
          : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none !border-b-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center">
        <div className="w-9 flex-shrink-0 flex justify-center pl-1">
          {showLeftArrow && (
            <ActionButton
              onClick={() => manualScroll('left')}
              aria-label="Scroll tabs left"
              title="Scroll tabs left"
              className="w-7 h-7 rounded-full bg-white text-[#241E1A] shadow-md hover:shadow-lg border border-[#EAE3D9] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 hover:text-[#F85B01] outline-none"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
            </ActionButton>
          )}
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={syncArrows}
          className="flex-1 flex items-center gap-2 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            if (isActive) return null;

            return (
              <ActionButton
                key={tab.id}
                ref={(el) => { tabRefs.current[tab.id] = el; }}
                onClick={() => handleTabClick(tab)}
                className="group flex flex-col items-center justify-center flex-shrink-0 px-4 py-1 gap-1.5 transition-all duration-300 outline-none"
              >
                <span className="text-[15px] font-medium text-ink-muted whitespace-nowrap group-hover:text-ink transition-colors duration-300">
                  {tab.label}
                </span>
                <div className="h-[2px] w-full bg-outline group-hover:bg-brand transition-colors duration-300" />
              </ActionButton>
            );
          })}
        </div>

        <div className="w-9 flex-shrink-0 flex justify-center pr-1">
          {showRightArrow && (
            <ActionButton
              onClick={() => manualScroll('right')}
              aria-label="Scroll tabs right"
              title="Scroll tabs right"
              className="w-7 h-7 rounded-full bg-white text-[#241E1A] shadow-md hover:shadow-lg border border-[#EAE3D9] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 hover:text-[#F85B01] outline-none"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </ActionButton>
          )}
        </div>
      </div>
    </Box>
  );
};

export default HorizontalTabNavigation;
