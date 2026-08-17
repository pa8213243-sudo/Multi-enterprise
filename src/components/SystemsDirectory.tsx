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
    <section id="directory" className="relative py-20 bg-[#F8F6F0] border-t border-[#E2DDD2] text-[#1E293B] overflow-hidden">
      {/* Background Architectural Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#E2DDD2] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#0077ED] animate-pulse" />
              <span className="text-[#0077ED] text-xs font-mono tracking-widest uppercase font-bold">
                {t.nav.directory}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F172A] uppercase font-display">
              {language === 'hi' ? 'औद्योगिक प्रणाली निर्देशिका' : 'Industrial Systems Directory'}
            </h2>
          </div>
          <div className="text-xs font-mono text-[#64748B] max-w-md">
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
                  className="w-full text-left bg-[#FAF8F5] hover:bg-[#FAF8F5] border border-[#E2DDD2] hover:border-[#0077ED] p-6 rounded-xl transition-all duration-300 group relative overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(0, 119, 237,0.25)] cursor-pointer flex flex-col justify-between min-h-[220px]"
                >
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between gap-2 mb-4 w-full">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-[#0077ED] px-2 py-0.5 bg-[#0077ED]/10 border border-[#0077ED]/30 rounded">
                        {sys.num}
                      </span>
                      <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
                        {sys.techSpec}
                      </span>
                    </div>

                    <span className="text-[9px] px-2 py-0.5 bg-[#FAF8F5] text-[#475569] border border-[#E2DDD2] rounded font-mono uppercase">
                      {sys.badge}
                    </span>
                  </div>

                  {/* Middle Content */}
                  <div className="my-auto space-y-1.5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#FAF8F5] group-hover:bg-[#0077ED] rounded-lg transition-colors">
                        <Icon className="w-5 h-5 text-[#475569] group-hover:text-[#0077ED] transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0F172A] font-display uppercase tracking-tight group-hover:text-[#0077ED] transition-colors">
                        {sys.label}
                      </h3>
                    </div>
                    <p className="text-xs text-[#475569] font-light leading-relaxed pl-1">
                      {sys.desc}
                    </p>
                  </div>

                  {/* Bottom Action Footer with Animated Arrow */}
                  <div className="pt-4 mt-4 border-t border-[#E2DDD2] flex items-center justify-between w-full">
                    <span className="text-[11px] font-mono text-[#64748B] group-hover:text-[#0077ED] transition-colors uppercase tracking-wider flex items-center gap-1.5">
                      <Maximize2 className="w-3 h-3 text-[#0077ED]" />
                      <span>{language === 'hi' ? 'पूर्ण दृश्य खोलें' : 'Open Focused View'}</span>
                    </span>

                    <div className="w-7 h-7 rounded bg-[#FAF8F5] group-hover:bg-[#0077ED] flex items-center justify-center transition-all group-hover:translate-x-1">
                      <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#0077ED]" />
                    </div>
                  </div>

                  {/* Corner Accent Line */}
                  <div className="absolute top-0 right-0 w-16 h-1 bg-gradient-to-l from-[#0077ED] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
