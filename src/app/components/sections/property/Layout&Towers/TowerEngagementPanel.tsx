import React, { useState, useMemo, useRef, useEffect } from "react";

const REACTION_OPTIONS = [
  {
    key: "yes",
    label: "Yes",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    ),
    activeStyle: {
      background: "linear-gradient(135deg,#E76F26,#C94A00)",
      boxShadow: "0 0 14px rgba(231,111,38,0.2)",
      borderColor: "#E76F26",
    },
    activeText: "text-white",
  },
  {
    key: "maybe",
    label: "Maybe",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14" />
      </svg>
    ),
    activeStyle: { background: "linear-gradient(135deg, #322822, #1E1713)", borderColor: "#322822" },
    activeText: "text-[#F9F7F2]",
  },
  {
    key: "no",
    label: "No",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    activeStyle: { background: "linear-gradient(135deg, #8C827A, #6B5E57)", borderColor: "#8C827A" },
    activeText: "text-[#F9F7F2]",
  },
];

const INITIAL_QUESTIONS = [
  "Which units provide best view from balcony?",
  "Corridor width between flats?",
  "Are there any corner flats currently available?",
  "What is the carpet area vs super built-up area?",
  "What is the expected monthly maintenance cost?",
];

const TowerEngagementPanel = () => {
  const [activeReaction, setActiveReaction] = useState(null);
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [selected, setSelected] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const inputRef = useRef(null);

  // Show only 2 items unless "Show more" is toggled
  const visibleQuestions = useMemo(() => {
    return showMore ? questions : questions.slice(0, 2);
  }, [showMore, questions]);

  useEffect(() => {
    if (isAdding) inputRef.current?.focus();
  }, [isAdding]);

  const toggleQuestion = (q) => {
    setSelected((prev) =>
      prev.includes(q) ? prev.filter((item) => item !== q) : [...prev, q]
    );
  };

  const handleAddCustom = (e) => {
    e?.preventDefault();
    if (customInput.trim()) {
      const newQuestion = customInput.trim();
      setQuestions((prev) => [newQuestion, ...prev]);
      setSelected((prev) => [...prev, newQuestion]);
      setCustomInput("");
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-md mx-auto font-['Outfit',_sans-serif] bg-white rounded-[5px] overflow-hidden pb-2">
      {/* ── Section 2: Questions List ── */}
      <div className="px-4 py-2.5 space-y-2.5">
        <div className="flex items-center justify-between gap-1">
          <h4 className="text-[14px] font-bold text-[#322822] leading-tight">Ask Seller</h4>
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
        {visibleQuestions.map((q) => {
          const checked = selected.includes(q);
          return (
            <button
              key={q}
              onClick={() => toggleQuestion(q)}
              className="flex items-start gap-2.5 w-full text-left group transition-opacity active:opacity-80"
            >
              <div
                className={`mt-0.5 w-4 h-4 rounded-[4px] flex-shrink-0 flex items-center justify-center shadow-sm transition-all ${
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
              <span
                className={`flex-1 text-[12px] font-semibold leading-tight transition-colors ${
                  checked ? "text-[#322822]" : "text-[#554E48]"
                } group-hover:text-[#E76F26]`}
              >
                {q}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Section 3: Controls ── */}
      <div className="px-4 pb-2.5 space-y-2.5">
        {isAdding && (
          <form onSubmit={handleAddCustom} className="flex items-center gap-2 w-full  px-2.5 py-2 animate-in fade-in duration-200">
            <div className="w-4 h-4 rounded-[4px] flex-shrink-0 flex items-center justify-center border border-[#322822] bg-[#322822]">
              <div className="w-1.5 h-1.5 rounded-[5px] bg-white" />
            </div>
            <input
              ref={inputRef}
              type="text"
              autoFocus
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onBlur={() => !customInput && setIsAdding(false)}
              className="flex-1 text-[12px] font-bold text-[#322822] outline-none border-b border-[#E76F26] bg-transparent py-0.5 placeholder:text-[#8C827A]/50"
              placeholder="Type your question..."
            />
          </form>
        )}

        {questions.length > 2 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-2 w-full group focus:outline-none"
          >
            <div className="w-4 h-4 rounded-[4px] flex-shrink-0 flex items-center justify-center bg-[#F9F7F2] border border-[#E5DFD4] group-hover:border-[#E76F26] transition-colors">
              <svg
                className={`w-2.5 h-2.5 text-[#8C827A] group-hover:text-[#E76F26] transition-transform ${showMore ? "" : "rotate-180"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#E76F26] underline decoration-1 underline-offset-2 leading-tight">
              {showMore ? "Show fewer" : "Load more"}
            </span>
          </button>
        )}

      </div>
    </div>
  );
};

export default TowerEngagementPanel;