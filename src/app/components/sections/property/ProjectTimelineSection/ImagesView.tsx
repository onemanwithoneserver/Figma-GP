import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImagesView: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const timelineData = [
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
        'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop'
      ]
    },
    { 
      id: 2, 
      date: "Jan '25", 
      stage: 'Finishing', 
      title: 'Interior & External Plastering', 
      images: [] 
    },
    { 
      id: 3, 
      date: "Jun '25", 
      stage: 'Painting', 
      title: 'Exterior Painting', 
      images: [] 
    },
    { 
      id: 4, 
      date: "Dec '25", 
      stage: 'Handover', 
      title: 'Final Quality Check', 
      images: [] 
    }
  ];

  const activeData = timelineData[activeIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col gap-6 font-['Outfit',_sans-serif]"
    >
      <div className="w-full overflow-x-auto py-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-full min-w-[500px] justify-between items-start">
          {timelineData.map((item, idx) => {
            const isPast = idx < activeIndex;
            const isActive = idx === activeIndex;
            const isFuture = idx > activeIndex;

            return (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className="relative flex-1 flex flex-col items-center group outline-none"
              >
                <span className={`text-[13px] font-extrabold mb-3 transition-colors duration-300 ${isActive ? 'text-[#414246]' : 'text-[#8B8C8F] group-hover:text-[#414246]'}`}>
                  {item.date}
                </span>

                <div className="relative w-full flex justify-center items-center h-6">
                  {idx !== 0 && (
                    <div className={`absolute left-0 w-1/2 h-[3px] transition-colors duration-300 ${isPast || isActive ? 'bg-[#F85B01]' : 'bg-[#E5E0D5]'}`} />
                  )}
                  {idx !== timelineData.length - 1 && (
                    <div className={`absolute right-0 w-1/2 h-[3px] transition-colors duration-300 ${isPast ? 'bg-[#F85B01]' : 'bg-[#E5E0D5]'}`} />
                  )}

                  <div className="relative flex items-center justify-center w-6 h-6 z-10">
                    {isActive && (
                      <div className="absolute inset-0 rounded-full border-[3px] border-[#F85B01]/20 animate-pulse bg-white" />
                    )}
                    <div className={`w-[14px] h-[14px] rounded-full transition-all duration-300 border-[2px] ${isPast || isActive ? 'bg-[#F85B01] border-[#F85B01]' : 'bg-[#D1D5DB] border-[#D1D5DB] group-hover:bg-[#8B8C8F] group-hover:border-[#8B8C8F]'} ${isActive ? 'scale-110' : ''}`} />
                  </div>
                </div>

                <span className={`text-[11px] font-bold mt-3 whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#F85B01]' : 'text-transparent group-hover:text-[#8B8C8F]'}`}>
                  {item.stage}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-[#F9F7F2] rounded-[7px] border border-[#E5E0D5] p-4 shadow-sm min-h-[350px]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-[16px] font-extrabold text-[#414246]">{activeData.title}</h3>
            <p className="text-[12px] text-[#555E68] font-bold mt-1">Stage Progress Images</p>
          </div>
          
          {activeData.images.length > 0 && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#F85B01] hover:text-white rounded-[5px] text-[11px] font-extrabold tracking-wide hover:bg-[#F85B01] transition-colors duration-300 border border-[#F85B01]/30 hover:border-[#F85B01] shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download All
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="w-full"
          >
            {activeData.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {activeData.images.map((img, i) => (
                  <div key={i} className="group relative aspect-square rounded-[7px] overflow-hidden border border-[#E5E0D5] shadow-sm bg-white hover:shadow-md transition-shadow">
                    <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="construction-progress" />
                    
                    <div className="absolute inset-0 bg-[#414246]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button 
                        onClick={() => setSelectedImage(img)}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#414246] shadow-md hover:scale-110 transition-transform"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
                        className="w-10 h-10 bg-[#F85B01] rounded-full flex items-center justify-center text-white shadow-md hover:bg-[#D44D00] hover:scale-110 transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-6 bg-white border-2 border-dashed border-[#E5E0D5] rounded-[7px] text-center">
                <div className="w-16 h-16 bg-[#F9F7F2] rounded-full flex items-center justify-center shadow-sm mb-4 border border-[#E5E0D5]">
                  <svg className="w-8 h-8 text-[#8B8C8F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-[15px] font-extrabold text-[#414246]">Will be updated soon</h4>
                <p className="text-[12px] font-bold text-[#555E68] mt-2 max-w-[200px] leading-relaxed">Images for the {activeData.stage} stage are not yet available.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#414246]/95 p-4"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-[#F85B01] rounded-full flex items-center justify-center text-white transition-all duration-300 z-[110] border border-white/20 group"
            >
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedImage(null)} />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-[105] flex flex-col items-center gap-4"
            >
              <img 
                src={selectedImage} 
                className="max-w-full max-h-[75vh] rounded-[7px] shadow-2xl object-contain border border-white/10"
                alt="Fullscreen Progress"
              />
              <button className="px-6 py-3 bg-[#F85B01] hover:bg-[#D44D00] text-white rounded-[7px] font-extrabold text-[13px] flex items-center gap-2 shadow-md transition-all duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Original File
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImagesView;