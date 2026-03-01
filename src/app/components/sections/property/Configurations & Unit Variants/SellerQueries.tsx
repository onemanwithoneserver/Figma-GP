import React, { useState, useMemo, useRef, useEffect } from "react";

const INITIAL_QUESTIONS = [
  "Which units provide best view from balcony?",
  "Corridor width between flats?",
  "Are there any corner flats currently available?",
  "What is the carpet area vs super built-up area?",
  "What is the expected monthly maintenance cost?",
];

export default function SellerQueries() {
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [selected, setSelected] = useState<string[]>(INITIAL_QUESTIONS);
  const [showMore, setShowMore] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [customInput, setCustomInput] = useState("");
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Split questions for the "Show More" logic
  const visibleQuestions = useMemo(() => {
    return showMore ? questions : questions.slice(0, 2);
  }, [showMore, questions]);

  // Focus input when user clicks "Custom question"
  useEffect(() => {
    if (isAdding) inputRef.current?.focus();
  }, [isAdding]);

  const toggleQuestion = (q: string) => {
    setSelected((prev) =>
      prev.includes(q) ? prev.filter((item) => item !== q) : [...prev, q]
    );
  };

  const handleAddCustom = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (customInput.trim()) {
      const newQuestion = customInput.trim();
      if (!questions.includes(newQuestion)) {
        setQuestions((prev) => [...prev, newQuestion]);
        setSelected((prev) => [...prev, newQuestion]);
        setShowMore(true);
      }
      setCustomInput("");
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-[400px] py-2 px-3 space-y-4 font-['Outfit',_sans-serif] bg-white ">
      
      {/* Question List */}
      <div className="space-y-3">
        {visibleQuestions.map((q) => {
          const isChecked = selected.includes(q);
          return (
            <button
              key={q}
              onClick={() => toggleQuestion(q)}
              className="flex items-center gap-3 w-full text-left group transition-all active:opacity-70 focus:outline-none"
            >
              <div className={`w-5 h-5 rounded-[4px] flex items-center justify-center flex-shrink-0 border transition-all duration-200 ${
                  isChecked ? "bg-[#322822] border-[#322822]" : "bg-white border-[#E5DFD4]"
                }`}
              >
                {isChecked && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-[13px] font-bold leading-tight transition-colors ${
                isChecked ? "text-[#322822]" : "text-[#8C827A]"
              }`}>
                {q}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {/* Toggle */}
        {questions.length > 3 && (
          <button onClick={() => setShowMore(!showMore)} className="flex items-center gap-3 w-full group focus:outline-none">
            <div className="w-5 h-5 rounded-[4px] flex items-center justify-center bg-[#F9F7F2] border border-[#E5DFD4]">
              <svg className={`w-3 h-3 text-[#8C827A] transition-transform ${showMore ? "" : "rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={3} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            <span className="text-[13px] font-bold text-[#E76F26] underline decoration-1 underline-offset-4">
              {showMore ? "Show fewer questions" : "Load more questions"}
            </span>
          </button>
        )}

        {/* Custom Question Input/Button */}
        {isAdding ? (
          <form onSubmit={handleAddCustom} className="flex items-center gap-3 w-full">
            <div className="w-5 h-5 rounded-[4px] flex items-center justify-center border border-[#322822] bg-[#322822]">
               <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onBlur={() => !customInput && setIsAdding(false)}
              placeholder="Type your question..."
              className="text-[13px] font-bold text-[#322822] outline-none border-b border-[#E76F26] w-full pb-0.5 bg-transparent"
            />
          </form>
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-3 w-full group focus:outline-none"
          >
            <div className="w-5 h-5 rounded-[4px] flex items-center justify-center border border-dashed border-[#8C827A] group-hover:bg-[#F9F7F2]">
              <svg className="w-3 h-3 text-[#8C827A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-[13px] font-bold text-[#322822]">Custom question</span>
          </button>
        )}
      </div>
    </div>
  );
}