import { cn } from '../../03_shared/03_utils/utils';
import { MotionButton } from '../../03_shared/02_ui/ActionButton';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { easeOut, useMotionSettings } from '../../03_shared/04_motion/useMotionSettings';
import { CountUp } from '../../03_shared/04_motion/CountUp';
import React, { useEffect, useRef, useState } from "react";
import { HERO_SLIDES, HERO_SLIDE_MS } from './heroSlides';
import MapPin from '@mui/icons-material/LocationOnOutlined';
import CheckCircle from '@mui/icons-material/CheckCircleOutline';
import Check from '@mui/icons-material/CheckRounded';
import X from '@mui/icons-material/CloseRounded';
import Play from '@mui/icons-material/PlayArrowRounded';

import AcresIcon from "../../05_assets/Clip path group.svg?react";
import UnitsIcon from "../../05_assets/units.svg?react";
import FloorsIcon from "../../05_assets/floors.svg?react";
import accountNewLogo from "../../05_assets/account_new.png";

interface VoteButtonProps {
  vote: "like" | "dislike" | null;
  onVote: (vote: "like" | "dislike" | null) => void;
}

const VoteButton: React.FC<VoteButtonProps> = ({ vote, onVote }) => {
  const handleVote = (voteType: "like" | "dislike") => {
    onVote(vote === voteType ? null : voteType);
  };

  return (
    <>

      <MotionButton onClick={() => handleVote("like")} aria-label="Like this feature"
        animate={{ scale: vote === "like" ? [1, 1.25, 1] : 1 }}
        className={`flex items-center justify-center w-5.5 h-5.5 rounded-full transition-colors focus:outline-none absolute -bottom-[10px] left-1 -p-2 ${
          vote === "like"
            ? "bg-[#FAF8F5] ring-[3px] ring-[#EAE4D9] shadow-sm"
            : "bg-[#FAF8F5] ring-[3px] ring-[#F2EFE9] hover:ring-[#EAE4D9]"
        }`}
      >
        <Check
          className={`w-[13px] h-[13px] transition-colors duration-300 ease-in-out ${
            vote === "like"
              ? "text-brand"
              : "text-ink-subtle hover:text-brand"
          }`}
          strokeWidth={3}
        />
      </MotionButton>

      <MotionButton
        onClick={() => handleVote("dislike")}
        aria-label="Dislike this feature"
        animate={{ scale: vote === "dislike" ? [1, 1.25, 1] : 1 }}
        className={`flex items-center justify-center w-5.5 h-5.5 rounded-full transition-colors focus:outline-none absolute -bottom-[10px] right-1 ${
          vote === "dislike"
            ? "bg-[#FAF8F5] ring-[3px] ring-[#EAE4D9] shadow-sm"
            : "bg-[#FAF8F5] ring-[3px] ring-[#F2EFE9] hover:ring-[#EAE4D9]"
        }`}
      >
        <X
          className={`w-[13px] h-[13px] transition-colors duration-300 ease-in-out ${
            vote === "dislike"
              ? "text-ink"
              : "text-ink-subtle hover:text-ink"
          }`}
          strokeWidth={3}
        />
      </MotionButton>
    </>
  );
};

interface PropertyStatProps {
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  vote: "like" | "dislike" | null;
  onVote: (vote: "like" | "dislike" | null) => void;
  iconSize: number;
}

const PropertyStat: React.FC<PropertyStatProps> = ({
  label,
  Icon,
  vote,
  onVote,
  iconSize,
}) => {
  const { itemVariants, reducedMotion } = useMotionSettings();
  return (
  <motion.article variants={itemVariants}
    whileHover={reducedMotion ? undefined : { y: -3, boxShadow: "0 10px 24px rgba(50,40,34,0.10)" }}

    className={cn("group bg-white rounded-control flex-1 h-[90px] flex flex-col items-center justify-center relative mb-4 border border-stone-200 overflow-visible", "shadow-stat")}

  >
    <h3 className="font-bold text-ink text-[12px] leading-tight mb-2 text-center px-1">
      <CountUp text={label} />
    </h3>

    <div
      className="flex items-center justify-center text-brand transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3"
      style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
    >
      <Icon className="w-full h-full" />
    </div>

    <div className="absolute bottom-0 left-0 right-0  w-full h-0 flex justify-between z-10">
      <VoteButton vote={vote} onVote={onVote} />
    </div>
  </motion.article>
);
};

const HeroSection: React.FC = () => {
  const { reducedMotion, staggerVariants, itemVariants } = useMotionSettings();
  const headerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 60]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 1.12]);
  const pop = (delay: number) => reducedMotion
    ? {}
    : { initial: { opacity: 0, scale: 0.85, y: 8 }, whileInView: { opacity: 1, scale: 1, y: 0 },
        viewport: { once: false },
        transition: { type: "spring" as const, stiffness: 320, damping: 22, delay } };

  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (dir: number) => setSlide((s) => (s + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => go(1), HERO_SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [slide, paused]);
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  const [acresVote, setAcresVote] = useState<"like" | "dislike" | null>(null);
  const [unitsVote, setUnitsVote] = useState<"like" | "dislike" | null>(null);
  const [floorsVote, setFloorsVote] = useState<"like" | "dislike" | null>(null);
  const offerRibbonText = "2 Offers";

  const statsData = [
    { id: "acres",  label: "12 Acres",   Icon: AcresIcon,  vote: acresVote,  setVote: setAcresVote,  iconSize: 36 },
    { id: "units",  label: "456 Units",  Icon: UnitsIcon,  vote: unitsVote,  setVote: setUnitsVote,  iconSize: 45 },
    { id: "floors", label: "G+14 Floors",Icon: FloorsIcon, vote: floorsVote, setVote: setFloorsVote, iconSize: 36 },
  ];

  return (
    <section className="relative w-full max-w-md mx-auto flex flex-col overflow-x-hidden bg-surface shadow-2xl rounded-b-[7px]">

      <header ref={headerRef} className="relative h-[240px] flex-shrink-0 bg-[#312822]">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div className="w-full h-full relative" style={{ y: imageY, scale: imageScale }}
            drag={reducedMotion ? false : "x"} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.15}
            onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 50) go(info.offset.x < 0 ? 1 : -1); }}>
            <AnimatePresence initial={false}>
              <motion.img
                key={slide}
                src={HERO_SLIDES[slide].src}
                alt={HERO_SLIDES[slide].alt}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover select-none"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.14, filter: "blur(6px)" }}
                animate={{ opacity: 0.85, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={reducedMotion
                  ? { duration: 0 }
                  : { opacity: { duration: 0.9, ease: easeOut }, filter: { duration: 0.9 }, scale: { duration: HERO_SLIDE_MS / 1000 + 1, ease: "linear" } }}
              />
            </AnimatePresence>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#312822]/80 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-[66px] right-4 z-20 flex gap-1.5" role="tablist" aria-label="Property photos">
          {HERO_SLIDES.map((s, i) => (
            <button key={s.src} type="button" role="tab" aria-selected={i === slide} aria-label={`Photo ${i + 1}`}
              data-no-press onClick={() => setSlide(i)}
              className="relative h-[3px] w-5 rounded-full bg-white/35 overflow-hidden p-0">
              {i < slide && <span className="absolute inset-0 bg-white" />}
              {i === slide && (
                <motion.span key={`fill-${slide}`} className="absolute inset-y-0 left-0 bg-white rounded-full"
                  initial={{ width: reducedMotion ? "100%" : "0%" }} animate={{ width: "100%" }}
                  transition={{ duration: reducedMotion || paused ? 0 : HERO_SLIDE_MS / 1000, ease: "linear" }} />
              )}
            </button>
          ))}
        </div>

        <motion.div className="absolute top-4 right-4 z-20" {...pop(0.35)}>
          <span className="inline-flex items-center rounded-control bg-ink px-3 py-1 text-[11px] font-bold tracking-wide text-white shadow-md animate-soft-glow">
            {offerRibbonText}
          </span>
        </motion.div>

        <motion.div className="absolute top-0 left-0 right-0 p-4 pt-6"
          variants={staggerVariants} initial={reducedMotion ? false : "hidden"} whileInView="show" viewport={{ once: false }}>
          <motion.h1 variants={itemVariants} className="text-white font-extrabold text-2xl leading-tight mb-1 tracking-tight">
            Vasavi Skyla
          </motion.h1>
          <motion.p variants={itemVariants} className="text-white/90 text-xs flex items-center font-medium">
            <MapPin className="w-3.5 h-3.5 mr-1 text-white" aria-hidden="true" />
            Hyderabad Hills, Hyderabad
          </motion.p>
        </motion.div>

        <motion.div className="absolute bottom-14 left-4" {...pop(0.5)}>
          <div
            className={cn("inline-flex items-center gap-1.5 rounded-control px-3.5 py-2 relative overflow-hidden sheen", "bg-brand-gradient shadow-brand")}

          >
            <p className="text-white font-extrabold text-[15px] relative z-10 leading-none">
              ₹8,000<span className="text-[11px] font-semibold text-white/80 ml-0.5">/sft</span>
            </p>
            <span className="text-surface-muted text-[10px] font-bold tracking-wider relative z-10 ml-1 bg-black/10 px-1.5 py-0.5 rounded-sm">
              Onwards
            </span>
          </div>
        </motion.div>
      </header>

      <div className="px-4 -mt-8 relative z-20 pb-1">
        <div className="bg-surface-soft rounded-control p-4 shadow-lg border border-white">

          <div className="flex items-center gap-3 pb-3 border-b border-stone-200/80 mb-4">
            <div className="w-11 h-11 flex items-center justify-center bg-white shadow-sm border border-stone-100 rounded-control overflow-hidden flex-shrink-0 p-1">
              <img
                src={accountNewLogo}
                alt="Gully Properties Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h2 className="font-bold text-ink text-[14px] tracking-tight leading-none">Gully Properties</h2>
                <CheckCircle className="w-3.5 h-3.5 text-brand-warm" strokeWidth={2.5} aria-label="Verified Developer" />
              </div>
            </div>
          </div>

          <motion.div variants={staggerVariants} initial={reducedMotion ? false : 'hidden'} whileInView="show" viewport={{ once: false }}
            className="flex items-start justify-between gap-5 w-full overflow-visible">
            {statsData.map((stat) => (
              <PropertyStat key={stat.id} {...stat} onVote={stat.setVote} iconSize={stat.iconSize} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="px-4 pt-2 pb-5">
        <div
          className={cn("group relative w-full rounded-control overflow-hidden border border-outline cursor-pointer", "aspect-video bg-ink-gradient")}

        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
            <div className="relative">
              <span aria-hidden="true" className="absolute inset-0 rounded-full bg-brand pulse-ring" />
              <span aria-hidden="true" className="absolute inset-0 rounded-full bg-brand pulse-ring [animation-delay:1.1s]" />
              <div
                className={cn("w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110", "bg-brand-gradient")}

              >
                <Play className="w-4 h-4 text-white ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-white text-[13px] font-bold tracking-wide mb-0.5">Video Tour</p>
              <p className="text-outline text-[10px] font-medium tracking-widest">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
