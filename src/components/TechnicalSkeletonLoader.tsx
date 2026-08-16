import React from 'react';
import { MultiLogoIcon } from './MultiLogo';

export const TechnicalSkeletonLoader: React.FC<{ label?: string }> = ({ label = 'Loading Engineering View...' }) => {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 bg-[#0A0A0B] text-[#E0E0E0]">
      <div className="relative p-6 rounded-2xl bg-[#121316] border border-white/10 shadow-2xl flex flex-col items-center max-w-sm text-center">
        {/* Animated Radar Pulse */}
        <div className="relative mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#F27D26]/10 border border-[#F27D26]/30 flex items-center justify-center animate-pulse">
            <MultiLogoIcon size={24} className="text-[#F27D26]" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F27D26] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F27D26]" />
          </span>
        </div>

        <div className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-1">
          {label}
        </div>
        <div className="text-[10px] font-mono text-white/40 mb-4">
          MULTI ENTERPRISE • CAD SYSTEMS v.02
        </div>

        {/* Skeleton Bars */}
        <div className="w-full space-y-2">
          <div className="h-2 w-full bg-white/10 rounded animate-pulse" />
          <div className="h-2 w-3/4 bg-white/10 rounded animate-pulse mx-auto" />
          <div className="h-2 w-1/2 bg-[#F27D26]/30 rounded animate-pulse mx-auto" />
        </div>
      </div>
    </div>
  );
};
