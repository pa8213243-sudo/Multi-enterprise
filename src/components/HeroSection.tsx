import React, { useState, useRef } from 'react';
import { MultiLogo, MultiLogoIcon } from './MultiLogo';
import { QuoteCTAButton } from './QuoteCTAButton';
import { PVCGrade } from '../types';
import { PVC_GRADES } from '../data/products';
import { ThreeCurtainScene } from './ThreeCurtainScene';
import { 
  Sliders, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Award, 
  Package, 
  ThermometerSnowflake, 
  Truck, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroSectionProps {
  onOpenConfigurator: () => void;
  onOpenRoiCalculator: () => void;
  onOpenSampleModal: () => void;
  onOpenQuoteModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConfigurator,
  onOpenRoiCalculator,
  onOpenSampleModal,
  onOpenQuoteModal
}) => {
  const { t, language } = useLanguage();
  const [activeHeroGrade, setActiveHeroGrade] = useState<PVCGrade>('standard-clear');
  const [heroViewMode, setHeroViewMode] = useState<'realistic' | 'thermal' | 'airflow'>('realistic');

  const materialButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const gradeKeys = Object.keys(PVC_GRADES) as PVCGrade[];
  const activeGradeData = PVC_GRADES[activeHeroGrade] || PVC_GRADES['standard-clear'];

  const handleMaterialKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (index + 1) % gradeKeys.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (index - 1 + gradeKeys.length) % gradeKeys.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = gradeKeys.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveHeroGrade(gradeKeys[nextIndex]);
    materialButtonsRef.current[nextIndex]?.focus();
  };

  return (
    <section className="relative pt-24 sm:pt-28 pb-16 overflow-hidden bg-[#0A0A0B] text-[#E0E0E0]">
      {/* Precision Dot Matrix & Industrial Glow */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      />
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F27D26]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hero Navigation & Enterprise Identity Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-4"
        >
          {/* Integrated Multi Enterprise Company Logo */}
          <div className="flex items-center gap-3">
            <MultiLogo variant="hero" size={32} showEst={false} />
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/15 text-xs font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-[#F27D26] animate-pulse" />
              <span className="text-white/60 uppercase tracking-widest text-[10px]">
                {t.hero.factoryDirect}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[11px] font-mono uppercase tracking-widest text-white/50">
            <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10 text-white/70">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F27D26]" />
              100% VIRGIN PVC COMPOUND
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10 text-white/70">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-white" />
              -40°C TO +50°C RANGE
            </span>
          </div>
        </motion.div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content (5 Columns) with Staggered Entrance */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-center z-20 space-y-6"
          >
            <div className="space-y-3">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="text-[#F27D26] text-xs font-mono tracking-widest uppercase font-bold flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]" />
                <span>{t.hero.badge}</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tighter text-white uppercase font-display"
              >
                {t.hero.tagline1} <br />
                {t.hero.tagline2} <br />
                {t.hero.tagline3}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-white/60 text-sm sm:text-base max-w-md leading-relaxed font-light italic border-l-2 border-[#F27D26] pl-4 pt-1"
              >
                {t.hero.description}
              </motion.p>
            </div>

            {/* Value Checkpoints */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="grid grid-cols-2 gap-2 text-xs font-mono"
            >
              <div className="flex items-center gap-2 bg-white/5 p-2.5 border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F27D26] flex-shrink-0" />
                <span className="text-white/80">{t.hero.featureThermal}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2.5 border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F27D26] flex-shrink-0" />
                <span className="text-white/80">{t.hero.featureCold}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2.5 border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F27D26] flex-shrink-0" />
                <span className="text-white/80">{t.hero.featureFoodSafe}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2.5 border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F27D26] flex-shrink-0" />
                <span className="text-white/80">{t.hero.featureHook}</span>
              </div>
            </motion.div>

            {/* Action Buttons with Micro-Interactive 'Get a Quote' CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              {/* Primary Micro-interactive Get a Quote Button */}
              <QuoteCTAButton
                size="lg"
                variant="primary"
                onClick={onOpenQuoteModal || onOpenConfigurator}
                label={t.hero.getInstantQuote}
                icon={FileText}
                showSparkle={true}
                className="shadow-[0_0_20px_rgba(242,125,38,0.4)]"
              />

              <button
                onClick={onOpenConfigurator}
                className="px-5 sm:px-6 py-3.5 sm:py-4 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-[#F27D26] hover:text-white transition-all shadow-xl flex items-center gap-2 font-mono"
              >
                <span>{t.hero.configuratorBtn}</span>
                <Sliders className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenSampleModal}
                className="px-4 py-3.5 sm:py-4 border border-white/20 text-white/80 font-bold text-xs uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all flex items-center gap-2 font-mono"
              >
                <Package className="w-3.5 h-3.5 text-[#F27D26]" />
                <span>{t.hero.freeSwatchesBtn}</span>
              </button>
            </motion.div>

            {/* Key Telemetry Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10"
            >
              <div>
                <div className="text-xl sm:text-2xl font-mono text-white font-bold">{t.hero.statThermalVal}</div>
                <div className="text-[9px] uppercase tracking-widest text-white/40">{t.hero.statThermalLabel}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-mono text-white font-bold">{t.hero.statHeritageVal}</div>
                <div className="text-[9px] uppercase tracking-widest text-white/40">{t.hero.statHeritageLabel}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-mono text-[#F27D26] font-bold">{t.hero.statQualityVal}</div>
                <div className="text-[9px] uppercase tracking-widest text-white/40">{t.hero.statQualityLabel}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right 3D Interactive Canvas Showcase (7 Columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative bg-[#0F1012] border border-white/10 p-4 sm:p-6 shadow-2xl"
          >
            {/* 3D Scene Viewport */}
            <div className="relative">
              <ThreeCurtainScene
                grade={activeHeroGrade}
                viewMode={heroViewMode}
                onViewModeChange={setHeroViewMode}
                className="w-full h-[480px] sm:h-[540px] lg:h-[580px]"
              />

              {/* Architectural Label Tag */}
              <div className="absolute bottom-4 right-4 text-right pointer-events-none hidden sm:block bg-black/80 backdrop-blur-md p-3 border border-white/10">
                <div className="text-[10px] font-mono tracking-widest text-[#F27D26] mb-1">
                  SYSTEMS ARCHITECTURE
                </div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 space-y-0.5 font-mono">
                  <div>INDUSTRIAL DOORWAY FRAME v.02</div>
                  <div>TRANSLUCENT MATERIAL RENDER</div>
                  <div>VOLUMETRIC LIGHTING ACTIVE</div>
                </div>
              </div>
            </div>

            {/* Material Switcher Selector with Accessible Keyboard Support */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="text-[10px] font-mono text-white/50 uppercase mb-2 flex items-center justify-between">
                <span>{t.hero.materialFormula}</span>
                <span className="text-[#F27D26] font-bold">{activeGradeData.shortName}</span>
              </div>

              <div 
                role="radiogroup" 
                aria-label="Select Material Formula"
                className="grid grid-cols-3 sm:grid-cols-6 gap-2"
              >
                {gradeKeys.map((gKey, idx) => {
                  const g = PVC_GRADES[gKey];
                  const isCurrent = activeHeroGrade === g.id;
                  return (
                    <button
                      key={g.id}
                      ref={(el) => (materialButtonsRef.current[idx] = el)}
                      role="radio"
                      aria-checked={isCurrent}
                      tabIndex={isCurrent ? 0 : -1}
                      onKeyDown={(e) => handleMaterialKeyDown(e, idx)}
                      onClick={() => setActiveHeroGrade(g.id)}
                      className={`p-2 text-left border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#1C1E24] border-[#F27D26] text-white ring-1 ring-[#F27D26]'
                          : 'bg-[#121316] border-white/10 hover:border-white/30 text-white/60'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: g.colorHex }}
                        />
                        <span className="text-[10px] font-bold truncate">{g.shortName.split(' ')[0]}</span>
                      </div>
                      <div className="text-[9px] font-mono text-white/40 truncate">
                        {g.temperatureRange.min}°C
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
