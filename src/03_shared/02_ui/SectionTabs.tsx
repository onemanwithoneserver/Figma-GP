import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../03_utils/utils';

export type TabItem = {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
};

type SectionTabsProps = {
  items: readonly TabItem[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  idPrefix: string;
  tabClassName?: string;
  containerClassName?: string;
};

export function SectionTabs({
  items,
  value,
  onChange,
  label,
  idPrefix,
  tabClassName,
  containerClassName,
}: SectionTabsProps) {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      onChange(items[nextIndex].id);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      onChange(items[prevIndex].id);
    }
  };

  return (
    <div className={cn("px-2 pt-2 pb-1 flex justify-center bg-white", containerClassName)}>
      <div
        role="tablist"
        aria-label={label}
        className="relative flex items-center w-full max-w-[440px] p-1 bg-[#F5F1EB] border border-[#E9E1D8] rounded-[12px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
      >
        {items.map((item, index) => {
          const isActive = value === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`${idPrefix}-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => onChange(item.id)}
              className={cn(
                "relative flex-1 flex items-center justify-center gap-2 py-2 px-3 text-[13px] font-bold rounded-[9px] transition-colors duration-200 outline-none select-none cursor-pointer min-h-[40px] z-10",
                isActive
                  ? "text-white"
                  : "text-[#5A4E46] hover:text-[#1E1713] hover:bg-black/[0.02]",
                tabClassName
              )}
            >
              {isActive && (
                <motion.div
                  layoutId={`${idPrefix}-switch-active-pill`}
                  className="absolute inset-0 bg-gradient-to-r from-[#F85B01] to-[#E76F26] rounded-[9px] shadow-[0_2px_8px_rgba(231,111,38,0.32)] -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              {Icon && (
                <Icon
                  style={{ fontSize: 17 }}
                  className="flex-shrink-0 text-current"
                />
              )}
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
