import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

interface OverviewItem {
  icon: string;
  label: string;
  value: string;
}

// --- OVERVIEW TILE COMPONENT (Luxury Mode) ---
const OverviewTile = React.forwardRef<HTMLElement, { item: OverviewItem; variants: Variants }>(
  ({ item, variants }, ref) => {
  return (
    <motion.article 
      ref={ref}
      variants={variants}
      layout
      className="relative flex flex-col items-center text-center pt-5 pb-5 px-3 rounded-[7px] bg-white shadow-sm border border-[#E5DFD4]/60 transition-all duration-300 font-['Outfit',_sans-serif] hover:shadow-md"
    >
      {/* Property Icon - Filtered to Brand Orange */}
      <img
        src={item.icon}
        alt={item.label}
        className="w-7 h-7 mb-2.5 object-contain"
        style={{ filter: 'url(#brand-orange-filter)' }}
      />
      
      {/* Label & Value - Refined Typography Hierarchy */}
      <h3 className="text-[11px] font-medium tracking-wide text-[#7A6F68] mb-1 leading-tight">
        {item.label}
      </h3>
      <p className="text-[14px] font-semibold text-[#322822] leading-tight">
        {item.value}
      </p>
    </motion.article>
  );
});

// --- MAIN OVERVIEW SECTION ---
const Overview: React.FC = () => {
  const [showAllDetails, setShowAllDetails] = useState(false);

  const allOverviewData: OverviewItem[] = [
    { icon: '/src/Files/popup-images/skyscrapper.png', label: 'Towers', value: '4' },
    { icon: '/src/Files/popup-images/property.png', label: 'Type', value: 'Apartments' },
    { icon: '/src/Files/popup-images/Approvals.png', label: 'Approvals', value: 'HMDA, RERA' },
    { icon: '/src/Files/popup-images/UnitFacing.png', label: 'Unit Facing', value: 'North' },
    { icon: '/src/Files/popup-images/construction.png', label: 'Construction Type', value: 'RCC Frame' },
    { icon: '/src/Files/popup-images/blueprint1.png', label: 'Config', value: '2, 3 BHK' },
    { icon: '/src/Files/popup-images/location.png', label: 'Plot Sizes', value: '1200-1800 Sq.Ft' },
    { icon: '/src/Files/popup-images/blueprint.png', label: 'BUA', value: '1250-1890 Sq.Ft' },
    { icon: '/src/Files/popup-images/research.png', label: 'Model Unit', value: 'Available' },
    { icon: '/src/Files/popup-images/overpopulation.png', label: 'Density', value: 'Medium' },
    { icon: '/src/Files/popup-images/HandoverDate1.png', label: 'Handover Date', value: 'Dec 2025' },
    { icon: '/src/Files/popup-images/ClubhouseArea.png', label: 'Clubhouse Area', value: '1200 Sq.Ft' },
    { icon: '/src/Files/popup-images/orr1.png', label: 'ORR', value: '1200 Sq.Ft' },
    { icon: '/src/Files/popup-images/rrr1.png', label: 'RRR', value: '1200 Sq.Ft' },
    { icon: '/src/Files/popup-images/highway1.png', label: 'Highway', value: '1200 Sq.Ft' },
    { icon: '/src/Files/popup-images/oc.png', label: 'OC Status', value: 'Available' },
    { icon: '/src/Files/popup-images/stack.png', label: 'LP Status', value: 'Available' },
    { icon: '/src/Files/popup-images/Roads_Width.png', label: 'Roads Width', value: '12-15 Feet' },
    { icon: '/src/Files/popup-images/loan1.png', label: 'Loan', value: 'Available' },
  ];

  const displayedItems = showAllDetails ? allOverviewData : allOverviewData.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.04 } }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 280, damping: 22 } }
  };

  return (
    <section className="p-0 relative font-['Outfit',_sans-serif] bg-[#FDFBF8]">
      {/* SVG Filter for Icon Branding - Adjusted to match the #E76F26 accent color */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="brand-orange-filter" colorInterpolationFilters="sRGB">
            <feColorMatrix 
              type="matrix" 
              values="0 0 0 0 0.9058 0 0 0 0 0.4352 0 0 0 0 0.1490 0 0 0 1 0" 
            />
          </filter>
        </defs>
      </svg>

      {/* Reduced vertical gap from gap-y-10 to gap-y-4 since floating pills are removed */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-x-3 gap-y-4 pb-2"
      >
        <AnimatePresence mode='popLayout'>
          {displayedItems.map((item) => (
            <OverviewTile key={item.label} item={item} variants={itemVariants} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Toggle Button - Removed heavy glowing shadow, refined font weight */}
      <div className="flex justify-center mt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAllDetails(!showAllDetails)}
          className="px-8 py-2.5 text-white text-[13px] font-medium tracking-wide flex items-center gap-2 rounded-[7px] bg-[#E76F26] shadow-sm transition-all outline-none"
        >
          {showAllDetails ? 'Show less' : 'See all details'}
          <svg 
            className={`w-3.5 h-3.5 transition-transform duration-300 ${showAllDetails ? 'rotate-180' : ''}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>
      </div>
    </section>
  );
};

export default Overview;