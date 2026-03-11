import React, { useState, useMemo, useRef, useEffect } from "react";

const INITIAL_QUESTIONS = [
  "Are all amenities ready and operational?",
  "Is the clubhouse open for residents currently?",
  "Is there a separate swimming pool for kids and adults?",
  "Are gym and wellness facilities included in maintenance?",
  "What are the operating hours for amenities?",
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
    <div className="max-w-[400px] py-2 px-3 space-y-3 font-['Outfit',_sans-serif] bg-white">
      <div className="flex items-center justify-between gap-1">
        <h3 className="text-[14px] font-bold text-[#322822] leading-tight">Ask Seller</h3>
        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-1.5 rounded-[5px] border border-[#E76F26]/30 bg-white px-2 py-1 shadow-sm transition-all hover:border-[#E76F26] hover:shadow-[0_2px_8px_rgba(231,111,38,0.14)] active:scale-[0.98]"
          >
            <span className="flex h-4.5 w-4.5 items-center justify-center rounded-[4px] bg-[#E76F26] text-white">
              <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </span>
            <span className="text-[11px] font-bold leading-none text-[#C65D20]">Custom Question</span>
          </button>
        )}
      </div>
      
      {/* Question List */}
      <div className="space-y-2.5">
        {visibleQuestions.map((q) => {
          const checked = selected.includes(q);
          return (
            <button
              key={q}
              onClick={() => toggleQuestion(q)}
              className="flex items-start gap-2.5 w-full text-left group transition-opacity active:opacity-80"
            >
              <div
                className={`mt-0.5 w-4 h-4 rounded-[4px] flex items-center justify-center flex-shrink-0 shadow-sm transition-all ${
                  checked ? "" : "bg-[#F9F7F2] border border-[#E5DFD4]"
                }`}
                style={checked ? { background: "linear-gradient(135deg,#322822,#1E1713)" } : {}}
              >
                {checked && (
                  <svg className="w-2.5 h-2.5 text-[#E5DFD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-[12px] font-semibold leading-tight transition-colors ${
                  checked ? "text-[#322822]" : "text-[#554E48]"
                } group-hover:text-[#E76F26]`}>
                {q}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-2.5">
        {isAdding && (
          <form onSubmit={handleAddCustom} className="flex items-center gap-2 w-full  px-2.5 py-2 animate-in fade-in duration-200">
            <div className="w-4 h-4 rounded-[4px] flex items-center justify-center border border-[#322822] bg-[#322822]">
               <div className="w-1.5 h-1.5 rounded-[5px] bg-white animate-pulse" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onBlur={() => !customInput && setIsAdding(false)}
              placeholder="Type your question..."
              className="text-[12px] font-bold text-[#322822] outline-none border-b border-[#E76F26] w-full pb-0.5 bg-transparent placeholder:text-[#8C827A]/50"
            />
          </form>
        )}

        {/* Toggle */}
        {questions.length > 2 && (
          <button onClick={() => setShowMore(!showMore)} className="flex items-center gap-2.5 w-full group focus:outline-none">
            <div className="w-4 h-4 rounded-[4px] flex items-center justify-center bg-[#F9F7F2] border border-[#E5DFD4] group-hover:border-[#E76F26] transition-colors">
              <svg className={`w-2.5 h-2.5 text-[#8C827A] group-hover:text-[#E76F26] transition-transform ${showMore ? "" : "rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={2.5} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#E76F26] underline decoration-1 underline-offset-2">
              {showMore ? "Show fewer" : "Load more"}
            </span>
          </button>
        )}

      </div>
    </div>
  );
}