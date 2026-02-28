import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SellerQueries from './SellerQueries';


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
}

const AMENITIES_DATA: AmenityData[] = [
  {
    id: 'highlights',
    tabLabel: 'Highlights',
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
    <div className="font-['Outfit',_sans-serif] pb-2 max-w-md mx-auto bg-[#FDFCF9]">
      
      {/* ── Tab Navigation ── */}
      <div className="px-3 pb-4">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-1.5 p-1.5 rounded-[7px] bg-[#F4F1EA] border border-[#E5DFD4]"
        >
          {AMENITIES_DATA.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={(e) => handleTabClick(tab.id, e)}
                className="flex-shrink-0 px-4 py-2 text-[13px] font-bold rounded-[7px] transition-all duration-300"
                style={isActive ? {
                  backgroundColor: '#322822',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(50, 40, 34, 0.15)'
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

      <div className="">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* ── Feature Image & List Card ── */}
            <div className=" px-4  ">
              {activeData.imageUrl && (
                <div className="mb-4 rounded-[7px] overflow-hidden aspect-video border border-[#F4F1EA]">
                  <img 
                    src={activeData.imageUrl} 
                    alt={activeData.tabLabel} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}

              <div className="space-y-3">
                {activeData.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-[#E76F26] flex items-center justify-center text-white">
                      <Icons.Check size={9} strokeWidth={4} />
                    </div>
                    <span className="text-[14px] text-[#322822] font-medium leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* ── Feedback ── */}
              <div className="mt-4 pt-4 border-t border-[#F4F1EA]">
                <p className="text-[14px] font-bold text-[#322822] mb-2">
                  {activeData.feedbackQuestion}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeData.feedbackOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFeedback(activeFeedback === opt.text ? null : opt.text)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] font-bold transition-all ${
                        activeFeedback === opt.text 
                        ? 'bg-[#E76F26] text-white shadow-md scale-105' 
                        : 'bg-[#F9F7F2] text-[#8A7D74] hover:bg-[#F4F1EA]'
                      }`}
                    >
                      <span>{opt.emoji}</span>
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>

                <SellerQueries />

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AmenitiesSection;