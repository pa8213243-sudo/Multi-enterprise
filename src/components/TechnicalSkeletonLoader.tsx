import React from 'react';
import { MultiLogoIcon } from './MultiLogo';

export const TechnicalSkeletonLoader: React.FC<{ label?: string }> = ({ label = 'Loading Engineering View...' }) => {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 bg-[#F8F6F0] text-[#1E293B]">
      <div className="relative p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2DDD2] shadow-2xl flex flex-col items-center max-w-sm text-center">
        {/* Animated Radar Pulse */}
        <div className="relative mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#0077ED]/10 border border-[#0077ED]/30 flex items-center justify-center animate-pulse">
            <MultiLogoIcon size={24} className="text-[#0077ED]" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0077ED] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0077ED]" />
          </span>
        </div>

        <div className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-1">
          {label}
        </div>
        <div className="text-[10px] font-mono text-[#64748B] mb-4">
          MULTI ENTERPRISE • CAD SYSTEMS v.02
        </div>

        {/* Skeleton Bars */}
        <div className="w-full space-y-2">
          <div className="h-2 w-full bg-[#F4EFE6] rounded animate-pulse" />
          <div className="h-2 w-3/4 bg-[#F4EFE6] rounded animate-pulse mx-auto" />
          <div className="h-2 w-1/2 bg-[#0077ED]/30 rounded animate-pulse mx-auto" />
        </div>
      </div>
    </div>
  );
};
