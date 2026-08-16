import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Building2, 
  Navigation, 
  Clock, 
  MessageSquare, 
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Globe,
  Home,
  Check
} from 'lucide-react';
import { MultiLogo, MultiLogoIcon } from './MultiLogo';
import { ThreeMapLocationScene, GOOGLE_MAPS_DIRECT_URL } from './ThreeMapLocationScene';
import { useLanguage } from '../i18n/LanguageContext';
import { FocusedSectionId } from './FocusedSectionView';

interface ContactSectionProps {
  onNavigateSection?: (sectionId: FocusedSectionId) => void;
  onOpenSampleModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onNavigateSection,
  onOpenSampleModal
}) => {
  const { language } = useLanguage();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Map Mode Toggle: '3d' or 'google'
  const [mapViewMode, setMapViewMode] = useState<'3d' | 'google'>('3d');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    // Simulate submission and construct WhatsApp / mailto message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Construct instant WhatsApp prefilled link for user convenience
      const text = encodeURIComponent(
        `*New Inquiry from Website*\n` +
        `*Name:* ${fullName}\n` +
        `*Email:* ${email || 'N/A'}\n` +
        `*Phone:* ${phone}\n` +
        `*Subject:* ${subject || 'PVC Strip Curtain Inquiry'}\n` +
        `*Message:* ${message || 'Please send product catalogue & quotation.'}`
      );
      
      // WhatsApp Direct Link to (+91 9377678155)
      const waUrl = `https://wa.me/919377678155?text=${text}`;
      window.open(waUrl, '_blank');
    }, 600);
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="w-full bg-[#08090C] text-[#E0E0E0] min-h-screen">
      {/* ========================================================================= */}
      {/* 1. TOP HERO BANNER (Matches Cyan/Industrial Header in Reference Image)     */}
      {/* ========================================================================= */}
      <div className="relative bg-gradient-to-r from-[#0099bb] via-[#00a8cc] to-[#00b4d8] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 text-center text-white shadow-xl overflow-hidden">
        {/* Subtle geometric background overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px'
          }} 
        />

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl sm:text-5xl font-black tracking-wider uppercase font-display drop-shadow-md mb-2">
            CONTACT
          </h1>

          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-white/90 font-mono">
            <button
              type="button"
              onClick={() => onNavigateSection && onNavigateSection('configurator')}
              className="hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-white font-bold underline decoration-2 underline-offset-4">
              Contact
            </span>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN SPLIT SECTION: CONTACT WITH US & FIND US (3D MAP + CARTOON GUIDE) */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: CONTACT WITH US FORM */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 bg-[#101216] border border-white/15 p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00a8cc] via-[#F27D26] to-[#00a8cc]" />

            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-display tracking-tight mb-2">
                CONTACT WITH US
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed font-sans">
                Got Questions? We've answers. Need suggestions? We've ideas. Get in touch with us now. We're happy to discuss your requirement and queries.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#161a22] border border-emerald-500/40 p-6 rounded-xl text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white font-mono">
                  Thank You, {fullName}!
                </h3>
                <p className="text-xs text-white/70">
                  Your message has been dispatched to Multi Enterprise executive team. We have also opened WhatsApp to connect you directly.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-5 py-2 bg-[#00a8cc] hover:bg-[#0092b3] text-white text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Your Full Name Please
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Full Name Please *"
                    className="w-full bg-[#181B22] border border-white/20 focus:border-[#00a8cc] focus:ring-1 focus:ring-[#00a8cc] rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 transition-colors font-sans"
                  />
                </div>

                {/* Email Id */}
                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Your EmailId
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your EmailId"
                    className="w-full bg-[#181B22] border border-white/20 focus:border-[#00a8cc] focus:ring-1 focus:ring-[#00a8cc] rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 transition-colors font-sans"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="contact-phone" className="sr-only">
                    Your phone number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number *"
                    className="w-full bg-[#181B22] border border-white/20 focus:border-[#00a8cc] focus:ring-1 focus:ring-[#00a8cc] rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 transition-colors font-sans"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="sr-only">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject (e.g. PVC Curtain Quote, Cold Storage Strip)"
                    className="w-full bg-[#181B22] border border-white/20 focus:border-[#00a8cc] focus:ring-1 focus:ring-[#00a8cc] rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 transition-colors font-sans"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="sr-only">
                    Write your Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your Message (dimensions, grade preference, facility location)"
                    className="w-full bg-[#181B22] border border-white/20 focus:border-[#00a8cc] focus:ring-1 focus:ring-[#00a8cc] rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 transition-colors font-sans resize-y min-h-[100px]"
                  />
                </div>

                {/* Submit CTA Button (Matching Reference Image Style) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-[#00a8cc] hover:bg-[#0092b3] active:scale-[0.99] text-white font-mono font-bold text-sm tracking-wider uppercase rounded-lg shadow-lg hover:shadow-[#00a8cc]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* RIGHT COLUMN: FIND US (3D INTERACTIVE MAP + 3D CARTOON GUIDE & GOOGLE MAPS) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-display tracking-tight">
                  FIND US
                </h2>
                <p className="text-xs text-white/60 font-mono">
                  Madhuram Complex • Subhash Bridge • Ahmedabad
                </p>
              </div>

              {/* View Switcher: 3D Map vs Google Map Embed */}
              <div className="flex items-center bg-[#14161C] border border-white/15 rounded-lg p-1 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setMapViewMode('3d')}
                  className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    mapViewMode === '3d'
                      ? 'bg-[#F27D26] text-white shadow-md'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>3D Map & Guide</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapViewMode('google')}
                  className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    mapViewMode === 'google'
                      ? 'bg-[#00a8cc] text-white shadow-md'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Satellite</span>
                </button>
              </div>
            </div>

            {/* Stage Container */}
            <div className="w-full">
              {mapViewMode === '3d' ? (
                <ThreeMapLocationScene className="w-full h-[400px] sm:h-[480px]" />
              ) : (
                <div className="relative w-full h-[400px] sm:h-[480px] bg-[#111317] border border-white/15 rounded-xl overflow-hidden shadow-2xl">
                  {/* Embedded Google Map Frame */}
                  <iframe
                    title="Multi Enterprise Google Map Location"
                    src="https://maps.google.com/maps?q=Madhuram%20Complex%2C%20Keshav%20Nagar%2C%20Ahmedabad&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale-[20%] contrast-[110%]"
                  />

                  {/* Top Bar Floating Direct Access Action */}
                  <div className="absolute top-3 left-3 right-3 bg-black/90 backdrop-blur-md p-3 rounded-xl border border-white/20 flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-bold text-white font-mono">
                        Madhuram Complex, Keshav Nagar
                      </span>
                    </div>

                    <a
                      href={GOOGLE_MAPS_DIRECT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1 bg-[#00a8cc] hover:bg-[#0092b3] text-white text-[11px] font-mono font-bold rounded-md shadow-md transition-colors"
                    >
                      <span>Direct Map Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Quick GPS Location Bar */}
            <div className="bg-[#121419] border border-white/10 p-3.5 rounded-xl flex items-center justify-between text-xs font-mono">
              <span className="text-white/60">
                GPS: 23.0560° N, 72.5804° E (Near RTO Circle)
              </span>
              <a
                href={GOOGLE_MAPS_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00a8cc] hover:underline font-bold flex items-center gap-1"
              >
                <span>Navigate on Phone</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 3. THREE INFO CARDS: ADDRESS, EMAIL, PHONE (MATCHING REFERENCE IMAGE)     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {/* Card 1: Address */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-[#111317] border border-white/15 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center group hover:border-[#00a8cc] transition-all"
          >
            <div className="w-14 h-14 rounded-full bg-[#00a8cc]/10 border border-[#00a8cc]/30 flex items-center justify-center text-[#00a8cc] mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-2">
              OUR LOCATION
            </h3>
            <p className="text-xs text-white/70 font-sans leading-relaxed">
              FF-5, Madhuram Complex, Keshav Nagar, Near R.T.O. Circle, Subhash Bridge, Ahmedabad - 380 027, Gujarat, India.
            </p>
            <a
              href={GOOGLE_MAPS_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs font-mono text-[#00a8cc] hover:underline font-bold flex items-center gap-1"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>

          {/* Card 2: Email */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-[#111317] border border-white/15 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center group hover:border-[#00a8cc] transition-all"
          >
            <div className="w-14 h-14 rounded-full bg-[#00a8cc]/10 border border-[#00a8cc]/30 flex items-center justify-center text-[#00a8cc] mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-2">
              EMAIL DIRECTORY
            </h3>
            <div className="space-y-1 text-xs text-white/80 font-mono">
              <div>
                <a href="mailto:multimehta@gmail.com" className="hover:text-[#00a8cc] transition-colors">
                  multimehta@gmail.com
                </a>
              </div>
              <div>
                <a href="mailto:mehtapolyfab@gmail.com" className="hover:text-[#00a8cc] transition-colors">
                  mehtapolyfab@gmail.com
                </a>
              </div>
              <div>
                <a href="mailto:info@multipvcstrip.com" className="hover:text-[#00a8cc] transition-colors">
                  info@multipvcstrip.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Phone */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-[#111317] border border-white/15 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center group hover:border-[#00a8cc] transition-all"
          >
            <div className="w-14 h-14 rounded-full bg-[#00a8cc]/10 border border-[#00a8cc]/30 flex items-center justify-center text-[#00a8cc] mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-2">
              CALL EXPERTS
            </h3>
            <div className="space-y-1.5 text-xs font-mono">
              <div>
                <a href="tel:+919377678155" className="text-white font-bold hover:text-[#00a8cc] transition-colors">
                  (+91) 93776 78155
                </a>
              </div>
              <div>
                <a href="tel:+919327000042" className="text-white/80 hover:text-[#00a8cc] transition-colors">
                  (+91) 93270 00042
                </a>
              </div>
              <div className="text-[11px] text-white/40 pt-1">
                Mon - Sat: 9:00 AM - 7:30 PM IST
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 4. REFERENCE THREE-COLUMN FOOTER BLOCK (MATCHING SCREENSHOT BOTTOM AREA)   */}
        {/* ========================================================================= */}
        <div className="mt-20 pt-16 border-t border-white/15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Column 1: CONTACT INFORMATION */}
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-black text-white uppercase font-display tracking-tight">
                CONTACT INFORMATION
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                FF-5, Madhuram Complex, Keshav Nagar,<br />
                Near R.T.O. Circle, Subhash Bridge,<br />
                Ahmedabad - 380 027.
              </p>
              <div className="space-y-1.5 text-xs font-mono text-white/80">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#00a8cc]" />
                  <span>+91 9377 678 155</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#00a8cc]" />
                  <span>+91 9327 000 042</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#00a8cc]" />
                  <span>multimehta@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#00a8cc]" />
                  <span>mehtapolyfab@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#00a8cc]" />
                  <span>info@multipvcstrip.com</span>
                </div>
              </div>
            </div>

            {/* Column 2: QUICK LINKS */}
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-black text-white uppercase font-display tracking-tight">
                QUICK LINKS
              </h4>
              <ul className="space-y-2 text-xs font-mono text-white/70">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection && onNavigateSection('configurator')}
                    className="hover:text-[#00a8cc] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#00a8cc]" />
                    <span>Home</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection && onNavigateSection('about')}
                    className="hover:text-[#00a8cc] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#00a8cc]" />
                    <span>About Us</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection && onNavigateSection('products')}
                    className="hover:text-[#00a8cc] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#00a8cc]" />
                    <span>PVC Strip Curtain</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection && onNavigateSection('all-products')}
                    className="hover:text-[#00a8cc] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#00a8cc]" />
                    <span>All Products</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection && onNavigateSection('happy-clients')}
                    className="hover:text-[#00a8cc] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#00a8cc]" />
                    <span>Projects & Clients</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenSampleModal && onOpenSampleModal()}
                    className="hover:text-[#00a8cc] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#00a8cc]" />
                    <span>Download Catalogue & Sample Box</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: SO WHAT YOU THINK ? */}
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-black text-white uppercase font-display tracking-tight">
                SO WHAT YOU THINK ?
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Ready to transform your workspace with our best solutions? Let's talk now!
              </p>
              <div className="pt-2">
                <a
                  href="#contact-name"
                  onClick={() => {
                    document.getElementById('contact-name')?.focus();
                  }}
                  className="inline-block px-6 py-2.5 bg-white text-[#00a8cc] hover:bg-white/90 font-mono font-bold text-xs uppercase tracking-wider rounded-lg shadow-xl transition-all cursor-pointer"
                >
                  CONTACT US
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
