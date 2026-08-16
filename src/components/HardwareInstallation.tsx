import React, { useState, useRef } from 'react';
import { MultiLogoIcon } from './MultiLogo';
import { 
  Wrench, 
  Layers, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  HelpCircle, 
  FileText, 
  Hammer, 
  Shield, 
  Clock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export const HardwareInstallation: React.FC = () => {
  const { t, language } = useLanguage();
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

  const current = STEPS[activeStep - 1];
  const Icon = current.icon;

  return (
    <section id="installation" className="relative py-24 bg-[#0A0A0B] text-[#E0E0E0] border-t border-white/10 overflow-hidden">
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
            <span className="text-[#F27D26] text-xs font-mono tracking-widest uppercase font-bold">
              {t.hardwareSection.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-display mb-4">
            {t.hardwareSection.title}
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
            {t.hardwareSection.subtitle}
          </p>
        </motion.div>

        {/* 4-Step Process Bar with Keyboard Navigation */}
        <div 
          role="tablist"
          aria-label="Installation Steps"
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8"
        >
          {STEPS.map((s, idx) => {
            const isActive = activeStep === s.step;
            return (
              <button
                key={s.step}
                ref={(el) => (stepButtonsRef.current[idx] = el)}
                role="tab"
                id={`install-step-tab-${s.step}`}
                aria-selected={isActive}
                aria-controls={`install-step-panel-${s.step}`}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(e) => handleStepKeyDown(e, idx)}
                onClick={() => setActiveStep(s.step)}
                className={`p-4 text-left border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1E24] border-[#F27D26] text-white shadow-xl ring-1 ring-[#F27D26]'
                    : 'bg-[#0F1012] border-white/10 hover:border-white/30 text-white/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-7 h-7 flex items-center justify-center text-xs font-mono font-bold ${
                    isActive ? 'bg-white text-black' : 'bg-white/10 text-white/60'
                  }`}>
                    0{s.step}
                  </div>
                  <span className="text-[10px] font-mono text-white/40 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#F27D26]" />
                    {s.time}
                  </span>
                </div>
                <div className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-white/70'}`}>
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
            transition={{ duration: 0.35 }}
            className="bg-[#121316] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Step Description */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/5 border border-white/10 text-[#F27D26]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-[#F27D26] tracking-widest font-bold">
                      [ STEP 0{activeStep} OF 04 ]
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-display">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                  {current.desc}
                </p>

                <div className="bg-black/40 border-l-2 border-[#F27D26] p-4 text-xs font-mono text-white/70">
                  <strong className="text-[#F27D26] block uppercase mb-1 font-bold">
                    [ {t.hardwareSection.tips} ]:
                  </strong>
                  {current.tips}
                </div>
              </div>

              {/* Step Graphic / CAD Blueprint Diagram */}
              <div className="lg:col-span-5 bg-black/60 border border-white/10 p-6 flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#1C1E24] border border-[#F27D26]/40 flex items-center justify-center mb-4 text-[#F27D26]">
                  <Icon className="w-10 h-10" />
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/50 mb-1">
                  CAD BLUEPRINT • SPECIFICATION #SS304
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {current.short}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
