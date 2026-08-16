import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { EntranceAnimation } from './components/EntranceAnimation';
import { SampleRequestModal } from './components/SampleRequestModal';
import { QuoteModal } from './components/QuoteModal';
import { FocusedSectionView, FocusedSectionId } from './components/FocusedSectionView';
import { PVCGrade, CurtainConfiguration, ComputedQuote } from './types';
import { MessageSquare, PhoneCall, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

function AppContent() {
  const { t, language } = useLanguage();
  const [showEntrance, setShowEntrance] = useState<boolean>(true);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [selectedSampleGrade, setSelectedSampleGrade] = useState<PVCGrade>('standard-clear');
  
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<CurtainConfiguration | undefined>(undefined);
  const [currentQuote, setCurrentQuote] = useState<ComputedQuote | undefined>(undefined);

  const [activeConfiguratorGrade, setActiveConfiguratorGrade] = useState<PVCGrade>('standard-clear');

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

  const handleOpenSampleModal = (grade: PVCGrade = 'standard-clear') => {
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

  const handleOpenDirectQuote = (grade: PVCGrade = 'standard-clear') => {
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
    <div className="min-h-screen bg-[#08090C] text-[#E0E0E0] selection:bg-[#F27D26] selection:text-white font-sans antialiased">
      {/* Entrance Animation Screen */}
      <AnimatePresence>
        {showEntrance && (
          <EntranceAnimation onComplete={() => setShowEntrance(false)} />
        )}
      </AnimatePresence>

      {/* Industrial Orange Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#F27D26] origin-left z-50 shadow-[0_0_8px_#F27D26] pointer-events-none"
        style={{ scaleX }}
      />

      {/* Global Precision Navigation Bar */}
      <Navbar
        onOpenConfigurator={handleOpenConfigurator}
        onOpenSampleModal={() => handleOpenSampleModal('standard-clear')}
        onOpenRoiCalculator={handleOpenRoiCalculator}
        onOpenQuoteModal={() => handleOpenDirectQuote(activeConfiguratorGrade)}
        onNavigateToSection={handleNavigateToSection}
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

      {/* Floating Direct Technical Support Widget */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-2.5">
        <a
          href="https://wa.me/919377678155?text=Hello%20Multi%20Enterprise,%20I%20would%20like%20a%20technical%20quote%20for%20industrial%20PVC%20strip%20curtains."
          target="_blank"
          rel="noopener noreferrer"
          title="Chat with Technical Sales on WhatsApp (+91 9377 678 155)"
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-transform hover:scale-105 text-xs font-mono font-bold"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">
            {language === 'hi' ? 'व्हाट्सएप तकनीकी सहायता' : 'WhatsApp +91 9377 678 155'}
          </span>
        </a>
      </div>
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
