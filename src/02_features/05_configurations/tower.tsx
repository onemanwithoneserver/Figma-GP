import CloseRounded from '@mui/icons-material/CloseRounded';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import BookmarkBorderRounded from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRounded from '@mui/icons-material/BookmarkRounded';
import { getScrollBehavior } from '../../03_shared/04_motion/useMotionSettings';
import { cn } from '../../03_shared/03_utils/utils';
import { ActionButton } from '../../03_shared/02_ui/ActionButton';
import React, { useState, useRef } from 'react';
import type { UnitItem } from './types';
import { defaultUnitData } from './data';

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

export default function Tower({ onClose, unitData = defaultUnitData }: TowerProps) {
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
    imageUrl: unitData?.imageUrl || defaultUnitData.imageUrl,
    specs: unitData?.specs || defaultUnitData.specs,
    towerName: actualTowerName,
    unitNo: (unitData as any)?.unitNo || '104',
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

  const getAvailabilityStyles = (status: string) => {
    switch (status) {
      case 'Available': return 'text-white';
      case 'Limited': return 'text-surface-muted';
      case 'Sold Out': return 'text-outline opacity-80';
      default: return 'text-outline';
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
    <div className="w-full rounded-control border border-outline text-ink overflow-hidden flex flex-col shadow-sm">

      <div className="flex items-center justify-between px-3 py-2 bg-ink border-b border-outline">
        <div className="flex items-center gap-2 text-sm font-normal">
          <span className="text-white/70 text-[10px] font-normal">Bua</span>
          <strong className="text-[12px] text-white font-semibold">{displayData.bua}</strong>
          <span className="text-white/70 text-[10px]">sq.ft</span>
          <div className="w-px h-2.5 bg-white/20"></div>
          <span className="text-white text-[11px] font-normal">{displayData.facing}</span>
          <div className="w-px h-2.5 bg-white/20"></div>
          <span className={`font-normal text-[10px] ${getAvailabilityStyles(displayData.availability)}`}>
            {displayData.availability}
          </span>
        </div>
        <ActionButton
          onClick={onClose}
          className="p-1 rounded-card flex items-center justify-center transition-all glass-dark hover:bg-white/20"
          title="Close view"
        >
          <CloseRounded opacity="0.9" className="w-[12px] h-[12px] text-white" />
        </ActionButton>
      </div>

      <div className="relative w-full group bg-white border-b border-outline">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className={cn("flex w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden", "scrollbar-hide")}

        >
          {images.map((imgSrc, idx) => (
            <img
              key={idx}
              src={imgSrc}
              alt={`Layout marking ${idx + 1}`}
              className="w-[97%] h-[180px] md:h-[220px] mx-auto flex-shrink-0 object-contain object-top bg-white px-[1px] pb-[1px] pt-0 snap-center"
              loading="eager"
              draggable={false}
            />
          ))}
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
          {images.map((_, idx) => (
            <ActionButton
              key={idx}
              onClick={() => scrollToImage(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`transition-all duration-300 rounded-full shadow-sm ${
                activeImageIndex === idx
                  ? 'w-3 h-1 bg-brand-warm'
                  : 'w-1 h-1 bg-outline hover:bg-brand-warm/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-3 py-2 bg-surface-soft border-b border-outline">
        <h3 className="text-[14px] text-ink font-semibold tracking-wide">
          {displayData.towerName} <span className="text-outline font-semibold mx-1">|</span> Unit No. {displayData.unitNo}
        </h3>
      </div>

      <div className="px-3 py-[2px] bg-white">
        {displayData.specs.map((spec, index) => (
          <div key={index} className={`flex justify-between items-center py-[2px] border-b border-outline text-[12px] transition-colors hover:bg-surface-muted/30 -mx-3 px-3 hover:rounded-[3px] ${index % 2 === 0 ? '' : 'bg-surface/40'}`}>
            <span className="text-[#554E48] font-normal">{spec.name}</span>
            <span className="font-semibold text-ink">{spec.dimensions}</span>
          </div>
        ))}

        <div className={`flex justify-between items-center py-[2px] border-b border-outline last:border-0 text-[12px] transition-colors hover:bg-surface-muted/30 -mx-3 px-3 hover:rounded-[3px] ${displayData.specs.length % 2 === 0 ? '' : 'bg-surface/40'}`}>
          <span className="text-[#554E48] font-semibold">Estimated cost</span>
          <span className="font-bold text-brand-warm text-[16px] leading-none">
            {displayData.price
              .replace(/\s*Crore\s*/i, 'Cr')
              .replace(/\s*Lakh\s*/i, 'L')
              .replace(/\s+/g, '')}
          </span>
        </div>

        <div className="pt-3 pb-2">
          <p className="text-[13px] font-normal text-ink mb-1.5">Does this floor plan suit your needs?</p>
          <div className="flex flex-wrap gap-1">
            {suitabilityOptions.map((option) => {
              const isActive = selectedSuitability === option.label;
              return (
                <ActionButton
                  key={option.label}
                  type="button"
                  onClick={() => handleSuitabilitySelect(option.label)}
                  className={`h-[22px] px-[6px] rounded-[2px] border text-[11px] font-normal inline-flex items-center gap-[2px] transition-colors ${
                    isActive
                      ? 'bg-brand-warm text-white border-brand-warm'
                      : 'bg-surface text-[#554E48] border-outline hover:bg-surface-muted'
                  }`}
                >
                  <span aria-hidden="true">{option.emoji}</span>
                  <span>{option.label}</span>
                </ActionButton>
              );
            })}
          </div>

          {selectedSuitability === 'Not for me' && (
            <form onSubmit={handleFeedbackSubmit} className="mt-2 flex flex-col gap-[2px]">
              <textarea
                value={notForMeFeedback}
                onChange={(event) => {
                  setNotForMeFeedback(event.target.value);
                  if (isFeedbackSubmitted) setIsFeedbackSubmitted(false);
                }}
                rows={3}
                placeholder="Tell us what could be better"
                className="w-full resize-none rounded-[2px] border border-outline bg-white px-[4px] py-[2px] text-[11px] font-normal text-ink outline-none focus:border-brand-warm"
              />
              <div className="flex items-center justify-between gap-[2px] mt-1">
                <span className="text-[10px] text-[#7A6F67]">
                  {isFeedbackSubmitted ? 'Thanks for your feedback.' : 'Share feedback and submit'}
                </span>
                <ActionButton
                  type="submit"
                  className="h-[22px] px-[8px] rounded-[2px] border border-brand-warm bg-brand-warm text-white text-[11px] font-normal disabled:opacity-50"
                  disabled={!notForMeFeedback.trim()}
                >
                  Submit
                </ActionButton>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="w-full bg-surface-soft border-t border-outline px-2 py-2 shrink-0">
        <div className="flex items-center gap-2">

          <ActionButton
            onClick={onClose}
            className="flex-1 py-1.5 flex items-center justify-center gap-1.5
            bg-white border border-outline
            text-[#554E48] font-medium text-[12px]
            rounded-chip shadow-sm
            hover:bg-surface-muted hover:text-ink
            transition-all duration-200 active:scale-95"
          >
            <ArrowBackRounded className="w-[14px] h-[14px]" />
            Go back
          </ActionButton>

          <ActionButton
            onClick={() => setIsSaved(!isSaved)}
            className={`flex-1 py-1.5 flex items-center justify-center gap-1.5
            rounded-chip border shadow-sm font-medium text-[12px]
            transition-all duration-200 active:scale-95
            ${
              isSaved
                ? 'bg-brand-warm text-white border-brand-warm'
                : 'bg-white text-[#554E48] border-outline hover:bg-surface-muted hover:text-ink'
            }`}
          >
            {isSaved ? <BookmarkRounded className="h-[14px] w-[14px]" /> : <BookmarkBorderRounded className="h-[14px] w-[14px]" />}
            {isSaved ? 'Saved' : 'Save plan'}
          </ActionButton>

        </div>
      </div>
    </div>
  );
}