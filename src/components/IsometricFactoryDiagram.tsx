import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Flame, 
  EyeOff, 
  ThermometerSnowflake, 
  Truck, 
  VolumeX, 
  Droplets, 
  Bug, 
  Sliders, 
  Info, 
  ArrowRight,
  Sparkles,
  Maximize2,
  RotateCw,
  Eye,
  Layers,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Box,
  Wind
} from 'lucide-react';
import { PVCGrade } from '../types';

export interface Hotspot {
  id: string;
  label: string;
  sublabel: string;
  shortTag: string;
  x: number; // percentage on isometric model (0-100)
  y: number; // percentage on isometric model (0-100)
  pinX: number; // leader pin target on the 3D room floor
  pinY: number;
  color: string;
  bgColor: string;
  icon: React.ElementType;
  grade: PVCGrade;
  description: string;
  specs: string;
  tempRange: string;
  benefits: string[];
}

interface IsometricFactoryDiagramProps {
  onSelectHotspotGrade?: (grade: PVCGrade) => void;
  onOpenQuoteModal?: (grade?: PVCGrade) => void;
}

type ViewMode = 'architectural' | 'thermal' | 'airflow' | 'xray';

export const IsometricFactoryDiagram: React.FC<IsometricFactoryDiagramProps> = ({
  onSelectHotspotGrade,
  onOpenQuoteModal
}) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('architectural');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const hotspots: Hotspot[] = [
    {
      id: 'welding-screen',
      label: 'WELDING SCREEN',
      sublabel: 'Dark Green / Bronze Protective Arc Filter',
      shortTag: 'WELD BAY',
      x: 34,
      y: 13,
      pinX: 38,
      pinY: 22,
      color: '#22c55e',
      bgColor: 'rgba(34, 197, 94, 0.2)',
      icon: Flame,
      grade: 'welding-safety',
      tempRange: '-15°C to +50°C',
      specs: '300mm x 3mm Bronze/Green • ISO 25980 / EN 1598 Certified UV Blocker',
      description: 'Filters hazardous UV and blue light arc radiation emitted during MIG/TIG/Stick welding, protecting adjacent workers from flash eye burns.',
      benefits: ['Blocks 99.9% Harmful UV Arc Radiation', 'Flame Retardant DIN 4102 B1 Self-Extinguishing', 'Maintains Floor Visual Supervision']
    },
    {
      id: 'dust-protection',
      label: 'DUST PROTECTION',
      sublabel: 'Standard Clear PVC / Machine Enclosure',
      shortTag: 'DUST BARRIER',
      x: 16,
      y: 24,
      pinX: 23,
      pinY: 34,
      color: '#38bdf8',
      bgColor: 'rgba(56, 189, 248, 0.2)',
      icon: ShieldCheck,
      grade: 'standard-clear',
      tempRange: '-15°C to +50°C',
      specs: '200mm x 2mm & 300mm x 3mm 100% Virgin Polymer Clear • 92% Optical Clarity',
      description: 'Isolates airborne dust, wood sawdust, chemical powders, and particulate pollutants while allowing high natural daylight transmission.',
      benefits: ['High Efficiency Particulate Containment', 'High-Clarity Optical Grade Virgin Polymer', 'Reduces HVAC Filter Clogging & Wear']
    },
    {
      id: 'dispatch-goods',
      label: 'DISPATCH GOODS',
      sublabel: 'Double Ribbed Heavy-Duty Bay Entrance',
      shortTag: 'DOCK BAY',
      x: 12,
      y: 46,
      pinX: 20,
      pinY: 53,
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.2)',
      icon: Truck,
      grade: 'double-ribbed',
      tempRange: '-20°C to +60°C',
      specs: '300mm x 3mm & 400mm x 4mm Dual Raised Ribs • 67% Overlap • Heavy Traffic',
      description: 'Raised dual ribs absorb mechanical abrasion from forklift tines and heavy pallets, keeping clear viewing windows scratch-free for years.',
      benefits: ['300% Extended Wear Life under Forklifts', 'High Impact Shock Absorption', 'Maintains Driver Visibility & Safety']
    },
    {
      id: 'noise-reduction',
      label: 'NOISE REDUCTION',
      sublabel: 'Acoustic Sound Barrier Partition',
      shortTag: 'ACOUSTIC',
      x: 28,
      y: 65,
      pinX: 34,
      pinY: 60,
      color: '#ec4899',
      bgColor: 'rgba(236, 72, 153, 0.2)',
      icon: VolumeX,
      grade: 'double-ribbed',
      tempRange: '-15°C to +50°C',
      specs: 'Heavy Gauge 4mm Polymer Acoustic Barrier • -18dB to -24dB Noise Drop',
      description: 'High-density PVC polymer strips dampen high-decibel industrial machinery noise across plant zones, presses, and grinding shops.',
      benefits: ['Up to -24dB Industrial Acoustic Attenuation', 'Separates Loud Grinding & Power Presses', 'Easy Walk-Through Accessibility']
    },
    {
      id: 'maintain-humidity',
      label: 'MAINTAIN HUMIDITY',
      sublabel: 'Cleanroom & Pharma Controlled Climate Air Lock',
      shortTag: 'HUMIDITY',
      x: 50,
      y: 78,
      pinX: 52,
      pinY: 68,
      color: '#06b6d4',
      bgColor: 'rgba(6, 182, 212, 0.2)',
      icon: Droplets,
      grade: 'anti-static',
      tempRange: '-15°C to +50°C',
      specs: 'Anti-Static ESD Safe Clear • 50% Overlap • Positive Pressure Seal',
      description: 'Maintains critical Relative Humidity (RH) levels in pharmaceutical, textile, printing, and paper conversion cleanroom facilities.',
      benefits: ['Prevents Atmospheric Humidity Drift', 'Reduces Climate Control HVAC Cycles', 'Anti-Static ESD Safe Surface Resistivity']
    },
    {
      id: 'opac',
      label: 'OPAC',
      sublabel: 'Opaque Black / Solid Visual Privacy Barrier',
      shortTag: 'OPAC ZONE',
      x: 74,
      y: 20,
      pinX: 68,
      pinY: 30,
      color: '#a855f7',
      bgColor: 'rgba(168, 85, 247, 0.2)',
      icon: EyeOff,
      grade: 'standard-clear',
      tempRange: '-15°C to +50°C',
      specs: '100% Light-Blocking Solid Black/White PVC • Zero Transmittance',
      description: 'Total light-blocking solid PVC partition for confidential testing, darkrooms, wash bays, or restricted access zones.',
      benefits: ['Zero Optical Transmittance (100% Privacy)', 'Conceals Storage & Sensitive R&D Operations', 'Tear-Resistant Heavy Polymer']
    },
    {
      id: 'freezer-grade',
      label: 'FREEZER GRADE UP TO -50',
      sublabel: 'Polar Cryogenic Sub-Zero Cold Storage Doorway',
      shortTag: '-50°C FREEZER',
      x: 85,
      y: 35,
      pinX: 76,
      pinY: 42,
      color: '#67e8f9',
      bgColor: 'rgba(103, 232, 249, 0.2)',
      icon: ThermometerSnowflake,
      grade: 'polar-freezer',
      tempRange: '-50°C to +15°C',
      specs: 'Polar Cryogenic Blue PVC • Stays Flexible at -50°C • Food Contact Safe',
      description: 'Formulated with specialized non-freezing plasticizers that retain soft, crack-proof flexibility in sub-zero blast freezers down to -50°C.',
      benefits: ['Suppresses Ice & Frost Build-Up', 'Retains 84% Refrigerated Air Energy', 'Certified Food Contact & HACCP Safe']
    },
    {
      id: 'anti-insects',
      label: 'ANTI INSECTS',
      sublabel: 'Yellow Amber Optical Frequency Blocker',
      shortTag: 'ANTI INSECT',
      x: 82,
      y: 64,
      pinX: 74,
      pinY: 60,
      color: '#eab308',
      bgColor: 'rgba(234, 179, 8, 0.2)',
      icon: Bug,
      grade: 'anti-insect',
      tempRange: '-15°C to +50°C',
      specs: '570nm Wavelength Spectral Blocker • Lemongrass Infused Compound',
      description: 'Emits a distinctive yellow-amber optical spectrum that disrupts flying insect vision, preventing pests from entering food & pharma units.',
      benefits: ['Repels 98%+ Flying Insects & Moths', 'Essential for Food Industry Hygiene (FSSAI/FDA)', 'Infused with Natural Lemongrass Fragrance']
    },
    {
      id: 'sliding-system',
      label: 'SLIDING SYSTEM',
      sublabel: 'Aluminium / SS304 Sliding Track Assembly',
      shortTag: 'SLIDING RAIL',
      x: 74,
      y: 82,
      pinX: 65,
      pinY: 72,
      color: '#F27D26',
      bgColor: 'rgba(242, 125, 38, 0.2)',
      icon: Sliders,
      grade: 'standard-clear',
      tempRange: 'All Climates',
      specs: 'Dual Bi-Parting / Single-Slide Rail • Heavy Duty Ball-Bearing Trolleys',
      description: 'Bi-parting or single-slide track mechanism allowing entire curtain assemblies to slide smoothly out of the way for wide cargo moves.',
      benefits: ['100% Clear Doorway Clearance on Demand', 'Heavy-Duty Ball Bearing Rollers', 'Smooth One-Hand Glide Operation']
    }
  ];

  // Mouse interactive tilt handler for 3D depth effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#0B0C10] border border-white/15 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 transition-all"
    >
      {/* Top Header & Telemetry Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F27D26] animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F27D26]">
            [ 3D ISOMETRIC INDUSTRIAL FACILITY BLUEPRINT ]
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/70">
            9 INTERACTIVE ZONES
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-[#141620] border border-white/15 rounded-lg p-1 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setViewMode('architectural')}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              viewMode === 'architectural'
                ? 'bg-[#F27D26] text-white font-bold shadow'
                : 'text-white/60 hover:text-white'
            }`}
          >
            3D Cutaway
          </button>
          <button
            type="button"
            onClick={() => setViewMode('thermal')}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              viewMode === 'thermal'
                ? 'bg-cyan-500 text-black font-bold shadow'
                : 'text-white/60 hover:text-white'
            }`}
          >
            FLIR Thermal
          </button>
          <button
            type="button"
            onClick={() => setViewMode('airflow')}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              viewMode === 'airflow'
                ? 'bg-emerald-500 text-black font-bold shadow'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Airflow
          </button>
        </div>
      </div>

      {/* 3D Isometric Viewport Container with Dynamic Perspective Tilt */}
      <div 
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#07080B] rounded-xl overflow-hidden border border-white/10 flex items-center justify-center select-none"
        style={{
          perspective: '1200px'
        }}
      >
        {/* Transformable 3D Cutaway Building Scene */}
        <div 
          className="relative w-full h-full transition-transform duration-300 ease-out flex items-center justify-center"
          style={{
            transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${zoomLevel})`
          }}
        >
          {/* Main 3D Isometric Factory Cutaway Graphic (High-Fidelity Architectural Vector Graphic) */}
          <svg 
            viewBox="0 0 1000 620" 
            className="w-full h-full object-contain pointer-events-none select-none"
          >
            <defs>
              {/* Floor Pattern */}
              <pattern id="iso-floor-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
              </pattern>

              {/* Realistic Brick & Concrete Wall Shaders */}
              <linearGradient id="brick-wall-left" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4a2518" />
                <stop offset="50%" stopColor="#371c12" />
                <stop offset="100%" stopColor="#25130d" />
              </linearGradient>

              <linearGradient id="brick-wall-right" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#633120" />
                <stop offset="50%" stopColor="#482216" />
                <stop offset="100%" stopColor="#2f160e" />
              </linearGradient>

              <linearGradient id="internal-wall-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2a2e3d" />
                <stop offset="100%" stopColor="#171922" />
              </linearGradient>

              <linearGradient id="floor-concrete-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e222e" />
                <stop offset="60%" stopColor="#13161f" />
                <stop offset="100%" stopColor="#0c0e14" />
              </linearGradient>

              {/* Thermal Mode Heatmap Gradients */}
              <linearGradient id="thermal-cold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#082f49" stopOpacity="0.2" />
              </linearGradient>

              <linearGradient id="thermal-hot-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#ea580c" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.1" />
              </linearGradient>

              {/* Strip Curtains Visual Ribbon Patterns */}
              <linearGradient id="curtain-amber" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="curtain-green" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#15803d" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#22c55e" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#166534" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="curtain-polar" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
              </linearGradient>

              <linearGradient id="curtain-clear" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#64748b" stopOpacity="0.5" />
              </linearGradient>

              <linearGradient id="curtain-opaque" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.98" />
                <stop offset="50%" stopColor="#1e293b" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0.98" />
              </linearGradient>

              {/* Ambient Glow Filters */}
              <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Isometric Hologram Grid */}
            <rect width="1000" height="620" fill="url(#iso-floor-grid)" />

            {/* ========================================================================= */}
            {/* 3D BUILDING FOUNDATION & REALISTIC BRICK PERIMETER WALLS */}
            {/* ========================================================================= */}
            
            {/* Main Cutaway Factory Floor (Isometric Diamond Base) */}
            <polygon 
              points="500,70 930,285 500,560 70,345" 
              fill="url(#floor-concrete-grad)" 
              stroke="#3b4254" 
              strokeWidth="2" 
            />

            {/* Floor Room Markings & Boundaries */}
            {/* Main Cross Partition Lines */}
            <line x1="500" y1="70" x2="500" y2="560" stroke="#4b5563" strokeWidth="1.5" strokeDasharray="6 3" />
            <line x1="70" y1="345" x2="930" y2="285" stroke="#4b5563" strokeWidth="1.5" strokeDasharray="6 3" />

            {/* Back Left Brick Wall (Cutaway Outer Shell) */}
            <polygon points="70,345 500,70 500,30 70,305" fill="url(#brick-wall-left)" stroke="#6b3420" strokeWidth="2" />
            {/* Brick pattern lines on Left Wall */}
            <line x1="170" y1="280" x2="170" y2="320" stroke="#7c3f28" strokeWidth="1" />
            <line x1="270" y1="218" x2="270" y2="258" stroke="#7c3f28" strokeWidth="1" />
            <line x1="370" y1="155" x2="370" y2="195" stroke="#7c3f28" strokeWidth="1" />

            {/* Back Right Brick Wall (Cutaway Outer Shell) */}
            <polygon points="500,70 930,285 930,245 500,30" fill="url(#brick-wall-right)" stroke="#803f26" strokeWidth="2" />
            {/* Brick pattern lines on Right Wall */}
            <line x1="600" y1="120" x2="600" y2="160" stroke="#92492d" strokeWidth="1" />
            <line x1="700" y1="170" x2="700" y2="210" stroke="#92492d" strokeWidth="1" />
            <line x1="800" y1="220" x2="800" y2="260" stroke="#92492d" strokeWidth="1" />

            {/* Front Cutaway Brick Foundation Base (Front Left Wall & Front Right Wall Steps) */}
            <polygon points="70,345 500,560 500,590 70,375" fill="#20110a" stroke="#452316" strokeWidth="2" />
            <polygon points="500,560 930,285 930,315 500,590" fill="#2e180e" stroke="#452316" strokeWidth="2" />

            {/* ========================================================================= */}
            {/* INTERNAL ROOM PARTITIONS & 3D HARDWARE FIXTURES */}
            {/* ========================================================================= */}

            {/* ROOM 1: SUB-ZERO COLD ROOM & BLAST FREEZER (-50°C ZONE) [Top Right] */}
            <polygon 
              points="600,165 860,270 730,345 470,240" 
              fill={viewMode === 'thermal' ? 'url(#thermal-cold-grad)' : 'rgba(56, 189, 248, 0.12)'} 
              stroke="#38bdf8" 
              strokeWidth="2" 
              strokeDasharray={viewMode === 'thermal' ? 'none' : '4 2'} 
            />
            {/* Cold Room Racks & Pallets */}
            <line x1="660" y1="180" x2="780" y2="240" stroke="#64748b" strokeWidth="5" />
            <line x1="660" y1="195" x2="780" y2="255" stroke="#64748b" strokeWidth="5" />
            {/* Cold mist / vapor drifting */}
            <ellipse cx="680" cy="250" rx="40" ry="18" fill="rgba(103, 232, 249, 0.15)" filter="url(#glow-orange)" />

            {/* Cold Room Hanging Polar PVC Strip Curtain (Doorway) */}
            <rect x="520" y="215" width="45" height="40" fill="url(#curtain-polar)" rx="2" stroke="#38bdf8" strokeWidth="1" />
            {/* Individual Strip Slits */}
            <line x1="529" y1="215" x2="529" y2="255" stroke="#0284c7" strokeWidth="1" />
            <line x1="538" y1="215" x2="538" y2="255" stroke="#0284c7" strokeWidth="1" />
            <line x1="547" y1="215" x2="547" y2="255" stroke="#0284c7" strokeWidth="1" />
            <line x1="556" y1="215" x2="556" y2="255" stroke="#0284c7" strokeWidth="1" />
            {/* SS304 Hanging Track on top */}
            <line x1="515" y1="215" x2="570" y2="215" stroke="#cbd5e1" strokeWidth="3" />

            {/* ROOM 2: PHARMA & CLEANROOM / MAINTAIN HUMIDITY [Center-Right] */}
            <polygon 
              points="470,240 730,345 600,430 340,325" 
              fill={viewMode === 'thermal' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(6, 182, 212, 0.1)'} 
              stroke="#06b6d4" 
              strokeWidth="1.8" 
            />
            {/* Cleanroom Tables & Formulation Vessels */}
            <rect x="510" y="320" width="30" height="20" rx="3" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="560" cy="330" r="10" fill="#475569" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Anti-Insect Amber Curtain on Cleanroom Gateway */}
            <rect x="660" y="310" width="40" height="42" fill="url(#curtain-amber)" rx="2" stroke="#eab308" strokeWidth="1" />
            <line x1="668" y1="310" x2="668" y2="352" stroke="#ca8a04" strokeWidth="1" />
            <line x1="676" y1="310" x2="676" y2="352" stroke="#ca8a04" strokeWidth="1" />
            <line x1="684" y1="310" x2="684" y2="352" stroke="#ca8a04" strokeWidth="1" />
            <line x1="692" y1="310" x2="692" y2="352" stroke="#ca8a04" strokeWidth="1" />
            {/* Track on top */}
            <line x1="655" y1="310" x2="705" y2="310" stroke="#fef08a" strokeWidth="3" />

            {/* ROOM 3: WELDING & FABRICATION SCREEN CABIN [Top Left] */}
            <polygon 
              points="360,135 490,195 400,250 270,190" 
              fill={viewMode === 'thermal' ? 'url(#thermal-hot-grad)' : 'rgba(34, 197, 94, 0.15)'} 
              stroke="#22c55e" 
              strokeWidth="2" 
            />
            {/* Welding Table with simulated Arc Flash */}
            <rect x="360" y="180" width="25" height="18" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <circle cx="372" cy="188" r="4" fill="#86efac" filter="url(#glow-orange)" />
            {/* Green Welding Screen Curtain Partition */}
            <rect x="320" y="160" width="45" height="38" fill="url(#curtain-green)" rx="2" stroke="#22c55e" strokeWidth="1" />
            <line x1="329" y1="160" x2="329" y2="198" stroke="#15803d" strokeWidth="1" />
            <line x1="338" y1="160" x2="338" y2="198" stroke="#15803d" strokeWidth="1" />
            <line x1="347" y1="160" x2="347" y2="198" stroke="#15803d" strokeWidth="1" />
            <line x1="356" y1="160" x2="356" y2="198" stroke="#15803d" strokeWidth="1" />

            {/* ROOM 4: DISPATCH GOODS & LOADING DOCK BAY [Bottom Left] */}
            <polygon 
              points="240,210 470,325 340,415 110,300" 
              fill="rgba(245, 158, 11, 0.12)" 
              stroke="#f59e0b" 
              strokeWidth="2" 
            />
            {/* Forklift Vehicle Graphic */}
            <g transform="translate(200, 270)">
              <rect x="0" y="0" width="36" height="22" rx="4" fill="#f59e0b" stroke="#000" strokeWidth="1.5" />
              <rect x="26" y="-8" width="8" height="30" fill="#334155" />
              <circle cx="8" cy="22" r="5" fill="#0f172a" />
              <circle cx="28" cy="22" r="5" fill="#0f172a" />
              {/* Pallet with Boxes */}
              <rect x="34" y="2" width="16" height="14" fill="#b45309" stroke="#78350f" strokeWidth="1" />
            </g>

            {/* Double Ribbed Dispatch Curtain on Loading Gate */}
            <rect x="150" y="270" width="50" height="52" fill="url(#curtain-clear)" rx="2" stroke="#f59e0b" strokeWidth="1.5" />
            {/* Double Rib Lines */}
            <line x1="160" y1="270" x2="160" y2="322" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="163" y1="270" x2="163" y2="322" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="175" y1="270" x2="175" y2="322" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="178" y1="270" x2="178" y2="322" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="190" y1="270" x2="190" y2="322" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="193" y1="270" x2="193" y2="322" stroke="#f59e0b" strokeWidth="1.5" />

            {/* ROOM 5: OPAC PRIVACY & DARKROOM ENCLOSURE [Right Center] */}
            <polygon 
              points="690,140 820,200 750,250 620,190" 
              fill="rgba(168, 85, 247, 0.15)" 
              stroke="#a855f7" 
              strokeWidth="1.8" 
            />
            {/* Opaque Black PVC Partition */}
            <rect x="730" y="165" width="40" height="38" fill="url(#curtain-opaque)" rx="2" stroke="#a855f7" strokeWidth="1" />

            {/* SLIDING SYSTEM OVERHEAD TRACK RAIL (Front Access Portal) */}
            <line x1="450" y1="480" x2="720" y2="360" stroke="#F27D26" strokeWidth="4" />
            <line x1="450" y1="480" x2="720" y2="360" stroke="#fed7aa" strokeWidth="1.5" strokeDasharray="8 4" />
            {/* Sliding Trolley Carriages */}
            <circle cx="560" cy="430" r="4" fill="#F27D26" stroke="#fff" strokeWidth="1" />
            <circle cx="610" cy="408" r="4" fill="#F27D26" stroke="#fff" strokeWidth="1" />
            {/* Bi-Parting Curtain Panels */}
            <rect x="540" y="435" width="35" height="42" fill="url(#curtain-clear)" rx="2" stroke="#F27D26" strokeWidth="1" />
            <rect x="590" y="413" width="35" height="42" fill="url(#curtain-clear)" rx="2" stroke="#F27D26" strokeWidth="1" />

            {/* Dynamic Airflow Simulation Vectors (if airflow mode active) */}
            {viewMode === 'airflow' && (
              <g stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8">
                <path d="M 120 310 Q 240 280 340 325" fill="none" />
                <path d="M 470 240 Q 600 200 730 250" fill="none" stroke="#22c55e" />
                <path d="M 500 500 Q 600 450 700 370" fill="none" stroke="#F27D26" />
              </g>
            )}

            {/* Leader Lines Connecting 3D Hotspot Nodes to Model Positions */}
            {hotspots.map((spot) => {
              const isHovered = hoveredHotspot === spot.id;
              const isSelected = activeHotspot?.id === spot.id;

              return (
                <g key={`leader-${spot.id}`}>
                  {/* Glowing Leader Line from Badge to Pin Point */}
                  <line 
                    x1={`${spot.x * 10}`} 
                    y1={`${spot.y * 6.2}`} 
                    x2={`${spot.pinX * 10}`} 
                    y2={`${spot.pinY * 6.2}`} 
                    stroke={spot.color} 
                    strokeWidth={isSelected || isHovered ? "2.5" : "1.2"} 
                    strokeDasharray={isSelected ? "none" : "3 2"} 
                    opacity={isSelected || isHovered ? 1 : 0.6}
                  />
                  {/* Pin Ground Target Indicator */}
                  <circle 
                    cx={`${spot.pinX * 10}`} 
                    cy={`${spot.pinY * 6.2}`} 
                    r={isSelected || isHovered ? 5 : 3.5} 
                    fill={spot.color} 
                    stroke="#000" 
                    strokeWidth="1.5" 
                  />
                </g>
              );
            })}
          </svg>

          {/* ========================================================================= */}
          {/* HTML INTERACTIVE CALLOUT TAGS & TOOLTIPS OVERLAY */}
          {/* ========================================================================= */}
          {hotspots.map((spot) => {
            const Icon = spot.icon;
            const isHovered = hoveredHotspot === spot.id;
            const isSelected = activeHotspot?.id === spot.id;

            return (
              <div
                key={spot.id}
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className="absolute z-30"
                onMouseEnter={() => setHoveredHotspot(spot.id)}
                onMouseLeave={() => setHoveredHotspot(null)}
              >
                {/* 3D Callout Button Badge */}
                <button
                  type="button"
                  onClick={() => setActiveHotspot(spot)}
                  className="relative group cursor-pointer focus:outline-none"
                  aria-label={spot.label}
                >
                  {/* Pulse wave ring on selection/hover */}
                  {(isHovered || isSelected) && (
                    <span
                      className="absolute -inset-2 rounded-full opacity-75 animate-ping pointer-events-none"
                      style={{ backgroundColor: spot.color }}
                    />
                  )}

                  {/* Main Callout Badge */}
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border shadow-2xl transition-all duration-300 text-[10px] sm:text-[11px] font-mono font-bold whitespace-nowrap ${
                      isSelected || isHovered
                        ? 'scale-110 ring-2 z-40'
                        : 'scale-100 hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: isSelected || isHovered ? spot.color : '#0f1118',
                      borderColor: spot.color,
                      color: isSelected || isHovered ? '#000000' : spot.color,
                      boxShadow: `0 4px 20px ${spot.color}55`
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{spot.label}</span>
                  </div>
                </button>

                {/* Hover Quick Preview Card */}
                <AnimatePresence>
                  {isHovered && !isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#13151F]/95 backdrop-blur-xl border rounded-xl shadow-2xl z-50 pointer-events-none"
                      style={{ borderColor: spot.color }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-white font-mono">{spot.label}</span>
                        <span 
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold text-black"
                          style={{ backgroundColor: spot.color }}
                        >
                          {spot.shortTag}
                        </span>
                      </div>
                      <div className="text-[10px] text-white/70 font-mono leading-tight mb-2">
                        {spot.sublabel}
                      </div>
                      <div className="text-[9px] font-mono text-[#F27D26] flex items-center gap-1 font-bold">
                        <span>Click to inspect 3D specs</span>
                        <span>&rarr;</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Viewport Zoom & Control Tools (Bottom Right) */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/75 backdrop-blur-md border border-white/15 rounded-lg p-1 text-white/70 z-20 text-xs font-mono">
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))}
            title="Zoom In"
            className="p-1.5 hover:text-white hover:bg-white/10 rounded cursor-pointer transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.85))}
            title="Zoom Out"
            className="p-1.5 hover:text-white hover:bg-white/10 rounded cursor-pointer transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setZoomLevel(1);
              setTilt({ x: 0, y: 0 });
            }}
            title="Reset Perspective"
            className="p-1.5 hover:text-white hover:bg-white/10 rounded cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACTIVE HOTSPOT DETAILED TECHNICAL INSPECTION DRAWER */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-4 p-4 sm:p-5 bg-[#131620] border border-white/15 rounded-xl text-white relative shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setActiveHotspot(null)}
              className="absolute top-3 right-3 text-white/40 hover:text-white p-1 rounded-md text-xs font-mono cursor-pointer"
            >
              ✕ Close
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-black shadow-lg"
                  style={{ backgroundColor: activeHotspot.color }}
                >
                  <activeHotspot.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white font-mono">{activeHotspot.label}</h4>
                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-black"
                      style={{ backgroundColor: activeHotspot.color }}
                    >
                      {activeHotspot.shortTag}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 font-mono">{activeHotspot.sublabel}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {onSelectHotspotGrade && (
                  <button
                    type="button"
                    onClick={() => onSelectHotspotGrade(activeHotspot.grade)}
                    className="px-4 py-2 bg-[#F27D26] hover:bg-[#ff8f3d] text-white font-mono font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#F27D26]/30 cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Launch in 3D CAD</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {onOpenQuoteModal && (
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(activeHotspot.grade)}
                    className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-lg border border-white/15 transition-all cursor-pointer"
                  >
                    <span>Instant Quote</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-white/80 leading-relaxed mb-3">
              {activeHotspot.description}
            </p>

            {/* Specifications & Temperature Banner */}
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/70 mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <strong className="text-white">Technical Formula: </strong>
                <span>{activeHotspot.specs}</span>
              </div>
              <div className="text-[#F27D26] font-bold">
                Temp Range: {activeHotspot.tempRange}
              </div>
            </div>

            {/* 3 Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeHotspot.benefits.map((b, idx) => (
                <div key={idx} className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-[11px] font-mono text-white/80 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: activeHotspot.color }} />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
