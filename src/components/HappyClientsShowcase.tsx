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

const CompanyRoundIcon: React.FC<{ companyId: string; size?: 'sm' | 'md' | 'lg' }> = ({ companyId, size = 'sm' }) => {
  const isLarge = size === 'lg';
  const containerClass = isLarge 
    ? 'w-12 h-12 rounded-full bg-white border-2 border-[#0077ED] flex items-center justify-center p-1.5 shadow-md shrink-0 overflow-hidden'
    : 'w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#D8D2C5] flex items-center justify-center p-1 shadow-sm shrink-0 overflow-hidden';

  switch (companyId) {
    case 'amul':
      return (
        <div className={containerClass}>
          <div className="bg-[#E31E24] w-full h-full rounded-full flex flex-col items-center justify-center">
            <span className="font-serif italic font-black text-[11px] text-white leading-none">Amul</span>
          </div>
        </div>
      );
    case 'zydus':
      return (
        <div className={containerClass}>
          <div className="flex items-center justify-center">
            <span className="font-black text-[11px] text-[#002B7F]">Zy<span className="text-[#E52421] font-bold">+</span>us</span>
          </div>
        </div>
      );
    case 'sun-pharma':
      return (
        <div className={containerClass}>
          <div className="flex flex-col items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-t-[#D97706] border-r-[#D97706] border-b-transparent border-l-transparent rotate-45" />
            <span className="font-black text-[6.5px] text-[#0F172A] uppercase leading-tight font-display">SUN</span>
          </div>
        </div>
      );
    case 'torrent-power':
      return (
        <div className={containerClass}>
          <div className="w-4 h-4 bg-[#F97316] rounded-xs flex items-center justify-center">
            <span className="text-white text-[7.5px] font-mono font-bold">TP</span>
          </div>
        </div>
      );
    case 'tata-motors':
    case 'tata':
      return (
        <div className={containerClass}>
          <svg className="w-6 h-4 text-[#00529B]" viewBox="0 0 100 65" fill="none">
            <ellipse cx="50" cy="32" rx="46" ry="28" stroke="currentColor" strokeWidth="8" fill="none" />
            <path d="M28,24 Q50,10 72,24 M50,14 L50,52" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
          </svg>
        </div>
      );
    case 'ford':
      return (
        <div className={containerClass}>
          <div className="w-full h-full rounded-full bg-[#002C6C] flex items-center justify-center">
            <span className="font-serif italic font-black text-[9.5px] text-white">Ford</span>
          </div>
        </div>
      );
    case 'intas':
      return (
        <div className={containerClass}>
          <div className="w-full h-full rounded-full border border-[#003399] flex items-center justify-center bg-blue-50/50">
            <span className="font-bold text-[7px] text-[#003399] font-mono">INTAS</span>
          </div>
        </div>
      );
    case 'glenmark':
      return (
        <div className={containerClass}>
          <div className="w-4.5 h-4.5 rounded-full bg-[#E30613] flex items-center justify-center text-white font-bold text-[9px]">
            g
          </div>
        </div>
      );
    case 'taj-hotels':
    case 'taj':
      return (
        <div className={containerClass}>
          <div className="flex flex-col items-center">
            <svg className="w-4 h-3 text-[#B8860B]" viewBox="0 0 30 20" fill="currentColor">
              <path d="M15,2 L19,10 L27,4 L24,18 L6,18 L3,4 L11,10 Z"/>
            </svg>
            <span className="font-serif font-black text-[6.5px] text-[#8B6508]">TAJ</span>
          </div>
        </div>
      );
    case 'reliance':
      return (
        <div className={containerClass}>
          <div className="w-4.5 h-4.5 rounded-full bg-[#C89D35] flex items-center justify-center text-white font-serif font-bold text-[8.5px]">
            R
          </div>
        </div>
      );
    case 'adani-ports':
    case 'adani-power':
    case 'adani-energy':
    case 'adani-realty':
      return (
        <div className={containerClass}>
          <span className="font-black text-[10px] text-[#005A9C] tracking-tight">ad<span className="text-[#8A2BE2]">a</span><span className="text-[#E91E63]">ni</span></span>
        </div>
      );
    case 'nirma':
      return (
        <div className={containerClass}>
          <div className="w-full h-full rounded-full bg-[#FFD700] flex items-center justify-center border border-[#D8232A]">
            <span className="font-black text-[7.5px] text-[#D8232A] font-sans uppercase">NIRMA</span>
          </div>
        </div>
      );
    case 'itc-hotels':
      return (
        <div className={containerClass}>
          <div className="w-4.5 h-4.5 rounded bg-[#002B7F] flex items-center justify-center text-white font-bold text-[7.5px]">
            ITC
          </div>
        </div>
      );
    case 'essar':
      return (
        <div className={containerClass}>
          <span className="font-black text-[8px] text-[#E60000] tracking-tighter">ESSAR</span>
        </div>
      );
    default:
      return (
        <div className={containerClass}>
          <Building2 className="w-4 h-4 text-[#0077ED]" />
        </div>
      );
  }
};

const CompanyBrandLogo: React.FC<{ companyId: string; name: string; subtext?: string }> = ({ companyId, name, subtext }) => {
  switch (companyId) {
    case 'amul':
      return (
        <div className="flex flex-col items-center">
          <div className="bg-[#E31E24] px-3.5 py-1 rounded-sm shadow-xs flex items-center justify-center">
            <span className="font-serif italic font-black text-2xl text-white tracking-tight leading-none">
              Amul
            </span>
          </div>
          <div className="bg-[#00875A] px-2 py-0.5 mt-0.5 rounded-2xs shadow-2xs">
            <span className="text-[7.5px] font-sans font-bold tracking-wider uppercase text-white leading-none block">
              The Taste of India
            </span>
          </div>
        </div>
      );

    case 'zydus':
      return (
        <div className="flex flex-col items-center justify-center py-1">
          <div className="text-2xl font-black text-[#002B7F] font-sans tracking-tight leading-none flex items-center">
            <span>Zy</span>
            <span className="relative">
              d<span className="absolute left-[3px] top-[7px] text-[#E52421] text-xs font-bold leading-none">+</span>
            </span>
            <span>us</span>
          </div>
        </div>
      );

    case 'sun-pharma':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-6 h-6 rounded-full border-[2.5px] border-[#D97706] border-t-transparent relative flex items-center justify-center mb-0.5">
            <div className="w-3 h-3 rounded-full border-[2px] border-[#D97706] border-b-transparent" />
          </div>
          <div className="text-center font-display font-black leading-tight text-xs tracking-wider text-[#0F172A] uppercase">
            SUN
            <span className="block text-[8.5px] tracking-widest text-[#475569] font-sans">PHARMA</span>
          </div>
        </div>
      );

    case 'torrent-power':
      return (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#F97316] rounded-xs flex items-center justify-center p-1 shadow-xs">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 bg-white rotate-45" />
              <div className="w-1.5 h-1.5 bg-white rotate-45" />
              <div className="w-1.5 h-1.5 bg-white rotate-45" />
              <div className="w-1.5 h-1.5 bg-white rotate-45" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-black lowercase text-[#334155] font-sans leading-none">torrent</span>
            <span className="text-[9px] font-black uppercase text-[#1E293B] font-mono tracking-wider">POWER</span>
          </div>
        </div>
      );

    case 'essar':
      return (
        <div className="flex items-center justify-center">
          <span className="text-xl font-black tracking-wider text-[#0F172A] font-sans uppercase relative pr-2.5">
            ESSAR
            <span className="absolute -top-1 right-0 text-[#E52421] text-xs font-bold">✦</span>
          </span>
        </div>
      );

    case 'torrent-pharma':
      return (
        <div className="flex items-center gap-2">
          <div className="w-6 h-9 bg-[#1E3A8A] rounded-xs flex flex-col items-center justify-around py-1 shadow-xs">
            <div className="w-1.5 h-1.5 bg-white" />
            <div className="w-1.5 h-1.5 bg-white" />
            <div className="w-1.5 h-1.5 bg-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-black lowercase text-[#1E3A8A] font-sans leading-none">torrent</span>
            <div className="h-[2px] bg-[#1E3A8A] w-full my-0.5" />
            <span className="text-[8.5px] font-black uppercase text-[#334155] font-mono tracking-wider">PHARMA</span>
          </div>
        </div>
      );

    case 'nirma':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="text-[#D8232A] text-xs leading-none mb-0.5">💃</div>
          <span className="text-lg font-black text-[#D8232A] italic tracking-wider font-sans uppercase leading-none">
            NIRMA
          </span>
        </div>
      );

    case 'adani-ports':
      return (
        <div className="flex flex-col items-center">
          <div className="text-xl font-black lowercase font-sans tracking-tight leading-none">
            <span className="text-[#007ACC]">ad</span>
            <span className="text-[#8A2BE2]">a</span>
            <span className="text-[#C2185B]">ni</span>
          </div>
          <div className="h-[1.5px] bg-[#007ACC] w-14 my-0.5" />
          <span className="text-[8px] font-sans font-bold text-[#475569] tracking-tight">Ports and Logistics</span>
        </div>
      );

    case 'adani-power':
      return (
        <div className="flex flex-col items-center">
          <div className="text-xl font-black lowercase font-sans tracking-tight leading-none">
            <span className="text-[#007ACC]">ad</span>
            <span className="text-[#8A2BE2]">a</span>
            <span className="text-[#C2185B]">ni</span>
          </div>
          <div className="h-[1.5px] bg-[#007ACC] w-12 my-0.5" />
          <span className="text-[9px] font-sans font-bold text-[#475569]">Power</span>
        </div>
      );

    case 'adani-energy':
      return (
        <div className="flex items-center gap-1.5">
          <div className="text-lg font-black lowercase font-sans tracking-tight leading-none">
            <span className="text-[#007ACC]">ad</span>
            <span className="text-[#8A2BE2]">a</span>
            <span className="text-[#C2185B]">ni</span>
          </div>
          <div className="w-[1px] h-6 bg-[#94A3B8]" />
          <span className="text-[8px] font-sans font-medium text-[#475569] leading-tight text-left">Energy<br/>Solutions</span>
        </div>
      );

    case 'tata-motors':
      return (
        <div className="flex flex-col items-center">
          <div className="w-11 h-6 rounded-full bg-[#0077ED]/15 border border-[#0077ED]/40 flex items-center justify-center mb-0.5">
            <svg className="w-7 h-4 text-[#0077ED]" viewBox="0 0 100 65" fill="none">
              <ellipse cx="50" cy="32" rx="46" ry="28" stroke="currentColor" strokeWidth="9" fill="none" />
              <path d="M28,24 Q50,10 72,24 M50,14 L50,52" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-xs font-black tracking-widest text-[#0077ED] font-mono uppercase leading-tight">TATA</span>
          <span className="text-[7.5px] font-bold text-[#00529B] font-mono uppercase tracking-wider">TATA MOTORS</span>
        </div>
      );

    case 'ford':
      return (
        <div className="flex flex-col items-center">
          <div className="px-4 py-1.5 bg-[#002C6C] rounded-full border-2 border-white ring-1 ring-[#002C6C] shadow-sm flex items-center justify-center">
            <span className="font-serif italic font-black text-sm text-white tracking-wider">
              Ford
            </span>
          </div>
        </div>
      );

    case 'intas':
      return (
        <div className="flex flex-col items-center">
          <div className="px-3.5 py-0.5 rounded-md border-2 border-[#003399] bg-blue-50/40 mb-0.5 shadow-2xs">
            <span className="text-xs font-black text-[#003399] font-mono tracking-wider uppercase">INTAS</span>
          </div>
          <span className="text-[7.5px] font-mono text-[#003399] font-bold tracking-tight uppercase">INTAS PHARMACEUTICALS</span>
        </div>
      );

    case 'glenmark':
      return (
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 rounded-full bg-[#E30613] text-white flex items-center justify-center font-bold text-xs shadow-xs mb-0.5">
            e
          </div>
          <span className="text-sm font-serif font-black text-[#E30613] tracking-tight">Glenmark</span>
        </div>
      );

    case 'taj-hotels':
    case 'taj':
      return (
        <div className="flex flex-col items-center">
          <svg className="w-6 h-5 text-[#B8860B] mb-0.5" viewBox="0 0 30 20" fill="currentColor">
            <path d="M15,2 L19,10 L27,4 L24,18 L6,18 L3,4 L11,10 Z"/>
          </svg>
          <span className="text-base font-serif font-black tracking-[0.25em] text-[#8B6508] uppercase block leading-none">
            TAJ
          </span>
        </div>
      );

    case 'hyatt':
      return (
        <div className="flex items-center justify-center py-1">
          <span className="text-lg font-serif font-black tracking-[0.2em] text-[#0077ED] uppercase">
            HYATT<sup className="text-[9px] font-sans font-normal ml-0.5">®</sup>
          </span>
        </div>
      );

    case 'reliance':
      return (
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 rounded-full bg-[#C89D35] flex items-center justify-center text-white mb-0.5 shadow-xs">
            <span className="font-serif font-bold text-xs">R</span>
          </div>
          <span className="text-sm font-serif font-bold text-[#0F172A] tracking-tight">Reliance</span>
        </div>
      );

    case 'tata':
    case 'tata-group':
      return (
        <div className="flex flex-col items-center">
          <div className="w-9 h-5 rounded-full bg-[#0077ED]/15 border border-[#0077ED]/40 flex items-center justify-center mb-0.5">
            <svg className="w-6 h-3.5 text-[#0077ED]" viewBox="0 0 100 65" fill="none">
              <ellipse cx="50" cy="32" rx="46" ry="28" stroke="currentColor" strokeWidth="9" fill="none" />
              <path d="M28,24 Q50,10 72,24 M50,14 L50,52" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-sm font-black tracking-[0.2em] text-[#0077ED] font-mono uppercase">TATA</span>
        </div>
      );

    case 'pvr-cinemas':
    case 'pvr-inox':
      return (
        <div className="bg-[#111827] px-3.5 py-1.5 rounded-sm shadow-sm flex flex-col items-center justify-center">
          <span className="text-xs font-black text-[#D4AF37] tracking-widest font-sans leading-none">PVR</span>
          <span className="text-[6.5px] font-mono text-[#D4AF37] tracking-wider uppercase mt-0.5">CINEMAS</span>
        </div>
      );

    case 'adani-realty':
      return (
        <div className="flex flex-col items-center">
          <div className="text-xl font-black lowercase font-sans tracking-tight leading-none">
            <span className="text-[#007ACC]">ad</span>
            <span className="text-[#8A2BE2]">a</span>
            <span className="text-[#C2185B]">ni</span>
          </div>
          <div className="h-[1.5px] bg-[#007ACC] w-12 my-0.5" />
          <span className="text-[9px] font-sans font-bold text-[#475569]">Realty</span>
        </div>
      );

    case 'itc-hotels':
      return (
        <div className="flex flex-col items-center text-center">
          <div className="text-[#B8860B] text-xs font-serif leading-none mb-0.5">⋒</div>
          <span className="text-[11px] font-serif font-black tracking-[0.15em] text-[#1E293B] uppercase leading-tight">
            ITC HOTELS
          </span>
          <div className="h-[1px] bg-[#D4AF37] w-16 my-0.5" />
          <span className="text-[6.5px] font-serif text-[#B8860B] uppercase tracking-wider">RESPONSIBLE LUXURY</span>
        </div>
      );

    default:
      return (
        <div className="text-center w-full">
          <div className="font-display font-black text-base sm:text-lg tracking-tight text-[#0F172A] group-hover:text-[#0077ED] transition-colors">
            {name}
          </div>
          {subtext && (
            <div className="text-[10px] font-medium tracking-wide text-[#64748B] font-sans mt-0.5">
              {subtext}
            </div>
          )}
        </div>
      );
  }
};

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
    { id: 'All', label: language === 'hi' ? 'सभी क्षेत्र' : 'All' },
    { id: 'Pharma & Biotech', label: language === 'hi' ? 'फार्मा और बायोटेक' : 'Pharma & Biotech' },
    { id: 'Food & Dairy', label: language === 'hi' ? 'खाद्य और डेयरी' : 'Food & Dairy' },
    { id: 'Power & Energy', label: language === 'hi' ? 'ऊर्जा और पावर' : 'Power & Energy' },
    { id: 'Heavy Industry & Auto', label: language === 'hi' ? 'भारी उद्योग और ऑटो' : 'Heavy Industry & Auto' },
    { id: 'Hospitality & Luxury', label: language === 'hi' ? 'हॉस्पिटैलिटी और होटल' : 'Hospitality & Luxury' },
    { id: 'Ports & Logistics', label: language === 'hi' ? 'लॉजिस्टिक्स और वेयरहाउस' : 'Ports & Logistics' }
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
    <section id="happy-clients" className="py-10 sm:py-12 bg-[#F8F6F0] text-[#1E293B] border-t border-[#E2DDD2] relative overflow-hidden">
      {/* Precision Industrial Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
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
              <span className="text-[#0077ED] text-xs font-mono tracking-widest uppercase font-bold">
                [ {language === 'hi' ? '30+ वर्षों का विश्वास • 10,000+ ग्राहक' : 'TRUSTED INDUSTRIAL CLIENTELE'} ]
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F172A] uppercase font-display mb-3">
              {language === 'hi' ? 'हमारे सम्मानित एवं संतुष्ट ग्राहक' : 'SOME OF OUR HAPPY CLIENTS'}
            </h2>

            <p className="text-xs sm:text-sm text-[#475569] font-light max-w-xl mx-auto font-sans">
              {language === 'hi'
                ? '3 दशकों में फार्मास्युटिकल्स, खाद्य लॉजिस्टिक्स, ऑटोमोटिव और बुनियादी ढांचा क्षेत्रों में सेवा प्राप्त 10,000+ ग्राहकों में से कुछ प्रमुख नाम।'
                : 'Sharing few of the clients from over 10,000+ served over 3 decades across pharmaceuticals, food logistics, automotive, and infrastructure sectors.'}
            </p>

            {/* Sector Filter Chips */}
            <div className="flex items-center justify-center flex-wrap gap-1.5 mt-6">
              {sectors.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setFilterSector(sec.id)}
                  className={`px-3 py-1 text-[11px] font-mono border transition-all cursor-pointer ${
                    filterSector === sec.id
                      ? 'bg-[#0077ED] text-white border-[#0077ED] font-bold shadow-md'
                      : 'bg-[#FAF8F5] text-[#475569] border-[#E2DDD2] hover:border-[#B8AF9F] hover:text-[#0077ED]'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Authentic 21-Enterprise High-Contrast Logo Matrix Grid (Clean White Card Archetype with Real Corporate Emblems) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {filteredCompanies.map((company, idx) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, delay: (idx % 8) * 0.03 }}
                className="group bg-[#FFFFFF] hover:bg-[#FAF8F5] border border-[#E2DDD2] hover:border-[#0077ED] rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center min-h-[115px] sm:min-h-[128px] transition-all duration-300 shadow-xs hover:shadow-xl relative overflow-hidden cursor-pointer"
              >
                {/* Visual Company Brand Emblem & Typography */}
                <div className="text-center w-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <CompanyBrandLogo companyId={company.id} name={company.name} subtext={company.subtext} />
                </div>

                {/* Subdued Sector & City Tag */}
                <div className="absolute bottom-1.5 right-2 text-[8px] font-mono text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity">
                  {company.city}
                </div>

                {/* Bottom Blue Accent Hover Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-transparent group-hover:bg-[#0077ED] transition-colors" />
              </motion.div>
            ))}
          </div>

          {/* 10,000+ Milestone Counter Banner */}
          <div className="mt-8 max-w-5xl mx-auto bg-[#FFFFFF] border border-[#E2DDD2] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0077ED]/20 border border-[#0077ED] flex items-center justify-center text-[#0077ED] font-mono font-bold text-sm">
                30+
              </div>
              <div>
                <div className="text-xs font-bold text-[#0F172A] font-mono uppercase">
                  {language === 'hi' ? '30+ वर्षों की निरंतर औद्योगिक आपूर्ति' : 'Years of Uninterrupted Industrial Supply'}
                </div>
                <div className="text-[11px] text-[#64748B] font-light">
                  {language === 'hi' ? 'देश भर में कोल्ड स्टोरेज, क्लीनरूम और फैक्ट्री बे की विश्वसनीय आपूर्ति।' : 'Supplying cold storage, cleanrooms, and factory bays nationwide.'}
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-emerald-600 font-bold bg-emerald-500/10 px-3 py-1.5 border border-emerald-500/30 rounded-lg">
              {language === 'hi' ? '✓ 10,000+ सफल इंस्टॉलेशन पूर्ण' : '✓ 10,000+ Installations Completed'}
            </div>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* PART 2: INTERACTIVE VIDEO-STYLE FLOWING CLIENT SHOWCASE CAROUSEL (IMAGES 3 & 4 + VIDEO) */}
        {/* ========================================================================================= */}
        <div className="pt-10 border-t border-[#E2DDD2] relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <div className="text-[#0077ED] text-xs font-mono tracking-widest uppercase font-bold mb-2">
              [ {language === 'hi' ? 'ग्राहक समीक्षा एवं सुविधा प्रोफाइल' : 'CLIENT VALIDATION & FACILITY PROFILES'} ]
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] uppercase font-display mb-3">
              {language === 'hi' ? 'हमारे संतुष्ट ग्राहक' : 'OUR HAPPY CUSTOMERS'}
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] font-light max-w-lg mx-auto">
              {language === 'hi' ? 'वास्तविक इंस्टॉलेशन वीडियो और सत्यापित परिचालन प्रोफाइल।' : 'Visual installation showcases and verified operational facility profiles.'}
            </p>

            {/* Interactive Top Company Logo Selector Bar */}
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
                    className={`relative rounded-full transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'ring-4 ring-[#0077ED] scale-125 shadow-[0_0_20px_rgba(0,119,237,0.5)] z-10' 
                        : 'opacity-60 hover:opacity-100 hover:scale-110'
                    }`}
                  >
                    <CompanyRoundIcon companyId={item.companyId} size="sm" />
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0077ED] shadow-[0_0_8px_#0077ED]" />
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
                    className="w-full bg-[#FFFFFF] border border-[#D8D2C5] p-6 sm:p-8 shadow-2xl relative rounded-2xl"
                  >
                    {/* Top Corner Technical Badge */}
                    <div className="flex items-center justify-between mb-6 border-b border-[#E2DDD2] pb-4">
                      <div className="flex items-center gap-3.5">
                        <CompanyRoundIcon companyId={current.companyId} size="lg" />
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-[#0F172A] font-mono uppercase tracking-tight">
                            {current.clientName}
                          </h4>
                          <div className="text-xs font-mono text-[#0077ED] font-semibold">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FAF8F5] p-4 border border-[#EAE5DA] mb-4">
                      <div>
                        <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                          [ FACILITY APPLICATION ]
                        </div>
                        <div className="text-xs sm:text-sm font-mono text-[#1E293B] font-medium">
                          {current.facilityType}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                          [ MULTI ENTERPRISE SYSTEMS INSTALLED ]
                        </div>
                        <div className="text-xs sm:text-sm font-mono text-[#0077ED] font-medium">
                          {current.productInstalled}
                        </div>
                      </div>
                    </div>

                    {/* Verified Guarantee Seal */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] pt-2">
                      <span className="flex items-center gap-1.5 text-[#475569]">
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
              className="p-2.5 bg-[#FFFFFF] hover:bg-[#0077ED] text-[#0F172A] hover:text-white border border-[#E2DDD2] hover:border-[#0077ED] transition-all cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause auto slideshow' : 'Play auto slideshow'}
              className="px-4 py-2 bg-[#FFFFFF] hover:bg-[#0077ED] text-[#0F172A] hover:text-white border border-[#E2DDD2] hover:border-[#0077ED] text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#0077ED] group-hover:text-[#0077ED]" />
                  <span>Pause Motion</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#0077ED] group-hover:text-[#0077ED]" />
                  <span>Auto Flow</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next customer facility"
              className="p-2.5 bg-[#FFFFFF] hover:bg-[#0077ED] text-[#0F172A] hover:text-white border border-[#E2DDD2] hover:border-[#0077ED] transition-all cursor-pointer shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* ========================================================================= */}
          {/* REPRESENTATIVE INDUSTRIAL INSTALLATION GALLERY (METAL-BORDER DESIGN)     */}
          {/* ========================================================================= */}
          <div className="mt-20 pt-16 border-t border-[#E2DDD2]">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="text-[#0077ED] text-xs font-mono tracking-widest uppercase font-bold mb-2">
                [ VERIFIED PLANT INSTALLATIONS ]
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0F172A] uppercase font-display">
                FIELD INSTALLATION PHOTO ARCHIVE
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] font-light mt-2">
                Real-world heavy duty deployments across pharmaceutical cleanrooms, sub-zero cold chains, and manufacturing facilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  id: 'inst-1',
                  title: language === 'hi' ? 'फार्मा एयरलॉक पार्टिशन' : 'Pharma Airlock Partition',
                  facility: language === 'hi' ? 'स्टेरिल टैबलेट फॉर्मूलेशन सेज' : 'Sterile Tablet Formulation SEZ',
                  location: 'Sanand, Gujarat',
                  specs: '200mm x 2mm Anti-Static ESD Clear • 50% Overlap',
                  img: '/assets/field-installations/pharma-airlock.jpg',
                  badge: language === 'hi' ? 'क्लीनरूम एयरलॉक' : 'CLEANROOM AIRLOCK'
                },
                {
                  id: 'inst-2',
                  title: language === 'hi' ? 'सब-ज़ीरो ब्लास्ट फ़्रीज़र पोर्टल' : 'Sub-Zero Blast Freezer Portal',
                  facility: language === 'hi' ? 'डेयरी एवं आइसक्रीम वितरण हब' : 'Dairy & Ice Cream Distribution Hub',
                  location: 'Kandla Free Trade Zone',
                  specs: '300mm x 3mm Cryogenic Polar Grade (-50°C) • 67% Overlap',
                  img: '/assets/field-installations/subzero-blast-freezer.jpg',
                  badge: language === 'hi' ? 'क्रायोजेनिक फ्रीजर' : 'CRYOGENIC FREEZER'
                },
                {
                  id: 'inst-3',
                  title: language === 'hi' ? 'रोबोटिक वेल्डिंग फ्लैश शील्ड' : 'Robotic Welding Flash Shield',
                  facility: language === 'hi' ? 'हेवी कमर्शियल वाहन निर्माण लाइन' : 'Heavy Commercial Vehicle Line',
                  location: 'Chakan Industrial Area, Pune',
                  specs: '300mm x 3mm Bronze Arc-Flash Shield • Sliding Track',
                  img: '/assets/field-installations/robotic-welding-flash.jpg',
                  badge: language === 'hi' ? 'वेल्डिंग सुरक्षा' : 'WELDING SAFETY'
                },
                {
                  id: 'inst-4',
                  title: language === 'hi' ? 'हेवी फोर्कलिफ्ट लोडिंग बे' : 'Heavy Forklift Loading Bay',
                  facility: language === 'hi' ? 'एफएमसीजी सेंट्रल लॉजिस्टिक्स वेयरहाउस' : 'FMCG Central Logistics Warehouse',
                  location: 'Bhiwandi Logistics Hub, Mumbai',
                  specs: '300mm x 3mm Double Ribbed Heavy Duty • 100% Overlap',
                  img: '/assets/field-installations/forklift-loading-bay.jpg',
                  badge: language === 'hi' ? 'डबल रिब्ड स्ट्रिप्स' : 'DOUBLE RIBBED'
                },
                {
                  id: 'inst-5',
                  title: language === 'hi' ? 'एचएसीसीपी कीट निवारक प्रवेश' : 'HACCP Pest Barrier Entrance',
                  facility: language === 'hi' ? 'कन्फेक्शनरी एवं बेकरी प्लांट' : 'Confectionery & Bakery Plant',
                  location: 'Anand Dairy SEZ, Gujarat',
                  specs: '200mm x 2mm Amber Anti-Insect • Lemongrass Infused',
                  img: '/assets/field-installations/haccp-anti-insect.jpg',
                  badge: language === 'hi' ? 'एंटी-इंसेक्ट 570nm' : 'ANTI-INSECT 570nm'
                },
                {
                  id: 'inst-6',
                  title: language === 'hi' ? 'मशीनरी एकॉस्टिक पार्टिशन' : 'Machinery Acoustic Partition',
                  facility: language === 'hi' ? 'प्रिसिजन सीएनसी मशीनिंग शॉप' : 'Precision CNC Machining Shop',
                  location: 'Peenya Industrial Estate, Bengaluru',
                  specs: '400mm x 4mm Industrial Acoustic Clear • SS304 Track',
                  img: '/assets/field-installations/cnc-machinery-acoustic.jpg',
                  badge: language === 'hi' ? 'ध्वनि अवशोषण' : 'ACOUSTIC DAMPENING'
                }
              ].map((inst) => (
                <div 
                  key={inst.id}
                  className="group bg-[#FAF8F5] border border-[#CFC8BA] hover:border-[#0077ED] rounded-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Photo Container */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#FAF8F5]">
                    <img
                      src={inst.img}
                      alt={inst.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-transparent opacity-80" />
                    
                    {/* Metal Badge */}
                    <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-md border border-[#D8D2C5] px-2.5 py-1 rounded text-[9px] font-mono font-bold text-[#0077ED] tracking-wider uppercase">
                      {inst.badge}
                    </div>

                    <div className="absolute bottom-2 left-3 right-3 text-xs font-mono text-[#475569] truncate">
                      📍 {inst.location}
                    </div>
                  </div>

                  {/* Metadata Card Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#0F172A] font-mono uppercase tracking-tight mb-1 group-hover:text-[#0077ED] transition-colors">
                        {inst.title}
                      </h4>
                      <p className="text-xs text-[#64748B] font-sans mb-3">
                        {inst.facility}
                      </p>
                    </div>

                    <div className="bg-[#FAF8F5] border border-[#E2DDD2] p-2 rounded text-[10px] font-mono text-[#0077ED]">
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
                <div className="w-7 h-2 bg-[#0077ED]/80 rounded-sm" />
                <div className="w-7 h-2 bg-[#0077ED]/80 rounded-sm" />
              </div>
              <div className="flex gap-1.5">
                <div className="w-9 h-2 bg-[#0077ED] rounded-sm" />
                <div className="w-9 h-2 bg-[#0077ED] rounded-sm" />
              </div>
              <div className="w-16 h-2 bg-[#0077ED] rounded-sm" />
              <div className="w-12 h-2 bg-[#0077ED] rounded-sm" />
              <div className="w-8 h-2 bg-[#0077ED] rounded-sm" />
              <div className="w-4 h-2 bg-[#0077ED] rounded-sm" />
            </div>

            {/* Glassmorphic Contact & Quotation Anchor Pill Bar (Matching Image 3) */}
            <div className="inline-flex items-center gap-3 p-2 bg-[#FAF8F5] backdrop-blur-md border border-[#CFC8BA] shadow-2xl">
              <span className="text-xs font-mono font-bold text-[#475569] px-3 uppercase">
                TRUSTED SINCE 1998
              </span>
              <span className="text-[#94A3B8]">•</span>
              <button
                type="button"
                onClick={onOpenDirectQuote}
                className="px-5 py-2 bg-[#0077ED] hover:bg-[#2B8EFF] text-white font-mono text-xs font-bold uppercase transition-all shadow-[0_0_20px_rgba(0, 119, 237,0.4)] cursor-pointer"
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
