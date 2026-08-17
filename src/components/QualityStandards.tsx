import React, { useState, useMemo, useRef } from 'react';
import { MultiLogo, MultiLogoIcon } from './MultiLogo';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  ChevronDown,
  FlaskConical,
  Flame,
  Clock,
  Building,
  Search,
  X,
  SlidersHorizontal,
  Wrench,
  ThermometerSnowflake,
  Sparkles,
  Copy,
  Check,
  HelpCircle,
  ChevronsUpDown,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS, FAQItem } from '../data/products';
import { useLanguage } from '../i18n/LanguageContext';

type FAQCategory = 'all' | 'sizing' | 'installation' | 'maintenance' | 'thermal' | 'compliance';

interface CategoryOption {
  id: FAQCategory;
  label: string;
  icon: React.ElementType;
}

export const QualityStandards: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-sizing', 'faq-installation-acclimation']);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categoryTabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const CATEGORIES: CategoryOption[] = [
    { id: 'all', label: t.qualitySection.allFaqs, icon: HelpCircle },
    { id: 'sizing', label: 'Sizing & Specs', icon: SlidersHorizontal },
    { id: 'installation', label: 'Installation', icon: Wrench },
    { id: 'maintenance', label: 'Maintenance & Care', icon: Sparkles },
    { id: 'thermal', label: 'Cold & Thermal', icon: ThermometerSnowflake },
    { id: 'compliance', label: 'Compliance & Safety', icon: ShieldCheck }
  ];

  const CERTIFICATIONS = [
    {
      code: 'TENSILE & TEAR TESTED',
      title: 'High Tensile Resin Compound',
      desc: 'Extruded from high-grade polymer resin compound ensuring high tear resistance and long flex life.'
    },
    {
      code: 'PHTHALATE FREE OPTIONS',
      title: 'Chemical Safety Options',
      desc: 'DOP / DEHP Phthalate-free formulations with low-odor compounding suitable for indoor use.'
    },
    {
      code: 'FOOD PROXIMITY SAFE',
      title: 'Hygienic Cleanable Material',
      desc: 'Non-porous polymer compound safe for proximity in cold rooms, dairy, and commercial food packing.'
    },
    {
      code: 'ARC & FLASH SHIELD',
      title: 'Welding Screen Radiation Filter',
      desc: 'Filters intense optical glare and arc radiation, protecting personnel in surrounding work bays.'
    },
    {
      code: 'FLAME RETARDANT COMPOUND',
      title: 'Self-Extinguishing Polymer',
      desc: 'Self-extinguishing compound that stops burning upon removal of open ignition source.'
    },
    {
      code: 'HEAVY METAL RESTRICTED',
      title: 'Clean Compound Formula',
      desc: 'Manufactured without harmful recycled industrial fillers or hazardous heavy metal additives.'
    }
  ];

  // Filtered FAQ list based on category & search query
  const filteredFaqs = useMemo(() => {
    return FAQS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      const inQuestion = item.question.toLowerCase().includes(query);
      const inAnswer = item.answer.toLowerCase().includes(query);
      const inHighlights = item.highlights?.some((h) => h.toLowerCase().includes(query));
      return inQuestion || inAnswer || inHighlights;
    });
  }, [selectedCategory, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setOpenFaqIds(filteredFaqs.map((f) => f.id));
  };

  const handleCollapseAll = () => {
    setOpenFaqIds([]);
  };

  const handleCopyAnswer = (faq: FAQItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `Q: ${faq.question}\nA: ${faq.answer}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(faq.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Keyboard navigation for category tabs
  const handleCategoryKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % CATEGORIES.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = CATEGORIES.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setSelectedCategory(CATEGORIES[nextIndex].id);
    categoryTabsRef.current[nextIndex]?.focus();
  };

  return (
    <section id="quality" className="relative py-10 sm:py-12 bg-[#F8F6F0] text-[#1E293B] border-t border-[#E2DDD2] overflow-hidden">
      {/* Background Subtle Technical Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <MultiLogoIcon size={20} className="w-5 h-5" />
            <span className="text-[#0077ED] text-xs font-mono tracking-widest uppercase font-bold">
              {t.qualitySection.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F172A] uppercase font-display mb-4">
            {t.qualitySection.title}
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-light">
            {t.qualitySection.subtitle}
          </p>
        </motion.div>

        {/* Certifications 6-Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FAF8F5] p-5 sm:p-6 border border-[#E2DDD2] hover:border-[#0077ED] transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 bg-[#FAF8F5] text-[#0077ED] text-[10px] font-mono font-bold border border-[#E2DDD2] uppercase tracking-widest">
                  {cert.code}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 opacity-80" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] uppercase mb-2 group-hover:text-[#0077ED] transition-colors">
                {cert.title}
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed font-light">
                {cert.desc}
              </p>
            </motion.div>
          ))}
        </div>



        {/* Dynamic Technical FAQ Accordion Section */}
        <div id="faq-section" className="max-w-4xl mx-auto pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="text-[#0077ED] text-xs font-mono tracking-widest uppercase font-bold mb-2">
              [ {t.qualitySection.faqTitle} ]
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] uppercase font-display mb-3">
              Technical & Engineering FAQs
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] font-light max-w-xl mx-auto">
              Engineering guidance on sizing formulas, acclimation protocols, cleaning regimens, and material grades.
            </p>
          </motion.div>

          {/* Interactive Search and Category Filter Toolbar */}
          <div className="bg-[#FAF8F5] p-4 sm:p-5 border border-[#E2DDD2] mb-6 space-y-4 shadow-xl">
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.qualitySection.searchPlaceholder}
                className="w-full bg-[#FAF8F5] border border-[#E2DDD2] pl-10 pr-10 py-2.5 text-xs text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:border-[#0077ED] font-mono transition-colors"
                aria-label="Search FAQs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#64748B] hover:text-[#0077ED] transition-colors"
                  title="Clear search"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Tabs with Keyboard Support */}
            <div
              role="tablist"
              aria-label="FAQ Category Filters"
              className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-none"
            >
              {CATEGORIES.map((cat, idx) => {
                const isSelected = selectedCategory === cat.id;
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.id}
                    ref={(el) => { categoryTabsRef.current[idx] = el; }}
                    role="tab"
                    id={`faq-cat-tab-${cat.id}`}
                    aria-selected={isSelected}
                    aria-controls="faq-list-container"
                    tabIndex={isSelected ? 0 : -1}
                    onKeyDown={(e) => handleCategoryKeyDown(e, idx)}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 uppercase tracking-wider text-[10px] whitespace-nowrap transition-all border cursor-pointer ${isSelected
                      ? 'bg-white text-black font-bold border-white shadow-md'
                      : 'bg-[#FAF8F5] text-[#475569] border-[#E2DDD2] hover:text-[#0077ED] hover:border-[#B8AF9F]'
                      }`}
                  >
                    <IconComponent className={`w-3 h-3 ${isSelected ? 'text-[#0077ED]' : 'text-[#64748B]'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Bar (Expand/Collapse All & Results Count) */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] pt-2 border-t border-[#E2DDD2]">
              <div>
                Showing <strong className="text-[#0F172A]">{filteredFaqs.length}</strong> of {FAQS.length} items
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleExpandAll}
                  className="hover:text-[#0077ED] text-[#475569] transition-colors cursor-pointer"
                >
                  {t.qualitySection.expandAll}
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={handleCollapseAll}
                  className="hover:text-[#0077ED] text-[#475569] transition-colors cursor-pointer"
                >
                  {t.qualitySection.collapseAll}
                </button>
              </div>
            </div>
          </div>

          {/* Accordion FAQ Item List */}
          <div id="faq-list-container" className="space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqIds.includes(faq.id);
                const isCopied = copiedId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`border transition-colors ${isOpen ? 'bg-[#FFFFFF] border-[#0077ED]/60' : 'bg-[#FAF8F5] border-[#E2DDD2] hover:border-[#C5BDAE]'
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#0077ED]"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-mono font-bold text-[#0077ED] px-1.5 py-0.5 bg-[#0077ED]/10 border border-[#0077ED]/30 mt-0.5">
                          Q
                        </span>
                        <span className="text-sm sm:text-base font-bold text-[#0F172A] font-mono">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#0077ED] flex-shrink-0 transition-transform duration-300 mt-1 ${isOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${faq.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-[#E2DDD2] text-xs sm:text-sm text-[#475569] leading-relaxed font-light space-y-4">
                            <p>{faq.answer}</p>

                            {/* Key Takeaway Highlights */}
                            {faq.highlights && faq.highlights.length > 0 && (
                              <div className="bg-[#FAF8F5] p-3 border border-[#E2DDD2] space-y-1.5">
                                <div className="text-[10px] font-mono text-[#0077ED] uppercase tracking-widest font-bold">
                                  [ KEY SPECIFICATION HIGHLIGHTS ]:
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-mono text-[#334155]">
                                  {faq.highlights.map((h, i) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                      <span className="text-[#0077ED]">▸</span>
                                      <span>{h}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Copy Q&A Button */}
                            <div className="flex justify-end pt-1">
                              <button
                                type="button"
                                onClick={(e) => handleCopyAnswer(faq, e)}
                                className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#475569] hover:text-[#0077ED] border border-[#E2DDD2] transition-all cursor-pointer"
                              >
                                {isCopied ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">{t.qualitySection.copied}</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>{t.qualitySection.copyAnswer}</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="bg-[#FAF8F5] border border-[#E2DDD2] p-8 text-center text-xs font-mono text-[#64748B] space-y-2">
                <HelpCircle className="w-8 h-8 mx-auto text-[#94A3B8]" />
                <div>No questions matched your search "{searchQuery}".</div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-[#0077ED] underline cursor-pointer hover:text-[#0077ED]"
                >
                  Clear search and view all FAQs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
