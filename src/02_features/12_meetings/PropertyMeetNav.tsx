import { useState } from 'react';
import { SectionTabs } from '../../03_shared/02_ui/SectionTabs';
import SlotBooking from './SlotBooking';
import DirectionsCarOutlined from '@mui/icons-material/DirectionsCarOutlined';
import VideocamOutlined from '@mui/icons-material/VideocamOutlined';
import { motion, AnimatePresence } from 'motion/react';

const MEET_TABS = [
  { id: 'direct-site-visit', label: 'Direct Site Visit' },
  { id: 'online-visit', label: 'Online Visit' },
] as const;

export default function PropertyMeetNav() {
  const [activeTab, setActiveTab] = useState<string>('direct-site-visit');
  const [isBooked, setIsBooked] = useState(false);

  const isOnline = activeTab === 'online-visit';

  return (
    <div className="bg-white rounded-control overflow-hidden">
      <AnimatePresence>
        {!isBooked && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <SectionTabs
              items={MEET_TABS}
              value={activeTab}
              onChange={(val) => setActiveTab(val || 'direct-site-visit')}
              label="Project Meet section navigation"
              idPrefix="meeting"
              tabClassName="text-[13px] font-bold rounded-chip h-9 min-w-[130px] m-[1px]"
            />

            <div className="px-2 pt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-control text-[12px] font-medium border ${
                    isOnline
                      ? 'bg-blue-50/70 border-blue-100 text-blue-900'
                      : 'bg-amber-50/70 border-amber-100 text-amber-950'
                  }`}
                >
                  {isOnline ? (
                    <>
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex-shrink-0">
                        <VideocamOutlined style={{ fontSize: 16 }} />
                      </span>
                      <span className="flex-1 leading-tight">
                        <strong className="font-semibold">Live 1-on-1 Virtual Tour:</strong> Interactive 3D walkthrough &amp; floor plan session with a senior architect.
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-brand flex-shrink-0">
                        <DirectionsCarOutlined style={{ fontSize: 16 }} />
                      </span>
                      <span className="flex-1 leading-tight">
                        <strong className="font-semibold">Site &amp; Sample Flat Visit:</strong> Complimentary private chauffeur pickup &amp; drop available across Hyderabad.
                      </span>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        id={`meeting-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`meeting-tab-${activeTab}`}
        className="bg-white overflow-hidden p-2 pt-3 transition-all duration-300"
      >
        <SlotBooking
          meetType={activeTab}
          isBooked={isBooked}
          onBookChange={setIsBooked}
        />
      </div>
    </div>
  );
}
