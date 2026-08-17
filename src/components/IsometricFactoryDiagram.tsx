import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  ArrowRight,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Play,
  Pause,
  Move,
  Maximize2
} from 'lucide-react';
import { PVCGrade } from '../types';

export interface Hotspot {
  id: string;
  label: string;
  sublabel: string;
  shortTag: string;
  badgeX: number; // badge percentage (0-100)
  badgeY: number;
  pinX: number; // target door/location percentage (0-100)
  pinY: number;
  color: string;
  textColor: string;
  bgColor: string;
  icon: React.ElementType;
  grade: PVCGrade;
  category: 'safety' | 'thermal' | 'traffic' | 'privacy';
  description: string;
  specs: string;
  tempRange: string;
  benefits: string[];
}

interface IsometricFactoryDiagramProps {
  onSelectHotspotGrade?: (grade: PVCGrade) => void;
  onOpenQuoteModal?: (grade?: PVCGrade) => void;
}

type ViewMode = 'architectural' | 'thermal' | 'airflow';

export const IsometricFactoryDiagram: React.FC<IsometricFactoryDiagramProps> = ({
  onSelectHotspotGrade,
  onOpenQuoteModal
}) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('architectural');
  const [filterCategory, setFilterCategory] = useState<'all' | 'thermal' | 'safety' | 'traffic'>('all');
  
  // 3D Rotational & Pan-Zoom Interactive State
  const [rotationY, setRotationY] = useState<number>(0);
  const [rotationX, setRotationX] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isPanning, setIsPanning] = useState<boolean>(false);

  const dragStartRef = useRef<{ x: number; y: number; rotY: number; rotX: number; panX: number; panY: number }>({ 
    x: 0, 
    y: 0, 
    rotY: 0, 
    rotX: 0,
    panX: 0,
    panY: 0
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Exact 9 Industrial Application Zones with wide perimeter spacing and zero overlapping
  const hotspots: Hotspot[] = [
    {
      id: 'welding-screen',
      label: 'WELDING SCREEN',
      sublabel: 'Dark Green Protective Arc Radiation Filter',
      shortTag: 'WELD BAY',
      badgeX: 50,
      badgeY: 6,
      pinX: 54,
      pinY: 26,
      color: '#16a34a',
      textColor: '#ffffff',
      bgColor: 'rgba(22, 163, 74, 0.95)',
      icon: Flame,
      grade: 'multi-green',
      category: 'safety',
      tempRange: '-15°C to +50°C',
      specs: '300mm x 3mm Bronze/Green • ISO 25980 / EN 1598 Certified UV Blocker',
      description: 'Filters 99.9% hazardous UV and blue light arc radiation emitted during MIG/TIG/Stick welding, protecting adjacent facility workers from flash burns.',
      benefits: ['Blocks 99.9% Harmful UV Arc Radiation', 'Flame Retardant DIN 4102 B1 Self-Extinguishing', 'Maintains Floor Visual Supervision']
    },
    {
      id: 'dust-protection',
      label: 'DUST PROTECTION',
      sublabel: 'Standard Clear PVC / Mezzanine Partition',
      shortTag: 'DUST BARRIER',
      badgeX: 10,
      badgeY: 15,
      pinX: 25,
      pinY: 38,
      color: '#0284c7',
      textColor: '#ffffff',
      bgColor: 'rgba(2, 132, 199, 0.95)',
      icon: ShieldCheck,
      grade: 'transparent',
      category: 'safety',
      tempRange: '-15°C to +50°C',
      specs: '200mm x 2mm & 300mm x 3mm 100% Virgin Polymer Clear • 92% Optical Clarity',
      description: 'Isolates airborne dust, sawdust, chemical powders, and particulates between office partitions and manufacturing floors.',
      benefits: ['High Efficiency Particulate Containment', 'High-Clarity Optical Grade Virgin Polymer', 'Reduces HVAC Filter Clogging & Wear']
    },
    {
      id: 'noise-reduction',
      label: 'NOISE REDUCTION',
      sublabel: 'Acoustic Sound Barrier Partition',
      shortTag: 'ACOUSTIC',
      badgeX: 8,
      badgeY: 46,
      pinX: 28,
      pinY: 48,
      color: '#db2777',
      textColor: '#ffffff',
      bgColor: 'rgba(219, 39, 119, 0.95)',
      icon: VolumeX,
      grade: 'gray',
      category: 'safety',
      tempRange: '-15°C to +50°C',
      specs: 'Heavy Gauge 4mm Polymer Acoustic Barrier • -18dB to -24dB Noise Drop',
      description: 'High-density PVC polymer strips dampen high-decibel industrial machinery noise across plant assembly lines and grinding shops.',
      benefits: ['Up to -24dB Industrial Acoustic Attenuation', 'Separates Loud Grinding & Power Presses', 'Easy Walk-Through Accessibility']
    },
    {
      id: 'dispatch-goods',
      label: 'DISPATCH GOODS',
      sublabel: 'Double Ribbed Heavy-Duty Dock Bay Entrance',
      shortTag: 'DOCK BAY',
      badgeX: 10,
      badgeY: 74,
      pinX: 21,
      pinY: 67,
      color: '#0077ED', // Electric blue for dispatch goods
      textColor: '#ffffff',
      bgColor: 'rgba(0, 119, 237, 0.95)',
      icon: Truck,
      grade: 'standard-ribbed',
      category: 'traffic',
      tempRange: '-20°C to +60°C',
      specs: '300mm x 3mm & 400mm x 4mm Dual Raised Ribs • 67% Overlap • Heavy Traffic',
      description: 'Raised dual ribs absorb mechanical abrasion from forklift tines and heavy pallets, keeping clear viewing windows scratch-free for years.',
      benefits: ['300% Extended Wear Life under Forklifts', 'High Impact Shock Absorption', 'Maintains Driver Visibility & Safety']
    },
    {
      id: 'maintain-humidity',
      label: 'MAINTAIN HUMIDITY',
      sublabel: 'Cleanroom & Assembly Controlled Climate Air Lock',
      shortTag: 'HUMIDITY',
      badgeX: 34,
      badgeY: 90,
      pinX: 43,
      pinY: 60,
      color: '#0891b2',
      textColor: '#ffffff',
      bgColor: 'rgba(8, 145, 178, 0.95)',
      icon: Droplets,
      grade: 'blue-natural',
      category: 'thermal',
      tempRange: '-15°C to +50°C',
      specs: 'Anti-Static ESD Safe Clear • 50% Overlap • Positive Pressure Seal',
      description: 'Maintains critical Relative Humidity (RH) levels and ESD safety in pharmaceutical packaging, electronic assembly, and cleanrooms.',
      benefits: ['Prevents Atmospheric Humidity Drift', 'Reduces Climate Control HVAC Cycles', 'Anti-Static ESD Safe Surface Resistivity']
    },
    {
      id: 'freezer-grade',
      label: 'FREEZER GRADE UP TO -50',
      sublabel: 'Polar Cryogenic Sub-Zero Cold Storage Doorway',
      shortTag: '-50°C FREEZER',
      badgeX: 70,
      badgeY: 90,
      pinX: 35,
      pinY: 74,
      color: '#0284c7',
      textColor: '#ffffff',
      bgColor: 'rgba(2, 132, 199, 0.95)',
      icon: ThermometerSnowflake,
      grade: 'sky-blue',
      category: 'thermal',
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
      badgeX: 58,
      badgeY: 36,
      pinX: 41,
      pinY: 47,
      color: '#ca8a04',
      textColor: '#ffffff',
      bgColor: 'rgba(202, 138, 4, 0.95)',
      icon: Bug,
      grade: 'orange-amber',
      category: 'safety',
      tempRange: '-15°C to +50°C',
      specs: 'Yellow Citronella Infused PVC • 500nm Insect Vision Filter Wave',
      description: 'Emits a special yellow-amber optical wave that appears completely black and invisible to flying insects, keeping food processing flies-free.',
      benefits: ['Blocks 88% Flying Mosquitoes & Insects', 'FDA/FSSAI Food Processing Compliant', 'Non-Toxic Lemon/Citronella Scent']
    },
    {
      id: 'opac',
      label: 'OPAC PRIVACY',
      sublabel: 'Opaque Blue / Visual Barrier Doorway',
      shortTag: 'OPAC ZONE',
      badgeX: 88,
      badgeY: 46,
      pinX: 31,
      pinY: 53,
      color: '#7c3aed',
      textColor: '#ffffff',
      bgColor: 'rgba(124, 58, 237, 0.95)',
      icon: EyeOff,
      grade: 'navy-blue',
      category: 'privacy',
      tempRange: '-15°C to +50°C',
      specs: '100% Light-Blocking Solid PVC • Zero Transmittance Privacy Curtain',
      description: 'Total visual privacy partition for confidential manufacturing cells, testing darkrooms, chemical wash bays, or restricted areas.',
      benefits: ['Zero Optical Transmittance (100% Privacy)', 'Conceals Storage & Sensitive R&D Operations', 'Tear-Resistant Heavy Polymer']
    },
    {
      id: 'sliding-system',
      label: 'SLIDING SYSTEM',
      sublabel: 'Bi-Parting Sliding Track Rail Mechanism',
      shortTag: 'SLIDING TRACK',
      badgeX: 84,
      badgeY: 15,
      pinX: 35,
      pinY: 38,
      color: '#2563eb',
      textColor: '#ffffff',
      bgColor: 'rgba(37, 99, 235, 0.95)',
      icon: Sliders,
      grade: 'transparent',
      category: 'traffic',
      tempRange: '-20°C to +60°C',
      specs: 'Heavy-Duty Galvanized / SS 304 Ball Bearing Overhead Sliding Track',
      description: 'Allows entire curtain packs to slide smoothly out of the doorway when oversized pallets, wide machinery, or vehicles require unobstructed passage.',
      benefits: ['100% Clear Doorway on Demand', 'Smooth Sealed Ball-Bearing Roller Glides', 'Heavy Industrial SS 304 Construction']
    }
  ];

  const filteredHotspots = hotspots.filter(h => {
    if (filterCategory === 'all') return true;
    return h.category === filterCategory;
  });

  // Pointer Down for 3D Orbit or Pan
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    if (zoomLevel > 1 && !('touches' in e && e.touches.length > 1)) {
      setIsPanning(true);
    } else {
      setIsDragging(true);
    }
    
    dragStartRef.current = {
      x: clientX,
      y: clientY,
      rotY: rotationY,
      rotX: rotationX,
      panX: panPosition.x,
      panY: panPosition.y
    };
  };

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging && !isPanning) return;
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;
    
    if (isPanning && zoomLevel > 1) {
      // Pan image smoothly when zoomed in
      setPanPosition({
        x: dragStartRef.current.panX + deltaX,
        y: dragStartRef.current.panY + deltaY
      });
    } else if (isDragging) {
      // 3D perspective orbit with natural limits
      const newRotY = Math.max(-45, Math.min(45, dragStartRef.current.rotY + deltaX * 0.35));
      const newRotX = Math.max(-20, Math.min(25, dragStartRef.current.rotX - deltaY * 0.25));
      
      setRotationY(newRotY);
      setRotationX(newRotX);
    }
  }, [isDragging, isPanning, zoomLevel]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    setIsPanning(false);
  }, []);

  // Global mouseup listener for drag release outside container
  useEffect(() => {
    const onWindowPointerUp = () => {
      setIsDragging(false);
      setIsPanning(false);
    };
    const onWindowPointerMove = (e: MouseEvent) => {
      if (isDragging || isPanning) handlePointerMove(e.clientX, e.clientY);
    };
    window.addEventListener('mouseup', onWindowPointerUp);
    window.addEventListener('mousemove', onWindowPointerMove);
    return () => {
      window.removeEventListener('mouseup', onWindowPointerUp);
      window.removeEventListener('mousemove', onWindowPointerMove);
    };
  }, [isDragging, isPanning, handlePointerMove]);

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoomLevel(prev => Math.min(prev + 0.15, 2.5));
    } else {
      setZoomLevel(prev => {
        const next = Math.max(prev - 0.15, 1);
        if (next === 1) setPanPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  const resetView = () => {
    setZoomLevel(1);
    setRotationY(0);
    setRotationX(0);
    setPanPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-[#FFFFFF] border border-[#D8D2C5] rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 transition-all"
    >
      {/* Top Header & Telemetry Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E2DDD2]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0077ED] animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0077ED]">
              [ 8K REALISTIC 3D INDUSTRIAL FACILITY BLUEPRINT ]
            </span>
          </div>
          <p className="text-xs text-[#475569] font-normal">
            Drag to rotate 3D angle. Scroll or use controls to zoom into every room and PVC doorway.
          </p>
        </div>

        {/* View Mode & Preset Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-[#FAF8F5] border border-[#D8D2C5] rounded-xl p-1 text-[11px] font-mono shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode('architectural')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                viewMode === 'architectural'
                  ? 'bg-[#0077ED] text-white shadow-sm'
                  : 'text-[#475569] hover:text-[#0077ED]'
              }`}
            >
              8K Real Cutaway
            </button>
            <button
              type="button"
              onClick={() => setViewMode('thermal')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                viewMode === 'thermal'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-[#475569] hover:text-[#0077ED]'
              }`}
            >
              FLIR Thermal
            </button>
            <button
              type="button"
              onClick={() => setViewMode('airflow')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                viewMode === 'airflow'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-[#475569] hover:text-[#0077ED]'
              }`}
            >
              CFD Airflow
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter & 360 Camera Preset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-2 text-[10px] font-mono border-b border-[#F0EBE0]">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[#64748B] font-bold uppercase mr-1">Filter:</span>
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-bold whitespace-nowrap ${
              filterCategory === 'all'
                ? 'bg-[#0F172A] text-white border-[#0F172A]'
                : 'bg-[#FAF8F5] border-[#E2DDD2] text-[#475569] hover:border-[#0077ED]'
            }`}
          >
            All 9 Locations
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('thermal')}
            className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-bold whitespace-nowrap ${
              filterCategory === 'thermal'
                ? 'bg-[#0284c7] text-white border-[#0284c7]'
                : 'bg-[#FAF8F5] border-[#E2DDD2] text-[#475569] hover:border-[#0077ED]'
            }`}
          >
            ❄️ Cold (-50°C)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('safety')}
            className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-bold whitespace-nowrap ${
              filterCategory === 'safety'
                ? 'bg-[#16a34a] text-white border-[#16a34a]'
                : 'bg-[#FAF8F5] border-[#E2DDD2] text-[#475569] hover:border-[#0077ED]'
            }`}
          >
            🛡️ Welding &amp; Insects
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('traffic')}
            className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-bold whitespace-nowrap ${
              filterCategory === 'traffic'
                ? 'bg-[#d97706] text-white border-[#d97706]'
                : 'bg-[#FAF8F5] border-[#E2DDD2] text-[#475569] hover:border-[#0077ED]'
            }`}
          >
            🚛 Forklift Dock
          </button>
        </div>

        {/* Quick Angle Presets */}
        <div className="flex items-center gap-1.5">
          <span className="text-[#64748B] font-bold uppercase mr-1">3D View:</span>
          <button
            type="button"
            onClick={() => { setRotationY(0); setRotationX(0); }}
            className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono font-bold transition-all cursor-pointer ${
              Math.abs(rotationY) < 5 && Math.abs(rotationX) < 5
                ? 'bg-[#0077ED] text-white border-[#0077ED] shadow-xs'
                : 'bg-transparent border-[#D8D2C5] text-[#334155] hover:bg-black/5'
            }`}
          >
            Iso (0°)
          </button>
          <button
            type="button"
            onClick={() => { setRotationY(20); setRotationX(10); }}
            className="px-2.5 py-1 bg-transparent hover:bg-black/5 border border-[#D8D2C5] text-[#334155] rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer"
          >
            Angle (+20°)
          </button>
          <button
            type="button"
            onClick={() => { setRotationY(-20); setRotationX(8); }}
            className="px-2.5 py-1 bg-transparent hover:bg-black/5 border border-[#D8D2C5] text-[#334155] rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer"
          >
            Mezzanine (-20°)
          </button>
        </div>
      </div>

      {/* 3D Isometric Viewport Container with Dynamic Perspective Tilt & Drag Orbit */}
      <div 
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        onWheel={handleWheel}
        className={`relative w-full aspect-[16/9] bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#E2DDD2] flex items-center justify-center select-none shadow-inner ${
          zoomLevel > 1 
            ? (isPanning ? 'cursor-grabbing' : 'cursor-grab')
            : (isDragging ? 'cursor-grabbing' : 'cursor-grab')
        }`}
        style={{ perspective: '1600px' }}
      >
        {/* Transformable 3D Cutaway Building Scene with Pan & Zoom */}
        <div 
          className="relative w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translate3d(${panPosition.x}px, ${panPosition.y}px, 0) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${zoomLevel})`
          }}
        >
          {/* Real High Resolution 8K 3D Architectural Cutaway Background Image */}
          <img 
            src="/images/realistic_factory_cutaway.jpg" 
            alt="Real 3D Isometric Industrial Factory Cutaway Blueprint" 
            className="w-full h-full object-cover select-none pointer-events-none rounded-xl"
            loading="eager"
            draggable={false}
          />

          {/* FLIR Thermal Heatmap Overlay */}
          {viewMode === 'thermal' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none mix-blend-color-dodge bg-gradient-to-tr from-cyan-900/60 via-blue-900/30 to-amber-900/40 rounded-xl"
            >
              <div className="absolute top-[60%] left-[32%] w-48 h-36 rounded-full bg-cyan-400/50 blur-2xl animate-pulse" />
              <div className="absolute top-[20%] left-[50%] w-40 h-32 rounded-full bg-red-500/40 blur-2xl" />
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
            </motion.div>
          )}

          {/* CFD Airflow Streamline Overlay */}
          {viewMode === 'airflow' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none bg-emerald-950/20 rounded-xl"
            >
              <svg className="w-full h-full opacity-70">
                <path d="M 100 300 Q 300 250 500 350 T 900 400" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="8 6" className="animate-pulse" />
                <path d="M 200 450 Q 400 380 650 480 T 850 500" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="10 8" />
              </svg>
            </motion.div>
          )}

          {/* SVG LEADER LINES & TARGET PINS LAYER */}
          <svg 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          >
            {filteredHotspots.map((spot) => {
              const isHovered = hoveredHotspot === spot.id;
              const isSelected = activeHotspot?.id === spot.id;
              const isHighlighted = isHovered || isSelected;

              return (
                <g key={`leader-${spot.id}`}>
                  {/* Angled Leader Line from Badge to Exact Doorway */}
                  <polyline
                    points={`${spot.badgeX},${spot.badgeY} ${spot.pinX},${spot.badgeY} ${spot.pinX},${spot.pinY}`}
                    fill="none"
                    stroke={isHighlighted ? spot.color : '#64748B'}
                    strokeWidth={isHighlighted ? '0.7' : '0.4'}
                    strokeDasharray={isHighlighted ? 'none' : '1.5 1'}
                    strokeOpacity={isHighlighted ? 1 : 0.8}
                    className="transition-all duration-300"
                  />

                  {/* Pulsing Target Dot on Doorway */}
                  <circle
                    cx={spot.pinX}
                    cy={spot.pinY}
                    r={isHighlighted ? '1.8' : '1.1'}
                    fill={spot.color}
                    stroke="#ffffff"
                    strokeWidth="0.4"
                    className="transition-all duration-300"
                  />

                  {/* Animated Ping Ring on Target Doorway */}
                  {isHighlighted && (
                    <circle
                      cx={spot.pinX}
                      cy={spot.pinY}
                      r="4"
                      fill="none"
                      stroke={spot.color}
                      strokeWidth="0.4"
                      className="animate-ping origin-center"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* HTML INTERACTIVE CALLOUT LABELS OVERLAY (CLEAN FLOATING TEXT, NO BULKY BOXES) */}
          {filteredHotspots.map((spot) => {
            const Icon = spot.icon;
            const isHovered = hoveredHotspot === spot.id;
            const isSelected = activeHotspot?.id === spot.id;
            const isBottomHalf = spot.badgeY > 50;

            return (
              <div
                key={spot.id}
                style={{
                  left: `${spot.badgeX}%`,
                  top: `${spot.badgeY}%`,
                  transform: 'translate(-50%, -50%)',
                  backfaceVisibility: 'hidden'
                }}
                className="absolute z-30 pointer-events-auto"
                onMouseEnter={() => setHoveredHotspot(spot.id)}
                onMouseLeave={() => setHoveredHotspot(null)}
              >
                {/* Clean Floating Text Label Button (No Heavy Box Background) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(spot);
                  }}
                  className="relative group cursor-pointer focus:outline-none flex items-center gap-1.5 py-1 px-1.5 rounded-lg transition-all"
                  aria-label={spot.label}
                >
                  {/* Glowing Status Dot */}
                  <span 
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-200 ${
                      isSelected || isHovered 
                        ? 'scale-135 ring-3 ring-white shadow-lg' 
                        : 'scale-100 ring-1.5 ring-white/90 shadow-sm'
                    }`}
                    style={{ 
                      backgroundColor: spot.color,
                      boxShadow: isSelected || isHovered ? `0 0 12px ${spot.color}` : `0 0 6px ${spot.color}88`
                    }} 
                  />

                  {/* Clean Floating Text */}
                  <span 
                    className={`text-[9.5px] sm:text-[11.5px] font-mono font-black uppercase tracking-wider transition-all duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] ${
                      isSelected || isHovered
                        ? 'scale-110 underline underline-offset-4'
                        : 'scale-100 group-hover:scale-105'
                    }`}
                    style={{ 
                      color: isSelected || isHovered 
                        ? spot.color 
                        : (spot.id === 'dispatch-goods' ? '#38BDF8' : '#FFFFFF'),
                      textShadow: '0 2px 6px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,1)'
                    }}
                  >
                    {spot.label}
                  </span>
                </button>

                {/* Smart Hover Tooltip (Pops DOWN for bottom locations so interior is NEVER blocked) */}
                <AnimatePresence>
                  {isHovered && !isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: isBottomHalf ? -6 : 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: isBottomHalf ? -4 : 4, scale: 0.95 }}
                      className={`absolute ${
                        isBottomHalf ? 'top-full mt-2' : 'bottom-full mb-2'
                      } ${
                        spot.badgeX > 75 
                          ? 'right-0' 
                          : spot.badgeX < 25 
                            ? 'left-0' 
                            : 'left-1/2 -translate-x-1/2'
                      } w-56 p-3 bg-[#0F172A]/95 text-white backdrop-blur-xl border rounded-xl shadow-2xl z-50 pointer-events-none`}
                      style={{ borderColor: spot.color }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-white font-mono">{spot.label}</span>
                        <span 
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold text-white shadow-xs"
                          style={{ backgroundColor: spot.color }}
                        >
                          {spot.shortTag}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#94A3B8] font-mono leading-tight mb-2">
                        {spot.sublabel}
                      </div>
                      <div className="text-[9px] font-mono text-[#38bdf8] flex items-center gap-1 font-bold">
                        <span>Click to inspect technical formula</span>
                        <span>&rarr;</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Viewport Bottom Status & Zoom Controls Bar (Placed outside viewport to eliminate any badge overlap) */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-[#E2DDD2] text-[11px] font-mono">
        {/* Live 3D Rotation & Zoom Telemetry */}
        <div className="flex items-center gap-2 bg-[#0F172A] text-white px-3.5 py-1.5 rounded-xl border border-[#334155] shadow-xs">
          <Move className="w-3.5 h-3.5 text-[#0077ED] animate-pulse" />
          <span>ANGLE: <strong className="text-[#0077ED]">{Math.round(rotationY)}°</strong></span>
          <span className="text-[#64748B]">|</span>
          <span>ZOOM: <strong className="text-cyan-400">{(zoomLevel * 100).toFixed(0)}%</strong></span>
          <span className="hidden sm:inline-block text-[#94A3B8]">(Drag to Rotate • Scroll to Zoom)</span>
        </div>

        {/* Viewport Zoom & Reset Controls */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-[#D8D2C5] rounded-xl p-1 text-[#475569] shadow-xs">
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
            title="Zoom In"
            className="p-1.5 hover:text-[#0077ED] hover:bg-[#EFE9DE] rounded-lg cursor-pointer transition-colors flex items-center gap-1 font-bold text-xs"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Zoom In</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setZoomLevel(prev => {
                const next = Math.max(prev - 0.25, 1);
                if (next === 1) setPanPosition({ x: 0, y: 0 });
                return next;
              });
            }}
            title="Zoom Out"
            className="p-1.5 hover:text-[#0077ED] hover:bg-[#EFE9DE] rounded-lg cursor-pointer transition-colors flex items-center gap-1 font-bold text-xs"
          >
            <ZoomOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Zoom Out</span>
          </button>
          <button
            type="button"
            onClick={resetView}
            title="Reset Perspective"
            className="p-1.5 hover:text-[#0077ED] hover:bg-[#EFE9DE] rounded-lg cursor-pointer transition-colors flex items-center gap-1 font-bold text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
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
            className="mt-4 p-5 bg-[#131620] border border-[#D8D2C5] rounded-2xl text-white relative shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#334155] pb-4 mb-4">
              {/* Left Title & Icon */}
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
                  style={{ backgroundColor: activeHotspot.color }}
                >
                  <activeHotspot.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base sm:text-lg font-bold text-[#0077ED] font-mono uppercase tracking-wide">
                      {activeHotspot.label}
                    </h4>
                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white shadow-xs"
                      style={{ backgroundColor: activeHotspot.color }}
                    >
                      {activeHotspot.shortTag}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] font-mono mt-0.5">{activeHotspot.sublabel}</p>
                </div>
              </div>

              {/* Right Action Buttons & Prominent Red Close Button (Clean Inline Layout, Zero Overlap) */}
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap flex-shrink-0">
                {onSelectHotspotGrade && (
                  <button
                    type="button"
                    onClick={() => onSelectHotspotGrade(activeHotspot.grade)}
                    className="px-4 py-2.5 bg-[#0077ED] hover:bg-[#2B8EFF] text-white font-mono font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0077ED]/30 cursor-pointer"
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
                    className="px-3.5 py-2.5 bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#0F172A] font-mono font-bold text-xs rounded-xl border border-[#D8D2C5] transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>Instant Quote</span>
                  </button>
                )}

                {/* Red Dedicated Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveHotspot(null)}
                  className="px-3.5 py-2.5 bg-red-500/15 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                  title="Close inspection drawer"
                >
                  <span className="text-sm leading-none font-bold">✕</span>
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Description in pure high-contrast white text */}
            <p className="text-xs sm:text-sm text-white leading-relaxed mb-3.5 font-normal drop-shadow-xs">
              {activeHotspot.description}
            </p>

            {/* Specifications & Temperature Banner with Technical Formula in bold black */}
            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E2DDD2] text-xs font-mono text-[#334155] mb-3 flex flex-wrap items-center justify-between gap-2 shadow-sm">
              <div>
                <strong className="text-[#000000] font-black">Technical Formula: </strong>
                <span className="text-[#0F172A] font-medium">{activeHotspot.specs}</span>
              </div>
              <div className="text-[#0077ED] font-bold font-mono">
                Temp Range: {activeHotspot.tempRange}
              </div>
            </div>

            {/* 3 Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeHotspot.benefits.map((b, idx) => (
                <div key={idx} className="p-2.5 bg-[#FFFFFF] border border-[#E2DDD2] rounded-xl text-[11px] font-mono text-[#0F172A] font-semibold flex items-center gap-2 shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: activeHotspot.color }} />
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
