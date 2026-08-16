import React, { useState, useRef } from 'react';
import { MultiLogoIcon } from './MultiLogo';
import { PVCGrade } from '../types';
import { PVC_GRADES, HARDWARE_SYSTEMS } from '../data/products';
import { 
  ShieldCheck, 
  Thermometer, 
  Layers, 
  FileDown, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Flame, 
  Zap, 
  Eye, 
  Package, 
  SlidersHorizontal,
  Wrench
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

interface ProductCatalogProps {
  onSelectForConfigurator: (grade: PVCGrade) => void;
  onOpenSampleModal: (grade: PVCGrade) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectForConfigurator,
  onOpenSampleModal
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'pvc-grades' | 'hardware-systems'>('pvc-grades');
  const [selectedGradeId, setSelectedGradeId] = useState<PVCGrade>('standard-clear');
  const gradeCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const gradesList = Object.values(PVC_GRADES);
  const activeGrade = PVC_GRADES[selectedGradeId] || PVC_GRADES['standard-clear'];

  const handleGradeKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      nextIndex = (index + 1) % gradesList.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + gradesList.length) % gradesList.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = gradesList.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setSelectedGradeId(gradesList[nextIndex].id);
    gradeCardsRef.current[nextIndex]?.focus();
  };

  return (
    <section id="products" className="relative py-24 bg-[#0A0A0B] text-[#E0E0E0] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <MultiLogoIcon size={18} className="w-4.5 h-4.5" />
              <span className="text-[#F27D26] text-xs font-mono tracking-widest uppercase font-bold">
                {t.products.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-display mb-4">
              {t.products.title}
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
              {t.products.subtitle}
            </p>
          </div>

          {/* Catalog View Mode Toggle */}
          <div 
            role="tablist"
            aria-label="Product Catalog Sections"
            className="flex items-center bg-[#0F1012] p-1 border border-white/10 self-start md:self-auto"
          >
            <button
              role="tab"
              id="tab-pvc-grades"
              aria-selected={activeTab === 'pvc-grades'}
              aria-controls="panel-pvc-grades"
              onClick={() => setActiveTab('pvc-grades')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === 'pvc-grades'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t.products.tabPvcGrades}</span>
            </button>
            <button
              role="tab"
              id="tab-hardware-systems"
              aria-selected={activeTab === 'hardware-systems'}
              aria-controls="panel-hardware-systems"
              onClick={() => setActiveTab('hardware-systems')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === 'hardware-systems'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>{t.products.tabHardware}</span>
            </button>
          </div>
        </motion.div>

        {/* Tab 1: PVC Grades with Deep Spec Sheet */}
        {activeTab === 'pvc-grades' && (
          <div 
            id="panel-pvc-grades"
            role="tabpanel"
            aria-labelledby="tab-pvc-grades"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Grade Selection Cards (5 Columns) with Keyboard Navigation */}
            <div 
              role="radiogroup"
              aria-label="Select PVC Grade"
              className="lg:col-span-5 space-y-3"
            >
              {gradesList.map((grade, idx) => {
                const isSelected = selectedGradeId === grade.id;
                return (
                  <motion.div
                    key={grade.id}
                    ref={(el) => (gradeCardsRef.current[idx] = el)}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    onKeyDown={(e) => handleGradeKeyDown(e, idx)}
                    onClick={() => setSelectedGradeId(grade.id)}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#F27D26] ${
                      isSelected
                        ? 'bg-[#1C1E24] border-[#F27D26] text-white shadow-xl ring-1 ring-[#F27D26]'
                        : 'bg-[#121316] border-white/10 hover:border-white/30 text-white/70'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Grade Roll Preview Thumbnail */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-black/60 border border-white/10 relative">
                        {grade.imageUrl ? (
                          <img
                            src={grade.imageUrl}
                            alt={grade.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div 
                            className="w-full h-full"
                            style={{ backgroundColor: grade.colorHex }}
                          />
                        )}
                        <div 
                          className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-black"
                          style={{ backgroundColor: grade.colorHex }}
                        />
                      </div>

                      {/* Grade Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono truncate">
                            {grade.name}
                          </h3>
                        </div>
                        <span className={`inline-block text-[9px] font-mono px-2 py-0.5 border rounded mb-1.5 ${grade.badgeColor}`}>
                          {grade.badge}
                        </span>
                        <p className="text-xs text-white/50 line-clamp-1 font-light">
                          {grade.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pt-2.5 mt-2.5 border-t border-white/10">
                      <span className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-[#F27D26]" />
                        {grade.temperatureRange.min}°C to {grade.temperatureRange.max}°C
                      </span>
                      <span className="text-[#F27D26] font-bold text-[10px]">
                        {isSelected ? 'ACTIVE SPEC →' : 'VIEW DETAILS'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Detailed Technical Spec Sheet (7 Columns) */}
            <div className="lg:col-span-7 bg-[#121316] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: activeGrade.colorHex }}
                    />
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-display">
                      {activeGrade.name}
                    </h3>
                  </div>
                  <p className="text-xs text-white/60 font-light">
                    {activeGrade.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenSampleModal(activeGrade.id)}
                    className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Package className="w-3.5 h-3.5 text-[#F27D26]" />
                    <span>{t.products.requestSample}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectForConfigurator(activeGrade.id)}
                    className="px-4 py-2 bg-[#F27D26] text-white hover:bg-[#d96615] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#F27D26]/20"
                  >
                    <span>{t.products.configureGrade}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Material Visual Display (Roll Photo + Real Installation Photo) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Roll & Swatch Photo */}
                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/60 group">
                  <div className="absolute top-2.5 left-2.5 z-10 bg-black/80 backdrop-blur-md px-2 py-0.5 border border-white/10 text-[9px] font-mono text-white/80 uppercase font-bold rounded">
                    Material Roll Specimen
                  </div>
                  <img
                    src={activeGrade.imageUrl || '/assets/Screenshot 2026-08-16 214504.png'}
                    alt={`${activeGrade.name} roll`}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-2.5 bg-[#0F1012] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
                    <span>100% Virgin Grade Polymer</span>
                    <span className="text-[#F27D26]">ASTM D638 / DIN 53387</span>
                  </div>
                </div>

                {/* Real Facility Installation Photo */}
                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/60 group">
                  <div className="absolute top-2.5 left-2.5 z-10 bg-black/80 backdrop-blur-md px-2 py-0.5 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 uppercase font-bold rounded">
                    ★ Real Industrial Installation
                  </div>
                  <img
                    src={activeGrade.realPhotoUrl || '/assets/Screenshot 2026-08-16 214040.png'}
                    alt={`${activeGrade.name} installation`}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-2.5 bg-[#0F1012] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
                    <span>Verified Project Site</span>
                    <span className="text-emerald-400">Live Commissioned</span>
                  </div>
                </div>
              </div>

              {/* Key Features Bullet Grid */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#F27D26] font-bold mb-3">
                  [ {t.products.keyFeatures} ]:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeGrade.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 bg-black/40 p-2.5 border border-white/10 rounded-lg text-xs text-white/80">
                      <Check className="w-3.5 h-3.5 text-[#F27D26] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comprehensive ASTM/DIN Lab Specification Matrix */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#F27D26] font-bold mb-3">
                  [ {t.products.specifications} ]:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="bg-black/50 p-2.5 border border-white/10 rounded-lg">
                    <div className="text-[10px] text-white/40 uppercase">Shore Hardness</div>
                    <div className="text-white font-bold">{activeGrade.specs.shoreHardness}</div>
                  </div>
                  <div className="bg-black/50 p-2.5 border border-white/10 rounded-lg">
                    <div className="text-[10px] text-white/40 uppercase">Tensile Strength</div>
                    <div className="text-white font-bold">{activeGrade.specs.tensileStrength}</div>
                  </div>
                  <div className="bg-black/50 p-2.5 border border-white/10 rounded-lg">
                    <div className="text-[10px] text-white/40 uppercase">Elongation Break</div>
                    <div className="text-white font-bold">{activeGrade.specs.elongationAtBreak}</div>
                  </div>
                  <div className="bg-black/50 p-2.5 border border-white/10 rounded-lg">
                    <div className="text-[10px] text-white/40 uppercase">Cold Flexibility</div>
                    <div className="text-[#60a5fa] font-bold">{activeGrade.specs.coldCrackTemp}</div>
                  </div>
                  <div className="bg-black/50 p-2.5 border border-white/10 rounded-lg">
                    <div className="text-[10px] text-white/40 uppercase">Fire Behavior</div>
                    <div className="text-white font-bold">{activeGrade.specs.fireRating}</div>
                  </div>
                  <div className="bg-black/50 p-2.5 border border-white/10 rounded-lg">
                    <div className="text-[10px] text-white/40 uppercase">UV Resistance</div>
                    <div className="text-white font-bold">{activeGrade.specs.uvResistance}</div>
                  </div>
                  <div className="bg-black/50 p-2.5 border border-white/10 rounded-lg">
                    <div className="text-[10px] text-white/40 uppercase">Transparency</div>
                    <div className="text-white font-bold">{activeGrade.specs.lightTransmission}</div>
                  </div>
                  <div className="bg-black/50 p-2.5 border border-white/10 rounded-lg">
                    <div className="text-[10px] text-white/40 uppercase">Barrier Role</div>
                    <div className="text-white font-bold">{activeGrade.specs.soundReduction}</div>
                  </div>
                </div>
              </div>

              {/* Recommended Applications */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#F27D26] font-bold mb-2">
                  [ {t.products.applications} ]:
                </h4>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {activeGrade.applications.map((app, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/70">
                      • {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Hardware Rail Systems */}
        {activeTab === 'hardware-systems' && (
          <div 
            id="panel-hardware-systems"
            role="tabpanel"
            aria-labelledby="tab-hardware-systems"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {HARDWARE_SYSTEMS.map((hw) => (
              <div key={hw.id} className="bg-[#121316] border border-white/10 p-6 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="p-2.5 bg-white/5 border border-white/10 w-fit mb-3">
                    <Wrench className="w-5 h-5 text-[#F27D26]" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase font-display mb-1">
                    {hw.name}
                  </h3>
                  <div className="text-xs font-mono text-[#F27D26] mb-3">{hw.material}</div>
                  <p className="text-xs text-white/60 font-light leading-relaxed mb-4">
                    {hw.desc}
                  </p>

                  <div className="space-y-2 text-xs font-mono border-t border-white/10 pt-3">
                    <div>
                      <span className="text-white/40">Clamp Assembly: </span>
                      <span className="text-white/80">{hw.stripClamp}</span>
                    </div>
                    <div>
                      <span className="text-white/40">Best Suited: </span>
                      <span className="text-emerald-400">{hw.bestFor}</span>
                    </div>
                    <div>
                      <span className="text-white/40">Design Standard: </span>
                      <span className="text-white/80">{hw.lifespan}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectForConfigurator('standard-clear')}
                  className="w-full py-2.5 px-3 bg-white/5 hover:bg-[#F27D26] hover:text-white border border-white/15 text-white font-mono text-xs uppercase tracking-wider transition-all text-center cursor-pointer"
                >
                  {t.products.configureGrade}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
