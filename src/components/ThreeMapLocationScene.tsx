import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Compass, 
  RotateCcw, 
  MapPin, 
  ExternalLink, 
  Eye, 
  Sparkles, 
  Sun, 
  Moon,
  Navigation,
  CheckCircle2,
  Smile
} from 'lucide-react';

interface ThreeMapLocationSceneProps {
  onOpenGoogleMaps?: () => void;
  className?: string;
}

// Direct Google Maps Link provided by user
export const GOOGLE_MAPS_DIRECT_URL = 
  'https://www.google.com/maps?cid=1546955572006581620&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed';

export const ThreeMapLocationScene: React.FC<ThreeMapLocationSceneProps> = ({
  onOpenGoogleMaps,
  className = 'w-full h-[400px] sm:h-[480px]'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const masterGroupRef = useRef<THREE.Group | null>(null);
  const characterGroupRef = useRef<THREE.Group | null>(null);
  const rightArmRef = useRef<THREE.Group | null>(null);
  const beaconRingRef = useRef<THREE.Mesh | null>(null);
  const pinRef = useRef<THREE.Group | null>(null);

  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const [characterMessage, setCharacterMessage] = useState<string>(
    'Namaste! Welcome to Multi Enterprise HQ Ahmedabad!'
  );
  const [characterJump, setCharacterJump] = useState<boolean>(false);

  // Orbit / Interaction refs
  const isInteracting = useRef<boolean>(false);
  const lastTouchPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0.35, y: -0.65 });
  const currentRotation = useRef<{ x: number; y: number }>({ x: 0.35, y: -0.65 });
  const targetZoom = useRef<number>(6.5);
  const currentZoom = useRef<number>(6.5);
  const animationFrameId = useRef<number | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Initialize Three.js Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isNightMode ? 0x0a0c10 : 0x111317);

    // 2. Camera Setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 4.2, 6.5);
    camera.lookAt(0, 0.8, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(
      isNightMode ? 0x334155 : 0xffffff,
      isNightMode ? 1.0 : 1.4
    );
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(
      isNightMode ? 0x38bdf8 : 0xfffaed,
      isNightMode ? 1.2 : 2.4
    );
    sunLight.position.set(8, 14, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x0284c7, isNightMode ? 1.0 : 0.8);
    fillLight.position.set(-8, 6, -6);
    scene.add(fillLight);

    // Master World Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    masterGroupRef.current = masterGroup;

    // -------------------------------------------------------------
    // 5. CITY BASE & STREET INFRASTRUCTURE
    // -------------------------------------------------------------
    // Ground Island
    const groundGeo = new THREE.CylinderGeometry(5.2, 5.4, 0.35, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: isNightMode ? 0x15181f : 0x1e222b,
      roughness: 0.8,
      metalness: 0.1
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.position.y = -0.175;
    groundMesh.receiveShadow = true;
    masterGroup.add(groundMesh);

    // Main Road (Ashram Road / Subhash Bridge Axis)
    const roadGeo = new THREE.BoxGeometry(9.5, 0.02, 1.6);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x181a1f,
      roughness: 0.9
    });
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.position.set(0, 0.01, 1.4);
    roadMesh.rotation.y = 0.12;
    roadMesh.receiveShadow = true;
    masterGroup.add(roadMesh);

    // Road Yellow Center Dashes
    for (let i = -4; i <= 4; i += 1.2) {
      const dashGeo = new THREE.BoxGeometry(0.6, 0.022, 0.06);
      const dashMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
      const dashMesh = new THREE.Mesh(dashGeo, dashMat);
      dashMesh.position.set(i, 0.02, 1.4);
      dashMesh.rotation.y = 0.12;
      masterGroup.add(dashMesh);
    }

    // Sabarmati Riverfront Water Ribbon
    const riverGeo = new THREE.BoxGeometry(9.5, 0.015, 1.8);
    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85
    });
    const riverMesh = new THREE.Mesh(riverGeo, riverMat);
    riverMesh.position.set(0, 0.005, 3.2);
    riverMesh.rotation.y = 0.08;
    masterGroup.add(riverMesh);

    // Pavement / Footpath in front of Madhuram Complex
    const pathGeo = new THREE.BoxGeometry(4.8, 0.05, 1.8);
    const pathMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.7
    });
    const pathMesh = new THREE.Mesh(pathGeo, pathMat);
    pathMesh.position.set(-0.2, 0.03, 0.1);
    pathMesh.receiveShadow = true;
    masterGroup.add(pathMesh);

    // -------------------------------------------------------------
    // 6. 3D MADHURAM COMPLEX BUILDING (Multi Enterprise HQ)
    // -------------------------------------------------------------
    const buildingGroup = new THREE.Group();
    buildingGroup.position.set(-0.6, 0, -0.9);
    masterGroup.add(buildingGroup);

    // Main Complex Block
    const bldgGeo = new THREE.BoxGeometry(2.4, 2.2, 1.8);
    const bldgMat = new THREE.MeshStandardMaterial({
      color: 0x242833,
      roughness: 0.4,
      metalness: 0.3
    });
    const bldgMesh = new THREE.Mesh(bldgGeo, bldgMat);
    bldgMesh.position.y = 1.1;
    bldgMesh.castShadow = true;
    bldgMesh.receiveShadow = true;
    buildingGroup.add(bldgMesh);

    // Architectural Orange Accent Band (Multi Enterprise Color)
    const bandGeo = new THREE.BoxGeometry(2.45, 0.12, 1.85);
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0xf27d26,
      emissive: 0xf27d26,
      emissiveIntensity: 0.4,
      roughness: 0.2
    });
    const bandMesh1 = new THREE.Mesh(bandGeo, bandMat);
    bandMesh1.position.y = 1.15;
    buildingGroup.add(bandMesh1);

    const bandMesh2 = new THREE.Mesh(bandGeo, bandMat);
    bandMesh2.position.y = 2.15;
    buildingGroup.add(bandMesh2);

    // Building Windows (Grid of reflective glass panels)
    const winGeo = new THREE.BoxGeometry(0.35, 0.35, 0.05);
    const winMat = new THREE.MeshStandardMaterial({
      color: isNightMode ? 0xfef08a : 0x7dd3fc,
      emissive: isNightMode ? 0xfef08a : 0x0284c7,
      emissiveIntensity: isNightMode ? 0.8 : 0.3,
      roughness: 0.1,
      metalness: 0.9
    });

    for (let floor = 0; floor < 3; floor++) {
      for (let col = 0; col < 4; col++) {
        const winMesh = new THREE.Mesh(winGeo, winMat);
        winMesh.position.set(-0.75 + col * 0.5, 0.5 + floor * 0.6, 0.92);
        buildingGroup.add(winMesh);
      }
    }

    // Entrance Glass Awning
    const awningGeo = new THREE.BoxGeometry(1.2, 0.06, 0.6);
    const awningMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.8
    });
    const awningMesh = new THREE.Mesh(awningGeo, awningMat);
    awningMesh.position.set(0, 0.45, 1.15);
    awningMesh.castShadow = true;
    buildingGroup.add(awningMesh);

    // Rooftop Signboard "MULTI ENTERPRISE - FF-5"
    const signGeo = new THREE.BoxGeometry(1.8, 0.35, 0.08);
    const signMat = new THREE.MeshStandardMaterial({
      color: 0x0a0c10,
      roughness: 0.3
    });
    const signMesh = new THREE.Mesh(signGeo, signMat);
    signMesh.position.set(0, 2.45, 0.7);
    signMesh.castShadow = true;
    buildingGroup.add(signMesh);

    // Signboard Orange Border Light
    const signBorderGeo = new THREE.BoxGeometry(1.85, 0.4, 0.04);
    const signBorderMat = new THREE.MeshBasicMaterial({ color: 0xf27d26 });
    const signBorder = new THREE.Mesh(signBorderGeo, signBorderMat);
    signBorder.position.set(0, 2.45, 0.68);
    buildingGroup.add(signBorder);

    // Rooftop HVAC Equipment
    const hvacGeo = new THREE.BoxGeometry(0.6, 0.4, 0.6);
    const hvacMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 });
    const hvacMesh = new THREE.Mesh(hvacGeo, hvacMat);
    hvacMesh.position.set(0.6, 2.4, -0.3);
    buildingGroup.add(hvacMesh);

    // -------------------------------------------------------------
    // 7. 3D CARTOON CHARACTER ("BANDA KHADA HO CARTOON JAISA")
    // -------------------------------------------------------------
    const characterGroup = new THREE.Group();
    characterGroup.position.set(1.1, 0.05, 0.5);
    characterGroup.rotation.y = -0.4;
    masterGroup.add(characterGroup);
    characterGroupRef.current = characterGroup;

    // Materials for Cartoon Character
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xf6d7b0,
      roughness: 0.6
    });
    const helmetMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15, // Yellow safety helmet
      roughness: 0.3,
      metalness: 0.2
    });
    const suitMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a, // Navy work uniform
      roughness: 0.7
    });
    const vestMat = new THREE.MeshStandardMaterial({
      color: 0xf97316, // Bright Orange High-Vis Vest
      roughness: 0.5
    });
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 }); // Reflective silver tape
    const bootMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x09090b });

    // Feet & Boots
    const leftBootGeo = new THREE.BoxGeometry(0.12, 0.08, 0.2);
    const leftBoot = new THREE.Mesh(leftBootGeo, bootMat);
    leftBoot.position.set(-0.09, 0.04, 0.03);
    characterGroup.add(leftBoot);

    const rightBootGeo = new THREE.BoxGeometry(0.12, 0.08, 0.2);
    const rightBoot = new THREE.Mesh(rightBootGeo, bootMat);
    rightBoot.position.set(0.09, 0.04, 0.03);
    characterGroup.add(rightBoot);

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.28, 12);
    const leftLeg = new THREE.Mesh(legGeo, suitMat);
    leftLeg.position.set(-0.09, 0.2, 0);
    characterGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, suitMat);
    rightLeg.position.set(0.09, 0.2, 0);
    characterGroup.add(rightLeg);

    // Torso / Body
    const torsoGeo = new THREE.BoxGeometry(0.32, 0.36, 0.22);
    const torso = new THREE.Mesh(torsoGeo, suitMat);
    torso.position.set(0, 0.48, 0);
    characterGroup.add(torso);

    // High-Vis Safety Vest Overlay
    const vestGeo = new THREE.BoxGeometry(0.34, 0.34, 0.24);
    const vest = new THREE.Mesh(vestGeo, vestMat);
    vest.position.set(0, 0.48, 0);
    characterGroup.add(vest);

    // Reflective Vest Stripes
    const stripeGeo = new THREE.BoxGeometry(0.35, 0.04, 0.25);
    const stripe1 = new THREE.Mesh(stripeGeo, stripeMat);
    stripe1.position.set(0, 0.44, 0);
    characterGroup.add(stripe1);

    const stripe2 = new THREE.Mesh(stripeGeo, stripeMat);
    stripe2.position.set(0, 0.54, 0);
    characterGroup.add(stripe2);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.08, 10);
    const neck = new THREE.Mesh(neckGeo, skinMat);
    neck.position.set(0, 0.68, 0);
    characterGroup.add(neck);

    // Cute Cartoon Rounded Head
    const headGeo = new THREE.SphereGeometry(0.18, 20, 20);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.set(0, 0.85, 0);
    head.scale.set(1, 1.05, 0.95);
    characterGroup.add(head);

    // Big Cartoon Eyes
    const eyeGeo = new THREE.SphereGeometry(0.042, 12, 12);
    const pupilGeo = new THREE.SphereGeometry(0.024, 10, 10);

    const leftEyeWhite = new THREE.Mesh(eyeGeo, eyeWhiteMat);
    leftEyeWhite.position.set(-0.06, 0.87, 0.15);
    characterGroup.add(leftEyeWhite);

    const leftPupil = new THREE.Mesh(pupilGeo, eyePupilMat);
    leftPupil.position.set(-0.06, 0.87, 0.18);
    characterGroup.add(leftPupil);

    const rightEyeWhite = new THREE.Mesh(eyeGeo, eyeWhiteMat);
    rightEyeWhite.position.set(0.06, 0.87, 0.15);
    characterGroup.add(rightEyeWhite);

    const rightPupil = new THREE.Mesh(pupilGeo, eyePupilMat);
    rightPupil.position.set(0.06, 0.87, 0.18);
    characterGroup.add(rightPupil);

    // Friendly Smile (Curved Tube)
    const smileCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.05, 0.79, 0.16),
      new THREE.Vector3(0, 0.76, 0.18),
      new THREE.Vector3(0.05, 0.79, 0.16)
    );
    const smileGeo = new THREE.TubeGeometry(smileCurve, 10, 0.008, 6, false);
    const smileMat = new THREE.MeshBasicMaterial({ color: 0x831843 });
    const smile = new THREE.Mesh(smileGeo, smileMat);
    characterGroup.add(smile);

    // Engineer Safety Helmet (Yellow Hardhat)
    const helmetGeo = new THREE.SphereGeometry(0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const helmet = new THREE.Mesh(helmetGeo, helmetMat);
    helmet.position.set(0, 0.92, 0);
    helmet.scale.set(1.05, 0.9, 1.05);
    characterGroup.add(helmet);

    // Helmet Front Visor / Brim
    const brimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.03, 16, 1, false, 0, Math.PI);
    const brim = new THREE.Mesh(brimGeo, helmetMat);
    brim.position.set(0, 0.92, 0.05);
    characterGroup.add(brim);

    // Left Arm (Relaxed at side holding engineer clipboard)
    const leftArmGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.32, 10);
    const leftArm = new THREE.Mesh(leftArmGeo, suitMat);
    leftArm.position.set(-0.21, 0.48, 0.02);
    leftArm.rotation.z = 0.15;
    characterGroup.add(leftArm);

    // Left Hand
    const handGeo = new THREE.SphereGeometry(0.045, 10, 10);
    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.set(-0.24, 0.3, 0.04);
    characterGroup.add(leftHand);

    // Technical Blueprint / Tablet in Left Hand
    const padGeo = new THREE.BoxGeometry(0.12, 0.16, 0.02);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.set(-0.26, 0.32, 0.08);
    pad.rotation.set(0.3, -0.4, 0.2);
    characterGroup.add(pad);

    // Right Arm (Animated Greeting & Waving Pivot Group!)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.2, 0.6, 0);
    characterGroup.add(rightArmGroup);
    rightArmRef.current = rightArmGroup;

    // Upper Arm raised
    const rightUpperArmGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.22, 10);
    const rightUpperArm = new THREE.Mesh(rightUpperArmGeo, suitMat);
    rightUpperArm.position.set(0.08, 0.08, 0.05);
    rightUpperArm.rotation.z = -0.9;
    rightArmGroup.add(rightUpperArm);

    // Forearm & Waving Hand
    const rightForeArmGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.2, 10);
    const rightForeArm = new THREE.Mesh(rightForeArmGeo, suitMat);
    rightForeArm.position.set(0.18, 0.22, 0.08);
    rightForeArm.rotation.z = -0.3;
    rightArmGroup.add(rightForeArm);

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.set(0.21, 0.33, 0.1);
    rightArmGroup.add(rightHand);

    // -------------------------------------------------------------
    // 8. 3D PULSING LOCATION PIN & GPS BEACON OVER BUILDING
    // -------------------------------------------------------------
    const pinGroup = new THREE.Group();
    pinGroup.position.set(-0.6, 3.2, -0.9);
    masterGroup.add(pinGroup);
    pinRef.current = pinGroup;

    // Pin Head (Spherical top)
    const pinHeadGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Google Maps Red
      emissive: 0xef4444,
      emissiveIntensity: 0.5,
      roughness: 0.2
    });
    const pinHead = new THREE.Mesh(pinHeadGeo, pinMat);
    pinHead.position.y = 0.25;
    pinGroup.add(pinHead);

    // White Center Eye in Pin
    const pinDotGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const pinDotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pinDot = new THREE.Mesh(pinDotGeo, pinDotMat);
    pinDot.position.set(0, 0.25, 0.16);
    pinGroup.add(pinDot);

    // Pin Point (Inverted cone base)
    const pinConeGeo = new THREE.ConeGeometry(0.22, 0.35, 16);
    const pinCone = new THREE.Mesh(pinConeGeo, pinMat);
    pinCone.position.y = 0.05;
    pinCone.rotation.x = Math.PI;
    pinGroup.add(pinCone);

    // Ground GPS Pulse Ring
    const ringGeo = new THREE.RingGeometry(0.2, 0.32, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf27d26,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(-0.6, 0.05, -0.9);
    ringMesh.rotation.x = -Math.PI / 2;
    masterGroup.add(ringMesh);
    beaconRingRef.current = ringMesh;

    // Delivery Van on Road
    const vanGroup = new THREE.Group();
    vanGroup.position.set(-2.2, 0.12, 1.4);
    vanGroup.rotation.y = 0.12;
    masterGroup.add(vanGroup);

    const vanBodyGeo = new THREE.BoxGeometry(0.9, 0.42, 0.42);
    const vanMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const vanMesh = new THREE.Mesh(vanBodyGeo, vanMat);
    vanMesh.position.y = 0.22;
    vanMesh.castShadow = true;
    vanGroup.add(vanMesh);

    const vanCabGeo = new THREE.BoxGeometry(0.35, 0.34, 0.4);
    const vanCabMat = new THREE.MeshStandardMaterial({ color: 0xf27d26 });
    const vanCab = new THREE.Mesh(vanCabGeo, vanCabMat);
    vanCab.position.set(0.5, 0.18, 0);
    vanGroup.add(vanCab);

    // Decorative Trees
    const treePositions = [
      [-2.4, 0, -0.4],
      [-2.8, 0, 0.5],
      [2.4, 0, -0.8],
      [2.6, 0, 0.4]
    ];
    treePositions.forEach(([tx, ty, tz]) => {
      const trunkGeo = new THREE.CylinderGeometry(0.05, 0.07, 0.3, 8);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(tx, 0.15, tz);
      masterGroup.add(trunk);

      const foliageGeo = new THREE.ConeGeometry(0.28, 0.6, 8);
      const foliageMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
      const foliage = new THREE.Mesh(foliageGeo, foliageMat);
      foliage.position.set(tx, 0.5, tz);
      foliage.castShadow = true;
      masterGroup.add(foliage);
    });

    // -------------------------------------------------------------
    // 9. ANIMATION TICK & RENDER LOOP
    // -------------------------------------------------------------
    let pulseScale = 1.0;

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const elapsed = clockRef.current.getElapsedTime();

      // Smooth Orbit Interpolation (Lerp)
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;
      currentZoom.current += (targetZoom.current - currentZoom.current) * 0.08;

      masterGroup.rotation.x = currentRotation.current.x;
      masterGroup.rotation.y = currentRotation.current.y;
      camera.position.z = currentZoom.current;

      // 1. Animate Cartoon Engineer Waving Arm
      if (rightArmRef.current) {
        const waveAngle = Math.sin(elapsed * 4.5) * 0.35;
        rightArmRef.current.rotation.z = waveAngle;
        rightArmRef.current.rotation.y = Math.cos(elapsed * 3.5) * 0.15;
      }

      // 2. Idle Body Bobbing
      if (characterGroupRef.current) {
        const jumpY = characterJump ? Math.abs(Math.sin(elapsed * 8)) * 0.25 : 0;
        characterGroupRef.current.position.y = 0.05 + Math.sin(elapsed * 2.5) * 0.015 + jumpY;
      }

      // 3. Floating GPS Pin Bobbing & Rotation
      if (pinRef.current) {
        pinRef.current.position.y = 3.2 + Math.sin(elapsed * 3) * 0.12;
        pinRef.current.rotation.y = elapsed * 1.2;
      }

      // 4. Expanding Beacon Ground Rings
      if (beaconRingRef.current) {
        pulseScale = 1.0 + (elapsed % 1.8) * 2.2;
        beaconRingRef.current.scale.set(pulseScale, pulseScale, pulseScale);
        const ringMaterial = beaconRingRef.current.material as THREE.MeshBasicMaterial;
        ringMaterial.opacity = Math.max(0, 0.9 - (elapsed % 1.8) * 0.5);
      }

      renderer.render(scene, camera);
    };

    animate();

    // -------------------------------------------------------------
    // 10. RESIZE OBSERVER & INTERACTIVE GESTURE HANDLERS
    // -------------------------------------------------------------
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

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
      targetRotation.current.x = Math.max(-0.2, Math.min(0.7, targetRotation.current.x + deltaY * 0.007));
    };

    const handlePointerUp = () => {
      isInteracting.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom.current = Math.max(4.0, Math.min(9.5, targetZoom.current + e.deltaY * 0.004));
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      resizeObserver.disconnect();
      dom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      dom.removeEventListener('wheel', handleWheel);
      renderer.dispose();
      if (container) container.innerHTML = '';
    };
  }, [isNightMode, characterJump]);

  const handleResetCamera = () => {
    targetRotation.current = { x: 0.35, y: -0.65 };
    targetZoom.current = 6.5;
  };

  const handleInteractWithCharacter = () => {
    setCharacterJump(true);
    const messages = [
      '👋 Namaste! Multi Enterprise welcomes you to Ahmedabad!',
      '✨ Manufacturing industrial PVC curtains since 1998!',
      '📍 Come visit us at FF-5, Madhuram Complex, Keshav Nagar!',
      '🏭 Over 10,000+ facilities supplied across India!'
    ];
    const nextMsg = messages[Math.floor(Math.random() * messages.length)];
    setCharacterMessage(nextMsg);
    setTimeout(() => setCharacterJump(false), 800);
  };

  return (
    <div className={`relative overflow-hidden bg-[#0A0C10] border border-white/15 rounded-xl shadow-2xl ${className}`}>
      {/* Three.js Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
        title="Drag to rotate 3D Ahmedabad Map • Scroll to zoom"
      />

      {/* Top HUD: Location Info & Night/Day Mode */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 shadow-xl pointer-events-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F27D26] animate-ping" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            3D HQ Map • Ahmedabad
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-black/85 backdrop-blur-md p-1 rounded-lg border border-white/15 shadow-xl pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsNightMode(!isNightMode)}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
            title={isNightMode ? 'Switch to Daylight' : 'Switch to Night Lighting'}
          >
            {isNightMode ? <Sun className="w-3.5 h-3.5 text-yellow-400" /> : <Moon className="w-3.5 h-3.5 text-sky-400" />}
          </button>
          <button
            type="button"
            onClick={handleResetCamera}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
            title="Reset 3D Camera"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Cartoon Character Interactive Speech Bubble */}
      <div className="absolute bottom-16 right-4 max-w-xs z-10 pointer-events-auto">
        <button
          type="button"
          onClick={handleInteractWithCharacter}
          className="w-full text-left bg-gradient-to-r from-[#181B22]/95 to-[#232733]/95 hover:border-[#F27D26] border border-white/20 p-3 rounded-xl shadow-2xl backdrop-blur-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">👷‍♂️</span>
            <span className="text-[11px] font-mono font-bold text-[#F27D26] uppercase">
              Multi Enterprise Guide
            </span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
              Online
            </span>
          </div>
          <p className="text-xs text-white/90 font-sans leading-snug">
            "{characterMessage}"
          </p>
          <div className="mt-1.5 text-[9px] font-mono text-white/40 group-hover:text-[#F27D26] flex items-center gap-1 transition-colors">
            <Smile className="w-3 h-3" />
            <span>Click to wave back or talk</span>
          </div>
        </button>
      </div>

      {/* Bottom Bar: Direct Google Maps Action with Coordinates */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 shadow-2xl pointer-events-auto">
        <div className="flex items-center gap-2 text-white">
          <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 animate-bounce" />
          <div className="text-[11px] font-mono">
            <span className="font-bold text-white">FF-5, Madhuram Complex</span>
            <span className="text-white/50 hidden sm:inline"> • Subhash Bridge, Ahmedabad</span>
          </div>
        </div>

        <a
          href={GOOGLE_MAPS_DIRECT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOpenGoogleMaps}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00a8cc] hover:bg-[#0092b3] text-white font-mono text-xs font-bold rounded-lg shadow-lg hover:shadow-[#00a8cc]/40 transition-all cursor-pointer flex-shrink-0"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </a>
      </div>
    </div>
  );
};
