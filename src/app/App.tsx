import React, { useState, useMemo } from 'react';
import HeroSection from './components/sections/property/HeroSection';
import HorizontalTabNavigation from './components/sections/property/HorizontalTabNavigation';
import TabNavigation from './components/sections/property/Overview&Highlight/TabNavigation';
import Overview from './components/sections/property/Overview&Highlight/Overview';
import Highlights from './components/sections/property/Overview&Highlight/Highlights';
import ProjectTimelineSection from './components/sections/property/ProjectTimelineSection/ProjectTimeline';
import LandTNavigation, { TabId } from './components/sections/property/Layout&Towers/LandTNavigation';
import Layout from './components/sections/property/Layout&Towers/Layout';
import TowerA from './components/sections/property/Layout&Towers/TowerA';
import TowerB from './components/sections/property/Layout&Towers/TowerB';
import TowerC from './components/sections/property/Layout&Towers/TowerC';
import ShowcaseTower from './components/sections/property/Layout&Towers/ShowcaseTower'; 

// --- Integrated Components ---
import Configuration from './components/sections/property/Configurations & Unit Variants/configuration';
import TowerDropdown from './components/sections/property/Configurations & Unit Variants/TowerDropdown';
import { mockData } from './components/sections/property/Configurations & Unit Variants/data';
import InteractiveCommuteWidget from './components/sections/property/DistanceCommuteSection/InteractiveCommute';
import AmenitiesSection from './components/sections/property/AmenitiesSection';
import SpecificationsSection from './components/sections/property/SpecificationsSection';
import PaymentPlan from './components/sections/property/PaymentPlansSection/PaymentPlan';
import ProjectFilesSection from './components/sections/property/ProjectFilesSection';
import ExitSummarySection from './components/sections/property/ExitSummarySection';

// UPDATED: Pointing to the new Navigation-based Meet Section
import PropertyMeetNav from './components/sections/property/ProjectMeetSection/PropertyMeetNav';

import ContentSection from './components/sections/property/ContentSection';
import FooterNav from './components/sections/property/FooterNav';

function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'highlights'>('overview');
  const [layoutTab, setLayoutTab] = useState<TabId>('layout');
  const [selectedTower, setSelectedTower] = useState('All Towers');
  const availableTowers = useMemo(() => {
    const towers = new Set(mockData.map((item: { tower: string }) => item.tower));
    return ['All Towers', ...Array.from(towers).sort()];
  }, []);

  return (
    <div className="min-h-screen bg-[#EFECE5]">
      <div className="overflow-x-clip max-w-[390px] mx-auto pb-18 min-h-screen flex flex-col gap-[4px]">

        {/* Hero */}
        <div id="hero" className="bg-white">
          <HeroSection />
        </div>

        {/* Sticky Tab Bar */}
        <div id="tab-nav" className="bg-white sticky top-0 z-40">
          <HorizontalTabNavigation />
        </div>

        {/* 1. Overview & Highlights */}
        <div id="overview-highlights" className="bg-white px-3 pb-4">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="pt-2">
            {activeTab === 'overview' ? <Overview /> : <Highlights />}
          </div>
        </div>

        {/* 2. Project Timeline */}
        <div id="project-timeline" className="bg-white">
          <ProjectTimelineSection />
        </div>

        {/* 3. Layout & Towers */}
        <div id="layout-towers" className="bg-white">
          <ContentSection title="Layout &amp; Towers">
            <div className="px-4 pb-4">
              <LandTNavigation activeTab={layoutTab} onTabChange={setLayoutTab} />
              <div className="mt-3 transition-all duration-300 ease-in-out">
                {layoutTab === 'layout' && <Layout />}
                {layoutTab === 'towerA' && <TowerA />}
                {layoutTab === 'towerB' && <TowerB />}
                {layoutTab === 'towerC' && <TowerC />}
                {['D', 'E', 'F', 'G', 'H'].map((t) => (
                  layoutTab === `tower${t}` && <ShowcaseTower key={t} towerName={t} dummyName="Upcoming" />
                ))}
              </div>
            </div>
          </ContentSection>
        </div>

        {/* 4. Configurations */}
        <div id="configurations" className="bg-white">
          <ContentSection
            title="Configurations"
            action={
              <TowerDropdown
                towers={availableTowers}
                selected={selectedTower}
                onSelect={setSelectedTower}
              />
            }
          >
            <div className="px-4 pb-4">
              <Configuration selectedTower={selectedTower} />
            </div>
          </ContentSection>
        </div>

        {/* 5. Distance & Commute */}
        <div id="distance-commute" className="bg-white">
          <ContentSection title="Distance / Commute To">
            <div className="px-4 pb-4">
              <InteractiveCommuteWidget />
            </div>
          </ContentSection>
        </div>

        {/* 6. Amenities */}
        <div id="amenities" className="bg-white">
          <ContentSection title="Amenities">
            <AmenitiesSection />
          </ContentSection>
        </div>

        {/* 7. Specifications */}
        <div id="specifications" className="bg-white">
          <ContentSection title="Specifications">
            <SpecificationsSection />
          </ContentSection>
        </div>

        {/* 8. Payment Plans */}
        <div id="payment-plans" className="bg-white">
          <ContentSection title="Payment Plans & Offers">
            <PaymentPlan />
          </ContentSection>
        </div>

        {/* 9. Project Files */}
        <div id="project-files" className="bg-white">
          <ContentSection
            title="Project Files"
            action={
              <button
                className="group flex items-center text-[11px] font-bold text-[#F85B01] hover:text-white rounded-[7px] bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-100 hover:from-[#F85B01] hover:to-[#E05000] hover:border-[#F85B01] transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                title="Download all files"
              >
                <svg className="transition-transform duration-200 group-hover:-translate-y-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download All
              </button>
            }
          >
            <ProjectFilesSection />
          </ContentSection>
        </div>

        {/* 10. Exit Summary */}
        <div id="exit-summary" className="bg-white px-4 py-4">
          <ExitSummarySection />
        </div>

        {/* 11. Project Meet */}
        <div id="project-meet" className="bg-white">
          <ContentSection title="Project Meet">
            <PropertyMeetNav />
          </ContentSection>
        </div>

        <FooterNav />
      </div>
    </div>
  );
}

export default App;