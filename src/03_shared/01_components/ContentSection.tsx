import React from 'react';
import { motion } from 'motion/react';
import { useMotionSettings } from '../04_motion/useMotionSettings';

interface ContentSectionProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, action, children }) => {
  const { reducedMotion, transition } = useMotionSettings();
  return (
    <div className="w-full ">
      <div className="bg-gradient-to-br from-white via-gray-50/50 to-white rounded-control shadow-xl shadow-black/5 border border-gray-100">
        <div className="flex items-center justify-between pt-1 pb-2">
          <motion.h2 className="text-[18px] font-bold text-[#1F2933] drop-shadow-sm px-2"
            initial={reducedMotion ? false : { opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{ ...transition, duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.08 }}>
            {title}
          </motion.h2>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default ContentSection;
