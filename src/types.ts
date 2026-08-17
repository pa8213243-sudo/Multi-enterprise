export type PVCGrade = 
  // 12 Exact Factory Grades from PVC strip specs
  | 'transparent'
  | 'blue-natural'
  | 'standard-ribbed'
  | 'gray'
  | 'navy-blue'
  | 'white-opaque'
  | 'multi-red'
  | 'orange-amber'
  | 'sky-blue'
  | 'parrot-green'
  | 'lemon-yellow'
  | 'multi-green'
  // Legacy aliases for backward compatibility
  | 'standard-clear'
  | 'polar-freezer'
  | 'double-ribbed'
  | 'anti-static'
  | 'welding-safety'
  | 'anti-insect';

export type HardwareType = 
  | 'ss304-hook-track'
  | 'galvanized-hook-track'
  | 'sliding-track-system'
  | 'swivel-hinged-system';

export type OverlapOption = 33 | 50 | 66 | 100;
export type MountingType = 'face-wall' | 'under-lintel';

export interface ProductGradeInfo {
  id: PVCGrade;
  name: string;
  shortName: string;
  tagline: string;
  colorHex: string;
  color3D: {
    color: number;
    transmission: number;
    opacity: number;
    roughness: number;
    metalness: number;
    clearcoat: number;
    ior: number;
    ribbed?: boolean;
    tint?: string;
  };
  temperatureRange: {
    min: number;
    max: number;
    unit: '°C';
  };
  thicknessOptions: number[]; // mm
  widthOptions: number[]; // mm
  keyFeatures: string[];
  applications: string[];
  specs: {
    shoreHardness: string;
    tensileStrength: string;
    elongationAtBreak: string;
    lightTransmission: string;
    fireRating: string;
    uvResistance: string;
    coldCrackTemp: string;
    soundReduction: string;
  };
  badge: string;
  badgeColor: string;
  imageUrl?: string;
  realPhotoUrl?: string;
}

export interface CurtainConfiguration {
  width: number; // in mm or ft based on unit
  height: number;
  unit: 'metric' | 'imperial';
  grade: PVCGrade;
  stripWidth: number; // 200, 300, 400 mm
  stripThickness: number; // 2, 3, 4, 5 mm
  overlap: OverlapOption;
  hardware: HardwareType;
  mountingType: 'face-wall' | 'under-lintel';
  environment: 'cold-storage' | 'warehouse-forklift' | 'cleanroom' | 'welding' | 'food-prep' | 'general';
}

export interface ComputedQuote {
  totalWidthMm: number;
  totalHeightMm: number;
  stripCount: number;
  totalLengthMeters: number;
  curtainWeightKg: number;
  curtainAreaSqM: number;
  overlapPercentage: number;
  rValue: number;
  thermalEfficiencyPct: number;
  noiseReductionDb: number;
  estimatedHvacSavingsUsd: number;
  estimatedPriceUsd: number;
  hardwareParts: {
    trackLengthMeters: number;
    hookPlatePairs: number;
    fastenerCount: number;
  };
}

export interface IndustrySolution {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  imageAlt: string;
  challenge: string;
  solution: string;
  recommendedGrade: PVCGrade;
  kpis: { label: string; value: string; desc: string }[];
  keyBenefits: string[];
}
