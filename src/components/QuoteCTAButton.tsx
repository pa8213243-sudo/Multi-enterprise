import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { Sparkles, FileText, ArrowRight, LucideIcon } from 'lucide-react';

interface QuoteCTAButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  onClick?: () => void;
  label?: string;
  sublabel?: string;
  variant?: 'primary' | 'white' | 'dark' | 'outline' | 'hero';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  showSparkle?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const QuoteCTAButton: React.FC<QuoteCTAButtonProps> = ({
  onClick,
  label = 'Get a Quote',
  sublabel,
  variant = 'primary',
  size = 'md',
  icon: Icon = FileText,
  showSparkle = false,
  className = '',
  children,
  ...rest
}) => {
  // Size classes with proportional touch targets
  const sizeStyles = {
    sm: 'px-3.5 py-2 text-[10px]',
    md: 'px-5 py-2.5 sm:py-3 text-xs',
    lg: 'px-7 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm',
  }[size];

  // High contrast industrial variants with subtle ambient glows
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#F27D26] to-[#E52421] text-white border border-[#F27D26]/80 hover:border-white/50 shadow-[0_0_20px_rgba(242,125,38,0.35)] hover:shadow-[0_0_35px_rgba(242,125,38,0.7)]',
    white:
      'bg-white text-black border border-white/40 hover:bg-[#F27D26] hover:text-white hover:border-[#F27D26] shadow-lg hover:shadow-[0_0_30px_rgba(242,125,38,0.6)]',
    dark:
      'bg-[#121316] text-white border border-white/20 hover:border-[#F27D26] hover:bg-[#1A1C23] shadow-md hover:shadow-[0_0_25px_rgba(242,125,38,0.4)]',
    outline:
      'bg-transparent text-[#F27D26] border border-[#F27D26]/60 hover:bg-[#F27D26]/10 hover:border-[#F27D26] shadow-sm hover:shadow-[0_0_25px_rgba(242,125,38,0.45)]',
    hero:
      'bg-gradient-to-r from-[#F27D26] via-[#E52421] to-[#F27D26] bg-[length:200%_auto] hover:bg-right text-white border border-white/30 shadow-[0_0_25px_rgba(242,125,38,0.5)] hover:shadow-[0_0_45px_rgba(242,125,38,0.85)]',
  }[variant];

  return (
    <div className="relative inline-flex group select-none">
      {/* Subtle Ambient Radial Glow on Hover */}
      <div 
        className="absolute -inset-1 bg-gradient-to-r from-[#F27D26] via-[#E52421] to-[#F27D26] rounded-sm blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" 
        aria-hidden="true"
      />

      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ 
          scale: 1.02, 
          y: -1.5,
          transition: { type: 'spring', stiffness: 400, damping: 18 } 
        }}
        whileTap={{ 
          scale: 0.97, 
          y: 1,
          transition: { type: 'spring', stiffness: 500, damping: 20 } 
        }}
        className={`group relative overflow-hidden font-mono uppercase tracking-widest font-bold select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F27D26] focus:ring-offset-2 focus:ring-offset-[#0A0A0B] transition-all duration-300 ${sizeStyles} ${variantStyles} ${className}`}
        {...rest}
      >
        {/* Animated Light Sweep Shimmer on Hover */}
        <div 
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" 
          aria-hidden="true"
        />

        {/* Precision Laser Top Border Glow Line */}
        <div 
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Button Content */}
        <div className="relative z-10 flex items-center justify-center gap-2.5">
          {Icon && (
            <Icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
          )}
          
          <div className="flex flex-col text-left">
            <span className="leading-tight tracking-wider">{children || label}</span>
            {sublabel && (
              <span className="text-[8px] font-mono tracking-widest opacity-75 leading-none mt-0.5">
                {sublabel}
              </span>
            )}
          </div>

          {showSparkle ? (
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
          ) : (
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </div>

        {/* Corner Precision Industrial Markers */}
        <span className="absolute top-0 left-0 w-1 h-1 bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
        <span className="absolute bottom-0 right-0 w-1 h-1 bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
      </motion.button>
    </div>
  );
};
