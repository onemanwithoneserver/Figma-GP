import React, { useState } from 'react';

interface SavedPlan {
  id: string;
  title: string;
  subtitle: string;
  notes?: string[];
}

interface ExitSummaryData {
  likes: string[];
  neutral: string[];
  apprehensions: string[];
  savedPlans: SavedPlan[];
}

const SUMMARY_DATA: ExitSummaryData = {
  likes: ['Location & Connectivity', 'Construction', 'Vaastu / Facing'],
  neutral: ['Price Fit', 'Amenities'],
  apprehensions: [
    'Overall pricing range',
    'Possession timeline',
    'Long-term maintenance'
  ],
  savedPlans: [
    {
      id: 'p1',
      title: '2 BHK • 1280 sq ft',
      subtitle: 'Tower B • 7th Floor • East Facing',
    },
    {
      id: 'p2',
      title: '3 BHK • 1650 sq ft',
      subtitle: 'Tower A • 10th Floor • East Facing',
      notes: [] // Empty notes to show dynamic rendering
    }
  ]
};

// --- Inline SVGs ---
const Icons = {
  CheckCircle: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#E76F26" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  Clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A7D74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Info: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  ),
  Message: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  Bookmark: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  )
};

const ExitSummarySection: React.FC = () => {
  const DEFAULT_VISIBLE_COUNT = 2;
  const [questionInput, setQuestionInput] = useState('');
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [showAllAskedQuestions, setShowAllAskedQuestions] = useState(false);

  const visibleAskedQuestions = showAllAskedQuestions
    ? askedQuestions
    : askedQuestions.slice(0, DEFAULT_VISIBLE_COUNT);

  const askSellerQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) {
      return;
    }

    setAskedQuestions((prev) => [trimmed, ...prev]);
    setQuestionInput('');
  };

  const onAskSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askSellerQuestion(questionInput);
  };

  return (
    <section className="w-full rounded-[5px] border border-gray-100 bg-white px-2 py-1 shadow-sm">
      <div className="mb-1 px-1">
        <h2 className="text-[20px] font-bold text-[#322822]">Exit Summary</h2>
{/*         <p className="mt-0.5 text-[13px] font-medium text-[#8A7D74]">
          A quick recap of your preferences for this project.
        </p> */}
      </div>

      <div className="space-y-1">
        <div className="rounded-[5px] bg-white p-1">
          <h3 className="mb-1 text-[15px] font-bold text-[#322822]">Likes</h3>
          <div className="flex flex-wrap gap-1">
            {SUMMARY_DATA.likes.map((like) => (
              <div
                key={like}
                className="inline-flex items-center gap-1 rounded-[5px] bg-white px-2 py-1"
              >
                <Icons.CheckCircle />
                <span className="text-[13px] font-semibold text-[#322822]">{like}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[5px] bg-white p-1">
          <h3 className="mb-1 text-[15px] font-bold text-[#322822]">Neutral</h3>
          <div className="flex flex-wrap gap-1">
            {SUMMARY_DATA.neutral.map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-1 rounded-[5px] bg-white px-2 py-1"
              >
                <Icons.Clock />
                <span className="text-[13px] font-semibold text-[#554E48]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[5px] bg-white p-1">
          <h3 className="mb-1 text-[15px] font-bold text-[#322822]">Apprehensions</h3>
          <ul className="space-y-1">
            {SUMMARY_DATA.apprehensions.map((item) => (
              <li key={item} className="flex items-start gap-1 text-[13px] font-medium text-[#322822]">
                <span className="mt-1 h-1.5 w-1.5 rounded-[5px] bg-[#8A7D74]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-1">
          <h3 className="text-[15px] font-bold text-[#322822]">Saved Floor Plans</h3>
          <ul className="list-disc space-y-1 pl-4">
            {SUMMARY_DATA.savedPlans.map((plan) => (
              <li key={plan.id} className="text-[13px] font-semibold text-[#322822]">
                {plan.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[5px] bg-white p-1">
          <h3 className="mb-1 text-[15px] font-bold text-[#322822]">Want to ask any questions?</h3>
{/*           <p className="text-[13px] text-[#554E48]">
            Enter your question below 
          </p> */}
          <form className="space-y-1" onSubmit={onAskSubmit}>
            <input
              type="text"
              value={questionInput}
              onChange={(event) => setQuestionInput(event.target.value)}
              placeholder="Type your question"
              className="w-full rounded-[5px] border border-gray-200 bg-white px-2 py-1 text-[13px] font-medium text-[#322822] outline-none focus:border-[#E76F26]"
            />

            {askedQuestions.length > 0 && (
              <ol className="mt-1 list-decimal space-y-1 pl-4">
                {visibleAskedQuestions.map((question, index) => (
                  <li
                    key={`${question}-${index}`}
                    className="rounded-[5px] bg-white px-2 py-1 text-[13px] font-medium text-[#554E48]"
                  >
                    {question}
                  </li>
                ))}
              </ol>
            )}

            {askedQuestions.length > DEFAULT_VISIBLE_COUNT && (
              <button
                type="button"
                onClick={() => setShowAllAskedQuestions((prev) => !prev)}
                className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#E76F26] underline underline-offset-2"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-[4px] border border-gray-300 text-gray-500">
                  <svg
                    className={`h-2.5 w-2.5 transition-transform ${showAllAskedQuestions ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
                {showAllAskedQuestions ? 'Show fewer' : 'Load more'}
              </button>
            )}

            <div className="flex gap-1">
              <button
                type="submit"
                className="flex-1 rounded-[5px] bg-gradient-to-r from-[#F85B01] to-[#E05000] px-2 py-1 text-[13px] font-bold text-white"
              >
                <span className="inline-flex items-center gap-1">
                  <Icons.Message />
                  Ask Seller Questions
                </span>
              </button>
              <button
                type="button"
                className="flex-1 rounded-[5px] border border-gray-200 bg-white px-2 py-1 text-[13px] font-bold text-[#322822] transition-all duration-200 hover:border-[#E76F26] hover:text-[#E76F26]"
              >
                <span className="inline-flex items-center gap-1">
                  <Icons.Bookmark />
                  I will do it later
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ExitSummarySection;