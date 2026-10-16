import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import AddRounded from '@mui/icons-material/AddRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import { AnimatePresence, motion } from 'motion/react';
import { ActionButton, MotionButton } from '../02_ui/ActionButton';
import { useMotionSettings } from '../04_motion/useMotionSettings';

const COLLAPSED_COUNT = 3;

interface AskSellerProps {
  initialQuestions: string[];
  initiallySelected?: boolean;
  prependCustom?: boolean;
}

export default function AskSeller({ initialQuestions, initiallySelected = true, prependCustom = false }: AskSellerProps) {
  const id = useId();
  const { reducedMotion, transition } = useMotionSettings();
  const [questions, setQuestions] = useState(initialQuestions);
  const [selected, setSelected] = useState(() => initiallySelected ? initialQuestions : []);
  const [expanded, setExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const visibleQuestions = expanded ? questions : questions.slice(0, COLLAPSED_COUNT);

  useEffect(() => {
    if (isAdding) inputRef.current?.focus();
  }, [isAdding]);

  const toggleQuestion = (question: string) => {
    setSelected(previous => previous.includes(question)
      ? previous.filter(item => item !== question)
      : [...previous, question]);
  };

  const addQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = customInput.trim();
    if (!question) return;
    setQuestions(previous => previous.includes(question) ? previous
      : prependCustom ? [question, ...previous] : [...previous, question]);
    setSelected(previous => previous.includes(question) ? previous : [...previous, question]);
    setExpanded(true);
    setCustomInput('');
    setIsAdding(false);
  };

  return (
    <section aria-labelledby={`${id}-heading`} className="max-w-[400px] space-y-3 bg-white px-3 py-2 text-ink">
      <div className="flex items-center justify-between gap-1">
        <h3 id={`${id}-heading`} className="text-[14px] font-bold leading-tight">Ask Seller</h3>
        {!isAdding && (
          <MotionButton onClick={() => setIsAdding(true)} aria-controls={`${id}-custom`}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            className="group/add inline-flex items-center gap-1.5 rounded-chip border border-brand-warm/30 bg-white px-2 py-1 shadow-sm transition-all hover:border-brand-warm hover:shadow-[0_2px_8px_rgba(231,111,38,0.14)]">
            <span className="flex h-4.5 w-4.5 items-center justify-center rounded-tab bg-brand-warm text-white">
              <AddRounded className="h-2.5 w-2.5 transition-transform duration-200 group-hover/add:rotate-90" />
            </span>
            <span className="text-[11px] font-bold leading-none text-[#C65D20]">Custom Question</span>
          </MotionButton>
        )}
      </div>

      <div id={`${id}-questions`} className="space-y-2.5">
        <AnimatePresence initial={false}>
          {visibleQuestions.map(question => {
            const checked = selected.includes(question);
            return (
              <motion.div key={question} layout={reducedMotion ? false : 'position'}
                initial={reducedMotion ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.1 } }}
                transition={transition}>
                <ActionButton onClick={() => toggleQuestion(question)} aria-pressed={checked}
                  className="group flex w-full items-start justify-start gap-2.5 text-left transition-opacity active:opacity-80">
                  <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-tab shadow-sm transition-all duration-200 group-hover:scale-110 ${checked ? 'bg-ink-gradient' : 'border border-outline bg-surface group-hover:border-brand-warm'}`}>
                    <AnimatePresence initial={false}>
                      {checked && (
                        <motion.span key="check" className="flex"
                          initial={reducedMotion ? false : { opacity: 0, scale: 0.4 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.4, transition: { duration: reducedMotion ? 0 : 0.1 } }}
                          transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 26 }}>
                          <CheckRounded className="h-2.5 w-2.5 text-outline" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <span className={`min-w-0 flex-1 text-[12px] font-semibold leading-tight transition-colors group-hover:text-brand-warm ${checked ? 'text-ink' : 'text-[#554E48]'}`}>
                    {question}
                  </span>
                </ActionButton>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="space-y-2.5">
        {isAdding && (
          <motion.form onSubmit={addQuestion} className="flex w-full items-center gap-2.5 py-2"
            initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
            <ActionButton type="submit" aria-label="Add custom question"
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-tab border border-ink bg-ink">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-chip bg-white" />
            </ActionButton>
            <label htmlFor={`${id}-custom`} className="sr-only">Type your question</label>
            <input ref={inputRef} id={`${id}-custom`} type="text" value={customInput}
              onChange={event => setCustomInput(event.target.value)}
              onBlur={() => { if (!customInput.trim()) setIsAdding(false); }}
              placeholder="Type your question..."
              className="min-w-0 flex-1 border-0 border-b border-brand-warm bg-transparent pb-0.5 text-[12px] font-bold text-ink outline-none transition-shadow focus:shadow-[0_1px_0_0_var(--brand-warm,#E76F26)] placeholder:text-ink-subtle/50" />
          </motion.form>
        )}

        {questions.length > COLLAPSED_COUNT && (
          <ActionButton onClick={() => setExpanded(previous => !previous)}
            aria-expanded={expanded} aria-controls={`${id}-questions`}
            className="group flex w-full items-center justify-start gap-2.5 text-left">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-tab border border-outline bg-surface transition-colors group-hover:border-brand-warm">
              <KeyboardArrowUpRounded className={`h-2.5 w-2.5 text-ink-subtle transition-transform duration-200 group-hover:text-brand-warm ${expanded ? '' : 'rotate-180'}`} />
            </span>
            <span className="text-[12px] font-bold text-brand-warm underline decoration-1 underline-offset-2">
              {expanded ? 'Show fewer' : 'Load more'}
            </span>
          </ActionButton>
        )}
      </div>
    </section>
  );
}
