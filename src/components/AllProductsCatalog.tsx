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
    // Generate an instant downloadable summary spec sheet
    const content = `MULTI ENTERPRISE - COMPLETE INDUSTRIAL FACILITY PRODUCTS CATALOGUE
Established 1998 • Ahmedabad & Mumbai Hubs, India
Official Website: multipvcstrip.com • Email: multimehta@gmail.com / info@multipvcstrip.com
Phone: +91 9377 678 155 / +91 9327 000 042

PRODUCT RANGE DIRECTORY:
${ALL_FACILITY_PRODUCTS.map((p, idx) => `
${idx + 1}. ${p.name.toUpperCase()} [${p.category}]
Tagline: ${p.tagline}
Description: ${p.description}
Technical Specs: ${p.specs.join(' | ')}
Target Applications: ${p.applications.join(', ')}
`).join('\n----------------------------------------\n')}

© MULTI ENTERPRISE. ALL RIGHTS RESERVED.`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Multi_Enterprise_Complete_Catalogue_${new Date().getFullYear()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="all-products" className="py-24 bg-[#08090A] text-[#E0E0E0] border-t border-white/10 relative overflow-hidden">
      {/* Precision Industrial Dot Grid Background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MultiLogoIcon size={20} className="w-5 h-5" />
            <span className="text-[#F27D26] text-xs font-mono tracking-widest uppercase font-bold">
              [ {language === 'hi' ? 'सम्पूर्ण उत्पाद श्रृंखला • 30+ उत्पाद' : 'COMPLETE FACILITY PRODUCT PORTFOLIO'} ]
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-display mb-4">
            {language === 'hi' ? 'हमारे सभी औद्योगिक उत्पाद' : 'MORE RANGE OF PRODUCTS'}
          </h2>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light max-w-2xl mx-auto">
            Transform your workspace with our comprehensive range of products that offers durability, versatility, and efficiency. Explore our catalogue below or contact us for custom fabrication requirements.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleDownloadCatalogue}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#141619] hover:bg-[#F27D26] text-white border border-white/15 hover:border-[#F27D26] font-mono text-xs font-bold uppercase transition-all shadow-lg hover:shadow-[0_0_20px_rgba(242,125,38,0.4)] cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#F27D26] group-hover:text-white" />
              <span>Download Product Catalogue</span>
            </button>

            {onExploreConfigurator && (
              <button
                type="button"
                onClick={onExploreConfigurator}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F27D26] hover:bg-[#e06c19] text-white font-mono text-xs font-bold uppercase transition-all shadow-lg hover:shadow-[0_0_20px_rgba(242,125,38,0.5)] cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
                <span>3D PVC Doorway Configurator</span>
              </button>
            )}
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="bg-[#101214] border border-white/10 p-4 sm:p-6 mb-10 shadow-2xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name, category, or specs..."
                className="w-full bg-black/70 border border-white/15 pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#F27D26] font-mono transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results Count & Quick Status */}
            <div className="text-xs font-mono text-white/60 flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
              <span>Showing <strong>{filteredProducts.length}</strong> of {ALL_FACILITY_PRODUCTS.length} Products</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-emerald-400 font-bold">Fast Delivery Across India</span>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono whitespace-nowrap transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-[#F27D26] text-white border-[#F27D26] shadow-[0_0_15px_rgba(242,125,38,0.3)] font-bold'
                      : 'bg-black/50 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#F27D26]'}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/30 text-white' : 'bg-white/10 text-white/50'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 33-Product Comprehensive Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.35, delay: (idx % 8) * 0.04 }}
              className="group bg-[#111316] border border-white/10 hover:border-[#F27D26]/60 rounded-xl flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden"
            >
              {/* Top Accent Light */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#F27D26] transition-colors z-10" />

              <div>
                {/* Product Image Header with Hover Zoom */}
                <div 
                  className="relative w-full h-44 bg-black/60 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProductForModal(product)}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111316] via-transparent to-black/40" />

                  {/* Product Badge & Category floating over image */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#F27D26] font-bold bg-black/80 backdrop-blur-md px-2 py-0.5 border border-[#F27D26]/40 rounded">
                      {product.category}
                    </span>
                    {product.featured && (
                      <span className="text-[9px] font-mono uppercase text-emerald-300 font-bold bg-black/80 backdrop-blur-md px-2 py-0.5 border border-emerald-500/40 rounded">
                        ★ High Demand
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 sm:p-5 pt-3">
                  {/* Product Name */}
                  <h3 
                    onClick={() => setSelectedProductForModal(product)}
                    className="text-base font-bold text-white group-hover:text-[#F27D26] transition-colors font-mono tracking-tight mb-2 cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs text-white/60 font-light leading-relaxed mb-4 line-clamp-2">
                    {product.tagline}
                  </p>

                  {/* Quick Spec Bullet Highlights */}
                  <div className="space-y-1.5 mb-2 bg-black/40 p-3 border border-white/5 rounded-lg">
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">
                      [ KEY SPECIFICATIONS ]
                    </div>
                    {product.specs.slice(0, 2).map((spec, sIdx) => (
                      <div key={sIdx} className="text-[11px] font-mono text-white/80 flex items-start gap-1.5 leading-tight">
                        <span className="text-[#F27D26] text-xs font-bold leading-none mt-0.5">•</span>
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 pt-0 border-t border-white/10 flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProductForModal(product)}
                  className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-mono text-[11px] font-bold text-center transition-colors cursor-pointer rounded-lg"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => onOpenDirectQuote(product.name)}
                  className="flex-1 py-2 px-3 bg-[#F27D26] hover:bg-[#e06c19] text-white font-mono text-[11px] font-bold text-center transition-all flex items-center justify-center gap-1 shadow-md hover:shadow-[0_0_15px_rgba(242,125,38,0.4)] cursor-pointer rounded-lg"
                >
                  <span>Get Quote</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty Search Fallback */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-[#111316] border border-white/10 p-8 rounded-xl">
            <Search className="w-10 h-10 text-white/30 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1 font-mono">No products matched your search</h4>
            <p className="text-xs text-white/50 mb-4 font-light">
              Try searching for "Curtain", "Dispenser", "Mat", "Dustbin", or "Sensor".
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 bg-[#F27D26] text-white text-xs font-mono font-bold uppercase cursor-pointer rounded"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Custom Order / Bulk Requirement Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-[#121418] border-2 border-[#F27D26]/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#F27D26] font-bold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>CUSTOM SPECIFICATIONS & BULK PROCUREMENT</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-display">
              Need A Custom Dimension, Heavy-Duty Size Or Specialized Fitting?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              We manufacture and supply custom size air barriers, specialized pharmaceutical grade cleanroom mats, customized SS304 brackets, and full plant hygiene setups.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onOpenDirectQuote('Custom Industrial Setup')}
              className="px-6 py-3.5 bg-[#F27D26] hover:bg-[#e06c19] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(242,125,38,0.4)] cursor-pointer whitespace-nowrap text-center rounded-xl"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProductForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#121418] border border-white/20 max-w-2xl w-full rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto overflow-hidden"
            >
              {/* Modal Image Header */}
              <div className="relative w-full h-52 sm:h-60 bg-black/80 overflow-hidden">
                <img
                  src={selectedProductForModal.imageUrl}
                  alt={selectedProductForModal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-black/50" />
                
                <button
                  type="button"
                  onClick={() => setSelectedProductForModal(null)}
                  className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/60 backdrop-blur-md border border-white/20 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#F27D26] font-bold bg-black/80 backdrop-blur-md px-2.5 py-1 border border-[#F27D26]/30 rounded">
                    {selectedProductForModal.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-2 font-display uppercase">
                    {selectedProductForModal.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-4">
                <p className="text-sm text-[#F27D26] font-mono mb-4">
                  {selectedProductForModal.tagline}
                </p>

                <div className="space-y-4 my-4 text-xs text-white/80 font-light leading-relaxed">
                  <p>{selectedProductForModal.description}</p>

                  <div className="bg-black/50 p-4 border border-white/10 rounded-xl space-y-2">
                    <div className="text-[11px] font-mono uppercase text-[#F27D26] font-bold">
                      Technical Specifications:
                    </div>
                    <ul className="space-y-1.5 text-xs font-mono text-white/90">
                      {selectedProductForModal.specs.map((s, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#F27D26]">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-black/50 p-4 border border-white/10 rounded-xl space-y-2">
                    <div className="text-[11px] font-mono uppercase text-emerald-400 font-bold">
                      Recommended Applications:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-white/70">
                      {selectedProductForModal.applications.map((app, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedProductForModal(null)}
                    className="py-2.5 px-4 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold rounded-lg border border-white/10 transition-colors cursor-pointer"
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
                    className="py-2.5 px-5 bg-[#F27D26] hover:bg-[#e06c19] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
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
    </section>
  );
};
