import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MultiLogo } from './MultiLogo';
import { useLanguage } from '../i18n/LanguageContext';
import { TechnicalSkeletonLoader } from './TechnicalSkeletonLoader';
import { 
  ArrowLeft, 
  X, 
  Sliders, 
  Layers, 
  Zap, 
  Sparkles, 
  Package, 
  Award,
  Info,
  Globe,
  CornerUpLeft,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  ShieldCheck,
  MoreHorizontal,
  MoreVertical,
  Compass,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { PVCGrade, CurtainConfiguration, ComputedQuote } from '../types';

// Lazy load heavy section components for instantaneous view transitions and peak memory efficiency
const Configurator = lazy(() => import('./Configurator').then(m => ({ default: m.Configurator })));
const ProductCatalog = lazy(() => import('./ProductCatalog').then(m => ({ default: m.ProductCatalog })));
const AllProductsCatalog = lazy(() => import('./AllProductsCatalog').then(m => ({ default: m.AllProductsCatalog })));
const RealPhotosSection = lazy(() => import('./RealPhotosSection').then(m => ({ default: m.RealPhotosSection })));
const HappyClientsShowcase = lazy(() => import('./HappyClientsShowcase').then(m => ({ default: m.HappyClientsShowcase })));
const EnergyCalculator = lazy(() => import('./EnergyCalculator').then(m => ({ default: m.EnergyCalculator })));
const IndustrySolutions = lazy(() => import('./IndustrySolutions').then(m => ({ default: m.IndustrySolutions })));
const HardwareInstallation = lazy(() => import('./HardwareInstallation').then(m => ({ default: m.HardwareInstallation })));
const QualityStandards = lazy(() => import('./QualityStandards').then(m => ({ default: m.QualityStandards })));
const AboutSection = lazy(() => import('./AboutSection').then(m => ({ default: m.AboutSection })));
const ContactSection = lazy(() => import('./ContactSection').then(m => ({ default: m.ContactSection })));

export type FocusedSectionId = 
  | 'configurator' 
  | 'products' 
  | 'all-products'
  | 'real-photos'
  | 'happy-clients'
  | 'roi-calculator' 
  | 'solutions' 
  | 'installation' 
  | 'quality'
  | 'about'
  | 'contact';

interface FocusedSectionViewProps {
  sectionId: FocusedSectionId | null;
  onClose: () => void;
  onNavigateSection: (sectionId: FocusedSectionId) => void;
  activeConfiguratorGrade: PVCGrade;
  onSelectGradeForConfigurator: (grade: PVCGrade) => void;
  onOpenSampleModal: (grade?: PVCGrade) => void;
  onRequestQuoteFromConfigurator: (config: CurtainConfiguration, quote: ComputedQuote) => void;
  onOpenDirectQuote: (grade?: PVCGrade) => void;
}

export const FocusedSectionView: React.FC<FocusedSectionViewProps> = ({
  sectionId,
  onClose,
  onNavigateSection,
  activeConfiguratorGrade,
  onSelectGradeForConfigurator,
  onOpenSampleModal,
  onRequestQuoteFromConfigurator,
  onOpenDirectQuote
}) => {
  const { t, language, toggleLanguage } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navScrollRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState<boolean>(false);

  // Lock background body scroll when focused view is active
  useEffect(() => {
    if (sectionId) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [sectionId]);

  // Keyboard shortcut: ESC to exit focused view or close quick menu
  useEffect(() => {
    if (!sectionId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (isQuickMenuOpen) {
          setIsQuickMenuOpen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sectionId, isQuickMenuOpen, onClose]);

  // Focus the back button and reset scroll when entering focused view
  useEffect(() => {
    if (sectionId) {
      setIsQuickMenuOpen(false);
      setTimeout(() => {
        backButtonRef.current?.focus();
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      }, 50);
    }
  }, [sectionId]);

  // Auto-scroll active section pill into center view smoothly
  useEffect(() => {
    if (!sectionId || !navScrollRef.current) return;
    const activePill = navScrollRef.current.querySelector(`[data-section-pill="${sectionId}"]`) as HTMLElement;
    if (activePill) {
      activePill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [sectionId]);

  const scrollNav = (direction: 'left' | 'right') => {
    if (!navScrollRef.current) return;
    const offset = direction === 'left' ? -260 : 260;
    navScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  if (!sectionId) return null;

  const sectionsList: {
    id: FocusedSectionId;
    num: string;
    label: string;
    icon: React.ElementType;
    badge: string;
  }[] = [
    {
      id: 'configurator',
      num: '01',
      label: t.nav.configurator,
      icon: Sliders,
      badge: '3D CAD Engine'
    },
    {
      id: 'products',
      num: '02',
      label: t.nav.pvcGrades,
      icon: Layers,
      badge: 'Polymer Specs'
    },
    {
      id: 'all-products',
      num: '03',
      label: language === 'hi' ? 'सभी उत्पाद (33)' : 'All Facility Range',
      icon: Package,
      badge: '33+ Products'
    },
    {
      id: 'real-photos',
      num: '04',
      label: language === 'hi' ? 'वास्तविक तस्वीरें (19)' : 'Real Project Photos',
      icon: Sparkles,
      badge: '19+ Real Installs'
    },
    {
      id: 'happy-clients',
      num: '05',
      label: language === 'hi' ? 'हमारे ग्राहक' : 'Happy Clients',
      icon: ShieldCheck,
      badge: '10k+ Served'
    },
    {
      id: 'roi-calculator',
      num: '06',
      label: t.nav.thermalRoi,
      icon: Zap,
      badge: 'Energy ROI'
    },
    {
      id: 'solutions',
      num: '07',
      label: t.nav.solutions,
      icon: Sparkles,
      badge: 'Sector Solutions'
    },
    {
      id: 'installation',
      num: '08',
      label: t.nav.hardware,
      icon: Package,
      badge: 'Hardware Systems'
    },
    {
      id: 'quality',
      num: '09',
      label: t.nav.quality,
      icon: Award,
      badge: 'ASTM / DIN Certs'
    },
    {
      id: 'about',
      num: '10',
      label: language === 'hi' ? 'कंपनी परिचय' : 'About Multi',
      icon: Info,
      badge: 'Est. 1998'
    },
    {
      id: 'contact',
      num: '11',
      label: language === 'hi' ? 'संपर्क करें' : 'Contact HQ',
      icon: MapPin,
      badge: '3D Map & Guide'
    }
  ];

  const currentSectionMeta = sectionsList.find((s) => s.id === sectionId) || sectionsList[0];
  const currentIndex = sectionsList.findIndex((s) => s.id === sectionId);
  const nextSection = sectionsList[(currentIndex + 1) % sectionsList.length];

  return (
    <AnimatePresence>
      <motion.div
        key="focused-section-root"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col bg-[#0A0A0B] text-[#E0E0E0] h-[100dvh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={`Focused View: ${currentSectionMeta.label}`}
      >
        {/* TOP BAR: Header with Command Bar and Section Navigation Dock */}
        <header className="flex-shrink-0 bg-[#0E0F12] border-b border-white/15 z-20 shadow-2xl">
          {/* Main Top Control Row */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
            {/* Left: Back to Full Website Button & Brand Logo */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                ref={backButtonRef}
                type="button"
                onClick={onClose}
                className="group flex items-center gap-2 px-3.5 sm:px-4 py-2.5 bg-white/10 hover:bg-[#F27D26] text-white hover:text-white rounded-xl transition-all text-xs font-mono font-bold cursor-pointer border border-white/15 hover:border-[#F27D26] shadow-lg"
                title="Return to full scrollable website (ESC)"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="hidden sm:inline">
                  {language === 'hi' ? '← पूरी वेबसाइट पर वापस जाएं' : '← Back to Full Website'}
                </span>
                <span className="sm:hidden">
                  {language === 'hi' ? 'वापस' : 'Back'}
                </span>
                <kbd className="hidden md:inline-block ml-1 px-1.5 py-0.5 text-[9px] bg-black/50 text-white/70 border border-white/20 rounded font-sans">
                  ESC
                </kbd>
              </button>

              <div className="hidden lg:block h-6 w-px bg-white/15" />

              <div className="hidden sm:flex items-center gap-2.5">
                <MultiLogo variant="hero" size={24} showEst={false} />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest hidden xl:inline">
                  FOCUSED INSPECTION VIEW
                </span>
              </div>
            </div>

            {/* Middle: Active Section Title Badge with Live Beacon */}
            <div className="hidden md:flex items-center gap-2 bg-black/60 border border-white/15 px-3.5 py-2 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-[#F27D26] animate-ping" />
              <currentSectionMeta.icon className="w-4 h-4 text-[#F27D26]" />
              <span className="text-xs font-mono font-bold text-white tracking-wide">
                {currentSectionMeta.num}. {currentSectionMeta.label}
              </span>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#F27D26]/20 text-[#F27D26] rounded border border-[#F27D26]/30 font-mono uppercase font-bold">
                {currentSectionMeta.badge}
              </span>
            </div>

            {/* Right: Quick Drawer, Language & Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* 3-Dot Quick Menu Trigger */}
              <button
                type="button"
                onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                  isQuickMenuOpen 
                    ? 'bg-[#F27D26] text-white border-[#F27D26] shadow-lg shadow-[#F27D26]/30' 
                    : 'bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border-white/15'
                }`}
                title={language === 'hi' ? 'सभी 11 सेक्शन्स मेनू' : 'All Sections Menu (11)'}
                aria-label="Toggle all sections menu"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Language Toggle */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-xs font-mono text-white/80 transition-colors cursor-pointer"
                title={language === 'en' ? 'Switch to Hindi (हिन्दी)' : 'Switch to English'}
              >
                <Globe className="w-3.5 h-3.5 text-[#F27D26]" />
                <span className="font-bold text-[11px]">{language === 'en' ? 'हिन्दी' : 'EN'}</span>
              </button>

              {/* Get Quote Button */}
              <button
                type="button"
                onClick={() => onOpenDirectQuote(activeConfiguratorGrade)}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-[#F27D26] hover:bg-[#ff8c37] text-white font-bold text-xs uppercase tracking-wider font-mono rounded-xl transition-all shadow-md cursor-pointer"
              >
                <span>{language === 'hi' ? 'कोटेशन प्राप्त करें' : 'Get Quote'}</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-white/15"
                title="Close focused view (ESC)"
                aria-label="Close focused view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Section Navigation Dock - Spacious, Clear, Highly Legible */}
          <div className="bg-[#0A0B0E] border-t border-white/10 py-2.5 px-3 sm:px-6 relative">
            <div className="max-w-7xl mx-auto flex items-center gap-2">
              {/* Left Scroll Arrow */}
              <button
                type="button"
                onClick={() => scrollNav('left')}
                className="hidden sm:flex p-2 bg-black/60 hover:bg-white/10 text-white/70 hover:text-white rounded-lg border border-white/10 transition-colors cursor-pointer flex-shrink-0"
                title="Scroll Left"
                aria-label="Scroll sections left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Section Pills Row */}
              <div 
                ref={navScrollRef}
                className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth flex-1"
              >
                {sectionsList.map((item) => {
                  const isActive = item.id === sectionId;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      data-section-pill={item.id}
                      type="button"
                      onClick={() => onNavigateSection(item.id)}
                      className={`flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#F27D26] to-[#ff8c37] text-white shadow-[0_0_16px_rgba(242,125,38,0.45)] border border-[#F27D26] scale-[1.02]'
                          : 'bg-[#14161B] text-white/70 hover:text-white hover:bg-white/15 border border-white/10 hover:border-white/25'
                      }`}
                    >
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-black/30 text-white' : 'bg-black/40 text-[#F27D26]'
                      }`}>
                        {item.num}
                      </span>
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-white/60'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Scroll Arrow */}
              <button
                type="button"
                onClick={() => scrollNav('right')}
                className="hidden sm:flex p-2 bg-black/60 hover:bg-white/10 text-white/70 hover:text-white rounded-lg border border-white/10 transition-colors cursor-pointer flex-shrink-0"
                title="Scroll Right"
                aria-label="Scroll sections right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Quick Menu Overview Modal (All 11 Sections Grid) */}
        <AnimatePresence>
          {isQuickMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-28 left-4 right-4 sm:left-auto sm:right-6 max-w-2xl w-full z-40 bg-[#121419] border-2 border-[#F27D26]/50 rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-[#F27D26]" />
                  <h4 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
                    {language === 'hi' ? 'सभी 11 सेक्शन्स का विवरण' : 'Complete 11-Section Site Architecture'}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setIsQuickMenuOpen(false)}
                  className="p-1 text-white/50 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[65vh] overflow-y-auto pr-1">
                {sectionsList.map((sec) => {
                  const isCurrent = sec.id === sectionId;
                  const SecIcon = sec.icon;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => {
                        onNavigateSection(sec.id);
                        setIsQuickMenuOpen(false);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        isCurrent
                          ? 'bg-[#F27D26] text-white border-[#F27D26] shadow-lg'
                          : 'bg-black/40 hover:bg-white/10 text-white/80 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                        isCurrent ? 'bg-black/30 text-white' : 'bg-black/60 text-[#F27D26]'
                      }`}>
                        {sec.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-mono font-bold truncate flex items-center gap-1.5">
                          <SecIcon className="w-3.5 h-3.5" />
                          <span>{sec.label}</span>
                        </div>
                        <div className={`text-[10px] font-mono mt-0.5 truncate ${
                          isCurrent ? 'text-white/80' : 'text-white/40'
                        }`}>
                          {sec.badge}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOCUSED CONTENT CONTAINER: Isolated Single Section View with Native Smooth Scrollable Behavior */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent
          className="flex-1 overflow-y-auto overscroll-contain bg-[#0A0A0B] relative focus:outline-none scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
          tabIndex={-1}
        >
          {/* Animated Transition Wrapper */}
          <motion.div
            key={sectionId}
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.985 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full pb-24"
          >
            {/* Suspense Wrapper for Lazy Loaded Section Components */}
            <Suspense fallback={<TechnicalSkeletonLoader label={`Loading ${currentSectionMeta.label}...`} />}>
              {sectionId === 'configurator' && (
                <Configurator
                  initialGrade={activeConfiguratorGrade}
                  onRequestQuote={onRequestQuoteFromConfigurator}
                  onOpenSampleModal={onOpenSampleModal}
                />
              )}

              {sectionId === 'products' && (
                <ProductCatalog
                  onSelectForConfigurator={(grade) => {
                    onSelectGradeForConfigurator(grade);
                    onNavigateSection('configurator');
                  }}
                  onOpenSampleModal={onOpenSampleModal}
                />
              )}

              {sectionId === 'all-products' && (
                <AllProductsCatalog
                  onOpenDirectQuote={(productName) => onOpenDirectQuote(activeConfiguratorGrade)}
                  onExploreConfigurator={() => onNavigateSection('configurator')}
                />
              )}

              {sectionId === 'real-photos' && (
                <RealPhotosSection
                  onOpenQuoteModal={onOpenDirectQuote}
                  onOpenConfigurator={(grade) => {
                    if (grade) onSelectGradeForConfigurator(grade);
                    onNavigateSection('configurator');
                  }}
                  onOpenSampleModal={onOpenSampleModal}
                />
              )}

              {sectionId === 'happy-clients' && (
                <HappyClientsShowcase
                  onOpenDirectQuote={() => onOpenDirectQuote(activeConfiguratorGrade)}
                  onOpenSampleModal={() => onOpenSampleModal(activeConfiguratorGrade)}
                />
              )}

              {sectionId === 'roi-calculator' && (
                <EnergyCalculator
                  onExploreConfigurator={() => onNavigateSection('configurator')}
                />
              )}

              {sectionId === 'solutions' && (
                <IndustrySolutions
                  onSelectGrade={(grade) => {
                    onSelectGradeForConfigurator(grade);
                    onNavigateSection('configurator');
                  }}
                />
              )}

              {sectionId === 'installation' && (
                <HardwareInstallation />
              )}

              {sectionId === 'quality' && (
                <QualityStandards />
              )}

              {sectionId === 'about' && (
                <AboutSection
                  onOpenConfigurator={() => onNavigateSection('configurator')}
                  onOpenSampleModal={() => onOpenSampleModal('standard-clear')}
                />
              )}

              {sectionId === 'contact' && (
                <ContactSection
                  onNavigateSection={onNavigateSection}
                  onOpenSampleModal={() => onOpenSampleModal('standard-clear')}
                />
              )}
            </Suspense>

            {/* Bottom Floating Return & Next Section Navigation Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
              <div className="bg-[#121316] border border-white/15 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                    <CornerUpLeft className="w-5 h-5 text-[#F27D26]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase">
                      {language === 'hi' ? 'पूरी वेबसाइट ब्राउज़ करना चाहते हैं?' : 'Want to explore the entire website?'}
                    </h4>
                    <p className="text-xs text-white/50">
                      {language === 'hi' 
                        ? 'सभी 3D मॉडल, निर्देशिका और इंजीनियरिंग विनिर्देशों के साथ मुख्य पृष्ठ पर लौटें।'
                        : 'Return to standard overview with 3D hero, systems directory, and company profile.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider font-mono hover:bg-[#F27D26] hover:text-white transition-all shadow-lg cursor-pointer text-center"
                  >
                    {language === 'hi' ? '← पूरी वेबसाइट पर लौटें' : '← Return to Main Page'}
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigateSection(nextSection.id)}
                    className="flex-1 sm:flex-none px-4 py-2.5 border border-white/20 text-white hover:border-[#F27D26] hover:text-[#F27D26] transition-all text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{nextSection.label}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* FLOATING THREE-DOT QUICK JUMP INDICATOR & SLIDE-OVER SECTION SWITCHER      */}
        {/* ========================================================================= */}
        <div className="fixed bottom-6 right-6 z-40">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
            className="flex items-center gap-2.5 px-4 py-3 bg-[#16181D]/95 hover:bg-[#1E2027] text-white border border-white/20 hover:border-[#F27D26] rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all cursor-pointer group"
            title="Quick Jump between Section-Specific Experiences"
            aria-label="Toggle section navigation menu"
          >
            <div className="w-2 h-2 rounded-full bg-[#F27D26] animate-ping" />
            <span className="text-xs font-mono font-bold tracking-wide uppercase">
              {currentSectionMeta.num} • Sections
            </span>
            <MoreHorizontal className="w-4 h-4 text-[#F27D26] group-hover:rotate-90 transition-transform duration-300" />
          </motion.button>

          {/* Quick Jump Slide-Over Menu Modal */}
          <AnimatePresence>
            {isQuickMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsQuickMenuOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-16 right-0 z-50 w-80 sm:w-96 bg-[#111317]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden p-4"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#F27D26]" />
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        Quick Jump Sections
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsQuickMenuOpen(false)}
                      className="p-1 text-white/50 hover:text-white rounded-md hover:bg-white/10"
                      aria-label="Close menu"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                    {sectionsList.map((sec) => {
                      const isActive = sec.id === sectionId;
                      const Icon = sec.icon;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => {
                            onNavigateSection(sec.id);
                            setIsQuickMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#F27D26] border-[#F27D26] text-white shadow-lg'
                              : 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/15 text-white/80'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                              isActive ? 'bg-black/30 text-white' : 'bg-black/40 text-white/60'
                            }`}>
                              {sec.num}
                            </span>
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#F27D26]'}`} />
                            <span className="text-xs font-bold font-mono">
                              {sec.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                              isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'
                            }`}>
                              {sec.badge}
                            </span>
                            {isActive && <ArrowRight className="w-3.5 h-3.5 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                    <span>Background site locked</span>
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-[#F27D26] hover:underline"
                    >
                      Return to Website →
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

