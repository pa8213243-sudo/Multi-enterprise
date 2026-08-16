import React, { useState, useEffect, useRef } from 'react';
import { MultiLogo, MultiLogoIcon } from './MultiLogo';
import { CLIENT_COMPANIES, CUSTOMER_SHOWCASE_ITEMS, ClientCompany, CustomerShowcaseItem } from '../data/clientsAndProducts';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  Layers, 
  Globe, 
  PhoneCall,
  Mail,
  MapPin,
  Heart,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

interface HappyClientsShowcaseProps {
  onOpenDirectQuote: () => void;
  onOpenSampleModal?: () => void;
}

export const HappyClientsShowcase: React.FC<HappyClientsShowcaseProps> = ({
  onOpenDirectQuote,
  onOpenSampleModal
}) => {
  const { language } = useLanguage();
  const [activeAvatarIndex, setActiveAvatarIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [filterSector, setFilterSector] = useState<string>('All');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sectors = [
    'All',
    'Pharma & Biotech',
    'Food & Dairy',
    'Power & Energy',
    'Heavy Industry & Auto',
    'Hospitality & Luxury',
    'Ports & Logistics'
  ];

  const filteredCompanies = filterSector === 'All' 
    ? CLIENT_COMPANIES 
    : CLIENT_COMPANIES.filter(c => c.sector === filterSector);

  // Auto-play horizontal video-style slideshow
  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setActiveAvatarIndex((prev) => (prev + 1) % CUSTOMER_SHOWCASE_ITEMS.length);
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    setActiveAvatarIndex((prev) => (prev + 1) % CUSTOMER_SHOWCASE_ITEMS.length);
  };

  const handlePrev = () => {
    setActiveAvatarIndex((prev) => (prev - 1 + CUSTOMER_SHOWCASE_ITEMS.length) % CUSTOMER_SHOWCASE_ITEMS.length);
  };

  return (
    <section id="happy-clients" className="py-24 bg-[#07080A] text-[#E0E0E0] border-t border-white/10 relative overflow-hidden">
      {/* Precision Industrial Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* ========================================================================= */}
        {/* PART 1: SOME OF OUR HAPPY CLIENTS - 21 ENTERPRISE LOGO MATRIX (IMAGE 2) */}
        {/* ========================================================================= */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <MultiLogoIcon size={18} className="w-4.5 h-4.5" />
              <span className="text-[#F27D26] text-xs font-mono tracking-widest uppercase font-bold">
                [ {language === 'hi' ? '30+ वर्षों का विश्वास • 10,000+ ग्राहक' : 'TRUSTED INDUSTRIAL CLIENTELE'} ]
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-display mb-3">
              SOME OF OUR HAPPY CLIENTS
            </h2>

            <p className="text-xs sm:text-sm text-white/60 font-light max-w-xl mx-auto font-sans">
              Sharing few of the clients from over 10,000+ served over 3 decades across pharmaceuticals, food logistics, automotive, and infrastructure sectors.
            </p>

            {/* Sector Filter Chips */}
            <div className="flex items-center justify-center flex-wrap gap-1.5 mt-6">
              {sectors.map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setFilterSector(sec)}
                  className={`px-3 py-1 text-[11px] font-mono border transition-all cursor-pointer ${
                    filterSector === sec
                      ? 'bg-[#F27D26] text-white border-[#F27D26] font-bold shadow-md'
                      : 'bg-black/40 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Authentic 21-Enterprise High-Contrast Logo Matrix Grid (Clean White Card Archetype from Official Brochure) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {filteredCompanies.map((company, idx) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, delay: (idx % 8) * 0.03 }}
                className="group bg-[#FFFFFF] hover:bg-[#FAFAFA] border border-gray-200 hover:border-[#F27D26] rounded-none p-5 sm:p-6 flex flex-col items-center justify-center min-h-[110px] sm:min-h-[125px] transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden"
              >
                {/* Visual Company Brand Representation */}
                <div className="text-center w-full">
                  <div className="font-display font-black text-lg sm:text-xl tracking-tight text-[#111827] group-hover:scale-105 transition-transform duration-200">
                    {company.name}
                  </div>
                  {company.subtext && (
                    <div className="text-[10px] sm:text-[11px] font-medium tracking-wide text-gray-500 font-sans mt-0.5">
                      {company.subtext}
                    </div>
                  )}
                </div>

                {/* Subdued Sector & City Tag */}
                <div className="absolute bottom-1.5 right-2 text-[8px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {company.city}
                </div>

                {/* Subtle Orange Hover Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#F27D26] transition-colors" />
              </motion.div>
            ))}
          </div>

          {/* 10,000+ Milestone Counter Banner */}
          <div className="mt-8 max-w-5xl mx-auto bg-[#101215] border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F27D26]/20 border border-[#F27D26] flex items-center justify-center text-[#F27D26] font-mono font-bold text-sm">
                30+
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono uppercase">
                  Years of Uninterrupted Industrial Supply
                </div>
                <div className="text-[11px] text-white/50 font-light">
                  Supplying cold storage, cleanrooms, and factory bays nationwide.
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 border border-emerald-500/30">
              ✓ 10,000+ Installations Completed
            </div>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* PART 2: INTERACTIVE VIDEO-STYLE FLOWING CLIENT SHOWCASE CAROUSEL (IMAGES 3 & 4 + VIDEO) */}
        {/* ========================================================================================= */}
        <div className="pt-10 border-t border-white/10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <div className="text-[#F27D26] text-xs font-mono tracking-widest uppercase font-bold mb-2">
              [ CLIENT VALIDATION & FACILITY PROFILES ]
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase font-display mb-3">
              OUR HAPPY CUSTOMERS
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-light max-w-lg mx-auto">
              Visual installation showcases and verified operational facility profiles.
            </p>

            {/* Interactive Top Avatar Selector Bar (Matching Image 3 and Video) */}
            <div className="flex items-center justify-center gap-2 sm:gap-3.5 mt-8 overflow-x-auto py-2">
              {CUSTOMER_SHOWCASE_ITEMS.map((item, idx) => {
                const isActive = activeAvatarIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveAvatarIndex(idx);
                      setIsPlaying(false);
                    }}
                    title={item.clientName}
                    aria-label={`Select ${item.clientName}`}
                    className={`relative rounded-full p-0.5 transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'ring-2 ring-[#F27D26] scale-125 shadow-[0_0_15px_#F27D26]' 
                        : 'opacity-50 hover:opacity-100 hover:scale-110'
                    }`}
                  >
                    <img
                      src={item.avatarUrl}
                      alt={item.clientName}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-white/20"
                    />
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F27D26]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Flowing Carousel Card Stage (Smooth Video-Style 3D Perspective Animation) */}
          <div className="relative max-w-4xl mx-auto min-h-[280px] sm:min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {(() => {
                const current = CUSTOMER_SHOWCASE_ITEMS[activeAvatarIndex];
                return (
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 0.94, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -15 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full bg-[#121418] border border-white/15 p-6 sm:p-8 shadow-2xl relative"
                  >
                    {/* Top Corner Technical Badge */}
                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={current.avatarUrl}
                          alt={current.clientName}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#F27D26]"
                        />
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-white font-mono uppercase tracking-tight">
                            {current.clientName}
                          </h4>
                          <div className="text-xs font-mono text-[#F27D26]">
                            {current.sector} • {current.location}
                          </div>
                        </div>
                      </div>

                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 border border-emerald-500/30 uppercase font-bold">
                          {current.verifiedYear}
                        </span>
                      </div>
                    </div>

                    {/* Facility & Installed Products Info Grid (Clean Data, No Text Feedback) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/40 p-4 border border-white/5 mb-4">
                      <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">
                          [ FACILITY APPLICATION ]
                        </div>
                        <div className="text-xs sm:text-sm font-mono text-white/90 font-medium">
                          {current.facilityType}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">
                          [ MULTI ENTERPRISE SYSTEMS INSTALLED ]
                        </div>
                        <div className="text-xs sm:text-sm font-mono text-[#F27D26] font-medium">
                          {current.productInstalled}
                        </div>
                      </div>
                    </div>

                    {/* Verified Guarantee Seal */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-white/50 pt-2">
                      <span className="flex items-center gap-1.5 text-white/70">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        Direct Factory Sourced & Maintained
                      </span>
                      <span>Verified Client Facility</span>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* Video-Style Navigation & Play/Pause Controls Bar */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous customer facility"
              className="p-2.5 bg-[#121418] hover:bg-[#F27D26] text-white border border-white/10 hover:border-[#F27D26] transition-all cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause auto slideshow' : 'Play auto slideshow'}
              className="px-4 py-2 bg-[#121418] hover:bg-[#F27D26] text-white border border-white/10 hover:border-[#F27D26] text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#F27D26] group-hover:text-white" />
                  <span>Pause Motion</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#F27D26] group-hover:text-white" />
                  <span>Auto Flow</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next customer facility"
              className="p-2.5 bg-[#121418] hover:bg-[#F27D26] text-white border border-white/10 hover:border-[#F27D26] transition-all cursor-pointer shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* ========================================================================= */}
          {/* REPRESENTATIVE INDUSTRIAL INSTALLATION GALLERY (METAL-BORDER DESIGN)     */}
          {/* ========================================================================= */}
          <div className="mt-20 pt-16 border-t border-white/10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="text-[#F27D26] text-xs font-mono tracking-widest uppercase font-bold mb-2">
                [ VERIFIED PLANT INSTALLATIONS ]
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white uppercase font-display">
                FIELD INSTALLATION PHOTO ARCHIVE
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light mt-2">
                Real-world heavy duty deployments across pharmaceutical cleanrooms, sub-zero cold chains, and manufacturing facilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  id: 'inst-1',
                  title: 'Pharma Airlock Partition',
                  facility: 'Sterile Tablet Formulation SEZ',
                  location: 'Sanand, Gujarat',
                  specs: '200mm x 2mm Anti-Static ESD Clear • 50% Overlap',
                  img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
                  badge: 'CLEANROOM AIRLOCK'
                },
                {
                  id: 'inst-2',
                  title: 'Sub-Zero Blast Freezer Portal',
                  facility: 'Dairy & Ice Cream Distribution Hub',
                  location: 'Kandla Free Trade Zone',
                  specs: '300mm x 3mm Cryogenic Polar Grade (-50°C) • 67% Overlap',
                  img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
                  badge: 'CRYOGENIC FREEZER'
                },
                {
                  id: 'inst-3',
                  title: 'Robotic Welding Flash Shield',
                  facility: 'Heavy Commercial Vehicle Line',
                  location: 'Chakan Industrial Area, Pune',
                  specs: '300mm x 3mm Bronze Arc-Flash Shield • Sliding Track',
                  img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
                  badge: 'WELDING SAFETY'
                },
                {
                  id: 'inst-4',
                  title: 'Heavy Forklift Loading Bay',
                  facility: 'FMCG Central Logistics Warehouse',
                  location: 'Bhiwandi Logistics Hub, Mumbai',
                  specs: '300mm x 3mm Double Ribbed Heavy Duty • 100% Overlap',
                  img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
                  badge: 'DOUBLE RIBBED'
                },
                {
                  id: 'inst-5',
                  title: 'HACCP Pest Barrier Entrance',
                  facility: 'Confectionery & Bakery Plant',
                  location: 'Anand Dairy SEZ, Gujarat',
                  specs: '200mm x 2mm Amber Anti-Insect • Lemongrass Infused',
                  img: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
                  badge: 'ANTI-INSECT 570nm'
                },
                {
                  id: 'inst-6',
                  title: 'Machinery Acoustic Partition',
                  facility: 'Precision CNC Machining Shop',
                  location: 'Peenya Industrial Estate, Bengaluru',
                  specs: '400mm x 4mm Industrial Acoustic Clear • SS304 Track',
                  img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
                  badge: 'ACOUSTIC DAMPENING'
                }
              ].map((inst) => (
                <div 
                  key={inst.id}
                  className="group bg-[#111317] border border-white/20 hover:border-[#F27D26] rounded-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Photo Container */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black/50">
                    <img
                      src={inst.img}
                      alt={inst.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-transparent opacity-80" />
                    
                    {/* Metal Badge */}
                    <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded text-[9px] font-mono font-bold text-[#F27D26] tracking-wider uppercase">
                      {inst.badge}
                    </div>

                    <div className="absolute bottom-2 left-3 right-3 text-xs font-mono text-white/70 truncate">
                      📍 {inst.location}
                    </div>
                  </div>

                  {/* Metadata Card Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white font-mono uppercase tracking-tight mb-1 group-hover:text-[#F27D26] transition-colors">
                        {inst.title}
                      </h4>
                      <p className="text-xs text-white/50 font-sans mb-3">
                        {inst.facility}
                      </p>
                    </div>

                    <div className="bg-black/40 border border-white/10 p-2 rounded text-[10px] font-mono text-[#F27D26]">
                      {inst.specs}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* GEOMETRIC ORANGE BRICK HEART MOTIF & QUICK ACTION BUTTON (IMAGE 3 & 4)    */}
          {/* ========================================================================= */}
          <div className="mt-16 flex flex-col items-center justify-center">
            {/* Pixel / Geometric Brick Heart Graphic */}
            <div className="flex flex-col items-center gap-1.5 opacity-90 mb-6">
              <div className="flex gap-2">
                <div className="w-7 h-2 bg-[#F27D26]/80 rounded-sm" />
                <div className="w-7 h-2 bg-[#F27D26]/80 rounded-sm" />
              </div>
              <div className="flex gap-1.5">
                <div className="w-9 h-2 bg-[#F27D26] rounded-sm" />
                <div className="w-9 h-2 bg-[#F27D26] rounded-sm" />
              </div>
              <div className="w-16 h-2 bg-[#F27D26] rounded-sm" />
              <div className="w-12 h-2 bg-[#F27D26] rounded-sm" />
              <div className="w-8 h-2 bg-[#F27D26] rounded-sm" />
              <div className="w-4 h-2 bg-[#F27D26] rounded-sm" />
            </div>

            {/* Glassmorphic Contact & Quotation Anchor Pill Bar (Matching Image 3) */}
            <div className="inline-flex items-center gap-3 p-2 bg-black/60 backdrop-blur-md border border-white/20 shadow-2xl">
              <span className="text-xs font-mono font-bold text-white/70 px-3 uppercase">
                TRUSTED SINCE 1998
              </span>
              <span className="text-white/30">•</span>
              <button
                type="button"
                onClick={onOpenDirectQuote}
                className="px-5 py-2 bg-[#F27D26] hover:bg-[#e06c19] text-white font-mono text-xs font-bold uppercase transition-all shadow-[0_0_20px_rgba(242,125,38,0.4)] cursor-pointer"
              >
                GET OFFICIAL QUOTE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
