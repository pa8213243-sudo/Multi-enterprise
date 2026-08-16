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
  MapPin
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { FocusedSectionId } from './FocusedSectionView';

interface NavbarProps {
  onOpenConfigurator: () => void;
  onOpenSampleModal: () => void;
  onOpenRoiCalculator: () => void;
  onOpenQuoteModal?: () => void;
  onNavigateToSection?: (sectionId: FocusedSectionId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConfigurator,
  onOpenSampleModal,
  onOpenRoiCalculator,
  onOpenQuoteModal,
  onNavigateToSection
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
    label: string;
    href: string;
    sectionId: FocusedSectionId;
    icon: React.ElementType;
    desc: string;
  }[] = [
    { num: '01', label: t.nav.configurator, href: '#configurator', sectionId: 'configurator', icon: Sliders, desc: t.nav.configuratorDesc },
    { num: '02', label: t.nav.pvcGrades, href: '#products', sectionId: 'products', icon: Layers, desc: t.nav.pvcGradesDesc },
    { num: '03', label: language === 'hi' ? 'सभी उत्पाद' : 'All Products', href: '#all-products', sectionId: 'all-products', icon: Package, desc: 'Complete 30+ Industrial Facility Range' },
    { num: '04', label: language === 'hi' ? 'हमारे ग्राहक' : 'Happy Clients', href: '#happy-clients', sectionId: 'happy-clients', icon: ShieldCheck, desc: '10,000+ Clients & Facility Profiles' },
    { num: '05', label: t.nav.thermalRoi, href: '#roi-calculator', sectionId: 'roi-calculator', icon: Zap, desc: t.nav.thermalRoiDesc },
    { num: '06', label: t.nav.hardware, href: '#installation', sectionId: 'installation', icon: Package, desc: t.nav.hardwareDesc },
    { num: '07', label: t.nav.quality, href: '#quality', sectionId: 'quality', icon: Award, desc: t.nav.qualityDesc },
    { num: '08', label: language === 'hi' ? 'संपर्क' : 'Contact', href: '#contact', sectionId: 'contact', icon: MapPin, desc: 'Ahmedabad HQ 3D Map & Inquiry' },
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
            ? 'bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3 sm:py-3.5'
            : 'bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/10 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
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
              className="focus:outline-none focus:ring-2 focus:ring-[#F27D26] rounded-md transition-transform hover:scale-[1.01] text-left cursor-pointer"
              aria-label="Multi Enterprise Home"
            >
              <MultiLogo variant="full" size={28} showEst={true} />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-5 text-[11px] uppercase tracking-wider font-semibold text-white/60">
              {navLinks.map((item) => (
                <a
                  key={item.num}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href, item.sectionId);
                  }}
                  className={`hover:text-[#F27D26] transition-colors py-1 hover:border-b-2 hover:border-[#F27D26] flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#F27D26] rounded-sm cursor-pointer ${
                    item.sectionId === ('real-photos' as any) ? 'text-[#F27D26] font-bold' : ''
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>

            {/* Header Action CTAs & Language Switcher */}
            <div className="flex items-center gap-2.5">
              {/* Language Switcher Toggle */}
              <div className="flex items-center bg-[#141519] border border-white/15 rounded p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  aria-label="Switch to English"
                  className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#F27D26] text-white shadow-sm'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  aria-label="Switch to Hindi (हिन्दी)"
                  className={`px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                    language === 'hi'
                      ? 'bg-[#F27D26] text-white shadow-sm'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  हिन्दी
                </button>
              </div>

              {/* Free Swatches Button */}
              <button
                type="button"
                onClick={onOpenSampleModal}
                className="hidden md:block px-3 py-2 border border-white/15 text-[10px] uppercase tracking-widest text-white/80 hover:bg-white/5 hover:text-white hover:border-white/30 transition-all font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#F27D26] cursor-pointer"
              >
                {t.nav.freeSwatches}
              </button>

              {/* REAL PROJECT PHOTOS Button (Placed right beside Get a Quote as requested) */}
              <button
                type="button"
                onClick={() => {
                  if (onNavigateToSection) {
                    onNavigateToSection('real-photos' as any);
                  } else {
                    handleLinkClick('#real-photos');
                  }
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#181B26] hover:bg-[#202534] border border-[#F27D26]/40 hover:border-[#F27D26] text-[#F27D26] hover:text-white text-[10px] font-mono font-bold uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(242,125,38,0.2)] hover:shadow-[0_0_20px_rgba(242,125,38,0.4)] cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26] animate-ping" />
                <span>{language === 'hi' ? 'वास्तविक तस्वीरें' : 'REAL PHOTOS'}</span>
              </button>

              {/* Get a Quote Micro-interactive CTA button */}
              <div className="hidden sm:block">
                <QuoteCTAButton
                  size="sm"
                  variant="primary"
                  onClick={handleGetQuote}
                  label={t.nav.getQuote}
                  className="shadow-[0_0_15px_rgba(242,125,38,0.35)]"
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
                className="lg:hidden relative p-2.5 rounded-lg bg-[#141519] text-white hover:text-[#F27D26] border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#F27D26] transition-colors cursor-pointer"
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
            className="lg:hidden fixed inset-0 z-50 bg-[#070709]/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Bar of Mobile Menu */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/10 bg-[#0A0A0C]">
              <MultiLogo variant="full" size={26} showEst={false} />
              
              <div className="flex items-center gap-3">
                {/* Language Switcher in Mobile Drawer */}
                <div className="flex items-center bg-[#141519] border border-white/15 rounded p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                      language === 'en'
                        ? 'bg-[#F27D26] text-white shadow-sm'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('hi')}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                      language === 'hi'
                        ? 'bg-[#F27D26] text-white shadow-sm'
                        : 'text-white/50 hover:text-white'
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
                  className="p-2.5 rounded-lg bg-white/5 text-white/80 hover:text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#F27D26] hover:border-[#F27D26] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-[#F27D26]" />
                </button>
              </div>
            </div>

            {/* Main Navigation with Large Premium Industrial Typography */}
            <div className="relative px-6 py-6 sm:py-8 flex-1 flex flex-col justify-center max-w-lg mx-auto w-full space-y-4">
              {/* Subtle architectural background texture */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{
                  backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }} 
                aria-hidden="true"
              />

              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-1">
                <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[#F27D26] font-bold">
                  {t.nav.directory}
                </span>
                <span className="text-[9px] font-mono uppercase text-white/40">
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
                        className="flex items-center justify-between text-left group-hover:translate-x-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F27D26] rounded-md p-1 -m-1 cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5 sm:gap-4">
                          <span className="text-xs font-mono font-bold text-[#F27D26] tracking-wider px-2 py-0.5 bg-[#F27D26]/10 border border-[#F27D26]/30 rounded-sm">
                            {item.num}
                          </span>
                          <div>
                            <div className="text-xl sm:text-2xl font-black font-display tracking-tight text-white group-hover:text-[#F27D26] transition-colors uppercase leading-none">
                              {item.label}
                            </div>
                            <div className="text-[10px] font-mono text-white/50 tracking-wider mt-1">
                              {item.desc}
                            </div>
                          </div>
                        </div>

                        <div className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#F27D26] group-hover:text-white group-hover:border-[#F27D26] group-hover:shadow-[0_0_15px_rgba(242,125,38,0.5)] transition-all">
                          <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
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
                  className="w-full justify-center shadow-[0_0_30px_rgba(242,125,38,0.45)]"
                />

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      toggleButtonRef.current?.focus();
                      onOpenConfigurator();
                    }}
                    className="py-3 px-3 bg-white text-black font-mono font-bold text-[11px] uppercase tracking-wider hover:bg-[#F27D26] hover:text-white transition-all text-center cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(242,125,38,0.4)] focus:outline-none focus:ring-2 focus:ring-[#F27D26]"
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
                    className="py-3 px-3 bg-white/5 border border-white/20 text-white font-mono font-medium text-[11px] uppercase tracking-wider hover:bg-white/10 hover:border-white/40 transition-all text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F27D26]"
                  >
                    {t.hero.freeSwatchesBtn}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Bottom Contact & Verification Footer */}
            <div className="px-6 py-4 bg-[#0A0A0B] border-t border-white/10 text-xs font-mono text-white/50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F27D26]" />
                <span>FACTORY DIRECT MFG • 100% VIRGIN PVC</span>
              </div>

              <div className="flex items-center gap-4 text-[10px]">
                <a 
                  href="tel:+919820000000" 
                  className="flex items-center gap-1 text-white hover:text-[#F27D26] transition-colors focus:outline-none focus:ring-1 focus:ring-[#F27D26] p-1 rounded"
                >
                  <PhoneCall className="w-3 h-3 text-[#F27D26]" />
                  <span>Call Direct</span>
                </a>
                <a 
                  href="https://wa.me/919820000000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-emerald-400 hover:underline focus:outline-none focus:ring-1 focus:ring-emerald-400 p-1 rounded"
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
