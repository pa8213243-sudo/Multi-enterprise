import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Sparkles, 
  PhoneCall, 
  MessageSquare, 
  Check, 
  ArrowRight, 
  Sliders, 
  Package, 
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Zap,
  ShieldCheck,
  Building2,
  ThermometerSnowflake,
  RotateCcw
} from 'lucide-react';
import { MultiLogoIcon } from './MultiLogo';
import { useLanguage } from '../i18n/LanguageContext';
import { PVC_GRADES, HARDWARE_SYSTEMS } from '../data/products';
import { PVCGrade } from '../types';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    actionType: 'configurator' | 'sample' | 'whatsapp' | 'call' | 'catalog' | 'section';
    targetGrade?: PVCGrade;
    sectionId?: string;
  }[];
}

interface MultiAIChatbotProps {
  onOpenConfigurator?: () => void;
  onOpenSampleModal?: (grade?: PVCGrade) => void;
  onNavigateToSection?: (sectionId: any) => void;
  onOpenQuoteModal?: () => void;
}

const AI_ADVISOR_AVATAR = '/images/anime_ai_avatar.jpg';

export const MultiAIChatbot: React.FC<MultiAIChatbotProps> = ({
  onOpenConfigurator,
  onOpenSampleModal,
  onNavigateToSection,
  onOpenQuoteModal
}) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultGreeting: Message = {
    id: 'msg-welcome',
    sender: 'bot',
    text: language === 'hi' 
      ? 'नमस्ते! मैं Multi Enterprise का AI Technical Advisor हूँ। 🏭\n\nहमारे पास **12 प्रकार के PVC स्ट्रिप कर्टेन्स**, SS304 हार्डवेयर, कोल्ड स्टोरेज समाधान और 5,000+ प्रोजेक्ट्स का अनुभव है।\n\nआप मुझसे किसी भी ग्रेड, साइज़, टेम्परेचर (-40°C), कीमत या फ्री सैंपल के बारे में पूछ सकते हैं!'
      : 'Hello! I am Multi Enterprise\'s AI Technical Advisor. 🏭\n\nWe manufacture **12 Industrial PVC Strip Curtain Grades**, SS304 hardware rails, cold chain barriers (-40°C), and 30+ facility systems since 1998.\n\nHow can I assist your facility or project today?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    actions: [
      { label: '🎨 12 PVC Grades', actionType: 'section', sectionId: 'products' },
      { label: '📐 3D Configurator', actionType: 'configurator' },
      { label: '📦 Free Sample Kit', actionType: 'sample' },
      { label: '💬 WhatsApp Sales', actionType: 'whatsapp' }
    ]
  };

  const [messages, setMessages] = useState<Message[]>([defaultGreeting]);

  // Quick suggestion questions
  const quickPrompts = [
    {
      en: '❄️ Best PVC for Cold Storage / Freezers?',
      hi: '❄️ कोल्ड स्टोरेज / फ्रीजर के लिए कौन सा PVC बेस्ट है?'
    },
    {
      en: '🏭 Forklift & Heavy Pallet Traffic Grade?',
      hi: '🏭 फोर्कलिफ्ट व भारी ट्रैफिक के लिए कौन सा ग्रेड चाहिए?'
    },
    {
      en: '🎨 List all 12 PVC Grades with Specs',
      hi: '🎨 सभी 12 PVC ग्रेड्स की सूची व डिटेल्स दिखाएं'
    },
    {
      en: '🦟 Anti-Insect Yellow / Amber PVC',
      hi: '🦟 कीड़े-मकोड़ों से बचाव के लिए पीला / एम्बर PVC'
    },
    {
      en: '📐 How to calculate strip count & size?',
      hi: '📐 दरवाजे के साइज से स्ट्रिप काउंट कैसे निकालें?'
    },
    {
      en: '📦 How to get Free Physical Swatch Kit?',
      hi: '📦 फ्री फिजिकल सैंपल किट कैसे मिलेगी?'
    },
    {
      en: '⚡ Dispatch time & Delivery to my city',
      hi: '⚡ माल कितने समय में डिस्पैच और डिलीवर होगा?'
    },
    {
      en: '🏢 Past Clients & 27+ Years Experience',
      hi: '🏢 आपके क्लाइंट्स और 27 साल का अनुभव'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages]);

  const handleActionClick = (action: NonNullable<Message['actions']>[number]) => {
    if (action.actionType === 'configurator') {
      if (onOpenConfigurator) onOpenConfigurator();
      else if (onNavigateToSection) onNavigateToSection('configurator');
    } else if (action.actionType === 'sample') {
      if (onOpenSampleModal) onOpenSampleModal(action.targetGrade || 'transparent');
    } else if (action.actionType === 'section' && action.sectionId) {
      if (onNavigateToSection) onNavigateToSection(action.sectionId);
    } else if (action.actionType === 'whatsapp') {
      window.open(
        'https://wa.me/919377678155?text=Hello%20Multi%20Enterprise,%20I%20need%20a%20technical%20quote%20and%20advice%20for%20PVC%20strip%20curtains.',
        '_blank'
      );
    } else if (action.actionType === 'call') {
      window.open('tel:+919377678155', '_self');
    }
  };

  const generateAIResponse = (userQuery: string): { text: string; actions?: Message['actions'] } => {
    const q = userQuery.toLowerCase().trim();

    // 1. Cold Storage / Freezers / Polar / Sub-Zero
    if (q.includes('cold') || q.includes('freezer') || q.includes('polar') || q.includes('sub-zero') || q.includes('ice') || q.includes('fridge') || q.includes('chiller') || q.includes('कोल्ड') || q.includes('फ्रीजर')) {
      return {
        text: language === 'hi'
          ? `❄️ **कोल्ड स्टोरेज व डीप फ्रीजर्स के लिए समाधान:**\n\n1. **Sky Blue Polar Grade (-40°C to +25°C):** यह स्पेशल प्लास्टिसाइज़र फॉर्मूलेशन है जो -40°C तापमान में भी लचीला (flexible) रहता है और बिल्कुल नहीं चटकता (no cracking).\n2. **फायदे:** रूम का तापमान बनाए रखता है, कंप्रेसर की बिजली की खपत में 84% तक बचत करता है, और इवैपोरेटर कॉइल्स पर बर्फ जमने से रोकता है।\n3. **हार्डवेयर:** इसके साथ **Grade 304 Stainless Steel Hook-on Track** की सलाह दी जाती है ताकि जंग (rust) न लगे।`
          : `❄️ **Cold Storage & Sub-Zero Solutions:**\n\n1. **Sky Blue Polar Grade (-40°C to +25°C):** Formulated with premium low-temp plasticizers that stay flexible down to -40°C without cracking.\n2. **Energy Efficiency:** Reduces HVAC/refrigeration thermal loss by up to 84%, preventing moist ambient air from frosting evaporator coils.\n3. **Recommended Suspension:** AISI 304 Stainless Steel Hook-On Rail for zero-rust hygiene in food and pharma cold chains.`,
        actions: [
          { label: '❄️ Configure Sky Blue (-40°C)', actionType: 'configurator' },
          { label: '📦 Request Polar Swatch Kit', actionType: 'sample', targetGrade: 'sky-blue' },
          { label: '💬 WhatsApp Cold Room Quote', actionType: 'whatsapp' }
        ]
      };
    }

    // 2. Forklift / Heavy Pallet / Ribbed / Scratching
    if (q.includes('forklift') || q.includes('pallet') || q.includes('scratch') || q.includes('ribbed') || q.includes('heavy') || q.includes('truck') || q.includes('फोर्कलिफ्ट') || q.includes('रिब्ड') || q.includes('ट्रैफिक')) {
      return {
        text: language === 'hi'
          ? `🏭 **फोर्कलिफ्ट व हैवी व्हीकल ट्रैफिक के लिए:**\n\n1. **Standard Ribbed Grade:** दोनों तरफ उभरी हुई पट्टियाँ (raised shock-absorbing ribs) होती हैं जो फोर्कलिफ्ट के पैलेट्स और क्रेट्स की रगड़ को झेल लेती हैं।\n2. **फायदा:** मुख्य पारदर्शी हिस्सा घिसने और खरोंचों से बचा रहता है, जिससे सालों-साल ड्राइवर को साफ दिखाई देता है।\n3. **सुरक्षा टिप:** दोनों किनारों पर 1-2 **Multi Red Warning Strips** लगाने से ड्राइवर को दरवाजे की चौड़ाई का स्पष्ट अंदाजा रहता है।`
          : `🏭 **Heavy Forklift & Motorized Traffic Solutions:**\n\n1. **Standard Ribbed PVC:** Features dual-sided raised bumper ribs that absorb friction from pallets, crates, and forklifts.\n2. **Optics Longevity:** Prevents scratching on the flat clear view corridor, maintaining driver visibility for years.\n3. **Safety Best Practice:** Install 1-2 **Multi Red Warning Edge Strips** on door jambs to define clear width boundaries.`,
        actions: [
          { label: '🚜 Configure Standard Ribbed', actionType: 'configurator' },
          { label: '📦 Request Ribbed Sample', actionType: 'sample', targetGrade: 'standard-ribbed' },
          { label: '💬 WhatsApp Technical Sales', actionType: 'whatsapp' }
        ]
      };
    }

    // 3. 12 PVC Grades List / Colors / Varieties
    if (q.includes('12') || q.includes('grade') || q.includes('color') || q.includes('list') || q.includes('all') || q.includes('type') || q.includes('ग्रेड') || q.includes('रंग') || q.includes('सूची') || q.includes('वैरायटी')) {
      return {
        text: language === 'hi'
          ? `🎨 **Multi Enterprise के सभी 12 PVC स्ट्रिप ग्रेड्स:**\n\n1. **Transparent** - 100% क्रिस्टल क्लियर वर्जिन पॉलीमर\n2. **Blue Natural** - नेचुरल ब्लू टिंट इंडस्ट्रियल क्लियर\n3. **Standard Ribbed** - फोर्कलिफ्ट एंटी-स्क्रैच रिब्ड\n4. **Gray** - प्राइवेसी व वर्कशॉप पार्टीशन\n5. **Navy Blue** - डार्क नेवी ब्लू ज़ोनिंग मार्कर\n6. **White Opaque** - डेयरी, मिल्क व क्लीनरूम 100% अपारदर्शी\n7. **Multi Red** - डेंजर ज़ोन व एज वॉर्निंग रेड\n8. **Orange Amber** - एंटी-इन्सेक्ट / मच्छर निवारक\n9. **Sky Blue** - पोलर सब-जीरो (-40°C) डीप फ्रीजर\n10. **Parrot Green** - ब्राइट ग्रीन डिपार्टमेंट सेपरेशन\n11. **Lemon Yellow** - हाई विजिबिलिटी UV व कीट फिल्टर\n12. **Multi Green** - डार्क ग्रीन वेल्डिंग आर्क स्क्रीन (UV शील्ड)\n\nमोटाई: 1.5mm, 2mm, 3mm, 4mm, 5mm | चौड़ाई: 100mm, 200mm, 300mm, 400mm`
          : `🎨 **Complete Lineup of 12 Factory PVC Strip Grades:**\n\n1. **Transparent** - High optical clarity virgin polymer\n2. **Blue Natural** - Classic natural pale blue tint\n3. **Standard Ribbed** - Heavy duty forklift scratch protection\n4. **Gray** - Opaque/translucent neutral gray privacy\n5. **Navy Blue** - Deep navy blue departmental isolation\n6. **White Opaque** - Pure white food & dairy hygienic barrier\n7. **Multi Red** - High-visibility safety warning edge\n8. **Orange Amber** - Anti-insect UV light wave filter\n9. **Sky Blue** - Polar sub-zero deep freeze (-40°C)\n10. **Parrot Green** - Vibrant facility boundary segregation\n11. **Lemon Yellow** - Insect filter & luminous entryway\n12. **Multi Green** - Dark green welding arc flash barrier\n\nThicknesses: 1.5mm to 5mm | Widths: 100mm to 400mm`,
        actions: [
          { label: '🎨 View 12 Grades Catalog', actionType: 'section', sectionId: 'products' },
          { label: '📦 Request Sample Kit of All 12', actionType: 'sample' },
          { label: '📐 Open 3D Configurator', actionType: 'configurator' }
        ]
      };
    }

    // 4. Anti-Insect / Mosquito / Food Safe / HACCP
    if (q.includes('insect') || q.includes('mosquito') || q.includes('fly') || q.includes('yellow') || q.includes('amber') || q.includes('food') || q.includes('haccp') || q.includes('मच्छर') || q.includes('कीट') || q.includes('पीला')) {
      return {
        text: language === 'hi'
          ? `🦟 **एंटी-इन्सेक्ट (कीट निवारक) PVC कर्टेन्स:**\n\n1. **Orange Amber & Lemon Yellow Grades:** यह विशेष पीले/एम्बर स्पेक्ट्रम में बने होते हैं जो कीड़े-मकोड़ों और मक्खियों को आकर्षित करने वाली लाइट तरंगों को ब्लॉक कर देते हैं।\n2. **HACCP व FSSAI कम्प्लायंट:** बेकरी, मिठाई निर्माण, बेवरेज बॉटलिंग, होटल किचन्स और फार्मास्युटिकल पैकेजिंग के लिए अनिवार्य।\n3. **हार्डवेयर:** 100% फूड-ग्रेड SS304 हुक ट्रैक के साथ इस्तेमाल होता है।`
          : `🦟 **Anti-Insect Yellow & Amber Solutions:**\n\n1. **Orange Amber & Lemon Yellow:** Filter out ultraviolet wavelengths that flying insects and pests perceive, effectively repelling them from open doors.\n2. **HACCP & Food Safety:** Ideal for bakeries, food processing, dairy, FMCG packaging, and commercial kitchens.\n3. **Suspension:** Hygienic Grade 304 Stainless Steel hook track allows tool-free washdowns.`,
        actions: [
          { label: '🦟 Configure Anti-Insect Amber', actionType: 'configurator' },
          { label: '📦 Request Food-Safe Swatches', actionType: 'sample', targetGrade: 'orange-amber' },
          { label: '💬 Chat on WhatsApp', actionType: 'whatsapp' }
        ]
      };
    }

    // 5. Welding / Sparks / Flame
    if (q.includes('weld') || q.includes('spark') || q.includes('fire') || q.includes('flame') || q.includes('वेल्डिंग') || q.includes('आर्क') || q.includes('आग')) {
      return {
        text: language === 'hi'
          ? `🔥 **वेल्डिंग सेफ्टी व स्पार्क कंटेनमेंट:**\n\n1. **Multi Green & Multi Red Welding Grades:** MIG, TIG और Arc वेल्डिंग से निकलने वाली खतरनाक UV/IR रेडिएशन और फ्लैश को 99% तक फिल्टर करते हैं।\n2. **फ्लेम रिटार्डेंट:** गर्म मेटल के स्पार्क्स लगने पर भी आग नहीं पकड़ता।\n3. **सुपरवाइजर विजिबिलिटी:** बाहर खड़े अधिकारी अंदर का काम सुरक्षित रूप से देख सकते हैं।`
          : `🔥 **Welding Safety & Spark Protection:**\n\n1. **Multi Green & Multi Red:** Filter harmful UV/IR radiation from MIG/TIG/Arc welding, preventing retinal flash burns.\n2. **Flame Retardant:** Formulated with self-extinguishing compounds to contain hot grinding sparks and abrasive debris.\n3. **Supervisory Oversight:** Allows personnel outside to safely monitor operations without extra eyewear.`,
        actions: [
          { label: '🛡️ Configure Multi Green', actionType: 'configurator' },
          { label: '📦 Request Welding Swatch', actionType: 'sample', targetGrade: 'multi-green' }
        ]
      };
    }

    // 6. Sizing, Calculation & Measurement Formula
    if (q.includes('size') || q.includes('calculate') || q.includes('formula') || q.includes('strip count') || q.includes('overlap') || q.includes('meter') || q.includes('नाप') || q.includes('साइज') || q.includes('गिनती') || q.includes('कैलकुलेट')) {
      return {
        text: language === 'hi'
          ? `📐 **दरवाजे के साइज से स्ट्रिप काउंट का फॉर्मूला:**\n\n1. **स्ट्रिप साइज चयन:**\n   - सामान्य इनडोर दरवाजे (ऊंचाई < 2.5m): **200mm चौड़ाई x 2mm मोटाई**\n   - फोर्कलिफ्ट / लोडिंग बे (ऊंचाई > 3m): **300mm चौड़ाई x 3mm मोटाई**\n   - बाहरी हवादार मुख्य द्वार: **400mm x 4mm रिब्ड**\n\n2. **ओवरलैप गाइड:**\n   - इनडोर पैदल ट्रैफिक: **50% ओवरलैप** (1 हुक चढ़ाव)\n   - बाहरी / कोल्ड स्टोरेज / हवादार द्वार: **67% से 100% ओवरलैप**\n\n3. **उदाहरण:** 2.4m चौड़े दरवाजे पर 200mm स्ट्रिप (50% ओवरलैप) लगाने पर लगभग **24 स्ट्रिप्स** लगती हैं।`
          : `📐 **Doorway Sizing & Strip Count Guide:**\n\n1. **Strip Dimension Standard:**\n   - Pedestrian (< 2.5m high): **200mm W x 2mm T**\n   - Forklift / Warehouses (2.5m - 4.5m): **300mm W x 3mm T**\n   - External High Winds (> 4.5m): **400mm W x 4mm T**\n\n2. **Overlap Recommendations:**\n   - Standard Internal: **50% Overlap**\n   - Cold Storage / Wind Barrier: **66% - 100% Full Overlap**\n\n3. **Formula:** Total Strips = ` + '`Ceil(Door Width / Effective Pitch) + 1`' + `\n\nTry our interactive 3D CAD Configurator for exact real-time math!`,
        actions: [
          { label: '📐 Launch 3D Configurator', actionType: 'configurator' },
          { label: '⚡ Calculate Thermal ROI', actionType: 'section', sectionId: 'roi-calculator' },
          { label: '💬 Send Door Dimensions on WhatsApp', actionType: 'whatsapp' }
        ]
      };
    }

    // 7. Price / Cost / Rate
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('quote') || q.includes('budget') || q.includes('कीमत') || q.includes('रेट') || q.includes('भाव') || q.includes('पैसा') || q.includes('खर्चा')) {
      return {
        text: language === 'hi'
          ? `💰 **प्राइसिंग व फैक्ट्री डायरेक्ट कोट्स:**\n\n1. **डायरेक्ट मैन्युफैक्चरर रेट्स:** हम सीधे फैक्ट्री से सप्लाई करते हैं, इसलिए आपको बिचौलियों के बिना सर्वोत्तम थोक दरें (wholesale rates) मिलती हैं।\n2. **मूल्य निर्धारण आधार:** स्ट्रिप मोटाई (2mm/3mm), ग्रेड (क्लियर, पोलर, रिब्ड आदि) और हार्डवेयर टाइप (SS304 या Galvanized) पर आधारित होता है।\n3. **इंस्टेंट कोट:** आप अपने दरवाजे की चौड़ाई और ऊंचाई बताकर 1 मिनट में आधिकारिक PDF / WhatsApp कोटेशन प्राप्त कर सकते हैं!`
          : `💰 **Factory Direct Pricing & Quotations:**\n\n1. **Manufacturer Direct:** Because Multi Enterprise is a prime extruder and hardware manufacturer, you receive competitive wholesale pricing with zero middlemen.\n2. **Cost Factors:** Material compound (Virgin Clear vs Polar vs Ribbed), thickness (2mm to 4mm), and mounting track (SS304 vs Galvanized Steel).\n3. **Instant Quotation:** Get an instant official quotation with itemized hardware and weight specs directly in our 3D Configurator or on WhatsApp!`,
        actions: [
          { label: '📄 Get Instant CAD Quote', actionType: 'configurator' },
          { label: '💬 WhatsApp Direct Quote', actionType: 'whatsapp' },
          { label: '📞 Call Technical Sales', actionType: 'call' }
        ]
      };
    }

    // 8. Clients, Experience, History (Est 1998, 5000+ Doorways)
    if (q.includes('client') || q.includes('experience') || q.includes('company') || q.includes('about') || q.includes('history') || q.includes('क्लाइंट') || q.includes('कंपनी') || q.includes('अनुभव') || q.includes('कस्टमर')) {
      return {
        text: language === 'hi'
          ? `🏢 **Multi Enterprise का परिचय व उपलब्धियां:**\n\n• **27+ वर्षों का गौरवशाली इतिहास:** 1998 से औद्योगिक बैरियर निर्माण में अग्रणी।\n• **5,000+ दरवाजे सफलतापूर्वक स्थापित:** भारत के सभी राज्यों और अंतरराष्ट्रीय स्तर पर।\n• **प्रमुख क्लाइंट्स:** Sun Pharma, Cipla, Dr. Reddy's, Amul, Mother Dairy, Tata Motors, Reliance Industries, Flipkart Logistics, Amazon Fulfillment Hubs, Mahindra, आदि।\n• **सर्टिफिकेशन्स:** 100% वर्जिन पॉलीमर, ASTM D638, DIN 53387, DOP/DEHP फ्री कम्प्लायंस।`
          : `🏢 **Multi Enterprise Heritage & Track Record:**\n\n• **27+ Years Heritage:** Founded in 1998 in Ahmedabad, Gujarat as a premier industrial barrier manufacturer.\n• **5,000+ Doorways Commissioned:** Across pharmaceutical plants, food factories, cold storages, and automotive hubs.\n• **Trusted By Industry Giants:** Sun Pharma, Cipla, Dr. Reddy's, Amul, Mother Dairy, Tata Motors, Reliance Industries, Flipkart Logistics, Mahindra & Mahindra.\n• **Quality Assured:** 100% virgin resin, DOP/DEHP-free, ASTM D638 & DIN 53387 certified.`,
        actions: [
          { label: '⭐ View Happy Clients & Case Studies', actionType: 'section', sectionId: 'happy-clients' },
          { label: '📸 View 19+ Real Project Photos', actionType: 'section', sectionId: 'real-photos' },
          { label: '🏆 Quality Certifications', actionType: 'section', sectionId: 'quality' }
        ]
      };
    }

    // 9. Dispatch, Delivery, Shipping, Samples
    if (q.includes('dispatch') || q.includes('delivery') || q.includes('sample') || q.includes('swatch') || q.includes('ship') || q.includes('courier') || q.includes('डिलिवरी') || q.includes('डिस्पैच') || q.includes('सैंपल') || q.includes('पार्सल')) {
      return {
        text: language === 'hi'
          ? `📦 **डिस्पैच, डिलीवरी व फ्री सैंपल किट:**\n\n1. **24-48 घंटे में फास्ट डिस्पैच:** अहमदाबाद हेडक्वार्टर से रेडी स्टॉक 24 से 48 घंटे में ट्रांसपोर्ट या एक्सप्रेस कूरियर से रवाना किया जाता है।\n2. **अखिल भारतीय डिलीवरी:** भारत के सभी शहरों व कस्बों में डोरस्टेप डिलीवरी उपलब्ध है।\n3. **फ्री फिजिकल सैंपल किट:** हम असली पीवीसी स्वॉच, केमिकल गाइड और मिनी SS304 हुक ट्रैक सैंपल कूरियर से मुफ्त भेजते हैं!`
          : `📦 **Fast Dispatch, Delivery & Free Swatch Kits:**\n\n1. **24-48 Hour Fast Dispatch:** Standard rolls and pre-cut hardware sets dispatch within 24-48 hours from our central Ahmedabad logistics center.\n2. **Pan-India & Global Delivery:** Doorstep delivery to every state in India and international export shipping.\n3. **Free Physical Swatch Kit:** We courier actual polymer swatches, chemical resistance charts, and mini SS304 track samples at no charge!`,
        actions: [
          { label: '📦 Request Free Swatch Kit', actionType: 'sample' },
          { label: '💬 Track Dispatch on WhatsApp', actionType: 'whatsapp' }
        ]
      };
    }

    // 10. Contact / Address / Phone / WhatsApp
    if (q.includes('contact') || q.includes('phone') || q.includes('whatsapp') || q.includes('address') || q.includes('location') || q.includes('number') || q.includes('संपर्क') || q.includes('फोन') || q.includes('व्हाट्सएप') || q.includes('पता')) {
      return {
        text: language === 'hi'
          ? `📞 **Multi Enterprise संपर्क विवरण:**\n\n• **हेडक्वार्टर:** Multi Enterprise, GIDC Industrial Estate, Ahmedabad, Gujarat, India\n• **मोबाइल / व्हाट्सएप:** [+91 9377 678 155](https://wa.me/919377678155)\n• **ईमेल:** sales@multienterprise.co.in / info@multienterprise.co.in\n• **कार्य समय:** सोमवार से शनिवार (सुबह 9:00 बजे से शाम 7:30 बजे तक)\n\nआप सीधे व्हाट्सएप पर तुरंत चैट कर सकते हैं या हमें कॉल कर सकते हैं!`
          : `📞 **Multi Enterprise Direct Contact HQ:**\n\n• **Plant & HQ:** Multi Enterprise, GIDC Industrial Area, Ahmedabad, Gujarat, India\n• **WhatsApp / Mobile:** [+91 9377 678 155](https://wa.me/919377678155)\n• **Email:** sales@multienterprise.co.in / info@multienterprise.co.in\n• **Operating Hours:** Mon – Sat (9:00 AM – 7:30 PM IST)\n\nOur senior applications engineering team is available for immediate consultations!`,
        actions: [
          { label: '💬 Chat on WhatsApp (+91 9377 678 155)', actionType: 'whatsapp' },
          { label: '📞 Call Now', actionType: 'call' },
          { label: '📍 View 3D Map HQ', actionType: 'section', sectionId: 'contact' }
        ]
      };
    }

    // Default Fallback
    return {
      text: language === 'hi'
        ? `धन्यवाद आपके प्रश्न के लिए! Multi Enterprise 1998 से भारत का प्रमुख **PVC Strip Curtains & Industrial Barrier Manufacturer** है।\n\nहमारे पास 12 विशिष्ट PVC ग्रेड्स, SS304 हुक ट्रैक, कोल्ड स्टोरेज (-40°C) और फोर्कलिफ्ट रिब्ड सॉल्यूशंस हैं।\n\nकृपया नीचे दिए गए विकल्पों में से चुनें या मुझे अपने दरवाजे का साइज (चौड़ाई x ऊंचाई) बताएं!`
        : `Thank you for reaching out! Multi Enterprise is India's premier manufacturer of **Industrial PVC Strip Curtains & Facility Barriers** since 1998.\n\nWe engineer 12 PVC strip grades, SS304 hook-on hardware, sub-zero freezers (-40°C), and 30+ cleanroom products.\n\nFeel free to ask specific questions about grades, dimensions, pricing, or request free physical samples!`,
      actions: [
        { label: '🎨 Explore 12 PVC Grades', actionType: 'section', sectionId: 'products' },
        { label: '📐 3D CAD Configurator', actionType: 'configurator' },
        { label: '📦 Request Sample Kit', actionType: 'sample' },
        { label: '💬 Chat on WhatsApp', actionType: 'whatsapp' }
      ]
    };
  };

  const lastMessageTimeRef = useRef<number>(0);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    // Anti-Bot Flood Check: Throttle incoming rapid bursts (< 500ms)
    const now = Date.now();
    if (now - lastMessageTimeRef.current < 500) {
      return;
    }
    lastMessageTimeRef.current = now;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Simulate natural AI thinking delay (400ms)
    setTimeout(() => {
      const response = generateAIResponse(text);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: response.actions
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleResetChat = () => {
    setMessages([defaultGreeting]);
  };

  return (
    <>
      {/* Floating Circular Launcher Button */}
      <div 
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* On-Hover Tooltip Pill: 'AI Assistant' */}
        <AnimatePresence>
          {!isOpen && isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="bg-[#0F172A]/95 text-white backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#0077ED]/50 shadow-2xl flex items-center gap-2 pointer-events-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0077ED] animate-spin" />
              <span className="text-xs font-mono font-bold tracking-wider whitespace-nowrap">
                AI Assistant
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Small Circular Button with Anime Avatar */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,119,237,0.4)] transition-all cursor-pointer border-2 ${
            isOpen 
              ? 'bg-[#FFFFFF] border-[#0077ED] ring-4 ring-[#0077ED]/20' 
              : 'bg-[#0077ED] border-white ring-4 ring-[#0077ED]/30'
          }`}
          aria-label="Open AI Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#0077ED]" />
          ) : (
            <div className="relative w-full h-full p-0.5">
              <img
                src={AI_ADVISOR_AVATAR}
                alt="AI Assistant Anime Avatar"
                className="w-full h-full rounded-full object-cover shadow-inner"
              />
              {/* Online Green Pulsing Indicator */}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white ring-1 ring-emerald-500 animate-pulse" />
            </div>
          )}

          {unreadCount > 0 && !isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] text-white rounded-full text-[10px] font-bold font-mono flex items-center justify-center border-2 border-white shadow-md">
              {unreadCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Expanded Interactive Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-24 right-4 sm:right-6 z-50 bg-[#FFFFFF] border border-[#D8D2C5] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] backdrop-blur-2xl flex flex-col overflow-hidden ${
              isMinimized
                ? 'w-80 h-16'
                : 'w-[92vw] sm:w-[440px] h-[580px] max-h-[82vh]'
            }`}
          >
            {/* Chatbot Top Header */}
            <div className="bg-[#FAF8F5] border-b border-[#E2DDD2] p-3.5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={AI_ADVISOR_AVATAR}
                    alt="Multi AI Advisor"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#0077ED] shadow-md"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-mono font-bold text-[#0F172A] uppercase tracking-wider">
                      Multi AI Advisor
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] font-mono text-[#64748B]">
                    Est. 1998 • Technical Knowledge Base
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Reset Conversation Button */}
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 text-[#64748B] hover:text-[#0077ED] hover:bg-[#EFE9DC] rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-[#64748B] hover:text-[#0077ED] hover:bg-[#EFE9DC] rounded-lg transition-colors cursor-pointer"
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-[#64748B] hover:text-[#0077ED] hover:bg-[#EFE9DC] rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Messages Feed */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs font-mono bg-[#FAF8F5]">
                  {messages.map((msg) => {
                    const isBot = msg.sender === 'bot';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                      >
                        <div
                          className={`max-w-[88%] p-3 rounded-2xl ${
                            isBot
                              ? 'bg-[#FFFFFF] border border-[#E2DDD2] text-[#1E293B] rounded-tl-sm shadow-sm'
                              : 'bg-[#0077ED] text-white rounded-tr-sm shadow-md'
                          }`}
                        >
                          <div className="whitespace-pre-line leading-relaxed font-sans text-xs">
                            {msg.text}
                          </div>

                          {/* Action CTA Buttons */}
                          {msg.actions && msg.actions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-[#E2DDD2] font-mono">
                              {msg.actions.map((act, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => handleActionClick(act)}
                                  className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#0077ED] hover:text-white text-[#0F172A] border border-[#D8D2C5] rounded-lg text-[10.5px] font-bold transition-all cursor-pointer flex items-center gap-1"
                                >
                                  <span>{act.label}</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <span className="text-[9px] text-[#94A3B8] mt-1 px-1 font-mono">
                          {msg.timestamp}
                        </span>
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-2 p-2 bg-[#FFFFFF] border border-[#E2DDD2] rounded-2xl rounded-tl-sm w-20 text-[#64748B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0077ED] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0077ED] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0077ED] animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts Carousel */}
                <div className="p-2 bg-[#F4EFE6] border-t border-[#E2DDD2] overflow-x-auto no-scrollbar flex items-center gap-1.5">
                  {quickPrompts.map((qp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(language === 'hi' ? qp.hi : qp.en)}
                      className="px-2.5 py-1 bg-[#FFFFFF] hover:bg-[#0077ED] hover:text-white border border-[#D8D2C5] rounded-full text-[10px] font-mono text-[#334155] whitespace-nowrap transition-colors cursor-pointer shadow-xs"
                    >
                      {language === 'hi' ? qp.hi : qp.en}
                    </button>
                  ))}
                </div>

                {/* Input Field & Send Action */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 bg-[#FAF8F5] border-t border-[#E2DDD2] flex items-center gap-2 flex-shrink-0"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={
                      language === 'hi'
                        ? '12 PVC ग्रेड्स, प्राइस, साइज़ के बारे में पूछें...'
                        : 'Ask about 12 PVC grades, prices, sizes...'
                    }
                    className="flex-1 bg-[#FFFFFF] border border-[#D8D2C5] focus:border-[#0077ED] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="p-2.5 bg-[#0077ED] hover:bg-[#2B8EFF] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-md"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
