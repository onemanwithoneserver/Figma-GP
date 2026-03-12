import React, { useState } from 'react';
import HeroSection from './components/sections/property/HeroSection';
import HorizontalTabNavigation from './components/sections/property/HorizontalTabNavigation';
import TabNavigation from './components/sections/property/Overview&Highlight/TabNavigation';
import Overview from './components/sections/property/Overview&Highlight/Overview';
import Highlights from './components/sections/property/Overview&Highlight/Highlights';
import ProjectTimelineSection from './components/sections/property/ProjectTimelineSection/ProjectTimeline';
import LandTNavigation from './components/sections/property/Layout&Towers/LandTNavigation';
import Swipe from './components/sections/property/Layout&Towers/Swipe';
import Layout from './components/sections/property/Layout&Towers/Layout';
import TowerA from './components/sections/property/Layout&Towers/TowerA';
import TowerB from './components/sections/property/Layout&Towers/TowerB';
import TowerC from './components/sections/property/Layout&Towers/TowerC';
import ShowcaseTower from './components/sections/property/Layout&Towers/ShowcaseTower'; 

// --- Integrated Components ---
import Configuration from './components/sections/property/Configurations & Unit Variants/configuration';
import InteractiveCommuteWidget from './components/sections/property/DistanceCommuteSection/InteractiveCommute';
import AmenitiesSection from './components/sections/property/AmenitiesSection/AmenitiesSection';
import SpecificationsSection from './components/sections/property/SpecificationsSection/SpecificationsSection';
import PaymentPlan from './components/sections/property/PaymentPlansSection/PaymentPlan';
import ProjectFilesSection from './components/sections/property/ProjectFilesSection';
import ProjectSummary from './components/sections/property/ExitSummarySection/ProjectSummary';
import Question from './components/sections/property/ExitSummarySection/Question';
import PropertyMeetNav from './components/sections/property/ProjectMeetSection/PropertyMeetNav';
import ContentSection from './components/sections/property/ContentSection';
import FooterNav from './components/sections/property/FooterNav';

import { BackToTopIcon } from './components/ui/BackToTopIcon';
import { Button } from './components/ui/button';

function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'highlights'>('overview');
  const [layoutTab, setLayoutTab] = useState('layout');

  const [showBackToTop, setShowBackToTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLayoutTowerSelect = (towerId: string) => {
    setLayoutTab(towerId);
    requestAnimationFrame(() => {
      document.getElementById('layout-towers')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* relative added to main container */}
      <div className="overflow-x-clip max-w-[390px] mx-auto pb-15 min-h-screen flex flex-col gap-[4px] relative">
        {/* Hero */}
        <div id="hero" className="bg-white">
          <div className="">
            <HeroSection />
          </div>
        </div>

        {/* Sticky Tab Bar */}
        <div id="tab-nav" className="bg-white sticky top-0 z-40">
          <HorizontalTabNavigation />
        </div>

        {/* 1. Overview & Highlights */}
        <div id="overview-highlights" className="bg-white">
          <div className="px-4 pb-2">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="pt-2">
              {activeTab === 'overview' ? <Overview /> : <Highlights />}
            </div>
          </div>
        </div>

        {/* 2. Project Timeline */}
        <div id="project-timeline" className="bg-white">
            <ProjectTimelineSection />
        </div>

        {/* 3. Layout & Towers */}
        <div id="layout-towers" className="bg-white">
          <ContentSection title="Layout & Towers">
            <div className="px-4 pb-2">
              <LandTNavigation activeTab={layoutTab} onTabChange={setLayoutTab} />
              <Swipe activeTab={layoutTab} onTabChange={setLayoutTab} className="mt-1 transition-all duration-300 ease-in-out">
                {layoutTab === 'layout' && <Layout onTowerSelect={handleLayoutTowerSelect} />}
                {layoutTab === 'shlok' && <TowerA />}
                {layoutTab === 'ayush' && <TowerB />}
                {layoutTab === 'ananta' && <TowerC />}
                {['advait', 'vihaan', 'ishan', 'aarav', 'kavya'].map((t) => (
                  layoutTab === t && (
                    <ShowcaseTower 
                      key={t} 
                      towerName={t.charAt(0).toUpperCase() + t.slice(1)} 
                      dummyName={t.charAt(0).toUpperCase() + t.slice(1)} 
                    />
                  )
                ))}
              </Swipe>
            </div>
          </ContentSection>
        </div>

        {/* 4. Configurations */}
        <div id="configurations" className="bg-white">
          <ContentSection title="Configurations">
            <div className="px-4 pb-2">
              <Configuration />
            </div>
          </ContentSection>
        </div>

        {/* 5. Distance & Commute */}
        <div id="distance-commute" className="bg-white">
          <ContentSection title="Distance & Commute">
            <div className="px-2 pb-2">
              <InteractiveCommuteWidget />
            </div>
          </ContentSection>
        </div>

        {/* 6. Amenities */}
        <div id="amenities" className="bg-white">
          <ContentSection title="Amenities">
            <div className="px-4 pb-2">
              <AmenitiesSection />
            </div>
          </ContentSection>
        </div>

        {/* 7. Specifications */}
        <div id="specifications" className="bg-white">
          <ContentSection title="Specifications">
            <div className="px-4">
              <SpecificationsSection />
            </div>
          </ContentSection>
        </div>

        {/* 8. Payment Plans */}
        <div id="payment-plans" className="bg-white">
          <ContentSection title="Payment Plans & Offers">
            <div className="px-4 ">
              <PaymentPlan />
            </div>
          </ContentSection>
        </div>

        {/* 9. Project Files */}
        <div id="project-files" className="bg-white">
          <ProjectFilesSection />
        </div>

        {/* 10. Project Summary & Questions */}
        <section id="exit-summary" className="bg-white">
          <ProjectSummary />
          <Question />
        </section>

        {/* 11. Project Meet */}
        <div id="project-meet" className="bg-white">
          <ContentSection title="Project Meet">
            <div className="px-1">
              <PropertyMeetNav />
            </div>
          </ContentSection>
        </div>

        <FooterNav />
        
        {/* --- Constrained Back to Top Button --- */}
        {showBackToTop && (
          <div className="fixed inset-x-0 bottom-24 z-50 flex justify-center pointer-events-none">
            <div className="w-full max-w-[390px] relative">
              <Button
                onClick={handleBackToTop}
                size="icon"
                className="absolute right-4 bottom-0 bg-white shadow-lg border border-gray-200 hover:bg-orange-100 text-orange-500 hover:text-white hover:bg-gradient-to-br hover:from-[#F85B01] hover:to-[#E05000] transition-colors pointer-events-auto"
                aria-label="Back to top"
              >
                <BackToTopIcon />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;