import React, { useState, useRef, useEffect } from 'react';

const Question = () => {
  const [questionInput, setQuestionInput] = useState('');
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [showAllAskedQuestions, setShowAllAskedQuestions] = useState(false);
  const [showAskInput, setShowAskInput] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const DEFAULT_VISIBLE_COUNT = 2;

  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [showNotSuitablePanel, setShowNotSuitablePanel] = useState(false);
  
  const [notSuitableReason, setNotSuitableReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
  const notSuitableOptions = [
    'High Budget',
    'Location mismatch',
    'Others'
  ];

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

  const handleNotSuitableSubmit = () => {
    const finalReason = notSuitableReason === 'Others' ? otherReason : notSuitableReason;
    console.log('Not Suitable Submitted:', {
      reason: finalReason,
      dontShowAgain
    });
    setShowNotSuitablePanel(false);
    setNotSuitableReason('');
    setOtherReason('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showAskInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showAskInput]);

  return (
    <div className="w-full bg-white font-sans text-[#3A312B]">
      
      <div className="mb-2 flex flex-col rounded-[5px]">
        
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-[#3A312B]">
            Want to ask any questions?
          </h3>
          
          {!showAskInput && (
            <button
              type="button"
              onClick={() => setShowAskInput(true)}
              className="flex items-center gap-1.5 rounded-[5px] border border-[#E06D28] bg-[#FFF8F4] px-3 py-1.5 text-[13px] font-bold text-[#E06D28] transition-colors hover:bg-[#FFEBE0] active:scale-[0.98]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Ask seller
            </button>
          )}
        </div>
        
        {showAskInput && (
          <form className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-1" onSubmit={onAskSubmit}>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={questionInput}
                onChange={(event) => setQuestionInput(event.target.value)}
                placeholder="Type your question..."
                className="flex-1 rounded-[5px] border border-[#D5CFC9] bg-white px-2.5 py-1.5 text-[13px] font-medium text-[#3A312B] outline-none transition-colors placeholder:text-[#A39A94] focus:border-[#E06D28] focus:ring-1 focus:ring-[#E06D28]/30"
              />
              <button
                type="submit"
                className="rounded-[5px] bg-[#3A312B] px-4 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-[#2A231F] active:scale-[0.98]"
              >
                Ask
              </button>
            </div>

            {askedQuestions.length > 0 && (
              <div className="mt-1 flex flex-col gap-1">
                <ol className="ml-5 list-decimal space-y-0.5 marker:font-bold marker:text-[#A39A94]">
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
                    className="mt-0.5 self-start text-[12px] font-bold text-[#E06D28] transition-colors hover:text-[#C85D20] hover:underline hover:underline-offset-2"
                  >
                    {showAllAskedQuestions ? 'Show fewer' : `+ ${askedQuestions.length - DEFAULT_VISIBLE_COUNT} more questions`}
                  </button>
                )}
              </div>
            )}
          </form>
        )}
      </div>

      <div className="flex w-full items-center gap-2">
        <button
          type="button"
          onClick={handleFinalSubmit}
          className="flex-1 rounded-[5px] bg-[#E06D28] px-3 py-2 text-[13px] font-extrabold text-white shadow-sm transition-all hover:bg-[#C85D20] active:scale-[0.98]"
        >
          Contact Seller
        </button>
        
        <button
          type="button"
          className="flex-1 rounded-[5px] bg-[#F5F2F0] px-3 py-2 text-[13px] font-bold text-[#5A514B] transition-colors hover:bg-[#EBE7E4] active:scale-[0.98]"
        >
          I'll do it later
        </button>

        <button
          type="button"
          className={`flex-1 rounded-[5px] border px-3 py-2 text-[13px] font-bold transition-all active:scale-[0.98] ${
            showNotSuitablePanel 
              ? 'border-[#E06D28] bg-[#FFF8F4] text-[#E06D28]' 
              : 'border-[#D5CFC9] bg-white text-[#5A514B] hover:border-[#A39A94]'
          }`}
          onClick={() => setShowNotSuitablePanel(!showNotSuitablePanel)}
        >
          Not Suitable
        </button>
      </div>

      {showNotSuitablePanel && (
        <div className="mt-3 flex flex-col gap-3 rounded-[5px] border border-[#E06D28]/30 bg-[#FFF8F4] p-3 shadow-sm transition-all animate-in fade-in slide-in-from-top-2">
          
          <div className="flex flex-col gap-1.5" ref={dropdownRef}>
            <label className="text-[12px] font-bold text-[#E06D28] uppercase tracking-wide">
              Reason for mismatch
            </label>
            
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className={`flex w-full items-center justify-between rounded-[5px] border bg-white px-3 py-2 text-[13px] shadow-sm transition-colors ${
                  isSelectOpen ? 'border-[#E06D28] ring-1 ring-[#E06D28]/30' : 'border-[#D5CFC9] hover:border-[#A39A94]'
                }`}
              >
                <span className={notSuitableReason ? 'text-[#3A312B]' : 'text-[#A39A94]'}>
                  {notSuitableReason || 'Select a reason...'}
                </span>
                <svg 
                  className={`h-4 w-4 text-[#7A716A] transition-transform duration-200 ${isSelectOpen ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isSelectOpen && (
                <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-[5px] border border-[#E06D28]/20 bg-white py-1 shadow-lg animate-in fade-in zoom-in-95">
                  {notSuitableOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        setNotSuitableReason(option);
                        setIsSelectOpen(false);
                      }}
                      className="cursor-pointer px-3 py-2 text-[13px] font-medium text-[#5A514B] transition-colors hover:bg-[#FFF8F4] hover:text-[#E06D28]"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {notSuitableReason === 'Others' && (
            <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-1">
              <textarea
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Please specify your reason..."
                rows={3}
                className="w-full resize-none rounded-[5px] border border-[#D5CFC9] bg-white px-3 py-2 text-[13px] font-medium text-[#3A312B] outline-none transition-colors placeholder:text-[#A39A94] focus:border-[#E06D28] focus:ring-1 focus:ring-[#E06D28]/30"
              />
            </div>
          )}

          <div className="flex items-center justify-between mt-1">
            <label htmlFor="dontShowAgain" className="flex cursor-pointer items-center gap-2 group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="dontShowAgain"
                  checked={dontShowAgain}
                  onChange={() => setDontShowAgain(!dontShowAgain)}
                  className="peer h-4 w-4 cursor-pointer appearance-none rounded-[3px] border border-[#D5CFC9] bg-white transition-all checked:border-[#E06D28] checked:bg-[#E06D28] focus:outline-none focus:ring-2 focus:ring-[#E06D28]/30"
                />
                <svg 
                  className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[13px] font-medium text-[#5A514B] transition-colors group-hover:text-[#3A312B]">
                Don't show again
              </span>
            </label>

            <button
              type="button"
              onClick={handleNotSuitableSubmit}
              disabled={!notSuitableReason || (notSuitableReason === 'Others' && !otherReason.trim())}
              className="rounded-[5px] bg-[#3A312B] px-4 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-[#2A231F] disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
            >
              Submit
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default Question;