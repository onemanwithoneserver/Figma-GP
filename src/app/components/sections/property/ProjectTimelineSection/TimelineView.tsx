import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      behavior: 'smooth',
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
    <section className="font-['Outfit',_sans-serif] w-full max-w-[800px] mx-auto px-2">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex flex-col gap-5 pt-0"
      >
        {/* Header Progress Card */}
        <div className="relative overflow-hidden rounded-[7px] bg-[#322822] text-white shadow-sm">
          <div className="relative z-10 px-5 pt-5 pb-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-[18px] leading-none tracking-tight">Timeline</h3>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[11px] font-medium tracking-wide text-[#322822] bg-[#F4EFE6] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E76F26]" />
                {mockBackendData.progress.status}
              </span>
            </div>

            <div className="relative mb-1.5">
              <div className="h-[6px] w-full rounded-full relative overflow-hidden bg-[#4A3F37]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${mockBackendData.progress.percentage}%` }}
                  transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute top-0 left-0 h-full rounded-full bg-[#E76F26]"
                />
              </div>
              <motion.div
                initial={{ left: 0, opacity: 0 }}
                animate={{ left: `${mockBackendData.progress.percentage}%`, opacity: 1 }}
                transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1], opacity: { delay: 1.2, duration: 0.4 } }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-[2px] border-[#322822] bg-[#E76F26]"
              />
            </div>

            <div className="flex justify-between items-end mt-3">
              <div className="flex items-center gap-1.5 pt-2">
             
                <span className="text-[11px] font-normal text-[#F4EFE6]">Started {mockBackendData.progress.startedDate}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 -pt-2 rounded-[6px] bg-[#4A3F37]">
                <span className="text-[11px] font-medium text-white">We are here · {mockBackendData.progress.currentDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Milestones */}
        <div>
          <h3 className="text-[16px] font-bold text-[#322822] mb-5">Milestones</h3>
          <div className="relative ml-3 pl-6 border-l-[2px] border-[#E5DFD4] space-y-8 pb-2">
            
            {/* Approvals */}
            <div className="relative group">
              <div className="absolute -left-[33px] top-0.5 w-[18px] h-[18px] bg-[#322822] rounded-full flex items-center justify-center border-[2px] border-[#F9F7F2] z-10">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
              <h4 className="text-[14px] font-semibold text-[#322822] mb-3">Project Approvals</h4>
              <div className="flex flex-col gap-3 pr-2">
                {mockBackendData.approvals.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between bg-[#FDFBF8] p-4 rounded-[7px] shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center bg-[#F4EFE6] text-[#4A525A] rounded-[5px]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                        </svg>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-[13px] font-medium text-[#322822] leading-none mb-1.5">{doc.name}</p>
                        <p className="text-[11px] text-[#595959] font-normal leading-none">{doc.date}</p>
                      </div>
                    </div>
                    <button
                      aria-label={`View ${doc.name}`}
                      title={`View ${doc.name}`}
                      className="p-1.5 text-[#595959] hover:text-[#322822] transition-colors outline-none"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Construction Phase */}
            <div className="relative">
              <div className="absolute -left-[33px] top-0.5 w-[18px] h-[18px] bg-[#E76F26] rounded-full flex items-center justify-center border-[2px] border-[#F9F7F2]">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
              <h4 className="text-[14px] font-semibold text-[#322822] mb-3">Construction Phase</h4>
              <button
                onClick={() => setIsConstructionOpen(!isConstructionOpen)}
                className="flex items-center gap-1.5 text-[12px] font-medium text-[#4A525A] hover:text-[#322822] bg-[#F4EFE6] hover:bg-[#E5DFD4] px-3 py-1.5 rounded-[5px] transition-colors outline-none"
              >
                <svg className={`w-3.5 h-3.5 transition-transform ${isConstructionOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {isConstructionOpen ? 'Hide Details' : 'View Progress Details'}
              </button>

              <AnimatePresence>
                {isConstructionOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="relative mt-1 pr-2">
                      {canScrollLeft && (
                        <div className="absolute left-0 top-0 z-20 h-full w-12 flex items-center justify-start pointer-events-none" style={{ background: 'linear-gradient(to right, #F9F7F2 40%, rgba(249,247,242,0))' }}>
                          <button
                            type="button"
                            onClick={() => scrollConstruction('left')}
                            aria-label="Scroll construction timeline left"
                            className="pointer-events-auto ml-1 w-6 h-6 rounded-full bg-white/95 border border-[#E5DFD4] flex items-center justify-center text-[#554E48] hover:text-[#322822] hover:border-[#D9D1C6] transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 18l-6-6 6-6" />
                            </svg>
                          </button>
                        </div>
                      )}

                      {canScrollRight && (
                        <div className="absolute right-0 top-0 z-20 h-full w-12 flex items-center justify-end pointer-events-none" style={{ background: 'linear-gradient(to left, #F9F7F2 40%, rgba(249,247,242,0))' }}>
                          <button
                            type="button"
                            onClick={() => scrollConstruction('right')}
                            aria-label="Scroll construction timeline right"
                            className="pointer-events-auto mr-1 w-6 h-6 rounded-full bg-white/95 border border-[#E5DFD4] flex items-center justify-center text-[#554E48] hover:text-[#322822] hover:border-[#D9D1C6] transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 6l6 6-6 6" />
                            </svg>
                          </button>
                        </div>
                      )}

                      <div ref={constructionScrollRef} className="w-full overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      <div className="flex w-full min-w-[320px] justify-between items-start">
                        {mockBackendData.constructionTimeline.map((item, idx) => {
                          const hasImages = item.images.length > 0;
                          const isPast = idx < activeConstructionIndex;
                          const isActive = idx === activeConstructionIndex;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => hasImages && setActiveConstructionIndex(idx)}
                              disabled={!hasImages}
                              className={`relative flex-1 flex flex-col items-center outline-none ${hasImages ? 'group cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
                            >
                              <span className={`text-[11px] font-normal mb-3 transition-colors duration-300 ${isActive ? 'text-[#322822] font-medium' : hasImages ? 'text-[#595959] group-hover:text-[#322822]' : 'text-[#A19891]'}`}>
                                {item.date}
                              </span>
                              <div className="relative w-full flex justify-center items-center h-5">
                                {idx !== 0 && (
                                  <div className={`absolute left-0 w-1/2 h-[2px] transition-colors duration-300 ${isPast || isActive ? 'bg-[#E76F26]' : 'bg-[#E5DFD4]'}`} />
                                )}
                                {idx !== mockBackendData.constructionTimeline.length - 1 && (
                                  <div className={`absolute right-0 w-1/2 h-[2px] transition-colors duration-300 ${isPast ? 'bg-[#E76F26]' : 'bg-[#E5DFD4]'}`} />
                                )}
                                <div className="relative flex items-center justify-center w-5 h-5 z-10">
                                  {/* Thinner, more refined nodes */}
                                  <div className={`rounded-full transition-all duration-300 border-[2px] ${isPast || isActive ? 'w-[10px] h-[10px] bg-[#E76F26] border-[#E76F26]' : hasImages ? 'w-[8px] h-[8px] bg-[#FDFBF8] border-[#D1D5DB] group-hover:border-[#595959]' : 'w-[8px] h-[8px] bg-[#F3EFE9] border-[#D9D1C6]'} ${isActive ? 'scale-[1.3] shadow-[0_0_8px_rgba(231,111,38,0.4)]' : ''}`} />
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeConstructionIndex}
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        className="mt-2 pr-2"
                      >
                        <p className="text-[13px] text-[#322822] font-medium mb-3">
                          {mockBackendData.constructionTimeline[activeConstructionIndex].title}
                        </p>
                        {mockBackendData.constructionTimeline[activeConstructionIndex].images.length > 0 ? (
                          <div className="grid grid-cols-3 gap-3">
                            {mockBackendData.constructionTimeline[activeConstructionIndex].images.map((src, i) => (
                              <img
                                key={i}
                                src={src}
                                onClick={() => setSelectedImage(src)}
                                className="h-24 w-full object-cover rounded-[5px] shadow-sm cursor-zoom-in hover:opacity-90 transition-opacity"
                                alt={`Construction progress photo ${i + 1}`}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 bg-[#FDFBF8] rounded-[5px] text-center shadow-sm">
                            <p className="text-[12px] font-medium text-[#595959]">Images coming soon</p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Handover */}
            <div className="relative">
              <div className="absolute -left-[33px] top-0.5 w-[18px] h-[18px] bg-[#FDFBF8] rounded-full flex items-center justify-center border-[2px] border-[#E5DFD4]">
                <div className="w-1 h-1 bg-[#E5DFD4] rounded-full" />
              </div>
              <h4 className="text-[14px] font-semibold text-[#322822] mb-3">Expected Handover</h4>
              <div className="flex gap-3 pr-2 mb-3">
                {mockBackendData.handover.map((item) => (
                  <div key={item.id} className="flex-1 bg-[#FDFBF8] rounded-[7px] p-4 shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="font-medium text-[#322822] text-[13px]">{item.tower}</h5>
                    <p className="text-[#595959] text-[12px] font-normal mt-1">{item.date}</p>
                    <p className="text-[#8B8C8F] text-[11px] mt-1 font-normal">{item.duration} left</p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => hasHandoverPhotos && setIsHandoverPhotosOpen(!isHandoverPhotosOpen)}
                disabled={!hasHandoverPhotos}
                className={`flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-[5px] transition-colors outline-none ${
                  hasHandoverPhotos
                    ? 'text-[#4A525A] hover:text-[#322822] bg-[#F4EFE6] hover:bg-[#E5DFD4]'
                    : 'text-[#A19891] bg-[#F4EFE6] cursor-not-allowed'
                }`}
              >
                <svg className={`w-3.5 h-3.5 transition-transform ${isHandoverPhotosOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {hasHandoverPhotos ? (isHandoverPhotosOpen ? 'Hide Section' : 'View Photos') : 'Photos not uploaded yet'}
              </button>
              <AnimatePresence>
                {isHandoverPhotosOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-3 mr-2 py-6 bg-[#FDFBF8] rounded-[5px] text-center shadow-sm">
                      <p className="text-[12px] font-medium text-[#595959]">Photos will be updated soon</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RERA */}
            <div className="relative">
              <div className="absolute -left-[33px] top-0.5 w-[18px] h-[18px] bg-[#FDFBF8] rounded-full flex items-center justify-center border-[2px] border-[#E5DFD4]">
                <div className="w-1 h-1 bg-[#E5DFD4] rounded-full" />
              </div>
              <h4 className="text-[14px] font-semibold text-[#322822]">RERA Validity</h4>
              <p className="text-[12px] text-[#595959] font-normal mt-1">Valid until {mockBackendData.reraValidity}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#322822]/95 backdrop-blur-sm cursor-zoom-out p-4"
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage} 
              className="max-w-full max-h-[80vh] rounded-[5px] shadow-2xl"
              alt="Fullscreen view"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TimelineView;