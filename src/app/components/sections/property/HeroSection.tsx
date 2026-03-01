import React, { useState } from "react";
import { MapPin, CheckCircle, Check, X, Play } from "lucide-react";

// Assuming these are standard SVG components
import AcresIcon from "../../../../Files/Clip path group.svg?react";
import UnitsIcon from "../../../../Files/units.svg?react";
import FloorsIcon from "../../../../Files/floors.svg?react";
import accountNewLogo from "../../../../Files/account_new.png";

// --- VOTE BUTTON COMPONENT ---
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

      <button onClick={() => handleVote("like")} aria-label="Like this feature" className={`flex items-center justify-center w-5.5 h-5.5 rounded-full transition-all focus:outline-none absolute -bottom-[10px] left-1 -p-2 ${
          vote === "like"
            ? "bg-[#FAF8F5] ring-[3px] ring-[#EAE4D9] shadow-sm"
            : "bg-[#FAF8F5] ring-[3px] ring-[#F2EFE9] hover:ring-[#EAE4D9]"
        }`}
      >
        <Check
          className={`w-[13px] h-[13px] transition-colors duration-300 ease-in-out ${
            vote === "like" 
              ? "text-[#F85B01]" 
              : "text-[#8C827A] hover:text-[#F85B01]"
          }`}
          strokeWidth={3}
        />
      </button>

      {/* Thumbs-Down Button */}
      <button
        onClick={() => handleVote("dislike")}
        aria-label="Dislike this feature"
        className={`flex items-center justify-center w-5.5 h-5.5 rounded-full transition-all focus:outline-none absolute -bottom-[10px] right-1 ${
          vote === "dislike"
            ? "bg-[#FAF8F5] ring-[3px] ring-[#EAE4D9] shadow-sm"
            : "bg-[#FAF8F5] ring-[3px] ring-[#F2EFE9] hover:ring-[#EAE4D9]"
        }`}
      >
        <X
          className={`w-[13px] h-[13px] transition-colors duration-300 ease-in-out ${
            vote === "dislike" 
              ? "text-[#322822]" 
              : "text-[#8C827A] hover:text-[#322822]"
          }`}
          strokeWidth={3}
        />
      </button>
    </>
  );
};

// --- PROPERTY STAT COMPONENT ---
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
}) => (
  <article 
    // Reduced margin-bottom to mb-4 for closer vote controls
    className="group bg-white rounded-[7px] flex-1 h-[90px] flex flex-col items-center justify-center relative mb-4 border border-stone-200 overflow-visible" 
    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}
  >
    <h3 className="font-bold text-[#322822] text-[12px] leading-tight mb-2 text-center px-1">
      {label}
    </h3>

    <div 
      className="flex items-center justify-center text-[#F85B01]"
      style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
    >
      <Icon className="w-full h-full" />
    </div>

    <div className="absolute bottom-0 left-0 right-0  w-full h-0 flex justify-between z-10">
      <VoteButton vote={vote} onVote={onVote} />
    </div>
  </article>
);

// --- HERO SECTION COMPONENT ---
const HeroSection: React.FC = () => {
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
    <section className="relative w-full max-w-md mx-auto flex flex-col font-sans overflow-x-hidden bg-[#F9F7F2] shadow-2xl rounded-b-[7px]">
      {/* Header Image - Height reduced from 280px to 240px */}
      <header className="relative h-[240px] flex-shrink-0 bg-[#312822]">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
          alt="Vasavi Skyla Property Exterior"
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#312822]/80 via-transparent to-transparent" />

        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center rounded-[7px] bg-[#322822] px-3 py-1 text-[11px] font-bold tracking-wide text-white shadow-md">
            {offerRibbonText}
          </span>
        </div>
        
        <div className="absolute top-0 left-0 right-0 p-4 pt-6">
          <h1 className="text-white font-extrabold text-2xl leading-tight mb-1 tracking-tight">
            Vasavi Skyla
          </h1>
          <p className="text-white/90 text-xs flex items-center font-medium">
            <MapPin className="w-3.5 h-3.5 mr-1 text-white" aria-hidden="true" />
            Hyderabad Hills, Hyderabad
          </p>
        </div>

        {/* Price tag position adjusted to match new header height */}
        <div className="absolute bottom-14 left-4">
          <div
            className="inline-flex items-center gap-1.5 rounded-[7px] px-3.5 py-2 relative overflow-hidden"
            style={{ 
              background: "linear-gradient(135deg, #F85B01, #E24E00)", 
              boxShadow: "0 4px 12px rgba(248,91,1,0.25)" 
            }}
          >
            <p className="text-white font-extrabold text-[15px] relative z-10 leading-none">
              ₹8,000<span className="text-[11px] font-semibold text-white/80 ml-0.5">/sft</span>
            </p>
            <span className="text-[#F4EFE6] text-[10px] font-bold tracking-wider relative z-10 ml-1 bg-black/10 px-1.5 py-0.5 rounded-sm">
              Onwards
            </span>
          </div>
        </div>
      </header>

      {/* Content Card - Padding tightened to p-4 */}
      <div className="px-4 -mt-8 relative z-20 pb-1">
        <div className="bg-[#FDFBF8] rounded-[7px] p-4 shadow-lg border border-white">
          
          {/* Developer row - Tightened mb-5/pb-4 to mb-4/pb-3 */}
          <div className="flex items-center gap-3 pb-3 border-b border-stone-200/80 mb-4">
            <div className="w-11 h-11 flex items-center justify-center bg-white shadow-sm border border-stone-100 rounded-[7px] overflow-hidden flex-shrink-0 p-1">
              <img
                src={accountNewLogo}
                alt="Gully Properties Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h2 className="font-bold text-[#322822] text-[14px] tracking-tight leading-none">Gully Properties</h2>
                <CheckCircle className="w-3.5 h-3.5 text-[#E76F26]" strokeWidth={2.5} aria-label="Verified Developer" />
              </div>
            </div>
          </div>

          {/* Property Stats - Gap reduced to 3 for tighter grid */}
          <div className="flex items-start justify-between gap-5 w-full overflow-visible">
            {statsData.map((stat) => (
              <PropertyStat key={stat.id} {...stat} onVote={stat.setVote} iconSize={stat.iconSize} />
            ))}
          </div>
        </div>
      </div>

      {/* Video Tour Placeholder - Tightened padding */}
      <div className="px-4 pt-2 pb-5">
        <div
          className="relative w-full rounded-[7px] overflow-hidden border border-[#E5DFD4] cursor-pointer"
          style={{ aspectRatio: "16/9", background: "linear-gradient(135deg, #322822 0%, #1E1713 100%)" }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center relative z-10"
              style={{ background: "linear-gradient(135deg, #F85B01, #E24E00)" }}
            >
              <Play className="w-4 h-4 text-white ml-1" fill="currentColor" />
            </div>
            <div className="text-center">
              <p className="text-white text-[13px] font-bold tracking-wide mb-0.5">Video Tour</p>
              <p className="text-[#E5DFD4] text-[10px] font-medium tracking-widest">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;