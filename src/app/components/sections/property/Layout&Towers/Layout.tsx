import React, { useState } from 'react';

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
  { id: 'A', name: 'Tower A', subName: 'Advaita', floors: 'G+14', status: 'Ready to Move', statusType: 'primary' },
  { id: 'B', name: 'Tower B', subName: 'Bhavya', floors: 'G+12', status: 'Under Construction', statusType: 'primary' },
  { id: 'C', name: 'Tower C', subName: 'Chirag', floors: 'G+10', status: 'Launching Soon', statusType: 'primary' },
  { id: 'D', name: 'Tower D', subName: '—', floors: 'TBD', status: 'Future Phase', statusType: 'neutral' },
  { id: 'E', name: 'Tower E', subName: '—', floors: 'TBD', status: 'Future Phase', statusType: 'neutral' },
  { id: 'F', name: 'Tower F', subName: '—', floors: 'TBD', status: 'Future Phase', statusType: 'neutral' },
  { id: 'G', name: 'Tower G', subName: '—', floors: 'TBD', status: 'Future Phase', statusType: 'neutral' },
  { id: 'H', name: 'Tower H', subName: '—', floors: 'TBD', status: 'Future Phase', statusType: 'neutral' },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80"
];

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  return (
    <div className="w-full bg-[#F9F7F2] font-sans pb-2">
      <div className="w-full max-w-2xl mx-auto">
        
        <div 
          className="relative w-full h-[140px] overflow-hidden group bg-[#322822] md:rounded-b-[8px] border-b border-[#E5DFD4]/80 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={galleryImages[0]}
            alt="Project Master Plan"
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-85"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#322822] via-[#322822]/20 to-transparent opacity-90" />

          <div className="absolute top-5 right-5">
            <span className="px-3 py-1 rounded-[6px] text-[10px] font-bold tracking-wider text-[#322822] bg-white shadow-sm uppercase">
              8 Towers · 3 Phases
            </span>
          </div>

          <div className="absolute bottom-8 left-6 flex flex-col gap-0.5 pointer-events-none">
            <p className="text-[12px] font-medium text-[#E5DFD4]/80 tracking-[0.1em] uppercase">Master Plan</p>
            <p className="text-[32px] md:text-[36px] font-bold text-white leading-[1.1] tracking-tight flex items-center gap-3">
              Site Overview
            </p>
          </div>

          <div className="absolute bottom-3 right-4 bg-black/40 p-2 rounded-full text-white/90 backdrop-blur-sm group-hover:bg-black/60 group-hover:text-white transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 px-4 mt-6 md:px-0 mb-0">
          {towerData.map((tower) => {
            const cfg = statusConfig[tower.statusType];
            const isFuture = tower.statusType === 'neutral';
            
            return (
              <div
                key={tower.id}
                className={`group flex items-center gap-4 rounded-[8px] pl-2.5 pr-3 py-[10px] transition-all duration-300 bg-white border border-[#E5DFD4]/50 hover:border-[#322822]/15 hover:shadow-sm ${isFuture ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}
              >
                <div className={`w-10 h-10 rounded-[6px] flex-shrink-0 flex items-center justify-center text-[15px] font-bold text-white transition-colors duration-300 ${isFuture ? 'bg-[#322822]/80' : 'bg-[#E65100]'}`}>
                  {tower.id}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="text-[15px] font-semibold text-[#322822] leading-tight mb-0.5">
                    {tower.name}
                  </p>
                  <p className="text-[11px] text-[#8A7D74] font-medium tracking-wide">
                    {isFuture ? `${tower.floors} · TBA` : `${tower.subName} · ${tower.floors}`}
                  </p>
                </div>

                <span className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[10px] font-bold tracking-wide uppercase ${cfg.bg} ${cfg.label}`}>
                  <span className={`w-1 h-1 rounded-full ${cfg.dot}`} />
                  {tower.status}
                </span>
              </div>
            );
          })}
        </div>
        
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300 transition-colors z-50"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>

          <button 
            className="absolute left-4 md:left-10 text-white text-5xl hover:text-gray-300 transition-colors z-50 px-4 py-2"
            onClick={handlePrevImage}
          >
            &#8249;
          </button>

          <img 
            src={galleryImages[currentImageIndex]} 
            alt={`Property view ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button 
            className="absolute right-4 md:right-10 text-white text-5xl hover:text-gray-300 transition-colors z-50 px-4 py-2"
            onClick={handleNextImage}
          >
            &#8250;
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm tracking-widest">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;