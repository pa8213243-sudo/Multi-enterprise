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
const SectorAndHardwareSolutions = lazy(() => import('./SectorAndHardwareSolutions').then(m => ({ default: m.SectorAndHardwareSolutions })));
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

  // Allow natural page scrolling - no body lock needed since focused view is inline
  useEffect(() => {
    if (sectionId) {
      // Scroll to top of section when entering
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      badge: '12 Polymer Grades'
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
      label: language === 'hi' ? 'उद्योग व हार्डवेयर' : 'Sector & Hardware',
      icon: Sparkles,
      badge: 'Sector Solutions'
    },
    {
      id: 'quality',
      num: '08',
      label: t.nav.quality,
      icon: Award,
      badge: 'ASTM / DIN Certs'
    },
    {
      id: 'about',
      num: '09',
      label: language === 'hi' ? 'कंपनी परिचय' : 'About Multi',
      icon: Info,
      badge: 'Est. 1998'
    },
    {
      id: 'contact',
      num: '10',
      label: language === 'hi' ? 'संपर्क करें' : 'Contact HQ',
      icon: MapPin,
      badge: '3D Map & Guide'
    }
  ];

  const currentSectionMeta = sectionsList.find((s) => s.id === sectionId) || sectionsList[0];
  const currentIndex = sectionsList.findIndex((s) => s.id === sectionId);
  const nextSection = sectionsList[(currentIndex + 1) % sectionsList.length];

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[#F8F6F0] text-[#1E293B]">
      {/* Clean Subtle Section Sub-header & Breadcrumbs (Unfrozen - naturally scrolls up) */}
      <div className="border-b border-[#E2DDD2] bg-[#FAF8F5]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Breadcrumb path */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              type="button"
              onClick={onClose}
              className="text-[#64748B] hover:text-[#0077ED] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</span>
            </button>
            <span className="text-[#94A3B8]">/</span>
            <div className="flex items-center gap-1.5 text-[#0F172A] font-bold">
              <span className="text-[#0077ED]">{currentSectionMeta.num}.</span>
              <span>{currentSectionMeta.label}</span>
            </div>
            <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 bg-[#0077ED]/15 text-[#0077ED] border border-[#0077ED]/30 rounded-full font-bold ml-1">
              {currentSectionMeta.badge}
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenDirectQuote(activeConfiguratorGrade)}
              className="px-3.5 py-1.5 bg-[#0077ED] hover:bg-[#2B8EFF] text-white font-bold text-xs uppercase tracking-wider font-mono rounded-lg transition-all shadow-md cursor-pointer flex items-center gap-1"
            >
              <span>{language === 'hi' ? 'कोटेशन' : 'Get Quote'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#64748B] hover:text-[#0077ED] hover:bg-[#EFE9DC] rounded-lg transition-colors cursor-pointer"
              title="Close section (Return to Home)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Section Content Container */}
      <div className="w-full pb-20">
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
            <SectorAndHardwareSolutions
              initialView="solutions"
              onSelectGrade={(grade) => {
                onSelectGradeForConfigurator(grade);
                onNavigateSection('configurator');
              }}
              onOpenConfigurator={() => onNavigateSection('configurator')}
              onOpenSampleModal={onOpenSampleModal}
            />
          )}

          {sectionId === 'installation' && (
            <SectorAndHardwareSolutions
              initialView="hardware"
              onSelectGrade={(grade) => {
                onSelectGradeForConfigurator(grade);
                onNavigateSection('configurator');
              }}
              onOpenConfigurator={() => onNavigateSection('configurator')}
              onOpenSampleModal={onOpenSampleModal}
            />
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

        {/* Clean Bottom Navigation Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-[#FFFFFF] border border-[#D8D2C5] p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#E2DDD2]">
                <CornerUpLeft className="w-5 h-5 text-[#0077ED]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0F172A] font-mono uppercase">
                  {language === 'hi' ? 'मुख्य वेबसाइट पृष्ठ पर वापस जाएं' : 'Return to Main Website Overview'}
                </h4>
                <p className="text-xs text-[#64748B]">
                  {language === 'hi' 
                    ? '3D फैक्ट्री मॉडल, सभी उत्पाद विवरण व संपूर्ण होमपेज पर लौटें।'
                    : 'Explore the full interactive 3D factory, customer reviews, and complete specs.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-[#0077ED] text-white font-bold text-xs uppercase tracking-wider font-mono hover:bg-[#2B8EFF] transition-all shadow-md cursor-pointer text-center rounded-xl"
              >
                {language === 'hi' ? '← मुख्य पृष्ठ' : '← Return to Home'}
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigateSection(nextSection.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-[#F8F6F0] hover:bg-[#FFFFFF] border border-[#D8D2C5] text-[#0F172A] hover:border-[#0077ED] hover:text-[#0077ED] transition-all text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer rounded-xl"
              >
                <span>{nextSection.label}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

