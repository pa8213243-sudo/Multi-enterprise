import React, { useState, useMemo } from 'react';
import { MultiLogo, MultiLogoIcon } from './MultiLogo';
import { ALL_FACILITY_PRODUCTS, FacilityProduct } from '../data/clientsAndProducts';
import { 
  Search, 
  Filter, 
  Download, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Wind, 
  Bug, 
  Droplets, 
  Package, 
  Footprints, 
  Trash2,
  ExternalLink,
  ChevronRight,
  X,
  FileText,
  Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

interface AllProductsCatalogProps {
  onOpenDirectQuote: (productName?: string) => void;
  onExploreConfigurator?: () => void;
}

export const AllProductsCatalog: React.FC<AllProductsCatalogProps> = ({ 
  onOpenDirectQuote,
  onExploreConfigurator
}) => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProductForModal, setSelectedProductForModal] = useState<FacilityProduct | null>(null);
  const [focusedProductId, setFocusedProductId] = useState<string | null>(null);

  const categories = [
    { id: 'All', label: 'All Range', icon: Layers, count: ALL_FACILITY_PRODUCTS.length },
    { id: 'Air & Climate', label: 'Air Curtains & Climate', icon: Wind, count: ALL_FACILITY_PRODUCTS.filter(p => p.category === 'Air & Climate').length },
    { id: 'Pest Control', label: 'Insect & Pest Traps', icon: Bug, count: ALL_FACILITY_PRODUCTS.filter(p => p.category === 'Pest Control').length },
    { id: 'Hygiene & Automation', label: 'Hygiene & Washroom', icon: Droplets, count: ALL_FACILITY_PRODUCTS.filter(p => p.category === 'Hygiene & Automation').length },
    { id: 'Cleanroom & PPE', label: 'Cleanroom & Safety PPE', icon: ShieldCheck, count: ALL_FACILITY_PRODUCTS.filter(p => p.category === 'Cleanroom & PPE').length },
    { id: 'Flooring & Safety', label: 'Safety Mats & Tapes', icon: Footprints, count: ALL_FACILITY_PRODUCTS.filter(p => p.category === 'Flooring & Safety').length },
    { id: 'Packaging & Material', label: 'Material & Conveyors', icon: Package, count: ALL_FACILITY_PRODUCTS.filter(p => p.category === 'Packaging & Material').length },
    { id: 'Waste & Sanitation', label: 'Waste Management', icon: Trash2, count: ALL_FACILITY_PRODUCTS.filter(p => p.category === 'Waste & Sanitation').length },
  ];

  const filteredProducts = useMemo(() => {
    return ALL_FACILITY_PRODUCTS.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.specs.some(s => s.toLowerCase().includes(q)) ||
        item.applications.some(a => a.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const handleDownloadCatalogue = () => {
    // Technical spec catalog download simulation
    const link = document.createElement('a');
    link.href = '/assets/PDF/Multi-Enterprise-Complete-Catalog.pdf';
    link.download = 'Multi-Enterprise-Complete-Catalog.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#0F172A] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero Section */}
        <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-8 border-b border-[#E2DDD2]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF8F5] border border-[#D8D2C5] rounded-full text-xs font-mono text-[#0077ED] font-bold mb-3 shadow-xs">
              <MultiLogoIcon size={18} className="w-4.5 h-4.5" />
              <span>33+ CERTIFIED INDUSTRIAL SOLUTIONS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight uppercase font-display">
              {language === 'hi' ? 'संपूर्ण औद्योगिक उत्पाद सूची' : 'Complete Industrial Products Catalog'}
            </h1>
            <p className="text-sm sm:text-base text-[#475569] font-normal mt-2 max-w-2xl">
              {language === 'hi'
                ? 'पीवीसी स्ट्रिप पर्दे, एयर कर्टन्स, कीट नियंत्रण, स्वच्छ कमरे के उपकरण और अपशिष्ट प्रबंधन समाधान।'
                : 'Explore our complete facility portfolio covering PVC strip curtains, high-velocity air barriers, hygiene automation, safety flooring, and waste logistics.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleDownloadCatalogue}
              className="flex-1 sm:flex-none px-5 py-3 bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#0F172A] font-mono text-xs uppercase tracking-wider font-bold border border-[#D8D2C5] rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#0077ED]" />
              <span>{language === 'hi' ? 'कैटलॉग डाउनलोड करें' : 'Download Spec PDF'}</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenDirectQuote()}
              className="flex-1 sm:flex-none px-6 py-3 bg-[#0077ED] hover:bg-[#2B8EFF] text-white font-mono text-xs uppercase tracking-wider font-bold rounded-xl transition-all shadow-lg hover:shadow-xl shadow-[#0077ED]/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'hi' ? 'कोटेशन प्राप्त करें' : 'Get Bulk Quote'}</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="bg-[#FAF8F5] border border-[#D8D2C5] p-4 sm:p-6 mb-10 rounded-2xl shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name, category, or specs..."
                className="w-full bg-[#FFFFFF] border border-[#D8D2C5] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:border-[#0077ED] font-mono transition-colors shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0077ED]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results Count & Quick Status */}
            <div className="text-xs font-mono text-[#475569] flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
              <span>Showing <strong>{filteredProducts.length}</strong> of {ALL_FACILITY_PRODUCTS.length} Products</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-emerald-700 font-bold">Fast Delivery Across India</span>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono whitespace-nowrap transition-all border cursor-pointer rounded-xl ${
                    isSelected
                      ? 'bg-[#0077ED] text-white border-[#0077ED] shadow-md font-bold'
                      : 'bg-[#FFFFFF] text-[#475569] border-[#E2DDD2] hover:border-[#0077ED] hover:text-[#0077ED]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#0077ED]'}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white text-[#0077ED]' : 'bg-[#F4EFE6] text-[#64748B]'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 33-Product Comprehensive Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => {
            const isFocused = focusedProductId === product.id;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: (idx % 8) * 0.04 }}
                onClick={() => setFocusedProductId(product.id)}
                className={`group bg-[#FAF8F5] border-2 ${
                  isFocused 
                    ? 'border-[#0077ED] ring-4 ring-[#0077ED]/25 shadow-2xl scale-[1.01]' 
                    : 'border-[#E2DDD2] hover:border-[#0077ED] hover:shadow-xl'
                } rounded-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden cursor-pointer`}
              >
                {/* Top Accent Indicator */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] transition-colors z-10 ${
                  isFocused ? 'bg-[#0077ED]' : 'bg-transparent group-hover:bg-[#0077ED]'
                }`} />

                <div>
                  {/* Product Image Header with High-Clarity Showcase */}
                  <div 
                    className="relative w-full h-52 bg-white overflow-hidden flex items-center justify-center p-2 rounded-t-2xl border-b border-[#E2DDD2]"
                    onClick={() => setSelectedProductForModal(product)}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Category & Badge overlay with high contrast */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#0077ED] font-bold bg-[#FAF8F5]/95 backdrop-blur-md px-2 py-0.5 border border-[#0077ED]/40 rounded shadow-md">
                        {product.category}
                      </span>
                      {product.featured && (
                        <span className="text-[9px] font-mono uppercase text-emerald-800 font-bold bg-emerald-100/95 backdrop-blur-md px-2 py-0.5 border border-emerald-400 rounded shadow-md">
                          ★ High Demand
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 sm:p-5 pt-3 bg-[#FAF8F5]">
                    {/* Product Name */}
                    <h3 
                      onClick={() => setSelectedProductForModal(product)}
                      className="text-base font-bold text-[#0F172A] group-hover:text-[#0077ED] transition-colors font-mono tracking-tight mb-2 cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs text-[#475569] font-normal leading-relaxed mb-4 line-clamp-2">
                      {product.tagline}
                    </p>

                    {/* Quick Spec Bullet Highlights */}
                    <div className="space-y-1.5 mb-2 bg-[#FFFFFF] p-3 border border-[#E2DDD2] rounded-lg shadow-2xs">
                      <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1 font-bold">
                        [ KEY SPECIFICATIONS ]
                      </div>
                      {product.specs.slice(0, 2).map((spec, sIdx) => (
                        <div key={sIdx} className="text-[11px] font-mono text-[#1E293B] flex items-start gap-1.5 leading-tight">
                          <span className="text-[#0077ED] text-xs font-bold leading-none mt-0.5">•</span>
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 sm:p-5 pt-0 border-t border-[#E2DDD2] flex items-center gap-2 mt-2 bg-[#FAF8F5]">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProductForModal(product);
                    }}
                    className="flex-1 py-2 px-3 bg-[#FFFFFF] hover:bg-[#F4EFE6] text-[#0F172A] border border-[#D8D2C5] font-mono text-[11px] font-bold text-center transition-colors cursor-pointer rounded-lg shadow-xs"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDirectQuote(product.name);
                    }}
                    className="flex-1 py-2 px-3 bg-[#0077ED] hover:bg-[#2B8EFF] text-white font-mono text-[11px] font-bold text-center transition-all flex items-center justify-center gap-1 shadow-md hover:shadow-[0_0_15px_rgba(0, 119, 237,0.4)] cursor-pointer rounded-lg"
                  >
                    <span>Get Quote</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty Search Fallback */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-[#FAF8F5] border border-[#D8D2C5] p-8 rounded-2xl">
            <Search className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
            <h4 className="text-lg font-bold text-[#0F172A] mb-1 font-mono">No products matched your search</h4>
            <p className="text-xs text-[#64748B] mb-4 font-light">
              Try searching for "Curtain", "Dispenser", "Mat", "Dustbin", or "Sensor".
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 bg-[#0077ED] text-white text-xs font-mono font-bold uppercase cursor-pointer rounded"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Custom Order / Bulk Requirement Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-[#FFFFFF] border-2 border-[#0077ED]/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#0077ED] font-bold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>CUSTOM SPECIFICATIONS & BULK PROCUREMENT</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] uppercase font-display">
              Need A Custom Dimension, Heavy-Duty Size Or Specialized Fitting?
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] font-light leading-relaxed">
              We manufacture and supply custom size air barriers, specialized pharmaceutical grade cleanroom mats, customized SS304 brackets, and full plant hygiene setups.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onOpenDirectQuote('Custom Industrial Setup')}
              className="px-6 py-3.5 bg-[#0077ED] hover:bg-[#2B8EFF] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0, 119, 237,0.4)] cursor-pointer whitespace-nowrap text-center rounded-xl"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProductForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFFFF] border border-[#CFC8BA] max-w-2xl w-full rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto overflow-hidden"
            >
              {/* Modal Image Header with Authentic Showcase */}
              <div className="relative w-full h-64 sm:h-72 bg-white overflow-hidden flex items-center justify-center p-4 border-b border-[#E2DDD2]">
                <img
                  src={selectedProductForModal.imageUrl}
                  alt={selectedProductForModal.name}
                  className="w-full h-full object-contain"
                />
                
                <button
                  type="button"
                  onClick={() => setSelectedProductForModal(null)}
                  className="absolute top-4 right-4 p-2 text-[#0F172A] bg-[#FAF8F5]/90 hover:bg-[#F4EFE6] border border-[#CFC8BA] rounded-lg transition-colors cursor-pointer shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute top-4 left-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#0077ED] font-bold bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1 border border-[#0077ED]/40 rounded shadow-md">
                    {selectedProductForModal.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-4">
                <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] font-display uppercase mb-1">
                  {selectedProductForModal.name}
                </h3>
                <p className="text-sm text-[#0077ED] font-mono mb-4">
                  {selectedProductForModal.tagline}
                </p>

                <div className="space-y-4 my-4 text-xs text-[#334155] font-light leading-relaxed">
                  <p>{selectedProductForModal.description}</p>

                  <div className="bg-[#FAF8F5] p-4 border border-[#E2DDD2] rounded-xl space-y-2">
                    <div className="text-[11px] font-mono uppercase text-[#0077ED] font-bold">
                      Technical Specifications:
                    </div>
                    <ul className="space-y-1.5 text-xs font-mono text-[#1E293B]">
                      {selectedProductForModal.specs.map((s, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#0077ED]">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#FAF8F5] p-4 border border-[#E2DDD2] rounded-xl space-y-2">
                    <div className="text-[11px] font-mono uppercase text-emerald-400 font-bold">
                      Recommended Applications:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#475569]">
                      {selectedProductForModal.applications.map((app, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2DDD2] flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedProductForModal(null)}
                    className="py-2.5 px-4 bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#0F172A] font-mono text-xs font-bold rounded-lg border border-[#E2DDD2] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const name = selectedProductForModal.name;
                      setSelectedProductForModal(null);
                      onOpenDirectQuote(name);
                    }}
                    className="py-2.5 px-5 bg-[#0077ED] hover:bg-[#2B8EFF] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Quotation</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
