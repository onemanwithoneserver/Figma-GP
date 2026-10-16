import { MotionButton } from '../02_ui/ActionButton';
import React from 'react';
import Box from '@mui/material/Box';
import BookmarkBorderRounded from '@mui/icons-material/BookmarkBorderRounded';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import ShareOutlined from '@mui/icons-material/ShareOutlined';
import CloseRounded from '@mui/icons-material/CloseRounded';
import LocalPhoneOutlined from '@mui/icons-material/LocalPhoneOutlined';
import { motion } from 'motion/react';
import { useMotionSettings } from '../04_motion/useMotionSettings';

const FooterNav: React.FC = () => {
  const { reducedMotion, transition } = useMotionSettings();
  const navItems = [
    { icon: BookmarkBorderRounded, label: "Save", id: "save" },
    { icon: VisibilityOffOutlined, label: "Hide", id: "hide" },
    { icon: LocalPhoneOutlined, label: "Contact", id: "contact", isCenter: true },
    { icon: ShareOutlined, label: "Share", id: "share" },
    { icon: CloseRounded, label: "Close", id: "close", isDestructive: true }
  ];

  return (
    <motion.div
      initial={reducedMotion ? false : { y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={transition}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-3 pb-2 pointer-events-none"
    >
      <footer className="relative w-full max-w-[366px] pointer-events-auto overflow-hidden rounded-[28px] border border-white/70 bg-white/45 px-2 py-1.5 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(50,40,34,0.18),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.35)] supports-[not(backdrop-filter:blur(1px))]:bg-white/95">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        <Box component="nav" aria-label="Property actions" className="relative flex items-center justify-between">
          {navItems.map((item, idx) => {
            if (item.isCenter) {
              return (
                <div key={idx} className="flex flex-col items-center justify-center">
                  <MotionButton
                    aria-label={item.label}
                    whileTap={{ scale: 0.92 }}
                    className="w-10 h-10 flex items-center justify-center bg-ink-gradient text-white rounded-full shadow-[0_6px_16px_rgba(50,40,34,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-white/40 mb-0.5"
                  >
                    <item.icon className="w-4 h-4 text-white" />
                  </MotionButton>
                  <span className="text-[11px] font-bold text-ink tracking-wide">
                    {item.label}
                  </span>
                </div>
              );
            }

            return (
              <MotionButton
                key={idx}
                whileTap={{ scale: 0.88 }}
                className="flex flex-col items-center justify-center w-12 gap-0.5 group rounded-2xl"
              >
                <span
                  className={`flex w-8 h-8 items-center justify-center rounded-full border border-white/70 bg-white/50 shadow-[0_2px_8px_rgba(50,40,34,0.10),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md transition-colors duration-300 ${
                    item.isDestructive
                      ? 'text-[#D92D20] group-hover:bg-[#D92D20]/15'
                      : 'text-[#E65201] group-hover:bg-[#E65201]/15'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                </span>
                <span className={`text-[12px] font-medium ${
                  item.isDestructive
                    ? 'text-[#D92D20] group-hover:text-[#7A0610]'
                    : 'text-[#261E19]'
                } transition-colors duration-300`}>
                  {item.label}
                </span>
              </MotionButton>
            );
          })}
        </Box>
      </footer>
    </motion.div>
  );
};

export default FooterNav;
