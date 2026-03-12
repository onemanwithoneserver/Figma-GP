import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Bookmark, Share2, Heart, MapPin, Star, ChevronDown, Check, X, Phone } from 'lucide-react';
import HorizontalTabNavigation from './HorizontalTabNavigation'; // Ensure path is correct
import ProjectSummary from './property/ExitSummarySection/ProjectSummary';

const PropertyDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'highlights'>('overview');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-5');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    // FIXED: Changed overflow-x-hidden to overflow-x-clip so it doesn't break sticky positioning
    <div className="min-h-screen bg-[#F8FAFC] overflow-x-clip max-w-[390px] mx-auto relative">
      {/* HERO SECTION */}
      <div className="relative">
        {/* Top Banner Image */}
        <div className="relative h-[280px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
              alt="Vasavi Skyla"
              className="w-full h-full object-cover animate-fade-in"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

          {/* Top Navigation */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-10">
            <button aria-label="Go back" className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all">
              <ArrowLeft className="w-5 h-5 text-gray-800" />
            </button>
            <div className="flex gap-2">
              <button aria-label="Bookmark property" className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all">
                <Bookmark className="w-5 h-5 text-gray-800" />
              </button>
              <button aria-label="Share property" className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all">
                <Share2 className="w-5 h-5 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Property Info Overlay */}
          <div className="absolute bottom-20 left-0 right-0 px-4 z-10">
            <h1 className="text-[22px] font-bold text-white mb-1">Vasavi Skyla</h1>
            <div className="flex items-center gap-1 mb-2">
              <MapPin className="w-4 h-4 text-gray-300" />
              <p className="text-[13px] text-gray-300">Hyderabad Hills, Hyderabad</p>
            </div>
            <p className="text-[15px] font-bold text-[#F97316]">Starts from ₹8,000/Sft</p>
          </div>
        </div>

        {/* Floating Builder Card */}
        <div className="relative px-4 -mt-12 z-20 animate-slide-up">
          <div className="bg-white rounded-[14px] shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  GP
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-gray-900">Gully Properties</h3>
                    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-[12px] text-gray-600">12k+ Reviews</span>
                  </div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white text-[10px] font-bold rounded-[5.5px] hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1 shadow-md">
                <Phone className="w-2.5 h-2.5" />
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Stats Pills Section */}
        <div className="px-4 mt-4 animate-slide-up [animation-delay:100ms]">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <StatPill icon="🏞️" label="12 Acres" valid={true} />
            <StatPill icon="🏢" label="456 Units" valid={true} />
            <StatPill icon="🏗️" label="G+14 Floors" valid={false} />
          </div>
        </div>

        {/* Scroll CTA */}
        <div className="px-4 mt-6 mb-6 text-center animate-slide-up [animation-delay:200ms]">
          <h3 className="text-[16px] font-semibold text-gray-900 mb-1">Explore Property Details</h3>
          <p className="text-[13px] text-gray-600 mb-3">
            Navigate through tabs or scroll to explore 100+ data points
          </p>
          <div className="flex justify-center animate-bounce">
            <ChevronDown className="w-6 h-6 text-[#2563EB]" />
          </div>
        </div>
      </div>

      {/* STICKY HORIZONTAL TAB NAVIGATION */}
      <HorizontalTabNavigation />

      {/* OVERVIEW & HIGHLIGHTS SECTION */}
      {/* Kept scroll-mt-20 just in case, but JS handles the exact offset perfectly now */}
      <section id="overview-highlights" className="scroll-mt-20 px-2 mb-8 animate-on-scroll opacity-0 translate-y-5 transition-all duration-300 ease-out pt-4">
        <div className="bg-white rounded-[14px] shadow-sm p-4">
          <h2 className="text-[18px] font-bold text-gray-900 mb-4">Overview & Highlights</h2>
          
          <div className="flex gap-6 border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-[14px] font-medium transition-colors relative ${
                activeTab === 'overview' ? 'text-[#2563EB]' : 'text-gray-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Heart className={`w-4 h-4 ${activeTab === 'overview' ? 'fill-red-500 text-red-500' : ''}`} />
                Overview
              </div>
              {activeTab === 'overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('highlights')}
              className={`pb-3 text-[14px] font-medium transition-colors relative ${
                activeTab === 'highlights' ? 'text-[#2563EB]' : 'text-gray-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-400 rounded" />
                Highlights
              </div>
              {activeTab === 'highlights' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
              )}
            </button>
          </div>

          <div className="space-y-3">
            {activeTab === 'overview' ? (
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-[7px] relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-100/50" />
                    <div className="absolute top-2 right-2">
                      <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-[7px] border-2 border-dashed border-gray-300 shadow-sm" />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROJECT TIMELINE */}
      <ContentSection id="project-timeline" title="Project Timeline">
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-[7px] border-2 border-dashed border-gray-300 flex items-center justify-center shadow-sm">
          <span className="text-gray-400 text-sm font-medium">Timeline Visualization</span>
        </div>
      </ContentSection>

      {/* LAYOUT & TOWERS */}
      <ContentSection id="layout-towers" title="Layout & Towers">
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-[7px] border-2 border-dashed border-gray-300 shadow-sm" />
          ))}
        </div>
      </ContentSection>

      {/* CONFIGURATIONS & UNIT VARIANTS */}
      <ContentSection id="configurations" title="Configurations & Unit Variants">
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-[7px] border-2 border-dashed border-gray-300 flex items-center justify-center shadow-sm">
              <span className="text-gray-400 text-sm font-medium">Unit Card {i}</span>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* DISTANCE / COMMUTE TO */}
      <ContentSection id="distance-commute" title="Distance / Commute To">
        <div className="space-y-3">
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-[7px] border-2 border-dashed border-gray-300 flex items-center justify-center shadow-sm">
            <span className="text-gray-400 text-sm font-medium">Map Placeholder</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-[7px] border-2 border-dashed border-gray-300 shadow-sm" />
            ))}
          </div>
        </div>
      </ContentSection>

      {/* AMENITIES */}
      <ContentSection id="amenities" title="Amenities">
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-[7px] border-2 border-dashed border-gray-300 flex items-center justify-center shadow-sm">
              <div className="w-8 h-8 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </ContentSection>

      {/* SPECIFICATIONS */}
      <ContentSection id="specifications" title="Specifications">
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-[7px] border-2 border-dashed border-gray-300 flex items-center px-4 shadow-sm">
              <span className="text-gray-400 text-sm">Specification Item {i}</span>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* PAYMENT PLANS & OFFERS */}
      <ContentSection id="payment-plans" title="Payment Plans & Offers">
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-gradient-to-br from-orange-50 to-orange-100 rounded-[7px] border-2 border-orange-200 flex items-center justify-center shadow-md">
              <span className="text-orange-600 font-medium text-sm">Offer Card {i}</span>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* PROJECT FILES */}
      <ContentSection id="project-files" title="Project Files">
        <div className="space-y-2">
          {['Brochure.pdf', 'Floor Plan.pdf', 'Price List.pdf'].map((file, i) => (
            <div key={i} className="h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-[7px] border-2 border-dashed border-gray-300 flex items-center px-4 gap-3 shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-[7px] flex items-center justify-center shadow-sm">
                <span className="text-blue-600 text-xs font-bold">📄</span>
              </div>
              <span className="text-gray-600 text-sm">{file}</span>
            </div>
          ))}
        </div>
      </ContentSection>
      <ProjectSummary />
      <ContentSection id="project-meet" title="Project Meet">
        <div className="space-y-3 mb-6">
          <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-[7px] border-2 border-dashed border-gray-300 flex items-center justify-center shadow-sm">
            <span className="text-gray-400 text-sm">📅 Calendar & Contact Area</span>
          </div>
        </div>
      </ContentSection>
    </div>
  );
};

// Stat Pill Component
const StatPill: React.FC<{ icon: string; label: string; valid: boolean }> = ({ icon, label, valid }) => {
  return (
    <div className="flex-shrink-0 bg-white rounded-[7px] px-4 py-2.5 border-2 border-blue-100 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="text-[13px] font-medium text-gray-700">{label}</span>
        {valid ? (
          <Check className="w-4 h-4 text-green-500" strokeWidth={3} />
        ) : (
          <X className="w-4 h-4 text-red-500" strokeWidth={3} />
        )}
      </div>
    </div>
  );
};

// Content Section Component
const ContentSection: React.FC<{ id?: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => {
  return (
    <section id={id} className="scroll-mt-20 px-2 mb-8 animate-on-scroll opacity-0 translate-y-5 transition-all duration-300 ease-out">
      <div className="bg-white rounded-[14px] shadow-sm p-4">
        <h2 className="text-[18px] font-bold text-gray-900 mb-4">{title}</h2>
        {children}
      </div>
    </section>
  );
};

export default PropertyDetails;