import React, { useState, useEffect, useRef } from 'react';
import ZoomInRounded from '@mui/icons-material/ZoomInRounded';
import ZoomOutRounded from '@mui/icons-material/ZoomOutRounded';
import VerifiedUserRounded from '@mui/icons-material/VerifiedUserRounded';
import PictureAsPdfRounded from '@mui/icons-material/PictureAsPdfRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import { motion, AnimatePresence } from 'motion/react';

export interface SamplePdfProps {
  fileId: number;
  fileName: string;
  fileSize: string;
  isCompact?: boolean;
}

export const SamplePdfViewer: React.FC<SamplePdfProps> = ({
  fileId,
  fileName,
  fileSize,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageDropdownRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(100);
  const [pageInput, setPageInput] = useState('1');
  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);

  const totalPages = fileId === 1 ? 3 : fileId === 4 ? 2 : 1;

  // Reset scroll and page input on fileId change
  useEffect(() => {
    setPageInput('1');
    setIsPageDropdownOpen(false);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [fileId]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pageDropdownRef.current && !pageDropdownRef.current.contains(e.target as Node)) {
        setIsPageDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePageSelect = (page: number) => {
    setPageInput(String(page));
    setIsPageDropdownOpen(false);
    const pageEl = document.getElementById(`pdf-page-${fileId}-${page}`);
    if (pageEl) {
      pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerTop = container.getBoundingClientRect().top;
    for (let p = 1; p <= totalPages; p++) {
      const pageEl = document.getElementById(`pdf-page-${fileId}-${p}`);
      if (pageEl) {
        const rect = pageEl.getBoundingClientRect();
        if (rect.top <= containerTop + 140 && rect.bottom >= containerTop + 40) {
          setPageInput(String(p));
          break;
        }
      }
    }
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 15, 130));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 15, 75));

  return (
    <div className="flex flex-col w-full h-full bg-[#201D1A] text-white overflow-hidden">
      {/* Top PDF Toolbar: Page Jump + Zoom Controls (No download, no print) */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-[#1B1815] border-b border-white/10 text-white/90 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center justify-center w-6 h-6 rounded bg-red-600 text-white flex-shrink-0 shadow-sm">
            <PictureAsPdfRounded style={{ fontSize: 15 }} />
          </div>
          <div className="min-w-0">
            <h4 className="text-[12px] font-bold text-white truncate leading-tight">
              {fileName}.pdf
            </h4>
            <div className="flex items-center gap-1 text-[10px]">
              <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                <VerifiedUserRounded style={{ fontSize: 10 }} /> Verified Official Document
              </span>
            </div>
          </div>
        </div>

        {/* Right Controls: Enter Page Number + Zoom */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Modern Dropdown for Page Number Control (e.g. 1 / 2) */}
          {totalPages > 1 && (
            <div ref={pageDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setIsPageDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 bg-black/40 hover:bg-black/60 border border-white/15 hover:border-[#F85B01]/70 rounded-[6px] px-2 py-1 text-[11px] font-mono text-white/90 transition-all duration-150 cursor-pointer shadow-sm outline-none"
                title="Select Page"
              >
                <span className="font-bold text-white">{pageInput}</span>
                <span className="text-white/40">/</span>
                <span className="text-white/70">{totalPages}</span>
                <motion.span
                  animate={{ rotate: isPageDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-white/60 ml-0.5"
                >
                  <KeyboardArrowDownRounded style={{ fontSize: 15 }} />
                </motion.span>
              </button>

              <AnimatePresence>
                {isPageDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 4 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute right-0 top-full mt-1 w-max min-w-[105px] rounded-[8px] bg-[#1C1815]/95 backdrop-blur-xl border border-white/20 shadow-xl p-1 z-50 overflow-hidden"
                  >
                    <div className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white/40 border-b border-white/10 mb-1">
                      Jump to Page
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                        const isCurrent = Number(pageInput) === p;
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => handlePageSelect(p)}
                            className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-[5px] text-[11px] font-mono text-left transition-all duration-150 cursor-pointer ${
                              isCurrent
                                ? 'bg-[#F85B01] text-white font-bold shadow-sm'
                                : 'text-white/80 hover:text-white hover:bg-white/10 font-medium'
                            }`}
                          >
                            <span>Page {p}</span>
                            {isCurrent && (
                              <CheckRounded style={{ fontSize: 13 }} className="text-white flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Zoom controls */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-chip px-1.5 py-0.5 text-[11px] font-mono text-white/80">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-0.5 hover:text-white transition-colors cursor-pointer"
              title="Zoom out"
            >
              <ZoomOutRounded style={{ fontSize: 15 }} />
            </button>
            <span className="px-1 text-[10px] w-9 text-center font-bold">{zoom}%</span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-0.5 hover:text-white transition-colors cursor-pointer"
              title="Zoom in"
            >
              <ZoomInRounded style={{ fontSize: 15 }} />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewport: Continuous Vertical Scroll (Top to Bottom) */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="relative w-full overflow-y-auto p-2 sm:p-4 flex flex-col items-center gap-4 bg-[#181512] flex-1 min-h-0 max-h-[66vh] sm:max-h-[72vh] scroll-smooth"
      >
        {/* ===================== FILE 1: BROCHURE (3 PAGES CONTINUOUS) ===================== */}
        {fileId === 1 && (
          <div
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="w-full flex flex-col items-center gap-4 transition-transform duration-150"
          >
            {/* Page 1 */}
            <div
              id="pdf-page-1-1"
              className="w-full max-w-[560px] bg-white text-gray-900 rounded-sm shadow-xl border border-gray-300 p-4 sm:p-6 font-sans relative overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none rotate-[-35deg]">
                <span className="text-5xl font-black uppercase text-gray-950 tracking-widest">OFFICIAL VERIFIED COPY</span>
              </div>
              <div className="border-b-2 border-brand pb-3 mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand">Official Project Brochure</span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">VASAVI SKYLA</h2>
                <p className="text-[11px] text-gray-600 font-medium">Ultra-Luxury High-Rise Residences · Financial District, Hyderabad</p>
              </div>

              <div className="rounded-control bg-gradient-to-br from-gray-900 via-gray-800 to-amber-950 text-white p-3.5 mb-3">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Architectural Landmark</span>
                <h3 className="text-base font-extrabold mt-0.5">Rising Above Hitec City Skyline</h3>
                <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
                  5 iconic towers spanning across 6.23 manicured acres in the center of Hyderabad&apos;s Financial District.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1 mb-3">
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <span className="block text-base font-black text-brand">6.23 Acres</span>
                  <span className="text-[10px] text-gray-500 font-medium">Total Area</span>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <span className="block text-base font-black text-brand">G + 31</span>
                  <span className="text-[10px] text-gray-500 font-medium">Floors / 5 Towers</span>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <span className="block text-base font-black text-brand">80%</span>
                  <span className="text-[10px] text-gray-500 font-medium">Open Space</span>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-gray-200 flex justify-between text-[9px] text-gray-400 font-mono">
                <span>VASAVI SKYLA / GULLY PROPERTIES VERIFIED</span>
                <span>Page 1 of 3</span>
              </div>
            </div>

            {/* Page 2 */}
            <div
              id="pdf-page-1-2"
              className="w-full max-w-[560px] bg-white text-gray-900 rounded-sm shadow-xl border border-gray-300 p-4 sm:p-6 font-sans relative overflow-hidden"
            >
              <div className="border-b pb-2 mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand">Tower Specifications</span>
                <h3 className="text-base font-bold text-gray-900">Configurations &amp; Progress</h3>
              </div>

              <table className="w-full text-[11px] text-left border-collapse border border-gray-200 mb-3">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-bold">
                    <th className="p-1.5 border border-gray-200">Tower</th>
                    <th className="p-1.5 border border-gray-200">Type</th>
                    <th className="p-1.5 border border-gray-200">Sizes (SBA)</th>
                    <th className="p-1.5 border border-gray-200">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  <tr>
                    <td className="p-1.5 border font-semibold">Tower A (Apex)</td>
                    <td className="p-1.5 border">4 &amp; 5 BHK Ultra</td>
                    <td className="p-1.5 border font-mono">3,850 – 5,200 sq.ft.</td>
                    <td className="p-1.5 border text-emerald-700 font-semibold">18th Floor Cast</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 border font-semibold">Tower B (Belair)</td>
                    <td className="p-1.5 border">3 &amp; 4 BHK Luxury</td>
                    <td className="p-1.5 border font-mono">2,450 – 3,400 sq.ft.</td>
                    <td className="p-1.5 border text-emerald-700 font-semibold">22nd Floor Cast</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 border font-semibold">Tower C (Crest)</td>
                    <td className="p-1.5 border">3 BHK Premium</td>
                    <td className="p-1.5 border font-mono">1,850 – 2,250 sq.ft.</td>
                    <td className="p-1.5 border text-emerald-700 font-semibold">14th Floor Cast</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 pt-2 border-t border-gray-200 flex justify-between text-[9px] text-gray-400 font-mono">
                <span>VASAVI SKYLA / GULLY PROPERTIES VERIFIED</span>
                <span>Page 2 of 3</span>
              </div>
            </div>

            {/* Page 3 */}
            <div
              id="pdf-page-1-3"
              className="w-full max-w-[560px] bg-white text-gray-900 rounded-sm shadow-xl border border-gray-300 p-4 sm:p-6 font-sans relative overflow-hidden"
            >
              <div className="border-b pb-2 mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand">Clubhouse &amp; Lifestyle</span>
                <h3 className="text-base font-bold text-gray-900">Amenities &amp; Master Plan</h3>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
                <div className="border border-gray-200 rounded p-2.5 bg-gray-50">
                  <h5 className="font-bold text-brand">Wellness &amp; Sports</h5>
                  <p className="text-gray-600 mt-1">Full-sized Squash &amp; Badminton Courts, Yoga Deck, Heated Jacuzzi &amp; Steam Rooms.</p>
                </div>
                <div className="border border-gray-200 rounded p-2.5 bg-gray-50">
                  <h5 className="font-bold text-brand">Leisure &amp; Community</h5>
                  <p className="text-gray-600 mt-1">Private 40-seat Screening Cinema, Rooftop Stargazing Deck, Business Co-working Lounges.</p>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-gray-200 flex justify-between text-[9px] text-gray-400 font-mono">
                <span>VASAVI SKYLA / GULLY PROPERTIES VERIFIED</span>
                <span>Page 3 of 3</span>
              </div>
            </div>
          </div>
        )}

        {/* ===================== FILE 2: HMDA (APPROVAL ORDER) ===================== */}
        {fileId === 2 && (
          <div
            id="pdf-page-2-1"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-[560px] bg-white text-gray-900 rounded-sm shadow-xl border border-gray-300 p-4 sm:p-6 font-sans relative overflow-hidden transition-transform duration-150"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none rotate-[-35deg]">
              <span className="text-5xl font-black uppercase text-gray-950 tracking-widest">OFFICIAL VERIFIED COPY</span>
            </div>

            <div className="text-center border-b pb-2 mb-3">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">GOVERNMENT OF TELANGANA</span>
              <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight uppercase">
                Hyderabad Metropolitan Development Authority
              </h2>
              <p className="text-[10px] text-gray-600">Swarna Jayanti Complex, Sanjeeva Reddy Nagar, Hyderabad – 500038</p>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-gray-600 border-b pb-1.5 mb-2.5">
              <span>Order No: <strong className="text-gray-900">LP No. 000123/LO/Plg/HMDA/2022</strong></span>
              <span>Date: <strong className="text-gray-900">14/10/2022</strong></span>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded p-2.5 text-[11px] leading-relaxed text-gray-700 mb-3">
              <strong className="text-gray-900">SUBJECT:</strong> Planning Sanction – Proposed High-Rise Residential Gated Community comprising 5 Towers (G+31 Floors) in Sy Nos. 128, 129 &amp; 130 of Puppalaguda Village, Financial District, Hyderabad – Technical Clearance Accorded.
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
              <div className="p-2 border rounded bg-white">
                <span className="text-[10px] text-gray-500 block">Sanctioned Area</span>
                <strong className="font-mono text-gray-900">25,212.00 Sq. Mtrs (6.23 Ac)</strong>
              </div>
              <div className="p-2 border rounded bg-white">
                <span className="text-[10px] text-gray-500 block">Maximum Sanctioned Height</span>
                <strong className="font-mono text-gray-900">104.50 Meters (G+31 Floors)</strong>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-gray-200 flex justify-between text-[9px] text-gray-400 font-mono">
              <span>VASAVI SKYLA / GULLY PROPERTIES VERIFIED</span>
              <span>Page 1 of 1</span>
            </div>
          </div>
        )}

        {/* ===================== FILE 3: RERA CERTIFICATE (MATCHES USER SCREENSHOT EXACTLY) ===================== */}
        {fileId === 3 && (
          <div
            id="pdf-page-3-1"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-[560px] bg-white text-gray-900 rounded-sm shadow-xl border border-gray-300 p-4 sm:p-6 font-sans relative overflow-hidden transition-transform duration-150"
          >
            {/* Watermark exactly matching screenshot */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.045] select-none rotate-[-30deg]">
              <span className="text-5xl font-black uppercase text-gray-900 tracking-widest text-center leading-tight">
                OFFICIAL<br />VERIFIED<br />COPY
              </span>
            </div>

            {/* Inner Border Box exactly matching screenshot */}
            <div className="border-2 border-amber-600/30 rounded p-3.5 sm:p-5 relative z-10">
              <div className="text-center border-b border-gray-200 pb-2 mb-3">
                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block">
                  TELANGANA STATE REAL ESTATE REGULATORY AUTHORITY
                </span>
                <h2 className="text-base sm:text-lg font-black text-amber-900 tracking-tight uppercase mt-0.5">
                  REGISTRATION CERTIFICATE OF PROJECT
                </h2>
                <p className="text-[10px] text-gray-500">
                  [Issued under Section 5 of Real Estate (Regulation and Development) Act, 2016]
                </p>
              </div>

              {/* RERA Number Card matching screenshot */}
              <div className="bg-amber-50/80 border border-amber-200 rounded p-2 text-center mb-3">
                <span className="text-[9.5px] font-bold text-amber-900 uppercase block tracking-wider">
                  RERA REGISTRATION NUMBER
                </span>
                <span className="text-base font-black font-mono text-[#F85B01] tracking-wider">
                  P02400004567
                </span>
              </div>

              {/* Fields Table matching screenshot */}
              <div className="space-y-2 text-[11px] text-gray-700 divide-y divide-gray-100">
                <div className="grid grid-cols-3 gap-1 pt-1.5">
                  <span className="font-semibold text-gray-500">Project Name:</span>
                  <span className="col-span-2 font-bold text-gray-900">VASAVI SKYLA</span>
                </div>
                <div className="grid grid-cols-3 gap-1 pt-1.5">
                  <span className="font-semibold text-gray-500">Promoter:</span>
                  <span className="col-span-2 text-gray-800">M/s Vasavi Infratech Private Limited</span>
                </div>
                <div className="grid grid-cols-3 gap-1 pt-1.5">
                  <span className="font-semibold text-gray-500">Validity:</span>
                  <span className="col-span-2 text-gray-800 font-mono">01-Nov-2022 to 31-Dec-2026</span>
                </div>
                <div className="grid grid-cols-3 gap-1 pt-1.5">
                  <span className="font-semibold text-gray-500">Location:</span>
                  <span className="col-span-2 text-gray-800">Puppalaguda, Financial District, Hyderabad</span>
                </div>
              </div>

              {/* Footer row matching screenshot */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200 text-[10px]">
                <span className="text-gray-500">Verify online: rera.telangana.gov.in</span>
                <span className="font-bold text-amber-900">TSRERA Official Stamp</span>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-gray-200 flex justify-between text-[9px] text-gray-400 font-mono">
              <span>VASAVI SKYLA / GULLY PROPERTIES VERIFIED</span>
              <span>Page 1 of 1</span>
            </div>
          </div>
        )}

        {/* ===================== FILE 4: FLOOR PLANS (2 PAGES CONTINUOUS) ===================== */}
        {fileId === 4 && (
          <div
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="w-full flex flex-col items-center gap-4 transition-transform duration-150"
          >
            {/* Page 1 */}
            <div
              id="pdf-page-4-1"
              className="w-full max-w-[560px] bg-white text-gray-900 rounded-sm shadow-xl border border-gray-300 p-4 sm:p-6 font-sans relative overflow-hidden"
            >
              <div className="flex justify-between items-start border-b pb-2 mb-3">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase">Architectural Blueprint · Sheet 1</span>
                  <h3 className="text-base font-bold text-gray-900">Typical 3 BHK Luxury Layout (Unit Type A)</h3>
                  <p className="text-[10px] text-gray-500 font-mono">Super Built-Up: 2,450 sq.ft. · Carpet: 1,820 sq.ft. (74.3%)</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-900 border border-blue-200">
                  EAST FACING
                </span>
              </div>

              <div className="border-2 border-dashed border-blue-300 rounded-control bg-blue-50/50 p-3 mb-3">
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                  <div className="border border-blue-300 bg-white p-2 rounded">
                    <span className="font-bold text-blue-900 block">Master Suite</span>
                    <span className="text-gray-500">16&apos;0&quot; x 14&apos;0&quot;</span>
                  </div>
                  <div className="border border-blue-300 bg-white p-2 rounded">
                    <span className="font-bold text-blue-900 block">Living &amp; Dining</span>
                    <span className="text-gray-500">24&apos;0&quot; x 16&apos;0&quot;</span>
                  </div>
                  <div className="border border-blue-300 bg-white p-2 rounded">
                    <span className="font-bold text-blue-900 block">Bedroom 2</span>
                    <span className="text-gray-500">14&apos;0&quot; x 12&apos;0&quot;</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-gray-200 flex justify-between text-[9px] text-gray-400 font-mono">
                <span>VASAVI SKYLA / GULLY PROPERTIES VERIFIED</span>
                <span>Page 1 of 2</span>
              </div>
            </div>

            {/* Page 2 */}
            <div
              id="pdf-page-4-2"
              className="w-full max-w-[560px] bg-white text-gray-900 rounded-sm shadow-xl border border-gray-300 p-4 sm:p-6 font-sans relative overflow-hidden"
            >
              <div className="flex justify-between items-start border-b pb-2 mb-3">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase">Architectural Blueprint · Sheet 2</span>
                  <h3 className="text-base font-bold text-gray-900">Typical 4 BHK Sky Villa Layout (Unit Type B)</h3>
                  <p className="text-[10px] text-gray-500 font-mono">Super Built-Up: 3,850 sq.ft. · Carpet: 2,910 sq.ft.</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-900 border border-blue-200">
                  NORTH FACING
                </span>
              </div>

              <div className="border-2 border-dashed border-blue-300 rounded-control bg-blue-50/50 p-3 mb-3">
                <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
                  <div className="border border-blue-300 bg-white p-2 rounded">
                    <span className="font-bold text-blue-900 block">Double Height Living</span>
                    <span className="text-gray-500">28&apos;0&quot; x 18&apos;0&quot;</span>
                  </div>
                  <div className="border border-blue-300 bg-white p-2 rounded">
                    <span className="font-bold text-blue-900 block">Private Deck</span>
                    <span className="text-gray-500">22&apos;0&quot; x 8&apos;0&quot;</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-gray-200 flex justify-between text-[9px] text-gray-400 font-mono">
                <span>VASAVI SKYLA / GULLY PROPERTIES VERIFIED</span>
                <span>Page 2 of 2</span>
              </div>
            </div>
          </div>
        )}

        {/* ===================== FILE 5: PRICE CARD ===================== */}
        {fileId === 5 && (
          <div
            id="pdf-page-5-1"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-[560px] bg-white text-gray-900 rounded-sm shadow-xl border border-gray-300 p-4 sm:p-6 font-sans relative overflow-hidden transition-transform duration-150"
          >
            <div className="flex justify-between items-start border-b pb-2 mb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Official Cost Sheet</span>
                <h3 className="text-base font-bold text-gray-900">Vasavi Skyla · Price Breakdown</h3>
                <p className="text-[10px] text-gray-500 font-mono">Basis: Typical 3 BHK (2,450 sq.ft.) · Valid March 2026</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
                PRE-APPROVED
              </span>
            </div>

            <table className="w-full text-[11px] border-collapse border border-gray-200 mb-3">
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr className="bg-gray-50 font-bold">
                  <td className="p-1.5">Base Sale Price (BSP @ ₹9,500/sft)</td>
                  <td className="p-1.5 text-right font-mono">₹2,32,75,000</td>
                </tr>
                <tr>
                  <td className="p-1.5">2 Covered Car Parking Bays</td>
                  <td className="p-1.5 text-right font-mono">₹6,00,000</td>
                </tr>
                <tr>
                  <td className="p-1.5">Clubhouse &amp; Infrastructure</td>
                  <td className="p-1.5 text-right font-mono">₹8,50,000</td>
                </tr>
                <tr className="bg-amber-50 font-extrabold text-gray-900">
                  <td className="p-1.5">Total Estimated Agreement Value</td>
                  <td className="p-1.5 text-right font-mono text-brand">₹2,48,10,750</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 pt-2 border-t border-gray-200 flex justify-between text-[9px] text-gray-400 font-mono">
              <span>VASAVI SKYLA / GULLY PROPERTIES VERIFIED</span>
              <span>Page 1 of 1</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
