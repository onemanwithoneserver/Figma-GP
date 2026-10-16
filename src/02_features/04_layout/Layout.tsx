import React, { useState } from 'react';

type LayoutProps = {
  onTowerSelect?: (towerId: string) => void;
};

const statusConfig = {
  primary: { 
    bg: 'bg-[#F85B01]/10 border border-[#F85B01]/20', 
    dot: 'bg-[#F85B01]', 
    label: 'text-[#D04C00]' 
  },
  neutral: { 
    bg: 'bg-[#E5DFD4]/30 border border-[#E5DFD4]/60', 
    dot: 'bg-[#8A7D74]', 
    label: 'text-[#6B5E57]' 
  },
};

const towerData = [
  { id: 'shlok', name: 'Shlok', config: '2, 3 & 4 BHK', status: 'Ready to Move', statusType: 'primary', initial: 'S' },
  { id: 'ayush', name: 'Ayush', config: '2 & 3 BHK', status: 'Under Construction', statusType: 'primary', initial: 'A' },
  { id: 'ananta', name: 'Ananta', config: '3 BHK', status: 'Launching Soon', statusType: 'primary', initial: 'A' },
  { id: 'advait', name: 'Advait', config: 'TBD', status: 'Future Phase', statusType: 'neutral', initial: 'A' },
  { id: 'vihaan', name: 'Vihaan', config: 'TBD', status: 'Future Phase', statusType: 'neutral', initial: 'V' },
  { id: 'ishan', name: 'Ishan', config: 'TBD', status: 'Future Phase', statusType: 'neutral', initial: 'I' },
  { id: 'aarav', name: 'Aarav', config: 'TBD', status: 'Future Phase', statusType: 'neutral', initial: 'A' },
  { id: 'kavya', name: 'Kavya', config: 'TBD', status: 'Future Phase', statusType: 'neutral', initial: 'K' },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80"
];

const Layout = ({ onTowerSelect }: LayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  return (
    <div className="w-full bg-[#F9F7F2] outfit pb-2">
      <div className="w-full max-w-2xl mx-auto">
        
        {/* Header Section - Max Round 7px */}
        <div 
          className="relative w-full h-[160px] overflow-hidden group bg-[#322822] md:rounded-b-[7px] border-b border-[#E5DFD4]/80 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={galleryImages[0]}
            alt="Project Master Plan"
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-85"
          />
          

          <div className="absolute bottom-4 right-4 bg-black/40 p-2 rounded-[7px] text-white/90 backdrop-blur-sm group-hover:bg-black/60 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </div>
        </div>

        {/* List Section */}
        <div className="flex flex-col gap-2 pt-2">
          {towerData.map((tower) => {
            const cfg = statusConfig[tower.statusType as keyof typeof statusConfig];
            const isFuture = tower.statusType === 'neutral';
            
            return (
              <div
                key={tower.id}
                className={`group flex items-center gap-3 rounded-[7px] pl-2 pr-2 py-1.5 transition-all duration-300 bg-white border border-[#E5DFD4]/50 hover:border-[#322822]/15 hover:shadow-md ${isFuture ? 'opacity-70' : 'opacity-100'} cursor-pointer`}
                onClick={() => onTowerSelect?.(tower.id)}
              >
                {/* Initial Box - Returned to Orange for active, Original dark for future */}
                <div className={`w-10 h-10 rounded-[7px] flex-shrink-0 flex items-center justify-center text-[14px] font-bold text-white transition-colors duration-300 ${isFuture ? 'bg-[#322822]/80' : 'bg-[#E65100]'}`}>
                  {tower.initial}
                </div>

                <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[16px] font-bold text-[#322822] leading-tight ">
                      {tower.name}
                    </p>
                    <p className="text-[11px] text-[#322822]/70 font-bold  mt-[2px]">
                      {isFuture ? `CONFIG TBD` : tower.config}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <span className={`flex items-center gap-1.5 px-2 py-1 rounded-[5px] text-[12px] font-bold   ${cfg.bg} ${cfg.label}`}>
                      <span className={`w-1 h-1 rounded-full ${cfg.dot}`} />
                      {tower.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 text-3xl hover:text-white transition-colors z-50"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>

          <button 
            className="absolute left-4 md:left-8 text-white/50 text-5xl hover:text-white transition-colors z-50 p-2"
            onClick={handlePrevImage}
          >
            &#8249;
          </button>

          <img 
            src={galleryImages[currentImageIndex]} 
            alt={`Property view ${currentImageIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain rounded-[7px] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button 
            className="absolute right-4 md:right-8 text-white/50 text-5xl hover:text-white transition-colors z-50 p-2"
            onClick={handleNextImage}
          >
            &#8250;
          </button>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-[10px] font-bold tracking-[0.3em] ">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;