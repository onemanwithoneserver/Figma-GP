import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TabNavigation from './SpecificationsTabNav'; 
import SellerQueries from './SellerQueries';

// --- Icons ---
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.svg 
    animate={{ rotate: isOpen ? 180 : 0 }}
    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className="text-[#E76F26]"
  >
    <polyline points="6 9 12 15 18 9" />
  </motion.svg>
);


const SPECIFICATIONS_DATA = [
  {
    id: 'premium-materials',
    label: 'Premium Materials',
    features: [
      {
        title: 'Sourcing Standards',
        details: [
          'ISI marked standard fittings for all structural elements',
          'Environmentally conscious sourcing from certified vendors',
          'Certified sustainable lumber with moisture-controlled seasoning',
          'Low-carbon footprint cement procured from Tier-1 manufacturers',
          'High-tensile strength TMT bars (Fe 500D/550D grade)'
        ]
      },
      {
        title: 'Sourcing Standards',
        details: [
          'ISI marked standard fittings for all structural elements',
          'Environmentally conscious sourcing from certified vendors',
          'Certified sustainable lumber with moisture-controlled seasoning',
          'Low-carbon footprint cement procured from Tier-1 manufacturers',
          'High-tensile strength TMT bars (Fe 500D/550D grade)'
        ]
      },
      {
        title: 'Longevity & Warranty',
        details: [
          'Extended 10-year warranty on base structural materials',
          'Rigorous multi-stage quality checks by on-site labs',
          'Traceable component batching for every floor slab',
          'Anti-termite treatment with 15-year service guarantee'
        ]
      }
    ]
  },
  {
    id: 'quality-construction',
    label: 'Construction',
    features: [
      {
        title: 'Structure & Design',
        details: [
          'Seismic zone compliant RCC framed design',
          'High-grade primary steel with corrosion-resistant coating',
          'Weather-resistant outer shells with heat-reflective paint'
        ]
      }, {
        title: 'Structure & Design',
        details: [
          'Seismic zone compliant RCC framed design',
          'High-grade primary steel with corrosion-resistant coating',
          'Weather-resistant outer shells with heat-reflective paint'
        ]
      }, {
        title: 'Structure & Design',
        details: [
          'Seismic zone compliant RCC framed design',
          'High-grade primary steel with corrosion-resistant coating',
          'Weather-resistant outer shells with heat-reflective paint'
        ]
      },
      {
        title: 'Quality Control',
        details: [
          'Tested concrete grade (M25/M30) with cube test reports',
          'Third-party structural auditing by certified agencies',
          'Curing period monitoring using automated sensor tech',
          'Adherence to IS 456:2000 code of practice'
        ]
      }
    ]
  },
  {
    id: 'modern-design',
    label: 'Design',
    features: [
      {
        title: 'Space Optimization',
        details: [
          'Zero dead-space layouts for maximum utility',
          'Ergonomic kitchen workflows (Work Triangle compliant)',
          'Ample natural light penetration via oversized lintels',
          'Foyer-based entries for enhanced resident privacy',
          'Dedicated storage niches and built-in wardrobe spaces'
        ]
      },
      {
        title: 'Smart Features',
        details: [
          'Cross-ventilation optimized window placements',
          'Smart lighting pre-wiring in living and master suites'
        ]
      }
    ]
  },
  {
    id: 'vastu-compliant',
    label: 'Vastu',
    features: [
      {
        title: 'Auspicious Alignment',
        details: [
          'East/North facing entrances as per primary preference',
          'Optimized master bedroom directions (South-West)',
          'Positive energy flow planning with central Brahmasthan clearance',
          'Entry thresholds designed for prosperity'
        ]
      },  {
        title: 'Auspicious Alignment',
        details: [
          'East/North facing entrances as per primary preference',
          'Optimized master bedroom directions (South-West)',
          'Positive energy flow planning with central Brahmasthan clearance',
          'Entry thresholds designed for prosperity'
        ]
      },  {
        title: 'Auspicious Alignment',
        details: [
          'East/North facing entrances as per primary preference',
          'Optimized master bedroom directions (South-West)',
          'Positive energy flow planning with central Brahmasthan clearance',
          'Entry thresholds designed for prosperity'
        ]
      },
      {
        title: 'Functional Placement',
        details: [
          'Auspicious Agni-moola kitchen placements (South-East)',
          'Water source and sump positioning in the North-East'
        ]
      }
    ]
  },
  {
    id: 'structure',
    label: 'Wall & Surface',
    features: [
      {
        title: 'Wall Engineering',
        details: [
          'Thermal insulated AAC blocks for energy efficiency',
          'Crack-resistant fiber-mesh reinforced joints',
          'High-density walling material for superior sound insulation',
          'Internal walls with smooth gypsum plaster finish',
          'External walls with double-coat sand-faced plaster'
        ]
      },
      {
        title: 'Surface Finishing',
        details: [
          'Double coat premium putty for mirror-smooth walls',
          'Uniform plaster thickness checked by laser levels'
        ]
      }
    ]
  },
  {
    id: 'flooring',
    label: 'Flooring',
    features: [
      {
        title: 'Main Area Flooring',
        details: [
          'Large format 800×800mm double-charged vitrified tiles',
          'Flush seamless skirting with grooved finish',
          'Premium Italian marble finish in living/dining areas',
          'Stain-resistant and scratch-resistant surface treatment'
        ]
      },
      {
        title: 'Wet Area Flooring',
        details: [
          'Matte finish anti-skid ceramic tiles',
          'Waterproof membrane coating beneath all wet areas',
          'Acid-resistant grouting for easy maintenance',
          'Proper slope management for zero-stagnation drainage',
          'Dedicated dry and wet area segregation in master baths'
        ]
      }
    ]
  },
  {
    id: 'doors-windows',
    label: 'Doors & Windows',
    features: [
       {
        title: 'Main Entrance',
        details: [
          'Solid teakwood main frames and designer shutters',
          'Multi-point safety locking system from Yale/Godrej'
        ]
      },
       {
        title: 'Internal Doors',
        details: [
          'Engineered wood frames with flush MDF shutters',
          'Soft-close hinges and premium hardware fittings'
        ]
      },
      {
        title: 'External Profiles',
        details: [
          'Acoustic sealed UPVC window profiles',
          'Integrated insect/safety mesh in all windows',
          'Toughened glass panes for safety and insulation',
          'Heavy-duty aluminum sliding balcony doors',
          'Weather-stripped thresholds to prevent rainwater seepage'
        ]
      }
    ]
  },
  {
    id: 'electrical-automation',
    label: 'Electrical',
    features: [
      {
        title: 'Infrastructure',
        details: [
          'Concealed copper wiring with FR-LS properties',
          'Modular switches and sockets from premium brands',
          'Dedicated MCB and RCCB for every distribution board',
          'Provisions for split AC in all bedrooms and living room',
          'Three-phase power supply with individual meters'
        ]
      },
      {
        title: 'Smart Tech',
        details: [
          'Smart home hub compatibility wiring',
          'USB charging ports in bedside switchboards',
          'Occupancy sensors for bathroom lighting',
          'Centralized stabilizer provision for the entire unit'
        ]
      }
    ]
  },
  {
    id: 'plumbing-sanitary',
    label: 'Plumbing',
    features: [
      {
        title: 'Fittings & Fixtures',
        details: [
          'Concealed divertors for hot and cold water',
          'Wall-mounted EWCs with soft-close seat covers',
          'High-quality CP fittings with 7-year replacement warranty',
          'Counter-top washbasins with granite/marble counters'
        ]
      },
      {
        title: 'Supply System',
        details: [
          'Corrosion-free CPVC pipes for internal lines',
          'Centralized pressurized water supply via VFD pumps',
          'Solar water heater provision for the master bathroom',
          'Individual water meters for transparent consumption tracking',
          'Dual piping system for flush and domestic water'
        ]
      }
    ]
  },
  {
    id: 'kitchen-area',
    label: 'Kitchen',
    features: [
      {
        title: 'Platform & Sink',
        details: [
          'Polished black granite platform with beveled edges',
          'Stainless steel double-bowl sink with drainboard'
        ]
      },
      {
        title: 'Utility & Storage',
        details: [
          'Provision for chimney and water purifier points',
          'Dedicated washing machine point in utility area',
          'Glazed tile dado up to 2 feet above platform',
          'Gas leak detector and fire sprinkler point',
          'Exhaust fan provision with protective louvers'
        ]
      }
    ]
  },
  {
    id: 'security-safety',
    label: 'Security',
    features: [
      {
        title: 'Active Surveillance',
        details: [
          '24/7 CCTV monitoring of all common areas',
          'Video door phone with smartphone integration',
          'Biometric entry for main door access',
          'Intercom facility connecting all units to security',
          'Panic button in master bedroom and kitchen'
        ]
      },
      {
        title: 'Fire Safety',
        details: [
          'Smoke detectors in every room',
          'Automatic sprinkler systems in the ceiling',
          'Fire-rated doors for stairwells and exits',
          'High-pressure fire hydrants on every floor'
        ]
      }
    ]
  },
  {
    id: 'painting-finishing',
    label: 'Painting',
    features: [
      {
        title: 'Interior Details',
        details: [
          'Two coats of premium acrylic emulsion paint',
          'Designer accent wall in the living room',
          'Cornice work in the living/dining ceiling'
        ]
      },
      {
        title: 'Exterior Protection',
        details: [
          'Texture paint finish for architectural aesthetics',
          'Anti-fungal and dust-repellent top coats',
          'Damp-proof treatment for all exterior surfaces',
          'UVR-protected shades to prevent color fading',
          'Silicon-based water repellent coating on stone claddings'
        ]
      }
    ]
  },
  {
    id: 'amenities-infrastructure',
    label: 'Amenities',
    features: [
      {
        title: 'Elevators',
        details: [
          'High-speed 10-passenger automatic lifts',
          'Dedicated service lift for heavy goods/moving',
          'ARD (Automatic Rescue Device) for power failures',
          'In-lift CCTV and emergency intercom'
        ]
      },
      {
        title: 'Power Backup',
        details: [
          '100% DG backup for common area lighting and lifts',
          'Specific wattage backup for lights/fans inside units'
        ]
      }
    ]
  },
  {
    id: 'landscape-environment',
    label: 'Landscaping',
    features: [
      {
        title: 'Green Spaces',
        details: [
          'Themed gardens with native plantation',
          'Automated drip irrigation system for all zones',
          'Reflexology paths and meditation lawns',
          'Vertical gardens on perimeter walls',
          'Childrens play area with EPDM safety flooring'
        ]
      },
      {
        title: 'Common Hardscape',
        details: [
          'Stone-paved pedestrian walkways',
          'Decorative bollard lighting for night safety'
        ]
      }
    ]
  },
  {
    id: 'sustainable-living',
    label: 'Sustainability',
    features: [
      {
        title: 'Waste Management',
        details: [
          'On-site Organic Waste Converter (OWC)',
          'Segregated waste collection bins on every floor',
          'In-house Sewage Treatment Plant (STP)',
          'Recycled water for landscaping and flushing'
        ]
      },
      {
        title: 'Energy & Water',
        details: [
          'Solar panels for common area electricity',
          'Rainwater harvesting pits with recharge wells',
          'Low-flow water fixtures in all apartments',
          'EV charging stations in the parking bay',
          'Reflective roof tiles to reduce heat gain'
        ]
      }
    ]
  }
];


const AccordionItem = ({
  feature,
  isOpen,
  onToggle,
}: {
  feature: { title: string, details: string[] };
  isOpen: boolean;
  onToggle: () => void;
}) => {

  return (
<div className="border-b border-gray-100 last:border-none">
      <button 
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 text-left focus:outline-none group"
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-4 h-4 rounded-[999px] flex items-center justify-center transition-colors duration-200 bg-[#E96F26] text-white">
            <CheckIcon />
          </div>
          <span className="text-[14px] font-bold text-[#322822] tracking-tight group-hover:text-[#E76F26] transition-colors">
            {feature.title}
          </span>
        </div>
        <ChevronIcon isOpen={isOpen} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pl-8 pb-4 flex flex-col gap-2.5">
              {feature.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#332822]/40 mt-1.5 flex-shrink-0" />
                  <span className="text-[13px] text-[#332822] font-medium leading-relaxed">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SpecificationsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('quality-construction');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeData = SPECIFICATIONS_DATA.find(item => item.id === activeTab) || SPECIFICATIONS_DATA[0];

  useEffect(() => {
    setOpenIndex(null);
  }, [activeTab]);

  return (
    <div className="font-['Outfit',_sans-serif] ">
      
      {/* ── Using your TabNavigation Reference ── */}
      <TabNavigation 
        tabs={SPECIFICATIONS_DATA.map(tab => ({ id: tab.id, label: tab.label }))}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      {/* ── Accordion Content Card ── */}
      <div className=" bg-white ">
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col">
                {activeData.features.map((feature, idx) => (
                  <AccordionItem
                    key={idx}
                    feature={feature}
                    isOpen={openIndex === idx}
                    onToggle={() => setOpenIndex(prev => (prev === idx ? null : idx))}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
         <SellerQueries />
      </div>
    </div>
  );
};

export default SpecificationsSection;