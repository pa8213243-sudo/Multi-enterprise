import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MultiLogo, MultiLogoIcon } from './MultiLogo';
import { IsometricFactoryDiagram } from './IsometricFactoryDiagram';
import { useLanguage } from '../i18n/LanguageContext';
import { PVCGrade } from '../types';
import { 
  Box, 
  Layers, 
  Calculator, 
  Package, 
  Users, 
  Wrench, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Maximize2,
  FileDown,
  Building2,
  Factory,
  Flame,
  ThermometerSnowflake,
  Eye,
  Sliders,
  Award,
  Camera
} from 'lucide-react';

interface HomePageProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenQuoteModal: () => void;
  onOpenSampleModal: () => void;
  onSelectGradeForConfigurator?: (grade: PVCGrade) => void;
}

interface LatestWorkItem {
  id: string;
  title: string;
  category: string;
  location: string;
  specs: string;
  description: string;
  badge: string;
  imageUrl: string;
  grade: PVCGrade;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateSection,
  onOpenQuoteModal,
  onOpenSampleModal,
  onSelectGradeForConfigurator
}) => {
  const { language } = useLanguage();
  const [selectedWork, setSelectedWork] = useState<LatestWorkItem | null>(null);

  // 6 Authentic industrial installations from Multi Enterprise project gallery
  const latestWorks: LatestWorkItem[] = [
    {
      id: 'work-1',
      title: 'Warehouse Loading Bay #5 Entrance',
      category: 'Heavy Logistics & Transport Hub',
      location: 'Ahmedabad GIDC, Gujarat',
      specs: '300mm x 3mm Standard Clear with Red Edge Strips • 67% Overlap • SS304 Track',
      description: 'High-bay warehouse loading dock #5 ingress. Optical clear strips flanked by red edge safety strips for enhanced driver visibility during heavy forklift transit.',
      badge: 'FORKLIFT TOUGH',
      imageUrl: '/assets/Screenshot 2026-08-16 214025.png',
      grade: 'double-ribbed'
    },
    {
      id: 'work-2',
      title: 'Ramp Loading Staging Enclosure',
      category: 'FMCG & Logistics Warehousing',
      location: 'Bhiwandi Logistics Park, Maharashtra',
      specs: '200mm x 2mm Standard Clear • Ceiling Suspended Structure • 50% Overlap',
      description: 'Loading ramp airlock containment cube. Retains indoor climate control during cargo staging while preventing monsoon rain and bird infiltration.',
      badge: 'HIGH-BAY DOCK',
      imageUrl: '/assets/Screenshot 2026-08-16 214040.png',
      grade: 'standard-clear'
    },
    {
      id: 'work-3',
      title: 'Pharma Cleanroom Airlock Barrier',
      category: 'Pharmaceutical Formulation',
      location: 'Sanand Pharma SEZ, Gujarat',
      specs: '200mm x 2mm Polar Blue & Yellow Anti-Insect Hybrid • 50% Overlap',
      description: 'Cleanroom twin-doorway partition maintaining positive pressure and sterile barrier for active pharmaceutical formulation.',
      badge: 'PHARMA AIRLOCK',
      imageUrl: '/assets/Screenshot 2026-08-16 214133.png',
      grade: 'anti-insect'
    },
    {
      id: 'work-4',
      title: 'Automotives Heavy Assembly Plant',
      category: 'Automotive Stamping & Robot Bay',
      location: 'Chakan Industrial Corridor, Pune',
      specs: '300mm x 3mm Heavy Gauge Clear • 67% Overlap • Heavy Duty AISI 304 Rail',
      description: 'Extra-tall industrial factory ingress separating sheet metal pressing from precision robotic machining bays.',
      badge: 'HIGH-TRAFFIC INGRESS',
      imageUrl: '/assets/Screenshot 2026-08-16 214123.png',
      grade: 'standard-clear'
    },
    {
      id: 'work-5',
      title: 'Food Bakery Station Yellow Enclosure',
      category: 'Food Processing & Confectionery',
      location: 'Anand Dairy & Food Hub, Gujarat',
      specs: '200mm x 2mm Amber Anti-Insect • 50% Overlap • Lemongrass Infused Compound',
      description: 'Hygiene-certified 360-degree anti-insect booth enclosing active bakery ovens and cooling racks, preventing flying pests.',
      badge: 'ANTI-PEST BARRIER',
      imageUrl: '/assets/Screenshot 2026-08-16 214252.png',
      grade: 'anti-insect'
    },
    {
      id: 'work-6',
      title: 'Factory Safety Green Strip Partition',
      category: 'Heavy Engineering & Fabrication',
      location: 'Vadodara Engineering GIDC, Gujarat',
      specs: '200mm x 2mm Green Optical Filter Strips • 50% Overlap • SS304 Tracks',
      description: 'Protects floor workers from blinding optical arc flare while keeping high-temperature machining bays adequately ventilated.',
      badge: 'SAFETY FILTER',
      imageUrl: '/assets/Screenshot 2026-08-16 214148.png',
      grade: 'welding-safety'
    }
  ];

  return (
    <div className="relative bg-[#F8F6F0] text-[#1E293B] overflow-x-clip min-h-screen">
      {/* Precision Background Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} 
      />

      {/* Hero Atmosphere Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#0077ED]/15 via-cyan-500/5 to-transparent blur-[140px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. HERO BANNER (Matches Reference Image Banner & Information) */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E2DDD2]">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Brand Pill */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FAF8F5] border border-[#D8D2C5] shadow-lg shadow-[#0077ED]/10"
          >
            <MultiLogoIcon size={18} className="w-4.5 h-4.5" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#0077ED] uppercase">
              WELCOME TO MULTI ENTERPRISE!
            </span>
            <span className="text-[10px] font-mono text-[#64748B] border-l border-[#CFC8BA] pl-2">
              EST. 1998
            </span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0F172A] font-display leading-[1.1]"
          >
            YOUR ONE STOP SOLUTION TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0077ED] via-amber-300 to-[#0077ED]">
              PVC STRIP CURTAINS
            </span>
          </motion.h1>

          {/* Core Brand Narrative (Direct from Reference Graphic) */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-[#475569] font-light max-w-3xl mx-auto leading-relaxed"
          >
            YOUR TRUSTED PARTNER SINCE 1998, AND LEADING MANUFACTURER OF HIGH-QUALITY, DURABLE, CERTIFIED PVC STRIP CURTAINS &amp; COMPLETE INDUSTRIAL FACILITY BARRIERS.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3.5 pt-4"
          >
            <button
              type="button"
              onClick={() => onNavigateSection('configurator')}
              className="px-6 py-3 rounded-xl bg-[#0077ED] hover:bg-[#2B8EFF] text-white font-mono font-bold text-sm transition-all shadow-xl shadow-[#0077ED]/25 hover:shadow-[#0077ED]/40 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <Box className="w-4 h-4" />
              <span>Launch 3D CAD Configurator</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateSection('all-products')}
              className="px-6 py-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F4EFE6] text-[#0F172A] font-mono font-bold text-sm border border-[#D8D2C5] transition-all hover:border-[#B8AF9F] flex items-center gap-2 cursor-pointer"
            >
              <Package className="w-4 h-4 text-emerald-400" />
              <span>Explore 30+ Products Range</span>
            </button>

            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="px-5 py-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#0F172A] font-mono text-sm border border-[#E2DDD2] transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-amber-400" />
              <span>Instant Factory Quote</span>
            </button>
          </motion.div>

          {/* 4 Trust Metrics */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#E2DDD2] max-w-4xl mx-auto"
          >
            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#EAE5DA] text-center">
              <div className="text-xl sm:text-2xl font-black text-[#0F172A] font-mono">27+ Years</div>
              <div className="text-[11px] font-mono text-[#64748B] uppercase">Heritage Since 1998</div>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#EAE5DA] text-center">
              <div className="text-xl sm:text-2xl font-black text-[#0077ED] font-mono">100% Virgin</div>
              <div className="text-[11px] font-mono text-[#64748B] uppercase">Certified Polymer</div>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#EAE5DA] text-center">
              <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">5,000+</div>
              <div className="text-[11px] font-mono text-[#64748B] uppercase">Doorways Installed</div>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#EAE5DA] text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">24-48h</div>
              <div className="text-[11px] font-mono text-[#64748B] uppercase">Fast Dispatch</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ABOUT US & 3D ISOMETRIC FACTORY BLUEPRINT (Direct from Image.png) */}
      {/* ========================================================================= */}
      <section id="about-us-section" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E2DDD2]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: About Us Narrative & Feature Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0077ED]" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0077ED]">
                [ ABOUT US • MULTI ENTERPRISE ]
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[#0F172A] tracking-tight font-display">
              Leading Manufacturer of PVC Strip Curtains
            </h2>

            {/* Exact Content from image.png */}
            <div className="space-y-4 text-sm sm:text-base text-[#475569] font-light leading-relaxed">
              <p>
                Multi Enterprise is the leading manufacturer of PVC Strip Curtains, delivering high-performance, cost-effective solutions for dust control, temperature retention, and workplace safety across diverse industries. With over two decades of engineering excellence, we are committed to providing top-quality materials, customized solutions, and outstanding service.
              </p>
              <p>
                Our PVC strip curtains are crafted from 100% virgin-grade polymer, ensuring superior optical clarity, exceptional flexibility, and long-lasting durability in even the most demanding environments.
              </p>
              <p className="text-xs text-[#475569]">
                Whether you need polar-grade curtains for sub-zero cold rooms, anti-insect yellow strips for food facilities, or heavy-duty double-ribbed curtains for forklift traffic, Multi Enterprise has the perfect solution tailored to your operational needs.
              </p>
            </div>

            {/* Feature Bullets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E2DDD2] flex items-start gap-2.5 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#0077ED] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-[#0F172A] block font-mono font-bold">100% Virgin Polymer</strong>
                  <span className="text-[#475569] text-[11px]">Unmatched wear life &amp; clarity</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E2DDD2] flex items-start gap-2.5 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-[#0F172A] block font-mono font-bold">SS 304 Tracks</strong>
                  <span className="text-[#475569] text-[11px]">Tool-less hook-on suspension</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E2DDD2] flex items-start gap-2.5 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-[#0F172A] block font-mono font-bold">Custom Sizing</strong>
                  <span className="text-[#475569] text-[11px]">Ready-to-hang pre-clamped kits</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E2DDD2] flex items-start gap-2.5 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-[#0F172A] block font-mono font-bold">Fast 24-48h Dispatch</strong>
                  <span className="text-[#475569] text-[11px]">Nationwide &amp; global shipping</span>
                </div>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigateSection('about')}
                className="px-5 py-2.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE4D7] text-[#0F172A] text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Read Full Company Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onOpenSampleModal}
                className="px-4 py-2.5 rounded-lg bg-[#0077ED]/20 hover:bg-[#0077ED]/30 text-[#0077ED] border border-[#0077ED]/40 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Request Physical Samples</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive 3D Isometric Factory Diagram */}
          <div className="lg:col-span-7">
            <IsometricFactoryDiagram 
              onSelectHotspotGrade={(grade) => {
                if (onSelectGradeForConfigurator) {
                  onSelectGradeForConfigurator(grade);
                } else {
                  onNavigateSection('configurator');
                }
              }}
              onOpenQuoteModal={onOpenQuoteModal}
            />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LATEST WORKS SHOWCASE (Direct from Image.png) */}
      {/* ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E2DDD2]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                [ RECENT INSTALLATIONS &amp; CASE STUDIES ]
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#0F172A] tracking-tight font-display">
              LATEST WORKS
            </h2>
            <p className="text-sm sm:text-base text-[#475569] font-light mt-1">
              Take a glimpse of some of our recent works across diverse industrial environments.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenQuoteModal}
            className="px-5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFE6] border border-[#D8D2C5] text-xs font-mono font-bold text-[#0F172A] transition-all self-start sm:self-auto flex items-center gap-2 cursor-pointer"
          >
            <span>Get Similar Setup For Your Unit</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0077ED]" />
          </button>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestWorks.map((work) => (
            <motion.div
              key={work.id}
              whileHover={{ y: -5 }}
              className="bg-[#FFFFFF] border border-[#E2DDD2] hover:border-[#0077ED]/50 rounded-2xl overflow-hidden shadow-xl group transition-all flex flex-col justify-between"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative w-full h-52 overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] via-transparent to-black/30" />
                  
                  {/* Category & Badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#FAF8F5]/90 backdrop-blur-md border border-[#D8D2C5] text-[10px] font-mono font-bold text-[#0077ED]">
                    {work.badge}
                  </span>
                  
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono text-[#475569] bg-[#FAF8F5] backdrop-blur-sm">
                    {work.location}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <div className="text-[11px] font-mono text-[#64748B] uppercase mb-0.5">{work.category}</div>
                    <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#0077ED] transition-colors">
                      {work.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#475569] leading-relaxed font-light line-clamp-2">
                    {work.description}
                  </p>

                  <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#EAE5DA] text-[11px] font-mono text-[#475569]">
                    <strong className="text-[#1E293B] block mb-0.5">Specifications:</strong>
                    {work.specs}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-[#EAE5DA] mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedWork(work)}
                  className="text-xs font-mono text-[#475569] hover:text-[#0077ED] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Inspect Details</span>
                  <Maximize2 className="w-3 h-3 text-[#0077ED]" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectGradeForConfigurator) {
                      onSelectGradeForConfigurator(work.grade);
                    } else {
                      onNavigateSection('configurator');
                    }
                  }}
                  className="text-xs font-mono font-bold text-[#0077ED] hover:text-[#ff9a4d] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Configure 3D &rarr;</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Gallery Gateway Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#D8D2C5] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0077ED]/10 border border-[#0077ED]/30 flex items-center justify-center flex-shrink-0">
              <Camera className="w-6 h-6 text-[#0077ED]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] font-mono uppercase tracking-wide">
                {language === 'hi' ? '19+ वास्तविक फैक्ट्री और प्रोजेक्ट तस्वीरें' : 'Complete 19+ Real Project Photo Archive'}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] font-normal mt-0.5 max-w-xl">
                {language === 'hi' 
                  ? 'वेयरहाउस लोडिंग बे, कोल्ड स्टोरेज, क्लीनरूम और हेवी-ड्यूटी एसएस ट्रैक्स की 19 वास्तविक तस्वीरें फुल स्क्रीन में देखें।' 
                  : 'Explore high-resolution authentic installations across warehouses, sub-zero cold rooms, and cleanrooms in dedicated full view.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateSection('real-photos')}
            className="w-full sm:w-auto flex-shrink-0 px-6 py-3.5 bg-[#0077ED] hover:bg-[#2B8EFF] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-xl shadow-[#0077ED]/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{language === 'hi' ? 'फुल स्क्रीन गैलरी खोलें (19)' : 'Open 19+ Photo Gallery'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SIGNATURE CONTACT & QUICK LINKS FOOTER (Cyan Theme matching Image.png) */}
      {/* ========================================================================= */}
      <footer className="relative bg-[#07242B] text-white pt-16 pb-8 border-t-2 border-cyan-500/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-cyan-800/40">
            
            {/* Column 1: Multi Enterprise Identity */}
            <div className="space-y-4">
              <MultiLogo textColor="white" />
              <p className="text-xs text-cyan-100/75 leading-relaxed font-light">
                Your trusted partner since 1998. India&apos;s leading industrial manufacturer of certified 100% virgin-grade PVC strip curtains, sub-zero cold room polar barriers, and SS304 suspension hardware.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-400/30 text-[11px] font-mono text-cyan-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
                  ISO 9001:2015 &amp; CE Certified
                </span>
              </div>
            </div>

            {/* Column 2: CONTACT INFORMATION (Direct from Image.png) */}
            <div className="space-y-3 font-mono text-xs">
              <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-300 border-b border-cyan-800/60 pb-2">
                CONTACT INFORMATION
              </h4>
              
              <div className="flex items-start gap-2.5 text-cyan-100/80">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  FF-5, Madhuram Complex, Keshav Nagar, Near R.T.O. Circle, Subhash Bridge, Ahmedabad - 380 027, Gujarat, India.
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-cyan-100/80 pt-1">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <div>
                  <a href="tel:+919377678155" className="hover:text-cyan-300 block">+91 9377 678 155</a>
                  <a href="tel:+919327000042" className="hover:text-cyan-300 block">+91 9327 000 042</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-cyan-100/80 pt-1">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <div>
                  <a href="mailto:multimehta@gmail.com" className="hover:text-cyan-300 block">multimehta@gmail.com</a>
                  <a href="mailto:mehtapolyfab@gmail.com" className="hover:text-cyan-300 block">mehtapolyfab@gmail.com</a>
                  <a href="mailto:info@multipvcstrip.com" className="hover:text-cyan-300 block">info@multipvcstrip.com</a>
                </div>
              </div>
            </div>

            {/* Column 3: QUICK LINKS (Direct from Image.png) */}
            <div className="space-y-3 font-mono text-xs">
              <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-300 border-b border-cyan-800/60 pb-2">
                QUICK LINKS
              </h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    type="button" 
                    onClick={() => onNavigateSection('home')} 
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-cyan-100/80"
                  >
                    <ChevronRight className="w-3 h-3 text-cyan-400" />
                    <span>Home</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onNavigateSection('about')} 
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-cyan-100/80"
                  >
                    <ChevronRight className="w-3 h-3 text-cyan-400" />
                    <span>About Us</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onNavigateSection('products')} 
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-cyan-100/80"
                  >
                    <ChevronRight className="w-3 h-3 text-cyan-400" />
                    <span>PVC Strip Curtain</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onNavigateSection('all-products')} 
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-cyan-100/80"
                  >
                    <ChevronRight className="w-3 h-3 text-cyan-400" />
                    <span>All Products</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onNavigateSection('happy-clients')} 
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-cyan-100/80"
                  >
                    <ChevronRight className="w-3 h-3 text-cyan-400" />
                    <span>Projects &amp; Happy Clients</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={onOpenQuoteModal} 
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-cyan-100/80"
                  >
                    <ChevronRight className="w-3 h-3 text-cyan-400" />
                    <span>Download Technical Catalogue</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: SO WHAT YOU THINK ? CTA (Direct from Image.png) */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-300 border-b border-cyan-800/60 pb-2">
                SO WHAT YOU THINK ?
              </h4>
              <p className="text-xs text-cyan-100/80 leading-relaxed font-light">
                Ready to transform your workspace with our best solutions? Let&apos;s talk now!
              </p>
              
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#07242B] font-mono font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CONTACT US</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-3 rounded-lg bg-cyan-900/40 border border-cyan-700/30 text-[11px] font-mono text-cyan-200">
                ⚡ 24-48 Hour Express Dispatch Guarantee Nationwide
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-cyan-300/60">
            <div>
              Copyright &copy; Designed and Developed for Multi Enterprise. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Ahmedabad, Gujarat, India</span>
              <span>•</span>
              <span>100% Virgin Grade Polymer</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox / Modal for Latest Work Inspection */}
      <AnimatePresence>
        {selectedWork && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#F8F6F0] border border-[#CFC8BA] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl text-[#0F172A]"
            >
              <div className="relative h-64 sm:h-72 w-full bg-[#F8F6F0]">
                <img
                  src={selectedWork.imageUrl}
                  alt={selectedWork.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedWork(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#E2DDD2] text-[#0F172A] flex items-center justify-center text-sm cursor-pointer border border-[#CFC8BA]"
                >
                  ✕
                </button>
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-[#0077ED] text-black font-mono font-bold text-xs">
                  {selectedWork.badge}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <div className="text-xs font-mono text-[#0077ED] uppercase">{selectedWork.category} • {selectedWork.location}</div>
                  <h3 className="text-xl font-bold text-[#0F172A] mt-1">{selectedWork.title}</h3>
                </div>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                  {selectedWork.description}
                </p>

                <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E2DDD2] text-xs font-mono text-[#334155]">
                  <strong className="text-white block mb-1">Technical Bill of Materials &amp; Specs:</strong>
                  {selectedWork.specs}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const grade = selectedWork.grade;
                      setSelectedWork(null);
                      if (onSelectGradeForConfigurator) {
                        onSelectGradeForConfigurator(grade);
                      } else {
                        onNavigateSection('configurator');
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE4D7] text-xs font-mono font-bold text-[#0F172A] cursor-pointer"
                  >
                    Open in 3D CAD
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedWork(null);
                      onOpenQuoteModal();
                    }}
                    className="px-4 py-2 rounded-lg bg-[#0077ED] hover:bg-[#2B8EFF] text-xs font-mono font-bold text-white cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Request Similar Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
