import React, { useState, useEffect, useRef } from 'react';
import { MultiLogo } from './MultiLogo';
import { QuoteCTAButton } from './QuoteCTAButton';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, 
  Package, 
  Sparkles,
  Zap,
  Layers,
  Award,
  ChevronRight,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  X,
  ArrowUpRight,
  Globe,
  MapPin,
  Info
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { FocusedSectionId } from './FocusedSectionView';

interface NavbarProps {
  onOpenConfigurator: () => void;
  onOpenSampleModal: () => void;
  onOpenRoiCalculator: () => void;
  onOpenQuoteModal?: () => void;
  onNavigateToSection?: (sectionId: FocusedSectionId) => void;
  activeSectionId?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConfigurator,
  onOpenSampleModal,
  onOpenRoiCalculator,
  onOpenQuoteModal,
  onNavigateToSection,
  activeSectionId
}) => {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Accessibility: Lock background scroll & handle focus trap / escape key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          setMobileMenuOpen(false);
          toggleButtonRef.current?.focus();
          return;
        }

        if (e.key === 'Tab' && mobileMenuRef.current) {
          const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      const timer = setTimeout(() => {
        if (mobileMenuRef.current) {
          const firstFocusable = mobileMenuRef.current.querySelector<HTMLElement>(
            'button, a[href]'
          );
          firstFocusable?.focus();
        }
      }, 50);

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks: {
    num: string;
    topLine: string;
    bottomLine: string;
    label: string;
    href: string;
    sectionId: FocusedSectionId;
    icon: React.ElementType;
    desc: string;
  }[] = [
    { 
      num: '01', 
      topLine: '3D', 
      bottomLine: 'CONFIGURATOR', 
      label: '3D Configurator', 
      href: '#configurator', 
      sectionId: 'configurator', 
      icon: Sliders, 
      desc: t.nav.configuratorDesc 
    },
    { 
      num: '02', 
      topLine: language === 'hi' ? 'पीवीसी' : 'PVC', 
      bottomLine: language === 'hi' ? 'ग्रेड्स' : 'GRADES', 
      label: t.nav.pvcGrades, 
      href: '#products', 
      sectionId: 'products', 
      icon: Layers, 
      desc: t.nav.pvcGradesDesc 
    },
    { 
      num: '03', 
      topLine: language === 'hi' ? 'सभी' : 'ALL', 
      bottomLine: language === 'hi' ? 'उत्पाद' : 'PRODUCTS', 
      label: language === 'hi' ? 'सभी उत्पाद' : 'All Products', 
      href: '#all-products', 
      sectionId: 'all-products', 
      icon: Package, 
      desc: 'Complete 30+ Industrial Facility Range' 
    },
    { 
      num: '04', 
      topLine: language === 'hi' ? 'हमारे' : 'HAPPY', 
      bottomLine: language === 'hi' ? 'ग्राहक' : 'CLIENTS', 
      label: language === 'hi' ? 'हमारे ग्राहक' : 'Happy Clients', 
      href: '#happy-clients', 
      sectionId: 'happy-clients', 
      icon: ShieldCheck, 
      desc: '10,000+ Clients & Facility Profiles' 
    },
    { 
      num: '05', 
      topLine: language === 'hi' ? 'थर्मल' : 'THERMAL', 
      bottomLine: language === 'hi' ? 'आर.ओ.आई' : 'ROI', 
      label: t.nav.thermalRoi, 
      href: '#roi-calculator', 
      sectionId: 'roi-calculator', 
      icon: Zap, 
      desc: t.nav.thermalRoiDesc 
    },
    { 
      num: '06', 
      topLine: language === 'hi' ? 'उद्योग' : 'SECTOR &', 
      bottomLine: language === 'hi' ? 'हार्डवेयर' : 'HARDWARE', 
      label: language === 'hi' ? 'उद्योग व हार्डवेयर समाधान' : 'Sector & Hardware Solutions', 
      href: '#solutions', 
      sectionId: 'solutions', 
      icon: Sparkles, 
      desc: 'Industry Matrix & Mounting Systems' 
    },
    { 
      num: '07', 
      topLine: language === 'hi' ? 'क्वालिटी' : 'QUALITY', 
      bottomLine: language === 'hi' ? 'मानक' : 'STANDARDS', 
      label: t.nav.quality, 
      href: '#quality', 
      sectionId: 'quality', 
      icon: Award, 
      desc: t.nav.qualityDesc 
    },
    { 
      num: '08', 
      topLine: language === 'hi' ? 'कंपनी' : 'ABOUT', 
      bottomLine: language === 'hi' ? 'परिचय' : 'MULTI', 
      label: language === 'hi' ? 'कंपनी परिचय' : 'About Multi', 
      href: '#about', 
      sectionId: 'about', 
      icon: Info, 
      desc: 'Est. 1998 Heritage & Leadership' 
    },
    { 
      num: '09', 
      topLine: language === 'hi' ? 'संपर्क' : 'CONTACT', 
      bottomLine: language === 'hi' ? 'मुख्यालय' : 'HQ', 
      label: language === 'hi' ? 'संपर्क' : 'Contact HQ', 
      href: '#contact', 
      sectionId: 'contact', 
      icon: MapPin, 
      desc: 'Ahmedabad HQ 3D Map & Inquiry' 
    },
  ];

  const handleLinkClick = (href: string, sectionId?: FocusedSectionId) => {
    setMobileMenuOpen(false);
    toggleButtonRef.current?.focus();

    if (sectionId && onNavigateToSection) {
      onNavigateToSection(sectionId);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetQuote = () => {
    setMobileMenuOpen(false);
    toggleButtonRef.current?.focus();
    if (onOpenQuoteModal) {
      onOpenQuoteModal();
    } else {
      onOpenConfigurator();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F6F0]/95 backdrop-blur-xl border-b border-[#D8D2C5] shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3 sm:py-3.5'
            : 'bg-[#F8F6F0]/80 backdrop-blur-md border-b border-[#E2DDD2] py-3.5 sm:py-4.5'
        }`}
      >
        <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between gap-4 lg:gap-6 xl:gap-8">
            {/* Brand Logo with Multi Enterprise Mark */}
            <button 
              type="button"
              onClick={() => {
                if (onNavigateToSection) {
                  onNavigateToSection('home' as any);
                } else {
                  handleLinkClick('#');
                }
              }}
              className="focus:outline-none focus:ring-2 focus:ring-[#0077ED] rounded-xl transition-transform hover:scale-[1.02] text-left cursor-pointer shrink-0"
              aria-label="Multi Enterprise Home"
            >
              <MultiLogo variant="full" size={32} showEst={false} />
            </button>

            {/* Desktop Navigation Links - Compact, Snug Two-line Typography */}
            <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5 2xl:space-x-2.5 text-center">
              {navLinks.map((item) => {
                const isActive = activeSectionId === item.sectionId;
                return (
                  <a
                    key={item.num}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href, item.sectionId);
                    }}
                    className={`group flex flex-col items-center justify-center py-1 px-1.5 xl:px-2 transition-all cursor-pointer select-none focus:outline-none focus:ring-1 focus:ring-[#0077ED] rounded-md ${
                      isActive ? 'bg-[#EAE4D7] text-[#0077ED]' : 'text-[#334155] hover:text-[#0077ED] hover:bg-[#F2EDE2]'
                    }`}
                  >
                    <span className={`text-[10px] xl:text-[10.5px] 2xl:text-[11.5px] font-mono font-bold uppercase tracking-tight transition-colors leading-none ${
                      isActive ? 'text-[#0077ED]' : 'text-[#0F172A] group-hover:text-[#0077ED]'
                    }`}>
                      {item.topLine}
                    </span>
                    <span className={`text-[9px] xl:text-[9.5px] 2xl:text-[10.5px] font-mono font-medium uppercase tracking-tight transition-colors leading-none mt-0.5 ${
                      isActive ? 'text-[#0077ED]' : 'text-[#64748B] group-hover:text-[#0F172A]'
                    }`}>
                      {item.bottomLine}
                    </span>
                    <span className={`h-0.5 transition-all duration-200 rounded-full mt-0.5 ${
                      isActive ? 'w-full bg-[#0077ED]' : 'w-0 group-hover:w-full bg-[#0077ED]'
                    }`} />
                  </a>
                );
              })}
            </nav>

            {/* Header Action CTAs & Language Switcher */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Language Switcher Toggle */}
              <div className="flex items-center bg-[#EFE9DE] border border-[#D8D2C5] rounded-md p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  aria-label="Switch to English"
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#0077ED] text-white shadow-sm'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  aria-label="Switch to Hindi (हिन्दी)"
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                    language === 'hi'
                      ? 'bg-[#0077ED] text-white shadow-sm'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  हिन्दी
                </button>
              </div>

              {/* Free Swatches Button */}
              <button
                type="button"
                onClick={onOpenSampleModal}
                className="hidden 2xl:block px-2.5 py-1.5 border border-[#D8D2C5] text-[11px] uppercase tracking-wider text-[#0F172A] hover:bg-[#FFFFFF] hover:border-[#0077ED] hover:text-[#0077ED] transition-all font-mono font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077ED] cursor-pointer shadow-sm whitespace-nowrap"
              >
                {t.nav.freeSwatches}
              </button>

              {/* REAL PROJECT PHOTOS Button */}
              <button
                type="button"
                onClick={() => {
                  if (onNavigateToSection) {
                    onNavigateToSection('real-photos' as any);
                  } else {
                    handleLinkClick('#real-photos');
                  }
                }}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#EBF3FC] hover:bg-[#0077ED] border border-[#0077ED]/40 hover:border-[#0077ED] text-[#0077ED] hover:text-white text-[11px] font-mono font-bold uppercase tracking-tight transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0077ED] animate-ping" />
                <span>{language === 'hi' ? 'वास्तविक तस्वीरें' : 'REAL PHOTOS'}</span>
              </button>

              {/* Get a Quote Micro-interactive CTA button */}
              <div className="hidden sm:block">
                <QuoteCTAButton
                  size="sm"
                  variant="primary"
                  onClick={handleGetQuote}
                  label={t.nav.getQuote}
                  className="shadow-[0_0_15px_rgba(0, 119, 237,0.4)] font-bold text-xs py-1.5 px-3"
                />
              </div>

              {/* Mobile Hamburger Toggle with Animated Geometric Bars */}
              <button
                ref={toggleButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                className="lg:hidden relative p-2.5 rounded-lg bg-[#EFE9DE] text-white hover:text-[#0077ED] border border-[#D8D2C5] focus:outline-none focus:ring-2 focus:ring-[#0077ED] transition-colors cursor-pointer"
              >
                <div className="w-5 h-4 flex flex-col justify-between items-center" aria-hidden="true">
                  <span 
                    className={`h-0.5 w-full bg-current transition-all duration-300 origin-left ${
                      mobileMenuOpen ? 'rotate-45 translate-x-0.5 -translate-y-0.5' : ''
                    }`} 
                  />
                  <span 
                    className={`h-0.5 w-full bg-current transition-all duration-200 ${
                      mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                    }`} 
                  />
                  <span 
                    className={`h-0.5 w-full bg-current transition-all duration-300 origin-left ${
                      mobileMenuOpen ? '-rotate-45 translate-x-0.5 translate-y-0.5' : ''
                    }`} 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Full-Screen Accessible Mobile Drawer with Large Typography & Framer Motion Staggered Animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-50 bg-[#F8F6F0]/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Bar of Mobile Menu */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#E2DDD2] bg-[#F8F6F0]">
              <MultiLogo variant="full" size={26} showEst={false} />
              
              <div className="flex items-center gap-3">
                {/* Language Switcher in Mobile Drawer */}
                <div className="flex items-center bg-[#EFE9DE] border border-[#D8D2C5] rounded p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                      language === 'en'
                        ? 'bg-[#0077ED] text-white shadow-sm'
                        : 'text-[#64748B] hover:text-[#0077ED]'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('hi')}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                      language === 'hi'
                        ? 'bg-[#0077ED] text-white shadow-sm'
                        : 'text-[#64748B] hover:text-[#0077ED]'
                    }`}
                  >
                    हिन्दी
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    toggleButtonRef.current?.focus();
                  }}
                  aria-label="Close Mobile Navigation"
                  className="p-2.5 rounded-lg bg-[#FAF8F5] text-[#334155] hover:text-[#0077ED] border border-[#D8D2C5] focus:outline-none focus:ring-2 focus:ring-[#0077ED] hover:border-[#0077ED] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-[#0077ED]" />
                </button>
              </div>
            </div>

            {/* Main Navigation with Large Premium Industrial Typography */}
            <div className="relative px-6 py-6 sm:py-8 flex-1 flex flex-col justify-center max-w-lg mx-auto w-full space-y-4">
              {/* Subtle architectural background texture */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{
                  backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }} 
                aria-hidden="true"
              />

              <div className="flex items-center justify-between border-b border-[#E2DDD2] pb-2.5 mb-1">
                <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[#0077ED] font-bold">
                  {t.nav.directory}
                </span>
                <span className="text-[9px] font-mono uppercase text-[#64748B]">
                  {t.nav.est}
                </span>
              </div>

              {/* Staggered Navigation Items with Large Typography */}
              <div className="divide-y divide-white/10">
                {navLinks.map((item, idx) => {
                  return (
                    <motion.div
                      key={item.num}
                      initial={{ opacity: 0, x: -28, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      transition={{ 
                        delay: idx * 0.045 + 0.05, 
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                      className="py-2.5 sm:py-3.5 group"
                    >
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(item.href, item.sectionId);
                        }}
                        className="flex items-center justify-between text-left group-hover:translate-x-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0077ED] rounded-md p-1 -m-1 cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5 sm:gap-4">
                          <span className="text-xs font-mono font-bold text-[#0077ED] tracking-wider px-2 py-0.5 bg-[#0077ED]/10 border border-[#0077ED]/30 rounded-sm">
                            {item.num}
                          </span>
                          <div>
                            <div className="text-xl sm:text-2xl font-black font-display tracking-tight text-white group-hover:text-[#0077ED] transition-colors uppercase leading-none">
                              {item.label}
                            </div>
                            <div className="text-[10px] font-mono text-[#64748B] tracking-wider mt-1">
                              {item.desc}
                            </div>
                          </div>
                        </div>

                        <div className="w-8 h-8 rounded-md bg-[#FAF8F5] border border-[#E2DDD2] flex items-center justify-center group-hover:bg-[#0077ED] group-hover:text-[#0077ED] group-hover:border-[#0077ED] group-hover:shadow-[0_0_15px_rgba(0, 119, 237,0.5)] transition-all">
                          <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#0077ED] transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              {/* High-Impact Mobile CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
                className="pt-4 space-y-3"
              >
                {/* Get a Quote Micro-interactive Button */}
                <QuoteCTAButton
                  size="lg"
                  variant="primary"
                  onClick={handleGetQuote}
                  label={t.nav.getQuote}
                  sublabel="Direct Factory Pricing & CAD Spec"
                  className="w-full justify-center shadow-[0_0_30px_rgba(0, 119, 237,0.45)]"
                />

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      toggleButtonRef.current?.focus();
                      onOpenConfigurator();
                    }}
                    className="py-3 px-3 bg-white text-black font-mono font-bold text-[11px] uppercase tracking-wider hover:bg-[#0077ED] hover:text-[#0077ED] transition-all text-center cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(0, 119, 237,0.4)] focus:outline-none focus:ring-2 focus:ring-[#0077ED]"
                  >
                    {t.hero.configuratorBtn}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      toggleButtonRef.current?.focus();
                      onOpenSampleModal();
                    }}
                    className="py-3 px-3 bg-[#FAF8F5] border border-[#CFC8BA] text-[#0F172A] font-mono font-medium text-[11px] uppercase tracking-wider hover:bg-[#F4EFE6] hover:border-white/40 transition-all text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0077ED]"
                  >
                    {t.hero.freeSwatchesBtn}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Bottom Contact & Verification Footer */}
            <div className="px-6 py-4 bg-[#F8F6F0] border-t border-[#E2DDD2] text-xs font-mono text-[#64748B] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0077ED]" />
                <span>FACTORY DIRECT MFG • GOOD QUALITY PVC</span>
              </div>

              <div className="flex items-center gap-4 text-[10px]">
                <a 
                  href="tel:+919377678155" 
                  className="flex items-center gap-1 text-[#0F172A] hover:text-[#0077ED] transition-colors focus:outline-none focus:ring-1 focus:ring-[#0077ED] p-1 rounded"
                >
                  <PhoneCall className="w-3 h-3 text-[#0077ED]" />
                  <span>+91 9377 678 155</span>
                </a>
                <a 
                  href="https://wa.me/919377678155" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-emerald-600 hover:underline focus:outline-none focus:ring-1 focus:ring-emerald-600 p-1 rounded"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-70" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
