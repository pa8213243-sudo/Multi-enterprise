import React, { useState, useEffect, useRef } from 'react';
import { MultiLogo, MultiLogoIcon } from './MultiLogo';
import { PVCGrade } from '../types';
import { PVC_GRADES } from '../data/products';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  X, 
  Package, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  MessageSquare 
} from 'lucide-react';

import { useAntiBotFormProtection, AntiBotProtectionBadge } from '../utils/antiBotSecurity';

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
  const { language } = useLanguage();
  const { honeypotInputProps, validateSubmission } = useAntiBotFormProtection();
  const [selectedGrades, setSelectedGrades] = useState<string[]>([defaultGrade, 'polar-freezer', 'double-ribbed']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [botError, setBotError] = useState<string | null>(null);

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
    setSelectedGrades(prev => 
      prev.includes(gradeId)
        ? prev.length > 1 ? prev.filter(g => g !== gradeId) : prev
        : [...prev, gradeId]
    );
  };

  const getGradeNames = () => {
    return selectedGrades.map(g => PVC_GRADES[g as PVCGrade]?.name || g).join(', ');
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Free Swatch Sample Kit Request - ${company || name || 'Customer Inquiry'}`);
    const bodyLines = [
      `Dear Multi Enterprise Sample Dispatch Desk,`,
      ``,
      `Please dispatch a complimentary evaluation swatch kit with the following details:`,
      ``,
      `--- CLIENT DETAILS ---`,
      `• Full Name: ${name || 'N/A'}`,
      `• Company / Facility: ${company || 'N/A'}`,
      `• Work Email: ${email || 'N/A'}`,
      `• Phone / WhatsApp: ${phone || 'N/A'}`,
      `• City & Country: ${country || 'N/A'}`,
      ``,
      `--- REQUESTED SWATCHES (${selectedGrades.length} Grades) ---`,
      `• Selected Formulations: ${getGradeNames()}`,
      ``,
      `--- SPECIAL NOTES / APPLICATION ---`,
      notes ? notes : 'Complimentary polymer sample kit requested for facility evaluation.',
      ``,
      `Kindly dispatch via courier and email the tracking number.`,
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
      `*MULTI ENTERPRISE - SAMPLE SWATCH REQUEST*`,
      `• *Client:* ${name || 'Customer'} (${company || 'Direct'})`,
      `• *Phone:* ${phone || 'N/A'}`,
      `• *Email:* ${email || 'N/A'}`,
      `• *Location:* ${country || 'N/A'}`,
      `• *Swatches:* ${getGradeNames()}`,
      notes ? `• *Notes:* ${notes}` : ``,
      `Please dispatch material sample kit.`
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

    try {
      window.open(generateMailtoUrl(), '_blank');
    } catch {
      // Fallback
    }

    setIsSubmitted(true);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E2DDD2] p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto rounded-2xl"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close Sample Request Modal"
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
                  {language === 'hi' ? '[ मल्टी एंटरप्राइज • मानार्थ मूल्यांकन किट ]' : '[ MULTI ENTERPRISE • COMPLIMENTARY EVALUATION KIT ]'}
                </span>
                <h3 id="sample-modal-title" className="text-xl sm:text-2xl font-black text-[#0F172A] uppercase font-display">
                  {language === 'hi' ? 'मुफ्त पीवीसी सैंपल किट का अनुरोध करें' : 'Request Physical PVC Swatch Kit'}
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#475569] mb-6 font-light leading-relaxed">
              {language === 'hi'
                ? 'हम 24 घंटे के भीतर एक्सप्रेस कूरियर द्वारा भौतिक सामग्री नमूना किट भेजते हैं। इसमें पॉलिमर स्वैच, रासायनिक प्रतिरोध गाइड और स्टेनलेस स्टील 304 ट्रैक नमूना शामिल है।'
                : 'We dispatch physical material sample kits worldwide via express courier within 24 hours. Includes tactile polymer swatches, chemical resistance guides, and a mini Stainless Steel 304 hook-on track sample.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select Swatches to Include */}
              <div>
                <label className="block text-[10px] font-mono text-[#64748B] uppercase tracking-widest mb-2">
                  {language === 'hi' ? '[ किट में शामिल करने के लिए स्वैच चुनें ]:' : '[ SELECT SWATCHES TO INCLUDE IN KIT ]:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                  {Object.values(PVC_GRADES).filter((g, index, self) => index === self.findIndex(t => t.id === g.id)).map((g) => {
                    const isChecked = selectedGrades.includes(g.id);
                    return (
                      <button
                        type="button"
                        key={g.id}
                        onClick={() => toggleGrade(g.id)}
                        className={`p-2 text-left border transition-all flex items-center justify-between font-mono cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#0077ED] rounded-lg ${
                          isChecked
                            ? 'bg-[#0077ED] text-white border-[#0077ED]'
                            : 'bg-[#FFFFFF] border-[#E2DDD2] text-[#475569] hover:text-[#0077ED] hover:border-[#B8AF9F]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: g.colorHex }}
                          />
                          <span className="text-[11px] font-bold uppercase">{g.shortName}</span>
                        </div>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#475569] mb-1">
                    {language === 'hi' ? 'आपका पूरा नाम *' : 'Your Full Name *'}
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D8D2C5] px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0077ED] font-mono rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#475569] mb-1">
                    {language === 'hi' ? 'ईमेल पता *' : 'Work Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D8D2C5] px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0077ED] font-mono rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#475569] mb-1">
                    {language === 'hi' ? 'कंपनी / सुविधा का नाम *' : 'Company / Facility Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Cold Logistics"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D8D2C5] px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0077ED] font-mono rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#475569] mb-1">
                    {language === 'hi' ? 'शहर और स्थान *' : 'Country & City *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai, India / Rotterdam"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D8D2C5] px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0077ED] font-mono rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#475569] mb-1">
                    {language === 'hi' ? 'फ़ोन / व्हाट्सएप नंबर (कूरियर संपर्क)' : 'Phone / WhatsApp (For Courier Dispatch)'}
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 93776 78155 / +1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#0077ED] text-white hover:bg-[#2B8EFF] font-bold text-xs uppercase tracking-widest transition-all font-mono cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0077ED] rounded-xl shadow-md"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'मुफ्त सैंपल किट भेजें (24 घंटे एक्सप्रेस)' : 'Dispatch Free Swatch Kit (24h Express)'}</span>
                </button>

                <AntiBotProtectionBadge />
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-[#64748B] pt-1">
                <span>{language === 'hi' ? '✓ 100% मुफ्त शिपिंग' : '✓ 100% Free Shipping'}</span>
                <span>•</span>
                <span>{language === 'hi' ? '✓ टीडीएस प्रयोगशाला शीट शामिल' : '✓ Includes TDS Laboratory Sheets'}</span>
                <span>•</span>
                <span>{language === 'hi' ? '✓ शून्य बाध्यता' : '✓ Zero Obligation'}</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto rounded-full">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#0F172A] uppercase font-display">
              {language === 'hi' ? 'नमूना अनुरोध पंजीकृत!' : 'Sample Request Confirmed!'}
            </h3>
            <p className="text-xs text-[#475569] max-w-md mx-auto leading-relaxed font-light">
              {language === 'hi' ? (
                <>धन्यवाद, <strong className="text-[#0F172A]">{name}</strong>। आपकी मल्टी एंटरप्राइज नमूना किट जिसमें <strong className="text-[#0077ED] font-mono">{selectedGrades.length} सामग्री ग्रेड</strong> शामिल हैं, <strong className="text-[#0F172A]">{company}</strong> के लिए तैयार की जा रही है।</>
              ) : (
                <>Thank you, <strong className="text-[#0F172A]">{name}</strong>. Your Multi Enterprise industrial sample kit containing <strong className="text-[#0077ED] font-mono">{selectedGrades.length} material grades</strong> is queued for preparation and dispatch to <strong className="text-[#0F172A]">{company}</strong>.</>
              )}
            </p>

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

            <div className="pt-4">
              <button
                onClick={onClose}
                className="py-2.5 px-6 bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#475569] hover:text-[#0F172A] text-xs font-mono font-bold uppercase border border-[#E2DDD2] transition-all cursor-pointer rounded-lg"
              >
                {language === 'hi' ? 'बंद करें' : 'Close & Return'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
