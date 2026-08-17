import React from 'react';
import { MultiLogo } from './MultiLogo';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  ArrowUp, 
  Globe, 
  Clock 
} from 'lucide-react';
import { FocusedSectionId } from './FocusedSectionView';

interface FooterProps {
  onOpenSampleModal: () => void;
  onOpenConfigurator: () => void;
  onNavigateToSection?: (sectionId: FocusedSectionId) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenSampleModal, 
  onOpenConfigurator,
  onNavigateToSection 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (sectionId: FocusedSectionId) => {
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#F8F6F0] text-[#1E293B] border-t border-[#E2DDD2] pt-16 pb-12 overflow-hidden">
      {/* Precision Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E2DDD2]">
          {/* Col 1 & 2: Brand & Legacy (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <MultiLogo variant="full" size={32} showEst={true} />

            <p className="text-xs text-[#475569] leading-relaxed max-w-sm font-light">
              Established in 1998. Multi Enterprise is a specialized manufacturer of high-durability PVC strip curtains, sub-zero cold room airlocks, anti-static cleanroom barriers, and Grade 304 stainless steel suspension systems.
            </p>

            <div className="flex items-center gap-4 text-[10px] font-mono text-[#475569] pt-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Globe className="w-3.5 h-3.5" />
                Worldwide Export
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#0077ED]">
                <Clock className="w-3.5 h-3.5" />
                24-48h Fast Dispatch
              </span>
            </div>
          </div>

          {/* Col 3: Product Grades */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#0F172A] font-bold">
              [ PVC Strip Grades ]
            </h4>
            <ul className="space-y-2 text-xs text-[#475569] font-light">
              <li>
                <button type="button" onClick={() => handleNav('products')} className="hover:text-[#0077ED] transition-colors text-left cursor-pointer">
                  Standard Clear Smooth
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('products')} className="hover:text-[#0077ED] transition-colors text-left cursor-pointer">
                  Polar Sub-Zero Grade
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('products')} className="hover:text-[#0077ED] transition-colors text-left cursor-pointer">
                  Double-Ribbed Heavy Duty
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('products')} className="hover:text-[#0077ED] transition-colors text-left cursor-pointer">
                  Anti-Static ESD Cleanroom
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('products')} className="hover:text-[#0077ED] transition-colors text-left cursor-pointer">
                  Welding Safety Screen
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('products')} className="hover:text-[#0077ED] transition-colors text-left cursor-pointer">
                  Anti-Insect Amber Yellow
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Engineering & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#0F172A] font-bold">
              [ Engineering Tools ]
            </h4>
            <ul className="space-y-2 text-xs text-[#475569] font-light">
              <li>
                <button type="button" onClick={() => handleNav('configurator')} className="hover:text-[#0077ED] transition-colors text-left cursor-pointer">
                  3D Doorway Configurator
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('roi-calculator')} className="hover:text-[#0077ED] transition-colors text-left cursor-pointer">
                  Thermodynamic ROI Model
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('installation')} className="hover:text-[#0077ED] transition-colors text-left cursor-pointer">
                  SS304 Hook-On Blueprint
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('quality')} className="hover:text-[#0077ED] transition-colors text-left cursor-pointer">
                  Technical FAQs & Specs
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenSampleModal} className="hover:text-[#0077ED] transition-colors text-left text-[#0077ED] font-medium cursor-pointer">
                  Order Physical Swatch Kit
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Technical Hotline & HQ */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#0F172A] font-bold">
              [ Direct Contact ]
            </h4>
            <div className="space-y-2 text-xs text-[#475569] font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0077ED] flex-shrink-0 mt-0.5" />
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="text-left font-sans leading-tight hover:text-[#0077ED] transition-colors cursor-pointer"
                >
                  FF-5, Madhuram Complex, Keshav Nagar, Nr. R.T.O. Circle, Subhash Bridge, Ahmedabad, INDIA - 380 027
                  <span className="block text-[10px] font-mono text-[#0077ED] mt-1 font-bold">
                    → View 3D Ahmedabad Map & Directions
                  </span>
                </button>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0077ED] flex-shrink-0 mt-1" />
                <div className="flex flex-col font-mono text-[11px] space-y-0.5">
                  <a href="mailto:multimehta@gmail.com" className="hover:text-[#0077ED] transition-colors">multimehta@gmail.com</a>
                  <a href="mailto:mehtapolyfab@gmail.com" className="hover:text-[#0077ED] transition-colors text-[#64748B]">mehtapolyfab@gmail.com</a>
                  <a href="mailto:info@multipvcstrip.com" className="hover:text-[#0077ED] transition-colors text-[#64748B]">info@multipvcstrip.com</a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0077ED] flex-shrink-0 mt-1" />
                <div className="flex flex-col font-mono text-[11px] space-y-0.5">
                  <a href="tel:+919377678155" className="hover:text-[#0077ED] transition-colors">(+91) 93776 78155</a>
                  <a href="tel:+919327000042" className="hover:text-[#0077ED] transition-colors text-[#64748B]">(+91) 93270 00042</a>
                  <a href="tel:+919687700045" className="hover:text-[#0077ED] transition-colors text-[#64748B]">(+91) 96877 00045</a>
                </div>
              </div>
              <div className="pt-1">
                <span className="text-[10px] font-mono text-emerald-400 block">
                  Official Portal: multipvcstrip.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Quality Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-[#64748B]">
          <div>
            © {new Date().getFullYear()} MULTI ENTERPRISE. ALL RIGHTS RESERVED. INDUSTRIAL PVC STRIP CURTAINS & COLD BARRIERS.
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-[#0077ED] transition-colors">100% VIRGIN POLYMER</span>
            <span>•</span>
            <span className="hover:text-[#0077ED] transition-colors">FOOD & PHARMA SUITABLE</span>
            <span>•</span>
            <span className="hover:text-[#0077ED] transition-colors">SELF-EXTINGUISHING GRADE</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-1.5 bg-[#FAF8F5] hover:bg-[#0077ED] text-[#0F172A] hover:text-white border border-[#E2DDD2] transition-all ml-2 cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
