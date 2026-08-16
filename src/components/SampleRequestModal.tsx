import React, { useState, useEffect, useRef } from 'react';
import { MultiLogo, MultiLogoIcon } from './MultiLogo';
import { PVCGrade } from '../types';
import { PVC_GRADES } from '../data/products';
import { 
  X, 
  Package, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Truck, 
  Sparkles 
} from 'lucide-react';

interface SampleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGrade?: PVCGrade;
}

export const SampleRequestModal: React.FC<SampleRequestModalProps> = ({
  isOpen,
  onClose,
  defaultGrade = 'standard-clear'
}) => {
  const [selectedGrades, setSelectedGrades] = useState<string[]>([defaultGrade, 'polar-freezer', 'double-ribbed']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus first interactive element on open
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Tab trap within modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleGrade = (gradeId: string) => {
    if (selectedGrades.includes(gradeId)) {
      if (selectedGrades.length > 1) {
        setSelectedGrades(selectedGrades.filter((g) => g !== gradeId));
      }
    } else {
      setSelectedGrades([...selectedGrades, gradeId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl bg-[#0F1012] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close Sample Request Modal"
          className="absolute top-5 right-5 p-2 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all border border-white/10 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F27D26]"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-white/5 border border-white/10 flex items-center justify-center">
                <MultiLogoIcon size={24} />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#F27D26] tracking-widest font-bold">
                  [ MULTI ENTERPRISE • COMPLIMENTARY EVALUATION KIT ]
                </span>
                <h3 id="sample-modal-title" className="text-xl sm:text-2xl font-black text-white uppercase font-display">
                  Request Physical PVC Swatch Kit
                </h3>
              </div>
            </div>

            <p className="text-xs text-white/60 mb-6 font-light leading-relaxed">
              We dispatch physical material sample kits worldwide via express courier within 24 hours. Includes tactile polymer swatches, chemical resistance guides, and a mini Stainless Steel 304 hook-on track sample.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select Swatches to Include */}
              <div>
                <label className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">
                  [ SELECT SWATCHES TO INCLUDE IN KIT ]:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.values(PVC_GRADES).map((g) => {
                    const isChecked = selectedGrades.includes(g.id);
                    return (
                      <button
                        type="button"
                        key={g.id}
                        onClick={() => toggleGrade(g.id)}
                        className={`p-2 text-left border transition-all flex items-center justify-between font-mono cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F27D26] ${
                          isChecked
                            ? 'bg-white text-black border-white'
                            : 'bg-black/60 border-white/10 text-white/60 hover:text-white hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: g.colorHex }}
                          />
                          <span className="text-[11px] font-bold uppercase">{g.shortName}</span>
                        </div>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">Your Full Name *</label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F27D26] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F27D26] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">Company / Facility Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Cold Logistics"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F27D26] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">Country & City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Netherlands / Rotterdam"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F27D26] font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">Phone / WhatsApp (For Courier Dispatch)</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F27D26] font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white text-black hover:bg-[#F27D26] hover:text-white font-bold text-xs uppercase tracking-widest transition-all font-mono cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F27D26]"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Dispatch Free Swatch Kit (24h Express)</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-white/40 pt-1">
                <span>✓ 100% Free Shipping</span>
                <span>•</span>
                <span>✓ Includes TDS Laboratory Sheets</span>
                <span>•</span>
                <span>✓ Zero Obligation</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase font-display">Sample Request Confirmed!</h3>
            <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed font-light">
              Thank you, <strong className="text-white">{name}</strong>. Your Multi Enterprise industrial sample kit containing <strong className="text-[#F27D26] font-mono">{selectedGrades.length} material grades</strong> is queued for preparation and dispatch to <strong className="text-white">{company}</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="py-2.5 px-6 bg-white text-black hover:bg-[#F27D26] hover:text-white text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F27D26]"
              >
                Close & Return to Showcase
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

