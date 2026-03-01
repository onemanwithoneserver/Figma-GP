import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SellerQueries from './SellerQueries';

import AmenityTabNav from './AmenityTabNav';


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

  const activeData = AMENITIES_DATA.find(tab => tab.id === activeTab) || AMENITIES_DATA[0];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
  };

  return (
    <div className="font-['Outfit',_sans-serif] pb-2 max-w-md mx-auto bg-[#FDFCF9]">
      {/* ── Tab Navigation ── */}
      <AmenityTabNav
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        amenitiesData={AMENITIES_DATA.map(({ id, tabLabel }) => ({ id, tabLabel }))}
      />

      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* ── Feature Image & List Card ── */}
            <div className="bg-white px-4 py-1 ">
              {activeData.imageUrl && (
                <div className="mb-4 rounded-[7px] py-1 overflow-hidden aspect-video border border-[#F4F1EA]">
                  <img 
                    src={activeData.imageUrl} 
                    alt={activeData.tabLabel} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}

              <div className="space-y-3 py-1.5">
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

              {/* ── Seller Queries ── */}
              <div className="mt-2 -ml-4">
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