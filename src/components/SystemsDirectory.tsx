import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { FocusedSectionId } from './FocusedSectionView';
import { 
  Sliders, 
  Layers, 
  Zap, 
  Sparkles, 
  Package, 
  Award, 
  ArrowRight,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface SystemsDirectoryProps {
  onSelectSection: (sectionId: FocusedSectionId) => void;
}

export const SystemsDirectory: React.FC<SystemsDirectoryProps> = ({ onSelectSection }) => {
  const { t, language } = useLanguage();

  const systems: {
    id: FocusedSectionId;
    num: string;
    label: string;
    desc: string;
    icon: React.ElementType;
    badge: string;
    techSpec: string;
  }[] = [
    {
      id: 'configurator',
      num: '01',
      label: t.nav.configurator,
      desc: t.nav.configuratorDesc,
      icon: Sliders,
      badge: 'CAD Engine',
      techSpec: 'Live 3D Spec & BOM'
    },
    {
      id: 'products',
      num: '02',
      label: t.nav.pvcGrades,
      desc: t.nav.pvcGradesDesc,
      icon: Layers,
      badge: '6 Polymers',
      techSpec: '100% Virgin Compound'
    },
    {
      id: 'roi-calculator',
      num: '03',
      label: t.nav.thermalRoi,
      desc: t.nav.thermalRoiDesc,
      icon: Zap,
      badge: 'HVAC Physics',
      techSpec: 'Thermal Infiltration'
    },
    {
      id: 'solutions',
      num: '04',
      label: t.nav.solutions,
      desc: t.nav.solutionsDesc,
      icon: Sparkles,
      badge: 'Applications',
      techSpec: 'Cold Chain & Heavy Duty'
    },
    {
      id: 'installation',
      num: '05',
      label: t.nav.hardware,
      desc: t.nav.hardwareDesc,
      icon: Package,
      badge: 'SS304 Track',
      techSpec: 'Tool-Less Hook System'
    },
    {
      id: 'quality',
      num: '06',
      label: t.nav.quality,
      desc: t.nav.qualityDesc,
      icon: Award,
      badge: 'Knowledge Base',
      techSpec: 'Engineering FAQs'
    }
  ];

  return (
    <section id="directory" className="relative py-20 bg-[#070709] border-t border-white/10 text-[#E0E0E0] overflow-hidden">
      {/* Background Architectural Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F27D26] animate-pulse" />
              <span className="text-[#F27D26] text-xs font-mono tracking-widest uppercase font-bold">
                {t.nav.directory}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-display">
              {language === 'hi' ? 'औद्योगिक प्रणाली निर्देशिका' : 'Industrial Systems Directory'}
            </h2>
          </div>
          <div className="text-xs font-mono text-white/50 max-w-md">
            {language === 'hi' 
              ? 'किसी भी समर्पित अनुभाग को अलग से देखने और संचालित करने के लिए नीचे दिए गए मॉड्यूल पर क्लिक करें।'
              : 'Click any operational module below to launch its isolated focused engineering viewport.'}
          </div>
        </div>

        {/* 6 Directory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {systems.map((sys, idx) => {
            const Icon = sys.icon;
            return (
              <motion.div
                key={sys.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => onSelectSection(sys.id)}
                  className="w-full text-left bg-[#0E0F12] hover:bg-[#14161C] border border-white/10 hover:border-[#F27D26] p-6 rounded-xl transition-all duration-300 group relative overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(242,125,38,0.25)] cursor-pointer flex flex-col justify-between min-h-[220px]"
                >
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between gap-2 mb-4 w-full">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-[#F27D26] px-2 py-0.5 bg-[#F27D26]/10 border border-[#F27D26]/30 rounded">
                        {sys.num}
                      </span>
                      <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                        {sys.techSpec}
                      </span>
                    </div>

                    <span className="text-[9px] px-2 py-0.5 bg-white/5 text-white/70 border border-white/10 rounded font-mono uppercase">
                      {sys.badge}
                    </span>
                  </div>

                  {/* Middle Content */}
                  <div className="my-auto space-y-1.5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 group-hover:bg-[#F27D26] rounded-lg transition-colors">
                        <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-white font-display uppercase tracking-tight group-hover:text-[#F27D26] transition-colors">
                        {sys.label}
                      </h3>
                    </div>
                    <p className="text-xs text-white/55 font-light leading-relaxed pl-1">
                      {sys.desc}
                    </p>
                  </div>

                  {/* Bottom Action Footer with Animated Arrow */}
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between w-full">
                    <span className="text-[11px] font-mono text-white/40 group-hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1.5">
                      <Maximize2 className="w-3 h-3 text-[#F27D26]" />
                      <span>{language === 'hi' ? 'पूर्ण दृश्य खोलें' : 'Open Focused View'}</span>
                    </span>

                    <div className="w-7 h-7 rounded bg-white/5 group-hover:bg-[#F27D26] flex items-center justify-center transition-all group-hover:translate-x-1">
                      <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white" />
                    </div>
                  </div>

                  {/* Corner Accent Line */}
                  <div className="absolute top-0 right-0 w-16 h-1 bg-gradient-to-l from-[#F27D26] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
