import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MultiLogoIcon } from './MultiLogo';
import { QuoteCTAButton } from './QuoteCTAButton';
import { 
  Zap, 
  Flame, 
  Snowflake, 
  Sliders, 
  Leaf, 
  Clock, 
  Info,
  Layers,
  Thermometer,
  Wind
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

interface EnergyCalculatorProps {
  onExploreConfigurator: () => void;
}

export const EnergyCalculator: React.FC<EnergyCalculatorProps> = ({ onExploreConfigurator }) => {
  const { t, language } = useLanguage();
  // Operational Parameters State
  const [doorAreaSqM, setDoorAreaSqM] = useState<number>(7.2); // e.g. 2.4m x 3.0m doorway
  const [openHoursPerDay, setOpenHoursPerDay] = useState<number>(4.5); // cumulative daily open time
  const [insideTempC, setInsideTempC] = useState<number>(-18); // Sub-zero freezer or air conditioned room
  const [outsideTempC, setOutsideTempC] = useState<number>(32); // Ambient outdoor or warehouse temp
  const [daysPerYear, setDaysPerYear] = useState<number>(300); // working days

  // Interactive Thermal Boundary Slider (0% = Unprotected Open Doorway, 100% = Multi PVC Barrier Installed)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pos = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(pos);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(5, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(95, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(5);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(95);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('pointerup', handleGlobalMouseUp);
    return () => window.removeEventListener('pointerup', handleGlobalMouseUp);
  }, []);

  // Illustrative Thermodynamic Physics Calculations
  const calculations = useMemo(() => {
    const deltaT = Math.max(1, Math.abs(outsideTempC - insideTempC));
    
    // Average air density (kg/m³) at mean temperature
    const meanTempK = ((insideTempC + outsideTempC) / 2) + 273.15;
    const airDensity = 352.9 / meanTempK;

    const doorHeightM = Math.sqrt(doorAreaSqM * 1.25);
    const unsealedAirflowM3s = 0.45 * doorAreaSqM * Math.sqrt(9.81 * doorHeightM * (deltaT / meanTempK));
    const unsealedThermalLoadKw = unsealedAirflowM3s * airDensity * 1.005 * deltaT;

    // With PVC Barrier, effective sealing restricts convective infiltration
    const containmentEfficiency = 0.82;
    const savedThermalKw = unsealedThermalLoadKw * containmentEfficiency;

    const cop = insideTempC < 0 ? 2.0 : 3.2;
    const savedElectricalKw = savedThermalKw / cop;

    // Annual Energy Savings (kWh)
    const annualOpenHours = openHoursPerDay * daysPerYear;
    const annualKwhSaved = Math.round(savedElectricalKw * annualOpenHours);

    // Metric Tons CO2 Offset (Average grid factor ~0.42 kg CO2 / kWh)
    const co2OffsetTons = Math.round((annualKwhSaved * 0.42 / 1000) * 10) / 10;

    return {
      deltaT,
      unsealedThermalLoadKw: Math.round(unsealedThermalLoadKw * 10) / 10,
      savedThermalKw: Math.round(savedThermalKw * 10) / 10,
      annualKwhSaved,
      co2OffsetTons
    };
  }, [doorAreaSqM, openHoursPerDay, insideTempC, outsideTempC, daysPerYear]);

  return (
    <section id="roi-calculator" className="relative py-10 sm:py-12 bg-[#F8F6F0] text-[#1E293B] border-t border-[#E2DDD2] overflow-hidden">
      {/* Precision Technical Grid Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
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
              [ {language === 'hi' ? 'थर्मल सिमुलेशन • सांकेतिक अनुमान' : 'THERMAL SIMULATION • ILLUSTRATIVE ESTIMATION'} ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F172A] uppercase font-display mb-4">
            {t.simulator.title}
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-light">
            {t.simulator.subtitle}
          </p>
        </motion.div>

        {/* Interactive Split Comparison Banner */}
        <div className="mb-12 bg-[#FFFFFF] border border-[#E2DDD2] p-5 sm:p-6 shadow-2xl relative">
          <div className="flex items-center justify-between mb-4 border-b border-[#E2DDD2] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0077ED]" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#0F172A] font-bold">
                [ {t.simulator.sliderTitle} ]
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#64748B]">
              Drag or use Left/Right arrows to inspect thermal boundary
            </span>
          </div>

          {/* Interactive Comparison Stage */}
          <div
            ref={sliderContainerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            tabIndex={0}
            role="slider"
            aria-label="Thermal boundary comparison slider between open doorway and PVC curtain"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={5}
            aria-valuemax={95}
            onKeyDown={handleKeyDown}
            className="relative h-64 sm:h-72 w-full overflow-hidden border border-[#E2DDD2] select-none cursor-ew-resize bg-[#F8F6F0] focus:outline-none focus:ring-2 focus:ring-[#0077ED]"
          >
            {/* Left Side: Unprotected Open Doorway */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 via-orange-950/60 to-black/90 p-6 flex flex-col justify-between">
              <div className="max-w-xs">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-500/30 border border-red-500/50 text-red-200 text-[10px] font-mono font-bold uppercase mb-2">
                  <Flame className="w-3 h-3 text-red-400" />
                  {t.simulator.sliderWithout}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-1 font-mono drop-shadow-sm">
                  {t.simulator.sliderLoss}
                </h4>
                <p className="text-xs text-white/90 font-normal leading-relaxed">
                  {t.simulator.sliderWithoutDesc}
                </p>
              </div>

              <div className="text-xs font-mono text-red-600 bg-[#FFFFFF] p-2 border border-red-500/30 inline-block w-fit shadow-md font-bold">
                Intrusion Load: <span>+{calculations.unsealedThermalLoadKw} kW (Est.)</span>
              </div>
            </div>

            {/* Right Side: With PVC Barrier Installed */}
            <div
              className="absolute inset-0 bg-gradient-to-l from-cyan-950/85 via-blue-950/65 to-black/90 p-6 flex flex-col justify-between items-end text-right"
              style={{
                clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`
              }}
            >
              <div className="max-w-xs">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-cyan-500/30 border border-cyan-500/50 text-cyan-200 text-[10px] font-mono font-bold uppercase mb-2">
                  <Snowflake className="w-3 h-3 text-cyan-400" />
                  {t.simulator.sliderWith}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-1 font-mono drop-shadow-sm">
                  {t.simulator.sliderContainment}
                </h4>
                <p className="text-xs text-white/90 font-normal leading-relaxed">
                  {t.simulator.sliderWithDesc}
                </p>
              </div>

              <div className="text-xs font-mono text-cyan-600 bg-[#FFFFFF] p-2 border border-cyan-500/30 inline-block w-fit shadow-md font-bold">
                Thermal Isolation: <span>Restricts Direct Infiltration</span>
              </div>
            </div>

            {/* Vertical Draggable Divider Line & Knob */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#0077ED] shadow-[0_0_15px_#0077ED] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FFFFFF] border-2 border-[#0077ED] shadow-xl flex items-center justify-center text-[#0077ED] text-xs font-mono font-bold">
                ⬌
              </div>
            </div>
          </div>
        </div>

        {/* Dual Column Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Operational Parameter Sliders (5 Cols) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-6 border border-[#E2DDD2] space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2DDD2] pb-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#0077ED] font-bold">
                {t.simulator.operationalParams}
              </h3>
              <span className="text-[10px] font-mono text-[#64748B]">Adjust parameters</span>
            </div>

            {/* Slider 1: Doorway Area */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <label htmlFor="roi-door-area-slider" className="text-[#475569]">{t.simulator.doorArea}:</label>
                <span className="text-[#0077ED] font-bold">{doorAreaSqM} m² <span className="text-[#64748B] text-[10px]">({(doorAreaSqM * 10.764).toFixed(0)} sq ft)</span></span>
              </div>
              <input
                id="roi-door-area-slider"
                type="range"
                min={2.0}
                max={25.0}
                step={0.5}
                value={doorAreaSqM}
                onChange={(e) => setDoorAreaSqM(Number(e.target.value))}
                aria-label="Doorway Clear Opening Area in square meters"
                className="w-full accent-[#0077ED] bg-[#F4EFE6] h-2 cursor-pointer rounded"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#94A3B8]">
                <span>Small (2.5m²)</span>
                <span>Standard (7.2m²)</span>
                <span>Bay Door (20m²)</span>
              </div>
            </div>

            {/* Slider 2: Open Duration Hours */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <label htmlFor="roi-open-hours-slider" className="text-[#475569]">{t.simulator.openDuration}:</label>
                <span className="text-[#0077ED] font-bold">{openHoursPerDay} Hours / Day</span>
              </div>
              <input
                id="roi-open-hours-slider"
                type="range"
                min={0.5}
                max={16.0}
                step={0.5}
                value={openHoursPerDay}
                onChange={(e) => setOpenHoursPerDay(Number(e.target.value))}
                aria-label="Door Open Cumulative Duration in hours per day"
                className="w-full accent-[#0077ED] bg-[#F4EFE6] h-2 cursor-pointer rounded"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#94A3B8]">
                <span>1.0 hr</span>
                <span>4.5 hrs</span>
                <span>12.0 hrs</span>
              </div>
            </div>

            {/* Temperatures: Inside vs Ambient */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="roi-inside-temp-input" className="block text-[11px] font-mono text-[#475569]">
                  {t.simulator.insideTemp}
                </label>
                <select
                  id="roi-inside-temp-input"
                  value={insideTempC}
                  onChange={(e) => setInsideTempC(Number(e.target.value))}
                  aria-label="Inside Zone Temperature"
                  className="w-full bg-[#FAF8F5] border border-[#D8D2C5] p-2.5 text-xs font-mono text-[#0F172A] focus:border-[#0077ED] focus:outline-none"
                >
                  <option value={-25}>-25°C Deep Sub-Zero</option>
                  <option value={-18}>-18°C Walk-in Freezer</option>
                  <option value={4}>+4°C Chiller / Dairy</option>
                  <option value={18}>+18°C Air Conditioned</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="roi-outside-temp-input" className="block text-[11px] font-mono text-[#475569]">
                  {t.simulator.outsideTemp}
                </label>
                <select
                  id="roi-outside-temp-input"
                  value={outsideTempC}
                  onChange={(e) => setOutsideTempC(Number(e.target.value))}
                  aria-label="Outside Ambient Temperature"
                  className="w-full bg-[#FAF8F5] border border-[#D8D2C5] p-2.5 text-xs font-mono text-[#0F172A] focus:border-[#0077ED] focus:outline-none"
                >
                  <option value={24}>+24°C Mild Warehouse</option>
                  <option value={32}>+32°C Summer Factory</option>
                  <option value={40}>+40°C Extreme Heat Hub</option>
                </select>
              </div>
            </div>
          </div>

          {/* RIGHT: Illustrative Thermal Energy Savings Projection (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] p-6 border border-[#E2DDD2] space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2DDD2] pb-3">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#0077ED] font-bold">
                  {language === 'hi' ? '[ सांकेतिक ऊर्जा रोकथाम ]' : '[ ILLUSTRATIVE THERMAL CONTAINMENT ]'}
                </h3>
                <div className="text-xs text-[#64748B] font-mono">
                  {language === 'hi' ? 'अनुमानित वार्षिक ऊर्जा सुरक्षा' : 'Estimated Annual Energy Retention'}
                </div>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold uppercase">
                  ΔT = {calculations.deltaT}°C Differential
                </span>
              </div>
            </div>

            {/* Hero Metric Block */}
            <div className="bg-[#FAF8F5] p-6 border border-emerald-500/30 relative overflow-hidden">
              <div className="text-xs font-mono text-emerald-600 uppercase tracking-widest mb-1 font-bold">
                {language === 'hi' ? 'अनुमानित वार्षिक ऊर्जा बचत (kWh)' : 'Estimated Annual Energy Protected'}
              </div>
              <div className="text-4xl sm:text-5xl font-black font-mono text-[#0F172A] tracking-tight mb-2">
                ~{calculations.annualKwhSaved.toLocaleString()} <span className="text-base text-[#64748B] font-medium font-sans">kWh / year (Est.)</span>
              </div>
              <p className="text-xs text-[#475569] font-light max-w-md">
                {language === 'hi' 
                  ? 'यह आंकड़ा दरवाजे के आकार और तापमान अंतर के आधार पर केवल एक सांकेतिक इंजीनियरिंग अनुमान है।'
                  : 'Calculated using thermodynamic convective infiltration models. Actual facility savings will vary by ventilation and ambient conditions.'}
              </p>
            </div>

            {/* 3 Supporting Metric Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#FAF8F5] p-4 border border-[#E2DDD2]">
                <div className="text-xs font-mono text-[#64748B] uppercase mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0077ED]" />
                  <span>{language === 'hi' ? 'कोटेशन' : 'Quotation'}</span>
                </div>
                <div className="text-lg font-bold font-mono text-[#0077ED]">
                  On Request
                </div>
                <div className="text-[10px] text-[#64748B] mt-1 font-mono">
                  Direct Factory Pricing
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-4 border border-[#E2DDD2]">
                <div className="text-xs font-mono text-[#64748B] uppercase mb-1 flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.simulator.co2Offset}</span>
                </div>
                <div className="text-xl font-bold font-mono text-emerald-400">
                  ~{calculations.co2OffsetTons} Tons
                </div>
                <div className="text-[10px] text-[#64748B] mt-1 font-mono">
                  Estimated CO2 Reduction / yr
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-4 border border-[#E2DDD2]">
                <div className="text-xs font-mono text-[#64748B] uppercase mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#60a5fa]" />
                  <span>{t.simulator.coolingLoad}</span>
                </div>
                <div className="text-xl font-bold font-mono text-[#60a5fa]">
                  -{calculations.savedThermalKw} kW
                </div>
                <div className="text-[10px] text-[#64748B] mt-1 font-mono">
                  Convective Interception
                </div>
              </div>
            </div>

            {/* Call to Action Bar */}
            <div className="pt-2">
              <QuoteCTAButton
                size="lg"
                variant="primary"
                onClick={onExploreConfigurator}
                label={t.simulator.configureBtn}
                icon={Sliders}
                showSparkle={true}
                className="w-full justify-center shadow-[0_0_25px_rgba(0, 119, 237,0.35)]"
              />
            </div>

            {/* Prominent Illustrative Disclaimer */}
            <p className="text-[11px] font-mono text-[#64748B] italic leading-relaxed pt-1 border-t border-[#E2DDD2]">
              * Note: All thermodynamic calculations and energy figures are illustrative estimations based on standard convective heat transfer models and do not constitute a financial guarantee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
