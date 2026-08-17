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
    gradeName: 'Standard Clear High Grade',
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
    title: 'Dual Logistics Dock Bay #5 Exterior Airlock',
    category: 'warehouse',
    categoryLabel: 'Industrial Warehouse & Logistics',
    location: 'Indospace Industrial Park, Luhari, Haryana',
    clientType: 'National E-Commerce 3PL Fulfillment Center',
    specs: '300mm x 3mm Ribbed Clear with High-Vis Red Boundary Strips • 100% Weather Shield',
    grade: 'double-ribbed',
    gradeName: 'Double-Ribbed Logistics Grade',
    description: 'Exterior high-bay loading bay 5 dual-dock installation with high-contrast red perimeter strips. Prevents external rain, dust, and wind ingress while trucks are docked for cross-docking.',
    benefits: ['Maintains interior HVAC climate stability', 'Bright red safety boundary prevents forklift edge collisions', 'Heavy ribbing resists pallet scrape wear'],
    imageUrl: '/assets/Screenshot 2026-08-16 230157.png',
    featured: true
  },
  {
    id: 'photo-9',
    title: 'Dock Ramp 3D Walk-In Isolation Cube',
    category: 'warehouse',
    categoryLabel: 'Industrial Warehouse & Logistics',
    location: 'Taloja MIDC Chemical & Cargo Zone, Navi Mumbai',
    clientType: 'Export Freight Forwarding Container Hub',
    specs: 'Heavy Gauge Structural Steel Frame • 200mm Clear Strips • 67% Overlap',
    grade: 'standard-clear',
    gradeName: 'Standard Clear Industrial Enclosure',
    description: 'Free-standing structural steel enclosure cube built directly over the open outdoor loading ramp, preventing rain splatter and particulate infiltration into warehouse inventory.',
    benefits: ['Creates a sealed weather-proof airlock', 'Zero daylight reduction with 92% optical clarity', 'Accommodates continuous manual pallet truck transit'],
    imageUrl: '/assets/Screenshot 2026-08-16 230220.png',
    featured: true
  },
  {
    id: 'photo-10',
    title: 'Textile Spooling & Yarn Moisture Chamber',
    category: 'cleanroom',
    categoryLabel: 'Cleanroom & Humidity Chamber',
    location: 'Ichalkaranji Textile Park, Maharashtra',
    clientType: 'Cotton & Synthetic Spun Yarn Mill',
    specs: 'Anti-Static ESD Clear Polymeric Wall Barrier • 100% Humidity Retention',
    grade: 'anti-static',
    gradeName: 'Anti-Static ESD Controlled',
    description: 'Full-height enclosed PVC curtain booth shielding automated high-speed yarn spinning and spooling equipment. Maintains exact 65% RH humidity levels to prevent yarn breakage.',
    benefits: ['Eliminates fly lint and fiber cross-contamination', 'Anti-static formulation repels airborne floating fibers', 'Allows supervisors 100% visual monitoring of spindles'],
    imageUrl: '/assets/Screenshot 2026-08-16 230241.png',
    featured: false
  },
  {
    id: 'photo-11',
    title: 'Cleanroom Packaging Softwall Enclosure',
    category: 'cleanroom',
    categoryLabel: 'Cleanroom & Pharma',
    location: 'Pithampur Pharma SEZ, Indore, MP',
    clientType: 'Medical Device Packaging & Sterilization Unit',
    specs: 'Modular Aluminum Truss Enclosure • Red Edge Ingress Marker • Class 10,000 ISO',
    grade: 'standard-clear',
    gradeName: 'Cleanroom Grade Clear',
    description: 'Enclosed softwall cleanroom cell installed inside a larger warehouse floor for sterile packing of medical supplies and auto parts. Features designated red strip entryways.',
    benefits: ['Cost-effective alternative to rigid cleanroom walls', 'Preserves HEPA filtered positive pressure airflow', 'Easily expandable modular steel frame structure'],
    imageUrl: '/assets/Screenshot 2026-08-16 230257.png',
    featured: true
  },
  {
    id: 'photo-12',
    title: 'Heavy Forklift Ingress Dock Bay #1',
    category: 'warehouse',
    categoryLabel: 'Industrial Warehouse & Logistics',
    location: 'Sri City Industrial Zone, Andhra Pradesh',
    clientType: 'Heavy Electrical Machinery Assembly Plant',
    specs: '400mm x 4mm Double-Ribbed Heavy Clear with Red Warning Borders • SS304 Tracks',
    grade: 'double-ribbed',
    gradeName: 'Double-Ribbed Forklift Grade',
    description: 'Extra heavy-duty dock bay #1 doorway partition engineered to withstand 500+ daily crossings of high-capacity electric counterbalance forklifts.',
    benefits: ['Raised ribs absorb fork tine and wooden pallet friction', 'High-visibility red border strip markings prevent mast collision', 'Stainless steel 304 tracks ensure zero rust in coastal environment'],
    imageUrl: '/assets/Screenshot 2026-08-16 230306.png',
    featured: false
  },
  {
    id: 'photo-13',
    title: 'Plant Workshop Full-Height Truss Partition',
    category: 'warehouse',
    categoryLabel: 'Industrial Warehouse & Logistics',
    location: 'Sanand Engineering Corridor, Ahmedabad',
    clientType: 'Automotive Engine & Gearbox Machining Plant',
    specs: '6.5-Meter Height Steel Truss Structure • Continuous Clear PVC Sheet Barrier',
    grade: 'standard-clear',
    gradeName: 'Standard Clear Industrial Partition',
    description: 'Multi-bay structural steel truss wall clad with heavy gauge transparent PVC strip curtains. Separates CNC robotic machining from quality inspection bays.',
    benefits: ['Full acoustic suppression of loud grinding operations', 'Restricts coolant mist from drifting into adjoining bays', 'Maintains natural overhead skylight transmission'],
    imageUrl: '/assets/Screenshot 2026-08-16 230319.png',
    featured: false
  },
  {
    id: 'photo-14',
    title: '100-Meter Factory Hall Demarcation Wall',
    category: 'warehouse',
    categoryLabel: 'Industrial Warehouse & Logistics',
    location: 'Oragadam Industrial Corridor, Chennai',
    clientType: 'Consumer Electronics Assembly Plant',
    specs: '100-Meter Continuous Transparent PVC Divider • Dust Isolation & AC Retention',
    grade: 'standard-clear',
    gradeName: 'Standard Clear Warehouse Division',
    description: 'Over 100 meters of continuous ceiling-suspended PVC curtain partitioning dividing a massive 50,000 sq ft industrial shed into temperature-controlled sub-zones.',
    benefits: ['Cuts central air conditioning energy bills by up to 60%', 'Provides flexible walk-through access anywhere along the line', 'Rapid installation with zero structural masonry required'],
    imageUrl: '/assets/Screenshot 2026-08-16 230334.png',
    featured: true
  },
  {
    id: 'photo-15',
    title: 'Aisle Gangway Thermal & Acoustic Wall',
    category: 'warehouse',
    categoryLabel: 'Industrial Warehouse & Logistics',
    location: 'Kheda Industrial Belt, Gujarat',
    clientType: 'Plastics Extrusion & Masterbatch Compounding Facility',
    specs: 'Acoustic Dampening Clear PVC Wall • 8m High Clear Span with Floor Anchors',
    grade: 'standard-clear',
    gradeName: 'Heavy Acoustic Clear Partition',
    description: 'Deep perspective view of high-bay factory gangway wall dividing active polymer extrusion lines from warehouse raw material pallet racks.',
    benefits: ['Dampens ambient decibel levels across pedestrian gangway', 'Prevents masterbatch pigment powder migration', 'Self-extinguishing fire safe formulation (DIN 4102 B1)'],
    imageUrl: '/assets/Screenshot 2026-08-16 230342.png',
    featured: false
  },
  {
    id: 'photo-16',
    title: 'Industrial Fryer & Oven Thermal Enclosure',
    category: 'food-insect',
    categoryLabel: 'Food & Anti-Insect',
    location: 'Bawal Industrial Estate, Haryana',
    clientType: 'Packaged Snack Foods & Namkeen Processor',
    specs: 'Heat Resistant Amber Anti-Insect Clear Screen • FSSAI Food Contact Safe',
    grade: 'anti-insect',
    gradeName: 'Food-Grade Amber Anti-Insect',
    description: 'Yellow amber thermal barrier enclosure wrapped around commercial continuous snack fryer and seasoning line. Blocks insects and contains cooking aroma.',
    benefits: ['Repels pests via 570nm yellow optical wavelength filtering', 'Shields open fryer from ambient dust and airborne contamination', 'Certified non-toxic, phthalate-free food safe formulation'],
    imageUrl: '/assets/Screenshot 2026-08-16 230402.png',
    featured: false
  },
  {
    id: 'photo-17',
    title: 'Multi-Bay Logistics Docks Anti-Insect Wall',
    category: 'food-insect',
    categoryLabel: 'Food & Anti-Insect',
    location: 'Farukhnagar Logistics Corridor, Gurgaon',
    clientType: 'Cold Chain Agricultural & Perishable Produce Depot',
    specs: '4-Bay Simultaneous Yellow Amber Anti-Insect Roller Curtains • 100% Bug Deterrence',
    grade: 'anti-insect',
    gradeName: 'Heavy Amber Anti-Insect Docks',
    description: '4 heavy-duty loading bays fitted with full-height yellow anti-insect PVC curtains. Keeps nighttime flying insects and pests outside during fruit & vegetable cross-docking.',
    benefits: ['Eliminates 98.6% of insect ingress into perishable storage', 'Withstands outdoor crosswinds and temperature fluctuations', 'Allows uninhibited view of loading bay operations'],
    imageUrl: '/assets/Screenshot 2026-08-16 230412.png',
    featured: true
  },
  {
    id: 'photo-18',
    title: 'High-Bay Workshop Climate Partition',
    category: 'warehouse',
    categoryLabel: 'Industrial Warehouse & Logistics',
    location: 'Vapi Chemical & Polymers Complex, Gujarat',
    clientType: 'Heavy Industrial Packaging & Paper Converting Mill',
    specs: 'Extra-High Ceiling Suspended PVC Strip Curtain Wall • Thermal Loss Shield',
    grade: 'standard-clear',
    gradeName: 'High-Bay Standard Clear Partition',
    description: 'High-bay manufacturing hall division suspended directly from factory roof purlins, maintaining comfortable ambient working temperature in occupied workstations.',
    benefits: ['Stops warm thermal convection drafts', 'Crystal clear transparency gives supervisors complete facility overview', 'High flexibility and resilience against fork truck snag'],
    imageUrl: '/assets/Screenshot 2026-08-16 230420.png',
    featured: false
  },
  {
    id: 'photo-19',
    title: 'Drinking Water Station Red Safety Doorway',
    category: 'cleanroom',
    categoryLabel: 'Workplace Hygiene & Safety',
    location: 'Multi Enterprise Quality Testing Facility, Ahmedabad',
    clientType: 'Hygienic Workplace Welfare & Safe Water Kiosk',
    specs: '200mm x 2mm Red Warning Safety Tint PVC • Top SS Clamping Head Rail',
    grade: 'standard-clear',
    gradeName: 'Red Safety Warning Partition',
    description: 'Dedicated hygienic water purification kiosk enclosure with vivid red warning safety tint PVC strips. Protects clean drinking water dispensary from dust and fly ingress.',
    benefits: ['Vivid red tint highlights safety & hygiene zones', 'Protects potable water dispensers from airborne contaminants', 'Easy push-through access for factory employees'],
    imageUrl: '/assets/Screenshot 2026-08-17 104446.png',
    featured: false
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
    { id: 'all', label: language === 'hi' ? 'सभी तस्वीरें (19)' : 'All Real Photos (19)', count: 19 },
    { id: 'warehouse', label: language === 'hi' ? 'गोदाम व लोडिंग डॉक्स (11)' : 'Warehouses & Docks (11)', count: 11 },
    { id: 'cleanroom', label: language === 'hi' ? 'क्लीनरूम व असेंबली (5)' : 'Cleanrooms & Safety (5)', count: 5 },
    { id: 'food-insect', label: language === 'hi' ? 'खाद्य व कीट निवारक (3)' : 'Food & Anti-Insect (3)', count: 3 }
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
    <section id="real-project-photos" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E2DDD2] text-[#1E293B]">
      {/* Background Ambience */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 119, 237,0.2) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="p-1.5 rounded-lg bg-[#0077ED]/15 border border-[#0077ED]/30 text-[#0077ED]">
              <Camera className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0077ED]">
              {language === 'hi' ? '[ वास्तविक प्रोजेक्ट तस्वीरें • मल्टी एंटरप्राइज ]' : '[ 100% AUTHENTIC PROJECT PHOTOS • MULTI ENTERPRISE ]'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[#0F172A] tracking-tight font-display">
            {language === 'hi' ? 'वास्तविक साइट इंस्टॉलेशन गैलरी' : 'Real Project & Factory Photos'}
          </h2>

          <p className="text-sm sm:text-base text-[#475569] font-light mt-2 max-w-3xl leading-relaxed">
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
              className="px-5 py-2.5 rounded-xl bg-[#0077ED] hover:bg-[#2B8EFF] text-white font-mono font-bold text-xs transition-all shadow-lg shadow-[#0077ED]/20 flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? '3D कॉन्फिगरेटर खोलें' : 'Configure Custom Doorway'}</span>
            </button>
          )}

          {onOpenQuoteModal && (
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFE6] border border-[#D8D2C5] text-[#0F172A] font-mono font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
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
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${activeCategory === cat.id
              ? 'bg-[#0077ED] text-white shadow-lg shadow-[#0077ED]/25 ring-1 ring-[#0077ED]'
              : 'bg-[#F8F6F0] text-[#475569] hover:text-[#0077ED] hover:bg-[#FAF8F5] border border-[#E2DDD2]'
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
            className="group bg-[#FFFFFF] border border-[#E2DDD2] hover:border-[#0077ED]/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#0077ED]/10 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Container with Watermark Protection Look & Zoom Button */}
            <div>
              <div
                className="relative w-full h-56 bg-[#FAF8F5] overflow-hidden cursor-pointer"
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
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF8F5] backdrop-blur-md border border-[#CFC8BA] text-[10px] font-mono font-bold text-[#0077ED]">
                  <ShieldCheck className="w-3 h-3 text-[#0077ED]" />
                  <span>{photo.categoryLabel}</span>
                </div>

                {/* Inspect Button on hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-[#FAF8F5] backdrop-blur-md text-[#0F172A] border border-[#CFC8BA] hover:text-[#0077ED]">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Location Pill */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#334155] bg-[#FAF8F5] backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#E2DDD2]">
                  <div className="flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-[#0077ED] flex-shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>
                  <span className="text-[10px] text-[#0077ED] font-bold flex-shrink-0 ml-1">REAL PHOTO</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block mb-1">
                    {photo.gradeName}
                  </span>
                  <h3
                    onClick={() => setSelectedPhoto(photo)}
                    className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#0077ED] transition-colors cursor-pointer leading-snug"
                  >
                    {photo.title}
                  </h3>
                </div>

                <p className="text-xs text-[#475569] leading-relaxed font-light line-clamp-2">
                  {photo.description}
                </p>

                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE5DA] text-[11px] font-mono text-[#475569]">
                  <strong className="text-[#1E293B] block mb-0.5">Configuration:</strong>
                  <span className="line-clamp-2">{photo.specs}</span>
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-[#EAE5DA] mt-4">
              <button
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                className="text-xs font-mono text-[#475569] hover:text-[#0077ED] flex items-center gap-1.5 cursor-pointer py-1"
              >
                <span>{language === 'hi' ? 'बड़ा देखें' : 'View Full Details'}</span>
                <Maximize2 className="w-3.5 h-3.5 text-[#0077ED]" />
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
                className="text-xs font-mono font-bold text-[#0077ED] hover:text-[#ff9d52] flex items-center gap-1 cursor-pointer py-1"
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
            className="fixed inset-0 z-50 bg-[#0F172A]/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#101218] border border-[#CFC8BA] rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DDD2] bg-[#F4EFE6]">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-[#0077ED]/20 border border-[#0077ED]/40 text-[#0077ED]">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0F172A] font-mono uppercase">
                      {selectedPhoto.title}
                    </h3>
                    <p className="text-[11px] font-mono text-[#64748B]">{selectedPhoto.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    aria-label="Previous Photo"
                    className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#0F172A] border border-[#E2DDD2] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    aria-label="Next Photo"
                    className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#0F172A] border border-[#E2DDD2] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(null)}
                    aria-label="Close Lightbox"
                    className="p-2 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE4D7] text-[#0F172A] transition-colors cursor-pointer ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* Photo Display */}
                <div className="relative w-full max-h-[55vh] bg-[#FAF8F5] rounded-xl overflow-hidden flex items-center justify-center border border-[#E2DDD2]">
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.title}
                    className="w-full h-auto max-h-[55vh] object-contain"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#FAF8F5] backdrop-blur-md rounded-md border border-[#CFC8BA] text-[10px] font-mono text-[#0077ED] font-bold">
                    100% AUTHENTIC MULTI ENTERPRISE INSTALLATION
                  </div>
                </div>

                {/* Detailed Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Specs */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-[#0077ED] uppercase tracking-wider mb-1">
                        Installation Overview & Application
                      </h4>
                      <p className="text-sm text-[#334155] leading-relaxed">
                        {selectedPhoto.description}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD2] space-y-2">
                      <div className="text-xs font-mono font-bold text-[#0F172A] flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#0077ED]" />
                        <span>Engineering Specifications & Dimensions</span>
                      </div>
                      <p className="text-xs font-mono text-[#475569] leading-relaxed">
                        {selectedPhoto.specs}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0077ED]/20 text-[#0077ED] border border-[#0077ED]/40">
                          {selectedPhoto.gradeName}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          {selectedPhoto.clientType}
                        </span>
                      </div>
                    </div>

                    {/* Key Benefits */}
                    <div>
                      <h5 className="text-xs font-mono font-bold text-[#475569] uppercase tracking-wider mb-2">
                        Facility Advantages Delivered
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {selectedPhoto.benefits.map((b, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE5DA] text-[11px] font-mono text-[#334155] flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0077ED] flex-shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Action Box */}
                  <div className="bg-[#151822] border border-[#E2DDD2] rounded-xl p-5 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#0077ED] uppercase font-bold tracking-wider block mb-1">
                        FACTORY DIRECT QUOTE
                      </span>
                      <h4 className="text-base font-bold text-[#0F172A] mb-2">
                        Want This Exact Setup For Your Doorway?
                      </h4>
                      <p className="text-xs text-[#475569] leading-relaxed font-light">
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
                          className="w-full py-3 bg-[#0077ED] hover:bg-[#2B8EFF] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#0077ED]/30 flex items-center justify-center gap-2 cursor-pointer"
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
                          className="w-full py-2.5 bg-[#F4EFE6] hover:bg-[#EFE9DC] text-[#0F172A] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-[#D8D2C5] flex items-center justify-center gap-2 cursor-pointer"
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
                          className="w-full py-2 bg-transparent hover:bg-[#FAF8F5] text-[#475569] hover:text-[#0077ED] font-mono text-[11px] rounded-xl transition-all border border-[#E2DDD2] flex items-center justify-center gap-1.5 cursor-pointer"
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
