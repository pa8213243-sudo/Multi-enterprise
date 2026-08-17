import { ProductGradeInfo, IndustrySolution } from '../types';

export const PVC_GRADES: Record<string, ProductGradeInfo> = {
  'transparent': {
    id: 'transparent',
    name: 'Transparent',
    shortName: 'Transparent Clear',
    tagline: 'High-optical clarity high-clarity industrial polymer barrier for industrial warehouses & pedestrian thoroughfares',
    colorHex: '#e0f2fe',
    color3D: {
      color: 0xe0f2fe,
      transmission: 0.94,
      opacity: 0.70,
      roughness: 0.05,
      metalness: 0.02,
      clearcoat: 1.0,
      ior: 1.52,
      tint: 'rgba(224, 242, 254, 0.12)'
    },
    temperatureRange: { min: -15, max: 50, unit: '°C' },
    thicknessOptions: [1.5, 2, 3, 4],
    widthOptions: [100, 200, 300, 400],
    keyFeatures: [
      'High optical clarity and light transmission (~88%)',
      'Effective thermal barrier to separate ambient temperature zones',
      'Acoustic noise isolation across noisy factory floor areas',
      'Smooth non-snag rounded edge profile for smooth passage',
      'High-grade polymer formulation free from DOP/DEHP contaminants'
    ],
    applications: [
      'Warehouse loading docks & internal partition barriers',
      'Manufacturing facilities & dust control zones',
      'Supermarket backrooms & retail stock storage',
      'Automotive service bays & assembly areas'
    ],
    specs: {
      shoreHardness: '77 Shore A',
      tensileStrength: '17.5 MPa',
      elongationAtBreak: '340%',
      lightTransmission: 'High Clarity (~88%)',
      fireRating: 'Self-Extinguishing Compound',
      uvResistance: 'UV Stabilized Grade',
      coldCrackTemp: '-15°C',
      soundReduction: '18-22 dB Dampening'
    },
    badge: 'High Clarity',
    badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300 font-bold',
    imageUrl: '/assets/PVC strip/Screenshot 2026-08-16 214504.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214040.png'
  },
  'blue-natural': {
    id: 'blue-natural',
    name: 'Blue Natural',
    shortName: 'Blue Natural',
    tagline: 'Classic pale blue tinted clarity PVC strip for industrial facilities & logistics doorways',
    colorHex: '#60a5fa',
    color3D: {
      color: 0x93c5fd,
      transmission: 0.92,
      opacity: 0.75,
      roughness: 0.08,
      metalness: 0.05,
      clearcoat: 0.95,
      ior: 1.52,
      tint: 'rgba(96, 165, 250, 0.18)'
    },
    temperatureRange: { min: -15, max: 50, unit: '°C' },
    thicknessOptions: [2, 3, 4],
    widthOptions: [200, 300, 400],
    keyFeatures: [
      'Natural blue tint reduces harsh glare in outdoor-facing doorways',
      'Excellent energy conservation restricting AC and heating loss',
      'Dust, smoke, and fume isolation between manufacturing cells',
      'Flexible polymer with excellent bounce-back memory',
      'Tear-resistant formulation for high pedestrian & hand-truck usage'
    ],
    applications: [
      'Factory entrance portals and internal partitions',
      'Packaging lines and goods dispatch doorways',
      'Pharma warehouse ambient staging areas',
      'Commercial kitchen stores & cold preparation rooms'
    ],
    specs: {
      shoreHardness: '76 Shore A',
      tensileStrength: '17.0 MPa',
      elongationAtBreak: '350%',
      lightTransmission: 'Blue Tint Clear (~85%)',
      fireRating: 'Self-Extinguishing Compound',
      uvResistance: 'UV Stabilized Grade',
      coldCrackTemp: '-15°C',
      soundReduction: '19 dB Isolation'
    },
    badge: 'Popular Choice',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 font-bold',
    imageUrl: '/assets/PVC strip/Screenshot 2026-08-16 214521.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214040.png'
  },
  'standard-ribbed': {
    id: 'standard-ribbed',
    name: 'Standard Ribbed',
    shortName: 'Standard Ribbed',
    tagline: 'Raised shock-absorbing ribs absorb forklift blade & pallet friction to keep vision clear',
    colorHex: '#93c5fd',
    color3D: {
      color: 0x93c5fd,
      transmission: 0.88,
      opacity: 0.82,
      roughness: 0.12,
      metalness: 0.08,
      clearcoat: 0.98,
      ior: 1.54,
      ribbed: true,
      tint: 'rgba(147, 197, 253, 0.22)'
    },
    temperatureRange: { min: -20, max: 50, unit: '°C' },
    thicknessOptions: [2, 3, 4, 5],
    widthOptions: [200, 300, 400],
    keyFeatures: [
      'Raised dual-sided ribs take the brunt of pallet impact and scratches',
      'Preserves optical visibility corridor longer in heavy traffic',
      'Ribbed interlocking profile reduces draft penetration',
      'Added strip weight helps prevent wind billowing at exterior doors',
      'Ideal for heavy logistics centers and motorized vehicle doorways'
    ],
    applications: [
      'High-throughput logistics distribution hubs',
      'Heavy forklift & electric reach-truck thoroughfares',
      'External loading docks exposed to crosswinds',
      'Heavy manufacturing plants & pallet conveyor gates'
    ],
    specs: {
      shoreHardness: '78 Shore A',
      tensileStrength: '19.1 MPa',
      elongationAtBreak: '350%',
      lightTransmission: 'Clear with Impact Ribs',
      fireRating: 'Self-Extinguishing Compound',
      uvResistance: 'UV Stabilized Grade',
      coldCrackTemp: '-20°C',
      soundReduction: 'Heavy Barrier Mass'
    },
    badge: 'Forklift Tough',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
    imageUrl: '/assets/PVC strip/Screenshot 2026-08-16 214531.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214025.png'
  },
  'gray': {
    id: 'gray',
    name: 'Gray',
    shortName: 'Industrial Gray',
    tagline: 'Translucent / opaque neutral gray PVC strip for visual screening and departmental isolation',
    colorHex: '#94a3b8',
    color3D: {
      color: 0x64748b,
      transmission: 0.35,
      opacity: 0.90,
      roughness: 0.25,
      metalness: 0.15,
      clearcoat: 0.80,
      ior: 1.50,
      tint: 'rgba(148, 163, 184, 0.70)'
    },
    temperatureRange: { min: -10, max: 55, unit: '°C' },
    thicknessOptions: [2, 3],
    widthOptions: [200, 300],
    keyFeatures: [
      'Sleek modern gray appearance for clean industrial interiors',
      'Provides privacy while keeping noise and dust contained',
      'Resistant to oil, grease, mild acids and chemical washings',
      'Non-stick formula ensures free-hanging strip alignment',
      'Hides background clutter in storage and service bays'
    ],
    applications: [
      'Workshop service bays and maintenance rooms',
      'Machinery screening & testing enclosures',
      'Waste processing & material recycling rooms',
      'Aesthetic architectural factory dividers'
    ],
    specs: {
      shoreHardness: '77 Shore A',
      tensileStrength: '17.2 MPa',
      elongationAtBreak: '335%',
      lightTransmission: 'Translucent/Opaque Filter',
      fireRating: 'Self-Extinguishing Compound',
      uvResistance: 'Standard Industrial Grade',
      coldCrackTemp: '-10°C',
      soundReduction: 'Acoustic Partition'
    },
    badge: 'Privacy & Zoning',
    badgeColor: 'bg-slate-200 text-slate-900 border-slate-400 font-bold',
    imageUrl: '/assets/PVC strip/Screenshot 2026-08-16 214547.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214123.png'
  },
  'navy-blue': {
    id: 'navy-blue',
    name: 'Navy Blue',
    shortName: 'Navy Blue',
    tagline: 'Deep navy blue polymer barrier for zone segregation, privacy and visual isolation',
    colorHex: '#1d4ed8',
    color3D: {
      color: 0x1e3a8a,
      transmission: 0.40,
      opacity: 0.92,
      roughness: 0.20,
      metalness: 0.10,
      clearcoat: 0.85,
      ior: 1.53,
      tint: 'rgba(29, 78, 216, 0.75)'
    },
    temperatureRange: { min: -15, max: 55, unit: '°C' },
    thicknessOptions: [2, 3],
    widthOptions: [200, 300],
    keyFeatures: [
      'Distinctive rich navy blue tint for clear departmental identification',
      'Effective light suppression and partial privacy barrier',
      'Strong resistance to industrial vapors and drafts',
      'Smooth edges prevent snags during staff passage',
      'Durable compound engineered for continuous heavy cycle use'
    ],
    applications: [
      'Assembly line boundary partitions',
      'Chemical and paint prep area barriers',
      'Security boundary markers and warehouse aisles',
      'Commercial facility aesthetic barriers'
    ],
    specs: {
      shoreHardness: '78 Shore A',
      tensileStrength: '17.8 MPa',
      elongationAtBreak: '340%',
      lightTransmission: 'Deep Blue Tint (~35%)',
      fireRating: 'Self-Extinguishing Compound',
      uvResistance: 'UV Stabilized Grade',
      coldCrackTemp: '-15°C',
      soundReduction: 'Noise Enclosure'
    },
    badge: 'Zone Marker',
    badgeColor: 'bg-indigo-100 text-indigo-950 border-indigo-300 font-bold',
    imageUrl: '/assets/PVC strip/Screenshot 2026-08-16 214608.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214053.png'
  },
  'white-opaque': {
    id: 'white-opaque',
    name: 'White Opaque',
    shortName: 'White Opaque',
    tagline: 'Solid pure white hygienic PVC strip barrier for cleanrooms, milk & dairy, and complete privacy',
    colorHex: '#f8fafc',
    color3D: {
      color: 0xffffff,
      transmission: 0.05,
      opacity: 0.98,
      roughness: 0.30,
      metalness: 0.05,
      clearcoat: 0.90,
      ior: 1.49,
      tint: 'rgba(248, 250, 252, 0.98)'
    },
    temperatureRange: { min: -15, max: 50, unit: '°C' },
    thicknessOptions: [2, 3],
    widthOptions: [200, 300],
    keyFeatures: [
      '100% Sight blocking opaque white surface for complete privacy',
      'Hygienic easy-wipe finish suited for dairy, food and medical packaging',
      'Reflects heat and bright lighting within controlled chambers',
      'DOP/DEHP-free formulation complies with clean processing standards',
      'Resistant to sanitizing agents and frequent chemical washdowns'
    ],
    applications: [
      'Milk, dairy & ice cream processing plants',
      'Pharmaceutical cleanroom pass-throughs',
      'Mortuary, medical & hospital privacy partitions',
      'Supermarket butcheries and meat prep rooms'
    ],
    specs: {
      shoreHardness: '76 Shore A',
      tensileStrength: '16.5 MPa',
      elongationAtBreak: '360%',
      lightTransmission: '0% (Total Opacity)',
      fireRating: 'Self-Extinguishing Compound',
      uvResistance: 'Food Contact Safe Formula',
      coldCrackTemp: '-15°C',
      soundReduction: 'Sound Containment'
    },
    badge: 'Dairy & Cleanroom',
    badgeColor: 'bg-zinc-200 text-zinc-900 border-zinc-400 font-bold',
    imageUrl: '/assets/PVC strip/Screenshot 2026-08-16 214616.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214133.png'
  },
  'multi-red': {
    id: 'multi-red',
    name: 'Multi Red',
    shortName: 'Multi Red',
    tagline: 'High-visibility safety warning red PVC strip for doorway edge outlines and danger perimeters',
    colorHex: '#dc2626',
    color3D: {
      color: 0xb91c1c,
      transmission: 0.45,
      opacity: 0.92,
      roughness: 0.15,
      metalness: 0.08,
      clearcoat: 0.90,
      ior: 1.54,
      tint: 'rgba(220, 38, 38, 0.75)'
    },
    temperatureRange: { min: -15, max: 60, unit: '°C' },
    thicknessOptions: [2, 3],
    widthOptions: [200, 300],
    keyFeatures: [
      'Vivid safety red warning color immediately alerts vehicle drivers',
      'Commonly used as the outer 1-2 edge strips to define door clearance width',
      'Contains sparks and UV flash in welding and grinding enclosures',
      'Tough polymer stands up to heavy industrial friction',
      'Prevents collisions in fast-moving forklift warehouse bays'
    ],
    applications: [
      'Warehouse doorway edge markers & forklift clearance alerts',
      'Hazardous equipment perimeter safety enclosures',
      'Welding & hot work spark isolation booths',
      'Emergency equipment access zones'
    ],
    specs: {
      shoreHardness: '78 Shore A',
      tensileStrength: '18.2 MPa',
      elongationAtBreak: '330%',
      lightTransmission: 'Translucent Warning Red (~40%)',
      fireRating: 'Flame Retardant Compound',
      uvResistance: 'UV & Arc Flash Filter',
      coldCrackTemp: '-15°C',
      soundReduction: 'Safety Barrier Mass'
    },
    badge: 'Safety Warning',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 font-bold',
    imageUrl: '/assets/PVC strip/Screenshot 2026-08-16 214626.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214025.png'
  },
  'orange-amber': {
    id: 'orange-amber',
    name: 'Orange Amber',
    shortName: 'Orange Amber',
    tagline: 'Amber orange insect barrier filtering light spectrum to repel flying pests at open doorways',
    colorHex: '#f97316',
    color3D: {
      color: 0xea580c,
      transmission: 0.75,
      opacity: 0.85,
      roughness: 0.10,
      metalness: 0.05,
      clearcoat: 0.92,
      ior: 1.53,
      tint: 'rgba(249, 115, 22, 0.60)'
    },
    temperatureRange: { min: -15, max: 50, unit: '°C' },
    thicknessOptions: [2, 3],
    widthOptions: [200, 300],
    keyFeatures: [
      'Special amber-orange wavelength blocks insect-attracting UV spectrum',
      'Deters flies, mosquitoes and moths from entering food processing zones',
      'Maintains good see-through optical visibility for worker safety',
      'Smooth easy-to-clean surface suited for HACCP standards',
      'Supple flexible feel with high tear resistance'
    ],
    applications: [
      'Food processing plants, bakeries & sweet manufacturing',
      'Beverage bottling & dairy packaging doors',
      'Commercial restaurant kitchen receiving doors',
      'Agricultural packhouses & cold room entrances'
    ],
    specs: {
      shoreHardness: '77 Shore A',
      tensileStrength: '17.4 MPa',
      elongationAtBreak: '345%',
      lightTransmission: 'Transparent Amber Filter Tint',
      fireRating: 'Self-Extinguishing Compound',
      uvResistance: 'Insect Repelling UV Filter',
      coldCrackTemp: '-15°C',
      soundReduction: 'Thermal & Insect Barrier'
    },
    badge: 'Anti-Insect Guard',
    badgeColor: 'bg-orange-100 text-orange-950 border-orange-300 font-bold',
    imageUrl: '/assets/PVC strip/Screenshot 2026-08-16 214731.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214252.png'
  },
  'sky-blue': {
    id: 'sky-blue',
    name: 'Sky Blue',
    shortName: 'Sky Blue Polar',
    tagline: 'Special low-temperature plasticized formula flexible down to -40°C in blast freezers without cracking',
    colorHex: '#38bdf8',
    color3D: {
      color: 0x38bdf8,
      transmission: 0.90,
      opacity: 0.80,
      roughness: 0.14,
      metalness: 0.05,
      clearcoat: 0.95,
      ior: 1.48,
      tint: 'rgba(56, 189, 248, 0.30)'
    },
    temperatureRange: { min: -40, max: 25, unit: '°C' },
    thicknessOptions: [2, 3, 4],
    widthOptions: [200, 300, 400],
    keyFeatures: [
      'Remains soft, supple and elastic at sub-zero cold room temperatures',
      'Does not become brittle or snap under freezer operations down to -40°C',
      'Drastically restricts warm moist air from causing ice build-up on cooling coils',
      'Food-contact safe plasticizer formulation',
      'Saves substantial electrical power for industrial refrigeration compressors'
    ],
    applications: [
      'Walk-in freezers, blast freezers & cold storage warehouses',
      'Meat, seafood, ice cream and dairy refrigeration plants',
      'Reefer container trucks & perishable food logistics docks',
      'Pharmaceutical cold chain storage rooms'
    ],
    specs: {
      shoreHardness: '65 Shore A (Soft Cold Formula)',
      tensileStrength: '15.2 MPa',
      elongationAtBreak: '400%',
      lightTransmission: 'Clear Sub-Zero Form (~86%)',
      fireRating: 'Self-Extinguishing Compound',
      uvResistance: 'Stabilized Low-Temp Grade',
      coldCrackTemp: '-40°C',
      soundReduction: 'Deep Thermal Isolating'
    },
    badge: 'Polar Sub-Zero (-40°C)',
    badgeColor: 'bg-cyan-100 text-cyan-950 border-cyan-300 font-bold',
    imageUrl: '/assets/PVC strip/Screenshot 2026-08-16 214746.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214133.png'
  },
  'parrot-green': {
    id: 'parrot-green',
    name: 'Parrot Green',
    shortName: 'Parrot Green',
    tagline: 'Bright vibrant green PVC strip for facility division, process separation & decorative partitions',
    colorHex: '#22c55e',
    color3D: {
      color: 0x16a34a,
      transmission: 0.70,
      opacity: 0.85,
      roughness: 0.12,
      metalness: 0.05,
      clearcoat: 0.90,
      ior: 1.52,
      tint: 'rgba(34, 197, 94, 0.55)'
    },
    temperatureRange: { min: -10, max: 50, unit: '°C' },
    thicknessOptions: [2, 3],
    widthOptions: [200, 300],
    keyFeatures: [
      'Bright vibrant green color creates clear visual segregation between bays',
      'Good light transmission while establishing distinct operational boundaries',
      'Flexible, scratch-resistant high-clarity industrial polymer compound',
      'Resistant to grease, water, dust and mild chemicals',
      'Smooth non-snag edge finish for employee comfort'
    ],
    applications: [
      'Packaging vs. raw material storage segregation',
      'Automotive and engineering parts staging bays',
      'Agricultural processing & sorting facilities',
      'Aesthetic and commercial facility partitions'
    ],
    specs: {
      shoreHardness: '77 Shore A',
      tensileStrength: '17.1 MPa',
      elongationAtBreak: '340%',
      lightTransmission: 'Translucent Green (~65%)',
      fireRating: 'Self-Extinguishing Compound',
      uvResistance: 'Standard Industrial Grade',
      coldCrackTemp: '-10°C',
      soundReduction: 'Acoustic Partition'
    },
    badge: 'Facility Segregation',
    badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300 font-bold',
    imageUrl: '/assets/PVC strip/Screenshot 2026-08-16 214754.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214053.png'
  },
  'lemon-yellow': {
    id: 'lemon-yellow',
    name: 'Lemon Yellow',
    shortName: 'Lemon Yellow',
    tagline: 'Bright translucent yellow PVC strip for insect prevention, high visibility and UV filtering',
    colorHex: '#eab308',
    color3D: {
      color: 0xfacc15,
      transmission: 0.85,
      opacity: 0.80,
      roughness: 0.10,
      metalness: 0.04,
      clearcoat: 0.94,
      ior: 1.52,
      tint: 'rgba(234, 179, 8, 0.45)'
    },
    temperatureRange: { min: -15, max: 50, unit: '°C' },
    thicknessOptions: [2, 3],
    widthOptions: [200, 300],
    keyFeatures: [
      'High-clarity yellow tint filters out wavelengths that attract flying insects',
      'Bright luminous color enhances entryway visibility and workplace safety',
      'Acts as a dependable thermal and dust barrier for high-traffic doors',
      'Wipe-clean food-grade surface suited for commercial catering',
      'Long-lasting polymer compound resistant to daily wear'
    ],
    applications: [
      'Food catering, bakeries & confectionery processing doors',
      'Pharmaceutical packaging airlocks',
      'Supermarket stockroom doorways',
      'Grain, seed and spice storage warehouses'
    ],
    specs: {
      shoreHardness: '77 Shore A',
      tensileStrength: '17.2 MPa',
      elongationAtBreak: '345%',
      lightTransmission: 'Transparent Lemon Tint (~82%)',
      fireRating: 'Self-Extinguishing Compound',
      uvResistance: 'UV Stabilized & Insect Filter',
      coldCrackTemp: '-15°C',
      soundReduction: 'Thermal Barrier'
    },
    badge: 'Insect & UV Guard',
    badgeColor: 'bg-amber-100 text-amber-950 border-amber-300 font-bold',
    imageUrl: '/assets/PVC strip/Screenshot 2026-08-16 214803.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214252.png'
  },
  'multi-green': {
    id: 'multi-green',
    name: 'Multi Green',
    shortName: 'Multi Green Welding',
    tagline: 'Dark forest green welding grade filter shielding harmful UV/IR arc flashes and hot grinding sparks',
    colorHex: '#15803d',
    color3D: {
      color: 0x064e3b,
      transmission: 0.45,
      opacity: 0.92,
      roughness: 0.20,
      metalness: 0.10,
      clearcoat: 0.85,
      ior: 1.55,
      tint: 'rgba(21, 128, 61, 0.75)'
    },
    temperatureRange: { min: -15, max: 60, unit: '°C' },
    thicknessOptions: [2, 3],
    widthOptions: [200, 300],
    keyFeatures: [
      'Filters hazardous optical radiation from MIG, TIG, and Arc welding',
      'Protects surrounding workers from flash burns and eye injury',
      'Flame retardant polymer prevents ignition from flying sparks',
      'Allows safety supervisors to inspect welding operations from outside',
      'Contains grinding dust and abrasive particles within the work bay'
    ],
    applications: [
      'Welding bays, fabrication shops & boiler manufacturing',
      'Robotic welding cells and laser cutting perimeters',
      'Metal grinding, cutting & spark containment booths',
      'Automotive body repair & chassis welding zones'
    ],
    specs: {
      shoreHardness: '78 Shore A',
      tensileStrength: '18.0 MPa',
      elongationAtBreak: '330%',
      lightTransmission: 'Dark Green Safety Filter (~20%)',
      fireRating: 'Flame Retardant Compound',
      uvResistance: 'UV & Infrared Arc Flash Filter',
      coldCrackTemp: '-15°C',
      soundReduction: 'Noise Enclosure'
    },
    badge: 'Welding Protection',
    badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold',
    imageUrl: '/assets/PVC strip/Screenshot 2026-08-16 214814.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214148.png'
  },

  // Legacy Aliases for seamless backwards compatibility
  get 'standard-clear'() { return this['transparent']; },
  get 'polar-freezer'() { return this['sky-blue']; },
  get 'double-ribbed'() { return this['standard-ribbed']; },
  get 'anti-static'() { return this['parrot-green']; },
  get 'welding-safety'() { return this['multi-green']; },
  get 'anti-insect'() { return this['orange-amber']; }
};

export const HARDWARE_SYSTEMS = [
  {
    id: 'ss304-hook-track',
    name: 'Grade 304 Stainless Steel Hook-On Track',
    material: 'Stainless Steel AISI 304 (Corrosion Proof)',
    desc: 'The industry standard for hygiene and longevity. Individual strips hook directly onto prongs and can be replaced in seconds without unbolting.',
    stripClamp: 'SS304 plate sets with stainless fasteners',
    bestFor: 'Food plants, cold rooms, outdoor docks, washdown areas',
    lifespan: 'Long-Life Industrial Grade',
    image: 'ss304-rail'
  },
  {
    id: 'galvanized-hook-track',
    name: 'Galvanized Zinc-Plated Steel Rail',
    material: 'Carbon Steel with Protective Zinc Coating',
    desc: 'Cost-effective high-rigidity track system for general manufacturing, warehouses, and internal partition doorways.',
    stripClamp: 'Galvanized steel clamp plates',
    bestFor: 'Standard warehouse logistics, workshop bays, tool areas',
    lifespan: 'High-Durability Zinc Coated',
    image: 'galv-rail'
  },
  {
    id: 'sliding-track-system',
    name: 'Industrial Bi-Parting Sliding Curtain Track',
    material: 'Extruded Aluminum with Roller Trolleys',
    desc: 'Allows entire curtain packs to glide smoothly to the side for unobstructed wide-load passage and seasonal openings.',
    stripClamp: 'Overhead nylon-wheel roller hangers',
    bestFor: 'Oversized machinery access, full-width loading, crane bays',
    lifespan: 'Heavy Duty Track Assembly',
    image: 'sliding-rail'
  }
];

export const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    id: 'cold-chain',
    title: 'Cold Storage & Blast Freezers',
    subtitle: 'Thermal containment for perishable logistics and walk-in cold rooms',
    iconName: 'Snowflake',
    imageAlt: 'Cold storage warehouse with PVC strip curtains',
    challenge: 'Open doorways allow warm ambient air to rush in, leading to frost accumulation on cooling coils and unnecessary compressor cycling.',
    solution: 'Multi Enterprise Polar Grade PVC strips form a flexible thermal barrier that reduces convective air exchange during active loading.',
    recommendedGrade: 'polar-freezer',
    kpis: [
      { label: 'Thermal Shield', value: 'Effective', desc: 'Restricts convective heat gain' },
      { label: 'Flexibility', value: 'Down to -40°C', desc: 'Resists cracking in deep freeze' },
      { label: 'Visibility', value: 'High Clarity', desc: 'Safe forklift and staff transit' }
    ],
    keyBenefits: [
      'Remains flexible at sub-zero temperatures',
      'Reduces moisture intrusion and evaporator frost',
      'Hygienic and simple to wipe clean'
    ]
  },
  {
    id: 'warehouse-logistics',
    title: 'High-Traffic Logistics & Warehousing',
    subtitle: 'Abrasion-resistant barriers for forklift and pallet thoroughfares',
    iconName: 'Truck',
    imageAlt: 'High traffic warehouse forklift doorway',
    challenge: 'Frequent forklift and pallet traffic can scratch standard flat PVC strips over time, diminishing line-of-sight visibility.',
    solution: 'Multi Enterprise Double-Ribbed PVC incorporates raised bumper ribs that take pallet friction while preserving the flat vision area.',
    recommendedGrade: 'double-ribbed',
    kpis: [
      { label: 'Impact Ribs', value: 'Dual-Sided', desc: 'Protects optical face' },
      { label: 'Draft Barrier', value: 'Interlocking', desc: 'Reduces wind penetration' },
      { label: 'Maintenance', value: 'Tool-Less', desc: 'Quick hook replacement' }
    ],
    keyBenefits: [
      'Heavy ballast prevents wind billowing at external docks',
      'SS304 hook-on track allows single-strip swap in seconds',
      'Acoustic dampening between warehouse and office zones'
    ]
  },
  {
    id: 'cleanroom-esd',
    title: 'Electronics & Cleanroom Environments',
    subtitle: 'Static-dissipative and particulate containment barriers',
    iconName: 'Cpu',
    imageAlt: 'Electronics SMT cleanroom manufacturing',
    challenge: 'Airborne dust migration and static charge accumulation pose risks to electronic components and clean assembly areas.',
    solution: 'Multi Enterprise Anti-Static PVC helps dissipate surface static electricity while preventing cross-draft dust movement.',
    recommendedGrade: 'anti-static',
    kpis: [
      { label: 'ESD Dissipation', value: 'Formulated', desc: 'Helps prevent static build-up' },
      { label: 'Dust Control', value: 'Low Adherence', desc: 'Smooth wipeable surface' },
      { label: 'Clarity', value: 'Transparent', desc: 'Workstation visibility' }
    ],
    keyBenefits: [
      'Clean compound without offensive odors',
      'Useful for server aisle and cleanroom containment',
      'Smooth pass-through for technicians and carts'
    ]
  },
  {
    id: 'welding-fabrication',
    title: 'Welding Bays & Metal Fabrication',
    subtitle: 'Optical radiation filtering and spark containment curtains',
    iconName: 'Flame',
    imageAlt: 'Welding bay with protective safety screens',
    challenge: 'Welding arc flashes can cause painful glare to nearby workers, while grinding sparks create hot debris risks.',
    solution: 'Multi Enterprise Welding Safety PVC filters intense arc glare and incorporates flame-retardant compound for spark resistance.',
    recommendedGrade: 'welding-safety',
    kpis: [
      { label: 'Flash Filter', value: 'Safety Tint', desc: 'Shields surrounding workforce' },
      { label: 'Fire Safety', value: 'Flame Retardant', desc: 'Resistant to hot grinding sparks' },
      { label: 'Noise Shield', value: 'Acoustic', desc: 'Dampens grinding noise' }
    ],
    keyBenefits: [
      'Filters hazardous welding flashes and glare',
      'Allows supervisors to safely monitor operations from outside',
      'Contains sparks and metal dust within the work bay'
    ]
  },
  {
    id: 'food-pharma',
    title: 'Food Processing & Commercial Kitchens',
    subtitle: 'Pest deterrents and hygienic temperature zone barriers',
    iconName: 'ShieldCheck',
    imageAlt: 'Food processing plant with yellow anti-insect curtains',
    challenge: 'Open receiving doors allow flying insects to enter food preparation zones while letting conditioned air escape.',
    solution: 'Multi Enterprise Anti-Insect Yellow PVC provides an effective physical barrier and yellow light filtration that deters insects.',
    recommendedGrade: 'anti-insect',
    kpis: [
      { label: 'Insect Deterrent', value: 'Yellow Tint', desc: 'Light spectrum deterrent' },
      { label: 'Hygiene', value: 'Easy Clean', desc: 'Smooth washdown surface' },
      { label: 'Hardware', value: 'SS304 Rail', desc: 'Corrosion proof in damp areas' }
    ],
    keyBenefits: [
      'Deters flying pests at loading and kitchen doors',
      'Grade 304 Stainless Steel hardware resists rust from steam/water',
      'Durable and washable with standard mild detergent'
    ]
  }
];

export const TECHNICAL_METRICS = [
  { label: 'Years of Manufacturing Experience', value: '27+', detail: 'Established in 1998' },
  { label: 'Product Formulations Available', value: '6 Types', detail: 'Tailored for varied industries' },
  { label: 'Material Quality', value: 'Good Quality', detail: 'Consistent clarity & durability' },
  { label: 'Dispatch Turnaround', value: '24-48h', detail: 'Standard rolls & cut kits' }
];

export const TESTIMONIALS = [
  {
    quote: "Installing Multi Enterprise Polar Grade PVC curtains in our cold storage facility noticeably reduced our cold air loss during loading. The strips stay flexible even in our sub-zero rooms.",
    author: "Logistics Facility Manager",
    role: "Cold Chain Operations",
    company: "Perishable Distribution Hub",
    rating: 5,
    location: "Cold Storage Facility"
  },
  {
    quote: "The double-ribbed curtains on our main forklift doors have held up remarkably well against daily pallet traffic. Replacing individual strips on the stainless track takes less than a minute.",
    author: "Plant Operations Lead",
    role: "Warehouse Operations",
    company: "Industrial Logistics Center",
    rating: 5,
    location: "Manufacturing Hub"
  },
  {
    quote: "The SS304 hook-on track system makes installation and maintenance very straightforward. Whenever a strip gets worn, we can swap it out without halting operations.",
    author: "Maintenance Supervisor",
    role: "Plant Maintenance",
    company: "Packaging & Processing Facility",
    rating: 5,
    location: "Industrial Park"
  }
];

export interface FAQItem {
  id: string;
  category: 'sizing' | 'installation' | 'maintenance' | 'thermal' | 'compliance';
  question: string;
  answer: string;
  highlights?: string[];
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-sizing',
    category: 'sizing',
    question: "How do I choose the right strip width, thickness, and overlap for my doorway?",
    answer: "Strip dimensions depend on your opening height and traffic type. For pedestrian doors up to 2.5m, 200mm x 2mm strips with 33% or 50% overlap are recommended. For motorized pallet trucks and doorways up to 3.5m, 300mm x 3mm strips with 50% to 66% overlap provide the right balance of draft resistance and ease of passage. For tall forklift doors and exterior bays (up to 6m), 400mm x 4mm double-ribbed strips with 66% or 100% overlap provide maximum wind stability.",
    highlights: ['Pedestrian ≤2.5m: 200×2mm (33-50%)', 'Forklift ≤4.0m: 300×3mm (50-66%)', 'External Docks ≤6.0m: 400×4mm Ribbed (66-100%)']
  },
  {
    id: 'faq-installation-acclimation',
    category: 'installation',
    question: "What is the recommended installation preparation and acclimation process?",
    answer: "Unroll the PVC strips in a clean, flat room at ambient room temperature (15°C to 25°C) for several hours prior to hanging. This helps relieve the extrusion spool roll curve and ensures a straight, true vertical hang. When mounting the hook-on rail, ensure it is aligned horizontally level and leave a 5mm to 10mm gap above the finished floor to prevent strips from dragging under wheels.",
    highlights: ['Flat ambient acclimation prior to hanging', '5-10mm floor clearance gap', 'Alternate concave and convex curves']
  },
  {
    id: 'faq-replacement-hardware',
    category: 'installation',
    question: "How does the Stainless Steel 304 hook-on track system work?",
    answer: "The overhead toothed rail features prongs spaced to accommodate standard strip widths. Each PVC strip is clamped with a matching stainless steel hook plate at its top. Strips hook directly over the prongs without requiring tools. Damaged or worn individual strips can be lifted off and replaced in seconds without dismantling the entire curtain.",
    highlights: ['Tool-less quick strip replacement', 'Grade 304 corrosion-resistant stainless steel', 'Mounts under lintel or on face wall']
  },
  {
    id: 'faq-maintenance-cleaning',
    category: 'maintenance',
    question: "How should industrial PVC strip curtains be cleaned and maintained?",
    answer: "Clean strips periodically with lukewarm water and a mild, neutral soap or detergent using a soft cloth, sponge, or mop. Rinse with clean water and let dry. Avoid using abrasive scouring pads, wire brushes, or harsh chemical solvents like acetone or chlorinated thinners, as these can cloud the PVC surface.",
    highlights: ['Mild neutral detergent and warm water', 'Soft microfibre wipe or rinse', 'Avoid harsh chemical solvents']
  },
  {
    id: 'faq-trimming-lifespan',
    category: 'maintenance',
    question: "Can PVC strips be trimmed on-site, and what is their typical working life?",
    answer: "Yes, strips can be easily trimmed on-site using a sharp utility knife and a straight metal ruler. If strips stretch slightly over time and touch the floor, simply trim 10mm from the bottom edge. In typical indoor warehouse use, high-quality PVC curtains last several years, with high-traffic center strips replaced as needed.",
    highlights: ['Trimmable on-site with utility knife', 'Individual center strip replacement saves cost', 'Long-life high-clarity industrial polymer construction']
  },
  {
    id: 'faq-subzero-thermal',
    category: 'thermal',
    question: "Why is Polar Grade PVC recommended for sub-zero cold rooms?",
    answer: "Standard PVC can become stiff and brittle in freezing temperatures. Polar Grade PVC is specially plasticized to remain supple and flexible down to -40°C, ensuring safe passage for operators and forklifts without risking cracking or shattering.",
    highlights: ['Flexible down to -40°C', 'Special low-temperature plasticizer formulation', 'Prevents cracking and cloudiness']
  },
  {
    id: 'faq-energy-roi',
    category: 'thermal',
    question: "How do PVC strip curtains help control temperature in industrial doorways?",
    answer: "Whenever an industrial door is opened, convective air currents cause rapid exchange between warm and cool air. PVC strip curtains create a flexible physical barrier that seals the opening while still allowing vehicles and personnel to pass freely, helping maintain indoor climate zones.",
    highlights: ['Restricts convective doorway air transfer', 'Maintains separate climate zones', 'Cost-effective thermal barrier solution']
  },
  {
    id: 'faq-food-haccp',
    category: 'compliance',
    question: "Are your PVC curtains suitable for food storage and processing areas?",
    answer: "Yes. Our standard clear, polar, and anti-insect PVC strips are manufactured from high-grade polymer compounds without hazardous heavy metals or recycled industrial contaminants. They are non-porous and can be washed regularly to maintain sanitation in food handling environments.",
    highlights: ['Tested non-toxic compound', 'Smooth and easy to sanitize', 'Suitable for food and storage areas']
  },
  {
    id: 'faq-welding-esd',
    category: 'compliance',
    question: "What are the features of Welding Safety and Anti-Static strip curtains?",
    answer: "Welding safety curtains filter intense optical glare and UV/IR radiation from welding arcs while protecting surrounding work areas from sparks with a flame-retardant compound. Anti-static curtains have surface dissipative properties to reduce static electrical charges in electronics assembly and clean environments.",
    highlights: ['Arc flash and glare filtering', 'Flame-retardant formulation for sparks', 'Static-dissipative cleanroom grade']
  },
  {
    id: 'faq-leadtime-dispatch',
    category: 'sizing',
    question: "What are your standard supply formats and dispatch times?",
    answer: "We supply standard 50-meter rolls as well as custom pre-cut, pre-clamped doorway kits ready for immediate installation. Standard orders are typically processed and dispatched within 24 to 48 hours with complete hardware tracks and fasteners.",
    highlights: ['50-meter bulk rolls or ready-to-hang kits', '24-48 hour rapid dispatch', 'Full hardware and mounting sets available']
  }
];
