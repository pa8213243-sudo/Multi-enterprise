import React, { useState, useMemo, useRef } from 'react';
import { MultiLogoIcon } from './MultiLogo';
import { QuoteCTAButton } from './QuoteCTAButton';
import { PVCGrade, CurtainConfiguration, ComputedQuote, MountingType, OverlapOption, HardwareType } from '../types';
import { PVC_GRADES, HARDWARE_SYSTEMS } from '../data/products';
import { ThreeCurtainScene } from './ThreeCurtainScene';
import { 
  Sliders, 
  Send, 
  Copy, 
  Check, 
  FileText, 
  Layers, 
  Maximize2, 
  Sparkles, 
  HelpCircle, 
  ShieldCheck, 
  ChevronRight,
  Info,
  DollarSign,
  Package,
  Wrench,
  Percent,
  Weight,
  ThermometerSnowflake,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

interface ConfiguratorProps {
  initialGrade?: PVCGrade;
  onRequestQuote: (config: CurtainConfiguration, quote: ComputedQuote) => void;
  onOpenSampleModal: (grade: PVCGrade) => void;
}

export const Configurator: React.FC<ConfiguratorProps> = ({
  initialGrade = 'standard-clear',
  onRequestQuote,
  onOpenSampleModal
}) => {
  const { t, language } = useLanguage();
  // Configurator State
  const [width, setWidth] = useState<number>(2400); // mm
  const [height, setHeight] = useState<number>(3000); // mm
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [grade, setGrade] = useState<PVCGrade>(initialGrade);
  const [stripWidth, setStripWidth] = useState<number>(300); // mm
  const [stripThickness, setStripThickness] = useState<number>(3); // mm
  const [overlap, setOverlap] = useState<OverlapOption>(50); // %
  const [hardware, setHardware] = useState<HardwareType>('ss304-hook-track');
  const [mountingType, setMountingType] = useState<MountingType>('face-wall');
  const [environment, setEnvironment] = useState<'cold-storage' | 'warehouse-forklift' | 'cleanroom' | 'welding' | 'food-prep' | 'general'>('general');
  const [activeTab, setActiveTab] = useState<number>(1);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'realistic' | 'thermal' | 'airflow'>('realistic');

  // Sync if initialGrade changes externally
  React.useEffect(() => {
    if (initialGrade) {
      setGrade(initialGrade);
    }
  }, [initialGrade]);

  const currentGrade = PVC_GRADES[grade] || PVC_GRADES['standard-clear'];

  // Ensure selected strip width and thickness are valid for this grade
  React.useEffect(() => {
    if (!currentGrade.widthOptions.includes(stripWidth)) {
      setStripWidth(currentGrade.widthOptions[0]);
    }
    if (!currentGrade.thicknessOptions.includes(stripThickness)) {
      setStripThickness(currentGrade.thicknessOptions[0]);
    }
  }, [grade]);

  // Precise Engineering Math Calculations
  const computedQuote = useMemo<ComputedQuote>(() => {
    // 1. Adjusted dimensions based on mounting style
    // Face-of-wall mounting requires 100mm overhang on both sides and 50mm above header
    const effectiveWidth = mountingType === 'face-wall' ? width + 200 : width;
    const effectiveHeight = mountingType === 'face-wall' ? height + 50 : height;

    // 2. Strip Count Calculation
    // For 100% overlap (Double Layer Full Overlap), effective pitch is stripWidth * 0.5 (double density)
    // For other overlaps (33%, 50%, 66%), pitch = stripWidth * (1 - overlap/100)
    const effectivePitch = overlap >= 100 
      ? stripWidth * 0.5 
      : stripWidth * Math.max(0.2, (1 - overlap / 100));
    const rawStripCount = Math.ceil(effectiveWidth / effectivePitch) + (overlap >= 100 ? 2 : 1);
    const stripCount = Math.min(Math.max(rawStripCount, 2), 48);

    // 3. Linear Meters & Weight Calculation
    // Length per strip = effectiveHeight in meters
    const lengthPerStripM = effectiveHeight / 1000;
    const totalLengthMeters = Math.round((stripCount * lengthPerStripM) * 10) / 10;
    
    // Density of flexible PVC compound ≈ 1.22 g/cm³ = 1220 kg/m³
    // Volume per meter = (stripWidth/1000) * (stripThickness/1000) * 1
    const volumePerMeterM3 = (stripWidth / 1000) * (stripThickness / 1000) * 1;
    const weightPerMeterKg = volumePerMeterM3 * 1220;
    const curtainWeightKg = Math.round(totalLengthMeters * weightPerMeterKg * 10) / 10;

    const curtainAreaSqM = Math.round(((effectiveWidth / 1000) * (effectiveHeight / 1000)) * 100) / 100;

    // 4. Performance Metrics (Illustrative based on thickness and overlap)
    const overlapFactor = overlap >= 100 ? 1.0 : overlap >= 66 ? 0.92 : overlap >= 50 ? 0.85 : 0.70;
    const thicknessFactor = stripThickness >= 4 ? 1.0 : stripThickness >= 3 ? 0.9 : 0.8;
    const thermalEfficiencyPct = Math.min(94, Math.round(75 + (overlapFactor * 12) + (thicknessFactor * 7)));
    
    const noiseReductionDb = Math.round(12 + (stripThickness * 2) + (overlap / 50 * 3));
    const rValue = Math.round((0.35 + (stripThickness * 0.08) * overlapFactor) * 100) / 100;

    // Estimated energy savings simulation
    const estimatedHvacSavingsUsd = Math.round(curtainAreaSqM * 125 * (thermalEfficiencyPct / 100));

    // Estimated Budget Formula ($3.50/kg PVC + $25/meter hardware track + fasteners)
    const pvcCost = curtainWeightKg * 4.2;
    const trackCost = (effectiveWidth / 1000) * (hardware === 'ss304-hook-track' ? 38 : hardware === 'sliding-track-system' ? 75 : 24);
    const clampCost = stripCount * (hardware === 'ss304-hook-track' ? 6.5 : 4.0);
    const estimatedPriceUsd = Math.round(pvcCost + trackCost + clampCost);

    return {
      totalWidthMm: effectiveWidth,
      totalHeightMm: effectiveHeight,
      stripCount,
      totalLengthMeters,
      curtainWeightKg,
      curtainAreaSqM,
      overlapPercentage: overlap,
      rValue,
      thermalEfficiencyPct,
      noiseReductionDb,
      estimatedHvacSavingsUsd,
      estimatedPriceUsd,
      hardwareParts: {
        trackLengthMeters: Math.round((effectiveWidth / 1000) * 10) / 10,
        hookPlatePairs: stripCount,
        fastenerCount: stripCount * 4
      }
    };
  }, [width, height, mountingType, stripWidth, stripThickness, overlap, hardware]);

  const currentConfig: CurtainConfiguration = {
    width,
    height,
    unit,
    grade,
    stripWidth,
    stripThickness,
    overlap,
    hardware,
    mountingType,
    environment
  };

  const handleCopySpec = () => {
    const specText = `
MULTI ENTERPRISE • INDUSTRIAL PVC STRIP CURTAIN CAD SPECIFICATION
================================================================
• Doorway Opening: ${width}mm (W) x ${height}mm (H) [Clear Opening]
• Mounting Execution: ${mountingType === 'face-wall' ? 'Face-of-Wall Mounting (+200mm width, +50mm header)' : 'Under-Lintel / Soffit Mounting'}
• PVC Formulation: ${currentGrade.name} (${currentGrade.specs.coldCrackTemp} to +50°C)
• Strip Dimensions: ${stripWidth}mm Width x ${stripThickness}mm Thickness
• Overlap Pattern: ${overlap}% Overlap (${computedQuote.stripCount} individual strips)
• Suspension System: ${HARDWARE_SYSTEMS.find(h => h.id === hardware)?.name}
• Total Material Mass: ${computedQuote.curtainWeightKg} kg PVC (${computedQuote.totalLengthMeters} linear meters)
• Thermal Effectiveness: Heavy-Duty Convective Containment
• Est. Budget Index: Quotation on Request
• Manufacturer: Multi Enterprise (multipvcstrip.com) • Est. 1998
    `.trim();

    navigator.clipboard.writeText(specText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePresetSelect = (presetWidth: number, presetHeight: number, defaultGrade: PVCGrade) => {
    setWidth(presetWidth);
    setHeight(presetHeight);
    setGrade(defaultGrade);
  };

  return (
    <section id="configurator" className="relative py-10 sm:py-12 bg-[#F8F6F0] text-[#1E293B] border-t border-[#E2DDD2]">
      {/* Precision Blueprint Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <MultiLogoIcon size={18} className="w-4.5 h-4.5" />
            <span className="text-[#0077ED] text-xs font-mono tracking-widest uppercase font-bold">
              [ MULTI ENTERPRISE • 3D CAD SPECIFICATION ENGINE ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F172A] uppercase font-display mb-4">
            {t.configurator.title}
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-light">
            {t.configurator.subtitle}
          </p>
        </motion.div>

        {/* Main Configurator Architecture: Two Columns (Controls vs 3D Preview/BOM) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Step-by-Step Parameter Configuration (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quick Doorway Archetype Presets */}
            <div className="bg-[#FFFFFF] p-4 border border-[#E2DDD2]">
              <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-widest mb-3 flex items-center justify-between">
                <span>[ POPULAR DOORWAY PRESETS ]:</span>
                <span className="text-[#64748B]">Click to load standard geometry</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handlePresetSelect(1200, 2100, 'standard-clear')}
                  className="p-2 bg-[#FAF8F5] hover:bg-[#F4EFE6] border border-[#E2DDD2] text-left transition-all text-xs font-mono hover:border-[#0077ED]"
                >
                  <div className="text-[#0077ED] font-bold">Pedestrian</div>
                  <div className="text-[#475569] text-[10px]">1.2m x 2.1m</div>
                </button>

                <button
                  type="button"
                  onClick={() => handlePresetSelect(2000, 2400, 'polar-freezer')}
                  className="p-2 bg-[#FAF8F5] hover:bg-[#F4EFE6] border border-[#E2DDD2] text-left transition-all text-xs font-mono hover:border-[#0077ED]"
                >
                  <div className="text-[#60a5fa] font-bold">Cold Room</div>
                  <div className="text-[#475569] text-[10px]">2.0m x 2.4m</div>
                </button>

                <button
                  type="button"
                  onClick={() => handlePresetSelect(3000, 3500, 'double-ribbed')}
                  className="p-2 bg-[#FAF8F5] hover:bg-[#F4EFE6] border border-[#E2DDD2] text-left transition-all text-xs font-mono hover:border-[#0077ED]"
                >
                  <div className="text-[#fbbf24] font-bold">Forklift Bay</div>
                  <div className="text-[#475569] text-[10px]">3.0m x 3.5m</div>
                </button>

                <button
                  type="button"
                  onClick={() => handlePresetSelect(4000, 4500, 'double-ribbed')}
                  className="p-2 bg-[#FAF8F5] hover:bg-[#F4EFE6] border border-[#E2DDD2] text-left transition-all text-xs font-mono hover:border-[#0077ED]"
                >
                  <div className="text-[#0F172A] font-bold">Loading Dock</div>
                  <div className="text-[#475569] text-[10px]">4.0m x 4.5m</div>
                </button>
              </div>
            </div>

            {/* Step 1: Dimensions & Mounting */}
            <div className="bg-[#FFFFFF] p-5 sm:p-6 border border-[#E2DDD2] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2DDD2] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0077ED] text-white font-mono font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#0F172A]">
                    {t.configurator.step1Title}
                  </h3>
                </div>

                {/* Mounting Style Toggle */}
                <div className="flex bg-[#FAF8F5] p-0.5 border border-[#E2DDD2] text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setMountingType('face-wall')}
                    className={`px-2.5 py-1 text-[10px] transition-all ${
                      mountingType === 'face-wall'
                        ? 'bg-[#0077ED] text-white font-bold'
                        : 'text-[#64748B] hover:text-[#0077ED]'
                    }`}
                  >
                    {t.configurator.mountingFace}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMountingType('under-lintel')}
                    className={`px-2.5 py-1 text-[10px] transition-all ${
                      mountingType === 'under-lintel'
                        ? 'bg-[#0077ED] text-white font-bold'
                        : 'text-[#64748B] hover:text-[#0077ED]'
                    }`}
                  >
                    {t.configurator.mountingLintel}
                  </button>
                </div>
              </div>

              {/* Sliders for Width & Height */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Width Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <label htmlFor="configurator-width-slider" className="text-[#475569]">{t.configurator.width}:</label>
                    <span className="text-[#0077ED] font-bold font-mono text-sm">{width} mm <span className="text-[#64748B] text-xs">({(width / 1000).toFixed(2)}m)</span></span>
                  </div>
                  <input
                    id="configurator-width-slider"
                    type="range"
                    min={800}
                    max={6000}
                    step={100}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    aria-label="Doorway Clear Opening Width in millimeters"
                    className="w-full accent-[#0077ED] bg-[#F4EFE6] h-2 cursor-pointer rounded"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#94A3B8]">
                    <span>0.8m (800mm)</span>
                    <span>3.0m</span>
                    <span>6.0m (6000mm)</span>
                  </div>
                </div>

                {/* Height Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <label htmlFor="configurator-height-slider" className="text-[#475569]">{t.configurator.height}:</label>
                    <span className="text-[#0077ED] font-bold font-mono text-sm">{height} mm <span className="text-[#64748B] text-xs">({(height / 1000).toFixed(2)}m)</span></span>
                  </div>
                  <input
                    id="configurator-height-slider"
                    type="range"
                    min={1800}
                    max={6000}
                    step={100}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    aria-label="Doorway Clear Opening Height in millimeters"
                    className="w-full accent-[#0077ED] bg-[#F4EFE6] h-2 cursor-pointer rounded"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#94A3B8]">
                    <span>1.8m (1800mm)</span>
                    <span>3.5m</span>
                    <span>6.0m (6000mm)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: PVC Material Grade Selection */}
            <div className="bg-[#FFFFFF] p-5 sm:p-6 border border-[#E2DDD2] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2DDD2] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0077ED] text-white font-mono font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#0F172A]">
                    {t.configurator.step2Title}
                  </h3>
                </div>
                <button
                  onClick={() => onOpenSampleModal(grade)}
                  className="text-xs font-mono text-[#0077ED] hover:underline flex items-center gap-1"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>{t.configurator.swatchKit}</span>
                </button>
              </div>

              {/* 12 PVC Grade Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
                {Object.values(PVC_GRADES).filter((g, index, self) => index === self.findIndex(t => t.id === g.id)).map((g) => {
                  const isSelected = grade === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGrade(g.id)}
                      className={`p-2.5 text-left border transition-all cursor-pointer relative overflow-hidden rounded-lg ${
                        isSelected
                          ? 'bg-[#FFFFFF] border-[#0077ED] text-[#0F172A] shadow-lg ring-1 ring-[#0077ED]'
                          : 'bg-[#FAF8F5] border-[#E2DDD2] hover:border-[#C5BDAE] text-[#475569]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className="w-3 h-3 rounded-full border border-[#CFC8BA] flex-shrink-0"
                          style={{ backgroundColor: g.colorHex }}
                        />
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 border rounded-md shadow-xs ${g.badgeColor}`}>
                          {g.specs.coldCrackTemp}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-[#0F172A] mb-0.5 truncate">{g.name}</div>
                      <div className="text-[9px] text-[#64748B] line-clamp-1 font-light">{g.tagline}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Strip Dimensions & Overlap */}
            <div className="bg-[#FFFFFF] p-5 sm:p-6 border border-[#E2DDD2] space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E2DDD2] pb-3">
                <span className="w-6 h-6 rounded-full bg-[#0077ED] text-white font-mono font-bold flex items-center justify-center text-xs">
                  3
                </span>
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#0F172A]">
                  {t.configurator.step3Title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Strip Width Selector */}
                <div>
                  <label className="block text-xs font-mono text-[#475569] uppercase mb-2">
                    [ STRIP WIDTH ]:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {currentGrade.widthOptions.map((wVal) => (
                      <button
                        key={wVal}
                        type="button"
                        onClick={() => setStripWidth(wVal)}
                        className={`py-2 px-2 text-xs font-mono border transition-all text-center ${
                          stripWidth === wVal
                            ? 'bg-[#0077ED] text-white font-bold border-[#0077ED]'
                            : 'bg-[#FAF8F5] text-[#475569] border-[#E2DDD2] hover:border-[#B8AF9F]'
                        }`}
                      >
                        {wVal} mm
                      </button>
                    ))}
                  </div>
                </div>

                {/* Strip Thickness Selector */}
                <div>
                  <label className="block text-xs font-mono text-[#475569] uppercase mb-2">
                    [ THICKNESS ]:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {currentGrade.thicknessOptions.map((tVal) => (
                      <button
                        key={tVal}
                        type="button"
                        onClick={() => setStripThickness(tVal)}
                        className={`py-2 px-2 text-xs font-mono border transition-all text-center ${
                          stripThickness === tVal
                            ? 'bg-[#0077ED] text-white font-bold border-[#0077ED]'
                            : 'bg-[#FAF8F5] text-[#475569] border-[#E2DDD2] hover:border-[#B8AF9F]'
                        }`}
                      >
                        {tVal} mm
                      </button>
                    ))}
                  </div>
                </div>

                {/* Overlap Percentage Selector */}
                <div>
                  <label className="block text-xs font-mono text-[#475569] uppercase mb-2">
                    [ OVERLAP % ]:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { val: 33, label: '33% (1 Hook)' },
                      { val: 50, label: '50% (Standard)' },
                      { val: 66, label: '66% (High Wind)' },
                      { val: 100, label: '100% (Maximum)' }
                    ].map((ov) => (
                      <button
                        key={ov.val}
                        type="button"
                        onClick={() => setOverlap(ov.val as OverlapOption)}
                        className={`py-2 px-1 text-[11px] font-mono border transition-all text-center truncate ${
                          overlap === ov.val
                            ? 'bg-[#0077ED] text-white font-bold border-[#0077ED]'
                            : 'bg-[#FAF8F5] text-[#475569] border-[#E2DDD2] hover:border-[#B8AF9F]'
                        }`}
                      >
                        {ov.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Suspension Hardware System */}
            <div className="bg-[#FFFFFF] p-5 sm:p-6 border border-[#E2DDD2] space-y-4 rounded-xl shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2DDD2] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0077ED] text-white font-mono font-bold flex items-center justify-center text-xs">
                    4
                  </span>
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#0F172A]">
                    {t.configurator.step4Title}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#0077ED] bg-[#0077ED]/10 border border-[#0077ED]/30 px-2 py-0.5 rounded font-bold">
                  Tool-Less Hook System
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {HARDWARE_SYSTEMS.map((h) => {
                  const isSelected = hardware === h.id;
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setHardware(h.id as HardwareType)}
                      className={`p-3.5 text-left border transition-all cursor-pointer rounded-xl ${
                        isSelected
                          ? 'bg-[#FFFFFF] border-[#0077ED] text-[#0F172A] ring-2 ring-[#0077ED]/30 shadow-md'
                          : 'bg-[#FAF8F5] border-[#E2DDD2] hover:border-[#0077ED]/50 text-[#475569]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <Wrench className={`w-4 h-4 ${isSelected ? 'text-[#0077ED]' : 'text-[#64748B]'}`} />
                          <span className="text-xs font-bold text-[#0F172A]">{h.name.split(' ')[0]} {h.name.split(' ')[1]}</span>
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#0077ED]" />
                        )}
                      </div>
                      <div className="text-[10px] text-[#475569] font-mono mb-1">{h.material}</div>
                      <div className="text-[9px] text-[#0077ED] font-mono font-bold">{h.bestFor}</div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Hardware Detailed Specifications Card underneath */}
              {(() => {
                const selectedH = HARDWARE_SYSTEMS.find(h => h.id === hardware) || HARDWARE_SYSTEMS[0];
                return (
                  <div className="p-4 bg-[#FAF8F5] border border-[#D8D2C5] rounded-xl space-y-3 mt-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2DDD2] pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-[#0F172A] uppercase">
                          {selectedH.name}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded font-bold">
                          ✓ Selected Hardware
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#0077ED] font-bold">
                        {selectedH.lifespan}
                      </span>
                    </div>

                    <p className="text-xs text-[#475569] leading-relaxed">
                      {selectedH.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-mono">
                      <div className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#E2DDD2]">
                        <span className="text-[9px] uppercase text-[#64748B] block">Mounting Clamps:</span>
                        <strong className="text-[#0F172A] text-xs">{selectedH.stripClamp}</strong>
                      </div>
                      <div className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#E2DDD2]">
                        <span className="text-[9px] uppercase text-[#64748B] block">Material Composition:</span>
                        <strong className="text-[#0F172A] text-xs">{selectedH.material}</strong>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#0077ED]/5 border border-[#0077ED]/20 rounded-lg flex items-center justify-between text-[10px] font-mono text-[#0077ED]">
                      <span>Recommended Deployment: <strong>{selectedH.bestFor}</strong></span>
                      <span className="hidden sm:inline font-bold">Tool-less Quick Swap</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* RIGHT: Live 3D Preview & Engineering Bill of Materials (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20 z-10 self-start">
            {/* 3D Visualizer Card */}
            <div className="bg-[#FAF8F5] border border-[#E2DDD2] p-4 relative shadow-2xl rounded-2xl">
              {/* Telemetry Header */}
              <div className="flex flex-col gap-2.5 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0077ED] animate-ping" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#0077ED] font-bold">
                      {t.configurator.systemTelemetry}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] bg-[#FFFFFF] px-2.5 py-1 rounded-md border border-[#E2DDD2]">
                    {computedQuote.stripCount} Strips • {computedQuote.totalWidthMm}x{computedQuote.totalHeightMm}mm
                  </span>
                </div>

                {/* DYNAMIC TOP TELEMETRY INFO BAR: Rendered outside & ABOVE 3D Scene */}
                {viewMode === 'thermal' && (
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-[#FFFFFF] px-3.5 py-2 rounded-xl border border-rose-400 shadow-sm animate-in fade-in duration-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      <span className="text-xs font-mono font-bold text-rose-600 uppercase tracking-wider">
                        FLIR THERMAL TELEMETRY
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#475569]">
                      <span className="text-cyan-600 font-bold">Sub-Zero (-25°C)</span>
                      <div className="h-2.5 w-24 sm:w-32 rounded bg-gradient-to-r from-[#00e1ff] via-[#d6006e] via-[#ff3b00] to-[#ffffff] border border-[#CFC8BA]" />
                      <span className="text-rose-600 font-bold">Ambient (+35°C)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 font-bold">
                      <span>✓ Continuous Convective Seal</span>
                    </div>
                  </div>
                )}

                {viewMode === 'airflow' && (
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-[#FFFFFF] px-3.5 py-2 rounded-xl border border-cyan-400 shadow-sm animate-in fade-in duration-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                      <span className="text-xs font-mono font-bold text-cyan-600 uppercase tracking-wider">
                        CFD VELOCITY STREAMLINE SIMULATION
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#475569]">
                      <span className="text-cyan-600 font-bold">Inlet Draft: 4.8 m/s</span>
                      <span className="text-emerald-600 font-bold border-l border-[#CFC8BA] pl-2">Boundary Deflection: 94% Sealed</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3D Scene (100% Unobstructed and Fully Visible - Compact Default Framing) */}
              <ThreeCurtainScene
                grade={grade}
                thickness={stripThickness}
                hardware={hardware}
                widthMm={computedQuote.totalWidthMm}
                heightMm={computedQuote.totalHeightMm}
                stripCount={computedQuote.stripCount}
                overlapPct={overlap}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                className="w-full h-[360px] sm:h-[390px] lg:h-[410px]"
              />
            </div>

            {/* Engineering Bill of Materials (BOM) */}
            <div className="bg-[#FFFFFF] border border-[#E2DDD2] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2DDD2] pb-3">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#0077ED] font-bold">
                    [ ENGINEERING BILL OF MATERIALS ]
                  </h4>
                  <div className="text-xs text-[#64748B] font-mono">
                    {t.configurator.computedFor}: {currentGrade.shortName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-mono text-[#64748B]">{t.configurator.estBudget}</div>
                  <div className="text-sm font-bold font-mono text-[#0077ED]">
                    Quotation on Request
                  </div>
                </div>
              </div>

              {/* 4 Metric Telemetry Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="bg-[#FAF8F5] p-2.5 border border-[#E2DDD2] rounded-lg">
                  <div className="text-base sm:text-lg font-mono font-bold text-[#0F172A]">{computedQuote.stripCount}</div>
                  <div className="text-[9px] uppercase tracking-wider text-[#64748B]">{t.configurator.strips}</div>
                </div>
                <div className="bg-[#FAF8F5] p-2.5 border border-[#E2DDD2] rounded-lg">
                  <div className="text-base sm:text-lg font-mono font-bold text-[#0F172A]">{computedQuote.curtainWeightKg}kg</div>
                  <div className="text-[9px] uppercase tracking-wider text-[#64748B]">{t.configurator.mass}</div>
                </div>
                <div className="bg-[#FAF8F5] p-2.5 border border-[#E2DDD2] rounded-lg flex flex-col justify-center">
                  <div className="text-xs sm:text-sm font-mono font-bold text-emerald-600 truncate">High Grade</div>
                  <div className="text-[9px] uppercase tracking-wider text-[#64748B]">Thermal Seal</div>
                </div>
                <div className="bg-[#FAF8F5] p-2.5 border border-[#E2DDD2] rounded-lg flex flex-col justify-center">
                  <div className="text-xs sm:text-sm font-mono font-bold text-[#0077ED] truncate">Industrial</div>
                  <div className="text-[9px] uppercase tracking-wider text-[#64748B]">Sound Damping</div>
                </div>
              </div>

              {/* Hardware Components Breakdown */}
              <div className="bg-[#FAF8F5] p-3 border border-[#E2DDD2] text-xs font-mono space-y-1.5 text-[#475569]">
                <div className="text-[9px] uppercase tracking-widest text-[#0077ED] font-bold mb-1">
                  [ INCLUDED HARDWARE PACKAGE ]:
                </div>
                <div className="flex justify-between">
                  <span>• Stainless Rail Length:</span>
                  <strong className="text-[#0F172A]">{computedQuote.hardwareParts.trackLengthMeters} meters</strong>
                </div>
                <div className="flex justify-between">
                  <span>• Clamping Plate Pairs:</span>
                  <strong className="text-[#0F172A]">{computedQuote.hardwareParts.hookPlatePairs} pairs</strong>
                </div>
                <div className="flex justify-between">
                  <span>• Rivets & Fasteners:</span>
                  <strong className="text-[#0F172A]">{computedQuote.hardwareParts.fastenerCount} units</strong>
                </div>
                <div className="flex justify-between">
                  <span>• Temperature Spec:</span>
                  <strong className="text-[#0F172A]">{currentGrade.temperatureRange.min}°C to {currentGrade.temperatureRange.max}°C</strong>
                </div>
              </div>

              {/* Illustrative Thermal Savings Tag */}
              <div className="p-2.5 bg-emerald-950/20 border border-emerald-500/20 text-[11px] font-mono text-emerald-300/90 leading-tight">
                <span className="font-bold text-emerald-400 block mb-0.5">
                  ✓ High Efficiency Thermal Barrier Shield
                </span>
                <span className="text-[#64748B] text-[10px]">
                  Engineered convective retention and particulate isolation based on selected overlap and thickness specifications.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <QuoteCTAButton
                  size="lg"
                  variant="primary"
                  onClick={() => onRequestQuote(currentConfig, computedQuote)}
                  label={t.configurator.requestCadQuote}
                  icon={Send}
                  showSparkle={true}
                  className="w-full justify-center shadow-[0_0_25px_rgba(0, 119, 237,0.4)]"
                />

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCopySpec}
                    className="py-2.5 px-3 bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#0F172A] font-mono text-xs uppercase tracking-wider border border-[#D8D2C5] transition-all flex items-center justify-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? t.configurator.copied : t.configurator.copySpec}</span>
                  </button>

                  <a
                    href={`https://wa.me/919377678155?text=Hi%20Multi%20Enterprise,%20I%20have%20configured%20a%20doorway%20(${width}x${height}mm)%20with%20${currentGrade.shortName}%20strips.%20Please%20provide%20factory%20pricing.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-mono text-xs uppercase tracking-wider border border-[#20B056] shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-center rounded-xs"
                  >
                    <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.11 19.09L7.83 18.92L4.72 19.74L5.55 16.71L5.36 16.41C4.58 15.17 4.17 13.56 4.17 11.92C4.17 7.38 7.87 3.67 12.04 3.67ZM8.83 7.35C8.65 7.35 8.35 7.42 8.1 7.69C7.86 7.95 7.17 8.6 7.17 9.92C7.17 11.24 8.13 12.51 8.27 12.69C8.41 12.87 10.15 15.56 12.82 16.72C13.46 16.99 13.95 17.15 14.34 17.28C14.98 17.48 15.56 17.45 16.03 17.38C16.55 17.3 17.63 16.72 17.86 16.08C18.09 15.43 18.09 14.88 18.02 14.76C17.95 14.64 17.77 14.57 17.5 14.43C17.23 14.3 15.91 13.65 15.66 13.56C15.42 13.47 15.24 13.43 15.06 13.7C14.88 13.97 14.37 14.57 14.21 14.76C14.06 14.94 13.9 14.96 13.63 14.83C13.36 14.69 12.49 14.41 11.45 13.49C10.65 12.77 10.11 11.89 9.95 11.62C9.79 11.35 9.93 11.2 10.07 11.06C10.19 10.94 10.34 10.74 10.48 10.58C10.62 10.42 10.66 10.3 10.75 10.12C10.84 9.94 10.8 9.79 10.73 9.65C10.66 9.51 10.14 8.24 9.93 7.72C9.72 7.21 9.51 7.28 9.35 7.27C9.2 7.26 9.02 7.26 8.83 7.26V7.35Z"/>
                    </svg>
                    <span className="font-bold text-white tracking-wider">{t.configurator.whatsappQuote}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
