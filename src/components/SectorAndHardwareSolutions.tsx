import React, { useState, useRef, useEffect } from 'react';
import { MultiLogoIcon } from './MultiLogo';
import { PVCGrade } from '../types';
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
  ChevronLeft,
  ChevronRight,
  Hammer,
  Wrench,
  Layers,
  Clock,
  Sliders,
  FileText,
  Sparkles,
  Download,
  HelpCircle,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export interface SectorAndHardwareSolutionsProps {
  initialView?: 'solutions' | 'hardware';
  onSelectGrade?: (grade: PVCGrade) => void;
  onOpenConfigurator?: () => void;
  onOpenSampleModal?: (grade?: PVCGrade) => void;
}

export const SectorAndHardwareSolutions: React.FC<SectorAndHardwareSolutionsProps> = ({
  initialView = 'solutions',
  onSelectGrade,
  onOpenConfigurator,
  onOpenSampleModal
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'solutions' | 'hardware'>(initialView);

  // Sync if initialView prop changes
  useEffect(() => {
    setActiveTab(initialView);
  }, [initialView]);

  // Sector Solutions State
  const [activeSolutionId, setActiveSolutionId] = useState<string>('cold-chain');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const activeSolution = INDUSTRY_SOLUTIONS.find((s) => s.id === activeSolutionId) || INDUSTRY_SOLUTIONS[0];
  const recommendedGradeInfo = PVC_GRADES[activeSolution.recommendedGrade];

  // Hardware Installation State
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeOverlapVisual, setActiveOverlapVisual] = useState<number>(50);
  const stepButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const STEPS = [
    {
      step: 1,
      title: 'Mounting the Stainless Steel Hook-On Rail',
      short: t.hardwareSection.step1,
      desc: t.hardwareSection.step1Desc,
      tips: 'Ensure the track is perfectly plumb and level. For face-of-wall mounting, allow 50-100mm rail overhang on both sides for maximum wind sealing.',
      icon: Hammer,
      time: '10 Mins'
    },
    {
      step: 2,
      title: 'Riveting the Stainless Top Clamp Plates',
      short: t.hardwareSection.step2,
      desc: t.hardwareSection.step2Desc,
      tips: 'Multi Enterprise can deliver all strips pre-punched and pre-clamped from the factory ready to hang immediately.',
      icon: Wrench,
      time: '15 Mins'
    },
    {
      step: 3,
      title: 'Hanging the Strips with Selected Overlap',
      short: t.hardwareSection.step3,
      desc: t.hardwareSection.step3Desc,
      tips: 'Alternating strip curvature (concave vs convex) creates a natural interlocking seal that resists drafts.',
      icon: Layers,
      time: '10 Mins'
    },
    {
      step: 4,
      title: 'Floor Clearance Check & Trimming',
      short: t.hardwareSection.step4,
      desc: t.hardwareSection.step4Desc,
      tips: 'Leaving a 5-10mm floor gap prevents strips from dragging under forklift wheels while maintaining a strong air seal.',
      icon: CheckCircle2,
      time: '5 Mins'
    }
  ];

  const currentStep = STEPS[activeStep - 1];
  const StepIcon = currentStep.icon;

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

  const handleSolutionTabKeyDown = (e: React.KeyboardEvent, index: number) => {
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

  const handleStepKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % STEPS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + STEPS.length) % STEPS.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = STEPS.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveStep(STEPS[nextIndex].step);
    stepButtonsRef.current[nextIndex]?.focus();
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="sector-hardware" 
      className="relative py-20 bg-[#F8F6F0] text-[#1E293B] border-t border-[#E2DDD2] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unified Master Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <MultiLogoIcon size={18} className="w-4.5 h-4.5" />
            <span className="text-[#0077ED] text-xs font-mono tracking-widest uppercase font-bold">
              [ INTEGRATED APPLICATION &amp; HARDWARE ENGINEERING ]
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F172A] uppercase font-display mb-3">
            {language === 'hi' ? 'उद्योग समाधान एवं सस्पेंशन हार्डवेयर' : 'SECTOR SOLUTIONS & MOUNTING SYSTEMS'}
          </h2>
          
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-light max-w-2xl mx-auto">
            {language === 'hi' 
              ? 'कोल्ड स्टोरेज, वेयरहाउस व क्लीनरूम के लिए विशेष पीवीसी ग्रेड्स और टूल-लेस एसएस304 हुक-ऑन सस्पेंशन की संपूर्ण गाइड।'
              : 'Complete technical matrix of certified PVC barrier grades tailored for cold chains, cleanrooms, warehouses, and industrial suspension hardware.'}
          </p>

          {/* Master View Switcher Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 bg-[#FAF8F5] p-1.5 rounded-2xl border border-[#D8D2C5] shadow-lg w-fit mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('solutions')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'solutions'
                  ? 'bg-[#0077ED] text-white shadow-md shadow-[#0077ED]/25'
                  : 'text-[#475569] hover:text-[#0077ED] hover:bg-[#F4EFE6]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{language === 'hi' ? '1. उद्योग समाधान (Sector Matrix)' : '1. Industry Sector Matrix'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('hardware')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'hardware'
                  ? 'bg-[#0077ED] text-white shadow-md shadow-[#0077ED]/25'
                  : 'text-[#475569] hover:text-[#0077ED] hover:bg-[#F4EFE6]'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>{language === 'hi' ? '2. सस्पेंशन हार्डवेयर एवं असेंबली' : '2. Suspension Hardware & Guide'}</span>
            </button>
          </div>
        </motion.div>

        {/* View 1: Sector Solutions */}
        {activeTab === 'solutions' && (
          <motion.div
            key="solutions-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {/* Industry Selector Responsive Grid (Zero Scrolling Required) */}
            <div 
              role="tablist"
              aria-label="Industry Solutions"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8"
            >
              {INDUSTRY_SOLUTIONS.map((sol, idx) => {
                const isActive = activeSolutionId === sol.id;
                return (
                  <button
                    key={sol.id}
                    ref={(el) => { tabButtonsRef.current[idx] = el; }}
                    role="tab"
                    id={`sol-tab-${sol.id}`}
                    aria-selected={isActive}
                    aria-controls={`sol-panel-${sol.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onKeyDown={(e) => handleSolutionTabKeyDown(e, idx)}
                    onClick={() => setActiveSolutionId(sol.id)}
                    className={`flex flex-col items-start justify-between p-3 border rounded-xl transition-all cursor-pointer text-left min-h-[74px] ${
                      isActive
                        ? 'bg-[#0077ED] text-white border-[#0077ED] shadow-md shadow-[#0077ED]/25 ring-2 ring-[#0077ED]/20'
                        : 'bg-[#FAF8F5] border-[#E2DDD2] text-[#475569] hover:border-[#0077ED]/50 hover:text-[#0077ED] hover:bg-[#FFFFFF]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <span className={`${isActive ? 'text-white' : 'text-[#0077ED]'}`}>
                        {getIndustryIcon(sol.iconName)}
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#EAE5DA] text-[#64748B]'
                      }`}>
                        0{idx + 1}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-bold leading-snug">
                      {sol.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Solution Deep Technical Card Stage */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSolution.id}
                id={`sol-panel-${activeSolution.id}`}
                role="tabpanel"
                aria-labelledby={`sol-tab-${activeSolution.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#FFFFFF] border border-[#E2DDD2] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Solution Detail (7 Cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0077ED]">
                          [ {activeSolution.subtitle} ]
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] uppercase font-display mb-3">
                        {activeSolution.title}
                      </h3>
                    </div>

                    {/* Challenge & Solution Callouts */}
                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="bg-red-950/15 border-l-3 border-red-500 p-4 text-[#334155] rounded-r-xl font-light leading-relaxed">
                        <strong className="text-red-500 font-mono uppercase block text-[11px] mb-1 font-bold">
                          {t.solutions.challenge}:
                        </strong>
                        {activeSolution.challenge}
                      </div>

                      <div className="bg-emerald-950/15 border-l-3 border-emerald-500 p-4 text-[#334155] rounded-r-xl font-light leading-relaxed">
                        <strong className="text-emerald-600 font-mono uppercase block text-[11px] mb-1 font-bold">
                          {t.solutions.solution}:
                        </strong>
                        {activeSolution.solution}
                      </div>
                    </div>

                    {/* 3 KPI Metric Cards */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {activeSolution.kpis.map((kpi, i) => (
                        <div key={i} className="bg-[#FAF8F5] p-3.5 border border-[#E2DDD2] text-center rounded-xl shadow-xs">
                          <div className="text-[10px] text-[#0077ED] uppercase font-mono font-bold tracking-wider">{kpi.label}</div>
                          <div className="text-base sm:text-lg font-bold font-mono text-[#0F172A] mt-0.5">{kpi.value}</div>
                          <div className="text-[9.5px] text-[#475569] font-mono mt-0.5">{kpi.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Recommended Material Grade & Actions (5 Cols) */}
                  <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E2DDD2] p-6 rounded-2xl space-y-5 flex flex-col justify-between">
                    <div>
                      <div className="border-b border-[#E2DDD2] pb-4">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#0077ED] mb-1.5 font-bold">
                          [ {t.solutions.recommended} ]
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-4 h-4 rounded-full border border-[#D8D2C5] shadow-xs"
                            style={{ backgroundColor: recommendedGradeInfo?.colorHex }}
                          />
                          <h4 className="text-lg font-bold text-[#0F172A] font-mono uppercase">
                            {recommendedGradeInfo?.name}
                          </h4>
                        </div>
                      </div>

                      <div className="space-y-2.5 text-xs font-mono text-[#475569] mt-4">
                        <div className="text-[#64748B] uppercase text-[10px] font-bold">[ {t.solutions.keyBenefits} ]:</div>
                        {activeSolution.keyBenefits.map((ben, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0077ED] flex-shrink-0" />
                            <span>{ben}</span>
                          </div>
                        ))}
                      </div>

                      {/* Recommended Hardware Link */}
                      <div className="mt-4 p-3 bg-[#FFFFFF] border border-[#E2DDD2] rounded-xl flex items-center justify-between text-xs font-mono">
                        <div>
                          <span className="text-[9px] uppercase text-[#64748B] block font-bold">Recommended Suspension:</span>
                          <strong className="text-[#0F172A]">AISI 304 Hook-On Rail Track</strong>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTab('hardware')}
                          className="px-2.5 py-1 bg-[#0077ED]/10 text-[#0077ED] hover:bg-[#0077ED] hover:text-white rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          View Hardware &rarr;
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-[#E2DDD2]">
                      <button
                        type="button"
                        onClick={() => {
                          if (onSelectGrade) onSelectGrade(activeSolution.recommendedGrade);
                          if (onOpenConfigurator) onOpenConfigurator();
                        }}
                        className="w-full py-3 px-4 bg-[#0077ED] hover:bg-[#2B8EFF] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#0077ED]/25 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{t.solutions.configureSolution}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenSampleModal && onOpenSampleModal(activeSolution.recommendedGrade)}
                        className="w-full py-2.5 px-4 bg-[#FFFFFF] hover:bg-[#F4EFE6] text-[#0F172A] border border-[#D8D2C5] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
                      >
                        <span>Request {recommendedGradeInfo?.name} Swatch</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* View 2: Hardware & 4-Step Installation */}
        {activeTab === 'hardware' && (
          <motion.div
            key="hardware-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {/* 4-Step Process Bar with Keyboard Navigation */}
            <div 
              role="tablist"
              aria-label="Installation Steps"
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
            >
              {STEPS.map((s, idx) => {
                const isActive = activeStep === s.step;
                return (
                  <button
                    key={s.step}
                    ref={(el) => { stepButtonsRef.current[idx] = el; }}
                    role="tab"
                    id={`install-step-tab-${s.step}`}
                    aria-selected={isActive}
                    aria-controls={`install-step-panel-${s.step}`}
                    tabIndex={isActive ? 0 : -1}
                    onKeyDown={(e) => handleStepKeyDown(e, idx)}
                    onClick={() => setActiveStep(s.step)}
                    className={`p-4 text-left border-2 transition-all cursor-pointer rounded-2xl ${
                      isActive
                        ? 'bg-[#FFFFFF] border-[#0077ED] shadow-[0_4px_25px_rgba(0,119,237,0.18)] ring-2 ring-[#0077ED]/20'
                        : 'bg-[#FAF8F5] border-[#E2DDD2] hover:border-[#0077ED]/40 text-[#475569]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                        isActive ? 'bg-[#0077ED] text-white shadow-sm' : 'bg-[#EAE5DA] text-[#475569]'
                      }`}>
                        0{s.step}
                      </div>
                      <span className={`text-[10px] font-mono flex items-center gap-1 font-semibold ${
                        isActive ? 'text-[#0077ED]' : 'text-[#64748B]'
                      }`}>
                        <Clock className="w-3 h-3 text-[#0077ED]" />
                        {s.time}
                      </span>
                    </div>
                    <div className={`text-xs font-bold uppercase tracking-wider font-mono ${
                      isActive ? 'text-[#0077ED]' : 'text-[#475569]'
                    }`}>
                      {s.short}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step Visualizer Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                id={`install-step-panel-${activeStep}`}
                role="tabpanel"
                aria-labelledby={`install-step-tab-${activeStep}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#FFFFFF] border border-[#E2DDD2] rounded-2xl p-6 sm:p-8 shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Step Instructions */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-[#0077ED]/10 border border-[#0077ED]/30 text-[#0077ED] rounded-lg">
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <span className="text-[#0077ED] text-xs font-mono font-bold uppercase tracking-wider">
                          [ Step 0{currentStep.step} of 04 ]
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] uppercase font-display">
                        {currentStep.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-light">
                      {currentStep.desc}
                    </p>

                    {/* Pro Engineering Tips Box */}
                    <div className="bg-[#FAF8F5] border-l-3 border-[#0077ED] p-4 text-xs font-mono text-[#334155] rounded-r-xl">
                      <div className="text-[10px] uppercase font-bold text-[#0077ED] mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#0077ED]" />
                        <span>Multi Enterprise Engineering Rule:</span>
                      </div>
                      <p className="leading-relaxed">{currentStep.tips}</p>
                    </div>

                    {/* Overlap Calibration Interactive Visualizer (For Step 3) */}
                    {activeStep === 3 && (
                      <div className="bg-[#FAF8F5] p-4 border border-[#E2DDD2] rounded-xl space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-[#0F172A]">Strip Overlap Calibration:</span>
                          <span className="text-[#0077ED] font-bold">{activeOverlapVisual}% (2 Hook Rows)</span>
                        </div>
                        <div className="flex gap-2">
                          {[33, 50, 66, 100].map((ov) => (
                            <button
                              key={ov}
                              type="button"
                              onClick={() => setActiveOverlapVisual(ov)}
                              className={`flex-1 py-1.5 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                                activeOverlapVisual === ov
                                  ? 'bg-[#0077ED] text-white shadow-sm'
                                  : 'bg-[#FFFFFF] border border-[#D8D2C5] text-[#475569] hover:bg-[#F4EFE6]'
                              }`}
                            >
                              {ov}%
                            </button>
                          ))}
                        </div>
                        <p className="text-[10px] font-mono text-[#64748B]">
                          {activeOverlapVisual === 100 
                            ? 'Max protection: Recommended for deep freezers (-40°C) and extreme wind.' 
                            : activeOverlapVisual >= 50 
                            ? 'Standard industrial: Balances thermal insulation and ease of pedestrian pass-through.' 
                            : 'Light duty: Low traffic warehouse divider.'}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveStep((prev) => (prev % 4) + 1)}
                        className="px-5 py-2.5 bg-[#0077ED] hover:bg-[#2B8EFF] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#0077ED]/25 flex items-center gap-2 cursor-pointer"
                      >
                        <span>Next Step (0{(activeStep % 4) + 1})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('solutions')}
                        className="px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#0F172A] border border-[#D8D2C5] text-xs font-mono font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        <span>&larr; View Industry Solutions</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: High Precision Hardware Diagram Illustration */}
                  <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E2DDD2] p-6 rounded-2xl flex flex-col items-center justify-center text-center relative">
                    <div className="w-20 h-20 rounded-full bg-[#0077ED]/10 border border-[#0077ED]/30 flex items-center justify-center text-[#0077ED] mb-4 shadow-inner">
                      <StepIcon className="w-10 h-10" />
                    </div>

                    <div className="text-sm font-bold text-[#0F172A] font-mono uppercase tracking-wider mb-1">
                      {activeStep === 1 && 'Stainless Steel 304 Hook Rail'}
                      {activeStep === 2 && 'Stainless Top Clamp Plate Pair'}
                      {activeStep === 3 && 'Double-Sided Interlocking Strip Hang'}
                      {activeStep === 4 && '5-10mm Precision Ground Clearance'}
                    </div>

                    <div className="text-xs font-mono text-[#64748B] max-w-xs mb-4">
                      {activeStep === 1 && 'Heavy-duty 1.5mm thickness AISI 304 grade rail with CNC laser-formed hanging teeth.'}
                      {activeStep === 2 && 'Pre-riveted with semi-tubular rivets ensuring zero strip tear under forklift pulls.'}
                      {activeStep === 3 && 'Strips naturally interlock concave-to-convex for continuous 94% air draft barrier.'}
                      {activeStep === 4 && 'Prevents friction drag against moving vehicles and pallets for 3x longer life.'}
                    </div>

                    <div className="grid grid-cols-2 gap-2 w-full text-[10px] font-mono text-[#334155] border-t border-[#E2DDD2] pt-3">
                      <div className="p-2 bg-[#FFFFFF] border border-[#EAE5DA] rounded-lg">
                        <span className="text-[#64748B] block">Material:</span>
                        <strong className="text-[#0F172A]">AISI 304 Stainless</strong>
                      </div>
                      <div className="p-2 bg-[#FFFFFF] border border-[#EAE5DA] rounded-lg">
                        <span className="text-[#64748B] block">Tool Requirement:</span>
                        <strong className="text-[#0F172A]">Tool-less Hook-On</strong>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
};
