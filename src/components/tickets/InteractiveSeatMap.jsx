import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, Sparkles, CheckCircle2 } from 'lucide-react';

export const InteractiveSeatMap = ({
  tiers = [],
  selectedTickets = {},
  onSelectTier,
  venueName = 'Stadium'
}) => {
  const [hoveredTier, setHoveredTier] = useState(null);

  // Map tiers by type
  const vipTier = tiers.find(t => t.type === 'vip') || tiers[0];
  const festTier = tiers.find(t => t.type === 'festival') || tiers[1] || tiers[0];
  const tribTier = tiers.find(t => t.type === 'tribune') || tiers[2] || tiers[0];
  const upperTier = tiers.filter(t => t.type === 'tribune')[1] || tiers[3] || tribTier;

  const getTierQty = (tier) => (tier ? selectedTickets[tier.id] || 0 : 0);

  return (
    <div className="space-y-4">
      {/* Information strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-surface border border-border text-xs text-ink-secondary shadow-sm">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-coral-500 shrink-0" />
          <span>Sorot atau klik area denah stadion untuk memilih kategori tiket.</span>
        </div>
        {hoveredTier ? (
          <span className="font-bold text-coral-600 font-display">
            {hoveredTier.name} • Rp {hoveredTier.price.toLocaleString('id-ID')}
          </span>
        ) : (
          <span className="text-ink-muted italic">Arahkan kursor ke area stadion</span>
        )}
      </div>

      {/* Interactive SVG Stadium Floorplan */}
      <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] bg-surface border border-border rounded-2xl p-4 sm:p-6 overflow-hidden shadow-sm flex items-center justify-center">
        <svg
          viewBox="0 0 500 380"
          className="w-full h-full select-none"
        >
          {/* Outer Stadium Ellipse */}
          <ellipse
            cx="250"
            cy="190"
            rx="230"
            ry="165"
            fill="#F7F6F2"
            stroke="#E2E8F0"
            strokeWidth="3"
          />

          {/* Upper Tribune - North */}
          <path
            d="M 50 170 C 60 70, 440 70, 450 170 L 410 170 C 400 95, 100 95, 90 170 Z"
            fill={getTierQty(upperTier) > 0 ? '#10B981' : '#D1FAE5'}
            stroke="#10B981"
            strokeWidth="1.5"
            className="cursor-pointer hover:fill-emerald-400 transition-colors"
            onMouseEnter={() => setHoveredTier(upperTier)}
            onMouseLeave={() => setHoveredTier(null)}
            onClick={() => onSelectTier(upperTier)}
          />

          {/* Upper Tribune - South */}
          <path
            d="M 50 210 C 60 310, 440 310, 450 210 L 410 210 C 400 285, 100 285, 90 210 Z"
            fill={getTierQty(upperTier) > 0 ? '#10B981' : '#D1FAE5'}
            stroke="#10B981"
            strokeWidth="1.5"
            className="cursor-pointer hover:fill-emerald-400 transition-colors"
            onMouseEnter={() => setHoveredTier(upperTier)}
            onMouseLeave={() => setHoveredTier(null)}
            onClick={() => onSelectTier(upperTier)}
          />

          {/* West Lower Tribune */}
          <path
            d="M 90 145 C 90 100, 160 100, 160 145 L 160 235 C 160 280, 90 280, 90 235 Z"
            fill={getTierQty(tribTier) > 0 ? '#F59E0B' : '#FEF3C7'}
            stroke="#F59E0B"
            strokeWidth="1.5"
            className="cursor-pointer hover:fill-amber-400 transition-colors"
            onMouseEnter={() => setHoveredTier(tribTier)}
            onMouseLeave={() => setHoveredTier(null)}
            onClick={() => onSelectTier(tribTier)}
          />

          {/* East Lower Tribune */}
          <path
            d="M 340 145 C 340 100, 410 100, 410 145 L 410 235 C 410 280, 340 280, 340 235 Z"
            fill={getTierQty(tribTier) > 0 ? '#F59E0B' : '#FEF3C7'}
            stroke="#F59E0B"
            strokeWidth="1.5"
            className="cursor-pointer hover:fill-amber-400 transition-colors"
            onMouseEnter={() => setHoveredTier(tribTier)}
            onMouseLeave={() => setHoveredTier(null)}
            onClick={() => onSelectTier(tribTier)}
          />

          {/* Festival Floor */}
          <rect
            x="170"
            y="180"
            width="160"
            height="85"
            rx="12"
            fill={getTierQty(festTier) > 0 ? '#0284C7' : '#E0F2FE'}
            stroke="#0284C7"
            strokeWidth="1.5"
            className="cursor-pointer hover:fill-sky-400 transition-colors"
            onMouseEnter={() => setHoveredTier(festTier)}
            onMouseLeave={() => setHoveredTier(null)}
            onClick={() => onSelectTier(festTier)}
          />
          <text
            x="250"
            y="228"
            fill={getTierQty(festTier) > 0 ? '#FFFFFF' : '#0369A1'}
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            className="pointer-events-none font-sans"
          >
            FESTIVAL FLOOR
          </text>

          {/* VIP Left */}
          <rect
            x="170"
            y="120"
            width="75"
            height="50"
            rx="8"
            fill={getTierQty(vipTier) > 0 ? '#E4572E' : '#FFEDD5'}
            stroke="#E4572E"
            strokeWidth="1.5"
            className="cursor-pointer hover:fill-orange-400 transition-colors"
            onMouseEnter={() => setHoveredTier(vipTier)}
            onMouseLeave={() => setHoveredTier(null)}
            onClick={() => onSelectTier(vipTier)}
          />
          <text
            x="207"
            y="150"
            fill={getTierQty(vipTier) > 0 ? '#FFFFFF' : '#C2410C'}
            fontSize="9"
            fontWeight="bold"
            textAnchor="middle"
            className="pointer-events-none font-sans"
          >
            VIP A
          </text>

          {/* VIP Right */}
          <rect
            x="255"
            y="120"
            width="75"
            height="50"
            rx="8"
            fill={getTierQty(vipTier) > 0 ? '#E4572E' : '#FFEDD5'}
            stroke="#E4572E"
            strokeWidth="1.5"
            className="cursor-pointer hover:fill-orange-400 transition-colors"
            onMouseEnter={() => setHoveredTier(vipTier)}
            onMouseLeave={() => setHoveredTier(null)}
            onClick={() => onSelectTier(vipTier)}
          />
          <text
            x="292"
            y="150"
            fill={getTierQty(vipTier) > 0 ? '#FFFFFF' : '#C2410C'}
            fontSize="9"
            fontWeight="bold"
            textAnchor="middle"
            className="pointer-events-none font-sans"
          >
            VIP B
          </text>

          {/* Stage Area */}
          <polygon
            points="190,50 310,50 330,105 170,105"
            fill="#171717"
            stroke="#262626"
            strokeWidth="2"
          />
          <rect
            x="242"
            y="105"
            width="16"
            height="15"
            fill="#262626"
          />
          <text
            x="250"
            y="82"
            fill="#FFFFFF"
            fontSize="12"
            fontWeight="800"
            letterSpacing="2"
            textAnchor="middle"
            className="font-sans"
          >
            MAIN STAGE
          </text>
        </svg>
      </div>

      {/* Category Legend Selector */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-ink-secondary pt-2">
        {tiers.map((tier) => (
          <button
            key={tier.id}
            onClick={() => onSelectTier(tier)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-border hover:border-ink/40 shadow-sm transition-all"
          >
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }} />
            <span className="text-ink">{tier.name.split('—')[0]}</span>
            {getTierQty(tier) > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-coral-500 text-white text-[10px] font-bold">
                {getTierQty(tier)}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
