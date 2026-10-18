import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import { cn } from '../../03_shared/03_utils/utils';
import { ActionButton } from '../../03_shared/02_ui/ActionButton';
import React, { useEffect, useRef, useState } from 'react';
import { ImageDialog } from '../../03_shared/02_ui/ImageDialog';
import { motion, AnimatePresence } from 'motion/react';
import { getScrollBehavior, useMotionSettings } from '../../03_shared/04_motion/useMotionSettings';
import { TransitionPanel } from '../../03_shared/04_motion/TransitionPanel';

const mockBackendData = {
  progress: {
    startedDate: "May 2022",
    currentDate: "Feb 2026",
    percentage: 80,
    status: "Under Construction"
  },
  approvals: [
    { id: 1, name: "HMDA Approval", date: "May 2022", fileUrl: "#" },
    { id: 2, name: "RERA Certificate", date: "Jun 2022", fileUrl: "#" }
  ],
  constructionTimeline: [
    {
      id: 0,
      date: "Mar '24",
      stage: 'Foundation',
      title: 'Excavation & Digging Work',
      images: [
        'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517089535811-62506199f18e?q=80&w=1200&auto=format&fit=crop'
      ]
    },
    {
      id: 1,
      date: "Oct '24",
      stage: 'Structure',
      title: 'Tower A — 11th Floor Slab',
      images: [
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=1200&auto=format&fit=crop'
      ]
    },
    { id: 2, date: "Jan '25", stage: 'Finishing', title: 'Interior & External Plastering', images: [] },
    { id: 3, date: "Jun '25", stage: 'Painting', title: 'Exterior Painting', images: [] },
    { id: 4, date: "Dec '25", stage: 'Handover', title: 'Final Quality Check', images: [] }
  ],
  handover: [
    { id: 1, tower: "Tower A", date: "Apr 2026", duration: "~2 months" },
    { id: 2, tower: "Tower B", date: "Nov 2026", duration: "~9 months" }
  ],
  reraValidity: "Oct 2028"
};

const TimelineView: React.FC = () => {
  const { reducedMotion, transition } = useMotionSettings();
  const [isConstructionOpen, setIsConstructionOpen] = useState(false);
  const [isHandoverPhotosOpen, setIsHandoverPhotosOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeConstructionIndex, setActiveConstructionIndex] = useState(1);
  const hasHandoverPhotos = false;
  const constructionScrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkConstructionScroll = () => {
    const el = constructionScrollRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 2);
  };

  const scrollConstruction = (direction: 'left' | 'right') => {
    const el = constructionScrollRef.current;
    if (!el) return;
    const offset = Math.max(140, Math.floor(el.clientWidth * 0.45));
    el.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: getScrollBehavior(),
    });
  };

  useEffect(() => {
    if (!isConstructionOpen) return;
    const el = constructionScrollRef.current;
    if (!el) return;

    checkConstructionScroll();
    const onScroll = () => checkConstructionScroll();
    const onResize = () => checkConstructionScroll();

    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [isConstructionOpen]);

  return (
    <section className="w-full max-w-[800px] mx-auto px-2">
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
        className="flex flex-col gap-5 pt-0"
      >
        {/* Header Progress Card */}
        <div className="relative overflow-hidden rounded-control bg-ink text-white shadow-sm">
          {/* Subtle warm ambient glow behind the card */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-warm/20 blur-2xl" />

          <div className="relative z-10 px-5 pt-5 pb-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-[18px] leading-none tracking-tight">Timeline</h3>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-card text-[11px] font-medium tracking-wide text-ink bg-surface-muted shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-warm opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-warm" />
                </span>
                {mockBackendData.progress.status}
              </span>
            </div>

            {/* Enhanced Animated Slider Track */}
            <div className="relative mb-2 pt-2.5">
              {/* Background Track with Milestone Notch Markers */}
              <div className="h-[8px] w-full rounded-full relative overflow-hidden bg-[#4A3F37] border border-white/5">
                {/* Ticks for start, mid, end */}
                <div aria-hidden="true" className="absolute inset-0 flex justify-between px-1 pointer-events-none z-0">
                  <span className="w-1 h-full bg-white/10 rounded-full" />
                  <span className="w-1 h-full bg-white/10 rounded-full" style={{ marginLeft: '45%' }} />
                  <span className="w-1 h-full bg-white/10 rounded-full" />
                </div>

                {/* Animated Fill Bar with glowing gradient */}
                <motion.div
                  initial={reducedMotion ? false : { width: '0%' }}
                  whileInView={{ width: `${mockBackendData.progress.percentage}%` }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ type: 'spring', stiffness: 85, damping: 18, delay: 0.1 }}
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#F85B01] via-[#FF7A1A] to-[#E76F26] shadow-[0_0_12px_rgba(248,91,1,0.6)] relative overflow-hidden"
                >
                  {/* Moving Shimmer Beam across the filled bar */}
                  {!reducedMotion && (
                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/45 to-transparent -skew-x-20"
                      animate={{ x: ['-100%', '300%'] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.8 }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Animated Floating Handle with Dual Pulse Rings */}
              <motion.div
                initial={reducedMotion ? false : { left: '0%', opacity: 0, scale: 0.5 }}
                whileInView={{ left: `${mockBackendData.progress.percentage}%`, opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 85, damping: 18, delay: 0.1 }}
                className="absolute top-[14px] -translate-y-1/2 -translate-x-1/2 z-20 flex flex-col items-center group cursor-pointer"
              >
                {/* Expanding Pulse Ring Radiators */}
                <span aria-hidden="true" className="absolute -inset-1.5 rounded-full bg-brand-warm pulse-ring pointer-events-none" />
                <span aria-hidden="true" className="absolute -inset-3 rounded-full bg-brand-warm/60 pulse-ring [animation-delay:0.9s] pointer-events-none" />

                {/* Slider Knob */}
                <div className="relative w-4 h-4 rounded-full bg-[#E76F26] border-2 border-white shadow-[0_0_12px_rgba(248,91,1,0.9)] transition-transform duration-200 group-hover:scale-125 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                </div>
              </motion.div>
            </div>

            <div className="flex justify-between items-end mt-3">
              <div className="flex items-center gap-1.5 pt-2">
                <span className="text-[11px] font-normal text-surface-muted">Started {mockBackendData.progress.startedDate}</span>
              </div>
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.25, duration: 0.35 }}
                className="flex items-center gap-1.5 px-2.5 py-1 -pt-2 rounded-card bg-[#4A3F37] border border-white/10 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-warm animate-pulse" />
                <span className="text-[11px] font-medium text-white">We are here · {mockBackendData.progress.currentDate}</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Vertical Milestones */}
        <div>
          <h3 className="text-[16px] font-bold text-ink mb-5">Milestones</h3>
          <div className="relative ml-3 pl-6 border-l-[2px] border-outline space-y-8 pb-2">

            {/* Approvals */}
            <div className="relative group">
              <div className="absolute -left-[33px] top-0.5 w-[18px] h-[18px] bg-ink rounded-full flex items-center justify-center border-[2px] border-surface z-10">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
              <h4 className="text-[14px] font-semibold text-ink mb-3">Project Approvals</h4>
              <div className="flex flex-col gap-3 pr-2">
                {mockBackendData.approvals.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between bg-surface-soft p-4 rounded-control shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center bg-surface-muted text-[#4A525A] rounded-chip">
                        <DescriptionOutlined className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-[13px] font-medium text-ink leading-none mb-1.5">{doc.name}</p>
                        <p className="text-[11px] text-[#595959] font-normal leading-none">{doc.date}</p>
                      </div>
                    </div>
                    <ActionButton
                      aria-label={`View ${doc.name}`}
                      title={`View ${doc.name}`}
                      className="p-1.5 text-[#595959] hover:text-ink transition-colors outline-none"
                    >
                      <VisibilityOutlined className="w-4 h-4" />
                    </ActionButton>
                  </div>
                ))}
              </div>
            </div>

            {/* Construction Phase */}
            <div className="relative">
              <div className="absolute -left-[33px] top-0.5 w-[18px] h-[18px] bg-brand-warm rounded-full flex items-center justify-center border-[2px] border-surface">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
              <h4 className="text-[14px] font-semibold text-ink mb-3">Construction Phase</h4>
              <ActionButton
                onClick={() => setIsConstructionOpen(!isConstructionOpen)}
                className="flex items-center gap-1.5 text-[12px] font-medium text-[#4A525A] hover:text-ink bg-surface-muted hover:bg-outline px-3 py-1.5 rounded-chip transition-colors outline-none"
              >
                <ExpandMoreRounded className={`w-3.5 h-3.5 transition-transform ${isConstructionOpen ? 'rotate-180' : ''}`}  />
                {isConstructionOpen ? 'Hide Details' : 'View Progress Details'}
              </ActionButton>

              <AnimatePresence>
                {isConstructionOpen && (
                  <motion.div initial={reducedMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="relative mt-1 pr-2">
                      {canScrollLeft && (
                        <div className={cn("absolute left-0 top-0 z-20 h-full w-12 flex items-center justify-start pointer-events-none", "bg-scroll-fade-left")} >
                          <ActionButton
                            type="button"
                            onClick={() => scrollConstruction('left')}
                            aria-label="Scroll construction timeline left"
                            className="pointer-events-auto ml-1 w-6 h-6 rounded-full bg-white/95 border border-outline flex items-center justify-center text-[#554E48] hover:text-ink hover:border-[#D9D1C6] transition-colors"
                          >
                            <ChevronLeftRounded className="w-3.5 h-3.5" />
                          </ActionButton>
                        </div>
                      )}

                      {canScrollRight && (
                        <div className={cn("absolute right-0 top-0 z-20 h-full w-12 flex items-center justify-end pointer-events-none", "bg-scroll-fade-right")} >
                          <ActionButton
                            type="button"
                            onClick={() => scrollConstruction('right')}
                            aria-label="Scroll construction timeline right"
                            className="pointer-events-auto mr-1 w-6 h-6 rounded-full bg-white/95 border border-outline flex items-center justify-center text-[#554E48] hover:text-ink hover:border-[#D9D1C6] transition-colors"
                          >
                            <ChevronRightRounded className="w-3.5 h-3.5" />
                          </ActionButton>
                        </div>
                      )}

                      <div ref={constructionScrollRef} className="w-full overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      <div className="flex w-full min-w-[320px] justify-between items-start">
                        {mockBackendData.constructionTimeline.map((item, idx) => {
                          const hasImages = item.images.length > 0;
                          const isPast = idx < activeConstructionIndex;
                          const isActive = idx === activeConstructionIndex;
                          return (
                            <ActionButton
                              key={item.id}
                              type="button"
                              onClick={() => hasImages && setActiveConstructionIndex(idx)}
                              disabled={!hasImages}
                              className={`relative flex-1 flex flex-col items-center outline-none ${hasImages ? 'group cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
                            >
                              <span className={`text-[11px] font-normal mb-3 transition-colors duration-300 ${isActive ? 'text-ink font-medium' : hasImages ? 'text-[#595959] group-hover:text-ink' : 'text-[#A19891]'}`}>
                                {item.date}
                              </span>
                              <div className="relative w-full flex justify-center items-center h-5">
                                {idx !== 0 && (
                                  <div className={`absolute left-0 w-1/2 h-[2px] transition-colors duration-300 ${isPast || isActive ? 'bg-brand-warm' : 'bg-outline'}`} />
                                )}
                                {idx !== mockBackendData.constructionTimeline.length - 1 && (
                                  <div className={`absolute right-0 w-1/2 h-[2px] transition-colors duration-300 ${isPast ? 'bg-brand-warm' : 'bg-outline'}`} />
                                )}
                                <div className="relative flex items-center justify-center w-5 h-5 z-10">
                                  {/* Thinner, more refined nodes */}
                                  <div className={`rounded-full transition-all duration-300 border-[2px] ${isPast || isActive ? 'w-[10px] h-[10px] bg-brand-warm border-brand-warm' : hasImages ? 'w-[8px] h-[8px] bg-surface-soft border-[#D1D5DB] group-hover:border-[#595959]' : 'w-[8px] h-[8px] bg-[#F3EFE9] border-[#D9D1C6]'} ${isActive ? 'scale-[1.3] shadow-[0_0_8px_rgba(231,111,38,0.4)]' : ''}`} />
                                </div>
                              </div>
                            </ActionButton>
                          );
                        })}
                      </div>
                      </div>
                    </div>

                    <TransitionPanel transitionKey={String(activeConstructionIndex)} className="mt-2 pr-2">
                        <p className="text-[13px] text-ink font-medium mb-3">
                          {mockBackendData.constructionTimeline[activeConstructionIndex].title}
                        </p>
                        {mockBackendData.constructionTimeline[activeConstructionIndex].images.length > 0 ? (
                          <div className="grid grid-cols-3 gap-3">
                            {mockBackendData.constructionTimeline[activeConstructionIndex].images.map((src, i) => (
                              <img
                                key={i}
                                src={src}
                                onClick={() => setSelectedImage(src)}
                                className="h-24 w-full object-cover rounded-chip shadow-sm cursor-zoom-in hover:opacity-90 transition-opacity"
                                alt={`Construction progress photo ${i + 1}`}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 bg-surface-soft rounded-chip text-center shadow-sm">
                            <p className="text-[12px] font-medium text-[#595959]">Images coming soon</p>
                          </div>
                        )}
                    </TransitionPanel>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Handover */}
            <div className="relative">
              <div className="absolute -left-[33px] top-0.5 w-[18px] h-[18px] bg-surface-soft rounded-full flex items-center justify-center border-[2px] border-outline">
                <div className="w-1 h-1 bg-outline rounded-full" />
              </div>
              <h4 className="text-[14px] font-semibold text-ink mb-3">Expected Handover</h4>
              <div className="flex gap-3 pr-2 mb-3">
                {mockBackendData.handover.map((item) => (
                  <div key={item.id} className="flex-1 bg-surface-soft rounded-control p-4 shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="font-medium text-ink text-[13px]">{item.tower}</h5>
                    <p className="text-[#595959] text-[12px] font-normal mt-1">{item.date}</p>
                    <p className="text-[#8B8C8F] text-[11px] mt-1 font-normal">{item.duration} left</p>
                  </div>
                ))}
              </div>
              <ActionButton
                type="button"
                onClick={() => hasHandoverPhotos && setIsHandoverPhotosOpen(!isHandoverPhotosOpen)}
                disabled={!hasHandoverPhotos}
                className={`flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-chip transition-colors outline-none ${
                  hasHandoverPhotos
                    ? 'text-[#4A525A] hover:text-ink bg-surface-muted hover:bg-outline'
                    : 'text-[#A19891] bg-surface-muted cursor-not-allowed'
                }`}
              >
                <ExpandMoreRounded className={`w-3.5 h-3.5 transition-transform ${isHandoverPhotosOpen ? 'rotate-180' : ''}`}  />
                {hasHandoverPhotos ? (isHandoverPhotosOpen ? 'Hide Section' : 'View Photos') : 'Photos not uploaded yet'}
              </ActionButton>
              <AnimatePresence>
                {isHandoverPhotosOpen && (
                  <motion.div initial={reducedMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-3 mr-2 py-6 bg-surface-soft rounded-chip text-center shadow-sm">
                      <p className="text-[12px] font-medium text-[#595959]">Photos will be updated soon</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RERA */}
            <div className="relative">
              <div className="absolute -left-[33px] top-0.5 w-[18px] h-[18px] bg-surface-soft rounded-full flex items-center justify-center border-[2px] border-outline">
                <div className="w-1 h-1 bg-outline rounded-full" />
              </div>
              <h4 className="text-[14px] font-semibold text-ink">RERA Validity</h4>
              <p className="text-[12px] text-[#595959] font-normal mt-1">Valid until {mockBackendData.reraValidity}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <ImageDialog open={Boolean(selectedImage)} src={selectedImage || ''} alt="Construction photo"
        onClose={() => setSelectedImage(null)} backdropClassName="bg-ink/95" />
    </section>
  );
};

export default TimelineView;
