import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MultiLogoIcon } from './MultiLogo';
import { useLanguage } from '../i18n/LanguageContext';
import { PVCGrade } from '../types';
import { 
  Camera, 
  Maximize2, 
  Filter, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  FileDown, 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  ShieldCheck, 
  ExternalLink,
  MapPin,
  Building,
  Layers,
  Award
} from 'lucide-react';

export interface RealPhotoItem {
  id: string;
  title: string;
  category: 'warehouse' | 'cold-storage' | 'cleanroom' | 'food-insect' | 'hardware-rolls';
  categoryLabel: string;
  location: string;
  clientType: string;
  specs: string;
  grade: PVCGrade;
  gradeName: string;
  description: string;
  benefits: string[];
  imageUrl: string;
  featured?: boolean;
}

interface RealPhotosSectionProps {
  onOpenQuoteModal?: (grade?: PVCGrade) => void;
  onOpenConfigurator?: (grade?: PVCGrade) => void;
  onOpenSampleModal?: (grade?: PVCGrade) => void;
}

export const REAL_PROJECT_PHOTOS: RealPhotoItem[] = [
  {
    id: 'photo-1',
    title: 'Heavy Logistics Dock #5 Barrier',
    category: 'warehouse',
    categoryLabel: 'Industrial Warehouse',
    location: 'Ahmedabad GIDC Logistics Park, Gujarat',
    clientType: 'Freight & Supply Chain Distribution Hub',
    specs: '300mm x 3mm Standard Clear with Red Edge Warning Strips • 67% Overlap • SS304 Tracks',
    grade: 'double-ribbed',
    gradeName: 'Double Ribbed / Safety Clear',
    description: 'High-bay warehouse loading dock #5 installation. Features optical clear center strips flanked by red edge safety strips for enhanced driver visibility during heavy forklift ingress.',
    benefits: ['Reduces AC thermal loss by up to 84%', 'Warning edge strips prevent forklift collisions', 'High tear resistance under heavy daily truck loading'],
    imageUrl: '/assets/Screenshot 2026-08-16 214025.png',
    featured: true
  },
  {
    id: 'photo-2',
    title: 'Ramp Loading Enclosure & Air Lock',
    category: 'warehouse',
    categoryLabel: 'Industrial Warehouse',
    location: 'Bhiwandi Integrated Warehousing Zone, Maharashtra',
    clientType: 'FMCG & Retail Cargo Staging Area',
    specs: '200mm x 2mm Standard Clear • Ceiling Suspended Frame • 50% Overlap',
    grade: 'standard-clear',
    gradeName: '100% Virgin Standard Clear',
    description: 'Complete loading ramp containment cube constructed with clear PVC strip partitions. Isolates outdoor ambient dust and rain while allowing continuous pallet truck transit.',
    benefits: ['100% Daylight Transmission', 'Shields open loading ramp from monsoon rain & dust', 'Suppresses noise from cargo conveyors'],
    imageUrl: '/assets/Screenshot 2026-08-16 214040.png',
    featured: true
  },
  {
    id: 'photo-3',
    title: 'Textile Mill Yarn Machinery Enclosure',
    category: 'cleanroom',
    categoryLabel: 'Cleanroom & Humidity Control',
    location: 'Surat Textile Manufacturing Hub, Gujarat',
    clientType: 'High-Speed Spinning & Weaving Mill',
    specs: 'Full Height Clear PVC Polymeric Chamber • 50% Overlap • Anti-Static',
    grade: 'anti-static',
    gradeName: 'Anti-Static ESD Clear',
    description: 'Custom-engineered dust and fiber containment enclosure around automated yarn spooling machines. Maintains stable relative humidity (RH) essential for yarn tensile strength.',
    benefits: ['Prevents lint & micro-fiber cross-contamination', 'Maintains 65%+ Relative Humidity chamber', 'Anti-static formulation repels airborne floating fibers'],
    imageUrl: '/assets/Screenshot 2026-08-16 214053.png',
    featured: true
  },
  {
    id: 'photo-4',
    title: 'Automotives Plant Main Ingress Doorway',
    category: 'warehouse',
    categoryLabel: 'Industrial Warehouse',
    location: 'Chakan Industrial Corridor, Pune',
    clientType: 'Tier-1 Automotive Parts Manufacturer',
    specs: '300mm x 3mm Heavy Gauge Clear • 67% Overlap • AISI 304 Heavy Duty Rail',
    grade: 'standard-clear',
    gradeName: 'Industrial Heavy Clear',
    description: 'Extra-tall factory gate partition separating raw sheet metal fabrication from high-precision CNC robotic machining bays. Prevents metallic dust drift.',
    benefits: ['High wind resistance across high-bay portal', 'Allows overhead crane and forklift clearance', 'Extends machine tool filter service life'],
    imageUrl: '/assets/Screenshot 2026-08-16 214123.png',
    featured: true
  },
  {
    id: 'photo-5',
    title: 'Pharma Cleanroom Airlock System',
    category: 'cleanroom',
    categoryLabel: 'Cleanroom & Pharma',
    location: 'Sanand Pharma SEZ, Gujarat',
    clientType: 'WHO-GMP Certified Formulation Facility',
    specs: '200mm x 2mm Polar Blue & Yellow Anti-Insect Hybrid Doorways • 50% Overlap',
    grade: 'anti-insect',
    gradeName: 'Anti-Insect & Polar Blue',
    description: 'Twin-doorway cleanroom airlock installation. Left partition features cryogenic polar blue strips for temperature barrier; right doorway uses amber yellow anti-insect curtains.',
    benefits: ['WHO-GMP airlock compliance', 'Blocks 98.6% of flying insects with amber wavelength', 'Retains sterile positive pressure atmosphere'],
    imageUrl: '/assets/Screenshot 2026-08-16 214133.png',
    featured: true
  },
  {
    id: 'photo-6',
    title: 'Factory Safety Green Strip Partition',
    category: 'warehouse',
    categoryLabel: 'Welding & Safety',
    location: 'Vadodara Engineering GIDC, Gujarat',
    clientType: 'Heavy Electrical Switchgear Facility',
    specs: '200mm x 2mm Green Optical Filter Strips • 50% Overlap • Hook-on SS304',
    grade: 'welding-safety',
    gradeName: 'Welding Green Safety',
    description: 'Secondary roller shutter interior curtain. Filters intense optical flare and grinding sparks from passing into the main pedestrian gangway while maintaining ventilation.',
    benefits: ['Protects adjacent workers from eye flash fatigue', 'Certified flame retardant self-extinguishing PVC', 'Smooth walk-through for floor technicians'],
    imageUrl: '/assets/Screenshot 2026-08-16 214148.png',
    featured: true
  },
  {
    id: 'photo-7',
    title: 'Food Bakery Processing Station Enclosure',
    category: 'food-insect',
    categoryLabel: 'Food & Anti-Insect',
    location: 'Anand Food Processing Zone, Gujarat',
    clientType: 'Industrial Commercial Bakery & Confectionery',
    specs: '200mm x 2mm Yellow Amber Anti-Insect • 50% Overlap • Stainless Steel Frame',
    grade: 'anti-insect',
    gradeName: 'Food-Grade Amber Anti-Insect',
    description: '360-degree yellow amber anti-insect booth enclosing active bakery dough ovens and cooling racks. Certified food contact safe formulation infused with lemongrass aroma.',
    benefits: ['Repels mosquitoes, fruit flies, and moths', 'Withstands continuous oven heat washdowns', 'FDA & FSSAI hygiene compliant compound'],
    imageUrl: '/assets/Screenshot 2026-08-16 214252.png',
    featured: true
  },
  {
    id: 'photo-8',
    title: '100% Virgin Polymer Standard Clear Roll',
    category: 'hardware-rolls',
    categoryLabel: 'Raw Materials & Rolls',
    location: 'Multi Enterprise Central Warehouse, Ahmedabad',
    clientType: 'Material Quality Inspection Report',
    specs: '50m Master Roll • Optical Clarity Index 92% • Shore A 76 Hardness',
    grade: 'standard-clear',
    gradeName: 'Standard Clear Polymer Roll',
    description: 'Close-up laboratory clarity inspection of authentic Multi Enterprise virgin polymer. Zero recycled regrind or toxic phthalate plasticizers.',
    benefits: ['Crystal-clear optical transparency', 'Does not yellow, cloud, or become brittle over time', 'Supple elasticity down to -15°C'],
    imageUrl: '/assets/Screenshot 2026-08-16 214504.png'
  },
  {
    id: 'photo-9',
    title: 'Cryogenic Polar Freezer Grade (-50°C)',
    category: 'cold-storage',
    categoryLabel: 'Cold Storage & Polar',
    location: 'Kandla Free Trade Zone Cold Storage, Gujarat',
    clientType: 'Seafood Export & Sub-Zero Cold Chain',
    specs: '300mm x 3mm Polar Blue Soft • Operational down to -50°C',
    grade: 'polar-freezer',
    gradeName: 'Polar Cryogenic (-50°C)',
    description: 'Ultra-low temperature cryogenic formulation engineered with non-freezing plasticizers that prevent cracking and shattering in blast freezers.',
    benefits: ['Crack-proof flexibility at -50°C', 'Prevents heavy ice formation on door frames', 'Eliminates refrigerated air escape during door openings'],
    imageUrl: '/assets/Screenshot 2026-08-16 214521.png'
  },
  {
    id: 'photo-10',
    title: 'Amber Optical Insect Blocker Swatch',
    category: 'food-insect',
    categoryLabel: 'Food & Anti-Insect',
    location: 'Multi Enterprise Testing Lab',
    clientType: 'Quality Assurance Spectral Testing',
    specs: '570nm Wavelength Spectral Filter • Food Contact Safe',
    grade: 'anti-insect',
    gradeName: 'Anti-Insect Optical Strip',
    description: 'Yellow amber strip engineered to block the optical wavelength visible to flying insects, making doorways invisible and repelling pests naturally.',
    benefits: ['Non-chemical pest barrier', 'Mild lemongrass scent', 'Ideal for food packaging & dairies'],
    imageUrl: '/assets/Screenshot 2026-08-16 214531.png'
  },
  {
    id: 'photo-11',
    title: 'Heavy Duty Double-Ribbed Forklift Profile',
    category: 'warehouse',
    categoryLabel: 'Industrial Warehouse',
    location: 'Multi Enterprise Extrusion Facility',
    clientType: 'Heavy Traffic Industrial Doorways',
    specs: 'Dual Extruded Raised Ribs • 3mm Body / 5mm Rib Peak',
    grade: 'double-ribbed',
    gradeName: 'Heavy Double-Ribbed Profile',
    description: 'Raised dual ribs take the abrasive contact from forklift pallets and truck loads, keeping the flat viewing window free of scratches and dirt.',
    benefits: ['Extends strip optical lifespan by 300%', 'Reduces friction during vehicle pass-through', 'Superior thermal seal with interlocking ribs'],
    imageUrl: '/assets/Screenshot 2026-08-16 214547.png'
  },
  {
    id: 'photo-12',
    title: 'Bronze UV Welding Screen Protective Strip',
    category: 'cleanroom',
    categoryLabel: 'Welding & Safety',
    location: 'Engineering Fabrication Bay',
    clientType: 'Welding Arc & UV Filter Zone',
    specs: 'EN1598 / ISO 25980 Certified UV Blocker • Bronze Tint',
    grade: 'welding-safety',
    gradeName: 'Welding Bronze Screen',
    description: 'Filters hazardous ultraviolet arc radiation and blue light hazard emitted during TIG/MIG welding operations, preventing flash injuries.',
    benefits: ['Blocks 99.9% harmful UV rays', 'Allows floor supervisors to safely observe welding inside', 'Fire retardant grade DIN 4102 B1'],
    imageUrl: '/assets/Screenshot 2026-08-16 214608.png'
  },
  {
    id: 'photo-13',
    title: 'Anti-Static ESD Safe Electronics Strip',
    category: 'cleanroom',
    categoryLabel: 'Cleanroom & Pharma',
    location: 'Microelectronics & Semiconductor Line',
    clientType: 'SMT Assembly & PCB Manufacturing',
    specs: 'Surface Resistivity 10^9 to 10^11 Ω/sq • Zero Static Build-up',
    grade: 'anti-static',
    gradeName: 'Anti-Static ESD Strip',
    description: 'Discharges surface static charges instantly, preventing electrostatic discharge (ESD) shocks that destroy sensitive electronic microchips.',
    benefits: ['Prevents ESD component burnout', 'Repels airborne dust & particulate attraction', 'Complies with ANSI/ESD S20.20'],
    imageUrl: '/assets/Screenshot 2026-08-16 214616.png'
  },
  {
    id: 'photo-14',
    title: 'Opaque Privacy Black/White Barrier Strip',
    category: 'cleanroom',
    categoryLabel: 'Privacy & Security',
    location: 'Confidential R&D & Darkroom Unit',
    clientType: 'Sensitive Chemical & Photographic Zone',
    specs: '100% Light Blocking Solid PVC • 2mm & 3mm Thickness',
    grade: 'standard-clear',
    gradeName: 'Opaque Visual Partition',
    description: 'Total light-blocking solid polymer strip curtain for confidential research areas, wash bays, conveyor tunnels, and darkrooms.',
    benefits: ['Zero optical transmittance', 'Conceals sensitive machinery and inventory', 'Washdown and chemical splash resistant'],
    imageUrl: '/assets/Screenshot 2026-08-16 214626.png'
  },
  {
    id: 'photo-15',
    title: 'AISI 304 Stainless Steel Hook-On Track Rail',
    category: 'hardware-rolls',
    categoryLabel: 'Hardware & Systems',
    location: 'Multi Enterprise Metal Fabrication Shop',
    clientType: 'Corrosion-Proof Suspension Hardware',
    specs: '1.2mm & 1.5mm Thickness SS304 • Tool-less Hook System',
    grade: 'standard-clear',
    gradeName: 'SS304 Hook-On Track System',
    description: 'Precision CNC punched stainless steel suspension rail. Enables tool-less hanging and instant strip removal for periodic cleaning or replacement.',
    benefits: ['100% Rust-proof AISI 304 stainless steel', 'Individual strip hook-on allows 30-second replacement', 'Available in 1m, 1.2m, 1.5m and continuous modular links'],
    imageUrl: '/assets/Screenshot 2026-08-16 214731.png'
  },
  {
    id: 'photo-16',
    title: 'SS 304 Clamping Plates & Riveted Fasteners',
    category: 'hardware-rolls',
    categoryLabel: 'Hardware & Systems',
    location: 'Multi Enterprise Hardware Assembly',
    clientType: 'Standard Pre-Clamped Kit Hardware',
    specs: '200mm, 300mm & 400mm Plate Sets with Heavy Grip Fasteners',
    grade: 'standard-clear',
    gradeName: 'Stainless Steel Clamp Pairs',
    description: 'Dual clamping plates fabricated from 304-grade stainless steel that sandwich each PVC strip securely, preventing tearing under forklift snag.',
    benefits: ['Distributes hanging stress evenly across polymer top', 'Smooth rounded edges prevent strip chafing', 'High tensile load capacity'],
    imageUrl: '/assets/Screenshot 2026-08-16 214746.png'
  },
  {
    id: 'photo-17',
    title: 'Heavy Duty Sliding Track Rail Mechanism',
    category: 'hardware-rolls',
    categoryLabel: 'Hardware & Systems',
    location: 'Wide Cargo Industrial Bay',
    clientType: 'Bi-Parting & Single-Slide Track System',
    specs: 'Aluminium / Galvanized Steel Track with Ball Bearing Trolleys',
    grade: 'standard-clear',
    gradeName: 'Sliding Track System Assembly',
    description: 'Smooth sliding track carriage system that allows entire PVC strip curtain assemblies to slide effortlessly aside for oversized machinery passage.',
    benefits: ['100% Doorway Clearance on demand', 'Smooth ball bearing four-wheel trolley wheels', 'Dual bi-parting or single-slide configuration'],
    imageUrl: '/assets/Screenshot 2026-08-16 214754.png'
  },
  {
    id: 'photo-18',
    title: 'Ready-to-Hang Pre-Clamped Doorway Kit',
    category: 'hardware-rolls',
    categoryLabel: 'Custom Cut-to-Size Kits',
    location: 'Multi Enterprise Dispatch Station',
    clientType: 'Turnkey Easy-Install Custom Kit',
    specs: 'Custom Cut Lengths • Pre-Riveted SS Plates • Numbered Order',
    grade: 'standard-clear',
    gradeName: 'Pre-Clamped Ready-to-Hang Kit',
    description: 'Turnkey doorway package cut to customer exact door dimensions with stainless steel hanger plates pre-clamped. Ready to mount out of the box.',
    benefits: ['Zero on-site cutting or drilling needed', 'Numbered strips for foolproof correct overlap installation', 'Dispatched within 24 hours of order'],
    imageUrl: '/assets/Screenshot 2026-08-16 214803.png'
  },
  {
    id: 'photo-19',
    title: 'Standard 50-Meter Factory Master Rolls',
    category: 'hardware-rolls',
    categoryLabel: 'Bulk Factory Packaging',
    location: 'Multi Enterprise Finished Goods Export Bay',
    clientType: 'Wholesale & OEM Direct Supply',
    specs: '50m Continuous Roll • Strapped & Wrapped with Core ID',
    grade: 'standard-clear',
    gradeName: 'Bulk 50m Factory Master Rolls',
    description: 'Export-grade packaged 50-meter rolls of industrial PVC strip curtain material ready for nationwide logistics dispatch and export shipping.',
    benefits: ['Direct factory wholesale pricing', 'Protected with heavy-duty moisture barrier shrink wrap', 'Available in all widths and thickness grades'],
    imageUrl: '/assets/Screenshot 2026-08-16 214814.png'
  }
];

export const RealPhotosSection: React.FC<RealPhotosSectionProps> = ({
  onOpenQuoteModal,
  onOpenConfigurator,
  onOpenSampleModal
}) => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<RealPhotoItem | null>(null);

  const categories = [
    { id: 'all', label: language === 'hi' ? 'सभी तस्वीरें (19)' : 'All Photos (19)', count: 19 },
    { id: 'warehouse', label: language === 'hi' ? 'गोदाम व फैक्ट्री (5)' : 'Warehouses & Docks (5)', count: 5 },
    { id: 'cold-storage', label: language === 'hi' ? 'कोल्ड स्टोरेज -50°C (3)' : 'Cold Storage (-50°C)', count: 3 },
    { id: 'cleanroom', label: language === 'hi' ? 'क्लीनरूम व फार्मा (4)' : 'Cleanroom & Pharma (4)', count: 4 },
    { id: 'food-insect', label: language === 'hi' ? 'खाद्य व कीट निवारक (3)' : 'Food & Anti-Insect (3)', count: 3 },
    { id: 'hardware-rolls', label: language === 'hi' ? 'हार्डवेयर व रोल्स (5)' : 'SS304 Tracks & Rolls (5)', count: 5 }
  ];

  const filteredPhotos = activeCategory === 'all'
    ? REAL_PROJECT_PHOTOS
    : REAL_PROJECT_PHOTOS.filter(p => {
        if (activeCategory === 'cold-storage') {
          return p.category === 'cold-storage' || p.id === 'photo-9';
        }
        return p.category === activeCategory;
      });

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = REAL_PROJECT_PHOTOS.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % REAL_PROJECT_PHOTOS.length;
    setSelectedPhoto(REAL_PROJECT_PHOTOS[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = REAL_PROJECT_PHOTOS.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + REAL_PROJECT_PHOTOS.length) % REAL_PROJECT_PHOTOS.length;
    setSelectedPhoto(REAL_PROJECT_PHOTOS[prevIndex]);
  };

  return (
    <section id="real-project-photos" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/10 text-[#E0E0E0]">
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(rgba(242,125,38,0.2) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} 
      />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="p-1.5 rounded-lg bg-[#F27D26]/15 border border-[#F27D26]/30 text-[#F27D26]">
              <Camera className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F27D26]">
              {language === 'hi' ? '[ वास्तविक प्रोजेक्ट तस्वीरें • मल्टी एंटरप्राइज ]' : '[ 100% AUTHENTIC PROJECT PHOTOS • MULTI ENTERPRISE ]'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight font-display">
            {language === 'hi' ? 'वास्तविक साइट इंस्टॉलेशन गैलरी' : 'Real Project & Factory Photos'}
          </h2>

          <p className="text-sm sm:text-base text-white/60 font-light mt-2 max-w-3xl leading-relaxed">
            {language === 'hi'
              ? 'मल्टी एंटरप्राइज द्वारा स्थापित वास्तविक पीवीसी स्ट्रिप कर्टन इंस्टॉलेशन, कोल्ड स्टोरेज, वेयरहाउस डॉक, क्लीनरूम और एसएस 304 हार्डवेयर की वास्तविक तस्वीरें देखें।'
              : 'Browse 19+ authentic high-resolution photos of Multi Enterprise installations across warehouses, sub-zero cold chains, pharma cleanrooms, and factory assembly lines.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onOpenConfigurator && (
            <button
              type="button"
              onClick={() => onOpenConfigurator()}
              className="px-5 py-2.5 rounded-xl bg-[#F27D26] hover:bg-[#ff8f3d] text-white font-mono font-bold text-xs transition-all shadow-lg shadow-[#F27D26]/20 flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? '3D कॉन्फिगरेटर खोलें' : 'Configure Custom Doorway'}</span>
            </button>
          )}

          {onOpenQuoteModal && (
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'hi' ? 'तत्काल कोटेशन प्राप्त करें' : 'Get Quote For Setup'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#F27D26] text-white shadow-lg shadow-[#F27D26]/25 ring-1 ring-[#F27D26]'
                : 'bg-[#12141C] text-white/60 hover:text-white hover:bg-[#1A1D27] border border-white/10'
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="group bg-[#11131A] border border-white/10 hover:border-[#F27D26]/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#F27D26]/10 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Container with Watermark Protection Look & Zoom Button */}
            <div>
              <div 
                className="relative w-full h-56 bg-black/60 overflow-hidden cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] via-transparent to-black/40" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-[#F27D26]">
                  <ShieldCheck className="w-3 h-3 text-[#F27D26]" />
                  <span>{photo.categoryLabel}</span>
                </div>

                {/* Inspect Button on hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-black/80 backdrop-blur-md text-white border border-white/20 hover:text-[#F27D26]">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Location Pill */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/80 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                  <div className="flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-[#F27D26] flex-shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>
                  <span className="text-[10px] text-[#F27D26] font-bold flex-shrink-0 ml-1">REAL PHOTO</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">
                    {photo.gradeName}
                  </span>
                  <h3 
                    onClick={() => setSelectedPhoto(photo)}
                    className="text-base sm:text-lg font-bold text-white group-hover:text-[#F27D26] transition-colors cursor-pointer leading-snug"
                  >
                    {photo.title}
                  </h3>
                </div>

                <p className="text-xs text-white/60 leading-relaxed font-light line-clamp-2">
                  {photo.description}
                </p>

                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px] font-mono text-white/70">
                  <strong className="text-white/90 block mb-0.5">Configuration:</strong>
                  <span className="line-clamp-2">{photo.specs}</span>
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
              <button
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                className="text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5 cursor-pointer py-1"
              >
                <span>{language === 'hi' ? 'बड़ा देखें' : 'View Full Details'}</span>
                <Maximize2 className="w-3.5 h-3.5 text-[#F27D26]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenQuoteModal) {
                    onOpenQuoteModal(photo.grade);
                  } else if (onOpenConfigurator) {
                    onOpenConfigurator(photo.grade);
                  }
                }}
                className="text-xs font-mono font-bold text-[#F27D26] hover:text-[#ff9d52] flex items-center gap-1 cursor-pointer py-1"
              >
                <span>{language === 'hi' ? 'कोटेशन प्राप्त करें' : 'Get This Setup'} &rarr;</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* High Resolution Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#101218] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0B0E]">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-[#F27D26]/20 border border-[#F27D26]/40 text-[#F27D26]">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-mono uppercase">
                      {selectedPhoto.title}
                    </h3>
                    <p className="text-[11px] font-mono text-white/50">{selectedPhoto.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    aria-label="Previous Photo"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    aria-label="Next Photo"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(null)}
                    aria-label="Close Lightbox"
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* Photo Display */}
                <div className="relative w-full max-h-[55vh] bg-black/90 rounded-xl overflow-hidden flex items-center justify-center border border-white/10">
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.title}
                    className="w-full h-auto max-h-[55vh] object-contain"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-md border border-white/20 text-[10px] font-mono text-[#F27D26] font-bold">
                    100% AUTHENTIC MULTI ENTERPRISE INSTALLATION
                  </div>
                </div>

                {/* Detailed Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Specs */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-[#F27D26] uppercase tracking-wider mb-1">
                        Installation Overview & Application
                      </h4>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {selectedPhoto.description}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#F27D26]" />
                        <span>Engineering Specifications & Dimensions</span>
                      </div>
                      <p className="text-xs font-mono text-white/70 leading-relaxed">
                        {selectedPhoto.specs}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F27D26]/20 text-[#F27D26] border border-[#F27D26]/40">
                          {selectedPhoto.gradeName}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          {selectedPhoto.clientType}
                        </span>
                      </div>
                    </div>

                    {/* Key Benefits */}
                    <div>
                      <h5 className="text-xs font-mono font-bold text-white/60 uppercase tracking-wider mb-2">
                        Facility Advantages Delivered
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {selectedPhoto.benefits.map((b, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px] font-mono text-white/80 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F27D26] flex-shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Action Box */}
                  <div className="bg-[#151822] border border-white/10 rounded-xl p-5 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#F27D26] uppercase font-bold tracking-wider block mb-1">
                        FACTORY DIRECT QUOTE
                      </span>
                      <h4 className="text-base font-bold text-white mb-2">
                        Want This Exact Setup For Your Doorway?
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        Our engineering team calculates exact strip count, overlap ratio, SS 304 track length, and freight dispatch directly from Ahmedabad HQ.
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      {onOpenQuoteModal && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPhoto(null);
                            onOpenQuoteModal(selectedPhoto.grade);
                          }}
                          className="w-full py-3 bg-[#F27D26] hover:bg-[#ff8f3d] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#F27D26]/30 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <FileDown className="w-4 h-4" />
                          <span>Request Formal Quote</span>
                        </button>
                      )}

                      {onOpenConfigurator && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPhoto(null);
                            onOpenConfigurator(selectedPhoto.grade);
                          }}
                          className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-white/15 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Test in 3D CAD Configurator</span>
                        </button>
                      )}

                      {onOpenSampleModal && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPhoto(null);
                            onOpenSampleModal(selectedPhoto.grade);
                          }}
                          className="w-full py-2 bg-transparent hover:bg-white/5 text-white/70 hover:text-white font-mono text-[11px] rounded-xl transition-all border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Get Free Physical Swatch Kit</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
