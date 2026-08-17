import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MoreVertical, 
  MessageSquare, 
  X, 
  Sliders, 
  Layers, 
  Zap, 
  Sparkles, 
  Package, 
  Award,
  Info,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { FocusedSectionId } from './FocusedSectionView';

interface CornerActionsProps {
  onNavigateSection: (sectionId: FocusedSectionId) => void;
  onOpenSampleModal: () => void;
  onOpenQuoteModal: () => void;
}

export const CornerActions: React.FC<CornerActionsProps> = ({
  onNavigateSection,
  onOpenSampleModal,
  onOpenQuoteModal
}) => {
  const { t, language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const sections: {
    id: FocusedSectionId;
    num: string;
    label: string;
    desc: string;
    icon: React.ElementType;
  }[] = [
    { id: 'configurator', num: '01', label: t.nav.configurator, desc: '3D CAD Engine', icon: Sliders },
    { id: 'products', num: '02', label: t.nav.pvcGrades, desc: '6 Polymer Grades', icon: Layers },
    { id: 'roi-calculator', num: '03', label: t.nav.thermalRoi, desc: 'HVAC Energy Loss', icon: Zap },
    { id: 'solutions', num: '04', label: t.nav.solutions, desc: 'Sector Solutions', icon: Sparkles },
    { id: 'installation', num: '05', label: t.nav.hardware, desc: 'SS304 Track System', icon: Package },
    { id: 'quality', num: '06', label: t.nav.quality, desc: 'Quality & FAQs', icon: Award },
    { id: 'about', num: '07', label: language === 'hi' ? 'कंपनी के बारे में' : 'About Multi Enterprise', desc: 'Est. 1998 Heritage', icon: Info },
  ];

  const handleSelect = (id: FocusedSectionId) => {
    setMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <>
      {/* Floating Action Cluster in Bottom Right Corner */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5">
        {/* WhatsApp Direct Sales Button */}
        <a
          href="https://wa.me/919820000000?text=Hello%20Multi%20Enterprise,%20I%20would%20like%20a%20technical%20quote%20for%20industrial%20PVC%20strip%20curtains."
          target="_blank"
          rel="noopener noreferrer"
          title="Chat with Technical Sales on WhatsApp"
          aria-label="Chat with Technical Sales on WhatsApp"
          className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-[0_4px_20px_rgba(5,150,105,0.4)] transition-all hover:scale-105 text-xs font-mono font-bold cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden md:inline">
            {language === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}
          </span>
        </a>

        {/* 3-Dots Corner Systems Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Open Industrial Systems Directory Menu"
          title="Industrial Systems Quick Directory (3 Dots)"
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-[0_4px_25px_rgba(0,0,0,0.8)] border cursor-pointer ${
            menuOpen
              ? 'bg-[#0077ED] text-white border-[#0077ED] rotate-90 scale-105'
              : 'bg-[#EFE9DE]/95 text-white hover:text-[#0077ED] border-[#CFC8BA] hover:border-[#0077ED]'
          }`}
        >
          {menuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            </div>
          )}
        </button>
      </div>

      {/* Floating Corner Systems Directory Overlay / Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-3 sm:p-6 bg-[#FAF8F5] backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm bg-[#FAF8F5] border border-[#CFC8BA] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
              data-lenis-prevent
            >
              {/* Header */}
              <div className="p-4 bg-[#EFE9DE] border-b border-[#E2DDD2] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#0077ED] uppercase tracking-widest font-bold">
                    [ SYSTEMS DIRECTORY ]
                  </div>
                  <h3 className="text-sm font-bold text-[#0F172A] font-display uppercase tracking-tight">
                    {language === 'hi' ? 'त्वरित अनुभाग नेविगेशन' : 'Quick Section Navigator'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 text-[#64748B] hover:text-[#0077ED] hover:bg-[#F4EFE6] rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Section Items */}
              <div 
                className="flex-1 overflow-y-auto p-2.5 divide-y divide-white/5 no-scrollbar"
                data-lenis-prevent
              >
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handleSelect(sec.id)}
                      className="w-full py-2.5 px-3 rounded-lg flex items-center justify-between hover:bg-[#FAF8F5] transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-[#0077ED] px-1.5 py-0.5 bg-[#0077ED]/10 rounded">
                          {sec.num}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-[#0077ED] transition-colors uppercase font-mono">
                            {sec.label}
                          </div>
                          <div className="text-[10px] text-[#64748B] font-mono">
                            {sec.desc}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0077ED] transition-transform group-hover:translate-x-1" />
                    </button>
                  );
                })}
              </div>

              {/* Bottom CTAs */}
              <div className="p-3 bg-[#FFFFFF] border-t border-[#E2DDD2] grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                  className="py-2 px-3 bg-[#0077ED] text-white font-mono font-bold text-[10px] uppercase tracking-wider rounded text-center cursor-pointer hover:bg-[#2B8EFF] transition-colors"
                >
                  {language === 'hi' ? 'कोटेशन प्राप्त करें' : 'Get Quote'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenSampleModal();
                  }}
                  className="py-2 px-3 bg-[#FAF8F5] border border-[#D8D2C5] text-[#0F172A] font-mono text-[10px] uppercase tracking-wider rounded text-center cursor-pointer hover:bg-[#F4EFE6] transition-colors"
                >
                  {language === 'hi' ? 'नि:शुल्क स्वैच' : 'Free Swatches'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
