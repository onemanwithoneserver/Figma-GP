import React from 'react';
import { Bookmark, EyeOff, Share2, X, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const FooterNav: React.FC = () => {
  const navItems = [
    { icon: Bookmark, label: "Save", id: "save" },
    { icon: EyeOff, label: "Hide", id: "hide" },
    { icon: Phone, label: "Contact", id: "contact", isCenter: true },
    { icon: Share2, label: "Share", id: "share" },
    { icon: X, label: "Close", id: "close", isDestructive: true }
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 22, stiffness: 120 }}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="w-full max-w-[390px] bg-white backdrop-blur-xl pointer-events-auto relative shadow-[0_-4px_25px_rgba(0,0,0,0.06)] border-t border-gray-100 ">
        <div className="flex items-end justify-between">
          {navItems.map((item, idx) => {
            if (item.isCenter) {
              return (
                <div key={idx} className="flex flex-col items-center justify-end relative -top-3">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-11 h-11 flex items-center justify-center bg-[#322822] text-white rounded-full shadow-lg shadow-[#322822]/30 mb-0.5 z-10"
                  >
                    <item.icon className="w-5 h-5 fill-white/20" strokeWidth={2} />
                  </motion.button>
                  <span className="text-[10px] font-bold text-slate-800 tracking-wide">
                    {item.label}
                  </span>
                </div>
              );
            }

            return (
              <motion.button 
                key={idx}
                whileTap={{ scale: 0.85 }}
                className="flex flex-col items-center justify-center w-14 gap-0.5 group"
              >
                <div className="relative flex items-center justify-center">
                  <item.icon 
                    className={`w-5 h-5 ${
                      item.isDestructive 
                        ? 'text-slate-400 group-hover:text-red-500' 
                        : 'text-slate-500 group-hover:text-[#E77338]'
                    } transition-colors duration-300`} 
                    strokeWidth={1.5} 
                  />
                  <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                    item.isDestructive ? 'bg-red-500' : 'bg-[#E77338]'
                  }`} />
                </div>
                <span className={`text-[10px] font-medium mt-1 ${
                  item.isDestructive 
                    ? 'text-slate-400 group-hover:text-red-500' 
                    : 'text-slate-500 group-hover:text-[#E77338]'
                } transition-colors duration-300`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default FooterNav;