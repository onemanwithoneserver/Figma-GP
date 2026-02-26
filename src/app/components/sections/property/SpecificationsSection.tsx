import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Icons ---
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const categoryIcon = (id: string) => {
  const map: Record<string, JSX.Element> = {
    'premium-materials': (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    'quality-construction': (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 7V5a2 2 0 00-8 0v2"/>
      </svg>
    ),
    'modern-design': (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
    'vastu-compliant': (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    'structure': (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    'flooring': (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/>
        <rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>
      </svg>
    ),
    'doors-windows': (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18"/><path d="M9 21V7l6-4v18"/><rect x="9" y="7" width="6" height="14" rx="0"/>
        <circle cx="14" cy="14" r="1" fill="currentColor"/>
      </svg>
    ),
    'painting': (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 16.1A5 5 0 015.9 20M2 12.05A9 9 0 019.95 20M2 8V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2h-6"/>
        <line x1="2" y1="20" x2="2" y2="20" strokeWidth="3"/>
      </svg>
    ),
  };
  return map[id] || map['structure'];
};

// --- Mock Data ---
const SPECIFICATIONS_DATA = [
  {
    id: 'premium-materials',
    label: 'Premium Materials',
    title: 'Premium Materials',
    description: 'High-quality materials sourced from reputed brands ensure durability and aesthetic appeal. All fittings and fixtures meet international standards for longevity and performance.',
    features: [
      'ISI marked standard fittings',
      'Environmentally conscious sourcing',
      'Extended warranty on base materials'
    ]
  },
  {
    id: 'quality-construction',
    label: 'Construction',
    title: 'Quality Construction',
    description: 'RCC framed structure designed to withstand wind and seismic loads. Use of high-grade cement and steel ensures the structural integrity of the building.',
    features: [
      'Seismic zone compliant design',
      'High-grade primary steel',
      'Weather-resistant outer shells'
    ]
  },
  {
    id: 'modern-design',
    label: 'Design',
    title: 'Modern & Smart Design',
    description: 'Thoughtfully planned layouts with maximum space utilization, natural ventilation, and abundant sunlight. Smart home features integrated into the core design.',
    features: [
      'Zero dead-space layouts',
      'Cross-ventilation optimized',
      'Smart lighting pre-wiring'
    ]
  },
  {
    id: 'vastu-compliant',
    label: 'Vastu',
    title: '100% Vastu Compliant',
    description: 'Every unit is meticulously designed following Vastu Shastra principles to ensure positive energy, peace, and prosperity for the residents.',
    features: [
      'East/North facing entrances',
      'Auspicious kitchen placements',
      'Optimized bedroom directions'
    ]
  },
  {
    id: 'structure',
    label: 'Structure',
    title: 'Structure Details',
    description: '8" thick solid block work for exterior walls and 4" thick solid block work for interior walls. Smooth plastered surface finish with double coat putty.',
    features: [
      'Thermal insulated blocks',
      'Double coat premium putty',
      'Crack-resistant joints'
    ]
  },
  {
    id: 'flooring',
    label: 'Flooring',
    title: 'Premium Flooring',
    description: 'Large format double-charged vitrified tiles for living, dining, and bedrooms. Anti-skid ceramic tiles for bathrooms and balconies.',
    features: [
      'Large format 800×800mm tiles',
      'Matte finish anti-skid wet areas',
      'Flush seamless skirting'
    ]
  },
  {
    id: 'doors-windows',
    label: 'Doors & Windows',
    title: 'Doors & Windows',
    description: 'Main door with teak wood frame and designer veneer flush shutter. UPVC sliding windows with mosquito mesh and MS safety grills.',
    features: [
      'Solid teakwood main frames',
      'Acoustic sealed UPVC profiles',
      'Integrated safety mesh'
    ]
  },
  {
    id: 'painting',
    label: 'Painting',
    title: 'Painting & Finishes',
    description: 'Premium emulsion paint over putty finish for interior walls. Weather-proof acrylic emulsion paint for exterior elevations.',
    features: [
      'Washable interior emulsions',
      'Anti-fungal exterior coats',
      'Low VOC eco-friendly paints'
    ]
  }
];

const SpecificationsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('quality-construction');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeData = SPECIFICATIONS_DATA.find(item => item.id === activeTab) || SPECIFICATIONS_DATA[0];

  const handleTabClick = (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(id);
    event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <div className="font-['Outfit',_sans-serif] pb-4">

      {/* ── Scrollable Tab Pills ── */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-2 px-4 pt-1 pb-3"
      >
        {SPECIFICATIONS_DATA.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={(e) => handleTabClick(tab.id, e)}
              className="flex-shrink-0 px-3.5 py-1.5 text-[12.5px] font-bold rounded-[7px] transition-all duration-200 outline-none"
              style={isActive ? {
                background: 'linear-gradient(135deg, #F85B01, #C94A00)',
                color: '#fff',
                boxShadow: '0 0 14px rgba(248,91,1,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
              } : {
                background: '#F1F5F9',
                color: '#64748B'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Content Card ── */}
      <div className="mx-4 rounded-[7px] overflow-hidden" style={{boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>

        {/* Dark navy header */}
        <div
          className="px-5 py-4 relative overflow-hidden"
          style={{background: 'linear-gradient(135deg, #1A2540 0%, #0F1929 50%, #1C2E4A 100%)'}}
        >
          {/* Glow orb */}
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-[7px] opacity-10" style={{background: 'radial-gradient(circle, #F85B01 0%, transparent 70%)'}} />
          <div className="relative flex items-center gap-3">
            <div className="w-9 h-9 rounded-[7px] flex-shrink-0 flex items-center justify-center text-[#F85B01]" style={{background: 'rgba(248,91,1,0.15)', border: '1px solid rgba(248,91,1,0.3)'}}>
              {categoryIcon(activeData.id)}
            </div>
            <div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={activeTab + '-title'}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="text-[15px] font-extrabold text-white leading-tight"
                >
                  {activeData.title}
                </motion.h3>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* White body */}
        <div className="bg-white px-5 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
            >
              {/* Description */}
              <p className="text-[13.5px] text-[#475569] leading-relaxed font-medium mb-4">
                {activeData.description}
              </p>

              {/* Feature list */}
              <div className="flex flex-col gap-2.5">
                {activeData.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-5 h-5 rounded-[5px] flex items-center justify-center mt-0.5 text-white"
                      style={{background: 'linear-gradient(135deg, #F85B01, #C94A00)'}}
                    >
                      <CheckIcon />
                    </div>
                    <span className="text-[13.5px] font-semibold text-[#2A2C32] leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default SpecificationsSection;
