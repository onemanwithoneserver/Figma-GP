import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import BookmarkBorderRounded from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRounded from '@mui/icons-material/BookmarkRounded';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import ShareOutlined from '@mui/icons-material/ShareOutlined';
import CloseRounded from '@mui/icons-material/CloseRounded';
import LocalPhoneRounded from '@mui/icons-material/LocalPhoneRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useMotionSettings } from '../04_motion/useMotionSettings';

type ItemId = 'save' | 'hide' | 'share' | 'close';
const spring = { type: 'spring' as const, stiffness: 500, damping: 32 };

function Burst() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <motion.span key={i} className="absolute h-1 w-1 rounded-full bg-brand"
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(a) * 18, y: Math.sin(a) * 18, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.55, ease: 'easeOut' }} />
        );
      })}
    </span>
  );
}

const FooterNav: React.FC = () => {
  const { reducedMotion } = useMotionSettings();
  const [saved, setSaved] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [focus, setFocus] = useState<ItemId | 'contact' | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();
  const focusTimer = useRef<ReturnType<typeof setTimeout>>();

  const checkAtEnd = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return false;
    const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const clientHeight = window.innerHeight;
    const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const atEnd = scrollHeight > 0 && currentY + clientHeight >= scrollHeight - 240;
    setIsAtEnd(atEnd);
    return atEnd;
  };

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const atEnd = checkAtEnd();

    if (atEnd) {
      setVisible(true);
    } else if (y < 120) {
      setVisible(true);
    } else if (Math.abs(y - prev) > 6) {
      setVisible(y < prev);
    }
  });

  useEffect(() => {
    const handleScrollOrResize = () => {
      checkAtEnd();
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize);
    handleScrollOrResize();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => {
      handleScrollOrResize();
    }) : null;
    if (ro && document.body) {
      ro.observe(document.body);
    }

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      ro?.disconnect();
      clearTimeout(toastTimer.current);
      clearTimeout(focusTimer.current);
    };
  }, []);

  const notify = (msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  };
  const flash = (id: ItemId | 'contact') => {
    setFocus(id);
    clearTimeout(focusTimer.current);
    focusTimer.current = setTimeout(() => setFocus(null), 900);
  };

  const handle = async (id: ItemId) => {
    flash(id);
    if (id === 'save') {
      notify(saved ? 'Removed from shortlist' : 'Saved to shortlist');
      if (!saved) setBurstKey((k) => k + 1);
      setSaved(!saved);
    } else if (id === 'hide') {
      notify(hidden ? 'Property visible again' : 'Hidden from your feed');
      setHidden(!hidden);
    } else if (id === 'share') {
      const data = { title: 'Vasavi Skyla', text: 'Check out Vasavi Skyla, Hyderabad', url: window.location.href };
      try {
        if (navigator.share) await navigator.share(data);
        else { await navigator.clipboard.writeText(data.url); notify('Link copied'); }
      } catch {  }
    }
  };

  const items: { id: ItemId; label: string; Icon: React.ElementType; active?: boolean; danger?: boolean }[] = [
    { id: 'save', label: saved ? 'Saved' : 'Save', Icon: saved ? BookmarkRounded : BookmarkBorderRounded, active: saved },
    { id: 'hide', label: hidden ? 'Hidden' : 'Hide', Icon: hidden ? VisibilityOutlined : VisibilityOffOutlined, active: hidden },
    { id: 'share', label: 'Share', Icon: ShareOutlined },
    { id: 'close', label: 'Close', Icon: CloseRounded, danger: true },
  ];

  const renderItem = (item: (typeof items)[number]) => (
    <button key={item.id} type="button" data-no-press
      onClick={() => handle(item.id)}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setFocus(item.id)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setFocus(null)}
      aria-pressed={item.id === 'save' || item.id === 'hide' ? !!item.active : undefined}
      className={`relative flex h-full flex-col items-center justify-center gap-0.5 outline-none transition-all duration-300 ${
        isAtEnd ? 'rounded-none' : 'rounded-2xl'
      }`}>
      {focus === item.id && (
        <motion.span layoutId="footer-pill" transition={reducedMotion ? { duration: 0 } : spring}
          className={`absolute inset-x-1 inset-y-1 bg-white/[0.09] ring-1 ring-white/10 ${
            isAtEnd ? 'rounded-lg' : 'rounded-2xl'
          }`} />
      )}
      <motion.span className="relative flex h-6 w-6 items-center justify-center"
        whileTap={reducedMotion ? undefined : { scale: 0.8, rotate: item.id === 'share' ? -12 : 0 }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={item.label} className="flex"
            initial={reducedMotion ? false : { scale: 0.4, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.4, opacity: 0 }} transition={spring}>
            <item.Icon className={`!w-5 !h-5 transition-colors duration-300 ${
              item.active ? 'text-brand' : item.danger ? 'text-[#FF8A80]' : 'text-white/75'}`} />
          </motion.span>
        </AnimatePresence>
        {item.id === 'save' && burstKey > 0 && !reducedMotion && <Burst key={burstKey} />}
      </motion.span>
      <span className={`relative text-[10.5px] font-semibold tracking-wide transition-colors duration-300 ${
        item.active ? 'text-brand' : item.danger ? 'text-[#FF8A80]' : 'text-white/60'}`}>
        {item.label}
      </span>
    </button>
  );

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300 ${
        isAtEnd ? 'px-0 pb-0' : 'px-3 pb-3'
      }`}
    >
      <motion.div
        initial={reducedMotion ? false : { y: 120, opacity: 0 }}
        animate={{ y: (visible || isAtEnd) ? 0 : 120, opacity: (visible || isAtEnd) ? 1 : 0 }}
        transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 28 }}
        className={`relative w-full transition-all duration-300 ${
          isAtEnd ? 'max-w-[390px]' : 'max-w-[366px]'
        }`}
      >
        <AnimatePresence>
          {toast && (
            <motion.div key={toast} role="status"
              initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={reducedMotion ? { duration: 0 } : spring}
              className="absolute -top-14 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink-deep/90 px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-lg ring-1 ring-white/10 backdrop-blur-md">
              <CheckCircleRounded className="!w-4 !h-4 text-brand" aria-hidden="true" />
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        <footer
          className={`pointer-events-auto relative backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 supports-[not(backdrop-filter:blur(1px))]:bg-ink-deep ${
            isAtEnd
              ? 'h-[64px] rounded-none bg-ink-deep/[0.94] border-t border-white/15 shadow-[0_-8px_32px_rgba(20,15,12,0.35)] pb-[env(safe-area-inset-bottom,0px)]'
              : 'h-[62px] rounded-[26px] bg-ink-deep/[0.88] ring-1 ring-white/10 shadow-[0_14px_40px_rgba(30,23,19,0.45),inset_0_1px_0_rgba(255,255,255,0.12)]'
          }`}
        >
          <span aria-hidden="true" className={`pointer-events-none absolute top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-300 ${
            isAtEnd ? 'inset-x-0' : 'inset-x-8'
          }`} />
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 bottom-0 h-8 w-44 -translate-x-1/2 rounded-full bg-brand/20 blur-2xl" />

          <Box component="nav" aria-label="Property actions" className={`relative grid h-full grid-cols-5 py-1 transition-all duration-300 ${
            isAtEnd ? 'px-1' : 'px-1.5'
          }`}>
            {renderItem(items[0])}
            {renderItem(items[1])}

            <div className={`relative flex flex-col items-center justify-end transition-all duration-300 ${
              isAtEnd ? 'pb-1.5' : 'pb-1'
            }`}>
              <motion.button type="button" aria-label="Contact seller" data-no-press
                onClick={() => flash('contact')}
                whileHover={reducedMotion ? undefined : { y: -3 }}
                whileTap={reducedMotion ? undefined : { scale: 0.9 }}
                transition={spring}
                className="absolute -top-6 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-brand-gradient text-white ring-4 ring-white shadow-[0_8px_20px_rgba(248,91,1,0.45)]">
                <span aria-hidden="true" className="absolute inset-0 rounded-full bg-brand pulse-ring" />
                <motion.span className="relative flex"
                  animate={reducedMotion ? undefined : { rotate: [0, -16, 14, -10, 8, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3.2 }}>
                  <LocalPhoneRounded className="!w-6 !h-6" />
                </motion.span>
              </motion.button>
              <span className="text-[10.5px] font-bold tracking-wide text-white">Contact</span>
            </div>

            {renderItem(items[2])}
            {renderItem(items[3])}
          </Box>
        </footer>
      </motion.div>
    </div>
  );
};

export default FooterNav;
