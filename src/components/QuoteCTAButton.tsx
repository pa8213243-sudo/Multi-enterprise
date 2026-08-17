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
      'bg-gradient-to-r from-[#0077ED] to-[#E52421] text-white border border-[#0077ED]/80 hover:border-[#EAE5DA]0 shadow-[0_0_20px_rgba(0, 119, 237,0.35)] hover:shadow-[0_0_35px_rgba(0, 119, 237,0.7)]',
    white:
      'bg-[#FFFFFF] text-[#0F172A] border border-[#D8D2C5] hover:bg-[#0077ED] hover:text-white hover:border-[#0077ED] shadow-lg hover:shadow-[0_0_30px_rgba(0, 119, 237,0.6)]',
    dark:
      'bg-[#FFFFFF] text-[#0F172A] border border-[#D8D2C5] hover:border-[#0077ED] hover:bg-[#F4EFE6] shadow-md hover:shadow-[0_0_25px_rgba(0, 119, 237,0.4)]',
    outline:
      'bg-transparent text-[#0077ED] border border-[#0077ED]/60 hover:bg-[#0077ED]/10 hover:border-[#0077ED] shadow-sm hover:shadow-[0_0_25px_rgba(0, 119, 237,0.45)]',
    hero:
      'bg-gradient-to-r from-[#0077ED] via-[#E52421] to-[#0077ED] bg-[length:200%_auto] hover:bg-right text-white border border-[#B8AF9F] shadow-[0_0_25px_rgba(0, 119, 237,0.5)] hover:shadow-[0_0_45px_rgba(0, 119, 237,0.85)]',
  }[variant];

  return (
    <div className="relative inline-flex group select-none">
      {/* Subtle Ambient Radial Glow on Hover */}
      <div 
        className="absolute -inset-1 bg-gradient-to-r from-[#0077ED] via-[#E52421] to-[#0077ED] rounded-sm blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" 
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
        className={`group relative overflow-hidden font-mono uppercase tracking-widest font-bold select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0077ED] focus:ring-offset-2 focus:ring-offset-[#0A0A0B] transition-all duration-300 ${sizeStyles} ${variantStyles} ${className}`}
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
