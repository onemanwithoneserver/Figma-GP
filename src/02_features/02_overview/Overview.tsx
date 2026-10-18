import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import { cn } from '../../03_shared/03_utils/utils';
import { MotionButton } from '../../03_shared/02_ui/ActionButton';
import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'motion/react';
import { useMotionSettings } from '../../03_shared/04_motion/useMotionSettings';

import skyscrapperIcon from '../../05_assets/01_popup_images/skyscrapper.png';
import propertyIcon from '../../05_assets/01_popup_images/property.png';
import approvalsIcon from '../../05_assets/01_popup_images/Approvals.png';
import unitFacingIcon from '../../05_assets/01_popup_images/UnitFacing.png';
import constructionIcon from '../../05_assets/01_popup_images/construction.png';
import blueprint1Icon from '../../05_assets/01_popup_images/blueprint1.png';
import locationIcon from '../../05_assets/01_popup_images/location.png';
import blueprintIcon from '../../05_assets/01_popup_images/blueprint.png';
import researchIcon from '../../05_assets/01_popup_images/research.png';
import overpopulationIcon from '../../05_assets/01_popup_images/overpopulation.png';
import handoverDateIcon from '../../05_assets/01_popup_images/HandoverDate1.png';
import clubhouseIcon from '../../05_assets/01_popup_images/ClubhouseArea.png';
import orr1Icon from '../../05_assets/01_popup_images/orr1.png';
import rrr1Icon from '../../05_assets/01_popup_images/rrr1.png';
import highway1Icon from '../../05_assets/01_popup_images/highway1.png';
import ocIcon from '../../05_assets/01_popup_images/oc.png';
import stackIcon from '../../05_assets/01_popup_images/stack.png';
import roadsWidthIcon from '../../05_assets/01_popup_images/Roads_Width.png';
import loan1Icon from '../../05_assets/01_popup_images/loan1.png';

interface OverviewItem {
  icon: string;
  label: string;
  value: string;
}

const OverviewTile = React.forwardRef<HTMLElement, { item: OverviewItem; variants: Variants }>(
  ({ item, variants }, ref) => {
  const { reducedMotion } = useMotionSettings();
  return (
    <motion.article
      ref={ref}
      variants={variants}
      layout={reducedMotion ? false : 'position'}
      exit="exit"
      whileHover={reducedMotion ? undefined : { y: -2 }}

      className="relative flex flex-col items-center text-center pt-3 pb-3 px-2 rounded-card bg-white shadow-sm border border-outline/60 transition-shadow duration-200 hover:shadow-md"
    >

      <img
        src={item.icon}
        alt={item.label}
        className={cn("w-6 h-6 mb-1.5 object-contain", "[filter:url(#brand-orange-filter)]")}

      />

      <h3 className="text-[13px] font-medium tracking-wider text-[#7A6F68] mb-0.5 leading-tight">
        {item.label}
      </h3>
      <p className="text-[14px] font-semibold text-ink leading-tight">
        {item.value}
      </p>
    </motion.article>
  );
});

const Overview: React.FC = () => {
  const { reducedMotion, itemVariants, staggerVariants } = useMotionSettings();
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

  return (
    <section className="p-0 relative bg-surface-soft">
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

      <motion.div
        variants={staggerVariants}
        initial={reducedMotion ? false : 'hidden'}
        animate="show"
        className="grid grid-cols-3 gap-x-2 gap-y-2.5 pb-2"
      >
        <AnimatePresence mode='popLayout'>
          {displayedItems.map((item) => (
            <OverviewTile key={item.label} item={item} variants={itemVariants} />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-center mt-4">
        <MotionButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAllDetails(!showAllDetails)}
          className="px-2 py-1 bg-[#382C27] text-white  text-[14px] font-medium tracking-wide flex items-center gap-2 rounded-card shadow-sm transition-colors outline-none"
        >
          {showAllDetails ? 'Show less' : 'See all details'}
          <ExpandMoreRounded className={`w-3 h-3 transition-transform duration-300 ${showAllDetails ? 'rotate-180' : ''}`}  />
        </MotionButton>
      </div>
    </section>
  );
};

export default Overview;
