import React from 'react';
import { Check, X } from 'lucide-react';

interface StatPillProps {
  icon?: string;
  svgIcon?: string;
  label: string;
  value: string;
  valid: boolean;
}

const StatPill: React.FC<StatPillProps> = ({ icon, svgIcon, label, value, valid }) => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center group">
      <div className="relative w-[80px] h-[80px] mb-2.5">
        {/* Circular border with gradient effect */}
        <div className="absolute inset-0 rounded-full border-2 border-[#E5E7EB] bg-gradient-to-br from-white to-gray-50 flex items-center justify-center shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-black/10 transition-all duration-300 group-hover:scale-105">
          {svgIcon ? (
            <img src={svgIcon} alt={label} className="w-8 h-8 object-contain drop-shadow-sm" />
          ) : (
            <span className="text-2xl drop-shadow-sm">{icon}</span>
          )}
        </div>
        
        {/* Checkmark/X at bottom left */}
        <div className={`absolute bottom-0 left-0 w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 ${
          valid ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-green-500/30' : 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/30'
        }`}>
          {valid ? (
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          ) : (
            <X className="w-4 h-4 text-white" strokeWidth={2.5} />
          )}
        </div>
        
        {/* X at bottom right */}
        <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#EF4444] to-[#DC2626] flex items-center justify-center shadow-md shadow-red-500/30 transition-all duration-300 group-hover:scale-110">
          <X className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
      </div>
      
      {/* Label and Value */}
      <p className="text-[13px] font-semibold text-[#1F2933] text-center drop-shadow-sm">{value}</p>
    </div>
  );
};

export default StatPill;
