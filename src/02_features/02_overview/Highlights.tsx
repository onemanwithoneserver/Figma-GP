import React from 'react';
import { motion } from 'framer-motion';

interface HighlightItem {
  title: string;
  description: string;
}

const Highlights: React.FC = () => {
  const highlightsData: HighlightItem[] = [
    { title: 'Prime Location', description: 'Strategically located with excellent connectivity.' },
    { title: 'Premium Builder', description: 'Developed by Gully Properties, known for quality.' },
    { title: 'Clubhouse', description: 'Expansive 1200 sq.ft clubhouse with premium facilities.' },
    { title: 'RCC Frame', description: 'Superior quality construction ensuring durability.' },
    { title: 'Easy Finance', description: 'Attractive home loan options from leading banks.' },
  ];

  const containerAnim = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  return (
    <section className="p-4 relative">
      <motion.div
        variants={containerAnim}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-y-2.5"
      >
        {highlightsData.map((highlight, index) => (
          <motion.article
            variants={itemAnim}
            key={index}
            className="group flex items-stretch w-full rounded-[7px] bg-white border border-[#E5DFD4] hover:-translate-y-[1px] transition-all duration-300 overflow-hidden"
          >
            {/* Number column - Flat soft beige */}
            <div className="w-[52px] shrink-0 flex items-center justify-center bg-[#F4EFE6] relative">
              {/* Solid vertical accent */}
              <div className="absolute inset-y-0 left-0 w-[3px] bg-[#F85B01]" />
              {/* Semibold number */}
              <span className="text-[20px] font-semibold text-[#F85B01] leading-none relative z-10">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Content column */}
            <div className="flex-1 px-4 py-3 flex flex-col justify-center">
              {/* Brand dominant title, semibold */}
              <h3 className="text-[13px] font-semibold text-[#322822] leading-tight mb-0.5 group-hover:text-[#F85B01] transition-colors duration-300">
                {highlight.title}
              </h3>
              {/* Warmer, grounded description */}
              <p className="text-[11.5px] text-[#6B5E57] font-medium leading-relaxed">
                {highlight.description}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Highlights;