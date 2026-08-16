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
  Sliders,
  Layers,
  Sparkles
} from 'lucide-react';

interface ThreeCurtainSceneProps {
  grade?: PVCGrade;
  overlap?: OverlapOption;
  hardware?: HardwareType;
  stripCount?: number;
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
  const targetZoom = useRef<number>(4.8);
  const currentZoom = useRef<number>(4.8);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const effectiveOverlap = overlapPct || overlap;

  // Memoize heavy grade data computations
  const currentGradeData = useMemo(() => {
    return PVC_GRADES[grade] || PVC_GRADES['standard-clear'];
  }, [grade]);

  // Memoize geometry layout dimensions - calibrated scale so doorway is never over-zoomed or clipped
  const curtainLayout = useMemo(() => {
    const count = Math.max(stripCount, 3);
    const targetWidth = Math.min(2.8, Math.max(1.8, count * 0.16));
    const stripW = Math.max(0.18, Math.min(0.40, (targetWidth / count) * 1.55));
    const overlapStep = (stripW * (100 - effectiveOverlap / 1.5)) / 100;
    const totalCurtainWidth = (count - 1) * overlapStep;
    const stripH = 2.1 * Math.min(Math.max(heightRatio, 0.8), 1.5);
    return { stripW, stripH, stripD: 0.015, overlapStep, totalCurtainWidth };
  }, [heightRatio, effectiveOverlap, stripCount]);

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
      targetZoom.current = 4.6;
    } else if (preset === 'side') {
      targetRotation.current = { x: 0.05, y: -Math.PI / 3.0 };
      targetZoom.current = 5.0;
    } else if (preset === 'isometric') {
      targetRotation.current = { x: 0.10, y: -0.18 };
      targetZoom.current = 4.8;
    } else if (preset === 'top') {
      targetRotation.current = { x: 0.55, y: -0.15 };
      targetZoom.current = 4.5;
    }
  }, []);

  const handleZoom = useCallback((delta: number) => {
    targetZoom.current = Math.max(3.0, Math.min(7.5, targetZoom.current + delta));
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
    camera.position.set(0, 0, 5.4);
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
    renderer.toneMappingExposure = 1.18;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(5, 7, 6);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    dirLight1.shadow.bias = -0.0001;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 1.4);
    dirLight2.position.set(-6, 4, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xf27d26, 2.0, 12);
    pointLight.position.set(0, 2.8, 2.2);
    scene.add(pointLight);

    const cyanRimLight = new THREE.PointLight(0x38bdf8, 1.4, 10);
    cyanRimLight.position.set(0, -1.5, 3.0);
    scene.add(cyanRimLight);

    // Subtle Industrial Floor Grid
    const gridHelper = new THREE.GridHelper(12, 24, 0x475569, 0x1e293b);
    gridHelper.position.y = -2.0;
    scene.add(gridHelper);

    // Master Transformation Groups
    const masterGroup = new THREE.Group();
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
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isInteracting.current) return;
      const deltaX = e.clientX - lastTouchPos.current.x;
      const deltaY = e.clientY - lastTouchPos.current.y;
      lastTouchPos.current = { x: e.clientX, y: e.clientY };

      targetRotation.current.y += deltaX * 0.007;
      targetRotation.current.x = Math.max(-0.4, Math.min(0.8, targetRotation.current.x + deltaY * 0.007));
    };

    const handlePointerUp = () => {
      isInteracting.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom.current = Math.max(2.8, Math.min(7.5, targetZoom.current + e.deltaY * 0.003));
    };

    // Touch pinch-to-zoom support
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
          const delta = (touchStartDist.current - dist) * 0.01;
          targetZoom.current = Math.max(2.8, Math.min(7.5, targetZoom.current + delta));
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
      color: isStainless ? 0xd1d5db : 0x94a3b8,
      metalness: isStainless ? 0.95 : 0.75,
      roughness: isStainless ? 0.15 : 0.45,
      envMapIntensity: 1.5
    });
    const railMesh = new THREE.Mesh(railGeo, railMat);
    railMesh.position.set(0, stripH / 2 + 0.06, 0);
    railMesh.castShadow = true;
    railMesh.receiveShadow = true;
    hardwareGroup.add(railMesh);

    // Wall Mount Bracket Caps
    const bracketGeo = new THREE.BoxGeometry(0.14, 0.22, 0.18);
    const bracketMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.8,
      roughness: 0.3
    });
    const leftBracket = new THREE.Mesh(bracketGeo, bracketMat);
    leftBracket.position.set(-railLength / 2 + 0.07, stripH / 2 + 0.06, 0.05);
    const rightBracket = new THREE.Mesh(bracketGeo, bracketMat);
    rightBracket.position.set(railLength / 2 - 0.07, stripH / 2 + 0.06, 0.05);
    hardwareGroup.add(leftBracket, rightBracket);

    // Hanging Teeth / Prongs on Track
    const prongGeo = new THREE.BoxGeometry(0.022, 0.06, 0.06);
    const prongMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.2
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
        emissiveIntensity: 0.35,
        transmission: 0.70,
        opacity: 0.85,
        transparent: true,
        roughness: 0.1,
        metalness: 0.05,
        clearcoat: 1.0,
        ior: 1.48,
        side: THREE.DoubleSide
      });
    } else {
      // Realistic mode with high-end physical polymer shader
      const color3d = currentGradeData.color3D;
      stripMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color3d.color),
        transmission: color3d.transmission,
        opacity: color3d.opacity,
        transparent: true,
        roughness: color3d.roughness,
        metalness: color3d.metalness,
        clearcoat: color3d.clearcoat,
        ior: color3d.ior,
        side: THREE.DoubleSide,
        depthWrite: false
      });
    }

    // --- Build Strip Assemblies with Hinge Pivots ---
    const startX = -totalCurtainWidth / 2;
    const stripGeo = new THREE.BoxGeometry(stripW, stripH, stripD, 4, 16, 1);

    const clampGeo = new THREE.BoxGeometry(stripW * 0.94, 0.14, stripD * 2.4);
    const clampMat = new THREE.MeshStandardMaterial({
      color: isStainless ? 0xd4d4d8 : 0xa1a1aa,
      metalness: 0.9,
      roughness: 0.25
    });

    const rivetGeo = new THREE.CylinderGeometry(0.015, 0.015, stripD * 2.8, 8);
    rivetGeo.rotateX(Math.PI / 2);
    const rivetMat = new THREE.MeshStandardMaterial({ color: 0x52525b, metalness: 0.9, roughness: 0.2 });

    for (let i = 0; i < stripCount; i++) {
      const stripPivot = new THREE.Group();
      const xPos = startX + i * overlapStep;
      const zLayer = (i % 2 === 0 ? 0 : 0.025) + (Math.sin(i) * 0.002);
      stripPivot.position.set(xPos, stripH / 2, zLayer);

      const stripMesh = new THREE.Mesh(stripGeo, stripMaterial);
      stripMesh.position.set(0, -stripH / 2, 0);
      stripMesh.castShadow = true;
      stripMesh.receiveShadow = true;
      stripPivot.add(stripMesh);

      // Stainless Steel Clamping Head Plate
      const clampMesh = new THREE.Mesh(clampGeo, clampMat);
      clampMesh.position.set(0, -0.07, 0);
      stripPivot.add(clampMesh);

      // Fastener Rivets
      const rivet1 = new THREE.Mesh(rivetGeo, rivetMat);
      rivet1.position.set(-stripW * 0.3, -0.07, 0);
      const rivet2 = new THREE.Mesh(rivetGeo, rivetMat);
      rivet2.position.set(stripW * 0.3, -0.07, 0);
      stripPivot.add(rivet1, rivet2);

      stripsGroup.add(stripPivot);
      stripMeshesRef.current.push({
        mesh: stripPivot,
        phase: i * 0.45,
        vel: 0
      });
    }

    // --- Build Particles (Thermal Heat Rise / Airflow Vortex Streamlines) ---
    if (activeViewMode === 'thermal' || activeViewMode === 'airflow') {
      const particleCount = activeViewMode === 'thermal' ? 240 : 360;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(particleCount * 3);
      const pColors = new Float32Array(particleCount * 3);

      for (let p = 0; p < particleCount; p++) {
        pPos[p * 3] = (Math.random() - 0.5) * 4.4;
        pPos[p * 3 + 1] = (Math.random() - 0.5) * 3.2;
        pPos[p * 3 + 2] = 2.5 + Math.random() * 2.0;

        if (activeViewMode === 'thermal') {
          // Warm red/orange particles in ambient room transitioning to cold cyan in freezer
          const isWarm = Math.random() > 0.4;
          if (isWarm) {
            pColors[p * 3] = 1.0;
            pColors[p * 3 + 1] = 0.3 + Math.random() * 0.3;
            pColors[p * 3 + 2] = 0.05;
          } else {
            pColors[p * 3] = 0.05;
            pColors[p * 3 + 1] = 0.8 + Math.random() * 0.2;
            pColors[p * 3 + 2] = 1.0;
          }
        } else {
          // Airflow: energetic cyan & pure white streamline particles
          pColors[p * 3] = 0.2 + Math.random() * 0.8;
          pColors[p * 3 + 1] = 0.8 + Math.random() * 0.2;
          pColors[p * 3 + 2] = 1.0;
        }
      }

      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

      const pMat = new THREE.PointsMaterial({
        size: activeViewMode === 'thermal' ? 0.08 : 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });

      const particleSystem = new THREE.Points(pGeo, pMat);
      masterGroup.add(particleSystem);
      particlesRef.current = particleSystem;
    }
  }, [curtainLayout, hardware, activeViewMode, currentGradeData, thermalPalette, stripCount]);

  return (
    <div 
      className={`relative overflow-hidden bg-gradient-to-b from-[#0F1013] via-[#0A0A0C] to-[#080809] border border-white/10 shadow-2xl transition-all duration-300 ${
        isFullscreen 
          ? 'fixed inset-0 z-50 rounded-none w-screen h-screen' 
          : `rounded-2xl ${className}`
      }`}
    >
      {/* 3D WebGL Canvas Injection Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
        title="Click and drag to rotate in 3D • Pinch to zoom"
      />

      {/* Top Floating HUD: View Mode Switcher & Fullscreen Expand */}
      {showControls && (
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-white/15 shadow-xl pointer-events-auto">
            <button
              type="button"
              onClick={() => setViewMode('realistic')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeViewMode === 'realistic'
                  ? 'bg-[#F27D26] text-white shadow-[0_0_12px_rgba(242,125,38,0.5)]'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>3D Polymer</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('thermal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeViewMode === 'thermal'
                  ? 'bg-rose-600 text-white shadow-[0_0_12px_rgba(225,29,72,0.6)]'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>FLIR Thermal</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('airflow')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeViewMode === 'airflow'
                  ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(8,145,178,0.6)]'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Wind className="w-3.5 h-3.5 text-cyan-300" />
              <span>Airflow CFD</span>
            </button>
          </div>

          {/* Top Right: Fullscreen Toggle */}
          <div className="bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-white/15 shadow-xl pointer-events-auto">
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold ${
                isFullscreen 
                  ? 'bg-[#F27D26] text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title={isFullscreen ? "Exit Fullscreen" : "Immersive Expanded Viewport"}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Expand'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating Toolbar: Drive-Through Simulation & Camera Controls */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Bottom Left: Orbit Hint */}
          <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-[10px] font-mono text-white/50 pointer-events-auto hidden md:block">
            <span>Orbit: Drag • Zoom: Pinch / Scroll</span>
          </div>

          {/* Bottom Center / Right Controls Container */}
          <div className="flex items-center gap-2 bg-black/85 backdrop-blur-md p-1.5 rounded-xl border border-white/15 shadow-2xl pointer-events-auto ml-auto">
            {/* Drive-Through Simulation Button - Highlighted at Bottom */}
            <button
              type="button"
              onClick={triggerForkliftPass}
              disabled={isSimulatingForklift}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-lg ${
                isSimulatingForklift
                  ? 'bg-[#F27D26] text-white animate-pulse shadow-[0_0_15px_rgba(242,125,38,0.6)]'
                  : 'bg-[#F27D26]/20 hover:bg-[#F27D26] text-white border border-[#F27D26]/50 hover:border-[#F27D26]'
              }`}
              title="Simulate vehicle or personnel driving through the curtain"
            >
              <Truck className="w-4 h-4 text-[#F27D26] group-hover:text-white" />
              <span>{isSimulatingForklift ? 'Vehicle Passing...' : 'Simulate Drive-Through'}</span>
            </button>

            <div className="h-4 w-px bg-white/20 mx-0.5" />

            {/* Zoom In */}
            <button
              type="button"
              onClick={() => handleZoom(-0.6)}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            {/* Zoom Out */}
            <button
              type="button"
              onClick={() => handleZoom(0.6)}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            {/* Reset Camera Angle */}
            <button
              type="button"
              onClick={() => handleCameraPreset('isometric')}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Reset Camera Angle"
              aria-label="Reset camera angle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* FLIR Thermal Overlay Legend & Spot Crosshairs */}
      {activeViewMode === 'thermal' && (
        <>
          {/* Simulated Crosshair Spot Telemetry */}
          <div className="absolute top-16 right-4 z-20 pointer-events-none hidden sm:flex flex-col gap-1.5 font-mono text-[10px]">
            <div className="bg-black/85 backdrop-blur-md px-2.5 py-1.5 rounded border border-rose-500/40 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Exterior Ambient: <strong className="text-rose-400">Warm Air Zone</strong></span>
            </div>
            <div className="bg-black/85 backdrop-blur-md px-2.5 py-1.5 rounded border border-cyan-500/40 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Cold Storage: <strong className="text-cyan-300">Sub-Zero Isolation</strong></span>
            </div>
            <div className="bg-black/85 backdrop-blur-md px-2.5 py-1.5 rounded border border-emerald-500/40 text-emerald-400 font-bold">
              <span>Thermal Barrier: Continuous Convective Seal</span>
            </div>
          </div>

          <div className="absolute bottom-16 left-4 z-20 bg-black/85 backdrop-blur-md border border-rose-500/30 p-3 rounded-xl shadow-2xl max-w-xs text-xs font-mono">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-[10px] uppercase font-bold text-rose-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                FLIR Thermal Telemetry
              </span>
              <span className="text-[9px] text-white/40 font-mono">Industrial Grade</span>
            </div>

            <div className="h-3 w-full rounded bg-gradient-to-r from-[#00e1ff] via-[#d6006e] via-[#ff3b00] to-[#ffffff] mb-1.5 border border-white/20" />

            <div className="flex justify-between text-[9px] text-white/70 font-mono">
              <span>Cold Enclosure</span>
              <span>Barrier Interface</span>
              <span>Ambient Plant</span>
            </div>
          </div>
        </>
      )}

      {/* Airflow CFD Streamline Overlay HUD */}
      {activeViewMode === 'airflow' && (
        <>
          <div className="absolute top-16 right-4 z-20 pointer-events-none hidden sm:flex flex-col gap-1.5 font-mono text-[10px]">
            <div className="bg-black/85 backdrop-blur-md px-2.5 py-1.5 rounded border border-cyan-500/40 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Inlet Velocity: <strong className="text-cyan-300">Airflow Streamline</strong></span>
            </div>
            <div className="bg-black/85 backdrop-blur-md px-2.5 py-1.5 rounded border border-emerald-500/40 text-emerald-300 flex items-center gap-2">
              <span>Barrier Action: <strong>Deflected &amp; Contained Draft</strong></span>
            </div>
          </div>

          <div className="absolute bottom-16 left-4 z-20 bg-black/85 backdrop-blur-md border border-cyan-500/30 p-3 rounded-xl shadow-2xl max-w-xs text-xs font-mono">
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <span className="text-[10px] uppercase font-bold text-cyan-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                CFD Velocity Streamline Simulation
              </span>
            </div>
            <p className="text-[10px] text-white/60 leading-tight">
              Laminar streamline collision demonstrates boundary layer deflection and effective air draft suppression.
            </p>
          </div>
        </>
      )}

      {/* Subtle Bottom Right Spec Info */}
      <div className="absolute bottom-3 right-4 z-10 hidden sm:flex items-center gap-2 text-[10px] font-mono text-white/40 bg-black/60 px-2.5 py-1 rounded-md border border-white/10">
        <span>Single-finger orbit • Pinch to zoom</span>
      </div>
    </div>
  );
};
