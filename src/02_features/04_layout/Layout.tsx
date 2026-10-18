import OpenInFullRounded from '@mui/icons-material/OpenInFullRounded';
import { ActionButton } from '../../03_shared/02_ui/ActionButton';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageDialog } from '../../03_shared/02_ui/ImageDialog';
import { useMotionSettings } from '../../03_shared/04_motion/useMotionSettings';
import styles from './Layout.module.css';

type LayoutProps = {
  onTowerSelect?: (towerId: string) => void;
};

const statusConfig = {
  primary: {
    bg: 'bg-brand/10 border border-brand/20',
    dot: 'bg-brand',
    label: 'text-[#D04C00]'
  },
  neutral: {
    bg: 'bg-outline/30 border border-outline/60',
    dot: 'bg-[#8A7D74]',
    label: 'text-ink-muted'
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
  const { reducedMotion, transition } = useMotionSettings();

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  return (
    <div className="w-full bg-surface outfit pb-2">
      <div className="w-full max-w-2xl mx-auto">

        <ActionButton
          aria-label="Open project gallery"
          className={`${styles.gallery} block relative w-full h-[160px] overflow-hidden group bg-ink md:rounded-b-[7px] border-b border-outline/80 cursor-pointer`}
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={galleryImages[0]}
            alt="Project Master Plan"
            className={`${styles.galleryImage} w-full h-full object-cover opacity-85`}
          />

          <div className={`${styles.expandControl} absolute bottom-4 right-4 glass-dark p-2 rounded-control text-white/90`}>
            <OpenInFullRounded className="w-[16px] h-[16px]" />
          </div>
        </ActionButton>

        <div className="flex flex-col gap-2 pt-2">
          {towerData.map((tower, index) => {
            const cfg = statusConfig[tower.statusType as keyof typeof statusConfig];
            const isFuture = tower.statusType === 'neutral';

            return (
              <motion.button
                key={tower.id}
                type="button"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: isFuture ? 0.7 : 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ ...transition, delay: reducedMotion ? 0 : index * 0.035 }}
                className={`${styles.tower} group w-full text-left flex items-center gap-3 rounded-control pl-2 pr-2 py-1.5 bg-white border border-outline/50 ${isFuture ? 'opacity-70' : 'opacity-100'} cursor-pointer`}
                onClick={() => onTowerSelect?.(tower.id)}
              >

                <span className={`${styles.initial} w-10 h-10 rounded-control flex-shrink-0 flex items-center justify-center text-[14px] font-bold text-white ${isFuture ? 'bg-ink/80' : 'bg-[#E65100]'}`}>
                  {tower.initial}
                </span>

                <span className="flex-1 min-w-0 flex items-center justify-between gap-2">
                  <span className="flex-1 flex flex-col justify-center">
                    <span className="text-[16px] font-bold text-ink leading-tight ">
                      {tower.name}
                    </span>
                    <span className="text-[11px] text-ink/70 font-bold  mt-[2px]">
                      {isFuture ? `CONFIG TBD` : tower.config}
                    </span>
                  </span>

                  <span className="flex-shrink-0">
                    <span className={`flex items-center gap-1.5 px-2 py-1 rounded-chip text-[12px] font-bold   ${cfg.bg} ${cfg.label}`}>
                      <span className={`${styles.statusDot} w-1 h-1 rounded-full ${cfg.dot}`} />
                      {tower.status}
                    </span>
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <ImageDialog open={isModalOpen} src={galleryImages[currentImageIndex]}
        alt={`Property view ${currentImageIndex + 1}`}
        onClose={() => setIsModalOpen(false)} onPrevious={handlePrevImage} onNext={handleNextImage}
        counter={`${currentImageIndex + 1} / ${galleryImages.length}`} />
    </div>
  );
};

export default Layout;
