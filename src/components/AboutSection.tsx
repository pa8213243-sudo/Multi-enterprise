import React from 'react';
import { MultiLogo, MultiLogoIcon } from './MultiLogo';
import { useLanguage } from '../i18n/LanguageContext';
import {
  ShieldCheck,
  Award,
  Truck,
  Layers,
  ThermometerSnowflake,
  Factory,
  CheckCircle2,
  Clock,
  FileCheck2,
  PackageCheck
} from 'lucide-react';
import { motion } from 'motion/react';

interface AboutSectionProps {
  onOpenSampleModal?: () => void;
  onOpenConfigurator?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenSampleModal,
  onOpenConfigurator
}) => {
  const { language } = useLanguage();

  const highlights = [
    {
      title: language === 'hi' ? 'उच्च गुणवत्ता एवं टिकाऊ पॉलीमर' : 'High-Grade Tested Industrial Quality',
      desc: language === 'hi'
        ? 'हम उच्च गुणवत्ता वाले टिकाऊ पॉलीमर कम्पाउंड का उपयोग करते हैं, जिससे अद्वितीय स्पष्टता और लम्बा जीवनकाल सुनिश्चित होता है।'
        : 'Formulated with high-grade, durable polymer compounds to guarantee consistent optical transparency and extended wear life.',
      icon: ShieldCheck
    },
    {
      title: language === 'hi' ? '1998 से विनिर्माण विरासत' : 'Manufacturing Heritage Since 1998',
      desc: language === 'hi'
        ? '27 से अधिक वर्षों के अनुभव के साथ औद्योगिक और कोल्ड चेन दरवाजों के लिए विशेष समाधान।'
        : 'Over 27 years of dedicated manufacturing experience delivering tailored doorway barrier systems across industries.',
      icon: Factory
    },
    {
      title: language === 'hi' ? 'फास्ट 24-48h डिस्पैच' : 'Rapid 24-48h Dispatch',
      desc: language === 'hi'
        ? 'मानक 50m रोल्स और कस्टम कट-टू-साइज़ किट दोनों की त्वरित आपूर्ति।'
        : 'Standard 50m bulk rolls and ready-to-hang pre-clamped doorway kits dispatched promptly nationwide & globally.',
      icon: Truck
    },
    {
      title: language === 'hi' ? 'एसएस 304 हार्डवेयर सिस्टम' : 'Grade 304 Stainless Hardware',
      desc: language === 'hi'
        ? 'टूल-रहित हुक-ऑन ट्रैक सिस्टम जो बिना किसी रुकावट के त्वरित स्ट्रिप प्रतिस्थापन सक्षम करता है।'
        : 'Tool-less hook-on suspension rails manufactured from corrosion-proof AISI 304 stainless steel.',
      icon: Award
    }
  ];

  return (
    <section id="about" className="relative py-10 sm:py-12 bg-[#F8F6F0] border-t border-[#E2DDD2] text-[#1E293B] overflow-hidden">
      {/* Precision Technical Grid Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <MultiLogoIcon size={18} className="w-4.5 h-4.5" />
            <span className="text-[#0077ED] text-xs font-mono tracking-widest uppercase font-bold">
              {language === 'hi' ? '[ मल्टी एंटरप्राइज • कंपनी परिचय ]' : '[ ABOUT MULTI ENTERPRISE • MANUFACTURING OVERVIEW ]'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F172A] uppercase font-display mb-4">
            {language === 'hi' ? 'औद्योगिक पीवीसी स्ट्रिप कर्टन निर्माण' : 'Precision Thermal & Industrial Barriers'}
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-light">
            {language === 'hi'
              ? 'मल्टी एंटरप्राइज कोल्ड स्टोरेज, वेयरहाउस, क्लीनरूम, वेल्डिंग और खाद्य प्रसंस्करण सुविधाओं के लिए उच्च गुणवत्ता वाले पीवीसी स्ट्रिप कर्टन्स और सस्पेंशन हार्डवेयर का विश्वसनीय निर्माता है।'
              : 'Multi Enterprise is an established industrial manufacturer producing heavy-duty PVC strip curtains, sub-zero cold room thermal barriers, anti-static cleanroom partitions, and stainless steel suspension hardware.'}
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] border border-[#E2DDD2] p-6 rounded-xl relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E2DDD2] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#0077ED]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0F172A] font-mono uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/55 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2DDD2] flex items-center gap-1.5 text-[10px] font-mono text-[#0077ED]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Quality Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Choose Us & What You Get Section */}
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-[#00A8C5] to-[#0089A3] p-8 sm:p-10 text-white shadow-xl border border-[#007A91]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            
            {/* Why Choose Us */}
            <div className="space-y-4 bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-xs border border-white/20">
              <h3 className="text-2xl sm:text-3xl font-black uppercase font-display tracking-tight text-white border-b border-white/25 pb-3">
                {language === 'hi' ? 'हमें क्यों चुनें (Why Choose Us)' : 'Why Choose Us'}
              </h3>
              <div className="space-y-3.5 text-xs sm:text-sm text-white/95 leading-relaxed font-light font-sans">
                <p>
                  With a legacy of excellence dating back to 1998, we have earned a reputation for manufacturing customized solutions that deliver results. What sets us apart is not just the quality of our products, but also our dedication to customer satisfaction.
                </p>
                <p>
                  Whether you&apos;re looking to improve energy efficiency in your warehouse or maintain temperature control in your cold storage facility, our PVC strip curtains provide the ideal solution.
                </p>
                <p>
                  In today&apos;s world, hygiene has never been more important, and our company is here to provide you with the tools you need to maintain the highest standards of cleanliness and safety. Our hygiene products are not just effective; they&apos;re essential for ensuring the well-being of your employees, customers, and loved ones. With our unwavering commitment to quality, choosing us as your hygiene partner is the smart choice for a safer, healthier future.
                </p>
              </div>
            </div>

            {/* What You Get */}
            <div className="space-y-4 bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-xs border border-white/20">
              <h3 className="text-2xl sm:text-3xl font-black uppercase font-display tracking-tight text-white border-b border-white/25 pb-3">
                {language === 'hi' ? 'आपको क्या मिलता है (What You Get)' : 'What You Get'}
              </h3>
              <div className="space-y-3.5 text-xs sm:text-sm text-white/95 leading-relaxed font-light font-sans">
                <p>
                  With over three decades of experience in the industry, we have perfected the art of manufacturing PVC strip curtains that not only meet but exceed expectations. Our commitment to innovation ensures that our products are at the forefront of technology, offering unmatched durability and performance in any environment.
                </p>
                <p>
                  Our love for PVC strip curtains is evident in every detail of our products, from their durability and versatility to their ability to enhance safety and workflow efficiency. When you choose our PVC strip curtains, you&apos;re choosing decades of expertise, innovation, and a passion for excellence.
                </p>
                <p>
                  From powerful disinfectants to convenient sanitizing wipes, our range of products is designed to address the unique needs of various industries and settings. By choosing our hygiene products, you&apos;re not just investing in cleanliness; you&apos;re investing in peace of mind.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Corporate Trust Banner */}
        <div className="bg-[#FAF8F5] border border-[#D8D2C5] p-8 rounded-2xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-[#0077ED]/10 text-[#0077ED] border border-[#0077ED]/30 rounded font-bold">
                FACTORY DIRECT ADVANTAGE
              </span>
              <span className="text-xs font-mono text-[#64748B] font-bold">EST. 1998</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display uppercase tracking-tight">
              {language === 'hi'
                ? 'अपने दरवाजे के लिए सटीक विनिर्देश और तत्काल कोटेशन प्राप्त करें'
                : 'Engineered for Heavy Forklifts, Walkways & Sub-Zero Storage'}
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
              {language === 'hi'
                ? 'हमारे 3D कॉन्फिगरेटर के साथ अपने उद्घाटन आकार का परीक्षण करें या अपने विनिर्देशों के मूल्यांकन के लिए नि:शुल्क फिजिकल स्वैच किट का अनुरोध करें।'
                : 'Test your exact door opening in our interactive 3D configurator or request physical polymer swatches delivered directly to your facility.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto flex-shrink-0">
            {onOpenConfigurator && (
              <button
                type="button"
                onClick={onOpenConfigurator}
                className="px-5 py-3 bg-[#0077ED] hover:bg-[#2B8EFF] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg cursor-pointer"
              >
                {language === 'hi' ? '3D कॉन्फिगरेटर खोलें' : 'Launch 3D Configurator'}
              </button>
            )}
            {onOpenSampleModal && (
              <button
                type="button"
                onClick={onOpenSampleModal}
                className="px-4 py-3 bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#0F172A] border border-[#CFC8BA] font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              >
                {language === 'hi' ? 'नि:शुल्क स्वैच किट' : 'Request Swatch Kit'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
