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
  const [selectedGradeId, setSelectedGradeId] = useState<PVCGrade>('transparent');
  const [gradeCategoryFilter, setGradeCategoryFilter] = useState<'all' | 'clear' | 'colors' | 'specialty'>('all');
  const gradeCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Unique list of all 12 PVC Grades
  const allGradesList = Object.values(PVC_GRADES).filter(
    (g, index, self) => index === self.findIndex(t => t.id === g.id)
  );

  const filteredGrades = allGradesList.filter(grade => {
    if (gradeCategoryFilter === 'all') return true;
    if (gradeCategoryFilter === 'clear') {
      return ['transparent', 'blue-natural', 'standard-ribbed'].includes(grade.id);
    }
    if (gradeCategoryFilter === 'colors') {
      return ['gray', 'navy-blue', 'white-opaque', 'parrot-green'].includes(grade.id);
    }
    if (gradeCategoryFilter === 'specialty') {
      return ['multi-red', 'orange-amber', 'sky-blue', 'lemon-yellow', 'multi-green'].includes(grade.id);
    }
    return true;
  });

  const activeGrade = PVC_GRADES[selectedGradeId] || allGradesList[0];

  const handleGradeKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      nextIndex = (index + 1) % filteredGrades.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + filteredGrades.length) % filteredGrades.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = filteredGrades.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setSelectedGradeId(filteredGrades[nextIndex].id);
    gradeCardsRef.current[nextIndex]?.focus();
  };

  return (
    <section id="products" className="relative py-10 sm:py-12 bg-[#F8F6F0] text-[#1E293B] border-t border-[#E2DDD2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <MultiLogoIcon size={18} className="w-4.5 h-4.5" />
              <span className="text-[#0077ED] text-xs font-mono tracking-widest uppercase font-bold">
                {t.products.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F172A] uppercase font-display mb-4">
              {t.products.title}
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-light">
              {t.products.subtitle}
            </p>
          </div>

          {/* Catalog View Mode Toggle */}
          <div 
            role="tablist"
            aria-label="Product Catalog Sections"
            className="flex items-center bg-[#FAF8F5] p-1 border border-[#E2DDD2] self-start md:self-auto rounded-xl"
          >
            <button
              role="tab"
              id="tab-pvc-grades"
              aria-selected={activeTab === 'pvc-grades'}
              aria-controls="panel-pvc-grades"
              onClick={() => setActiveTab('pvc-grades')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer rounded-lg ${
                activeTab === 'pvc-grades'
                  ? 'bg-[#0077ED] text-white shadow-md'
                  : 'text-[#64748B] hover:text-[#0077ED]'
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
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer rounded-lg ${
                activeTab === 'hardware-systems'
                  ? 'bg-[#0077ED] text-white shadow-md'
                  : 'text-[#64748B] hover:text-[#0077ED]'
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
            {/* Grade Selection Column with Category Pills (5 Columns) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Category Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FFFFFF] border border-[#E2DDD2] rounded-xl">
                {[
                  { id: 'all', label: language === 'hi' ? 'सभी 12 ग्रेड' : 'All 12 Grades' },
                  { id: 'clear', label: language === 'hi' ? 'पारदर्शी व रिब्ड' : 'Clear & Ribbed' },
                  { id: 'colors', label: language === 'hi' ? 'रंग व प्राइवेसी' : 'Colors & Opaque' },
                  { id: 'specialty', label: language === 'hi' ? 'सुरक्षा व कीट' : 'Safety & Special' }
                ].map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => {
                      setGradeCategoryFilter(chip.id as any);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold tracking-tight transition-all cursor-pointer ${
                      gradeCategoryFilter === chip.id
                        ? 'bg-[#0077ED] text-white shadow-md'
                        : 'text-[#475569] hover:text-[#0077ED] hover:bg-[#F2EDE2]'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Grade Cards List */}
              <div 
                role="radiogroup"
                aria-label="Select PVC Grade"
                className="space-y-3 max-h-[620px] overflow-y-auto pr-1"
              >
                {filteredGrades.map((grade, idx) => {
                  const isSelected = selectedGradeId === grade.id;
                  return (
                  <motion.div
                    key={grade.id}
                    ref={(el) => { gradeCardsRef.current[idx] = el; }}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    onKeyDown={(e) => handleGradeKeyDown(e, idx)}
                    onClick={() => setSelectedGradeId(grade.id)}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#0077ED] ${
                      isSelected
                        ? 'bg-[#F0F7FF] border-[#0077ED] shadow-md ring-1 ring-[#0077ED]'
                        : 'bg-[#FFFFFF] border-[#E2DDD2] hover:border-[#0077ED]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Grade Roll Preview Thumbnail */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#F4EFE6] border border-[#E2DDD2] relative">
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
                          className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-black/20"
                          style={{ backgroundColor: grade.colorHex }}
                        />
                      </div>

                      {/* Grade Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider font-mono truncate">
                            {grade.name}
                          </h3>
                        </div>
                        <span className={`inline-block text-[9px] font-mono px-2 py-0.5 border rounded mb-1.5 ${grade.badgeColor}`}>
                          {grade.badge}
                        </span>
                        <p className="text-xs text-[#64748B] line-clamp-1 font-light">
                          {grade.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] pt-2.5 mt-2.5 border-t border-[#E2DDD2]">
                      <span className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-[#0077ED]" />
                        {grade.temperatureRange.min}°C to {grade.temperatureRange.max}°C
                      </span>
                      <span className="text-[#0077ED] font-bold text-[10px]">
                        {isSelected ? 'ACTIVE SPEC →' : 'VIEW DETAILS'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
              </div>
            </div>

            {/* Detailed Technical Spec Sheet (7 Columns) */}
            <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E2DDD2] rounded-2xl p-6 sm:p-8 space-y-6 lg:sticky lg:top-24 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2DDD2] pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: activeGrade.colorHex }}
                    />
                    <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] uppercase font-display">
                      {activeGrade.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#475569] font-light">
                    {activeGrade.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenSampleModal(activeGrade.id)}
                    className="px-3.5 py-2 bg-[#F8F6F0] hover:bg-[#FFFFFF] border border-[#D8D2C5] hover:border-[#0077ED] text-[#0F172A] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Package className="w-3.5 h-3.5 text-[#0077ED]" />
                    <span>{t.products.requestSample}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectForConfigurator(activeGrade.id)}
                    className="px-4 py-2 bg-[#0077ED] text-white hover:bg-[#2B8EFF] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#0077ED]/20"
                  >
                    <span>{t.products.configureGrade}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Material Visual Display (Roll Photo + Real Installation Photo) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Roll & Swatch Photo */}
                <div className="relative rounded-xl overflow-hidden border border-[#E2DDD2] bg-[#FAF8F5] group">
                  <div className="absolute top-2.5 left-2.5 z-10 bg-[#FAF8F5]/90 backdrop-blur-md px-2 py-0.5 text-[9px] font-mono text-[#0F172A] uppercase font-bold rounded">
                    Material Roll Specimen
                  </div>
                  <img
                    src={activeGrade.imageUrl || '/assets/Screenshot 2026-08-16 214504.png'}
                    alt={`${activeGrade.name} roll`}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-2.5 bg-[#FAF8F5] border-t border-[#E2DDD2] flex items-center justify-between text-[11px] font-mono text-[#475569]">
                    <span>100% Virgin Grade Polymer</span>
                    <span className="text-[#0077ED] font-bold">ASTM D638 / DIN 53387</span>
                  </div>
                </div>

                {/* Real Facility Installation Photo */}
                <div className="relative rounded-xl overflow-hidden border border-[#E2DDD2] bg-[#FAF8F5] group">
                  <div className="absolute top-2.5 left-2.5 z-10 bg-emerald-700/90 backdrop-blur-md px-2 py-0.5 text-[9px] font-mono text-white uppercase font-bold rounded">
                    ★ Real Industrial Installation
                  </div>
                  <img
                    src={activeGrade.realPhotoUrl || '/assets/Screenshot 2026-08-16 214040.png'}
                    alt={`${activeGrade.name} installation`}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-2.5 bg-[#FAF8F5] border-t border-[#E2DDD2] flex items-center justify-between text-[11px] font-mono text-[#475569]">
                    <span>Verified Project Site</span>
                    <span className="text-emerald-600 font-bold">Live Commissioned</span>
                  </div>
                </div>
              </div>

              {/* Key Features Bullet Grid */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#0077ED] font-bold mb-3">
                  [ {t.products.keyFeatures} ]:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeGrade.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 bg-[#FAF8F5] p-2.5 border border-[#E2DDD2] rounded-lg text-xs text-[#334155]">
                      <Check className="w-3.5 h-3.5 text-[#0077ED] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comprehensive ASTM/DIN Lab Specification Matrix */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#0077ED] font-bold mb-3">
                  [ {t.products.specifications} ]:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="bg-[#FAF8F5] p-2.5 border border-[#E2DDD2] rounded-lg">
                    <div className="text-[10px] text-[#64748B] uppercase">Shore Hardness</div>
                    <div className="text-[#0F172A] font-bold">{activeGrade.specs.shoreHardness}</div>
                  </div>
                  <div className="bg-[#FAF8F5] p-2.5 border border-[#E2DDD2] rounded-lg">
                    <div className="text-[10px] text-[#64748B] uppercase">Tensile Strength</div>
                    <div className="text-[#0F172A] font-bold">{activeGrade.specs.tensileStrength}</div>
                  </div>
                  <div className="bg-[#FAF8F5] p-2.5 border border-[#E2DDD2] rounded-lg">
                    <div className="text-[10px] text-[#64748B] uppercase">Elongation Break</div>
                    <div className="text-[#0F172A] font-bold">{activeGrade.specs.elongationAtBreak}</div>
                  </div>
                  <div className="bg-[#FAF8F5] p-2.5 border border-[#E2DDD2] rounded-lg">
                    <div className="text-[10px] text-[#64748B] uppercase">Cold Flexibility</div>
                    <div className="text-[#0077ED] font-bold">{activeGrade.specs.coldCrackTemp}</div>
                  </div>
                  <div className="bg-[#FAF8F5] p-2.5 border border-[#E2DDD2] rounded-lg">
                    <div className="text-[10px] text-[#64748B] uppercase">Fire Behavior</div>
                    <div className="text-[#0F172A] font-bold">{activeGrade.specs.fireRating}</div>
                  </div>
                  <div className="bg-[#FAF8F5] p-2.5 border border-[#E2DDD2] rounded-lg">
                    <div className="text-[10px] text-[#64748B] uppercase">UV Resistance</div>
                    <div className="text-[#0F172A] font-bold">{activeGrade.specs.uvResistance}</div>
                  </div>
                  <div className="bg-[#FAF8F5] p-2.5 border border-[#E2DDD2] rounded-lg">
                    <div className="text-[10px] text-[#64748B] uppercase">Transparency</div>
                    <div className="text-[#0F172A] font-bold">{activeGrade.specs.lightTransmission}</div>
                  </div>
                  <div className="bg-[#FAF8F5] p-2.5 border border-[#E2DDD2] rounded-lg">
                    <div className="text-[10px] text-[#64748B] uppercase">Barrier Role</div>
                    <div className="text-[#0F172A] font-bold">{activeGrade.specs.soundReduction}</div>
                  </div>
                </div>
              </div>

              {/* Recommended Applications */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#0077ED] font-bold mb-2">
                  [ {t.products.applications} ]:
                </h4>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {activeGrade.applications.map((app, i) => (
                    <span key={i} className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E2DDD2] text-[#475569]">
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
              <div key={hw.id} className="bg-[#FFFFFF] border border-[#E2DDD2] p-6 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#E2DDD2] w-fit mb-3">
                    <Wrench className="w-5 h-5 text-[#0077ED]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] uppercase font-display mb-1">
                    {hw.name}
                  </h3>
                  <div className="text-xs font-mono text-[#0077ED] mb-3">{hw.material}</div>
                  <p className="text-xs text-[#475569] font-light leading-relaxed mb-4">
                    {hw.desc}
                  </p>

                  <div className="space-y-2 text-xs font-mono border-t border-[#E2DDD2] pt-3">
                    <div>
                      <span className="text-[#64748B]">Clamp Assembly: </span>
                      <span className="text-[#334155]">{hw.stripClamp}</span>
                    </div>
                    <div>
                      <span className="text-[#64748B]">Best Suited: </span>
                      <span className="text-emerald-400">{hw.bestFor}</span>
                    </div>
                    <div>
                      <span className="text-[#64748B]">Design Standard: </span>
                      <span className="text-[#334155]">{hw.lifespan}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectForConfigurator('standard-clear')}
                  className="w-full py-2.5 px-3 bg-[#FAF8F5] hover:bg-[#0077ED] hover:text-white border border-[#D8D2C5] text-[#0F172A] font-mono text-xs uppercase tracking-wider transition-all text-center cursor-pointer"
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
