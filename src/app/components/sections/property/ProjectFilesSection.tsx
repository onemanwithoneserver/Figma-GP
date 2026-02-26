import React from "react";

// ---------------- TYPES ----------------
interface FileData {
  id: number;
  abbr: string;
  color: string;         // bg color for avatar
  title: string;
  subtitle: string;
  fileType: string;      // right-side label (e.g. "PDF", "DWG")
  fileDetail: string;    // right-side value (e.g. "2.4 MB", "Available")
  featured?: boolean;    // shows "OFFICIAL" badge like "BEST" in the design
}

// ---------------- ICONS ----------------
const DownloadIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// ---------------- DATA ----------------
const FILES_DATA: FileData[] = [
  {
    id: 1,
    abbr: "HMDA",
    color: "#2563EB",
    title: "HMDA Approval",
    subtitle: "Govt. Approved · May 2022",
    fileType: "STATUS",
    fileDetail: "Approved",
    featured: true,
  },
  {
    id: 2,
    abbr: "RERA",
    color: "#DC2626",
    title: "RERA Certificate",
    subtitle: "Registered · Valid till Oct 2028",
    fileType: "STATUS",
    fileDetail: "Registered",
  },
  {
    id: 3,
    abbr: "₹",
    color: "#F85B01",
    title: "Price Card",
    subtitle: "Updated Jan 2026",
    fileType: "FORMAT",
    fileDetail: "PDF",
  },
  {
    id: 4,
    abbr: "FP",
    color: "#059669",
    title: "Floor Plan Set",
    subtitle: "Approved Layouts · All BHK",
    fileType: "FORMAT",
    fileDetail: "DWG / PDF",
  },
  {
    id: 5,
    abbr: "BR",
    color: "#7C3AED",
    title: "Project Brochure",
    subtitle: "Amenities & Master Plan",
    fileType: "SIZE",
    fileDetail: "8.2 MB",
  },
  {
    id: 6,
    abbr: "LD",
    color: "#475569",
    title: "Legal Docs",
    subtitle: "Sale Deed & EC",
    fileType: "FORMAT",
    fileDetail: "PDF",
  },
];

// ---------------- MAIN COMPONENT ----------------
const ProjectFilesSection: React.FC = () => {
  return (
    <div className="w-full antialiased pb-4">

      {/* List Container */}
      <div className="mx-4 rounded-[7px] overflow-hidden border border-[#E8E5DF] shadow-xl shadow-black/5">
        {FILES_DATA.map((file, index) => (
          <div
            key={file.id}
            className={`group flex items-center gap-4 px-4 py-3.5 transition-all duration-200 hover:bg-[#FAFAF9] ${
              file.featured ? "bg-[#FFFBF5]" : "bg-white"
            } ${index !== FILES_DATA.length - 1 ? "border-b border-[#F0EDE8]" : ""}`}
          >
            {/* Colored Avatar */}
            <div
              className="w-11 h-11 rounded-[7px] flex items-center justify-center shrink-0 shadow-md"
              style={{ backgroundColor: file.color }}
            >
              <span className="text-white font-black text-[11px] tracking-tight leading-none text-center px-0.5">
                {file.abbr}
              </span>
            </div>

            {/* Name + Subtitle */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[14px] font-extrabold text-[#1A1D23] leading-tight">
                  {file.title}
                </span>
                {file.featured && (
                  <span className="px-1.5 py-0.5 bg-[#F85B01] text-white text-[9px] font-black tracking-wide rounded-[4px] leading-tight">
                    Official
                  </span>
                )}
              </div>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5 truncate">
                {file.subtitle}
              </p>
            </div>

            {/* Right: Type label + value + actions */}
            <div className="flex items-center gap-3 shrink-0">
              {/* File type info */}
              <div className="text-right hidden xs:block">
                <p className="text-[9px] font-bold tracking-wide text-slate-400 leading-none mb-1">
                  {file.fileType.charAt(0) + file.fileType.slice(1).toLowerCase()}
                </p>
                <p className="text-[13px] font-extrabold text-[#1A1D23] leading-none">
                  {file.fileDetail}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  className="flex items-center justify-center gap-1 h-8 px-2.5 rounded-[5px] bg-gradient-to-r from-orange-50 to-orange-100/50 text-[#F85B01] text-[11px] font-bold border border-orange-100 hover:from-[#F85B01] hover:to-[#E05000] hover:text-white hover:border-[#F85B01] transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                  aria-label={`View ${file.title}`}
                >
                  <EyeIcon />
                  <span>View</span>
                </button>
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-[5px] bg-gradient-to-br from-slate-50 to-slate-100/50 text-slate-400 border border-slate-200/70 hover:from-[#2A2C32] hover:to-[#1E293B] hover:text-white hover:border-[#2A2C32] transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                  title={`Download ${file.title}`}
                  aria-label={`Download ${file.title}`}
                >
                  <DownloadIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilesSection;