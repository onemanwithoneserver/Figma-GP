import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Reveal } from '../03_shared/04_motion/Reveal';
import { TransitionPanel } from '../03_shared/04_motion/TransitionPanel';
import { useMotionSettings } from '../03_shared/04_motion/useMotionSettings';
import { ScrollProgress } from '../03_shared/04_motion/ScrollProgress';
import { AmbientBackground } from '../03_shared/04_motion/AmbientBackground';
import HighlightsMarquee from '../03_shared/01_components/HighlightsMarquee';
import HeroSection from '../02_features/01_hero/HeroSection';
import HorizontalTabNavigation from '../03_shared/01_components/HorizontalTabNavigation';
import TabNavigation from '../02_features/02_overview/TabNavigation';
import Overview from '../02_features/02_overview/Overview';
import Highlights from '../02_features/02_overview/Highlights';
import ProjectTimelineSection from '../02_features/03_timeline/ProjectTimeline';
import LandTNavigation from '../02_features/04_layout/LandTNavigation';
import Swipe from '../02_features/04_layout/Swipe';
import Layout from '../02_features/04_layout/Layout';
import TowerA from '../02_features/04_layout/TowerA';
import TowerB from '../02_features/04_layout/TowerB';
import TowerC from '../02_features/04_layout/TowerC';
import ShowcaseTower from '../02_features/04_layout/ShowcaseTower';

import Configuration from '../02_features/05_configurations/configuration';
import InteractiveCommuteWidget from '../02_features/06_commute/InteractiveCommute';
import AmenitiesSection from '../02_features/07_amenities/AmenitiesSection';
import SpecificationsSection from '../02_features/08_specifications/SpecificationsSection';
import PaymentPlan from '../02_features/09_payments/PaymentPlan';
import ProjectFilesSection from '../02_features/10_files/ProjectFilesSection';
import ProjectSummary from '../02_features/11_summary/ProjectSummary';
import Question from '../02_features/11_summary/Question';
import PropertyMeetNav from '../02_features/12_meetings/PropertyMeetNav';
import ContentSection from '../03_shared/01_components/ContentSection';
import FooterNav from '../03_shared/01_components/FooterNav';

import { BackToTopIcon } from '../03_shared/02_ui/BackToTopIcon';
import { Button } from '../03_shared/02_ui/button';

function App() {
  const { reducedMotion, transition } = useMotionSettings();
  const [activeTab, setActiveTab] = useState<'overview' | 'self-use' | 'investment'>('overview');
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
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
  };

  const handleLayoutTowerSelect = (towerId: string) => {
    setLayoutTab(towerId);
    requestAnimationFrame(() => {
      document.getElementById('layout-towers')?.scrollIntoView({
        behavior: reducedMotion ? 'instant' : 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <motion.div className="min-h-screen bg-white"
      initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={transition}>
      <AmbientBackground />
      <ScrollProgress />

      <div className="overflow-x-clip max-w-[390px] mx-auto pb-[70px] min-h-screen flex flex-col gap-[4px] relative z-[1]">

        <Reveal id="hero" className="bg-white">
          <div className="">
            <HeroSection />
          </div>
        </Reveal>

        <div className="bg-white py-1">
          <HighlightsMarquee />
        </div>

        <div id="tab-nav" className="bg-white sticky top-0 z-40">
          <HorizontalTabNavigation />
        </div>

        <Reveal id="overview-highlights" from="left" className="bg-white">
          <div className="px-4 pb-2">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            <TransitionPanel transitionKey={activeTab} className="pt-2">
              {activeTab === 'overview' && <Overview />}
              {activeTab === 'self-use' && <Highlights mode="self-use" />}
              {activeTab === 'investment' && <Highlights mode="investment" />}
            </TransitionPanel>
          </div>
        </Reveal>

        <Reveal id="project-timeline" from="right" className="bg-white">
            <ProjectTimelineSection />
        </Reveal>

        <Reveal id="layout-towers" from="left" className="bg-white">
          <ContentSection title="Layout & Towers">
            <div className="px-4 pb-2">
              <LandTNavigation activeTab={layoutTab} onTabChange={setLayoutTab} />
              <Swipe activeTab={layoutTab} onTabChange={setLayoutTab} className="mt-1">
                <TransitionPanel transitionKey={layoutTab}>
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
                </TransitionPanel>
              </Swipe>
            </div>
          </ContentSection>
        </Reveal>

        <Reveal id="configurations" from="right" className="bg-white">
          <ContentSection title="Configurations">
            <div className="px-4 pb-2">
              <Configuration />
            </div>
          </ContentSection>
        </Reveal>

        <Reveal id="distance-commute" from="left" className="bg-white">
          <ContentSection title="Distance & Commute">
            <div className="px-2 pb-2">
              <InteractiveCommuteWidget />
            </div>
          </ContentSection>
        </Reveal>

        <Reveal id="amenities" from="right" className="bg-white">
          <ContentSection title="Amenities">
            <div className="px-4 pb-2">
              <AmenitiesSection />
            </div>
          </ContentSection>
        </Reveal>

        <Reveal id="specifications" from="left" className="bg-white">
          <ContentSection title="Specifications">
            <div className="px-4">
              <SpecificationsSection />
            </div>
          </ContentSection>
        </Reveal>

        <Reveal id="payment-plans" from="right" className="bg-white">
          <ContentSection title="Payment Plans & Offers">
            <div className="px-2 pb-2">
              <PaymentPlan />
            </div>
          </ContentSection>
        </Reveal>

        <Reveal id="project-files" from="left" className="bg-white">
          <ProjectFilesSection />
        </Reveal>

        <section id="exit-summary" className="bg-white">
          <ProjectSummary />
          <Question />
        </section>

        <Reveal id="project-meet" from="right" className="bg-white">
          <ContentSection title="Project Meet">
            <div className="px-1">
              <PropertyMeetNav />
            </div>
          </ContentSection>
        </Reveal>

        <FooterNav />

        <AnimatePresence>
        {showBackToTop && (
          <motion.div key="back-to-top"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 16 }}
            transition={reducedMotion ? transition : { type: 'spring', stiffness: 380, damping: 24 }}
            className="fixed inset-x-0 bottom-24 z-50 flex justify-center pointer-events-none">
            <div className="w-full max-w-[390px] relative">
              <Button
                onClick={handleBackToTop}
                size="icon"
                className="absolute right-4 bottom-0 bg-white shadow-lg border border-gray-200 hover:bg-orange-100 text-orange-500 hover:text-white hover:bg-gradient-to-br hover:from-brand hover:to-[#E05000] transition-colors pointer-events-auto"
                aria-label="Back to top"
              >
                <BackToTopIcon />
              </Button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default App;
