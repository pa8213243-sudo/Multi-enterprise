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

import { useAntiBotFormProtection, AntiBotProtectionBadge } from '../utils/antiBotSecurity';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  config?: CurtainConfiguration;
  quote?: ComputedQuote;
  productNames?: string[];
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  config,
  quote,
  productNames
}) => {
  const { honeypotInputProps, validateSubmission } = useAntiBotFormProtection();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [doorwayCount, setDoorwayCount] = useState<number>(1);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [botError, setBotError] = useState<string | null>(null);

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

  const getProductSummary = () => {
    if (productNames && productNames.length > 0) {
      return productNames.join(', ');
    }
    if (config) {
      return `${currentGrade?.name || 'PVC Strip Curtain'} (${currentGrade?.shortName})`;
    }
    return 'Industrial PVC Strip Curtains';
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Quotation Request: ${getProductSummary()} - ${company || name || 'Direct Inquiry'}`);
    const bodyLines = [
      `Dear Multi Enterprise Sales & Engineering Team,`,
      ``,
      `I would like to request an official commercial quotation and lead time:`,
      ``,
      `--- CLIENT & CONTACT DETAILS ---`,
      `• Full Name: ${name || 'N/A'}`,
      `• Company / Facility: ${company || 'N/A'}`,
      `• Email: ${email || 'N/A'}`,
      `• Phone / WhatsApp: ${phone || 'N/A'}`,
      `• Quantity / Doorway Count: ${doorwayCount} Unit(s)`,
      ``,
      `--- PRODUCT & TECHNICAL SPECIFICATIONS ---`,
      `• Selected Product(s): ${getProductSummary()}`,
      ...(config && quote ? [
        `• Clear Opening: ${config.width}mm (W) x ${config.height}mm (H)`,
        `• Strip Size: ${config.stripWidth}mm Width x ${config.stripThickness}mm Thickness`,
        `• Overlap Pattern: ${config.overlap}% (${quote.stripCount} Strips per door)`,
        `• Hardware System: ${config.hardware}`,
        `• Mounting Execution: ${config.mountingType === 'face-wall' ? 'Face-of-Wall (+200mm W, +100mm H)' : 'Under-Lintel Soffit'}`,
        `• Total Weight: ~${(quote.curtainWeightKg * doorwayCount).toFixed(1)} kg`,
        `• Estimated Reference: $${(quote.estimatedPriceUsd * doorwayCount).toFixed(0)} USD`
      ] : []),
      ``,
      `--- SPECIAL REQUIREMENTS / NOTES ---`,
      notes ? notes : 'Standard factory delivery and formal quotation requested.',
      ``,
      `Kindly reply with official proposal, pricing, and dispatch schedule.`,
      ``,
      `Best regards,`,
      `${name}`,
      `${company}`
    ];

    const body = encodeURIComponent(bodyLines.join('\n'));
    return `mailto:multimehta@gmail.com,mehtapolyfab@gmail.com,info@multipvcstrip.com?subject=${subject}&body=${body}`;
  };

  const generateWhatsAppUrl = () => {
    const textLines = [
      `*MULTI ENTERPRISE - COMMERCIAL QUOTE REQUEST*`,
      `• *Client:* ${name || 'Customer'} (${company || 'Direct'})`,
      `• *Phone:* ${phone || 'N/A'}`,
      `• *Email:* ${email || 'N/A'}`,
      `• *Product(s):* ${getProductSummary()}`,
      ...(config && quote ? [
        `• *Doorway:* ${config.width}x${config.height}mm (${doorwayCount} units)`,
        `• *Strip:* ${config.stripWidth}x${config.stripThickness}mm (${config.overlap}% overlap)`,
        `• *Hardware:* ${config.hardware}`
      ] : []),
      notes ? `• *Notes:* ${notes}` : ``,
      `Please provide factory direct pricing and dispatch timeline.`
    ].filter(Boolean);

    return `https://wa.me/919377678155?text=${encodeURIComponent(textLines.join('\n'))}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-bot check
    const botCheck = validateSubmission();
    if (!botCheck.isLegitimate) {
      setBotError(botCheck.reason || 'Bot protection triggered.');
      return;
    }
    setBotError(null);

    // Auto trigger email client draft
    try {
      window.open(generateMailtoUrl(), '_blank');
    } catch {
      // Fallback
    }

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E2DDD2] p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto rounded-2xl"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close Quotation Modal"
          className="absolute top-5 right-5 p-2 bg-[#FAF8F5] text-[#475569] hover:text-[#0077ED] hover:bg-[#F4EFE6] transition-all border border-[#E2DDD2] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#0077ED] rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-[#FAF8F5] border border-[#E2DDD2] flex items-center justify-center rounded-lg">
                <MultiLogoIcon size={24} />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#0077ED] tracking-widest font-bold">
                  [ MULTI ENTERPRISE • FACTORY DIRECT QUOTATION ]
                </span>
                <h3 id="quote-modal-title" className="text-xl sm:text-2xl font-black text-[#0F172A] uppercase font-display">
                  Request Commercial Pricing & Mail Draft
                </h3>
              </div>
            </div>

            {/* Spec Summary Card */}
            {(quote && config) ? (
              <div className="bg-[#FFFFFF] p-4 border border-[#E2DDD2] mb-6 text-xs font-mono text-[#475569] rounded-xl shadow-xs">
                <div className="text-[9px] uppercase tracking-widest text-[#0077ED] mb-1.5 font-bold">[ ATTACHED ENGINEERING SPEC ]</div>
                <div className="grid grid-cols-2 gap-2 text-[#334155] text-[11px]">
                  <div>• Opening: <strong className="text-[#0F172A]">{config.width} x {config.height} mm</strong></div>
                  <div>• Grade: <strong className="text-[#0077ED]">{currentGrade?.shortName}</strong></div>
                  <div>• Strip Size: <strong className="text-[#0F172A]">{config.stripWidth} x {config.stripThickness} mm</strong></div>
                  <div>• Overlap: <strong className="text-[#0F172A]">{config.overlap}% ({quote.stripCount} Strips)</strong></div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-[#E2DDD2] flex justify-between items-center text-[#0077ED] font-bold text-xs">
                  <span className="text-[#475569] uppercase">Estimated Budget Reference:</span>
                  <span className="text-sm font-mono">${(quote.estimatedPriceUsd * doorwayCount).toFixed(0)} USD</span>
                </div>
              </div>
            ) : productNames && productNames.length > 0 ? (
              <div className="bg-[#FFFFFF] p-4 border border-[#E2DDD2] mb-6 text-xs font-mono text-[#475569] rounded-xl shadow-xs">
                <div className="text-[9px] uppercase tracking-widest text-[#0077ED] mb-1.5 font-bold">[ SELECTED PRODUCT(S) ]</div>
                <div className="text-sm font-bold text-[#0F172A]">{productNames.join(' • ')}</div>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#475569] mb-1">Your Full Name *</label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    required
                    placeholder="e.g. David Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D8D2C5] px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0077ED] font-mono rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#475569] mb-1">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="david@logistics.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D8D2C5] px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0077ED] font-mono rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#475569] mb-1">Company / Facility *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Cold Chain Hub"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D8D2C5] px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0077ED] font-mono rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#475569] mb-1">Number of Doors / Quantity</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={doorwayCount}
                    onChange={(e) => setDoorwayCount(Number(e.target.value))}
                    className="w-full bg-[#FFFFFF] border border-[#D8D2C5] px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0077ED] font-mono rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#475569] mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="+91 93776 78155 / +1 (555) 234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D8D2C5] px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0077ED] font-mono rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#475569] mb-1">Special Project Requirements / Delivery Notes</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Need stainless steel 304 brackets, express dispatch required for Mumbai / Dubai port..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D8D2C5] px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0077ED] font-mono rounded-lg"
                  />
                </div>
              </div>

              {/* Honeypot Trap Field */}
              <input {...honeypotInputProps} />

              {/* Bot Error Message */}
              {botError && (
                <div className="mt-3 p-2.5 bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-600 rounded-lg">
                  ⚠ {botError}
                </div>
              )}

              <div className="pt-4 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-[#0077ED] text-white hover:bg-[#2B8EFF] font-bold text-xs uppercase tracking-widest transition-all font-mono cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0077ED] rounded-xl shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send & Draft Direct Email</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrintQuote}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-[#FFFFFF] hover:bg-[#F4EFE6] text-[#0F172A] text-xs font-mono font-medium border border-[#E2DDD2] transition-all uppercase cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#0077ED] rounded-xl"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Spec</span>
                  </button>
                </div>

                <AntiBotProtectionBadge />
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto rounded-full">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#0F172A] uppercase font-display">Email Draft & Quote Prepared!</h3>
              <p className="text-xs text-[#475569] max-w-md mx-auto leading-relaxed mt-1 font-sans">
                Your quotation draft with all selected products and technical specs has been prepared for <strong className="text-[#0F172A] font-mono">{email || 'your email'}</strong>.
              </p>
            </div>

            {/* Direct Quick Action Dispatch Links */}
            <div className="bg-[#FFFFFF] p-4 border border-[#E2DDD2] rounded-xl space-y-2.5 max-w-md mx-auto">
              <a
                href={generateMailtoUrl()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0077ED] hover:bg-[#2B8EFF] text-white text-xs font-mono font-bold uppercase rounded-lg shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open in Email App (Gmail / Outlook)</span>
              </a>

              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-bold uppercase rounded-lg shadow-sm transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Send via WhatsApp (+91 93776 78155)</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="py-2 px-6 bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#475569] hover:text-[#0F172A] text-xs font-mono font-bold uppercase border border-[#E2DDD2] transition-all cursor-pointer rounded-lg"
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

