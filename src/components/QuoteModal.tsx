import React, { useState, useEffect, useRef } from 'react';
import { MultiLogo, MultiLogoIcon } from './MultiLogo';
import { CurtainConfiguration, ComputedQuote } from '../types';
import { PVC_GRADES } from '../data/products';
import { 
  X, 
  Send, 
  CheckCircle2, 
  FileText, 
  Printer, 
  DollarSign, 
  MessageSquare,
  ShieldCheck,
  Building
} from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  config?: CurtainConfiguration;
  quote?: ComputedQuote;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  config,
  quote
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [doorwayCount, setDoorwayCount] = useState<number>(1);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus first interactive input on open
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

  const currentGrade = config ? PVC_GRADES[config.grade] : PVC_GRADES['standard-clear'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handlePrintQuote = () => {
    window.print();
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl bg-[#0F1012] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close Quotation Modal"
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
                  [ MULTI ENTERPRISE • FACTORY DIRECT SPECIFICATION ]
                </span>
                <h3 id="quote-modal-title" className="text-xl sm:text-2xl font-black text-white uppercase font-display">
                  Request Commercial Pricing & Lead Time
                </h3>
              </div>
            </div>

            {/* Spec Summary Card */}
            {quote && config && (
              <div className="bg-black/60 p-4 border border-white/10 mb-6 text-xs font-mono text-white/70">
                <div className="text-[9px] uppercase tracking-widest text-[#F27D26] mb-1.5 font-bold">[ ATTACHED ENGINEERING SPEC ]</div>
                <div className="grid grid-cols-2 gap-2 text-white/80 text-[11px]">
                  <div>• Opening: <strong className="text-white">{config.width} x {config.height} mm</strong></div>
                  <div>• Grade: <strong className="text-[#F27D26]">{currentGrade?.shortName}</strong></div>
                  <div>• Strip Size: <strong className="text-white">{config.stripWidth} x {config.stripThickness} mm</strong></div>
                  <div>• Overlap: <strong className="text-white">{config.overlap}% ({quote.stripCount} Strips)</strong></div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-white/10 flex justify-between items-center text-[#F27D26] font-bold text-xs">
                  <span className="text-white/60 uppercase">Estimated Budget Reference:</span>
                  <span className="text-sm font-mono">${quote.estimatedPriceUsd * doorwayCount} USD</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">Your Full Name *</label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    required
                    placeholder="e.g. David Vance"
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
                    placeholder="david@logistics.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F27D26] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">Company / Facility *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Cold Chain Hub"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F27D26] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">Number of Identical Doors</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={doorwayCount}
                    onChange={(e) => setDoorwayCount(Number(e.target.value))}
                    className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F27D26] font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F27D26] font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">Special Project Requirements / Delivery Port</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Pre-punched strips required, export CIF pricing needed for Rotterdam port..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F27D26] font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-white text-black hover:bg-[#F27D26] hover:text-white font-bold text-xs uppercase tracking-widest transition-all font-mono cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F27D26]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Request to Sales Engineering</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintQuote}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 text-white text-xs font-mono font-medium border border-white/10 transition-all uppercase cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F27D26]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Spec</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase font-display">Quotation Request Dispatched</h3>
            <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed font-light">
              Your inquiry has been assigned directly to our Senior Technical Applications Engineer. We will email an official formal proposal to <strong className="text-white font-mono">{email}</strong> within 2 business hours.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="py-2.5 px-6 bg-white text-black hover:bg-[#F27D26] hover:text-white text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F27D26]"
              >
                Close & Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

