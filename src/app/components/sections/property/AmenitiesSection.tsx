import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackOption {
  emoji: string;
  text: string;
}

interface AmenityData {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  features: string[];
  feedbackQuestion: string;
  feedbackOptions: FeedbackOption[];
  queriesTitle: string;
  queries: string[];
}

const AMENITIES_DATA: AmenityData[] = [
  {
    id: 'highlights',
    tabLabel: 'Highlights',
    title: 'Project highlights',
    subtitle: 'Unique features that make this project stand out',
    features: [
      'Grand clubhouse with double-height entrance lobby',
      'Vehicle-free podium with landscaped open spaces',
      'Dedicated zones for kids, elders & wellness activities',
      'Smart access-controlled common areas',
      'Indoor & outdoor amenities thoughtfully planned',
      'Premium materials used across amenity spaces'
    ],
    feedbackQuestion: 'How do these amenities feel to you?',
    feedbackOptions: [
      { emoji: '😍', text: 'Impressive' },
      { emoji: '🏆', text: 'Premium feel' },
      { emoji: '👀', text: 'Want details' }
    ],
    queriesTitle: 'Ask the seller about highlighted amenities',
    queries: [
      'Are these amenities included in the base price?',
      'Which amenities are exclusive to this project?',
      'Will all amenities be available from day 1?'
    ]
  },
  {
    id: 'kids',
    tabLabel: 'Kids',
    title: 'Kids facilities',
    subtitle: 'Thoughtfully designed spaces for children of all ages',
    features: [
      "Children's play area",
      'Indoor games room',
      'Kids swimming pool',
      'Skating / cycling track',
      'Activity & hobby room'
    ],
    feedbackQuestion: 'How does this work for families?',
    feedbackOptions: [
      { emoji: '👨‍👩‍👧', text: 'Family friendly' },
      { emoji: '🎉', text: 'Kids will love it' }
    ],
    queriesTitle: "Ask the seller about kids' facilities",
    queries: [
      'Is the play area access-controlled?',
      'Are indoor play areas air-conditioned?'
    ]
  },
  {
    id: 'elders',
    tabLabel: 'Elders',
    title: 'Senior facilities',
    subtitle: 'Calm and accessible spaces for our senior residents',
    features: [
      'Senior citizen seating zones',
      'Reflexology & walking path',
      'Meditation area',
      'Low-impact fitness equipment',
      'Reading / community room'
    ],
    feedbackQuestion: 'Your thoughts on senior-friendly features?',
    feedbackOptions: [
      { emoji: '💖', text: 'Thoughtful' },
      { emoji: '🧘', text: 'Calm spaces' },
      { emoji: '👍', text: 'Love it' }
    ],
    queriesTitle: 'Ask the seller about senior facilities',
    queries: [
      'Are elder zones away from noisy areas?',
      'Are pathways wheelchair-friendly?'
    ]
  },
  {
    id: 'wellness',
    tabLabel: 'Health & Wellness',
    title: 'Health & wellness facilities',
    subtitle: 'Everything you need for an active and healthy lifestyle',
    features: [
      'Fully equipped gym',
      'Yoga & meditation hall',
      'Jogging track',
      'Spa / wellness room'
    ],
    feedbackQuestion: 'Does this support a healthy lifestyle?',
    feedbackOptions: [
      { emoji: '💪', text: 'Fitness focused' },
      { emoji: '🧘‍♀️', text: 'Wellness living' }
    ],
    queriesTitle: 'Ask the seller about fitness facilities',
    queries: [
      'Is the gym professionally managed?',
      'Are trainers or classes included?'
    ]
  },
  {
    id: 'entertainment',
    tabLabel: 'Entertainment',
    title: 'Entertainment facilities',
    subtitle: 'Spaces to host, celebrate, and unwind',
    features: [
      'Indoor games room',
      'Mini theatre / AV room',
      'Party hall / banquet space',
      'Outdoor seating'
    ],
    feedbackQuestion: 'How do you see using these spaces?',
    feedbackOptions: [
      { emoji: '🥂', text: 'Social living' },
      { emoji: '✨', text: 'Future ready' },
      { emoji: '✌️', text: 'Practical' }
    ],
    queriesTitle: 'Ask the seller about entertainment facilities',
    queries: [
      'Is the theatre operational or planned?',
      'Is visitor parking near these spaces?'
    ]
  }
];

const Icons = {
  Check: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  )
};

const AmenitiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('highlights');
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeData = AMENITIES_DATA.find(tab => tab.id === activeTab) || AMENITIES_DATA[0];

  const handleTabClick = (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(id);
    setActiveFeedback(null);
    event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <div className="font-['Outfit',_sans-serif] pb-4">

      {/* ── Scrollable Tab Pills ── */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-2 px-4 pt-1 pb-3"
      >
        {AMENITIES_DATA.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={(e) => handleTabClick(tab.id, e)}
              className="flex-shrink-0 px-3.5 py-1.5 text-[12.5px] font-bold rounded-[7px] transition-all duration-200 outline-none"
              style={isActive ? {
                background: 'linear-gradient(135deg, #F85B01, #C94A00)',
                color: '#fff',
                boxShadow: '0 0 14px rgba(248,91,1,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
              } : {
                background: '#F1F5F9',
                color: '#64748B'
              }}
            >
              {tab.tabLabel}
            </button>
          );
        })}
      </div>

      {/* ── Content Card ── */}
      <div className="mx-4 rounded-[7px] overflow-hidden" style={{boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>

        {/* Dark navy header */}
        <div
          className="px-5 py-4 relative overflow-hidden"
          style={{background: 'linear-gradient(135deg, #1A2540 0%, #0F1929 50%, #1C2E4A 100%)'}}
        >
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-[7px] opacity-10" style={{background: 'radial-gradient(circle, #F85B01 0%, transparent 70%)'}} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + '-header'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <h3 className="text-[15px] font-extrabold text-white leading-tight mb-0.5">{activeData.title}</h3>
              <p className="text-[11px] font-medium text-white/45">{activeData.subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* White body */}
        <div className="bg-white px-5 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
            >
              {/* Feature list */}
              <div className="flex flex-col gap-2.5 mb-5">
                {activeData.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-5 h-5 rounded-[5px] flex items-center justify-center mt-0.5 text-white"
                      style={{background: 'linear-gradient(135deg, #F85B01, #C94A00)'}}
                    >
                      <Icons.Check />
                    </div>
                    <span className="text-[13.5px] font-semibold text-[#2A2C32] leading-snug">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Feedback reaction buttons */}
              <div className="mb-5">
                <p className="text-[12.5px] font-bold text-[#64748B] mb-3 tracking-tight">{activeData.feedbackQuestion}</p>
                <div className="flex flex-wrap gap-2">
                  {activeData.feedbackOptions.map((opt, idx) => {
                    const isSelected = activeFeedback === opt.text;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveFeedback(isSelected ? null : opt.text)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-[12.5px] font-bold transition-all duration-200"
                        style={isSelected ? {
                          background: 'linear-gradient(135deg, #F85B01, #C94A00)',
                          color: '#fff',
                          boxShadow: '0 0 12px rgba(248,91,1,0.3)'
                        } : {
                          background: '#F1F5F9',
                          color: '#475569'
                        }}
                      >
                        <span className="text-base leading-none">{opt.emoji}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Q&A card — dark navy header + white rows */}
              <div className="rounded-[7px] overflow-hidden" style={{boxShadow: '0 2px 12px rgba(0,0,0,0.07)'}}>
                <div
                  className="px-4 py-3 relative overflow-hidden"
                  style={{background: 'linear-gradient(135deg, #1A2540 0%, #0F1929 50%, #1C2E4A 100%)'}}
                >
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-[7px] opacity-10" style={{background: 'radial-gradient(circle,#F85B01 0%,transparent 70%)'}} />
                  <p className="text-[12px] font-extrabold text-white relative">{activeData.queriesTitle}</p>
                </div>
                <div className="bg-white flex flex-col">
                  {activeData.queries.map((query, index) => (
                    <button
                      key={index}
                      className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-orange-50/40 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-[3px] bg-[#F85B01] flex-shrink-0" />
                        <span className="text-[13px] font-medium text-[#2A2C32]">{query}</span>
                      </div>
                      <span className="text-gray-300 group-hover:text-[#F85B01] transition-colors flex-shrink-0"><Icons.ChevronRight /></span>
                    </button>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default AmenitiesSection;