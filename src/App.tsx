import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { EntranceAnimation } from './components/EntranceAnimation';
import { SampleRequestModal } from './components/SampleRequestModal';
import { QuoteModal } from './components/QuoteModal';
import { FocusedSectionView, FocusedSectionId } from './components/FocusedSectionView';
import { MultiAIChatbot } from './components/MultiAIChatbot';
import { PVCGrade, CurtainConfiguration, ComputedQuote } from './types';
import { MessageSquare, PhoneCall, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

function AppContent() {
  const { t, language } = useLanguage();
  const [showEntrance, setShowEntrance] = useState<boolean>(true);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [selectedSampleGrade, setSelectedSampleGrade] = useState<PVCGrade>('transparent');
  
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<CurtainConfiguration | undefined>(undefined);
  const [currentQuote, setCurrentQuote] = useState<ComputedQuote | undefined>(undefined);

  const [activeConfiguratorGrade, setActiveConfiguratorGrade] = useState<PVCGrade>('transparent');

  // Focused Section View State & Navigation
  const [focusedSection, setFocusedSection] = useState<FocusedSectionId | null>(null);

  // Check initial URL hash on mount (e.g., #configurator or #products)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as FocusedSectionId;
    const validSections: FocusedSectionId[] = [
      'configurator', 'products', 'all-products', 'real-photos', 'happy-clients',
      'roi-calculator', 'solutions', 'installation', 'quality', 'about', 'contact'
    ];
    if (validSections.includes(hash)) {
      setFocusedSection(hash);
      setShowEntrance(false); // Skip intro if directly linked to a section
    }
  }, []);

  // Handle Browser Back / Forward History Navigation
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.focusedSection) {
        setFocusedSection(e.state.focusedSection);
      } else {
        setFocusedSection(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateToSection = (sectionId: string) => {
    if (sectionId === 'home' || sectionId === '') {
      setFocusedSection(null);
      try {
        window.history.pushState(null, '', window.location.pathname);
      } catch {
        // Fallback
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const validId = sectionId as FocusedSectionId;
    setFocusedSection(validId);
    try {
      window.history.pushState({ focusedSection: validId }, '', `#${validId}`);
    } catch {
      // Fallback
    }
  };

  const handleCloseFocusedSection = () => {
    setFocusedSection(null);
    try {
      if (window.location.hash) {
        window.history.pushState(null, '', window.location.pathname);
      }
    } catch {
      // Fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleOpenConfigurator = () => {
    handleNavigateToSection('configurator');
  };

  const handleOpenRoiCalculator = () => {
    handleNavigateToSection('roi-calculator');
  };

  const handleOpenSampleModal = (grade: PVCGrade = 'transparent') => {
    setSelectedSampleGrade(grade);
    setSampleModalOpen(true);
  };

  const handleSelectGradeForConfigurator = (grade: PVCGrade) => {
    setActiveConfiguratorGrade(grade);
    handleNavigateToSection('configurator');
  };

  const handleRequestQuoteFromConfigurator = (config: CurtainConfiguration, quote: ComputedQuote) => {
    setCurrentConfig(config);
    setCurrentQuote(quote);
    setQuoteModalOpen(true);
  };

  const handleOpenDirectQuote = (grade: PVCGrade = 'transparent') => {
    if (!currentConfig || !currentQuote) {
      const defaultConfig: CurtainConfiguration = {
        width: 2400,
        height: 3000,
        unit: 'metric',
        grade: grade,
        stripWidth: 300,
        stripThickness: 3,
        overlap: 50,
        hardware: 'ss304-hook-track',
        mountingType: 'face-wall',
        environment: 'general'
      };
      const defaultQuote: ComputedQuote = {
        totalWidthMm: 2400,
        totalHeightMm: 3000,
        stripCount: 12,
        totalLengthMeters: 37.2,
        curtainWeightKg: 42.5,
        curtainAreaSqM: 7.2,
        overlapPercentage: 50,
        rValue: 0.55,
        thermalEfficiencyPct: 84,
        noiseReductionDb: 18,
        estimatedHvacSavingsUsd: 875,
        estimatedPriceUsd: 385,
        hardwareParts: {
          trackLengthMeters: 2.4,
          hookPlatePairs: 12,
          fastenerCount: 48
        }
      };
      setCurrentConfig(defaultConfig);
      setCurrentQuote(defaultQuote);
    }
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1E293B] selection:bg-[#0077ED] selection:text-white font-sans antialiased">
      {/* Entrance Animation Screen */}
      <AnimatePresence>
        {showEntrance && (
          <EntranceAnimation onComplete={() => setShowEntrance(false)} />
        )}
      </AnimatePresence>

      {/* Industrial Blue Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#0077ED] origin-left z-50 shadow-[0_0_8px_#0077ED] pointer-events-none"
        style={{ scaleX }}
      />

      {/* Global Precision Navigation Bar with Active Section Indicator */}
      <Navbar
        onOpenConfigurator={handleOpenConfigurator}
        onOpenSampleModal={() => handleOpenSampleModal('transparent')}
        onOpenRoiCalculator={handleOpenRoiCalculator}
        onOpenQuoteModal={() => handleOpenDirectQuote(activeConfiguratorGrade)}
        onNavigateToSection={handleNavigateToSection}
        activeSectionId={focusedSection}
      />

      {/* Main Viewport: Home Page OR Section-Specific Focused Module */}
      <main id="main-content" className="pt-20">
        <AnimatePresence mode="wait">
          {focusedSection ? (
            <motion.div
              key={focusedSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <FocusedSectionView
                sectionId={focusedSection}
                onClose={handleCloseFocusedSection}
                onNavigateSection={handleNavigateToSection}
                activeConfiguratorGrade={activeConfiguratorGrade}
                onSelectGradeForConfigurator={(grade) => {
                  setActiveConfiguratorGrade(grade);
                }}
                onOpenSampleModal={handleOpenSampleModal}
                onRequestQuoteFromConfigurator={handleRequestQuoteFromConfigurator}
                onOpenDirectQuote={handleOpenDirectQuote}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HomePage
                onNavigateSection={handleNavigateToSection}
                onSelectGradeForConfigurator={handleSelectGradeForConfigurator}
                onOpenQuoteModal={() => handleOpenDirectQuote(activeConfiguratorGrade)}
                onOpenSampleModal={() => handleOpenSampleModal(activeConfiguratorGrade)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Free Physical Swatch Kit Request Modal */}
      <SampleRequestModal
        isOpen={sampleModalOpen}
        onClose={() => setSampleModalOpen(false)}
        defaultGrade={selectedSampleGrade}
      />

      {/* Official Factory Quotation Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        config={currentConfig}
        quote={currentQuote}
      />

      {/* Interactive AI Technical Chatbot & Advisor (Replaces static button) */}
      <MultiAIChatbot
        onOpenConfigurator={handleOpenConfigurator}
        onOpenSampleModal={handleOpenSampleModal}
        onNavigateToSection={handleNavigateToSection}
        onOpenQuoteModal={() => handleOpenDirectQuote(activeConfiguratorGrade)}
      />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
