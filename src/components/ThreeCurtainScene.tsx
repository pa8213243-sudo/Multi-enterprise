import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { PVCGrade, OverlapOption, HardwareType } from '../types';
import { PVC_GRADES } from '../data/products';
import { 
  Eye, 
  RotateCcw, 
  Truck, 
  Wind, 
  ThermometerSnowflake,
  ZoomIn,
  ZoomOut,
  Flame,
  Maximize2,
  Minimize2,
  Sliders,
  Layers,
  Sparkles
} from 'lucide-react';

interface ThreeCurtainSceneProps {
  grade?: PVCGrade;
  overlap?: OverlapOption;
  hardware?: HardwareType;
  stripCount?: number;
  thickness?: number;
  heightRatio?: number;
  interactive?: boolean;
  viewMode?: 'realistic' | 'thermal' | 'airflow';
  onViewModeChange?: (mode: 'realistic' | 'thermal' | 'airflow') => void;
  showControls?: boolean;
  className?: string;
  widthMm?: number;
  heightMm?: number;
  overlapPct?: number;
}

// Known Three.js texture property keys on materials
const TEXTURE_KEYS = [
  'map',
  'alphaMap',
  'aoMap',
  'bumpMap',
  'clearcoatMap',
  'clearcoatNormalMap',
  'clearcoatRoughnessMap',
  'displacementMap',
  'emissiveMap',
  'envMap',
  'gradientMap',
  'iridescenceMap',
  'iridescenceThicknessMap',
  'lightMap',
  'metalnessMap',
  'normalMap',
  'roughnessMap',
  'sheenColorMap',
  'sheenRoughnessMap',
  'specularColorMap',
  'specularIntensityMap',
  'specularMap',
  'thicknessMap',
  'transmissionMap',
] as const;

// Helper to dispose a single material and all associated texture maps
const disposeMaterial = (material: THREE.Material) => {
  const mat = material as unknown as Record<string, unknown>;
  for (const key of TEXTURE_KEYS) {
    const value = mat[key];
    if (value && typeof value === 'object' && 'dispose' in value && typeof (value as { dispose: () => void }).dispose === 'function') {
      (value as { dispose: () => void }).dispose();
    }
  }
  material.dispose();
};

// Helper to recursively dispose Three.js object hierarchy & GPU resources
const disposeHierarchy = (obj: THREE.Object3D | null) => {
  if (!obj) return;
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.Points || child instanceof THREE.LineSegments || child instanceof THREE.Line) {
      if (child.geometry) {
        child.geometry.dispose();
      }
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(disposeMaterial);
        } else {
          disposeMaterial(child.material);
        }
      }
    }
  });
};

// Helper to generate a procedural FLIR Ironbow / Thermographic gradient texture
const createFlirThermalTexture = (palette: 'ironbow' | 'rainbow' | 'ice' = 'ironbow'): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Thermal gradient from top (warm ambient room +35°C) to bottom (deep cold cryogenic -25°C)
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    if (palette === 'ironbow') {
      // High-precision FLIR Ironbow spectrum
      gradient.addColorStop(0.00, '#ffffff'); // Spot Hot (+35°C)
      gradient.addColorStop(0.12, '#ffe600'); // Yellow Thermal Radiance (+30°C)
      gradient.addColorStop(0.28, '#ff3b00'); // Red-Orange Heat (+25°C)
      gradient.addColorStop(0.48, '#d6006e'); // Magenta Boundary (+15°C)
      gradient.addColorStop(0.68, '#6c00ba'); // Violet Cold Transition (+0°C)
      gradient.addColorStop(0.85, '#0048ff'); // Deep Cold Blue (-15°C)
      gradient.addColorStop(1.00, '#00e1ff'); // Cryogenic Sub-Zero Cyan (-25°C)
    } else if (palette === 'ice') {
      gradient.addColorStop(0.00, '#e0f2fe');
      gradient.addColorStop(0.30, '#38bdf8');
      gradient.addColorStop(0.70, '#0369a1');
      gradient.addColorStop(1.00, '#082f49');
    } else {
      gradient.addColorStop(0.00, '#ff0000');
      gradient.addColorStop(0.25, '#ffff00');
      gradient.addColorStop(0.50, '#00ff00');
      gradient.addColorStop(0.75, '#00ffff');
      gradient.addColorStop(1.00, '#0000ff');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 512);

    // Isotherm Contour Scanlines (FLIR camera sensor simulation)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let y = 32; y < 512; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y);
      ctx.stroke();
    }

    // Micro-scanline noise
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    for (let y = 0; y < 512; y += 3) {
      ctx.fillRect(0, y, 256, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
};

export const ThreeCurtainScene: React.FC<ThreeCurtainSceneProps> = ({
  grade = 'standard-clear',
  overlap = 50,
  hardware = 'ss304-hook-track',
  stripCount = 7,
  thickness = 2,
  heightRatio = 1.4,
  interactive = true,
  viewMode: controlledViewMode,
  onViewModeChange,
  showControls = true,
  className = 'w-full h-[540px] sm:h-[600px]',
  widthMm,
  heightMm,
  overlapPct
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalViewMode, setInternalViewMode] = useState<'realistic' | 'thermal' | 'airflow'>('realistic');

  // Keep internal state synchronized if controlled prop updates
  useEffect(() => {
    if (controlledViewMode) {
      setInternalViewMode(controlledViewMode);
    }
  }, [controlledViewMode]);

  // Active view mode uses internal view mode as source of truth for local button clicks
  const activeViewMode = internalViewMode;

  const [isSimulatingForklift, setIsSimulatingForklift] = useState(false);
  const [cameraAngle, setCameraAngle] = useState<'front' | 'side' | 'isometric' | 'top'>('isometric');
  const [thermalPalette, setThermalPalette] = useState<'ironbow' | 'rainbow' | 'ice'>('ironbow');

  // Three.js internal persistent references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const masterGroupRef = useRef<THREE.Group | null>(null);
  const stripsGroupRef = useRef<THREE.Group | null>(null);
  const hardwareGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const thermalTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const stripMeshesRef = useRef<{ mesh: THREE.Group; phase: number; vel: number }[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Touch gesture & Mouse Orbit References - calibrated for comfortable doorway framing
  const isInteracting = useRef<boolean>(false);
  const lastTouchPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartDist = useRef<number>(0);

  const targetRotation = useRef<{ x: number; y: number }>({ x: 0.10, y: -0.18 });
  const currentRotation = useRef<{ x: number; y: number }>({ x: 0.10, y: -0.18 });
  const targetZoom = useRef<number>(6.2);
  const currentZoom = useRef<number>(6.2);

  const [isExpanded, setIsExpanded] = useState(false);
  const effectiveOverlap = overlapPct || overlap;
  const isMultiGreen = grade === 'multi-green';

  // Smoothly adjust camera zoom and viewport when expanded in-place
  useEffect(() => {
    targetZoom.current = isExpanded ? 5.6 : 6.2;
    const timer = setTimeout(() => {
      if (containerRef.current && rendererRef.current && cameraRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        if (w > 0 && h > 0) {
          cameraRef.current.aspect = w / h;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(w, h);
        }
      }
    }, 180);
    return () => clearTimeout(timer);
  }, [isExpanded]);

  // Memoize heavy grade data computations
  const currentGradeData = useMemo(() => {
    return PVC_GRADES[grade] || PVC_GRADES['standard-clear'];
  }, [grade]);

  // Memoize geometry layout dimensions - dynamically reactive to doorway width & height sliders
  const curtainLayout = useMemo(() => {
    const count = Math.min(Math.max(stripCount || 7, 3), 45);
    const targetWidth = Math.min(3.2, Math.max(1.6, count * 0.16));
    const stripW = Math.max(0.18, Math.min(0.40, (targetWidth / count) * 1.55));
    // Safe overlap step calculation preventing 0 division or excessive overlap
    const overlapRatio = Math.min(Math.max(effectiveOverlap, 0), 100);
    const overlapStep = (stripW * (100 - (overlapRatio >= 100 ? 50 : overlapRatio / 1.5))) / 100;
    const totalCurtainWidth = (count - 1) * overlapStep;

    // Dynamically scale strip height in 3D in real-time as user changes Clear Opening Height slider (1800mm to 6000mm)
    const heightFactor = heightMm ? (heightMm / 2400) : (heightRatio || 1.4);
    const stripH = 2.1 * Math.min(Math.max(heightFactor, 0.70), 2.70);

    // Dynamic visual thickness depth based on thickness prop (1.5mm -> 0.012, 2mm -> 0.020, 3mm -> 0.036, 4mm -> 0.054)
    const thicknessMm = thickness || 2;
    const stripD = Math.max(0.010, Math.min(0.060, (thicknessMm / 2) * 0.022));

    return { stripW, stripH, stripD, overlapStep, totalCurtainWidth, count, thicknessMm };
  }, [heightMm, heightRatio, effectiveOverlap, stripCount, thickness]);

  const setViewMode = useCallback((mode: 'realistic' | 'thermal' | 'airflow') => {
    setInternalViewMode(mode);
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  }, [onViewModeChange]);

  // Trigger Forklift Drive-Through Animation
  const triggerForkliftPass = useCallback(() => {
    if (isSimulatingForklift) return;
    setIsSimulatingForklift(true);

    const strips = stripMeshesRef.current;
    strips.forEach((strip, index) => {
      const mid = strips.length / 2;
      const distFromCenter = index - mid;
      const direction = distFromCenter < 0 ? -1 : 1;
      const intensity = Math.max(0.3, 1 - Math.abs(distFromCenter) / mid);

      setTimeout(() => {
        strip.vel += direction * 1.25 * intensity;
      }, Math.abs(distFromCenter) * 80);
    });

    setTimeout(() => {
      setIsSimulatingForklift(false);
    }, 2800);
  }, [isSimulatingForklift]);

  // Camera preset controls
  const handleCameraPreset = useCallback((preset: 'front' | 'side' | 'isometric' | 'top') => {
    setCameraAngle(preset);
    if (preset === 'front') {
      targetRotation.current = { x: 0.0, y: 0.0 };
      targetZoom.current = 6.0;
    } else if (preset === 'side') {
      targetRotation.current = { x: 0.05, y: -Math.PI / 3.0 };
      targetZoom.current = 6.3;
    } else if (preset === 'isometric') {
      targetRotation.current = { x: 0.10, y: -0.18 };
      targetZoom.current = 6.2;
    } else if (preset === 'top') {
      targetRotation.current = { x: 0.55, y: -0.15 };
      targetZoom.current = 6.0;
    }
  }, []);

  const handleZoom = useCallback((delta: number) => {
    targetZoom.current = Math.max(2.0, Math.min(6.5, targetZoom.current + delta));
  }, []);

  // --- Step 1: Initialize WebGL Context, Renderer, Scene, Camera & Render Loop ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 540;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.26;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- High-End Studio 3-Point Lighting for Razor-Sharp Specular Highlights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    // Key Light: Overhead top-front studio light casting crisp glossy specular highlights
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Warm Fill Light: Soft ambient bounce bringing out rich polymer color
    const fillLight = new THREE.DirectionalLight(0xffedd5, 1.3);
    fillLight.position.set(-6, 4, -3);
    scene.add(fillLight);

    // Center Focus Spotlight: Highlighting stainless steel track & strip overlap
    const centerSpot = new THREE.PointLight(0x0077ed, 2.2, 14);
    centerSpot.position.set(0, 3.2, 2.4);
    scene.add(centerSpot);

    // Rim Backlight: Electric blue/cyan edge glow outlining the translucent strips
    const cyanRimLight = new THREE.PointLight(0x38bdf8, 2.0, 12);
    cyanRimLight.position.set(0, -1.2, 3.2);
    scene.add(cyanRimLight);

    // Top Rim Specular: Gleam on stainless steel rail track
    const topGleam = new THREE.PointLight(0xffffff, 1.8, 8);
    topGleam.position.set(0, 2.0, -1.0);
    scene.add(topGleam);

    // Subtle Industrial Floor Grid
    const gridHelper = new THREE.GridHelper(12, 24, 0x475569, 0x1e293b);
    gridHelper.position.y = -2.0;
    scene.add(gridHelper);

    // Master Transformation Groups
    const masterGroup = new THREE.Group();
    masterGroup.position.y = -0.18; // Slight downward offset so top track is never obstructed by HUD
    scene.add(masterGroup);
    masterGroupRef.current = masterGroup;

    const stripsGroup = new THREE.Group();
    masterGroup.add(stripsGroup);
    stripsGroupRef.current = stripsGroup;

    const hardwareGroup = new THREE.Group();
    masterGroup.add(hardwareGroup);
    hardwareGroupRef.current = hardwareGroup;

    // Visibility Observer
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
      } else if (container) {
        const rect = container.getBoundingClientRect();
        isVisibleRef.current = rect.top < window.innerHeight && rect.bottom > 0;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // --- High-Performance Animation Loop ---
    let time = 0;
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      time += 0.02;

      // Smooth camera orbit interpolation
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.1;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.1;
      currentZoom.current += (targetZoom.current - currentZoom.current) * 0.1;

      if (masterGroupRef.current) {
        masterGroupRef.current.rotation.x = currentRotation.current.x;
        masterGroupRef.current.rotation.y = currentRotation.current.y;
      }

      if (cameraRef.current) {
        cameraRef.current.position.z = currentZoom.current;
      }

      // Dynamic Strip Physics & Natural Harmonic Oscillation
      const strips = stripMeshesRef.current;
      const stripLen = strips.length;
      for (let s = 0; s < stripLen; s++) {
        const item = strips[s];
        
        let targetAngle = 0;
        let springK = 0.085;
        let damping = 0.92;

        if (activeViewMode === 'airflow') {
          // Wind pressure causes aerodynamic deflection and high-frequency flutter
          const windTurbulence = Math.sin(time * 4.2 + item.phase * 2) * 0.035;
          const constantDraftPressure = -0.05; // slight backward lean under airflow
          targetAngle = constantDraftPressure + windTurbulence;
          springK = 0.12;
          damping = 0.88;
        } else {
          // Realistic / Thermal ambient breeze
          const ambientBreeze = Math.sin(time * 1.6 + item.phase) * 0.025;
          targetAngle = ambientBreeze;
        }

        const force = (targetAngle - item.mesh.rotation.x) * springK;
        item.vel = (item.vel + force) * damping;
        item.mesh.rotation.x += item.vel;
        item.mesh.rotation.z = Math.cos(time * 1.3 + item.phase) * 0.008;
      }

      // Dynamic Particle Flow (Thermal Convection vs CFD Streamline Deflection)
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position?.array as Float32Array;
        if (positions) {
          const pLen = positions.length / 3;

          for (let p = 0; p < pLen; p++) {
            const idxX = p * 3;
            const idxY = p * 3 + 1;
            const idxZ = p * 3 + 2;

            if (activeViewMode === 'thermal') {
              // Warm Convection (z > 0): Moves towards doorway, rises upward on contacting curtain barrier
              if (positions[idxZ] > 0) {
                positions[idxZ] -= 0.025; // drift toward barrier
                if (positions[idxZ] <= 0.3) {
                  // Thermal buoyant rise
                  positions[idxY] += 0.04;
                  positions[idxX] += (positions[idxX] > 0 ? 0.02 : -0.02);
                }
              } else {
                // Cold Cryogenic Air (z < 0): Pools downward at the floor, moves sluggishly
                positions[idxY] -= 0.015;
                positions[idxZ] -= 0.008;
              }

              // Reset thermal particles
              if (positions[idxY] > 3.2 || positions[idxY] < -2.4 || positions[idxZ] < -2.8 || positions[idxZ] > 3.2) {
                const isWarmZone = Math.random() > 0.4;
                if (isWarmZone) {
                  positions[idxX] = (Math.random() - 0.5) * 4.0;
                  positions[idxY] = (Math.random() - 0.5) * 2.0 - 0.5;
                  positions[idxZ] = 1.2 + Math.random() * 1.8;
                } else {
                  positions[idxX] = (Math.random() - 0.5) * 3.6;
                  positions[idxY] = Math.random() * 1.5;
                  positions[idxZ] = -0.4 - Math.random() * 1.8;
                }
              }
            } else if (activeViewMode === 'airflow') {
              // CFD Airflow Streamline: High velocity approach along Z
              positions[idxZ] -= 0.065;

              // Collision with PVC Curtain Barrier at z ≈ 0
              if (positions[idxZ] <= 0.35 && positions[idxZ] >= -0.1) {
                const xVal = positions[idxX];
                // Turbulent deflection curl around the doorway perimeter
                positions[idxX] += (xVal >= 0 ? 0.06 : -0.06);
                positions[idxY] += (Math.random() - 0.2) * 0.045;
              }

              // Reset out-of-bound streamlines
              if (positions[idxZ] < -2.2 || Math.abs(positions[idxX]) > 3.6 || positions[idxY] > 3.2) {
                positions[idxX] = (Math.random() - 0.5) * 4.2;
                positions[idxY] = (Math.random() - 0.5) * 2.8;
                positions[idxZ] = 2.4 + Math.random() * 1.6;
              }
            }
          }
          particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // --- Dynamic Resize Handler ---
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // --- Mobile Touch Gestures & Mouse Orbit Handlers ---
    const handlePointerDown = (e: PointerEvent) => {
      isInteracting.current = true;
      lastTouchPos.current = { x: e.clientX, y: e.clientY };
      try {
        (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
      } catch {
        // Safe fallback
      }

      // Tap on curtain strip imparts physical swing deflection
      if (container && stripMeshesRef.current.length > 0) {
        const rect = container.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width;
        const stripIdx = Math.floor(normX * stripMeshesRef.current.length);
        if (stripMeshesRef.current[stripIdx]) {
          stripMeshesRef.current[stripIdx].vel += (Math.random() - 0.5) * 0.8;
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isInteracting.current) return;
      const deltaX = e.clientX - lastTouchPos.current.x;
      const deltaY = e.clientY - lastTouchPos.current.y;
      lastTouchPos.current = { x: e.clientX, y: e.clientY };

      targetRotation.current.y += deltaX * 0.008;
      targetRotation.current.x = Math.max(-0.4, Math.min(0.8, targetRotation.current.x + deltaY * 0.008));

      // Dragging across strips imparts natural physics wave
      if (container && Math.abs(deltaX) > 2 && stripMeshesRef.current.length > 0) {
        const rect = container.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width;
        const stripIdx = Math.floor(normX * stripMeshesRef.current.length);
        if (stripMeshesRef.current[stripIdx]) {
          stripMeshesRef.current[stripIdx].vel += deltaX * 0.04;
        }
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      isInteracting.current = false;
      try {
        (e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId);
      } catch {
        // Safe fallback
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom.current = Math.max(2.0, Math.min(6.5, targetZoom.current + e.deltaY * 0.003));
    };

    // Mobile two-finger pinch-to-zoom support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist.current = Math.hypot(dx, dy);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        if (touchStartDist.current > 0) {
          const delta = (touchStartDist.current - dist) * 0.012;
          targetZoom.current = Math.max(2.0, Math.min(6.5, targetZoom.current + delta));
        }
        touchStartDist.current = dist;
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });
    dom.addEventListener('touchstart', handleTouchStart, { passive: true });
    dom.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Cleanup
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      dom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      dom.removeEventListener('wheel', handleWheel);
      dom.removeEventListener('touchstart', handleTouchStart);
      dom.removeEventListener('touchmove', handleTouchMove);

      if (gridHelper.geometry) gridHelper.geometry.dispose();
      if (Array.isArray(gridHelper.material)) {
        gridHelper.material.forEach(disposeMaterial);
      } else if (gridHelper.material) {
        disposeMaterial(gridHelper.material);
      }

      if (thermalTextureRef.current) {
        thermalTextureRef.current.dispose();
        thermalTextureRef.current = null;
      }

      if (sceneRef.current) {
        disposeHierarchy(sceneRef.current);
        sceneRef.current.clear();
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
      }

      if (container) {
        container.innerHTML = '';
      }

      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      masterGroupRef.current = null;
      stripsGroupRef.current = null;
      hardwareGroupRef.current = null;
      particlesRef.current = null;
      stripMeshesRef.current = [];
    };
  }, []);

  // --- Step 2: Rebuild Curtain Meshes & Shaders on parameter updates without destroying canvas context ---
  useEffect(() => {
    const hardwareGroup = hardwareGroupRef.current;
    const stripsGroup = stripsGroupRef.current;
    const masterGroup = masterGroupRef.current;
    if (!hardwareGroup || !stripsGroup || !masterGroup) return;

    // Clean up previous objects in groups
    disposeHierarchy(hardwareGroup);
    disposeHierarchy(stripsGroup);
    if (particlesRef.current) {
      masterGroup.remove(particlesRef.current);
      disposeHierarchy(particlesRef.current);
      particlesRef.current = null;
    }
    hardwareGroup.clear();
    stripsGroup.clear();
    stripMeshesRef.current = [];

    // --- Build Hardware Track ---
    const { stripW, stripH, stripD, overlapStep, totalCurtainWidth } = curtainLayout;
    const railLength = Math.max(totalCurtainWidth + stripW * 1.5, 3.2);

    const railGeo = new THREE.BoxGeometry(railLength, 0.12, 0.08);
    const isStainless = hardware === 'ss304-hook-track';
    const railMat = new THREE.MeshStandardMaterial({
      color: isStainless ? 0xf1f5f9 : 0xa1a1aa,
      metalness: isStainless ? 0.98 : 0.80,
      roughness: isStainless ? 0.15 : 0.40,
      envMapIntensity: 2.0
    });
    const railMesh = new THREE.Mesh(railGeo, railMat);
    railMesh.position.set(0, stripH / 2 + 0.06, 0);
    railMesh.castShadow = true;
    railMesh.receiveShadow = true;
    hardwareGroup.add(railMesh);

    // Wall Mount Bracket Caps
    const bracketGeo = new THREE.BoxGeometry(0.14, 0.22, 0.18);
    const bracketMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.85,
      roughness: 0.25
    });
    const leftBracket = new THREE.Mesh(bracketGeo, bracketMat);
    leftBracket.position.set(-railLength / 2 + 0.07, stripH / 2 + 0.06, 0.05);
    const rightBracket = new THREE.Mesh(bracketGeo, bracketMat);
    rightBracket.position.set(railLength / 2 - 0.07, stripH / 2 + 0.06, 0.05);
    hardwareGroup.add(leftBracket, rightBracket);

    // Hanging Teeth / Prongs on Track
    const prongGeo = new THREE.BoxGeometry(0.022, 0.06, 0.06);
    const prongMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.98,
      roughness: 0.12
    });
    const prongCount = Math.floor(railLength / 0.12);
    for (let p = 0; p < prongCount; p++) {
      const pMesh = new THREE.Mesh(prongGeo, prongMat);
      pMesh.position.set(-railLength / 2 + 0.12 + p * 0.12, stripH / 2 + 0.02, 0.04);
      hardwareGroup.add(pMesh);
    }

    // --- Prepare PVC Materials based on View Mode ---
    let stripMaterial: THREE.Material;

    if (activeViewMode === 'thermal') {
      if (thermalTextureRef.current) {
        thermalTextureRef.current.dispose();
      }
      const thermalTex = createFlirThermalTexture(thermalPalette);
      thermalTextureRef.current = thermalTex;

      stripMaterial = new THREE.MeshStandardMaterial({
        map: thermalTex,
        emissiveMap: thermalTex,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.95,
        roughness: 0.25,
        metalness: 0.05,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide
      });
    } else if (activeViewMode === 'airflow') {
      stripMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x0ea5e9),
        emissive: new THREE.Color(0x0284c7),
        emissiveIntensity: 0.40,
        transmission: 0.72,
        opacity: 0.88,
        transparent: true,
        roughness: 0.06,
        metalness: 0.03,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        ior: 1.52,
        side: THREE.DoubleSide
      });
    } else {
      // Ultra-Realistic Physical Polymer Shader with Crystal-Clear Specularity
      const color3d = currentGradeData.color3D;
      const isMultiGreenGrade = grade === 'multi-green';
      const isOpaqueGrade = grade === 'white-opaque' || grade === 'gray' || grade === 'navy-blue';

      stripMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(isMultiGreenGrade ? 0x008037 : color3d.color),
        transmission: isOpaqueGrade ? 0.05 : (isMultiGreenGrade ? 0.72 : Math.max(0.85, color3d.transmission)),
        opacity: isOpaqueGrade ? 0.98 : (isMultiGreenGrade ? 0.92 : color3d.opacity),
        transparent: true,
        roughness: isMultiGreenGrade ? 0.08 : 0.04,
        metalness: 0.02,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
        ior: isMultiGreenGrade ? 1.54 : 1.52,
        reflectivity: 0.92,
        attenuationColor: new THREE.Color(color3d.color),
        attenuationDistance: 1.2,
        specularIntensity: 1.2,
        specularColor: new THREE.Color(0xffffff),
        side: THREE.DoubleSide,
        depthWrite: false
      });
    }

    // Adapt 3D background color for Multi Green vs Standard
    const isMultiGreenGrade = grade === 'multi-green';
    if (rendererRef.current) {
      rendererRef.current.setClearColor(isMultiGreenGrade ? 0xffffff : 0x000000, isMultiGreenGrade ? 1 : 0);
    }
    if (sceneRef.current) {
      sceneRef.current.background = isMultiGreenGrade ? new THREE.Color(0xfcfbf8) : null;
    }

    // --- Build Strip Assemblies with Hinge Pivots ---
    const startX = -totalCurtainWidth / 2;
    const stripGeo = new THREE.BoxGeometry(stripW, stripH, stripD, 4, 16, 1);

    const clampGeo = new THREE.BoxGeometry(stripW * 0.94, 0.14, stripD * 2.4);
    const clampMat = new THREE.MeshStandardMaterial({
      color: isStainless ? 0xe2e8f0 : 0xb0b0b8,
      metalness: 0.96,
      roughness: 0.18
    });

    const rivetGeo = new THREE.CylinderGeometry(0.015, 0.015, stripD * 2.8, 12);
    rivetGeo.rotateX(Math.PI / 2);
    const rivetMat = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      metalness: 1.0, 
      roughness: 0.08 
    });

    for (let i = 0; i < curtainLayout.count; i++) {
      const stripPivot = new THREE.Group();
      const xPos = startX + i * overlapStep;
      const zLayer = (i % 2 === 0 ? 0 : 0.025) + (Math.sin(i) * 0.002);
      stripPivot.position.set(xPos, stripH / 2, zLayer);

      const stripMesh = new THREE.Mesh(stripGeo, stripMaterial);
      stripMesh.position.set(0, -stripH / 2, 0);
      stripMesh.castShadow = true;
      stripMesh.receiveShadow = true;
      stripPivot.add(stripMesh);

      // Top Mounting Clamp Plate
      const clampMesh = new THREE.Mesh(clampGeo, clampMat);
      clampMesh.position.set(0, -0.07, 0);
      clampMesh.castShadow = true;
      stripPivot.add(clampMesh);

      // Fastener Rivets
      const rivet1 = new THREE.Mesh(rivetGeo, rivetMat);
      rivet1.position.set(-stripW * 0.25, -0.07, 0);
      const rivet2 = new THREE.Mesh(rivetGeo, rivetMat);
      rivet2.position.set(stripW * 0.25, -0.07, 0);
      stripPivot.add(rivet1, rivet2);

      stripsGroup.add(stripPivot);
      stripMeshesRef.current.push({
        mesh: stripPivot,
        phase: i * 0.35 + Math.random() * 0.2,
        vel: 0
      });
    }

    // --- Build Airflow / Thermal Particle System ---
    if (activeViewMode === 'thermal' || activeViewMode === 'airflow') {
      const particleCount = activeViewMode === 'thermal' ? 280 : 380;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(particleCount * 3);
      const pColors = new Float32Array(particleCount * 3);

      for (let p = 0; p < particleCount; p++) {
        pPos[p * 3] = (Math.random() - 0.5) * 4.0;
        pPos[p * 3 + 1] = (Math.random() - 0.5) * 3.0;
        pPos[p * 3 + 2] = (Math.random() - 0.5) * 4.5;

        if (activeViewMode === 'thermal') {
          // Warm red/orange particles in front (z > 0), cold cryogenic blue behind (z < 0)
          if (pPos[p * 3 + 2] > 0) {
            pColors[p * 3] = 1.0;
            pColors[p * 3 + 1] = 0.35 + Math.random() * 0.3;
            pColors[p * 3 + 2] = 0.1;
          } else {
            pColors[p * 3] = 0.1;
            pColors[p * 3 + 1] = 0.75 + Math.random() * 0.25;
            pColors[p * 3 + 2] = 1.0;
          }
        } else {
          // CFD Streamlines: Cyan / Sky Blue streamlines
          pColors[p * 3] = 0.05 + Math.random() * 0.2;
          pColors[p * 3 + 1] = 0.75 + Math.random() * 0.25;
          pColors[p * 3 + 2] = 1.0;
        }
      }

      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

      const pMat = new THREE.PointsMaterial({
        size: activeViewMode === 'thermal' ? 0.065 : 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const particleSystem = new THREE.Points(pGeo, pMat);
      masterGroup.add(particleSystem);
      particlesRef.current = particleSystem;
    }
  }, [curtainLayout, hardware, activeViewMode, currentGradeData, thermalPalette, grade]);

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Black 3D WebGL Canvas Viewport (100% Unobstructed at Bottom) */}
      <div 
        className={`relative overflow-hidden shadow-2xl transition-all duration-500 ease-in-out ${
          isMultiGreen 
            ? 'bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F5] to-[#F1ECE1] border-2 border-emerald-600/30' 
            : 'bg-gradient-to-b from-[#0F1013] via-[#0A0A0C] to-[#080809] border border-[#E2DDD2]'
        } rounded-2xl ${
          isExpanded 
            ? 'w-full h-[560px] sm:h-[620px] lg:h-[660px]' 
            : className
        }`}
      >
        {/* 3D WebGL Canvas Injection Container */}
        <div 
          ref={containerRef} 
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
          title="Click and drag to rotate in 3D • Pinch to zoom"
        />

        {/* Top Floating HUD: View Mode Switcher & In-Place Height Expand (Pinned to Top Edge) */}
        {showControls && (
          <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none gap-2">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center flex-nowrap gap-1 bg-[#FAF8F5]/95 backdrop-blur-md p-1 rounded-xl border border-[#D8D2C5] shadow-xl pointer-events-auto">
              <button
                type="button"
                onClick={() => setViewMode('realistic')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] sm:text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeViewMode === 'realistic'
                    ? 'bg-[#0077ED] text-white shadow-[0_0_12px_rgba(0,119,237,0.5)]'
                    : 'text-[#475569] hover:text-[#0077ED] hover:bg-[#F4EFE6]'
                }`}
              >
                <Eye className="w-3.5 h-3.5 flex-shrink-0" />
                <span>3D Polymer</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('thermal')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] sm:text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeViewMode === 'thermal'
                    ? 'bg-rose-600 text-white shadow-[0_0_12px_rgba(225,29,72,0.6)]'
                    : 'text-[#475569] hover:text-[#0077ED] hover:bg-[#F4EFE6]'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                <span>FLIR Thermal</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('airflow')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] sm:text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeViewMode === 'airflow'
                    ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(8,145,178,0.6)]'
                    : 'text-[#475569] hover:text-[#0077ED] hover:bg-[#F4EFE6]'
                }`}
              >
                <Wind className="w-3.5 h-3.5 text-cyan-300 flex-shrink-0" />
                <span>Airflow CFD</span>
              </button>
            </div>

            {/* Top Right: Expand 3D Viewport Downward Toggle */}
            <div className="bg-[#FAF8F5]/95 backdrop-blur-md p-1 rounded-xl border border-[#D8D2C5] shadow-xl pointer-events-auto flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`p-1.5 px-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[10.5px] sm:text-xs font-mono font-bold ${
                  isExpanded 
                    ? 'bg-[#0077ED] text-white shadow-md' 
                    : 'text-[#475569] hover:text-[#0077ED] hover:bg-[#F4EFE6]'
                }`}
                title={isExpanded ? "Collapse 3D View" : "Expand 3D View Downward"}
              >
                {isExpanded ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="hidden sm:inline">Shorten</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="hidden sm:inline">Expand 3D</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. DEDICATED CONTROLS & SIMULATION BAR BELOW 3D CANVAS (Zero obstruction of curtain!) */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#FFFFFF] border border-[#E2DDD2] rounded-xl shadow-xs">
          {/* Orbit & Thickness hint */}
          <div className="text-[10px] sm:text-[11px] font-mono text-[#64748B] px-1 hidden sm:block">
            <span>Orbit: Drag • Zoom: Pinch / Scroll • Thickness: <strong className="text-[#0F172A]">{curtainLayout.thicknessMm}mm</strong></span>
          </div>

          {/* Drive-Through & Camera Controls */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-end">
            <button
              type="button"
              onClick={triggerForkliftPass}
              disabled={isSimulatingForklift}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-sm ${
                isSimulatingForklift
                  ? 'bg-[#0077ED] text-white animate-pulse shadow-[0_0_15px_rgba(0,119,237,0.6)]'
                  : 'bg-[#0077ED] hover:bg-[#2B8EFF] text-white'
              }`}
              title="Simulate vehicle or personnel driving through the curtain"
            >
              <Truck className="w-3.5 h-3.5 text-white flex-shrink-0" />
              <span>{isSimulatingForklift ? 'Vehicle Passing...' : 'Simulate Drive-Through'}</span>
            </button>

            <div className="h-4 w-px bg-[#EAE4D7] mx-1" />

            <button
              type="button"
              onClick={() => handleZoom(-0.6)}
              className="p-1.5 text-[#475569] hover:text-[#0077ED] hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer border border-[#E2DDD2]"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => handleZoom(0.6)}
              className="p-1.5 text-[#475569] hover:text-[#0077ED] hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer border border-[#E2DDD2]"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => handleCameraPreset('isometric')}
              className="p-1.5 text-[#475569] hover:text-[#0077ED] hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer border border-[#E2DDD2]"
              title="Reset Camera Angle"
              aria-label="Reset camera angle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
