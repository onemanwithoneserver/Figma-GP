
import React from "react";

export function DialogBackToTopButton() {
  const handleBackToTop = () => {
    const dialogContent = document.querySelector('[data-slot="dialog-content"] .overflow-y-auto, [data-slot="dialog-content"]');
    if (dialogContent) {
      dialogContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const dialogContent = document.querySelector('[data-slot="dialog-content"] .overflow-y-auto, [data-slot="dialog-content"]');
    if (!dialogContent) return;
    const onScroll = () => {
      setShow(dialogContent.scrollTop > 100);
    };
    dialogContent.addEventListener('scroll', onScroll);
    return () => dialogContent.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={handleBackToTop}
      aria-label="Back to top"
      style={{ position: 'absolute', bottom: 16, right: 16 }}
      className="z-[60] bg-white border border-[#F3EDE5] shadow-md rounded-md p-1.5 flex items-center justify-center transition hover:bg-orange-50"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 10L9 6L5 10" stroke="#F85B01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}
