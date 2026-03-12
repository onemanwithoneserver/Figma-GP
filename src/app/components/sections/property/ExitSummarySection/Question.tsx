import React, { useState, useRef, useEffect } from 'react';

const Question = () => {
  const [questionInput, setQuestionInput] = useState('');
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [showAllAskedQuestions, setShowAllAskedQuestions] = useState(false);
  const [showAskInput, setShowAskInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const DEFAULT_VISIBLE_COUNT = 2;

  useEffect(() => {
    if (showAskInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showAskInput]);

  const visibleAskedQuestions = showAllAskedQuestions
    ? askedQuestions
    : askedQuestions.slice(0, DEFAULT_VISIBLE_COUNT);

  const askSellerQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    setAskedQuestions((prev) => [trimmed, ...prev]);
    setQuestionInput('');
  };

  const onAskSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askSellerQuestion(questionInput);
  };

  const handleFinalSubmit = () => {
    console.log('Final Questions:', askedQuestions);
  };

  return (
    <div className="w-full bg-white p-2 font-sans text-[#3A312B]">
      
      {/* QUESTION SECTION - Tightened padding and max 8px radius */}
      <div className="mb-2 flex flex-col gap-2 rounded-[8px] border border-gray-100 bg-gray-50/50 p-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-[#3A312B]">
            Want to ask any questions?
          </h3>
          
          {!showAskInput && (
            <button
              type="button"
              aria-label="Show ask question input"
              className="flex items-center gap-1 rounded-[5px] border border-[#E06D28] bg-[#FFF8F4] px-2 py-1 text-[#E06D28] transition-colors hover:bg-[#FFEBE0]"
              onClick={() => setShowAskInput(true)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span className="text-[12px] font-bold">Ask seller</span>
            </button>
          )}
        </div>
        
        {showAskInput && (
          <form className="flex flex-col gap-2" onSubmit={onAskSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={questionInput}
              onChange={(event) => setQuestionInput(event.target.value)}
              placeholder="Type your question and press Enter..."
              className="w-full rounded-[5px] border border-gray-200 bg-white px-2 py-1.5 text-[13px] font-medium text-[#3A312B] outline-none transition-colors placeholder:text-gray-400 focus:border-[#E06D28]"
            />

            {askedQuestions.length > 0 && (
              <div className="flex flex-col gap-1">
                <ol className="ml-5 list-decimal space-y-0.5 marker:font-bold marker:text-gray-400">
                  {visibleAskedQuestions.map((question, index) => (
                    <li
                      key={`${question}-${index}`}
                      className="text-[13px] font-medium text-[#5A514B]"
                    >
                      {question}
                    </li>
                  ))}
                </ol>

                {askedQuestions.length > DEFAULT_VISIBLE_COUNT && (
                  <button
                    type="button"
                    onClick={() => setShowAllAskedQuestions((prev) => !prev)}
                    className="mt-0.5 self-start text-[12px] font-bold text-[#E06D28] hover:underline hover:underline-offset-2"
                  >
                    {showAllAskedQuestions ? 'Show fewer' : `+ ${askedQuestions.length - DEFAULT_VISIBLE_COUNT} more questions`}
                  </button>
                )}
              </div>
            )}
          </form>
        )}
      </div>

      {/* ACTION BUTTONS - Max 8px radius, tight layout */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleFinalSubmit}
          className="flex-1 rounded-[6px] bg-[#E06D28] px-2.5 py-1.5 text-[12px] font-extrabold text-white shadow-sm transition-all hover:bg-[#C85D20] active:scale-[0.98]"
        >
          Contact Seller
        </button>
        
        <button
          type="button"
          className="rounded-[8px] px-3 py-2 text-[13px] font-bold text-[#7A716A] transition-colors hover:bg-gray-100 hover:text-[#5A514B]"
        >
          I'll do it later
        </button>
      </div>
      
    </div>
  );
};

export default Question;