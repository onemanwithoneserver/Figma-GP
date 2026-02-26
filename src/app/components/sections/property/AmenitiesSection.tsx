import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackOption {
  emoji: string;
  text: string;
}

interface AmenityData {
  id: string;
  tabLabel: string;
  imageUrl?: string;
  features: string[];
  feedbackQuestion: string;
  feedbackOptions: FeedbackOption[];
  queriesTitle: string;
  queries: string[];
}

const AMENITIES_DATA: AmenityData[] = [
  {
    id: 'highlights',
    tabLabel: 'Highlights Amenities',
    features: [
      'Grand clubhouse with double-height entrance lobby',
      'Vehicle-free podium with landscaped open spaces',
      'Dedicated zones for kids, elders & wellness activities',
      'Smart access-controlled common areas',
      'Indoor & outdoor amenities thoughtfully planned'
    ],
    feedbackQuestion: 'How do these amenities feel to you?',
    feedbackOptions: [
      { emoji: '😍', text: 'Impressive' },
      { emoji: '🏆', text: 'Premium feel' },
      { emoji: '👀', text: 'Want details' }
    ],
    queriesTitle: 'Questions you can ask',
    queries: [
      'Are these amenities included in the base price?',
      'Which amenities are exclusive to this project?',
      'Will all amenities be available from day 1?'
    ]
  },
  {
    id: 'kids',
    tabLabel: 'Kids',
    imageUrl: 'https://courtyardthanewest.in/public/admin/images/Courtyard-Amenities-Kids-Play-Area-22022025133053.jpg',
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
    queriesTitle: "Questions you can ask",
    queries: [
      'Is the play area access-controlled?',
      'Are indoor play areas air-conditioned?'
    ]
  },
  {
    id: 'elders',
    tabLabel: 'Elders',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
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
    queriesTitle: 'Questions you can ask',
    queries: [
      'Are elder zones away from noisy areas?',
      'Are pathways wheelchair-friendly?'
    ]
  },
  {
    id: 'wellness',
    tabLabel: 'Health & Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
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
    queriesTitle: 'Questions you can ask',
    queries: [
      'Is the gym professionally managed?',
      'Are trainers or classes included?'
    ]
  },
  {
    id: 'entertainment',
    tabLabel: 'Entertainment',
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
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
    queriesTitle: 'Questions you can ask',
    queries: [
      'Is the theatre operational or planned?',
      'Is visitor parking near these spaces?'
    ]
  }
];

const Icons = {
  Check: ({ size = 10, strokeWidth = 3 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
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
    <div className="font-['Outfit',_sans-serif] pb-3">

      {/* ── Scrollable Tab Pills ── */}
      <div className="px-3 mb-3">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-1 p-1 rounded-[7px] bg-[#F9F7F2] border border-[#E5DFD4]"
        >
          {AMENITIES_DATA.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={(e) => handleTabClick(tab.id, e)}
                className="flex-shrink-0 px-3.5 py-1.5 text-[12px] font-semibold rounded-[6px] transition-all duration-200 outline-none"
                style={isActive ? {
                  backgroundColor: '#322822',
                  color: '#FFFFFF',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                } : {
                  backgroundColor: 'transparent',
                  color: '#8A7D74'
                }}
              >
                {tab.tabLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Content Card ── */}
      <div className="mx-3 rounded-[7px] overflow-hidden bg-white shadow-sm border border-[#E5DFD4]">
        
        <div className="px-4 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
            >
              
              {/* Image rendered at the top (only if imageUrl exists) */}
              {activeData.imageUrl && (
                <div className="mb-4 rounded-[6px] overflow-hidden border border-[#E5DFD4] shadow-sm">
                  <img 
                    src={activeData.imageUrl} 
                    alt={`${activeData.tabLabel} preview`} 
                    className="w-full h-36 object-cover"
                  />
                </div>
              )}

              {/* Feature list */}
              <div className="flex flex-col gap-2.5 mb-4">
                {activeData.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <div
                      className="flex-shrink-0 w-4 h-4 rounded-[4px] flex items-center justify-center mt-[3px] text-white bg-[#E76F26]"
                    >
                      <Icons.Check size={10} strokeWidth={3.5} />
                    </div>
                    <span className="text-[13px] font-medium text-[#322822] leading-snug">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Feedback reaction buttons */}
              <div className="mb-4 border-t border-[#E5DFD4] pt-3.5">
                <p className="text-[12px] font-semibold text-[#8A7D74] mb-2 tracking-tight">{activeData.feedbackQuestion}</p>
                <div className="flex flex-wrap gap-1.5">
                  {activeData.feedbackOptions.map((opt, idx) => {
                    const isSelected = activeFeedback === opt.text;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveFeedback(isSelected ? null : opt.text)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-[6px] text-[12px] font-semibold transition-all duration-200"
                        style={isSelected ? {
                          backgroundColor: '#E76F26',
                          color: '#fff',
                          boxShadow: '0 2px 8px rgba(231,111,38,0.25)'
                        } : {
                          backgroundColor: '#F9F7F2',
                          color: '#8A7D74'
                        }}
                      >
                        <span className="text-[14px] leading-none">{opt.emoji}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Q&A section */}
              <div className="rounded-[7px] overflow-hidden border border-[#E5DFD4] bg-white">
                {/* Dark brown header */}
                <div className="px-3 py-2.5 bg-[#322822]">
                  <p className="text-[13px] font-semibold text-white relative">{activeData.queriesTitle}</p>
                </div>
                
                {/* Questions Checkboxes */}
                <div className="flex flex-col p-1.5">
                  {activeData.queries.map((query, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-2.5 px-2.5 py-2 hover:bg-[#F9F8F6] transition-colors text-left rounded-[5px] group"
                    >
                      <div className="w-[18px] h-[18px] rounded-[4px] bg-[#322822] text-white flex items-center justify-center flex-shrink-0">
                        <Icons.Check size={10} strokeWidth={4} />
                      </div>
                      <span className="text-[12.5px] font-semibold text-[#322822] group-hover:text-[#E76F26] transition-colors">{query}</span>
                    </button>
                  ))}
                  
                  {/* Write your own question */}
                  <button className="flex items-center gap-2.5 px-2.5 py-2 mt-0.5 hover:bg-[#F9F8F6] transition-colors text-left rounded-[5px] group">
                    <div className="w-[18px] h-[18px] rounded-[4px] border border-dashed border-[#8A7D74] text-[#8A7D74] flex items-center justify-center flex-shrink-0">
                      <span className="text-[14px] leading-none mb-[1px]">+</span>
                    </div>
                    <span className="text-[12.5px] font-semibold text-[#322822] group-hover:text-[#E76F26] transition-colors">Write your own question...</span>
                  </button>
                </div>
                
                {/* Ask Seller Button */}
                <div className="p-3 pt-1">
                  <button 
                    className="w-full py-2.5 rounded-[6px] text-white font-semibold text-[13.5px] transition-all hover:opacity-90 active:scale-[0.98] bg-[#E76F26] shadow-sm"
                  >
                    Ask Seller
                  </button>
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