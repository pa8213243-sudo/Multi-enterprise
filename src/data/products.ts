import { ProductGradeInfo, IndustrySolution } from '../types';

export const PVC_GRADES: Record<string, ProductGradeInfo> = {
  'standard-clear': {
    id: 'standard-clear',
    name: 'Standard Clear Smooth PVC',
    shortName: 'Standard Clear',
    tagline: 'High-optical transparency barrier for industrial warehouses & pedestrian traffic',
    colorHex: '#38bdf8',
    color3D: {
      color: 0x93c5fd,
      transmission: 0.92,
      opacity: 0.75,
      roughness: 0.08,
      metalness: 0.05,
      clearcoat: 0.95,
      ior: 1.52,
      tint: 'rgba(56, 189, 248, 0.15)'
    },
    temperatureRange: { min: -15, max: 50, unit: '°C' },
    thicknessOptions: [1.5, 2, 3, 4],
    widthOptions: [100, 200, 300, 400],
    keyFeatures: [
      'High optical clarity and light transmission',
      'Effective thermal barrier to separate ambient zones',
      'Acoustic noise isolation across noisy factory floor areas',
      'Smooth non-snag edge profile for smooth passage',
      'Virgin compound formulation free from hazardous contaminants'
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
      lightTransmission: 'High Transparency (~88%)',
      fireRating: 'Self-Extinguishing Compound',
      uvResistance: 'UV Stabilized',
      coldCrackTemp: '-15°C',
      soundReduction: 'Acoustic Dampening'
    },
    badge: 'Popular Choice',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    imageUrl: '/assets/Screenshot 2026-08-16 214504.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214040.png'
  },
  'polar-freezer': {
    id: 'polar-freezer',
    name: 'Polar / Sub-Zero Freezer Grade',
    shortName: 'Polar Low Temp',
    tagline: 'Low-temperature plasticized formula flexible down to -40°C without cracking',
    colorHex: '#60a5fa',
    color3D: {
      color: 0x60a5fa,
      transmission: 0.90,
      opacity: 0.82,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 0.9,
      ior: 1.48,
      tint: 'rgba(96, 165, 250, 0.25)'
    },
    temperatureRange: { min: -40, max: 25, unit: '°C' },
    thicknessOptions: [2, 3, 4],
    widthOptions: [200, 300, 400],
    keyFeatures: [
      'Stays supple and flexible at sub-zero cold room temperatures',
      'Helps maintain cold room temperature during open door loading',
      'Restricts moist ambient air from entering and forming evaporator frost',
      'Food-safe proximity and hygienic maintenance',
      'Resistant to thermal shock and low-temp cracking'
    ],
    applications: [
      'Walk-in freezers & cold storage facilities',
      'Refrigerated meat, seafood & dairy packhouses',
      'Reefer transport trailers & intermodal docks',
      'Perishable food logistics hubs'
    ],
    specs: {
      shoreHardness: '65 Shore A (Soft Cold)',
      tensileStrength: '15.2 MPa',
      elongationAtBreak: '400%',
      lightTransmission: 'Clear Sub-Zero Form',
      fireRating: 'Self-Extinguishing Compound',
      uvResistance: 'Stabilized Grade',
      coldCrackTemp: '-40°C',
      soundReduction: 'Thermal Isolating'
    },
    badge: 'Cold Storage',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    imageUrl: '/assets/Screenshot 2026-08-16 214521.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214133.png'
  },
  'double-ribbed': {
    id: 'double-ribbed',
    name: 'Double-Ribbed Heavy Duty (Forklift Grade)',
    shortName: 'Double-Ribbed',
    tagline: 'Raised shock-absorbing ribs absorb forklift blade & pallet friction',
    colorHex: '#fbbf24',
    color3D: {
      color: 0xfde047,
      transmission: 0.88,
      opacity: 0.80,
      roughness: 0.12,
      metalness: 0.08,
      clearcoat: 0.98,
      ior: 1.54,
      ribbed: true,
      tint: 'rgba(251, 191, 36, 0.2)'
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
    badge: 'Heavy Traffic',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    imageUrl: '/assets/Screenshot 2026-08-16 214547.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214025.png'
  },
  'anti-static': {
    id: 'anti-static',
    name: 'Anti-Static ESD Controlled PVC',
    shortName: 'Anti-Static ESD',
    tagline: 'Surface dissipation helps prevent static discharge in electronics & cleanrooms',
    colorHex: '#10b981',
    color3D: {
      color: 0x6ee7b7,
      transmission: 0.89,
      opacity: 0.78,
      roughness: 0.1,
      metalness: 0.05,
      clearcoat: 0.92,
      ior: 1.51,
      tint: 'rgba(16, 185, 129, 0.2)'
    },
    temperatureRange: { min: -10, max: 50, unit: '°C' },
    thicknessOptions: [2, 3],
    widthOptions: [200, 300],
    keyFeatures: [
      'Surface static dissipative properties',
      'Helps prevent static electrical build-up in sensitive zones',
      'Smooth surface minimizes airborne dust adherence',
      'Suitable for electronic assembly and clean environment partitions',
      'High clarity for seamless line-of-sight across workstations'
    ],
    applications: [
      'Semiconductor & electronics assembly bays',
      'SMT circuit board production lines',
      'Data center aisle containment partitions',
      'Powder packaging & dust-sensitive labs'
    ],
    specs: {
      shoreHardness: '76 Shore A',
      tensileStrength: '16.8 MPa',
      elongationAtBreak: '360%',
      lightTransmission: 'Transparent Light Green Tint',
      fireRating: 'Self-Extinguishing Compound',
      uvResistance: 'Standard Indoor Grade',
      coldCrackTemp: '-10°C',
      soundReduction: 'Acoustic Partition'
    },
    badge: 'Cleanroom & SMT',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    imageUrl: '/assets/Screenshot 2026-08-16 214616.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214053.png'
  },
  'welding-safety': {
    id: 'welding-safety',
    name: 'Welding Flash Screen PVC',
    shortName: 'Welding Safety',
    tagline: 'Optical radiation and flash filtering barrier protecting surrounding personnel',
    colorHex: '#059669',
    color3D: {
      color: 0x064e3b,
      transmission: 0.45,
      opacity: 0.92,
      roughness: 0.2,
      metalness: 0.1,
      clearcoat: 0.8,
      ior: 1.55,
      tint: 'rgba(6, 78, 59, 0.75)'
    },
    temperatureRange: { min: -15, max: 60, unit: '°C' },
    thicknessOptions: [2, 3],
    widthOptions: [200, 300],
    keyFeatures: [
      'Filters hazardous arc flashes and UV/IR welding glare',
      'Flame retardant polymer formulation for hot grinding sparks',
      'Allows supervisors to safely observe operations through the dark tint',
      'Contains sparks and abrasive metal dust within the bay',
      'Available in dark green and safety bronze tints'
    ],
    applications: [
      'MIG, TIG & Arc welding enclosures & fabrication bays',
      'Robotic welding cell perimeters & laser cutting booths',
      'Metal grinding & abrasive spark containment zones',
      'Automotive bodyshop welding stations'
    ],
    specs: {
      shoreHardness: '78 Shore A',
      tensileStrength: '18.0 MPa',
      elongationAtBreak: '330%',
      lightTransmission: 'Translucent Safety Filter Tint',
      fireRating: 'Flame Retardant Compound',
      uvResistance: 'UV & Arc Flash Filter',
      coldCrackTemp: '-15°C',
      soundReduction: 'Noise Enclosure'
    },
    badge: 'Welding Protection',
    badgeColor: 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50',
    imageUrl: '/assets/Screenshot 2026-08-16 214608.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214148.png'
  },
  'anti-insect': {
    id: 'anti-insect',
    name: 'Anti-Insect Yellow PVC',
    shortName: 'Anti-Insect Amber',
    tagline: 'Yellow optical spectrum helps deter flying insects at open doorways',
    colorHex: '#eab308',
    color3D: {
      color: 0xfacc15,
      transmission: 0.85,
      opacity: 0.82,
      roughness: 0.1,
      metalness: 0.05,
      clearcoat: 0.9,
      ior: 1.52,
      tint: 'rgba(234, 179, 8, 0.4)'
    },
    temperatureRange: { min: -15, max: 50, unit: '°C' },
    thicknessOptions: [2, 3],
    widthOptions: [200, 300],
    keyFeatures: [
      'Yellow visual wavelength filters out insect-attracting light spectrum',
      'Provides a physical barrier against flying pests and drafts',
      'Maintains good visibility for personnel and equipment operators',
      'Smooth wipe-clean surface suitable for food environments',
      'Flexible and durable for high traffic kitchen & storage doors'
    ],
    applications: [
      'Food processing & bakery receiving docks',
      'Packaging & bottling facilities',
      'Commercial kitchen delivery doorways',
      'Agricultural packhouses & produce handling'
    ],
    specs: {
      shoreHardness: '77 Shore A',
      tensileStrength: '17.2 MPa',
      elongationAtBreak: '345%',
      lightTransmission: 'Transparent Amber Filter Tint',
      fireRating: 'Self-Extinguishing Compound',
      uvResistance: 'UV Stabilized Grade',
      coldCrackTemp: '-15°C',
      soundReduction: 'Thermal Barrier'
    },
    badge: 'Food Safe & HACCP',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    imageUrl: '/assets/Screenshot 2026-08-16 214531.png',
    realPhotoUrl: '/assets/Screenshot 2026-08-16 214252.png'
  }
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
      'Virgin compound without offensive odors',
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
  { label: 'Material Quality', value: '100% Virgin', detail: 'Consistent clarity & durability' },
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
    answer: "Yes, strips can be easily trimmed on-site using a sharp utility knife and a straight metal ruler. If strips stretch slightly over time and touch the floor, simply trim 10mm from the bottom edge. In typical indoor warehouse use, quality virgin PVC curtains last several years, with high-traffic center strips replaced as needed.",
    highlights: ['Trimmable on-site with utility knife', 'Individual center strip replacement saves cost', 'Long-life virgin polymer construction']
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
    answer: "Yes. Our standard clear, polar, and anti-insect PVC strips are manufactured from virgin compounds without hazardous heavy metals or recycled industrial contaminants. They are non-porous and can be washed regularly to maintain sanitation in food handling environments.",
    highlights: ['Virgin non-toxic compound', 'Smooth and easy to sanitize', 'Suitable for food and storage areas']
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
