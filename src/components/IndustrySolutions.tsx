import React, { useState, useRef } from 'react';
import { MultiLogoIcon } from './MultiLogo';
import { PVCGrade, IndustrySolution } from '../types';
import { INDUSTRY_SOLUTIONS, PVC_GRADES } from '../data/products';
import { 
  Building2, 
  Snowflake, 
  Truck, 
  Cpu, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

interface IndustrySolutionsProps {
  onSelectGrade: (grade: PVCGrade) => void;
}

export const IndustrySolutions: React.FC<IndustrySolutionsProps> = ({ onSelectGrade }) => {
  const { t, language } = useLanguage();
  const [activeSolutionId, setActiveSolutionId] = useState<string>('cold-chain');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const activeSolution = INDUSTRY_SOLUTIONS.find((s) => s.id === activeSolutionId) || INDUSTRY_SOLUTIONS[0];
  const recommendedGradeInfo = PVC_GRADES[activeSolution.recommendedGrade];

  const getIndustryIcon = (name: string) => {
    switch (name) {
      case 'Snowflake': return <Snowflake className="w-4 h-4" />;
      case 'Truck': return <Truck className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
      default: return <Building2 className="w-4 h-4" />;
    }
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % INDUSTRY_SOLUTIONS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + INDUSTRY_SOLUTIONS.length) % INDUSTRY_SOLUTIONS.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = INDUSTRY_SOLUTIONS.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    const nextItem = INDUSTRY_SOLUTIONS[nextIndex];
    setActiveSolutionId(nextItem.id);
    const targetBtn = tabButtonsRef.current[nextIndex];
    targetBtn?.focus();
    targetBtn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="solutions" className="relative py-24 bg-[#F8F6F0] text-[#1E293B] border-t border-[#E2DDD2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <MultiLogoIcon size={18} className="w-4.5 h-4.5" />
            <span className="text-[#0077ED] text-xs font-mono tracking-widest uppercase font-bold">
              {t.solutions.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F172A] uppercase font-display mb-4">
            {t.solutions.title}
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-light">
            {t.solutions.subtitle}
          </p>
        </motion.div>

        {/* Industry Selector Tabs with Horizontal Scroll Controls & Keyboard Support */}
        <div className="relative mb-8">
          <div 
            ref={tabsContainerRef}
            role="tablist"
            aria-label="Industry Sector Solutions"
            className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-3 px-1 scrollbar-none focus:outline-none"
            tabIndex={0}
            onKeyDown={(e) => {
              const activeIndex = INDUSTRY_SOLUTIONS.findIndex(s => s.id === activeSolutionId);
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                handleTabKeyDown(e, activeIndex >= 0 ? activeIndex : 0);
              }
            }}
          >
            {INDUSTRY_SOLUTIONS.map((item, idx) => {
              const isActive = activeSolutionId === item.id;
              return (
                <button
                  key={item.id}
                  ref={(el) => { tabButtonsRef.current[idx] = el; }}
                  role="tab"
                  id={`sector-tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls={`sector-panel-${item.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  onClick={() => setActiveSolutionId(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap border cursor-pointer ${
                    isActive
                      ? 'bg-white text-black border-white shadow-xl'
                      : 'bg-[#FAF8F5] text-[#475569] border-[#E2DDD2] hover:text-[#0077ED] hover:border-[#B8AF9F]'
                  }`}
                >
                  <span className={isActive ? 'text-[#0077ED]' : 'text-[#64748B]'}>
                    {getIndustryIcon(item.iconName)}
                  </span>
                  <span>{item.title.split('&')[0]}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] mt-1 px-1 lg:hidden">
            <button
              onClick={() => scrollTabs('left')}
              className="flex items-center gap-1 hover:text-[#0077ED] transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Scroll left</span>
            </button>
            <button
              onClick={() => scrollTabs('right')}
              className="flex items-center gap-1 hover:text-[#0077ED] transition-colors"
            >
              <span>Scroll right</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Selected Solution Presentation Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSolution.id}
            id={`sector-panel-${activeSolution.id}`}
            role="tabpanel"
            aria-labelledby={`sector-tab-${activeSolution.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="bg-[#FFFFFF] border border-[#E2DDD2] p-6 sm:p-8 lg:p-10 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Solution Detail & Engineering (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#0077ED]">{getIndustryIcon(activeSolution.iconName)}</span>
                    <span className="text-xs font-mono text-[#0077ED] uppercase tracking-widest font-bold">
                      [ {activeSolution.subtitle} ]
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] uppercase font-display mb-3">
                    {activeSolution.title}
                  </h3>
                </div>

                {/* Challenge & Solution Callouts */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="bg-red-950/20 border-l-2 border-red-500 p-3.5 text-[#334155] font-light leading-relaxed">
                    <strong className="text-red-400 font-mono uppercase block text-[11px] mb-1 font-bold">
                      {t.solutions.challenge}:
                    </strong>
                    {activeSolution.challenge}
                  </div>

                  <div className="bg-emerald-950/20 border-l-2 border-emerald-500 p-3.5 text-[#334155] font-light leading-relaxed">
                    <strong className="text-emerald-400 font-mono uppercase block text-[11px] mb-1 font-bold">
                      {t.solutions.solution}:
                    </strong>
                    {activeSolution.solution}
                  </div>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {activeSolution.kpis.map((kpi, i) => (
                    <div key={i} className="bg-[#FAF8F5] p-3 border border-[#E2DDD2] text-center rounded-lg shadow-xs">
                      <div className="text-[10px] text-[#0077ED] uppercase font-mono font-bold tracking-wider">{kpi.label}</div>
                      <div className="text-base sm:text-lg font-bold font-mono text-[#0F172A] mt-0.5">{kpi.value}</div>
                      <div className="text-[9.5px] text-[#475569] font-mono mt-0.5">{kpi.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Recommended Material Grade & Direct Action (5 Cols) */}
              <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E2DDD2] p-6 space-y-5">
                <div className="border-b border-[#E2DDD2] pb-4">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#0077ED] mb-1 font-bold">
                    [ {t.solutions.recommended} ]
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: recommendedGradeInfo?.colorHex }}
                    />
                    <h4 className="text-lg font-bold text-[#0F172A] font-mono uppercase">
                      {recommendedGradeInfo?.name}
                    </h4>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono text-[#475569]">
                  <div className="text-[#64748B] uppercase text-[10px]">[ {t.solutions.keyBenefits} ]:</div>
                  {activeSolution.keyBenefits.map((ben, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0077ED] flex-shrink-0" />
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectGrade(activeSolution.recommendedGrade)}
                    className="w-full py-3.5 px-4 bg-[#0077ED] hover:bg-[#2B8EFF] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0077ED]/20 cursor-pointer"
                  >
                    <span>{t.solutions.configureSolution}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
