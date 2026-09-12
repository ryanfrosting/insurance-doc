import React, { useId } from 'react';

interface ShieldWatermarkProps {
  opacity?: number; // e.g. 0.12 - 0.25
  className?: string;
  patternId?: string;
}

export const ShieldWatermark: React.FC<ShieldWatermarkProps> = ({ 
  opacity = 0.18,
  className = '',
  patternId,
}) => {
  const generatedId = useId().replace(/:/g, '');
  const actualPatternId = patternId || `canadian-shields-${generatedId}`;

  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`} 
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg 
        className="w-full h-full" 
        xmlns="http://www.w3.org/2000/svg" 
        width="100%" 
        height="100%"
      >
        <defs>
          <pattern 
            id={actualPatternId} 
            width="220" 
            height="130" 
            patternUnits="userSpaceOnUse"
          >
            {/* Shield 1: Ontario / Maple Leaf Shield (Cross at top, 3 leaves below) */}
            <g transform="translate(8, 8)">
              {/* Outer Shield Shape */}
              <path 
                d="M 4,4 L 32,4 C 32,25 28,38 18,44 C 8,38 4,25 4,4 Z" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1.4" 
              />
              {/* Chief with St. George's cross */}
              <line x1="4" y1="14" x2="32" y2="14" stroke="#ffffff" strokeWidth="1.1" />
              <line x1="18" y1="4" x2="18" y2="14" stroke="#ffffff" strokeWidth="1.1" />
              {/* 3 Maple leaves stem */}
              <path 
                d="M 18,36 L 18,25 M 18,25 L 11,20 M 18,25 L 25,20" 
                stroke="#ffffff" 
                strokeWidth="1.1" 
                strokeLinecap="round" 
              />
              {/* Center leaf */}
              <circle cx="18" cy="20" r="2.2" fill="#ffffff" />
              <circle cx="11" cy="19" r="1.8" fill="#ffffff" />
              <circle cx="25" cy="19" r="1.8" fill="#ffffff" />
            </g>

            {/* Shield 2: Tree / Pine sprig shield */}
            <g transform="translate(52, 8)">
              <path 
                d="M 4,4 L 32,4 C 32,25 28,38 18,44 C 8,38 4,25 4,4 Z" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1.4" 
              />
              {/* Pine tree silhouette */}
              <path 
                d="M 18,10 L 22,17 L 20,17 L 24,24 L 21,24 L 26,32 L 19,32 L 19,38 L 17,38 L 17,32 L 10,32 L 15,24 L 12,24 L 16,17 L 14,17 Z" 
                fill="#ffffff" 
              />
            </g>

            {/* Shield 3: Three wheat sheaves (Prairies) */}
            <g transform="translate(96, 8)">
              <path 
                d="M 4,4 L 32,4 C 32,25 28,38 18,44 C 8,38 4,25 4,4 Z" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1.4" 
              />
              {/* 3 sheaves */}
              <path d="M 11,16 C 11,10 15,12 15,20 C 15,24 11,24 11,24" fill="none" stroke="#ffffff" strokeWidth="1.1" />
              <path d="M 25,16 C 25,10 21,12 21,20 C 21,24 25,24 25,24" fill="none" stroke="#ffffff" strokeWidth="1.1" />
              <path d="M 18,22 C 18,15 20,15 18,31" fill="none" stroke="#ffffff" strokeWidth="1.3" />
              <path d="M 12,32 L 24,32" stroke="#ffffff" strokeWidth="1.1" />
              <circle cx="18" cy="24" r="1.3" fill="#ffffff" />
            </g>

            {/* Shield 4: Beaver on mound */}
            <g transform="translate(140, 8)">
              <path 
                d="M 4,4 L 32,4 C 32,25 28,38 18,44 C 8,38 4,25 4,4 Z" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1.4" 
              />
              {/* Beaver silhouette */}
              <path 
                d="M 11,24 C 12,19 22,17 24,20 C 26,22 25,25 24,26 C 26,27 27,30 25,31 C 23,32 21,30 20,30 C 17,31 14,31 11,29 C 9,28 9,25 11,24 Z" 
                fill="#ffffff" 
              />
              {/* Flat tail */}
              <path d="M 9,27 C 6,28 5,31 7,32 C 9,32 11,30 11,29 Z" fill="#ffffff" />
              {/* Water waves */}
              <path d="M 7,34 Q 12,32 18,34 T 29,34" fill="none" stroke="#ffffff" strokeWidth="0.9" />
              <path d="M 9,38 Q 14,36 20,38 T 27,38" fill="none" stroke="#ffffff" strokeWidth="0.9" />
            </g>

            {/* Shield 5: Maritime ship / Galley */}
            <g transform="translate(184, 8)">
              <path 
                d="M 4,4 L 32,4 C 32,25 28,38 18,44 C 8,38 4,25 4,4 Z" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1.4" 
              />
              {/* Ship hull & mast */}
              <path d="M 8,26 L 28,26 L 24,32 L 12,32 Z" fill="#ffffff" />
              <line x1="18" y1="10" x2="18" y2="26" stroke="#ffffff" strokeWidth="1.3" />
              <path d="M 18,12 L 26,17 L 18,22 Z" fill="#ffffff" />
              <line x1="12" y1="16" x2="12" y2="26" stroke="#ffffff" strokeWidth="1.1" />
            </g>

            {/* Row 2 (Offset by 28px for authentic staggered security wallpaper look) */}
            <g transform="translate(30, 70)">
              <path 
                d="M 4,4 L 32,4 C 32,25 28,38 18,44 C 8,38 4,25 4,4 Z" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1.4" 
              />
              <path 
                d="M 11,24 C 12,19 22,17 24,20 C 26,22 25,25 24,26 C 26,27 27,30 25,31 C 23,32 21,30 20,30 C 17,31 14,31 11,29 C 9,28 9,25 11,24 Z" 
                fill="#ffffff" 
              />
              <path d="M 7,34 Q 12,32 18,34 T 29,34" fill="none" stroke="#ffffff" strokeWidth="0.9" />
            </g>

            <g transform="translate(74, 70)">
              <path 
                d="M 4,4 L 32,4 C 32,25 28,38 18,44 C 8,38 4,25 4,4 Z" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1.4" 
              />
              <line x1="4" y1="14" x2="32" y2="14" stroke="#ffffff" strokeWidth="1.1" />
              <line x1="18" y1="4" x2="18" y2="14" stroke="#ffffff" strokeWidth="1.1" />
              <path d="M 18,36 L 18,25 M 18,25 L 11,20 M 18,25 L 25,20" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="18" cy="20" r="2.2" fill="#ffffff" />
            </g>

            <g transform="translate(118, 70)">
              <path 
                d="M 4,4 L 32,4 C 32,25 28,38 18,44 C 8,38 4,25 4,4 Z" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1.4" 
              />
              <path 
                d="M 18,10 L 22,17 L 20,17 L 24,24 L 21,24 L 26,32 L 19,32 L 19,38 L 17,38 L 17,32 L 10,32 L 15,24 L 12,24 L 16,17 L 14,17 Z" 
                fill="#ffffff" 
              />
            </g>

            <g transform="translate(162, 70)">
              <path 
                d="M 4,4 L 32,4 C 32,25 28,38 18,44 C 8,38 4,25 4,4 Z" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1.4" 
              />
              <path d="M 8,26 L 28,26 L 24,32 L 12,32 Z" fill="#ffffff" />
              <line x1="18" y1="10" x2="18" y2="26" stroke="#ffffff" strokeWidth="1.3" />
              <path d="M 18,12 L 26,17 L 18,22 Z" fill="#ffffff" />
            </g>

            {/* Shield 5: Wheat Sheaves (staggered & wrapped seamless clone on the left at -14) */}
            <g transform="translate(-14, 70)">
              <path 
                d="M 4,4 L 32,4 C 32,25 28,38 18,44 C 8,38 4,25 4,4 Z" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1.4" 
              />
              <path d="M 11,16 C 11,10 15,12 15,20 C 15,24 11,24 11,24" fill="none" stroke="#ffffff" strokeWidth="1.1" />
              <path d="M 25,16 C 25,10 21,12 21,20 C 21,24 25,24 25,24" fill="none" stroke="#ffffff" strokeWidth="1.1" />
              <path d="M 18,22 C 18,15 20,15 18,31" fill="none" stroke="#ffffff" strokeWidth="1.3" />
              <path d="M 12,32 L 24,32" stroke="#ffffff" strokeWidth="1.1" />
              <circle cx="18" cy="24" r="1.3" fill="#ffffff" />
            </g>

            {/* Shield 5: Wheat Sheaves (staggered main on the right at 206) */}
            <g transform="translate(206, 70)">
              <path 
                d="M 4,4 L 32,4 C 32,25 28,38 18,44 C 8,38 4,25 4,4 Z" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1.4" 
              />
              <path d="M 11,16 C 11,10 15,12 15,20 C 15,24 11,24 11,24" fill="none" stroke="#ffffff" strokeWidth="1.1" />
              <path d="M 25,16 C 25,10 21,12 21,20 C 21,24 25,24 25,24" fill="none" stroke="#ffffff" strokeWidth="1.1" />
              <path d="M 18,22 C 18,15 20,15 18,31" fill="none" stroke="#ffffff" strokeWidth="1.3" />
              <path d="M 12,32 L 24,32" stroke="#ffffff" strokeWidth="1.1" />
              <circle cx="18" cy="24" r="1.3" fill="#ffffff" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${actualPatternId})`} />
      </svg>
    </div>
  );
};
