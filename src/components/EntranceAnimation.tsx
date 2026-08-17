import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MultiLogoIcon } from './MultiLogo';
import { Sparkles, ShieldCheck, Zap, ArrowRight, Layers } from 'lucide-react';

interface EntranceAnimationProps {
  onComplete: () => void;
}

export const EntranceAnimation: React.FC<EntranceAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('CALIBRATING POLYMER PARAMETERS...');

  useEffect(() => {
    const statuses = [
      'INITIALIZING MULTI ENTERPRISE CAD ENGINE...',
      'CALIBRATING 100% VIRGIN PVC POLYMER COMPOUND...',
      'LOADING ISO 9001:2015 CERTIFIED SPECIFICATIONS...',
      'PREPARING 3D THERMAL & CFD AIRFLOW SIMULATOR...',
      'WELCOME TO MULTI ENTERPRISE • EST. 1998'
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 18) + 12;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 350);
          return 100;
        }

        const statusIdx = Math.min(
          Math.floor((next / 100) * statuses.length),
          statuses.length - 1
        );
        setStatusText(statuses[statusIdx]);
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8F6F0] text-[#0F172A] overflow-hidden select-none"
    >
      {/* Precision Blueprint Grid & Futuristic Laser Lines */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial Ambient Glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#0077ED]/15 blur-[120px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      {/* Cyber Corner Frame Accents */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#0077ED]/60" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#0077ED]/60" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#0077ED]/60" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#0077ED]/60" />

      <div className="relative z-10 max-w-md w-full px-6 flex flex-col items-center text-center">
        {/* Animated Brand Geometric Icon */}
        <motion.div
          initial={{ scale: 0.8, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-6"
        >
          {/* Pulsing Aura Rings */}
          <div className="absolute -inset-4 rounded-3xl bg-[#0077ED]/20 blur-xl animate-pulse" />
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#1A1C23] to-[#0D0E12] border border-[#0077ED]/40 flex items-center justify-center shadow-2xl relative">
            <MultiLogoIcon size={56} className="w-14 h-14 filter drop-shadow-[0_0_16px_rgba(0, 119, 237,0.8)]" />
            
            {/* Hologram Corner Pointers */}
            <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-[#0077ED] rounded-full" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#0077ED] rounded-full" />
            <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-[#0077ED] rounded-full" />
            <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-[#0077ED] rounded-full" />
          </div>
        </motion.div>

        {/* Brand Typography */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-1 mb-8"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#0077ED] uppercase font-bold">
              MULTI ENTERPRISE
            </span>
            <span className="text-[10px] font-mono text-[#64748B] border border-[#CFC8BA] px-1.5 py-0.5 rounded">
              EST. 1998
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0F172A] font-display">
            YOUR ONE STOP SOLUTION
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] font-mono">
            High-Quality • Certified PVC Strip Curtains & Facility Range
          </p>
        </motion.div>

        {/* Progress Bar & Telemetry */}
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#475569]">
            <span className="text-[#0077ED] font-bold truncate max-w-[260px] text-left">
              &gt; {statusText}
            </span>
            <span className="font-bold text-white tabular-nums">
              {progress}%
            </span>
          </div>

          {/* High-Tech Segmented Progress Track */}
          <div className="w-full h-2 rounded-full bg-[#F4EFE6] p-0.5 border border-[#D8D2C5] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#0077ED] via-amber-400 to-[#0077ED] shadow-[0_0_12px_rgba(0, 119, 237,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              ISO 9001:2015 &amp; CE
            </span>
            <span>AHMEDABAD • NATIONWIDE</span>
          </div>
        </div>

        {/* Quick Skip Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          type="button"
          onClick={onComplete}
          className="mt-8 px-4 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#F4EFE6] border border-[#D8D2C5] text-xs font-mono text-[#475569] hover:text-[#0077ED] transition-colors cursor-pointer flex items-center gap-1.5 group"
        >
          <span>Skip Entrance</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};
