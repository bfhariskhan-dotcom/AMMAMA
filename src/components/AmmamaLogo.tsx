import React from 'react';

interface AmmamaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  inverted?: boolean;
}

export const AmmamaLogo: React.FC<AmmamaLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  inverted = false,
}) => {
  // Sizing configurations
  const dimensions = {
    sm: { height: 42, iconSize: 42, textTitle: 'text-sm', textSub: 'text-[9px]' },
    md: { height: 52, iconSize: 52, textTitle: 'text-base sm:text-lg', textSub: 'text-[10px]' },
    lg: { height: 64, iconSize: 64, textTitle: 'text-xl sm:text-2xl', textSub: 'text-xs' },
    xl: { height: 80, iconSize: 80, textTitle: 'text-2xl sm:text-3xl', textSub: 'text-sm' },
  }[size];

  const primaryColor = inverted ? '#E8F5E9' : '#155D27';
  const secondaryColor = inverted ? '#C8E6C9' : '#0D3818';
  const accentColor = inverted ? '#F3D279' : '#C28E3A';
  const textColor = inverted ? '#FFFFFF' : '#0D3818';
  const mutedTextColor = inverted ? '#A5D6A7' : '#155D27';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 
        Authentic Packaging Emblem from Product Picture:
        Botanical Mortar & Pestle, Sprouting Herbal Leaves, Laurel Wreath, 
        and "AMMAMA FOODS — PURE & NATURAL —"
      */}
      <svg
        width={dimensions.iconSize}
        height={dimensions.iconSize}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 hover:scale-105"
        aria-label="Ammama Wellness Shelf Official Logo"
      >
        {/* Subtle Background Glow Circle */}
        <circle cx="80" cy="80" r="76" fill={inverted ? 'rgba(255,255,255,0.06)' : 'rgba(21,93,39,0.04)'} stroke={inverted ? 'rgba(255,255,255,0.15)' : 'rgba(21,93,39,0.12)'} strokeWidth="1.5" />
        <circle cx="80" cy="80" r="72" stroke={accentColor} strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />

        {/* --- Left Laurel Wreath Branch --- */}
        <path
          d="M 45 106 C 30 84 32 54 48 34"
          stroke={primaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left Laurel Leaves */}
        <path d="M 46 103 C 38 104 33 97 38 93 C 43 90 47 98 46 103 Z" fill={primaryColor} />
        <path d="M 40 91 C 30 89 28 81 35 78 C 41 76 43 85 40 91 Z" fill={primaryColor} />
        <path d="M 36 76 C 26 72 26 63 33 61 C 40 60 41 70 36 76 Z" fill={primaryColor} />
        <path d="M 37 60 C 29 53 31 44 38 44 C 44 44 43 54 37 60 Z" fill={primaryColor} />
        <path d="M 43 46 C 37 38 42 30 48 32 C 53 34 50 43 43 46 Z" fill={primaryColor} />
        <path d="M 50 36 C 48 27 57 23 61 28 C 64 32 58 37 50 36 Z" fill={primaryColor} />

        {/* --- Right Laurel Wreath Branch --- */}
        <path
          d="M 115 106 C 130 84 128 54 112 34"
          stroke={primaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Laurel Leaves */}
        <path d="M 114 103 C 122 104 127 97 122 93 C 117 90 113 98 114 103 Z" fill={primaryColor} />
        <path d="M 120 91 C 130 89 132 81 125 78 C 119 76 117 85 120 91 Z" fill={primaryColor} />
        <path d="M 124 76 C 134 72 134 63 127 61 C 120 60 119 70 124 76 Z" fill={primaryColor} />
        <path d="M 123 60 C 131 53 129 44 122 44 C 116 44 117 54 123 60 Z" fill={primaryColor} />
        <path d="M 117 46 C 123 38 118 30 112 32 C 107 34 110 43 117 46 Z" fill={primaryColor} />
        <path d="M 110 36 C 112 27 103 23 99 28 C 96 32 102 37 110 36 Z" fill={primaryColor} />

        {/* --- Botanical Leaves Inside Mortar --- */}
        {/* Left Sprout */}
        <path
          d="M 77 62 C 67 48 76 35 83 44 C 84 53 79 59 77 62 Z"
          fill={accentColor}
        />
        {/* Center Main Leaf */}
        <path
          d="M 80 58 C 76 40 89 30 92 42 C 92 50 84 56 80 58 Z"
          fill={primaryColor}
        />
        {/* Right Sprout */}
        <path
          d="M 84 62 C 94 48 87 36 96 46 C 94 54 87 60 84 62 Z"
          fill={primaryColor}
        />

        {/* --- Pestle (Grinding Rod) --- */}
        <path
          d="M 64 42 C 62 39 65 35 68 37 L 89 57 C 91 59 89 63 85 61 L 64 42 Z"
          fill={secondaryColor}
        />

        {/* --- Mortar (Apothecary Bowl) --- */}
        {/* Rim of the Mortar */}
        <path
          d="M 58 62 C 58 59 102 59 102 62 L 99 66 L 61 66 Z"
          fill={secondaryColor}
        />
        {/* Main Body of the Mortar */}
        <path
          d="M 61 66 C 61 88 99 88 99 66 Z"
          fill={primaryColor}
        />
        {/* Decorative Mortar Band */}
        <path
          d="M 65 73 Q 80 77 95 73"
          stroke={accentColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Mortar Pedestal / Base */}
        <path
          d="M 72 86 L 88 86 L 91 91 L 69 91 Z"
          fill={secondaryColor}
        />

        {/* --- Text Inside Emblem Badge (From Packaging) --- */}
        {/* AMMAMA FOODS */}
        <text
          x="80"
          y="120"
          textAnchor="middle"
          fill={textColor}
          fontSize="11"
          fontWeight="800"
          letterSpacing="0.16em"
          fontFamily="serif"
        >
          AMMAMA FOODS
        </text>

        {/* — PURE & NATURAL — */}
        <text
          x="80"
          y="134"
          textAnchor="middle"
          fill={mutedTextColor}
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="0.22em"
          fontFamily="sans-serif"
        >
          — PURE &amp; NATURAL —
        </text>
      </svg>

      {/* Brand Identity Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-serif font-bold tracking-tight text-stone-900 ${dimensions.textTitle}`}
              style={{ color: textColor }}
            >
              Ammama Wellness Shelf
            </span>
          </div>
          <span
            className={`font-sans tracking-widest uppercase font-semibold text-stone-500 ${dimensions.textSub}`}
            style={{ color: mutedTextColor }}
          >
            Pure &amp; Natural Herbal Wellness · SECP Reg. 0303557
          </span>
        </div>
      )}
    </div>
  );
};
