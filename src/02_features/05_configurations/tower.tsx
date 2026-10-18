import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CloseRounded from '@mui/icons-material/CloseRounded';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import BookmarkBorderRounded from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRounded from '@mui/icons-material/BookmarkRounded';
import SquareFootRounded from '@mui/icons-material/SquareFootRounded';
import ExploreRounded from '@mui/icons-material/ExploreRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import WeekendRounded from '@mui/icons-material/WeekendRounded';
import RestaurantRounded from '@mui/icons-material/RestaurantRounded';
import KitchenRounded from '@mui/icons-material/KitchenRounded';
import BedRounded from '@mui/icons-material/BedRounded';
import BathtubRounded from '@mui/icons-material/BathtubRounded';
import BalconyRounded from '@mui/icons-material/BalconyRounded';
import AccountBalanceWalletRounded from '@mui/icons-material/AccountBalanceWalletRounded';
import { MotionButton } from '../../03_shared/02_ui/ActionButton';
import { useMotionSettings, getScrollBehavior } from '../../03_shared/04_motion/useMotionSettings';
import type { UnitItem } from './types';
import { defaultUnitData } from './data';
import floorPlanImage from '../../05_assets/floor_plan_2bhk.jpg';

interface TowerProps {
  onClose: () => void;
  unitData?: UnitItem;
}

const towerNameMap: Record<string, string> = {
  'All Towers': 'All Towers',
  'Tower A': 'Shlok',
  'Tower B': 'Ayush',
  'Tower C': 'Ananta',
  'Tower D': 'Advait',
  'Tower E': 'Vihaan',
  'Tower F': 'Ishan',
  'Tower G': 'Aarav',
  'Tower H': 'Kavya'
};

const getSpecIcon = (specName: string) => {
  const lower = specName.toLowerCase();
  if (lower.includes('living')) return WeekendRounded;
  if (lower.includes('dining')) return RestaurantRounded;
  if (lower.includes('kitchen')) return KitchenRounded;
  if (lower.includes('master')) return BedRounded;
  if (lower.includes('bedroom')) return BedRounded;
  if (lower.includes('toilet') || lower.includes('bath')) return BathtubRounded;
  if (lower.includes('balcony')) return BalconyRounded;
  return SquareFootRounded;
};

export default function Tower({ onClose, unitData = defaultUnitData }: TowerProps) {
  const { reducedMotion } = useMotionSettings();
  const [isSaved, setIsSaved] = useState(true);
  const [selectedSuitability, setSelectedSuitability] = useState<string | null>(null);
  const [notForMeFeedback, setNotForMeFeedback] = useState('');
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const rawTowerName = (unitData as any)?.towerName || (unitData?.towers && unitData.towers[0]) || 'Tower A';
  const actualTowerName = towerNameMap[rawTowerName] || rawTowerName;

  const displayData = {
    bua: unitData?.bua || defaultUnitData.bua,
    facing: unitData?.facing || defaultUnitData.facing,
    availability: unitData?.availability || defaultUnitData.availability,
    price: unitData?.price || defaultUnitData.price,
    imageUrl: unitData?.imageUrl || floorPlanImage,
    specs: unitData?.specs || defaultUnitData.specs,
    towerName: actualTowerName,
    unitNo: (unitData as any)?.unitNo || '104',
    type: unitData?.type || defaultUnitData.type || '2 BHK',
  };

  const images = [displayData.imageUrl, displayData.imageUrl];
  const suitabilityOptions = [
    { emoji: '😍', label: 'Love it' },
    { emoji: '🙂', label: 'Like it' },
    { emoji: '😐', label: "it's okay" },
    { emoji: '😕', label: 'Not for me' }
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      setActiveImageIndex(newIndex);
    }
  };

  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({ left: width * index, behavior: getScrollBehavior() });
    }
  };

  const handleSuitabilitySelect = (label: string) => {
    setSelectedSuitability(label);
    if (label !== 'Not for me') {
      setNotForMeFeedback('');
      setIsFeedbackSubmitted(false);
    }
  };

  const handleFeedbackSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!notForMeFeedback.trim()) return;
    setIsFeedbackSubmitted(true);
  };

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 32 }}
      animate={
        reducedMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              scale: 1,
              y: [0, -6, 0],
            }
      }
      transition={
        reducedMotion
          ? undefined
          : {
              opacity: { duration: 0.28 },
              scale: { type: 'spring', stiffness: 320, damping: 25 },
              y: {
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 3.6,
                ease: 'easeInOut',
              },
            }
      }
      onClick={(e) => e.stopPropagation()}
      className="relative w-[92vw] max-w-[348px] overflow-hidden rounded-[4px] bg-white border border-[#E8E1D5] shadow-[0_20px_50px_-10px_rgba(26,22,19,0.35),0_0_25px_rgba(248,91,1,0.1)] flex flex-col select-none"
    >

      <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-[#211B17] via-[#2F2620] to-[#211B17] border-b border-[#A68A56]/30 shrink-0 rounded-t-[4px]">
        <div className="flex items-center gap-2.5 text-white">
          <div className="flex items-center gap-1">
            <span className="text-white/60 text-[9.5px] font-medium uppercase tracking-wider">Bua</span>
            <strong className="text-[12px] font-bold text-white">{displayData.bua}</strong>
            <span className="text-white/60 text-[9.5px]">sq.ft</span>
          </div>

          <div className="w-px h-2.5 bg-white/20" />

          <div className="flex items-center gap-1">
            <ExploreRounded className="!w-3 !h-3 text-[#E2D8C9]" />
            <span className="text-[10.5px] font-medium text-white/90">{displayData.facing}</span>
          </div>

          <div className="w-px h-2.5 bg-white/20" />

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-[2px] bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-300">
              {displayData.availability}
            </span>
          </div>
        </div>

        <MotionButton
          onClick={onClose}
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 h-6 rounded-[3px] bg-white/10 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center transition-colors focus-visible:outline-none cursor-pointer"
          title="Close view"
        >
          <CloseRounded className="!w-3.5 !h-3.5" />
        </MotionButton>
      </div>

      <div className="flex flex-col overflow-hidden">

        <div className="relative w-full group bg-gradient-to-b from-[#FBF9F6] to-white border-b border-[#EAE3D9] px-3 pt-2.5 pb-2">

          <div className="absolute top-2.5 left-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-white/90 backdrop-blur-md border border-[#E5DDD2] text-[9.5px] font-bold text-[#43352F] shadow-2xs">
            <SquareFootRounded className="!w-2.5 !h-2.5 text-[#F85B01]" />
            <span>2D Layout</span>
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex w-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((imgSrc, idx) => (
              <div key={idx} className="w-full flex-shrink-0 flex items-center justify-center snap-center">
                <img
                  src={imgSrc}
                  alt={`Layout floor plan view ${idx + 1}`}
                  onError={(e) => {
                    e.currentTarget.src = floorPlanImage;
                  }}
                  className="w-full h-[152px] object-contain rounded-[2px] transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="eager"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1 pt-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToImage(idx)}
                aria-label={`View image ${idx + 1}`}
                className={`transition-all duration-300 rounded-[2px] ${
                  activeImageIndex === idx
                    ? 'w-3.5 h-1 bg-[#F85B01] shadow-2xs'
                    : 'w-1 h-1 bg-[#D5C9B8] hover:bg-[#F85B01]/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-3.5 py-2 bg-[#FAF7F2] border-b border-[#EAE3D9] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[13px] text-[#241E1A] font-bold tracking-tight">
              {displayData.towerName}
            </h3>
            <span className="text-[#A68A56] font-bold text-[12px]">·</span>
            <span className="text-[12px] font-semibold text-[#554E48]">
              Unit No. {displayData.unitNo}
            </span>
          </div>
          <span className="rounded-[2px] bg-[#F85B01]/10 border border-[#F85B01]/25 px-1.5 py-0.2 text-[9.5px] font-bold text-[#F85B01]">
            {displayData.type}
          </span>
        </div>

        <div className="px-3.5 pt-2 pb-1.5 bg-white">
          <div className="grid grid-cols-2 gap-1.5">
            {displayData.specs.map((spec, index) => {
              const SpecIcon = getSpecIcon(spec.name);

              return (
                <div
                  key={index}
                  className="flex items-center justify-between px-2 py-1.5 rounded-[3px] bg-[#FCFAF7] border border-[#EFE9DF]/90 hover:bg-[#F8F5EE] transition-colors"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <SpecIcon className="!w-3 !h-3 text-[#A68A56] shrink-0" />
                    <span className="text-[10px] text-[#554E48] font-medium truncate">
                      {spec.name}
                    </span>
                  </div>
                  <span className="font-bold text-[#241E1A] text-[10px] shrink-0 ml-1">
                    {spec.dimensions}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-2 rounded-[4px] bg-gradient-to-r from-[#FFF6ED] via-[#FFF2E6] to-[#FFEBD9] border border-[#F85B01]/30 px-3 py-1.5 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-1.5">
              <AccountBalanceWalletRounded className="!w-3.5 !h-3.5 text-[#F85B01]" />
              <span className="text-[11px] font-bold text-[#43352F]">Estimated cost:</span>
              <span className="text-[9px] text-[#7A6F67] font-normal">(all incl.)</span>
            </div>

            <span className="font-black text-[#F85B01] text-[15px] tracking-tight">
              {displayData.price
                .replace(/\s*Crore\s*/i, 'Cr')
                .replace(/\s*Lakh\s*/i, 'L')
                .replace(/\s+/g, '')}
            </span>
          </div>

          <div className="pt-2 pb-1">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[11px] font-bold text-[#241E1A]">
                Does this floor plan suit your needs?
              </p>
              {selectedSuitability && (
                <span className="text-[9.5px] font-semibold text-[#F85B01] flex items-center gap-0.5">
                  <CheckCircleRounded className="!w-2.5 !h-2.5" />
                  Recorded
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-1">
              {suitabilityOptions.map((option) => {
                const isActive = selectedSuitability === option.label;
                return (
                  <motion.button
                    key={option.label}
                    type="button"
                    whileHover={reducedMotion ? undefined : { y: -1, scale: 1.02 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                    onClick={() => handleSuitabilitySelect(option.label)}
                    className={`py-1.5 px-0.5 rounded-[3px] border text-[9.5px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#F85B01] to-[#E05000] text-white border-transparent shadow-xs'
                        : 'bg-white text-[#554E48] border-[#E2D8C9] hover:bg-[#FBF9F5] hover:border-[#F85B01]/50'
                    }`}
                  >
                    <span className="text-[12px]" aria-hidden="true">{option.emoji}</span>
                    <span className="leading-tight text-center whitespace-nowrap text-[9px]">
                      {option.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {selectedSuitability === 'Not for me' && (
                <motion.form
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  onSubmit={handleFeedbackSubmit}
                  className="mt-1 flex items-center gap-1.5 rounded-[3px] bg-[#FAF7F2] p-1.5 border border-[#E5DDD2]"
                >
                  <input
                    type="text"
                    value={notForMeFeedback}
                    onChange={(event) => {
                      setNotForMeFeedback(event.target.value);
                      if (isFeedbackSubmitted) setIsFeedbackSubmitted(false);
                    }}
                    placeholder="Tell us what could be better..."
                    className="flex-1 rounded-[2px] border border-[#D5C9B8] bg-white px-2 py-0.5 text-[10px] text-[#241E1A] outline-none focus:border-[#F85B01]"
                  />
                  <MotionButton
                    type="submit"
                    whileHover={reducedMotion ? undefined : { scale: 1.03 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                    className="h-[22px] px-2 rounded-[2px] bg-[#F85B01] hover:bg-[#E05000] text-white text-[10px] font-bold disabled:opacity-50 transition-colors shrink-0"
                    disabled={!notForMeFeedback.trim()}
                  >
                    {isFeedbackSubmitted ? 'Saved' : 'Submit'}
                  </MotionButton>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#FAF7F2] border-t border-[#EAE3D9] px-4 py-3 shrink-0 rounded-b-[4px]">
        <div className="flex items-center justify-center gap-5">
          <MotionButton
            type="button"
            onClick={onClose}
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            whileTap={reducedMotion ? undefined : { scale: 0.96 }}
            className="w-[124px] py-2 flex items-center justify-center gap-1.5 bg-white border border-[#D5C9B8] hover:bg-[#F5EFE6] text-[#43352F] font-bold text-[11.5px] rounded-[4px] shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowBackRounded className="!w-3.5 !h-3.5" />
            Go back
          </MotionButton>

          <MotionButton
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            whileTap={reducedMotion ? undefined : { scale: 0.96 }}
            className={`w-[124px] py-2 flex items-center justify-center gap-1.5 rounded-[4px] font-bold text-[11.5px] shadow-sm transition-all cursor-pointer ${
              isSaved
                ? 'bg-gradient-to-r from-[#F85B01] to-[#E05000] text-white border border-[#E05000] shadow-[0_2px_8px_rgba(248,91,1,0.3)]'
                : 'bg-white text-[#F85B01] border border-[#F85B01] hover:bg-[#F85B01]/5'
            }`}
          >
            {isSaved ? <BookmarkRounded className="!w-3.5 !h-3.5" /> : <BookmarkBorderRounded className="!w-3.5 !h-3.5" />}
            {isSaved ? 'Saved' : 'Save plan'}
          </MotionButton>
        </div>
      </div>
    </motion.div>
  );
}