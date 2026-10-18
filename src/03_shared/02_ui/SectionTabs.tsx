import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { cn } from '../03_utils/utils';

type SectionTabsProps = {
  items: readonly { id: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  idPrefix: string;
  tabClassName?: string;
};

/** MUI handles roving focus, arrow keys, and scrolling; Tailwind defines the pills. */
export function SectionTabs({ items, value, onChange, label, idPrefix, tabClassName }: SectionTabsProps) {
  return (
    <Tabs value={items.some(item => item.id === value) ? value : false}
      onChange={(_, next: string) => onChange(next)} aria-label={label}
      variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile
      className="relative bg-white px-2 pt-2 pb-1.5"
      slotProps={{
        list: { className: 'gap-2' },
        scroller: { className: 'scrollbar-hide' },
        scrollButtons: {
          'aria-label': 'Scroll section tabs',
          className: 'absolute top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-tab bg-surface-tab text-ink [&:first-of-type]:left-1 [&:last-of-type]:right-1 [&.Mui-disabled]:hidden',
        },
      }}>
      {items.map(item => (
        <Tab key={item.id} value={item.id} label={item.label}
          id={`${idPrefix}-tab-${item.id}`} aria-controls={`${idPrefix}-panel-${item.id}`}
          className={cn('flex-shrink-0 px-4 py-2 text-[12px] leading-none font-semibold rounded-tab transition-colors duration-200',
            value === item.id ? 'bg-brand-warm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]' : 'glass glass-hover text-ink', tabClassName, 'leading-none')} />
      ))}
    </Tabs>
  );
}
