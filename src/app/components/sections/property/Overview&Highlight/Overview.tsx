import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

// Import popup images
import skyscrapperIcon from '../../../../../Files/popup-images/skyscrapper.png';
import propertyIcon from '../../../../../Files/popup-images/property.png';
import approvalsIcon from '../../../../../Files/popup-images/Approvals.png';
import unitFacingIcon from '../../../../../Files/popup-images/UnitFacing.png';
import constructionIcon from '../../../../../Files/popup-images/construction.png';
import blueprint1Icon from '../../../../../Files/popup-images/blueprint1.png';
import locationIcon from '../../../../../Files/popup-images/location.png';
import blueprintIcon from '../../../../../Files/popup-images/blueprint.png';
import researchIcon from '../../../../../Files/popup-images/research.png';
import overpopulationIcon from '../../../../../Files/popup-images/overpopulation.png';
import handoverDateIcon from '../../../../../Files/popup-images/HandoverDate1.png';
import clubhouseIcon from '../../../../../Files/popup-images/ClubhouseArea.png';
import orr1Icon from '../../../../../Files/popup-images/orr1.png';
import rrr1Icon from '../../../../../Files/popup-images/rrr1.png';
import highway1Icon from '../../../../../Files/popup-images/highway1.png';
import ocIcon from '../../../../../Files/popup-images/oc.png';
import stackIcon from '../../../../../Files/popup-images/stack.png';
import roadsWidthIcon from '../../../../../Files/popup-images/Roads_Width.png';
import loan1Icon from '../../../../../Files/popup-images/loan1.png';

interface OverviewItem {
  icon: string;
  label: string;
  value: string;
}

// --- OVERVIEW TILE COMPONENT (Compact Luxury) ---
const OverviewTile = React.forwardRef<HTMLElement, { item: OverviewItem; variants: Variants }>(
  ({ item, variants }, ref) => {
  return (
    <motion.article 
      ref={ref}
      variants={variants}
      layout
      // Reduced padding from py-5 to py-3 and px-3 to px-2
      className="relative flex flex-col items-center text-center pt-3 pb-3 px-2 rounded-[6px] bg-white shadow-sm border border-[#E5DFD4]/60 transition-all duration-300 font-['Outfit',_sans-serif] hover:shadow-md"
    >
      {/* Property Icon - Slightly smaller (w-6 h-6) */}
      <img
        src={item.icon}
        alt={item.label}
        className="w-6 h-6 mb-1.5 object-contain"
        style={{ filter: 'url(#brand-orange-filter)' }}
      />
      
      {/* Label & Value - Tightened typography */}
      <h3 className="text-[13px] font-medium tracking-wider text-[#7A6F68] mb-0.5 leading-tight">
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
    { icon: skyscrapperIcon, label: 'Towers', value: '4' },
    { icon: propertyIcon, label: 'Type', value: 'Apartments' },
    { icon: approvalsIcon, label: 'Approvals', value: 'HMDA, RERA' },
    { icon: unitFacingIcon, label: 'Unit Facing', value: 'North' },
    { icon: constructionIcon, label: 'Construction Type', value: 'RCC Frame' },
    { icon: blueprint1Icon, label: 'Config', value: '2, 3 BHK' },
    { icon: locationIcon, label: 'Plot Sizes', value: '1200-1800 Sq.Ft' },
    { icon: blueprintIcon, label: 'BUA', value: '1250-1890 Sq.Ft' },
    { icon: researchIcon, label: 'Model Unit', value: 'Available' },
    { icon: overpopulationIcon, label: 'Density', value: 'Medium' },
    { icon: handoverDateIcon, label: 'Handover Date', value: 'Dec 2025' },
    { icon: clubhouseIcon, label: 'Clubhouse Area', value: '1200 Sq.Ft' },
    { icon: orr1Icon, label: 'ORR', value: '1200 Sq.Ft' },
    { icon: rrr1Icon, label: 'RRR', value: '1200 Sq.Ft' },
    { icon: highway1Icon, label: 'Highway', value: '1200 Sq.Ft' },
    { icon: ocIcon, label: 'OC Status', value: 'Available' },
    { icon: stackIcon, label: 'LP Status', value: 'Available' },
    { icon: roadsWidthIcon, label: 'Roads Width', value: '12-15 Feet' },
    { icon: loan1Icon, label: 'Loan', value: 'Available' },
  ];

  const displayedItems = showAllDetails ? allOverviewData : allOverviewData.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.03 } }
  };

  const itemVariants = {
    hidden: { y: 8, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } }
  };

  return (
    <section className="p-0 relative font-['Outfit',_sans-serif] bg-[#FDFBF8]">
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

      {/* Reduced gap-x-3 to gap-x-2 and gap-y-4 to gap-y-2.5 */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-x-2 gap-y-2.5 pb-2"
      >
        <AnimatePresence mode='popLayout'>
          {displayedItems.map((item) => (
            <OverviewTile key={item.label} item={item} variants={itemVariants} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Toggle Button - Reduced margin-top (mt-4) */}
      <div className="flex justify-center mt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAllDetails(!showAllDetails)}
          className="px-2 py-1 bg-[#382C27] text-[#ffffff]  text-[14px] font-medium tracking-wide flex items-center gap-2 rounded-[6px] shadow-sm transition-all outline-none"
        >
          {showAllDetails ? 'Show less' : 'See all details'}
          <svg 
            className={`w-3 h-3 transition-transform duration-300 ${showAllDetails ? 'rotate-180' : ''}`} 
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