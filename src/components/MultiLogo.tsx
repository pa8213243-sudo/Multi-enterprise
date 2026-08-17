import React from 'react';

interface MultiLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'icon' | 'full' | 'compact' | 'hero';
  showEst?: boolean;
  textColor?: 'dark' | 'white' | 'auto';
}

export const MultiLogoIcon: React.FC<{ className?: string; size?: number | string }> = ({ 
  className = '', 
  size = 28
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <svg
      viewBox="0 0 100 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none shrink-0 drop-shadow-[0_2px_10px_rgba(229,36,33,0.25)] transition-transform duration-300 group-hover:scale-105 ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
      aria-label="Multi Enterprise Industrial Emblem"
    >
      {/* Top Precision Blue Diamond */}
      <polygon
        points="50,6 66,22 50,38 34,22"
        fill="#1E3A8A"
        className="transition-all duration-300"
      />
      
      {/* Red Geometric M Monogram */}
      <path
        d="M 28,38 
           L 50,59 
           L 72,38 
           L 96,62 
           L 76,82 
           L 62,68 
           L 50,80 
           L 38,68 
           L 24,82 
           L 4,62 
           Z"
        fill="#E52421"
        className="transition-all duration-300"
      />
    </svg>
  );
};

export const MultiLogo: React.FC<MultiLogoProps> = ({
  className = '',
  size = 28,
  variant = 'full',
  showEst = true,
  textColor = 'dark',
}) => {
  const isWhiteText = textColor === 'white';

  if (variant === 'icon') {
    return <MultiLogoIcon size={size} className={className} />;
  }

  if (variant === 'hero') {
    return (
      <div className={`inline-flex items-center gap-3 sm:gap-3.5 group cursor-pointer select-none ${className}`}>
        <div className="p-2 sm:p-2.5 rounded-lg bg-[#FFFFFF] border border-[#D8D2C5] flex items-center justify-center group-hover:border-[#0077ED]/60 group-hover:bg-[#F4EFE6] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_20px_rgba(0,119,237,0.25)]">
          <MultiLogoIcon size={typeof size === 'number' ? size : 34} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5 sm:gap-2 leading-none">
            <span className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-tight ${isWhiteText ? 'text-white' : 'text-[#0F172A]'} font-display group-hover:text-[#0077ED] transition-colors`}>
              MULTI
            </span>
            <span className="text-[10px] sm:text-xs lg:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#0077ED] font-mono">
              ENTERPRISE
            </span>
          </div>
          {showEst && (
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[8px] sm:text-[9px] font-mono tracking-wider sm:tracking-widest uppercase ${isWhiteText ? 'text-cyan-200/80' : 'text-[#64748B]'}`}>
                INDUSTRIAL PVC BARRIERS
              </span>
              <span className="text-[7.5px] sm:text-[8px] font-mono px-1.5 py-0.5 rounded bg-[#0077ED]/20 text-[#0077ED] border border-[#0077ED]/30 font-bold">
                EST. 1998
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 group cursor-pointer select-none shrink-0 ${className}`}>
      {/* Precision Brand Icon Container (1.5x Scaled) */}
      <div className="p-2 sm:p-2.5 rounded-xl bg-[#FFFFFF] border border-[#D8D2C5] flex items-center justify-center group-hover:border-[#0077ED]/60 group-hover:bg-[#F4EFE6] transition-all duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,119,237,0.3)]">
        <MultiLogoIcon size={typeof size === 'number' ? (size < 36 ? 38 : size) : 38} />
      </div>

      {/* Typography (1.5x Scaled) */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5 sm:gap-2 leading-none">
          <span className={`text-xl sm:text-2xl lg:text-[26px] font-black tracking-tight ${isWhiteText ? 'text-white' : 'text-[#0F172A]'} group-hover:text-[#0077ED] transition-colors font-display`}>
            MULTI
          </span>
          <span className="text-xs sm:text-sm lg:text-[15px] font-bold tracking-[0.25em] uppercase text-[#0077ED] font-mono">
            ENTERPRISE
          </span>
        </div>
        {showEst && (
          <div className="flex items-center gap-2 mt-1 whitespace-nowrap">
            <span className={`text-[9px] sm:text-[10px] lg:text-[10.5px] font-mono tracking-wider sm:tracking-widest uppercase ${isWhiteText ? 'text-cyan-200/80' : 'text-[#475569]'}`}>
              PREMIUM INDUSTRIAL PVC
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#0077ED]/20 text-[#0077ED] border border-[#0077ED]/30 font-bold">
              EST. 1998
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiLogo;
