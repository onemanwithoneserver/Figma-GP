import React from 'react';
import { Bookmark, EyeOff, Share2, X } from 'lucide-react';
import { motion } from 'framer-motion';

const FooterNav: React.FC = () => {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      {/* Reduced py-5 to py-3 to decrease footer height */}
      <div className="w-full max-w-[390px] bg-gradient-to-b from-white to-gray-50/95 backdrop-blur-md px-4 py-3.5 pointer-events-auto relative overflow-hidden shadow-2xl shadow-black/20 border-t border-gray-200/50">
        
        {/* Subtle Shine Reflection Animation across the top edge */}
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 5 }}
          className="absolute top-0 left-0 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
        />

        <div className="flex items-center justify-between gap-2">
          
          {/* Grouped Icons with Individual Hover States */}
          <div className="flex items-center gap-px ml-1">
            {[
              { icon: Bookmark, label: "Save", delay: 0.1 },
              { icon: EyeOff, label: "Hide", delay: 0.15 },
              { icon: Share2, label: "Share", delay: 0.2 }
            ].map((item, idx) => (
              <motion.button 
                key={idx}
                whileHover={{ y: -4, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="relative group p-1.5 rounded-full hover:bg-slate-100/80 transition-colors"
              >
                {/* Decreased icon size from w-6 h-6 to w-5 h-5 */}
                <item.icon className="w-5 h-5 text-[#2F3D5A] group-hover:text-amber-600 transition-colors duration-300" strokeWidth={1.5} />
                {/* Under-dot glow on hover */}
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm shadow-amber-500" />
              </motion.button>
            ))}
          </div>

          {/* Center: Premium "Breathing" Contact Button */}
          <motion.button 
            whileHover={{ 
              scale: 1.03, 
              backgroundColor: "#1e293b",
              boxShadow: "0 15px 30px -5px rgba(47, 61, 90, 0.5)" 
            }}
            whileTap={{ scale: 0.98 }}
            // Reduced py-3.5 to py-2 to match the new shorter footer
            className="flex-[1.2] flex items-center justify-center gap-2 bg-gradient-to-r from-[#2F3D5A] to-[#1E2938] text-white py-2.5 px-4 rounded-[7px] relative overflow-hidden group mx-2 shadow-lg shadow-[#2F3D5A]/30"
          >
            {/* Shimmer effect inside button */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
            
            {/* Phone icon removed from here */}
            <span className="font-bold text-[14px] tracking-wider relative z-10">
              Contact
            </span>
          </motion.button>

          {/* Right Side: Close with Rotation Animation */}
          <motion.button 
            whileHover={{ rotate: 90, scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="active:scale-90 transition-transform mr-1 p-1.5 group rounded-full hover:bg-red-50/80"
          >
            {/* Decreased icon size from w-6 h-6 to w-5 h-5 */}
            <X className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" strokeWidth={2} />
          </motion.button>

        </div>
      </div>
    </motion.div>
  );
};

export default FooterNav;