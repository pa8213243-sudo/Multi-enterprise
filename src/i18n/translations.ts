export type Language = 'en' | 'hi';

export interface TranslationSchema {
  nav: {
    configurator: string;
    configuratorDesc: string;
    pvcGrades: string;
    pvcGradesDesc: string;
    thermalRoi: string;
    thermalRoiDesc: string;
    solutions: string;
    solutionsDesc: string;
    hardware: string;
    hardwareDesc: string;
    quality: string;
    qualityDesc: string;
    freeSwatches: string;
    getQuote: string;
    directory: string;
    est: string;
    language: string;
  };
  hero: {
    badge: string;
    factoryDirect: string;
    tagline1: string;
    tagline2: string;
    tagline3: string;
    description: string;
    featureThermal: string;
    featureCold: string;
    featureFoodSafe: string;
    featureHook: string;
    getInstantQuote: string;
    configuratorBtn: string;
    freeSwatchesBtn: string;
    statThermalLabel: string;
    statThermalVal: string;
    statHeritageLabel: string;
    statHeritageVal: string;
    statQualityLabel: string;
    statQualityVal: string;
    materialFormula: string;
    realisticView: string;
    thermalView: string;
    airflowView: string;
  };
  configurator: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    mountingFace: string;
    mountingLintel: string;
    width: string;
    height: string;
    stripDims: string;
    stripOverlap: string;
    hardwareSystem: string;
    systemTelemetry: string;
    specSummary: string;
    computedFor: string;
    estBudget: string;
    strips: string;
    mass: string;
    efficiency: string;
    noiseDrop: string;
    illustrativeSavings: string;
    illustrativeSavingsDesc: string;
    requestCadQuote: string;
    whatsappQuote: string;
    copySpec: string;
    copied: string;
    swatchKit: string;
  };
  simulator: {
    badge: string;
    title: string;
    subtitle: string;
    sliderTitle: string;
    sliderWithout: string;
    sliderWithoutDesc: string;
    sliderWith: string;
    sliderWithDesc: string;
    sliderLoss: string;
    sliderContainment: string;
    operationalParams: string;
    doorArea: string;
    openDuration: string;
    insideTemp: string;
    outsideTemp: string;
    powerRate: string;
    projectedRoi: string;
    energySavings: string;
    netAnnualSavings: string;
    reducesDemand: string;
    payback: string;
    co2Offset: string;
    coolingLoad: string;
    configureBtn: string;
    disclaimer: string;
  };
  products: {
    badge: string;
    title: string;
    subtitle: string;
    tabPvcGrades: string;
    tabHardware: string;
    viewSpec: string;
    tempRange: string;
    applications: string;
    keyFeatures: string;
    specifications: string;
    requestSample: string;
    configureGrade: string;
  };
  solutions: {
    badge: string;
    title: string;
    subtitle: string;
    challenge: string;
    solution: string;
    recommended: string;
    keyBenefits: string;
    configureSolution: string;
  };
  hardwareSection: {
    badge: string;
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step1Desc: string;
    step2Desc: string;
    step3Desc: string;
    step4Desc: string;
    tips: string;
    duration: string;
  };
  qualitySection: {
    badge: string;
    title: string;
    subtitle: string;
    certTitle: string;
    faqTitle: string;
    allFaqs: string;
    searchPlaceholder: string;
    expandAll: string;
    collapseAll: string;
    copyAnswer: string;
    copied: string;
  };
  modals: {
    quoteTitle: string;
    sampleTitle: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    country: string;
    doorways: string;
    notes: string;
    submitQuote: string;
    submitSample: string;
    close: string;
    thankYou: string;
    quoteReceived: string;
    sampleReceived: string;
  };
  footer: {
    about: string;
    worldwideExport: string;
    fastDispatch: string;
    pvcGradesHeading: string;
    toolsHeading: string;
    contactHeading: string;
    rights: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      configurator: '3D Configurator',
      configuratorDesc: 'Interactive CAD Spec Engine',
      pvcGrades: 'PVC Grades',
      pvcGradesDesc: '6 High-Performance Formulations',
      thermalRoi: 'Thermal ROI',
      thermalRoiDesc: 'HVAC Energy Loss Simulator',
      solutions: 'Sector Solutions',
      solutionsDesc: 'Cold Chain, Cleanroom & Heavy Duty',
      hardware: 'Hardware Blueprint',
      hardwareDesc: 'SS304 Track & Modular Mounting',
      quality: 'Quality & FAQs',
      qualityDesc: 'Material Specs & Guidelines',
      freeSwatches: 'Free Swatches',
      getQuote: 'Get a Quote',
      directory: '[ INDUSTRIAL SYSTEMS DIRECTORY ]',
      est: 'EST. 1998',
      language: 'Language'
    },
    hero: {
      badge: '[ INDUSTRIAL PRECISION THERMAL SYSTEMS ]',
      factoryDirect: 'FACTORY DIRECT MFG • EST. 1998',
      tagline1: 'PVC STRIP',
      tagline2: 'CURTAIN',
      tagline3: 'SOLUTIONS.',
      description: 'High-performance thermal barriers and controlled access curtains engineered for modern industrial & cold storage environments.',
      featureThermal: 'Thermal & Draft Barrier',
      featureCold: 'Sub-Zero Supple Flexibility',
      featureFoodSafe: 'DOP-Free Formulations',
      featureHook: 'Quick Hook-On SS304 Rail',
      getInstantQuote: 'Get Instant Quote',
      configuratorBtn: '3D Configurator',
      freeSwatchesBtn: 'Free Swatches',
      statThermalLabel: 'Thermal Isolation',
      statThermalVal: 'Multi-Zone',
      statHeritageLabel: 'Mfg Heritage',
      statHeritageVal: '27+ Yrs',
      statQualityLabel: 'Quality Assured',
      statQualityVal: '100% Virgin',
      materialFormula: '[ SELECT MATERIAL FORMULA (← → ARROWS) ]',
      realisticView: 'Realistic',
      thermalView: 'Thermal Map',
      airflowView: 'Airflow'
    },
    configurator: {
      title: 'Interactive 3D Strip Curtain Configurator',
      subtitle: 'Specify custom opening dimensions, polymer grade, overlap percentage, and mounting hardware for immediate engineering bill of materials.',
      step1Title: 'Doorway Dimensions & Mounting Style',
      step1Desc: 'Enter exact clear opening measurements in millimeters or feet',
      step2Title: 'PVC Material Grade Formulation',
      step2Desc: 'Select polymer formulation tailored to your environment',
      step3Title: 'Strip Size & Overlap Ratio',
      step3Desc: 'Controls thermal containment efficiency and wind resistance',
      step4Title: 'Suspension Hardware Rail System',
      mountingFace: 'Face Wall (+100mm)',
      mountingLintel: 'Under Lintel (Soffit)',
      width: 'Clear Opening Width',
      height: 'Clear Opening Height',
      stripDims: 'Strip Dimensions',
      stripOverlap: 'Strip Overlap',
      hardwareSystem: 'Suspension Hardware Rail System',
      systemTelemetry: '[ SYSTEM TELEMETRY ]',
      specSummary: 'Specification Summary',
      computedFor: 'Computed for',
      estBudget: 'Est. Budget',
      strips: 'Strips',
      mass: 'Mass',
      efficiency: 'Efficiency',
      noiseDrop: 'Noise Drop',
      illustrativeSavings: 'Illustrative Thermal Barrier Estimate',
      illustrativeSavingsDesc: 'Helps prevent convective air exchange and temperature loss across active doorways',
      requestCadQuote: 'Request Formal CAD Quote',
      whatsappQuote: 'WhatsApp',
      copySpec: 'Copy Spec',
      copied: 'Copied!',
      swatchKit: 'Swatch Kit'
    },
    simulator: {
      badge: '[ MULTI ENTERPRISE • THERMODYNAMIC ROI SIMULATOR ]',
      title: 'Cold Chain & HVAC Energy Simulator',
      subtitle: 'Open industrial doorways represent significant convective thermal transfer. Explore estimated thermal containment and compressor load reduction.',
      sliderTitle: 'THERMAL BOUNDARY VISUALIZER',
      sliderWithout: 'WITHOUT STRIP CURTAIN',
      sliderWithoutDesc: 'Unimpeded convection currents. Ambient warm air flows freely across doorway, increasing refrigeration load.',
      sliderWith: 'WITH MULTI PVC BARRIER',
      sliderWithDesc: 'Interlocking PVC strips form a thermal curtain barrier restricting convective air infiltration while allowing traffic.',
      sliderLoss: 'Convective Infiltration',
      sliderContainment: 'Thermal Barrier Effect',
      operationalParams: '[ OPERATIONAL PARAMETERS ]',
      doorArea: 'Doorway Clear Opening Area',
      openDuration: 'Door Open Cumulative Duration',
      insideTemp: 'Inside Zone Temp (°C)',
      outsideTemp: 'Outside Ambient Temp (°C)',
      powerRate: 'Utility Power Rate ($/kWh)',
      projectedRoi: '[ ILLUSTRATIVE SIMULATION ]',
      energySavings: 'Simulated Thermal & Energy Impact',
      netAnnualSavings: 'Simulated Annual Electricity Savings',
      reducesDemand: 'Estimated reduction in refrigeration workload',
      payback: 'Est. Payback',
      co2Offset: 'CO₂ Offset',
      coolingLoad: 'Cooling Load',
      configureBtn: 'Configure Curtains for This Doorway',
      disclaimer: '* Note: Calculations are illustrative thermodynamic simulations based on standard psychrometric exchange formulas. Actual savings depend on site doorway traffic, compressor efficiency, building airflow, and local tariffs.'
    },
    products: {
      badge: '[ MULTI ENTERPRISE • INDUSTRIAL PRODUCT LINEUP ]',
      title: 'Engineered Polymers & Suspension Hardware',
      subtitle: 'Manufactured with virgin quality PVC compounds, DOP/DEHP-free options, suited for heavy industry, food safety, and cold chain environments.',
      tabPvcGrades: 'PVC Strip Grades (6)',
      tabHardware: 'Hardware Rails (3)',
      viewSpec: 'View Technical Specifications',
      tempRange: 'Temperature Operating Range',
      applications: 'Recommended Applications',
      keyFeatures: 'Key Features & Benefits',
      specifications: 'Material Specifications',
      requestSample: 'Request Physical Sample',
      configureGrade: 'Configure in 3D'
    },
    solutions: {
      badge: '[ MULTI ENTERPRISE • ENGINEERED SECTOR SOLUTIONS ]',
      title: 'Custom Barrier Solutions by Sector',
      subtitle: 'Every facility faces unique environmental stresses. Discover how Multi Enterprise solves airflow, thermal, ESD, and abrasive wear challenges.',
      challenge: 'Operational Challenge',
      solution: 'Multi Enterprise Solution',
      recommended: 'Recommended Grade',
      keyBenefits: 'Key Benefits',
      configureSolution: 'Configure Solution'
    },
    hardwareSection: {
      badge: '[ MULTI ENTERPRISE • MODULAR ASSEMBLY BLUEPRINT ]',
      title: 'Zero-Downtime Modular Installation',
      subtitle: 'Engineered for rapid facility deployment. Our tool-less hook-on suspension system allows individual strip replacement quickly and easily.',
      step1: 'Rail Mounting',
      step2: 'Strip Clamping',
      step3: 'Hook-On Placement',
      step4: 'Final Clearance',
      step1Desc: 'Fix the Grade 304 Stainless Steel or Galvanized toothed rail level across the doorway header or face wall using standard anchors.',
      step2Desc: 'Sandwich the top edge of each pre-cut PVC strip between the clamp plates and fasten securely.',
      step3Desc: 'Hook the pre-clamped strips onto the rail prongs according to your calculated overlap pattern.',
      step4Desc: 'Allow strips to hang and relax, then trim bottom edges to maintain a clean 5-10mm floor clearance.',
      tips: 'Pro Tip',
      duration: 'Duration'
    },
    qualitySection: {
      badge: '[ MULTI ENTERPRISE • TECHNICAL KNOWLEDGE BASE ]',
      title: 'Quality Standards & Technical FAQs',
      subtitle: 'Browse engineering guidelines, maintenance protocols, installation tips, and technical questions regarding PVC strip curtains.',
      certTitle: 'Material & Testing Standards',
      faqTitle: 'Frequently Asked Questions',
      allFaqs: 'All Questions',
      searchPlaceholder: 'Search FAQs by keyword (e.g. overlap, cleaning, subzero)...',
      expandAll: 'Expand All',
      collapseAll: 'Collapse All',
      copyAnswer: 'Copy Q&A',
      copied: 'Copied to Clipboard!'
    },
    modals: {
      quoteTitle: 'Request Commercial Pricing & Lead Time',
      sampleTitle: 'Request Physical PVC Swatch Kit',
      name: 'Full Name / Contact Person',
      email: 'Work Email Address',
      phone: 'Phone / WhatsApp Number',
      company: 'Company / Organization Name',
      country: 'City / Location',
      doorways: 'Number of Doorways',
      notes: 'Additional Project Requirements / Notes',
      submitQuote: 'Submit Quote Request',
      submitSample: 'Request Free Swatch Kit',
      close: 'Close',
      thankYou: 'Thank You!',
      quoteReceived: 'Your quotation request has been received. Our technical sales team will review your doorway specs and respond shortly.',
      sampleReceived: 'Your swatch sample kit request has been registered. We will prepare your material package for dispatch.'
    },
    footer: {
      about: 'Established in 1998. Multi Enterprise is a specialized manufacturer of high-durability PVC strip curtains, sub-zero cold room airlocks, anti-static cleanroom barriers, and Grade 304 stainless steel suspension systems.',
      worldwideExport: 'Worldwide Export',
      fastDispatch: 'Rapid Fabrication & Dispatch',
      pvcGradesHeading: '[ PVC Strip Grades ]',
      toolsHeading: '[ Engineering Tools ]',
      contactHeading: '[ Direct Contact ]',
      rights: 'MULTI ENTERPRISE. ALL RIGHTS RESERVED. INDUSTRIAL PVC STRIP CURTAINS & COLD BARRIERS.'
    }
  },
  hi: {
    nav: {
      configurator: '3D कॉन्फिगरेटर',
      configuratorDesc: 'इंटरैक्टिव सीएडी स्पेक इंजन',
      pvcGrades: 'पीवीसी ग्रेड्स',
      pvcGradesDesc: '6 उच्च-प्रदर्शन फॉर्म्युलेशन',
      thermalRoi: 'थर्मल बचत मॉडल',
      thermalRoiDesc: 'एचवीएसी ऊर्जा सिमुलेटर',
      solutions: 'उद्योग समाधान',
      solutionsDesc: 'कोल्ड स्टोरेज, क्लीनरूम और हेवी ड्यूटी',
      hardware: 'हार्डवेयर सिस्टम',
      hardwareDesc: 'SS304 ट्रैक और मॉड्यूलर माउंटिंग',
      quality: 'गुणवत्ता और अक्सर पूछे जाने वाले प्रश्न',
      qualityDesc: 'सामग्री स्पेक्स और दिशानिर्देश',
      freeSwatches: 'मुफ्त नमूने',
      getQuote: 'कोटेशन प्राप्त करें',
      directory: '[ औद्योगिक सिस्टम डायरेक्टरी ]',
      est: 'स्थापना 1998',
      language: 'भाषा'
    },
    hero: {
      badge: '[ औद्योगिक थर्मल और तापमान नियंत्रण प्रणाली ]',
      factoryDirect: 'फैक्ट्री डायरेक्ट निर्माण • स्थापना 1998',
      tagline1: 'पीवीसी स्ट्रिप',
      tagline2: 'कर्टेन',
      tagline3: 'समाधान।',
      description: 'आधुनिक औद्योगिक कारखानों और कोल्ड स्टोरेज के लिए निर्मित उच्च-प्रदर्शन थर्मल बैरियर और तापमान नियंत्रण कर्टेन।',
      featureThermal: 'थर्मल और ड्राफ्ट बैरियर',
      featureCold: 'माइनस तापमान में लचीलापन',
      featureFoodSafe: 'सुरक्षित एवं गंधहीन फॉर्मूला',
      featureHook: 'त्वरित SS304 हुक सिस्टम',
      getInstantQuote: 'तुरंत कोटेशन प्राप्त करें',
      configuratorBtn: '3D कॉन्फिगरेटर',
      freeSwatchesBtn: 'मुफ्त नमूने',
      statThermalLabel: 'तापमान नियंत्रण',
      statThermalVal: 'मल्टी-ज़ोन',
      statHeritageLabel: 'निर्माण अनुभव',
      statHeritageVal: '27+ वर्ष',
      statQualityLabel: 'सामग्री शुद्धता',
      statQualityVal: '100% वर्जिन',
      materialFormula: '[ सामग्री फॉर्मूला चुनें (← → तीर कुंजियाँ) ]',
      realisticView: 'वास्तविक दृश्य',
      thermalView: 'थर्मल मैप',
      airflowView: 'हवा का बहाव'
    },
    configurator: {
      title: 'इंटरैक्टिव 3D स्ट्रिप कर्टेन कॉन्फिगरेटर',
      subtitle: 'अपने दरवाजे का सटीक माप, पीवीसी ग्रेड, ओवरलैप और माउंटिंग हार्डवेयर चुनें और तुरंत तकनीकी विवरण प्राप्त करें।',
      step1Title: 'दरवाजे का माप और माउंटिंग प्रकार',
      step1Desc: 'मिलीमीटर या फीट में सटीक चौड़ाई और ऊंचाई दर्ज करें',
      step2Title: 'पीवीसी सामग्री ग्रेड फॉर्मूलेशन',
      step2Desc: 'अपने कार्य वातावरण के अनुसार सही पॉलीमर ग्रेड चुनें',
      step3Title: 'स्ट्रिप का आकार और ओवरलैप प्रतिशत',
      step3Desc: 'हवा के दबाव और तापमान नियंत्रण के अनुसार स्ट्रिप चुनें',
      step4Title: 'सस्पेंशन हार्डवेयर रेल सिस्टम',
      mountingFace: 'फेस वॉल माउंट (+100mm)',
      mountingLintel: 'लिंटेल के नीचे (सोफिट)',
      width: 'दरवाजे की चौड़ाई',
      height: 'दरवाजे की ऊंचाई',
      stripDims: 'स्ट्रिप का आकार',
      stripOverlap: 'स्ट्रिप ओवरलैप',
      hardwareSystem: 'सस्पेंशन हार्डवेयर रेल सिस्टम',
      systemTelemetry: '[ सिस्टम टेलीमेट्री ]',
      specSummary: 'तकनीकी विनिर्देश सारांश',
      computedFor: 'के लिए गणना की गई',
      estBudget: 'अनुमानित बजट',
      strips: 'स्ट्रिप्स की संख्या',
      mass: 'कुल भार',
      efficiency: 'दक्षता',
      noiseDrop: 'ध्वनि में कमी',
      illustrativeSavings: 'सांकेतिक थर्मल बैरियर अनुमान',
      illustrativeSavingsDesc: 'सक्रिय दरवाजों पर हवा के आदान-प्रदान और तापमान के नुकसान को कम करने में सहायक',
      requestCadQuote: 'औपचारिक CAD कोटेशन मांगें',
      whatsappQuote: 'व्हाट्सएप',
      copySpec: 'विवरण कॉपी करें',
      copied: 'कॉपी हो गया!',
      swatchKit: 'सैंपल किट'
    },
    simulator: {
      badge: '[ मल्टी एंटरप्राइज • थर्मोडायनामिक ROI सिमुलेटर ]',
      title: 'कोल्ड चेन और ऊर्जा बचत सिमुलेटर',
      subtitle: 'खुले औद्योगिक दरवाजों से होने वाले तापमान के नुकसान को समझें और पीवीसी कर्टेन से होने वाली अनुमानित बचत की गणना करें।',
      sliderTitle: 'थर्मल बैरियर विज़ुअलाइज़र',
      sliderWithout: 'बिना स्ट्रिप कर्टेन के',
      sliderWithoutDesc: 'गर्म हवा बेरोक-टोक अंदर आती है जिससे कूलिंग लोड और बिजली की खपत बढ़ जाती है।',
      sliderWith: 'मल्टी पीवीसी बैरियर के साथ',
      sliderWithDesc: 'इंटरलॉकिंग स्ट्रिप्स हवा के बहाव को रोकती हैं और आवश्यक तापमान बनाए रखती हैं।',
      sliderLoss: 'हवा का प्रवेश',
      sliderContainment: 'थर्मल सुरक्षा प्रभाव',
      operationalParams: '[ परिचालन पैरामीटर ]',
      doorArea: 'दरवाजे का कुल क्षेत्रफल',
      openDuration: 'प्रतिदिन खुला रहने का समय',
      insideTemp: 'अंदर का तापमान (°C)',
      outsideTemp: 'बाहर का तापमान (°C)',
      powerRate: 'बिजली दर ($/kWh)',
      projectedRoi: '[ सांकेतिक सिमुलेशन ]',
      energySavings: 'सिम्युलेटेड थर्मल एवं ऊर्जा प्रभाव',
      netAnnualSavings: 'अनुमानित वार्षिक बिजली बचत',
      reducesDemand: 'रेफ्रिजरेशन लोड में अनुमानित कमी',
      payback: 'अनुमानित पेबैक',
      co2Offset: 'कार्बन कटौती',
      coolingLoad: 'कूलिंग लोड',
      configureBtn: 'इस दरवाजे के लिए कर्टेन कॉन्फ़िगर करें',
      disclaimer: '* नोट: यह गणना मानक थर्मोडायनामिक सूत्रों पर आधारित सांकेतिक सिमुलेशन है। वास्तविक बचत दरवाजे के उपयोग, स्थानीय तापमान, कंप्रेसर क्षमता और बिजली दरों पर निर्भर करती है।'
    },
    products: {
      badge: '[ मल्टी एंटरप्राइज • औद्योगिक उत्पाद श्रृंखला ]',
      title: 'इंजीनियरिंग पॉलीमर और सस्पेंशन हार्डवेयर',
      subtitle: 'उच्च गुणवत्ता वाली वर्जिन पीवीसी सामग्री से निर्मित, हेवी इंडस्ट्री, फूड सेफ्टी और कोल्ड चेन के लिए उपयुक्त।',
      tabPvcGrades: 'पीवीसी स्ट्रिप ग्रेड्स (6)',
      tabHardware: 'हार्डवेयर रेल्स (3)',
      viewSpec: 'तकनीकी विवरण देखें',
      tempRange: 'कार्यशील तापमान सीमा',
      applications: 'उपयुक्त अनुप्रयोग',
      keyFeatures: 'प्रमुख विशेषताएं और लाभ',
      specifications: 'सामग्री विनिर्देश',
      requestSample: 'सामग्री सैंपल मांगें',
      configureGrade: '3D में कॉन्फ़िगर करें'
    },
    solutions: {
      badge: '[ मल्टी एंटरप्राइज • विशिष्ट औद्योगिक समाधान ]',
      title: 'उद्योग के अनुसार अनुकूलित बैरियर समाधान',
      subtitle: 'हर उद्योग की अपनी आवश्यकताएं होती हैं। जानें कि मल्टी एंटरप्राइज तापमान, धूल, और आवागमन की चुनौतियों को कैसे हल करता है।',
      challenge: 'उद्योग की चुनौती',
      solution: 'मल्टी एंटरप्राइज समाधान',
      recommended: 'अनुशंसित ग्रेड',
      keyBenefits: 'मुख्य लाभ',
      configureSolution: 'समाधान कॉन्फ़िगर करें'
    },
    hardwareSection: {
      badge: '[ मल्टी एंटरप्राइज • इंस्टॉलेशन ब्लूप्रिंट ]',
      title: 'आसान और त्वरित मॉड्यूलर इंस्टॉलेशन',
      subtitle: 'बिना किसी परेशानी के त्वरित इंस्टॉलेशन के लिए डिज़ाइन किया गया। हमारा हुक-ऑन सिस्टम किसी भी स्ट्रिप को सेकंडों में बदलने की सुविधा देता है।',
      step1: 'रेल माउंटिंग',
      step2: 'स्ट्रिप क्लैंपिंग',
      step3: 'हुक-ऑन हैंगिंग',
      step4: 'फ्लोर क्लीयरेंस',
      step1Desc: 'ग्रेड 304 स्टेनलेस स्टील या गैल्वनाइज्ड रेल को दरवाजे के ऊपर लेवल में कसें।',
      step2Desc: 'पीवीसी स्ट्रिप के ऊपरी सिरे पर क्लैंप प्लेट लगाएं और रिवेट्स से कसें।',
      step3Desc: 'निर्धारित ओवरलैप के अनुसार स्ट्रिप्स को रेल के हुक्स पर लटकाएं।',
      step4Desc: 'स्ट्रिप्स को लटकने दें और नीचे से 5-10mm का गैप रखकर आवश्यकतानुसार ट्रिम करें।',
      tips: 'सलाह',
      duration: 'समय'
    },
    qualitySection: {
      badge: '[ मल्टी एंटरप्राइज • तकनीकी ज्ञान केंद्र ]',
      title: 'गुणवत्ता मानक और अक्सर पूछे जाने वाले प्रश्न',
      subtitle: 'पीवीसी स्ट्रिप कर्टेन के रखरखाव, इंस्टॉलेशन और तकनीकी प्रश्नों के उत्तर विस्तार से पढ़ें।',
      certTitle: 'सामग्री एवं परीक्षण मानक',
      faqTitle: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
      allFaqs: 'सभी प्रश्न',
      searchPlaceholder: 'प्रश्नों में खोजें (उदा. ओवरलैप, सफाई, तापमान)...',
      expandAll: 'सभी खोलें',
      collapseAll: 'सभी बंद करें',
      copyAnswer: 'प्रश्न-उत्तर कॉपी करें',
      copied: 'क्लिपबोर्ड पर कॉपी हो गया!'
    },
    modals: {
      quoteTitle: 'औपचारिक कोटेशन एवं समय सीमा का अनुरोध करें',
      sampleTitle: 'मुफ्त पीवीसी सैंपल किट का अनुरोध करें',
      name: 'पूरा नाम / संपर्क व्यक्ति',
      email: 'ईमेल पता',
      phone: 'फ़ोन / व्हाट्सएप नंबर',
      company: 'कंपनी का नाम',
      country: 'शहर / स्थान',
      doorways: 'दरवाजों की संख्या',
      notes: 'अतिरिक्त आवश्यकताएं / टिप्पणियां',
      submitQuote: 'कोटेशन अनुरोध भेजें',
      submitSample: 'सैंपल किट का अनुरोध करें',
      close: 'बंद करें',
      thankYou: 'धन्यवाद!',
      quoteReceived: 'आपका कोटेशन अनुरोध प्राप्त हो गया है। हमारी तकनीकी टीम जल्द ही आपसे संपर्क करेगी।',
      sampleReceived: 'आपका सैंपल किट अनुरोध पंजीकृत हो गया है। हम सामग्री जल्द ही डिस्पैच करेंगे।'
    },
    footer: {
      about: 'स्थापना 1998. मल्टी एंटरप्राइज उच्च-गुणवत्ता वाले पीवीसी स्ट्रिप कर्टेन, कोल्ड स्टोरेज एयरलॉक, एंटी-स्टैटिक क्लीनरूम कर्टेन और स्टेनलेस स्टील सस्पेंशन सिस्टम का निर्माता है।',
      worldwideExport: 'वैश्विक निर्यात',
      fastDispatch: 'त्वरित निर्माण और डिस्पैच',
      pvcGradesHeading: '[ पीवीसी स्ट्रिप ग्रेड्स ]',
      toolsHeading: '[ इंजीनियरिंग टूल्स ]',
      contactHeading: '[ सीधा संपर्क ]',
      rights: 'मल्टी एंटरप्राइज. सर्वाधिकार सुरक्षित. औद्योगिक पीवीसी स्ट्रिप कर्टेन एवं बैरियर सिस्टम.'
    }
  }
};
