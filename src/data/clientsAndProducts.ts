export interface FacilityProduct {
  id: string;
  name: string;
  category: 'Air & Climate' | 'Pest Control' | 'Hygiene & Automation' | 'Cleanroom & PPE' | 'Flooring & Safety' | 'Packaging & Material' | 'Waste & Sanitation';
  tagline: string;
  description: string;
  imageUrl: string;
  specs: string[];
  applications: string[];
  featured?: boolean;
}

export interface ClientCompany {
  id: string;
  name: string;
  subtext?: string;
  sector: 'Pharma & Biotech' | 'Food & Dairy' | 'Power & Energy' | 'Heavy Industry & Auto' | 'Hospitality & Luxury' | 'Ports & Logistics' | 'Entertainment & Real Estate';
  color: string;
  accent: string;
  city: string;
}

export interface CustomerShowcaseItem {
  id: string;
  clientName: string;
  sector: string;
  location: string;
  avatarUrl: string;
  facilityType: string;
  productInstalled: string;
  verifiedYear: string;
}

export const ALL_FACILITY_PRODUCTS: FacilityProduct[] = [
  {
    id: 'air-curtain',
    name: 'Industrial Air Curtain',
    category: 'Air & Climate',
    tagline: 'High-velocity atmospheric air barrier preventing temperature loss & flying insect entry',
    description: 'Centrifugal industrial air doors creating a continuous high-speed planar air seal over commercial and industrial doorways.',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=700&q=80',
    specs: ['Air Velocity: Up to 21 m/s', 'Door Widths: 900mm to 2000mm', 'Motor: Dual Shaft Heavy Duty', 'Noise Level: < 56 dB'],
    applications: ['Cold storage entry points', 'Supermarkets & malls', 'Pharmaceutical cleanrooms', 'Restaurant kitchens'],
    featured: true
  },
  {
    id: 'air-curtain-sensor',
    name: 'Air Curtain Sensor & Switch',
    category: 'Air & Climate',
    tagline: 'Automatic micro-switch & limit sensor activating airflow instantaneously upon door opening',
    description: 'Precision magnetic and roller-plunger door limit switches that trigger air curtain operation synchronously with door movement.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=80',
    specs: ['Sensor Type: Magnetic / Roller Limit', 'Contact Rating: 250V AC / 5A', 'Response Time: < 0.05s', 'Protection: IP65 Sealed'],
    applications: ['Sliding industrial doors', 'Automatic roller shutters', 'High-frequency traffic bays'],
    featured: false
  },
  {
    id: 'fly-insect-killer',
    name: 'Fly Insect Killer (UV Zap Grid)',
    category: 'Pest Control',
    tagline: 'High-voltage electric grid with specialized UVA attraction lamps for food & pharma safety',
    description: 'Stainless steel and powder-coated electronic insect light traps with high-voltage zap grids and removable collection trays.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80',
    specs: ['Lamps: 2x 15W / 2x 20W BL368 UV Tubes', 'Grid Voltage: 2500V - 3000V DC', 'Coverage Area: 80 - 150 sq meters', 'Body: Grade 304 SS / Epoxy Coated'],
    applications: ['Food processing plants', 'Pharma packaging rooms', 'Commercial kitchens', 'Packaging warehouses'],
    featured: true
  },
  {
    id: 'fly-catcher',
    name: 'Fly Catcher (Glue Board Trap)',
    category: 'Pest Control',
    tagline: 'Silent non-fragmenting sticky glue board trap meeting HACCP and FDA hygiene regulations',
    description: 'Zero-noise, non-shattering insect capture systems ideal for sensitive food preparation zones where electric zap grids are prohibited.',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=80',
    specs: ['Lamps: Shatterproof UVA Fluorescent', 'Trap Type: Non-drying UV-stable Glue Board', 'Compliance: HACCP & BRC Standard', 'Mounting: Wall Mounted / Suspended'],
    applications: ['Bakery & confectionery bays', 'Pharma manufacturing', 'Fine dining kitchens', 'Dairy bottling zones'],
    featured: false
  },
  {
    id: 'pp-corrugated-box',
    name: 'PP Corrugated Box & Crates',
    category: 'Packaging & Material',
    tagline: 'Reusable, water-resistant & lightweight polypropylene storage and transit boxes',
    description: 'High-impact polypropylene fluted hollow board containers designed for durable internal logistics, picking, and export packaging.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80',
    specs: ['Material: 100% Virgin Polypropylene', 'Thickness: 2mm to 8mm (250 - 1800 GSM)', 'Properties: 100% Waterproof, Oil Resistant', 'Customization: Partitioned, Foldable, Stackable'],
    applications: ['Automotive component transit', 'Electronics packaging', 'Pharma sample transport', 'Cold chain distribution'],
    featured: false
  },
  {
    id: 'rat-bait-station',
    name: 'Lockable Rat Bait Station',
    category: 'Pest Control',
    tagline: 'Tamper-resistant lockable rodent control stations for external facility perimeters',
    description: 'Heavy-duty impact-resistant polypropylene bait boxes engineered with key lock mechanisms to secure rodenticides safely.',
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=700&q=80',
    specs: ['Lock Mechanism: Dual Key Tamper-Proof', 'Material: UV Resistant Copolymer Polypropylene', 'Compartments: Dual feeding chamber + bait rod', 'Mounting: Wall or Floor Anchorable'],
    applications: ['Warehouse perimeters', 'Grain & food silos', 'Industrial factory borders', 'Commercial retail parks'],
    featured: false
  },
  {
    id: 'mouse-glue-board',
    name: 'Mouse Sticky Glue Board',
    category: 'Pest Control',
    tagline: 'Ultra-sticky non-toxic adhesive pads for rapid rodent capture without poisons',
    description: 'High-tack synthetic adhesive coated boards designed for immediate rodent containment in food-sensitive and pharma facilities.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80',
    specs: ['Adhesive: Non-drying, Non-flowing Polymer', 'Base: Heavy Duty Kraft Paper / Plastic Tray', 'Scent: Peanut / Banana attractant infused', 'Safety: 100% Non-Toxic & Pesticide Free'],
    applications: ['Sub-ceilings & cable ducts', 'Dry food storerooms', 'Cleanroom corridors', 'Supermarket shelves'],
    featured: false
  },
  {
    id: 'shoe-cover-dispenser',
    name: 'Automatic Shoe Cover Dispenser',
    category: 'Cleanroom & PPE',
    tagline: 'Hands-free automatic shoe cover applicator for sterile cleanroom entryways',
    description: 'Mechanical and motorized shoe booties dispensers allowing personnel to step and wrap shoes in seconds without bending or touching.',
    imageUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=700&q=80',
    specs: ['Mechanism: Mechanical T-clip / Motorized Sensor', 'Capacity: 50 to 100 shoe covers per load', 'Power: Non-electric / 220V rechargeable models', 'Footplate: Anti-slip reinforced tread'],
    applications: ['Pharmaceutical cleanrooms', 'Hospital ICUs & labs', 'Data centers & server rooms', 'Electronics assembly lines'],
    featured: true
  },
  {
    id: 'shoe-covers',
    name: 'Disposable Shoe Covers (CPE & Non-Woven)',
    category: 'Cleanroom & PPE',
    tagline: 'Elasticized protective shoe booties in CPE plastic and non-woven spunbond fabric',
    description: 'Heavy-duty non-slip embossed shoe overshoes preventing footwear dirt, contaminants, and moisture from entering controlled zones.',
    imageUrl: 'https://images.unsplash.com/photo-1584467735874-706f947bc4e9?auto=format&fit=crop&w=700&q=80',
    specs: ['Material: CPE Waterproof / Non-Woven PP (25-40 GSM)', 'Size: Universal 15x40 cm with dual elastic band', 'Texture: Diamond anti-skid embossed pattern', 'Packaging: 100 pcs/pack, vacuum sealed'],
    applications: ['Cleanroom Class 1000-100000', 'Medical diagnostics', 'Food processing lines', 'Real estate site visits'],
    featured: false
  },
  {
    id: 'brushes',
    name: 'Industrial Brushes & Door Bottom Seals',
    category: 'Packaging & Material',
    tagline: 'Custom strip, roller, disc, and door bottom brush seals for dust & draft blocking',
    description: 'High-density nylon, PP, brass, and stainless steel wire brushes designed for machinery cleaning, deburring, and doorway bottom draught sealing.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=700&q=80',
    specs: ['Bristle: Nylon 6.6 / Polypropylene / SS Wire', 'Profile: H & F Type Aluminum / PVC Holders', 'Length: Custom fabricated up to 3000mm', 'Durability: High fatigue and chemical resistance'],
    applications: ['Industrial door bottom seals', 'Conveyor belt cleaning', 'Machinery chip guards', 'Bottling plant conveyor guides'],
    featured: false
  },
  {
    id: 'anti-skid-tape',
    name: 'Heavy-Grit Anti Skid Tape',
    category: 'Flooring & Safety',
    tagline: 'High-traction mineral abrasive safety tape preventing slip-and-fall industrial accidents',
    description: 'Heavy-grit aluminum oxide coated safety grip tape with aggressive acrylic pressure-sensitive adhesive for stairs, ramps, and walkways.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80',
    specs: ['Grit: 60 / 80 Mesh Aluminum Oxide', 'Widths: 25mm, 50mm, 100mm, 150mm', 'Colors: Black, Yellow/Black Hazard, Clear, Photoluminescent', 'Adhesive: Waterproof solvent acrylic'],
    applications: ['Factory staircases & ramps', 'Forklift loading docks', 'Oil & wet work bays', 'Pedestrian walkways'],
    featured: false
  },
  {
    id: 'hand-dryer',
    name: 'Automatic High-Speed Hand Dryer',
    category: 'Hygiene & Automation',
    tagline: 'High-speed jet airflow sensor hand dryer with HEPA air filtration',
    description: 'Ultra-fast hygienic hand drying units utilizing brushless DC motors to dry hands in 7 to 10 seconds with low energy consumption.',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80',
    specs: ['Drying Time: 7 - 10 Seconds', 'Air Speed: 95 m/s Jet Blast', 'Power: 1200W - 1800W Intelligent Heating', 'Filtration: Dual Antibacterial HEPA Filter'],
    applications: ['Commercial washrooms', 'Pharma change rooms', 'Airport restrooms', 'Corporate offices'],
    featured: true
  },
  {
    id: 'soap-dispenser',
    name: 'Automatic Soap Dispenser (SS & ABS)',
    category: 'Hygiene & Automation',
    tagline: 'Grade 304 stainless steel and heavy ABS manual & sensor liquid soap dispensers',
    description: 'Durable anti-drip pump dispensers suitable for liquid soaps, foam formulations, and sanitizing solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-5975d6541f53?auto=format&fit=crop&w=700&q=80',
    specs: ['Capacity: 500ml / 1000ml Reservoir', 'Material: Grade 304 Satin SS / Impact ABS', 'Pump: Anti-clog, drip-free valve', 'Lock: Key lock security mechanism'],
    applications: ['Industrial wash stations', 'Hospital scrub rooms', 'Hotel & restaurant rest rooms', 'Educational institutes'],
    featured: false
  },
  {
    id: 'hand-gloves-type-1',
    name: 'Hand Gloves - Nitrile Examination',
    category: 'Cleanroom & PPE',
    tagline: 'Powder-free medical grade nitrile gloves offering exceptional tactile sensitivity & chemical resistance',
    description: '100% synthetic nitrile examination and industrial gloves free from natural rubber latex proteins to prevent allergic reactions.',
    imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=700&q=80',
    specs: ['Material: 100% Synthetic Nitrile', 'Thickness: 3.5 to 5.0 mil Palm', 'Finish: Micro-textured fingertips', 'Standard: ASTM D6319 & EN 455 Food Contact Safe'],
    applications: ['Chemical handling', 'Pharma manufacturing', 'Electronics assembly', 'Food handling'],
    featured: false
  },
  {
    id: 'hand-gloves-type-2',
    name: 'Hand Gloves - Latex & PE Disposable',
    category: 'Cleanroom & PPE',
    tagline: 'High-elasticity natural latex & lightweight poly gloves for hygienic processing',
    description: 'High-stretch protective gloves providing excellent comfort and barrier protection for general food prep, cleaning, and light packaging.',
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=700&q=80',
    specs: ['Material: Natural Rubber Latex / HDPE Poly', 'Powder: Powder-Free / Lightly Cornstarch Powdered', 'Elasticity: > 700% Elongation', 'Sizes: S, M, L, XL Available'],
    applications: ['Food packaging & dairy', 'Janitorial cleaning', 'Beauty & salon use', 'General material handling'],
    featured: false
  },
  {
    id: 'face-masks',
    name: 'Disposable Face Masks (3-Ply & N95)',
    category: 'Cleanroom & PPE',
    tagline: 'Ultrasonically welded 3-ply surgical masks with high BFE/PFE meltblown filter layer',
    description: 'Triple-layer non-woven respiratory masks with embedded malleable nose bridge strip and soft round ear loops for all-day comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=700&q=80',
    specs: ['Filtration: BFE ≥ 99%, PFE ≥ 98%', 'Structure: 25 GSM Spunbond + 25 GSM Meltblown + 25 GSM Spunbond', 'Ear Loop: Latex-free ultrasonic welded elastic', 'Standard: EN 14683 Type II / BIS ISI Certified'],
    applications: ['Cleanrooms & laboratories', 'Hospital & clinic environments', 'Food processing lines', 'Public industrial hubs'],
    featured: false
  },
  {
    id: 'head-caps',
    name: 'Disposable Head Cap (Bouffant & Mob)',
    category: 'Cleanroom & PPE',
    tagline: 'Lightweight breathable non-woven hairnets preventing loose hair contamination',
    description: 'Double-elastic pleated bouffant caps ensuring complete hair containment in hygienic production lines and cleanrooms.',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80',
    specs: ['Material: 10-14 GSM Virgin Polypropylene Spunbond', 'Size: 18", 21", 24" Expandable', 'Elastic: Dual elastic headband for secure grip', 'Breathability: High airflow, lint-free fabric'],
    applications: ['Pharma production bays', 'Catering & bakery lines', 'Electronics assembly', 'Hospital surgical suites'],
    featured: false
  },
  {
    id: 'fabricated-crates',
    name: 'Fabricated Crates & Storage Bins',
    category: 'Packaging & Material',
    tagline: 'High-density polyethylene (HDPE) stackable and nestable heavy-duty material crates',
    description: 'Rigid injection molded and custom fabricated storage crates with reinforced ribs for automated conveyor systems and warehouse stacking.',
    imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=700&q=80',
    specs: ['Material: Virgin HDPE / Copolymer PP', 'Load Capacity: 25 kg to 100 kg per crate', 'Features: Reinforced handles, label holders, dollies compatible', 'Temperature: Resists -30°C to +75°C'],
    applications: ['Automotive sub-assembly logistics', 'Agriculture & fresh produce', 'Retail logistics hubs', 'Cold room inventory'],
    featured: false
  },
  {
    id: 'wheel-dustbin',
    name: 'Heavy Duty Wheeled Dustbins',
    category: 'Waste & Sanitation',
    tagline: 'Commercial mobile waste bins with solid rubber wheels & foot-pedal opening',
    description: 'High-capacity outdoor and indoor wheeled refuse containers manufactured from UV-stabilized virgin high-density polyethylene.',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=80',
    specs: ['Capacity: 120L, 240L, 660L, 1100L', 'Material: UV-stabilized Virgin HDPE', 'Wheels: Solid heavy-duty rubber with steel axle', 'Compliance: EN 840 Standard Compliant'],
    applications: ['Factory floor waste management', 'Municipal recycling', 'Commercial complexes', 'Hospital bio-waste transport'],
    featured: true
  },
  {
    id: 'ld-pp-bag',
    name: 'Industrial LD & PP Poly Bags',
    category: 'Packaging & Material',
    tagline: 'High-strength low-density polyethylene & polypropylene bags for bulk packaging',
    description: 'Heavy gauge transparent and colored polymer bags, drum liners, and box liners ensuring moisture and dust barrier protection.',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=700&q=80',
    specs: ['Material: LDPE, LLDPE, PP (Virgin Grade)', 'Thickness: 25 to 200 Microns (100 - 800 Gauge)', 'Sealing: Heavy-duty bottom & side heat seals', 'Custom: Gusseted, anti-static, printed available'],
    applications: ['Chemical & resin packaging', 'Textile export bales', 'Pharma active ingredient liners', 'Food grain storage'],
    featured: false
  },
  {
    id: 'rubber-sheet',
    name: 'Industrial Rubber Sheets & Gaskets',
    category: 'Flooring & Safety',
    tagline: 'Natural rubber, Neoprene, Nitrile & EPDM sheets for gaskets, lining & vibration isolation',
    description: 'High-tensile vulcanized rubber sheeting engineered for mechanical abrasion resistance, oil resistance, and sound/vibration dampening.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=700&q=80',
    specs: ['Polymers: Natural Rubber, Nitrile (NBR), Neoprene, EPDM, Silicone', 'Thickness: 1.0mm to 25.0mm', 'Hardness: 50 to 80 Shore A', 'Temp Range: -40°C to +150°C (Polymer dependent)'],
    applications: ['Flange gaskets & seals', 'Machinery vibration damping pads', 'Workbench protective mats', 'Chute & hopper lining'],
    featured: false
  },
  {
    id: 'stretch-films',
    name: 'Industrial Stretch Film & Pallet Wrap',
    category: 'Packaging & Material',
    tagline: 'High-elongation cast & blown LLDPE stretch film for automated and manual pallet wrapping',
    description: 'Multi-layer co-extruded stretch film with high puncture resistance and strong cling, securing pallet loads during transit.',
    imageUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=700&q=80',
    specs: ['Material: Multi-Layer Co-extruded LLDPE', 'Thickness: 12, 17, 23, 29 Microns', 'Elongation: Up to 300% Pre-stretch capacity', 'Types: Hand Rolls / Machine Cast Rolls'],
    applications: ['Pallet unitization & wrapping', 'Export container bundling', 'Warehousing dust & moisture cover'],
    featured: false
  },
  {
    id: 'door-mats',
    name: 'Industrial Scraper Entrance Mats',
    category: 'Flooring & Safety',
    tagline: 'Heavy-duty scraper, coir, and polypropylene backed entrance mats for dirt & moisture interception',
    description: 'Commercial entrance carpet and scraper mats designed to scrub shoe soles and trap moisture at facility doorways.',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80',
    specs: ['Backing: Heavy Anti-Skid PVC / Nitrile Rubber', 'Surface: Polypropylene ribbed / loop pile / modular tile', 'Moisture Retention: Up to 4.5 Liters / sq m', 'Beveled Edges: ADA compliant anti-trip safety ramp'],
    applications: ['Office building lobbies', 'Factory entrance airlocks', 'Retail storefronts', 'Hotel receptions'],
    featured: false
  },
  {
    id: 'automatic-air-freshener',
    name: 'Automatic Fragrance Dispenser',
    category: 'Hygiene & Automation',
    tagline: 'Programmable micro-aerosol fragrance dispenser with day/night & interval timer',
    description: 'Battery-operated automatic fragrance dispensing units engineered with smart LCD/light sensor settings for continuous aroma control.',
    imageUrl: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=700&q=80',
    specs: ['Timer: 5, 10, 15, 30 min intervals', 'Sensors: Light sensor (24H / Day / Night)', 'Capacity: 300ml aerosol refill cans (~3000 sprays)', 'Battery: 2x AA / 2x D-Cell Alkaline'],
    applications: ['Executive washrooms', 'Corporate reception areas', 'Hotel corridors', 'Retail dressing rooms'],
    featured: false
  },
  {
    id: 'automatic-sanitizer-dispenser',
    name: 'Touchless Auto Sanitizer Dispenser',
    category: 'Hygiene & Automation',
    tagline: 'Infrared motion sensor hand sanitizer dispenser with spray & gel nozzles',
    description: 'Contactless wall-mounted and floor-stand sanitizer units ensuring 100% touchless hand disinfection at high-traffic checkpoints.',
    imageUrl: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=700&q=80',
    specs: ['Sensor: Infrared Induction (0.2s speed)', 'Capacity: 1000ml / 1200ml Refillable Tank', 'Dosage: 0.8ml - 1.2ml per activation', 'Power: 4x AA Batteries / DC 6V Adapter'],
    applications: ['Factory entry turnstiles', 'Hospital reception desks', 'Corporate lobbies', 'Cleanroom air showers'],
    featured: true
  },
  {
    id: 'tissue-paper-dispenser',
    name: 'Tissue Paper Dispenser (SS & ABS)',
    category: 'Hygiene & Automation',
    tagline: 'Heavy-gauge ABS & stainless steel single-sheet hand towel & toilet roll dispensers',
    description: 'Lockable hygienic paper dispensers engineered to dispense single sheets smoothly, reducing paper wastage and cross-contamination.',
    imageUrl: 'https://images.unsplash.com/photo-1584555613497-9ecf9dd06f68?auto=format&fit=crop&w=700&q=80',
    specs: ['Types: M-Fold / C-Fold Hand Towel & Jumbo Roll', 'Material: Impact Resistant ABS / Grade 304 SS', 'Capacity: 250 - 300 sheets / 9" Jumbo Roll', 'Viewing Window: Clear indicator for paper refill levels'],
    applications: ['Commercial washrooms', 'Industrial cafeteria hand-wash', 'Laboratory sink counters'],
    featured: false
  },
  {
    id: 'conveyor-belt',
    name: 'Industrial Conveyor Belts (PVC / PU)',
    category: 'Packaging & Material',
    tagline: 'Food-grade PU, anti-static PVC, and rough-top heavy-duty incline conveyor belting',
    description: 'Precision engineered conveyor belts with high tensile polyester carcass for food handling, logistics sorting, and production assembly.',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=700&q=80',
    specs: ['Materials: PVC, PU (Polyurethane), Rubber, Silicone', 'Thickness: 1.0mm to 10.0mm', 'Surface Patterns: Smooth, Diamond, Grip-Top, Cleated, Sidewall', 'Joints: Endless vulcanized or mechanical clipper lace'],
    applications: ['Food processing & bakery conveyors', 'Airport baggage handling', 'Warehouse sorting lines', 'Packaging automation'],
    featured: true
  },
  {
    id: 'clean-room-mat',
    name: 'Clean Room Sticky Tacky Mats',
    category: 'Cleanroom & PPE',
    tagline: 'Multi-layer numbered peel-off adhesive mats capturing fine particulate from shoe soles',
    description: '30-layer peel-off polyethylence tacky mats with water-based acrylic adhesive capturing foot and cart wheel particulate at critical entryways.',
    imageUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=700&q=80',
    specs: ['Layers: 30 Peelable Polyethylene Sheets per pad', 'Adhesive: Water-soluble acrylic tack (0.05mm sheet thickness)', 'Sizes: 24"x36", 26"x45", 36"x45"', 'Numbers: Corner numbered 1-30 for remaining sheet count'],
    applications: ['Cleanroom Class 10 - 100000', 'Semiconductor fabrication', 'Pharma sterile packaging suites', 'Hospital operating theatres'],
    featured: true
  },
  {
    id: 'electrical-rubber-mat',
    name: 'Electrical Safety Insulation Rubber Mat',
    category: 'Flooring & Safety',
    tagline: 'High-voltage insulation elastomer mats protecting technicians near electrical control panels',
    description: 'Certified electrical safety insulating mats engineered from specialized dielectric elastomer formulations to prevent electrocution hazards.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=80',
    specs: ['Voltage Classes: 3.3 kV (Class A), 11 kV (Class B), 33 kV (Class C)', 'Standard: IS 15652:2006 / IEC 61111', 'Surface: Anti-skid checkered or fluted design', 'Safety: Flame retardant, oil & acid resistant'],
    applications: ['HT / LT Electrical sub-stations', 'Switchgear & panel control rooms', 'Transformer yards', 'Generator rooms'],
    featured: true
  },
  {
    id: 'shoe-shining-machine',
    name: 'Automatic Dual Shoe Shining Machine',
    category: 'Hygiene & Automation',
    tagline: 'Dual-brush rotary shoe polisher with infrared auto-start sensor & cream dispenser',
    description: 'Heavy-duty motorized shoe cleaning and buffing machines equipped with soft woolen and hard bristle rotary brushes for executive facilities.',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80',
    specs: ['Motor: 100W Silent Induction Motor', 'Sensors: Infrared auto-start with 20s auto-stop', 'Brushes: 2x Woolen Buffing + 1x Cleaning Brush', 'Dispenser: Press-action neutral cream reservoir'],
    applications: ['Luxury hotel lobbies', 'Corporate headquarters', 'Executive clubhouses', 'Airport lounges'],
    featured: false
  },
  {
    id: 'uv-lamps',
    name: 'UV Germicidal Disinfection Lamps',
    category: 'Waste & Sanitation',
    tagline: 'Germicidal UVC 254nm quartz tubes for surface sterilization & insect light traps',
    description: 'High-output short-wave UVC germicidal tubes and UVA fly attraction tubes manufactured for sterile air/surface disinfection and insect traps.',
    imageUrl: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=700&q=80',
    specs: ['Wavelengths: 253.7nm (UVC Germicidal) / 368nm (UVA Insect Attractant)', 'Wattage: 15W, 30W, 36W, 55W', 'Glass: High-purity Quartz Glass / Shatterproof FEP coating', 'Lifespan: 8,000 - 10,000 Effective Hours'],
    applications: ['HVAC duct air disinfection', 'Water treatment plants', 'Cleanroom surface sterilizers', 'Insect light traps'],
    featured: false
  },
  {
    id: 'ss-dustbin',
    name: 'Stainless Steel 304 Waste Bins',
    category: 'Waste & Sanitation',
    tagline: 'Grade 304 satin finish heavy-gauge stainless steel push-can and pedal bins',
    description: 'Sleek, fire-resistant and corrosion-proof stainless steel waste bins designed for sterile medical suites, hotels, and corporate offices.',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=80',
    specs: ['Material: Grade 304 / Grade 201 Stainless Steel', 'Capacities: 10L, 20L, 30L, 50L, 80L', 'Types: Foot Pedal, Push Flap, Open Top, Swing Top', 'Finish: Fingerprint-proof satin / mirror polish'],
    applications: ['Hospitality & guest rooms', 'Pharma laboratory corridors', 'Executive boardroom pantries', 'Food court dining areas'],
    featured: false
  },
  {
    id: 'bio-hazard-dustbins',
    name: 'Bio-Hazard Color Coded Medical Bins',
    category: 'Waste & Sanitation',
    tagline: 'Color-coded biomedical waste bins (Yellow, Red, Blue, Black) with universal biohazard symbol',
    description: 'Foot-pedal operated color-coded infectious waste bins complying with Biomedical Waste Management Rules for segregated medical refuse.',
    imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=700&q=80',
    specs: ['Colors: Yellow (Infectious), Red (Plastics), Blue (Glass), Black (General)', 'Capacities: 30L, 45L, 60L, 80L Foot Pedal', 'Material: Virgin Polypropylene Autoclavable', 'Marking: High-visibility Biohazard Warning Graphic'],
    applications: ['Hospitals & clinics', 'Diagnostic laboratories', 'Blood banks & dialysis centers', 'Pharma R&D labs'],
    featured: true
  }
];

export const CLIENT_COMPANIES: ClientCompany[] = [
  {
    id: 'amul',
    name: 'Amul',
    subtext: 'The Taste of India',
    sector: 'Food & Dairy',
    color: '#E31E24',
    accent: '#FFF',
    city: 'Anand / Pan India'
  },
  {
    id: 'zydus',
    name: 'Zydus Lifesciences',
    subtext: 'Global Healthcare',
    sector: 'Pharma & Biotech',
    color: '#002B7F',
    accent: '#00A3E0',
    city: 'Ahmedabad'
  },
  {
    id: 'sun-pharma',
    name: 'Sun Pharma',
    subtext: 'Specialty Pharmaceuticals',
    sector: 'Pharma & Biotech',
    color: '#FF6600',
    accent: '#333',
    city: 'Mumbai / Vadodara'
  },
  {
    id: 'torrent-power',
    name: 'Torrent Power',
    subtext: 'Generation & Distribution',
    sector: 'Power & Energy',
    color: '#008080',
    accent: '#E65100',
    city: 'Ahmedabad / Surat'
  },
  {
    id: 'essar',
    name: 'Essar',
    subtext: 'Energy & Infrastructure',
    sector: 'Heavy Industry & Auto',
    color: '#E60000',
    accent: '#333',
    city: 'Hazira / Mumbai'
  },
  {
    id: 'torrent-pharma',
    name: 'Torrent Pharma',
    subtext: 'Therapeutic Formulations',
    sector: 'Pharma & Biotech',
    color: '#003366',
    accent: '#008080',
    city: 'Indrad / Ahmedabad'
  },
  {
    id: 'nirma',
    name: 'Nirma',
    subtext: 'Chemicals & Consumer Care',
    sector: 'Heavy Industry & Auto',
    color: '#D8232A',
    accent: '#FFD700',
    city: 'Ahmedabad'
  },
  {
    id: 'adani-ports',
    name: 'Adani Ports & SEZ',
    subtext: 'Ports & Logistics Gateway',
    sector: 'Ports & Logistics',
    color: '#8A2BE2',
    accent: '#005A9C',
    city: 'Mundra / Pan India'
  },
  {
    id: 'adani-power',
    name: 'Adani Power',
    subtext: 'Thermal & Solar Generation',
    sector: 'Power & Energy',
    color: '#007ACC',
    accent: '#00A859',
    city: 'Mundra / Ahmedabad'
  },
  {
    id: 'adani-energy',
    name: 'Adani Energy Solutions',
    subtext: 'Transmission & Distribution',
    sector: 'Power & Energy',
    color: '#005A9C',
    accent: '#8A2BE2',
    city: 'Pan India'
  },
  {
    id: 'tata-motors',
    name: 'Tata Motors',
    subtext: 'Commercial & Passenger Auto',
    sector: 'Heavy Industry & Auto',
    color: '#00529B',
    accent: '#0096D6',
    city: 'Sanand / Pune'
  },
  {
    id: 'ford',
    name: 'Ford',
    subtext: 'Automotive Engine Facility',
    sector: 'Heavy Industry & Auto',
    color: '#002C6C',
    accent: '#FFF',
    city: 'Sanand'
  },
  {
    id: 'intas',
    name: 'Intas Pharmaceuticals',
    subtext: 'Biotech & Sterile Injectables',
    sector: 'Pharma & Biotech',
    color: '#003399',
    accent: '#00A0D2',
    city: 'Matoda / Sanand'
  },
  {
    id: 'glenmark',
    name: 'Glenmark Pharmaceuticals',
    subtext: 'API & Formulation Plants',
    sector: 'Pharma & Biotech',
    color: '#E30613',
    accent: '#222',
    city: 'Ankleshwar / Mumbai'
  },
  {
    id: 'taj-hotels',
    name: 'Taj Hotels',
    subtext: 'Luxury Hospitality Kitchens',
    sector: 'Hospitality & Luxury',
    color: '#8B6508',
    accent: '#D4AF37',
    city: 'Pan India'
  },
  {
    id: 'hyatt',
    name: 'Hyatt Regency',
    subtext: 'Hospitality & Food Prep',
    sector: 'Hospitality & Luxury',
    color: '#005088',
    accent: '#FFF',
    city: 'Ahmedabad / Mumbai'
  },
  {
    id: 'reliance',
    name: 'Reliance Industries',
    subtext: 'Refining & Petrochemicals',
    sector: 'Heavy Industry & Auto',
    color: '#C41230',
    accent: '#1B365D',
    city: 'Jamnagar / Dahej'
  },
  {
    id: 'tata',
    name: 'Tata Group',
    subtext: 'Industrial & Manufacturing',
    sector: 'Heavy Industry & Auto',
    color: '#00539B',
    accent: '#0093D8',
    city: 'Pan India'
  },
  {
    id: 'pvr-cinemas',
    name: 'PVR INOX Cinemas',
    subtext: 'Entertainment Complexes',
    sector: 'Entertainment & Real Estate',
    color: '#FFB800',
    accent: '#000',
    city: 'Pan India'
  },
  {
    id: 'adani-realty',
    name: 'Adani Realty',
    subtext: 'Commercial & Industrial Real Estate',
    sector: 'Entertainment & Real Estate',
    color: '#005A9C',
    accent: '#7B2CBF',
    city: 'Ahmedabad / Mumbai'
  },
  {
    id: 'itc-hotels',
    name: 'ITC Hotels',
    subtext: 'Responsible Luxury & Culinary Hubs',
    sector: 'Hospitality & Luxury',
    color: '#6B4226',
    accent: '#D4AF37',
    city: 'Pan India'
  }
];

export const CUSTOMER_SHOWCASE_ITEMS: CustomerShowcaseItem[] = [
  {
    id: 'client-amul',
    clientName: 'Amul Dairy & Cold Chain Hub',
    sector: 'Dairy & Perishables',
    location: 'Anand, Gujarat',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    facilityType: 'Sub-Zero Dairy Storage & Packaging Airlock',
    productInstalled: 'Polar Low Temp PVC Strip Curtains & Air Curtains',
    verifiedYear: 'Partner Since 2004'
  },
  {
    id: 'client-zydus',
    clientName: 'Zydus Biotics & Formulation Plant',
    sector: 'Pharma & Biotech',
    location: 'Ahmedabad, Gujarat',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    facilityType: 'Class 1000 Cleanroom & Anti-Static Airlock',
    productInstalled: 'Anti-Static ESD Strip Curtains & Sticky Mats',
    verifiedYear: 'Partner Since 2008'
  },
  {
    id: 'client-sun-pharma',
    clientName: 'Sun Pharma API & Formulation Facility',
    sector: 'Pharmaceuticals',
    location: 'Vadodara Hub',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    facilityType: 'Sterile Packaging & Gowning Corridors',
    productInstalled: 'Standard Clear PVC & Touchless Sanitizer Dispensers',
    verifiedYear: 'Partner Since 2011'
  },
  {
    id: 'client-tata-motors',
    clientName: 'Tata Motors Manufacturing Complex',
    sector: 'Automotive & Heavy Industry',
    location: 'Sanand Automotive Zone',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    facilityType: 'Forklift High-Traffic Loading Bays & Welding Bays',
    productInstalled: 'Double-Ribbed Heavy Duty PVC & Welding Screens',
    verifiedYear: 'Partner Since 2012'
  },
  {
    id: 'client-adani-ports',
    clientName: 'Adani Ports & Special Economic Zone',
    sector: 'Port Logistics & Bulk Cargo',
    location: 'Mundra Port',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    facilityType: 'High-Clearance Container Freight Stations',
    productInstalled: 'Heavy Duty PVC Strip Doors & Electrical Insulating Mats',
    verifiedYear: 'Partner Since 2009'
  },
  {
    id: 'client-taj-itc',
    clientName: 'Taj & ITC Luxury Hospitality Hubs',
    sector: 'Hospitality & Food Processing',
    location: 'Pan India Commercial Hubs',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    facilityType: 'Commercial Central Kitchens & Cold Rooms',
    productInstalled: 'Anti-Insect Amber PVC Curtains & Fly Insect Killers',
    verifiedYear: 'Partner Since 2007'
  },
  {
    id: 'client-reliance',
    clientName: 'Reliance Industries Refining Complex',
    sector: 'Petrochemicals & Manufacturing',
    location: 'Jamnagar Hub',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    facilityType: 'Control Rooms & Warehouse Partition Airlocks',
    productInstalled: 'Heavy Gauge PVC Strip Doors & Anti-Skid Tapes',
    verifiedYear: 'Partner Since 2006'
  },
  {
    id: 'client-intas',
    clientName: 'Intas Pharmaceuticals Sterile Injectables',
    sector: 'Pharma & Biotech',
    location: 'Matoda SEZ',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    facilityType: 'Sterile Airlock Barriers & Shoe Change Zones',
    productInstalled: 'Cleanroom Grade PVC & Shoe Cover Dispensers',
    verifiedYear: 'Partner Since 2013'
  }
];
