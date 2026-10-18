import React, { useState } from 'react';
import { MotionButton } from '../../03_shared/02_ui/ActionButton';
import { AppDialog } from '../../03_shared/02_ui/AppDialog';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { useMotionSettings } from '../../03_shared/04_motion/useMotionSettings';
import { SamplePdfViewer } from './SamplePdfViewer';
import { ModernPdfDropdown, type ProjectFileItem } from './ModernPdfDropdown';
import { motion, AnimatePresence } from 'motion/react';

const PROJECT_FILES: ProjectFileItem[] = [
  { id: 1, label: 'Brochure', size: '4.8 MB', description: 'Complete project walkthrough & amenities' },
  { id: 2, label: 'HMDA', size: '1.4 MB', description: 'LP No. 000123/LO/Plg/HMDA/2022' },
  { id: 3, label: 'RERA', size: '980 KB', description: 'TS RERA Reg: P02400004567' },
  { id: 4, label: 'Floor Plans', size: '6.2 MB', description: 'Tower A, B & C 2 & 3 BHK unit layouts' },
  { id: 5, label: 'Price Card', size: '850 KB', description: 'Unit cost breakdown & payment schedule' },
];

const PdfIcon = ({ className = 'h-10 w-10' }: { className?: string }) => (
  <svg
    className={className}
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M17 5H32L41 14V42C41 44.209 39.209 46 37 46H17C14.791 46 13 44.209 13 42V9C13 6.791 14.791 5 17 5Z"
      stroke="#111827"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    <path
      d="M32 5V11.8C32 13.015 32.985 14 34.2 14H41"
      stroke="#111827"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    <rect x="3" y="23" width="36" height="14" rx="2.8" fill="#EF1F24" />
    <text
      x="21"
      y="32.5"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize="8.8"
      fontWeight="800"
      fontFamily="Arial, Helvetica, sans-serif"
      letterSpacing="0.5"
    >
      PDF
    </text>
  </svg>
);

const EyeIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ProjectFilesSection: React.FC = () => {
  const { reducedMotion } = useMotionSettings();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ProjectFileItem>(PROJECT_FILES[0]);

  const handleCardClick = (file: ProjectFileItem) => {
    setSelectedFile(file);
    setModalOpen(true);
  };

  const handleViewAllClick = () => {
    setSelectedFile(PROJECT_FILES[0]);
    setModalOpen(true);
  };

  return (
    <div className="w-full rounded-[10px] bg-[#161412] px-3.5 py-3 shadow-md">
      <div className="flex items-center justify-between pb-3 pt-0.5 px-0.5">
        <h2 className="text-[18px] font-bold tracking-tight text-white drop-shadow-sm">
          Project Files
        </h2>

        <MotionButton
          type="button"
          onClick={handleViewAllClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group flex items-center gap-1.5 rounded-[8px] bg-[#F85B01] hover:bg-[#E05000] px-3.5 py-1.5 text-[11px] font-bold text-white shadow-sm transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F85B01] cursor-pointer"
          title="View All"
        >
          <EyeIcon className="transition-transform duration-200 group-hover:scale-110" />
          <span>View All</span>
        </MotionButton>
      </div>

      <div className="grid grid-cols-5 gap-1.5 py-0.5">
        {PROJECT_FILES.map((file) => (
          <MotionButton
            key={file.id}
            type="button"
            onClick={() => handleCardClick(file)}
            whileHover={reducedMotion ? undefined : { y: -3, scale: 1.03 }}
            whileTap={reducedMotion ? undefined : { scale: 0.95 }}
            className="group flex w-full h-[82px] flex-col items-center justify-between rounded-[10px] bg-[#E5E7EB] hover:bg-white px-1 py-2 transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-black/25 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F85B01]"
            title={file.label}
          >
            <PdfIcon className="h-9 w-9 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <div className="flex h-[26px] items-center justify-center w-full">
              <span className="w-full text-center text-[10px] xs:text-[10.5px] font-bold leading-tight text-[#1F2933] group-hover:text-[#F85B01] transition-colors duration-200 line-clamp-2">
                {file.label}
              </span>
            </div>
          </MotionButton>
        ))}
      </div>

      <AppDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        label="Project Files"
        containerClassName="p-2 sm:p-4 flex items-center justify-center"
      >
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 360, damping: 26 }}
              className="w-[96vw] max-w-[560px] max-h-[90dvh] rounded-[18px] border border-white/20 bg-[#161412] text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between gap-2 px-3 py-2.5 bg-[#141210] border-b border-white/10 flex-shrink-0 z-30">
                <ModernPdfDropdown
                  files={PROJECT_FILES}
                  selectedFile={selectedFile}
                  onSelect={(file) => setSelectedFile(file)}
                />

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setModalOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/25 hover:text-white cursor-pointer transition-colors flex-shrink-0 ml-auto outline-none"
                  aria-label="Close dialog"
                >
                  <CloseRounded className="!w-4 !h-4" />
                </motion.button>
              </div>

              <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                <SamplePdfViewer
                  fileId={selectedFile.id}
                  fileName={selectedFile.label}
                  fileSize={selectedFile.size}
                  isCompact={false}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AppDialog>
    </div>
  );
};

export default ProjectFilesSection;
