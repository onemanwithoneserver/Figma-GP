import React, { useState } from "react";

const unitQuestions = [
  "Is the living room size carpet or built-up area?",
  "Can kitchen layout be modified?",
  "Is master bedroom facing open view?",
  "Are balconies included in carpet area?",
  "What fittings are provided in toilets?",
];

const extraQuestions = [
  "Can bedroom 2 be converted into study room?",
  "Is there provision for washing machine?",
  "Are dimensions wall-to-wall or usable space?",
  "Does estimated cost include parking?",
];

export default function SellerQueries() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);

  const questions = [
    ...unitQuestions,
    ...(showMore ? extraQuestions : []),
  ];

  const toggleQuestion = (q: string) => {
    setSelected((prev) =>
      prev.includes(q)
        ? prev.filter((item) => item !== q)
        : [...prev, q]
    );
  };

  return (
    <div className="py-3 px-1.5 space-y-3">
      {/* QUESTIONS */}
      {questions.map((q, i) => {
        const checked = selected.includes(q);

        return (
          <button
            key={i}
            onClick={() => toggleQuestion(q)}
            className="flex items-start gap-2.5 w-full text-left group"
          >
            <div
              className={`mt-0.5 w-4 h-4 rounded-[4px] flex items-center justify-center flex-shrink-0 shadow-sm ${
                checked
                  ? ""
                  : "bg-[#F9F7F2] border border-[#E5DFD4]"
              }`}
              style={
                checked
                  ? {
                      background:
                        "linear-gradient(135deg,#322822,#1E1713)",
                    }
                  : {}
              }
            >
              {checked && (
                <svg
                  className="w-2.5 h-2.5 text-[#E5DFD4]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>

            <span className="text-[12px] font-semibold text-[#322822] leading-tight group-hover:text-[#E76F26] transition-colors">
              {q}
            </span>
          </button>
        );
      })}

      {/* LOAD MORE */}
      <button
        onClick={() => setShowMore(!showMore)}
        className="flex pb-4 items-center gap-2.5 w-full group !mt-[1px] !mb-[1px]"
      >
        <div className="w-4 h-4 rounded-[4px] flex items-center justify-center bg-[#F9F7F2] border border-[#E5DFD4] group-hover:border-[#E76F26]">
          <svg
            className="w-2.5 h-2.5 text-[#8C827A] group-hover:text-[#E76F26]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {showMore ? (
              <path strokeWidth={2.5} d="M5 15l7-7 7 7" />
            ) : (
              <path strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            )}
          </svg>
        </div>

        <span className="text-[12px]  font-bold text-[#E76F26] underline">
          {showMore
            ? "Show fewer questions"
            : "Load more questions"}
        </span>
      </button>

      {/* CUSTOM QUESTION */}
      <button className="flex items-center gap-2.5 w-full group">
        <div className="w-4 h-4 rounded-[4px] flex items-center justify-center border border-dashed border-[#8C827A] group-hover:border-[#E76F26] group-hover:bg-[#E76F26]/10">
          <svg
            className="w-2.5 h-2.5 text-[#8C827A] group-hover:text-[#E76F26]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>

        <span className="text-[12px] px- font-bold text-[#554E48] group-hover:text-[#E76F26]">
          Custom question
        </span>
      </button>
    </div>
  );
}