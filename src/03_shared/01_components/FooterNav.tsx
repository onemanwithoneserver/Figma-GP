import { MotionButton } from '../02_ui/ActionButton';
import React from 'react';
import Paper from '@mui/material/Paper';
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
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <Paper component="footer" elevation={0} square className="w-full max-w-[390px] bg-white text-foreground backdrop-blur-xl pointer-events-auto relative shadow-footer border-t border-gray-100 px-1">
        <Box component="nav" aria-label="Property actions" className="flex items-end justify-between">
          {navItems.map((item, idx) => {
            if (item.isCenter) {
              return (
                <div key={idx} className="flex flex-col items-center justify-end relative -top-2">
                  <MotionButton
                    aria-label={item.label}
                    whileTap={{ scale: 0.92 }}
                    className="w-10 h-10 flex items-center justify-center bg-ink text-white rounded-full shadow-lg shadow-ink/30 mb-0.5 z-10"
                  >
                    <item.icon className="w-4 h-4 text-white" />
                  </MotionButton>
                  <span className="text-[11px] font-bold text-slate-800 tracking-wide">
                    {item.label}
                  </span>
                </div>
              );
            }

            return (
              <MotionButton
                key={idx}
                whileTap={{ scale: 0.85 }}
                className="flex flex-col items-center justify-center w-12 gap-0.5 group"
              >
                <div className="relative flex items-center justify-center">
                  <span
                    className={`absolute w-8 h-8 flex items-center justify-center text-white rounded-full shadow-lg shadow-ink/30 mb-0.5 z-10 transition-colors duration-300 ${
                      item.isDestructive
                        ? 'bg-[#E65201] group-hover:bg-[#7A0610]'
                        : 'bg-[#E65201]'
                    }`}
                  />
                  <item.icon
                    className="relative z-20 w-4 h-4 text-white transition-colors duration-300"
                  />
                </div>
                <span className={`text-[12px] font-medium mt-0.5 ${
                  item.isDestructive
                    ? 'text-[#D92D20] group-hover:text-[#7A0610]'
                    : 'text-[#261E19] '
                } transition-colors duration-300`}>
                  {item.label}
                </span>
              </MotionButton>
            );
          })}
        </Box>
      </Paper>
    </motion.div>
  );
};

export default FooterNav;
