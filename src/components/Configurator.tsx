import React, { useState, useMemo, useRef } from 'react';
import { MultiLogoIcon } from './MultiLogo';
import { QuoteCTAButton } from './QuoteCTAButton';
import { PVCGrade, CurtainConfiguration, ComputedQuote, MountingType } from '../types';
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
  const [overlap, setOverlap] = useState<number>(50); // %
  const [hardware, setHardware] = useState<string>('ss304-hook-track');
  const [mountingType, setMountingType] = useState<MountingType>('face-wall');
  const [environment, setEnvironment] = useState<string>('general');
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
    // Effective usable strip width based on overlap:
    // With 50% overlap on a 300mm strip: overlap width = 150mm. Effective pitch = 150mm.
    const overlapFraction = overlap / 100;
    const stripPitch = stripWidth * (1 - overlapFraction);
    // Number of strips = ceil(effectiveWidth / pitch) + 1 (for edge boundary closure)
    const rawStripCount = Math.ceil(effectiveWidth / stripPitch) + 1;
    const stripCount = Math.max(rawStripCount, 2);

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
    <section id="configurator" className="relative py-24 bg-[#0D0E11] text-[#E0E0E0] border-t border-white/10 overflow-hidden">
      {/* Precision Blueprint Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
              [ MULTI ENTERPRISE • 3D CAD SPECIFICATION ENGINE ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-display mb-4">
            {t.configurator.title}
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
            {t.configurator.subtitle}
          </p>
        </motion.div>

        {/* Main Configurator Architecture: Two Columns (Controls vs 3D Preview/BOM) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Step-by-Step Parameter Configuration (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quick Doorway Archetype Presets */}
            <div className="bg-[#121316] p-4 border border-white/10">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-3 flex items-center justify-between">
                <span>[ POPULAR DOORWAY PRESETS ]:</span>
                <span className="text-white/40">Click to load standard geometry</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handlePresetSelect(1200, 2100, 'standard-clear')}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all text-xs font-mono hover:border-[#F27D26]"
                >
                  <div className="text-[#F27D26] font-bold">Pedestrian</div>
                  <div className="text-white/60 text-[10px]">1.2m x 2.1m</div>
                </button>

                <button
                  type="button"
                  onClick={() => handlePresetSelect(2000, 2400, 'polar-freezer')}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all text-xs font-mono hover:border-[#F27D26]"
                >
                  <div className="text-[#60a5fa] font-bold">Cold Room</div>
                  <div className="text-white/60 text-[10px]">2.0m x 2.4m</div>
                </button>

                <button
                  type="button"
                  onClick={() => handlePresetSelect(3000, 3500, 'double-ribbed')}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all text-xs font-mono hover:border-[#F27D26]"
                >
                  <div className="text-[#fbbf24] font-bold">Forklift Bay</div>
                  <div className="text-white/60 text-[10px]">3.0m x 3.5m</div>
                </button>

                <button
                  type="button"
                  onClick={() => handlePresetSelect(4000, 4500, 'double-ribbed')}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all text-xs font-mono hover:border-[#F27D26]"
                >
                  <div className="text-white font-bold">Loading Dock</div>
                  <div className="text-white/60 text-[10px]">4.0m x 4.5m</div>
                </button>
              </div>
            </div>

            {/* Step 1: Dimensions & Mounting */}
            <div className="bg-[#121316] p-5 sm:p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#F27D26] text-black font-mono font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                    {t.configurator.step1Title}
                  </h3>
                </div>

                {/* Mounting Style Toggle */}
                <div className="flex bg-black/60 p-0.5 border border-white/10 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setMountingType('face-wall')}
                    className={`px-2.5 py-1 text-[10px] transition-all ${
                      mountingType === 'face-wall'
                        ? 'bg-[#F27D26] text-white font-bold'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {t.configurator.mountingFace}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMountingType('under-lintel')}
                    className={`px-2.5 py-1 text-[10px] transition-all ${
                      mountingType === 'under-lintel'
                        ? 'bg-[#F27D26] text-white font-bold'
                        : 'text-white/50 hover:text-white'
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
                    <label htmlFor="configurator-width-slider" className="text-white/70">{t.configurator.width}:</label>
                    <span className="text-[#F27D26] font-bold font-mono text-sm">{width} mm <span className="text-white/40 text-xs">({(width / 1000).toFixed(2)}m)</span></span>
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
                    className="w-full accent-[#F27D26] bg-white/10 h-2 cursor-pointer rounded"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-white/30">
                    <span>0.8m (800mm)</span>
                    <span>3.0m</span>
                    <span>6.0m (6000mm)</span>
                  </div>
                </div>

                {/* Height Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <label htmlFor="configurator-height-slider" className="text-white/70">{t.configurator.height}:</label>
                    <span className="text-[#F27D26] font-bold font-mono text-sm">{height} mm <span className="text-white/40 text-xs">({(height / 1000).toFixed(2)}m)</span></span>
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
                    className="w-full accent-[#F27D26] bg-white/10 h-2 cursor-pointer rounded"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-white/30">
                    <span>1.8m (1800mm)</span>
                    <span>3.5m</span>
                    <span>6.0m (6000mm)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: PVC Material Grade Selection */}
            <div className="bg-[#121316] p-5 sm:p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#F27D26] text-black font-mono font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                    {t.configurator.step2Title}
                  </h3>
                </div>
                <button
                  onClick={() => onOpenSampleModal(grade)}
                  className="text-xs font-mono text-[#F27D26] hover:underline flex items-center gap-1"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>{t.configurator.swatchKit}</span>
                </button>
              </div>

              {/* 6 PVC Grade Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {Object.values(PVC_GRADES).map((g) => {
                  const isSelected = grade === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGrade(g.id)}
                      className={`p-3 text-left border transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? 'bg-[#1C1E24] border-[#F27D26] text-white shadow-lg ring-1 ring-[#F27D26]'
                          : 'bg-[#0E0F12] border-white/10 hover:border-white/25 text-white/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: g.colorHex }}
                        />
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 border ${g.badgeColor}`}>
                          {g.specs.coldCrackTemp}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white mb-0.5 truncate">{g.shortName}</div>
                      <div className="text-[10px] text-white/50 line-clamp-1 font-light">{g.tagline}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Strip Dimensions & Overlap */}
            <div className="bg-[#121316] p-5 sm:p-6 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="w-6 h-6 rounded-full bg-[#F27D26] text-black font-mono font-bold flex items-center justify-center text-xs">
                  3
                </span>
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                  {t.configurator.step3Title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Strip Width Selector */}
                <div>
                  <label className="block text-xs font-mono text-white/60 uppercase mb-2">
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
                            ? 'bg-[#F27D26] text-white font-bold border-[#F27D26]'
                            : 'bg-black/50 text-white/60 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {wVal} mm
                      </button>
                    ))}
                  </div>
                </div>

                {/* Strip Thickness Selector */}
                <div>
                  <label className="block text-xs font-mono text-white/60 uppercase mb-2">
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
                            ? 'bg-[#F27D26] text-white font-bold border-[#F27D26]'
                            : 'bg-black/50 text-white/60 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {tVal} mm
                      </button>
                    ))}
                  </div>
                </div>

                {/* Overlap Percentage Selector */}
                <div>
                  <label className="block text-xs font-mono text-white/60 uppercase mb-2">
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
                        onClick={() => setOverlap(ov.val)}
                        className={`py-2 px-1 text-[11px] font-mono border transition-all text-center truncate ${
                          overlap === ov.val
                            ? 'bg-[#F27D26] text-white font-bold border-[#F27D26]'
                            : 'bg-black/50 text-white/60 border-white/10 hover:border-white/30'
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
            <div className="bg-[#121316] p-5 sm:p-6 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="w-6 h-6 rounded-full bg-[#F27D26] text-black font-mono font-bold flex items-center justify-center text-xs">
                  4
                </span>
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                  {t.configurator.step4Title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {HARDWARE_SYSTEMS.map((h) => {
                  const isSelected = hardware === h.id;
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setHardware(h.id)}
                      className={`p-3.5 text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1C1E24] border-[#F27D26] text-white ring-1 ring-[#F27D26]'
                          : 'bg-[#0E0F12] border-white/10 hover:border-white/25 text-white/60'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Wrench className={`w-4 h-4 ${isSelected ? 'text-[#F27D26]' : 'text-white/40'}`} />
                        <span className="text-xs font-bold text-white">{h.name.split(' ')[0]} {h.name.split(' ')[1]}</span>
                      </div>
                      <div className="text-[10px] text-white/60 font-mono mb-1">{h.material}</div>
                      <div className="text-[9px] text-[#F27D26] font-mono">{h.bestFor}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Live 3D Preview & Engineering Bill of Materials (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* 3D Visualizer Card */}
            <div className="bg-[#0F1012] border border-white/10 p-4 relative shadow-2xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F27D26] animate-ping" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#F27D26] font-bold">
                    {t.configurator.systemTelemetry}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/40">
                  {computedQuote.stripCount} Strips • {computedQuote.totalWidthMm}x{computedQuote.totalHeightMm}mm
                </span>
              </div>

              {/* 3D Scene */}
              <ThreeCurtainScene
                grade={grade}
                widthMm={computedQuote.totalWidthMm}
                heightMm={computedQuote.totalHeightMm}
                stripCount={computedQuote.stripCount}
                overlapPct={overlap}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                className="w-full h-[500px] sm:h-[560px] lg:h-[620px]"
              />
            </div>

            {/* Engineering Bill of Materials (BOM) */}
            <div className="bg-[#121316] border border-white/10 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#F27D26] font-bold">
                    [ ENGINEERING BILL OF MATERIALS ]
                  </h4>
                  <div className="text-xs text-white/50 font-mono">
                    {t.configurator.computedFor}: {currentGrade.shortName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-mono text-white/40">{t.configurator.estBudget}</div>
                  <div className="text-sm font-bold font-mono text-[#F27D26]">
                    Quotation on Request
                  </div>
                </div>
              </div>

              {/* 4 Metric Telemetry Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="bg-black/50 p-2.5 border border-white/10">
                  <div className="text-lg font-mono font-bold text-white">{computedQuote.stripCount}</div>
                  <div className="text-[9px] uppercase tracking-wider text-white/40">{t.configurator.strips}</div>
                </div>
                <div className="bg-black/50 p-2.5 border border-white/10">
                  <div className="text-lg font-mono font-bold text-white">{computedQuote.curtainWeightKg}kg</div>
                  <div className="text-[9px] uppercase tracking-wider text-white/40">{t.configurator.mass}</div>
                </div>
                <div className="bg-black/50 p-2.5 border border-white/10">
                  <div className="text-lg font-mono font-bold text-emerald-400">High Grade</div>
                  <div className="text-[9px] uppercase tracking-wider text-white/40">Thermal Seal</div>
                </div>
                <div className="bg-black/50 p-2.5 border border-white/10">
                  <div className="text-lg font-mono font-bold text-[#60a5fa]">Industrial</div>
                  <div className="text-[9px] uppercase tracking-wider text-white/40">Sound Damping</div>
                </div>
              </div>

              {/* Hardware Components Breakdown */}
              <div className="bg-black/40 p-3 border border-white/10 text-xs font-mono space-y-1.5 text-white/70">
                <div className="text-[9px] uppercase tracking-widest text-[#F27D26] font-bold mb-1">
                  [ INCLUDED HARDWARE PACKAGE ]:
                </div>
                <div className="flex justify-between">
                  <span>• Stainless Rail Length:</span>
                  <strong className="text-white">{computedQuote.hardwareParts.trackLengthMeters} meters</strong>
                </div>
                <div className="flex justify-between">
                  <span>• Clamping Plate Pairs:</span>
                  <strong className="text-white">{computedQuote.hardwareParts.hookPlatePairs} pairs</strong>
                </div>
                <div className="flex justify-between">
                  <span>• Rivets & Fasteners:</span>
                  <strong className="text-white">{computedQuote.hardwareParts.fastenerCount} units</strong>
                </div>
                <div className="flex justify-between">
                  <span>• Temperature Spec:</span>
                  <strong className="text-white">{currentGrade.temperatureRange.min}°C to {currentGrade.temperatureRange.max}°C</strong>
                </div>
              </div>

              {/* Illustrative Thermal Savings Tag */}
              <div className="p-2.5 bg-emerald-950/20 border border-emerald-500/20 text-[11px] font-mono text-emerald-300/90 leading-tight">
                <span className="font-bold text-emerald-400 block mb-0.5">
                  ✓ High Efficiency Thermal Barrier Shield
                </span>
                <span className="text-white/50 text-[10px]">
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
                  className="w-full justify-center shadow-[0_0_25px_rgba(242,125,38,0.4)]"
                />

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCopySpec}
                    className="py-2.5 px-3 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider border border-white/15 transition-all flex items-center justify-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? t.configurator.copied : t.configurator.copySpec}</span>
                  </button>

                  <a
                    href={`https://wa.me/919820000000?text=Hi%20Multi%20Enterprise,%20I%20have%20configured%20a%20doorway%20(${width}x${height}mm)%20with%20${currentGrade.shortName}%20strips.%20Please%20provide%20factory%20pricing.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-mono text-xs uppercase tracking-wider border border-emerald-500/30 transition-all flex items-center justify-center gap-1.5 text-center"
                  >
                    <span>{t.configurator.whatsappQuote}</span>
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
