import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/* ===========================================================
   GLOBAL SCHOLARS HUB — Cinematic 3D Hero Experience
   Award-quality interactive background integrating:
   - Digital Earth with PBR materials, atmosphere, city lights
   - Slow sunrise on horizon with god-ray volumetric glow
   - International landmark silhouettes (Eiffel, Big Ben, etc.)
   - Animated walking student toward horizon
   - Orbiting passenger airplane + particle jetstream
   - Floating open books with glowing particle auras
   - Graduation cap, diploma, academic symbols
   - Holographic SaaS UI glass panels (Scholar Match, Job Card, etc.)
   - Web Dev & AI objects (laptop, code brackets, neural nodes)
   - Interactive country markers pulsing on globe surface
   - Deep-space particle constellation & neural network graph
   - Cinematic camera with mouse parallax & scroll storytelling
   - Full GPU optimization, reduced-motion support, cleanup
   =========================================================== */

export default function Hero3DCanvas() {
  const containerRef = useRef(null);
  const [webGLSupported] = useState(() => {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!webGLSupported) return;

    const container = containerRef.current;
    if (!container) return;

    let W = container.clientWidth || window.innerWidth;
    let H = container.clientHeight || window.innerHeight;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
    const speedMult = prefersReducedMotion ? 0.15 : 1.0;

    // ─── Renderer ─────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' });
    renderer.setSize(W, H);
    renderer.setPixelRatio(dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // ─── Scene & Camera ───────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04080f, 0.012);

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000);
    camera.position.set(0, 4, 30);
    camera.lookAt(0, 0, 0);

    // ─── Shared Materials Factory ─────────────────────────────
    const stdMat = (opts) => new THREE.MeshStandardMaterial(opts);
    const basicMat = (opts) => new THREE.MeshBasicMaterial(opts);
    const lineMat = (color, opacity) => new THREE.LineBasicMaterial({ color, transparent: true, opacity });

    // ═══════════════════════════════════════════════════════════
    // 1. LIGHTING — Sunrise Cinematic Rig
    // ═══════════════════════════════════════════════════════════
    // Deep-blue ambient
    scene.add(new THREE.AmbientLight(0x0a1628, 1.2));

    // Golden sunrise directional (warm horizon light)
    const sunLight = new THREE.DirectionalLight(0xffd580, isMobile ? 2.0 : 3.5);
    sunLight.position.set(0, 8, -28);
    scene.add(sunLight);

    // Cyan atmospheric fill
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    fillLight.position.set(-20, 5, 15);
    scene.add(fillLight);

    // Purple rim light for depth
    const rimLight = new THREE.PointLight(0x8b5cf6, isMobile ? 1.5 : 2.8, 60);
    rimLight.position.set(20, 10, 10);
    scene.add(rimLight);

    // Warm sunrise glow point
    const sunriseGlow = new THREE.PointLight(0xff7a00, 3.0, 80);
    sunriseGlow.position.set(0, 6, -35);
    scene.add(sunriseGlow);

    // ═══════════════════════════════════════════════════════════
    // 2. SUNRISE DISC & GOD-RAY CORONA
    // ═══════════════════════════════════════════════════════════
    const sunGroup = new THREE.Group();
    sunGroup.position.set(0, 5, -45);

    // Core sun sphere
    const sunCore = new THREE.Mesh(
      new THREE.SphereGeometry(2.5, 32, 32),
      basicMat({ color: 0xfffbe6, transparent: true, opacity: 0.95 })
    );
    sunGroup.add(sunCore);

    // Halo rings
    [4, 6, 9, 13].forEach((r, i) => {
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(r, r + 0.5 - i * 0.08, 64),
        basicMat({ color: i < 2 ? 0xffa040 : 0xff6010, transparent: true, opacity: 0.08 - i * 0.015, side: THREE.DoubleSide })
      );
      sunGroup.add(halo);
    });

    // God-ray spikes
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const ray = new THREE.Mesh(
        new THREE.PlaneGeometry(0.3, 18),
        basicMat({ color: 0xffcc44, transparent: true, opacity: 0.06, side: THREE.DoubleSide })
      );
      ray.rotation.z = angle;
      sunGroup.add(ray);
    }
    scene.add(sunGroup);

    // ═══════════════════════════════════════════════════════════
    // 3. DIGITAL EARTH
    // ═══════════════════════════════════════════════════════════
    const GLOBE_R = 9;
    const globeGroup = new THREE.Group();
    globeGroup.position.set(0, -6, 0);

    // Base sphere — deep ocean PBR
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_R, isMobile ? 48 : 80, isMobile ? 48 : 80),
      stdMat({ color: 0x051836, roughness: 0.35, metalness: 0.85, emissive: 0x030e1c, emissiveIntensity: 0.6 })
    );
    globeGroup.add(globe);

    // Latitude / longitude wireframe
    const wireGrid = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_R + 0.06, 36, 36),
      basicMat({ color: 0x2563eb, wireframe: true, transparent: true, opacity: isMobile ? 0.12 : 0.18 })
    );
    globeGroup.add(wireGrid);

    // Rotating cloud shroud
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_R + 0.4, 48, 48),
      stdMat({ color: 0x7dd3fc, roughness: 0.9, transparent: true, opacity: 0.1 })
    );
    globeGroup.add(clouds);

    // Atmospheric outer glow (Fresnel-like back-face emission)
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_R + 1.2, 32, 32),
      basicMat({ color: 0x38bdf8, transparent: true, opacity: 0.07, side: THREE.BackSide, blending: THREE.AdditiveBlending })
    );
    globeGroup.add(atmo);

    // Second thicker halo
    const atmo2 = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_R + 2.2, 32, 32),
      basicMat({ color: 0x7c3aed, transparent: true, opacity: 0.04, side: THREE.BackSide, blending: THREE.AdditiveBlending })
    );
    globeGroup.add(atmo2);

    // ─── City Hub Markers ──────────────────────────────────────
    const HUB_DATA = [
      { lat: 40.71, lng: -74.01, label: 'New York', color: 0x38bdf8 },
      { lat: 51.51, lng: -0.13,  label: 'London',   color: 0xa78bfa },
      { lat: 48.86, lng: 2.35,   label: 'Paris',    color: 0xfbbf24 },
      { lat: 35.68, lng: 139.65, label: 'Tokyo',    color: 0x34d399 },
      { lat: -33.87, lng: 151.21,label: 'Sydney',   color: 0xf472b6 },
      { lat: -1.29,  lng: 36.82, label: 'Nairobi',  color: 0x4ade80 },
      { lat: 19.08,  lng: 72.88, label: 'Mumbai',   color: 0xfb923c },
      { lat: -23.55, lng: -46.63,label: 'São Paulo',color: 0x60a5fa },
      { lat: 52.52,  lng: 13.40, label: 'Berlin',   color: 0xe879f9 },
      { lat: 1.35,   lng: 103.82,label: 'Singapore',color: 0x06b6d4 },
    ];

    const latLngToVec = (lat, lng, r) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(r * Math.sin(phi) * Math.cos(theta)),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    const markerGroup = new THREE.Group();
    const hubPos = [];
    const hubColors = [];
    const markerBaseGeom = new THREE.SphereGeometry(0.22, 16, 16);

    HUB_DATA.forEach(({ lat, lng, color }) => {
      const pos = latLngToVec(lat, lng, GLOBE_R + 0.15);
      hubPos.push(pos.clone());
      hubColors.push(color);
      const mat = basicMat({ color });
      const mk = new THREE.Mesh(markerBaseGeom, mat);
      mk.position.copy(pos);

      // Pulsing ring
      const ringMesh = new THREE.Mesh(
        new THREE.RingGeometry(0.3, 0.45, 24),
        basicMat({ color, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
      );
      ringMesh.lookAt(pos.clone().multiplyScalar(2));
      ringMesh.position.copy(pos);
      markerGroup.add(ringMesh);
      markerGroup.add(mk);
    });
    globeGroup.add(markerGroup);

    // ─── Global Connection Arcs ────────────────────────────────
    const arcGroup = new THREE.Group();
    const arcPairs = [
      [0, 1], [1, 2], [2, 8], [3, 9], [4, 5], [6, 7], [0, 4], [1, 3], [5, 6], [7, 9]
    ];

    arcPairs.forEach(([a, b]) => {
      const p1 = hubPos[a];
      const p2 = hubPos[b];
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(GLOBE_R + p1.distanceTo(p2) * 0.4);
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const pts = curve.getPoints(48);
      const geom = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = lineMat(Math.random() > 0.5 ? 0x38bdf8 : 0x8b5cf6, 0.45);
      arcGroup.add(new THREE.Line(geom, mat));
    });
    globeGroup.add(arcGroup);

    scene.add(globeGroup);

    // ═══════════════════════════════════════════════════════════
    // 4. INTERNATIONAL LANDMARKS (horizon silhouettes)
    // ═══════════════════════════════════════════════════════════
    const lmGroup = new THREE.Group();
    const lmMat = stdMat({ color: 0x1e3a5f, roughness: 0.9, metalness: 0.1, emissive: 0x0a1f3a, emissiveIntensity: 0.5 });

    // Helper: build a landmark from stacked boxes
    const stackBoxes = (layers, x, y, z) => {
      const g = new THREE.Group();
      layers.forEach(([w, h, d, dy]) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lmMat);
        m.position.set(0, dy, 0);
        g.add(m);
      });
      g.position.set(x, y, z);
      return g;
    };

    // Eiffel-ish tower
    lmGroup.add(stackBoxes([[1.6,0.4,1.6,0],[1.1,0.4,1.1,0.5],[0.7,0.5,0.7,1.2],[0.3,2.5,0.3,2.7],[0.1,1.5,0.1,5]], -18, GLOBE_R + 0.1, -14));

    // Big Ben pillar
    lmGroup.add(stackBoxes([[1.2,5,1.2,2.5],[1.5,0.5,1.5,0],[1.1,0.6,1.1,5.3]], -26, GLOBE_R + 0.1, -10));

    // Tall skyscraper (Burj-ish)
    lmGroup.add(stackBoxes([[1.3,8,1.3,4],[0.9,5,0.9,9.5],[0.4,4,0.4,14],[0.1,3,0.1,17.5]], 18, GLOBE_R + 0.1, -10));

    // Sydney-ish Opera shells
    {
      const opg = new THREE.Group();
      [0, 1, 2].forEach(i => {
        const shell = new THREE.Mesh(new THREE.ConeGeometry(1.5 - i * 0.3, 3 - i * 0.5, 6), lmMat);
        shell.position.set(i * 2, 0.5, 0);
        shell.rotation.x = -0.3;
        opg.add(shell);
      });
      opg.position.set(24, GLOBE_R + 0.5, -8);
      lmGroup.add(opg);
    }

    // CN Tower obelisk
    lmGroup.add(stackBoxes([[0.8,9,0.8,4.5],[0.4,4,0.4,10],[0.15,3,0.15,13.5],[0.8,0.4,0.8,15]], 4, GLOBE_R + 0.1, -20));

    globeGroup.add(lmGroup);

    // ═══════════════════════════════════════════════════════════
    // 5. WALKING STUDENT CHARACTER
    // ═══════════════════════════════════════════════════════════
    const studentGroup = new THREE.Group();
    studentGroup.position.set(0, GLOBE_R + 0.5, 4);

    const studentMat = stdMat({ color: 0x4f46e5, roughness: 0.3, metalness: 0.7, emissive: 0x2d27a0, emissiveIntensity: 0.4 });
    const skinMat = stdMat({ color: 0xd4a574, roughness: 0.8 });
    const clothMat = stdMat({ color: 0x1e293b, roughness: 0.7 });
    const bagMat = stdMat({ color: 0x7c3aed, roughness: 0.4, metalness: 0.2 });

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), skinMat);
    head.position.set(0, 2.15, 0);

    // Hair (cap)
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 16), clothMat);
    hair.position.set(0, 2.32, 0);
    hair.scale.y = 0.6;

    // Graduation cap flat top
    const gradCapTop = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.06, 0.75), studentMat);
    gradCapTop.position.set(0, 2.58, 0);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.25, 12), skinMat);
    neck.position.set(0, 1.87, 0);

    // Torso (shirt + jacket)
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.9, 8, 12), clothMat);
    torso.position.set(0, 1.22, 0);

    // Backpack
    const bag = new THREE.Group();
    const bagBody = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.65, 0.22), bagMat);
    bag.add(bagBody);
    // Bag strap gleams
    const strapGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.9, 8);
    [-0.1, 0.1].forEach(x => {
      const strap = new THREE.Mesh(strapGeom, stdMat({ color: 0x5b21b6 }));
      strap.position.set(x, 0, 0.1);
      bag.add(strap);
    });
    bag.position.set(0, 1.25, -0.34);

    // Left arm group
    const leftArmG = new THREE.Group();
    const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.6, 8, 8), clothMat);
    leftArm.position.set(0, -0.3, 0);
    leftArmG.add(leftArm);
    leftArmG.position.set(-0.45, 1.5, 0);

    // Right arm group
    const rightArmG = new THREE.Group();
    const rightArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.6, 8, 8), clothMat);
    rightArm.position.set(0, -0.3, 0);
    rightArmG.add(rightArm);
    rightArmG.position.set(0.45, 1.5, 0);

    // Left leg group
    const leftLegG = new THREE.Group();
    const leftUpper = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.45, 8, 8), clothMat);
    leftUpper.position.set(0, -0.22, 0);
    const leftLower = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.4, 8, 8), clothMat);
    leftLower.position.set(0, -0.6, 0);
    const leftFoot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.35), clothMat);
    leftFoot.position.set(0.02, -0.85, 0.08);
    leftLegG.add(leftUpper, leftLower, leftFoot);
    leftLegG.position.set(-0.2, 0.55, 0);

    // Right leg group
    const rightLegG = new THREE.Group();
    const rightUpper = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.45, 8, 8), clothMat);
    rightUpper.position.set(0, -0.22, 0);
    const rightLower = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.4, 8, 8), clothMat);
    rightLower.position.set(0, -0.6, 0);
    const rightFoot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.35), clothMat);
    rightFoot.position.set(-0.02, -0.85, 0.08);
    rightLegG.add(rightUpper, rightLower, rightFoot);
    rightLegG.position.set(0.2, 0.55, 0);

    studentGroup.add(head, hair, gradCapTop, neck, torso, bag, leftArmG, rightArmG, leftLegG, rightLegG);

    // Student glow aura
    const studentGlow = new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 16, 16),
      basicMat({ color: 0x6366f1, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending })
    );
    studentGlow.position.set(0, 1.2, 0);
    studentGroup.add(studentGlow);

    // Illuminated digital pathway
    const pathGeom = new THREE.PlaneGeometry(2.2, 12);
    const pathMat = basicMat({ color: 0x38bdf8, transparent: true, opacity: 0.28, side: THREE.DoubleSide });
    const pathMesh = new THREE.Mesh(pathGeom, pathMat);
    pathMesh.rotation.x = -Math.PI / 2.1;
    pathMesh.position.set(0, GLOBE_R + 0.08, 4);
    scene.add(pathMesh);

    globeGroup.add(studentGroup);

    // ═══════════════════════════════════════════════════════════
    // 6. PASSENGER AIRCRAFT + JETSTREAM TRAIL
    // ═══════════════════════════════════════════════════════════
    const planeGroup = new THREE.Group();
    const planeMat = stdMat({ color: 0xf0f9ff, metalness: 0.92, roughness: 0.08 });
    const windowMat = basicMat({ color: 0x93c5fd, transparent: true, opacity: 0.6 });

    const fuselage = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 2.8, 8, 12), planeMat);
    fuselage.rotation.x = Math.PI / 2;

    const wing = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.05, 0.8), planeMat);
    wing.position.set(0, 0, 0.15);

    const tailFin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.85, 0.7), planeMat);
    tailFin.position.set(0, 0.4, -1.3);

    const tailWing = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 0.4), planeMat);
    tailWing.position.set(0, 0.06, -1.3);

    // Row of oval windows
    for (let i = -2; i <= 2; i++) {
      const win = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), windowMat);
      win.position.set(i * 0.45, 0.18, 0.2);
      planeGroup.add(win);
    }
    planeGroup.add(fuselage, wing, tailFin, tailWing);
    planeGroup.scale.set(0.72, 0.72, 0.72);
    scene.add(planeGroup);

    // Jetstream particle trail
    const TRAIL_COUNT = isMobile ? 80 : 180;
    const trailGeom = new THREE.BufferGeometry();
    const trailPos = new Float32Array(TRAIL_COUNT * 3);
    const trailOpacity = new Float32Array(TRAIL_COUNT);
    for (let i = 0; i < TRAIL_COUNT; i++) {
      trailPos[i * 3] = (Math.random() - 0.5) * 0.35;
      trailPos[i * 3 + 1] = (Math.random() - 0.5) * 0.35;
      trailPos[i * 3 + 2] = -i * 0.22;
      trailOpacity[i] = 1 - i / TRAIL_COUNT;
    }
    trailGeom.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
    const trailMat = new THREE.PointsMaterial({
      color: 0x7dd3fc, size: 0.18, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending
    });
    const trail = new THREE.Points(trailGeom, trailMat);
    planeGroup.add(trail);

    // ═══════════════════════════════════════════════════════════
    // 7. FLOATING BOOKS
    // ═══════════════════════════════════════════════════════════
    const books = [];
    const bookColors = [0x3b82f6, 0x8b5cf6, 0x10b981, 0xf59e0b, 0xec4899, 0x06b6d4];
    const bookDefs = [
      [-13, 6, -5], [14, 4, -3], [-11, -3, 2], [15, -5, 4], [-16, 1, -8], [12, 8, -7]
    ];

    bookDefs.forEach(([bx, by, bz], i) => {
      const bg = new THREE.Group();

      // Cover
      const cover = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.14, 1.9),
        stdMat({ color: bookColors[i % bookColors.length], roughness: 0.3, metalness: 0.15, emissive: bookColors[i % bookColors.length], emissiveIntensity: 0.15 })
      );
      bg.add(cover);

      // Pages block
      const pages = new THREE.Mesh(
        new THREE.BoxGeometry(1.25, 0.1, 1.75),
        stdMat({ color: 0xfefce8, roughness: 0.95 })
      );
      pages.position.set(0.06, 0, 0);
      bg.add(pages);

      // Open top page (tilted)
      const page = new THREE.Mesh(
        new THREE.PlaneGeometry(1.2, 1.7),
        basicMat({ color: 0xfefce8, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
      );
      page.position.set(0.3, 0.13, 0);
      page.rotation.y = 0.4;
      bg.add(page);

      // Glowing particle aura around each book
      if (!isMobile) {
        const aura = new THREE.Mesh(
          new THREE.SphereGeometry(1.2, 8, 8),
          basicMat({ color: bookColors[i % bookColors.length], transparent: true, opacity: 0.06, blending: THREE.AdditiveBlending })
        );
        bg.add(aura);
      }

      bg.position.set(bx, by, bz);
      bg.userData.floatOffset = Math.random() * Math.PI * 2;
      bg.userData.floatSpeed = 1.2 + Math.random() * 0.8;
      scene.add(bg);
      books.push(bg);
    });

    // ═══════════════════════════════════════════════════════════
    // 8. GRADUATION SYMBOLS (Mortarboard, Diploma, Medal)
    // ═══════════════════════════════════════════════════════════
    const gradGroup = new THREE.Group();
    const gradMat = stdMat({ color: 0x1e1b4b, roughness: 0.2, metalness: 0.6, emissive: 0x3730a3, emissiveIntensity: 0.3 });

    // Mortarboard cap
    const mbGroup = new THREE.Group();
    const mbTop = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 2.2), gradMat);
    const mbBase = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.65, 0.5, 20), gradMat);
    mbBase.position.y = -0.3;
    mbGroup.add(mbTop, mbBase);
    mbGroup.position.set(-8, 10, -6);
    gradGroup.add(mbGroup);

    // Diploma scroll
    const dipGroup = new THREE.Group();
    const dipScroll = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 2.5, 16), stdMat({ color: 0xf5deb3, roughness: 0.8 }));
    dipScroll.rotation.z = Math.PI / 2;
    const dipRibbon = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 2.5), stdMat({ color: 0xdc143c, roughness: 0.4 }));
    dipGroup.add(dipScroll, dipRibbon);
    dipGroup.position.set(13, 9, -5);
    gradGroup.add(dipGroup);

    // Star medal
    const medalGeom = new THREE.TorusGeometry(0.6, 0.12, 8, 6);
    const medal = new THREE.Mesh(medalGeom, stdMat({ color: 0xffd700, roughness: 0.1, metalness: 0.95, emissive: 0x806000, emissiveIntensity: 0.4 }));
    medal.position.set(16, 2, -4);
    gradGroup.add(medal);

    gradGroup.children.forEach(g => {
      g.userData.floatOffset = Math.random() * Math.PI * 2;
      g.userData.floatSpeed = 0.9 + Math.random() * 0.6;
    });
    scene.add(gradGroup);

    // ═══════════════════════════════════════════════════════════
    // 9. HOLOGRAPHIC SaaS UI GLASS CARDS
    // ═══════════════════════════════════════════════════════════
    const glassCards = [];
    const glassCardDefs = [
      { pos: [-16, 5, -4], rx: 0,   ry: 0.4,  col: 0x6366f1 },
      { pos: [17,  4, -2], rx: 0,   ry: -0.4, col: 0x38bdf8 },
      { pos: [-14, -3, 3], rx: 0.2, ry: 0.3,  col: 0x8b5cf6 },
      { pos: [15, -4, 3],  rx: 0.1, ry: -0.3, col: 0x10b981 },
    ];

    const cardGeom = new THREE.PlaneGeometry(4.5, 2.8);
    const borderGeom = new THREE.PlaneGeometry(4.6, 2.9);

    glassCardDefs.forEach(({ pos, rx, ry, col }, i) => {
      const cg = new THREE.Group();

      // Frosted glass panel
      const panel = new THREE.Mesh(cardGeom, basicMat({ color: col, transparent: true, opacity: 0.15, side: THREE.DoubleSide }));
      // Glowing border
      const border = new THREE.Mesh(borderGeom, basicMat({ color: col, transparent: true, opacity: 0.4, side: THREE.DoubleSide, wireframe: true }));

      // Edge line highlights
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(4.5, 2.8, 0.04)),
        lineMat(col, 0.6)
      );

      // Inner glow overlay
      const innerGlow = new THREE.Mesh(
        new THREE.PlaneGeometry(4.2, 2.5),
        basicMat({ color: col, transparent: true, opacity: 0.06, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
      );
      innerGlow.position.z = 0.02;

      cg.add(panel, border, edges, innerGlow);
      cg.position.set(...pos);
      cg.rotation.set(rx, ry, 0);
      cg.userData.floatOffset = i * 1.3;
      cg.userData.floatSpeed = 0.7 + i * 0.15;
      cg.userData.baseRY = ry;
      scene.add(cg);
      glassCards.push(cg);
    });

    // ═══════════════════════════════════════════════════════════
    // 10. WEB DEV & AI OBJECTS
    // ═══════════════════════════════════════════════════════════
    const techGroup = new THREE.Group();
    const techMat = stdMat({ color: 0x0f172a, roughness: 0.15, metalness: 0.9 });

    // Laptop silhouette
    const lapG = new THREE.Group();
    const lapBase = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.12, 2.4), techMat);
    const lapScreen = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.0, 0.1), techMat);
    const screenDisplay = new THREE.Mesh(
      new THREE.PlaneGeometry(2.8, 1.8),
      basicMat({ color: 0x3b82f6, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending })
    );
    lapScreen.position.set(0, 1.1, -1.18);
    lapScreen.rotation.x = 0.22;
    screenDisplay.position.set(0, 0, 0.06);
    lapScreen.add(screenDisplay);
    lapG.add(lapBase, lapScreen);
    lapG.position.set(-9, -8, 5);
    lapG.rotation.y = 0.4;
    techGroup.add(lapG);

    // Phone silhouette
    const phoneG = new THREE.Group();
    const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.2, 0.14), techMat);
    const phoneScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9, 1.9),
      basicMat({ color: 0x8b5cf6, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending })
    );
    phoneScreen.position.set(0, 0, 0.08);
    phoneG.add(phoneBody, phoneScreen);
    phoneG.position.set(10, -7, 6);
    phoneG.rotation.y = -0.5;
    techGroup.add(phoneG);

    // Code brackets `</>` as 3D extrusions (approximated with planes)
    const codeGroup = new THREE.Group();
    [[-1, 0], [0, 0], [1, 0]].forEach((_, i) => {
      const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.8, 0.08), stdMat({ color: 0x06b6d4, emissive: 0x067a8a, emissiveIntensity: 0.8 }));
      bracket.position.set(i * 0.4 - 0.4, 0, 0);
      if (i !== 1) bracket.rotation.z = i === 0 ? 0.25 : -0.25;
      codeGroup.add(bracket);
    });
    codeGroup.position.set(-7, 12, -6);
    techGroup.add(codeGroup);

    scene.add(techGroup);

    // ─── Neural Network Visualization ─────────────────────────
    const neuralGroup = new THREE.Group();
    const nodeCount = isMobile ? 14 : 28;
    const nodePositions = [];
    const nodeGeom = new THREE.SphereGeometry(0.2, 8, 8);

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 14 + 5,
        (Math.random() - 0.5) * 12 - 12
      );
      nodePositions.push(pos);
      const node = new THREE.Mesh(nodeGeom, basicMat({ color: 0x8b5cf6, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending }));
      node.position.copy(pos);
      neuralGroup.add(node);
    }

    // Connections between nodes
    for (let i = 0; i < nodeCount; i++) {
      const connections = isMobile ? 1 : 2;
      for (let j = 0; j < connections; j++) {
        const target = (i + j + 1) % nodeCount;
        const pts = [nodePositions[i], nodePositions[target]];
        const g = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = lineMat(Math.random() > 0.5 ? 0x6366f1 : 0x38bdf8, 0.25);
        neuralGroup.add(new THREE.Line(g, mat));
      }
    }
    scene.add(neuralGroup);

    // ═══════════════════════════════════════════════════════════
    // 11. DEEP-SPACE PARTICLE CONSTELLATION
    // ═══════════════════════════════════════════════════════════
    const PTCL_COUNT = isMobile ? 400 : 1200;
    const ptclGeom = new THREE.BufferGeometry();
    const ptclPos = new Float32Array(PTCL_COUNT * 3);
    const ptclCol = new Float32Array(PTCL_COUNT * 3);
    const palette = [new THREE.Color('#3B82F6'), new THREE.Color('#8B5CF6'), new THREE.Color('#06B6D4'), new THREE.Color('#F59E0B'), new THREE.Color('#F8FAFC')];

    for (let i = 0; i < PTCL_COUNT; i++) {
      ptclPos[i * 3] = (Math.random() - 0.5) * 80;
      ptclPos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      ptclPos[i * 3 + 2] = (Math.random() - 0.5) * 50;
      const c = palette[Math.floor(Math.random() * palette.length)];
      ptclCol[i * 3] = c.r;
      ptclCol[i * 3 + 1] = c.g;
      ptclCol[i * 3 + 2] = c.b;
    }
    ptclGeom.setAttribute('position', new THREE.BufferAttribute(ptclPos, 3));
    ptclGeom.setAttribute('color', new THREE.BufferAttribute(ptclCol, 3));

    const ptclMat = new THREE.PointsMaterial({
      size: isMobile ? 0.32 : 0.42, vertexColors: true,
      transparent: true, opacity: 0.82, blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(ptclGeom, ptclMat);
    scene.add(particles);

    // ═══════════════════════════════════════════════════════════
    // 12. ATMOSPHERIC SKY RINGS & AURORA
    // ═══════════════════════════════════════════════════════════
    const auroraColors = [0x4ade80, 0x38bdf8, 0xa78bfa];
    auroraColors.forEach((col, i) => {
      const auroraRing = new THREE.Mesh(
        new THREE.TorusGeometry(35 + i * 8, 0.5 - i * 0.1, 8, 100),
        basicMat({ color: col, transparent: true, opacity: 0.05 - i * 0.01, blending: THREE.AdditiveBlending })
      );
      auroraRing.rotation.x = Math.PI / 4 + i * 0.2;
      auroraRing.userData.floatOffset = i * 2.1;
      scene.add(auroraRing);
    });

    // ═══════════════════════════════════════════════════════════
    // 13. ORBITAL MARKER RINGS AROUND GLOBE
    // ═══════════════════════════════════════════════════════════
    const orbitRings = [];
    [[14, 0.1, Math.PI / 3], [17, 0.07, Math.PI / 6], [20, 0.05, Math.PI * 0.6]].forEach(([r, t, rx]) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, t, 12, 120),
        basicMat({ color: Math.random() > 0.5 ? 0x38bdf8 : 0x8b5cf6, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending })
      );
      ring.rotation.x = rx;
      globeGroup.add(ring);
      orbitRings.push(ring);
    });

    // ═══════════════════════════════════════════════════════════
    // 14. INTERACTIVE STATE & LISTENERS
    // ═══════════════════════════════════════════════════════════
    let mouseX = 0, mouseY = 0;
    let smoothX = 0, smoothY = 0;
    let scrollY = window.scrollY || 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onScroll = () => { scrollY = window.scrollY; };
    const onResize = () => {
      if (!container) return;
      W = container.clientWidth;
      H = container.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // ═══════════════════════════════════════════════════════════
    // 15. ANIMATION LOOP
    // ═══════════════════════════════════════════════════════════
    let rafId;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const S = speedMult;

      // Mouse spring physics
      smoothX += (mouseX - smoothX) * 0.035;
      smoothY += (mouseY - smoothY) * 0.035;

      // Scroll-driven camera zoom & tilt
      const sf = Math.min(scrollY / 900, 1.5);
      camera.position.y = 4 - sf * 5;
      camera.position.z = 30 + sf * 8;
      camera.position.x = smoothX * 2.5;

      // Subtle mouse-look
      camera.rotation.y = -smoothX * 0.04;
      camera.rotation.x = smoothY * 0.025;

      // Globe slow rotation
      globeGroup.rotation.y = t * 0.04 * S + smoothX * 0.18;
      wireGrid.rotation.y = t * 0.042 * S;
      clouds.rotation.y = t * 0.055 * S;
      clouds.rotation.z = t * 0.02 * S;

      // Marker pulse ring
      markerGroup.children.forEach((child, i) => {
        if (child.geometry?.type === 'RingGeometry') {
          const pScale = 1 + Math.sin(t * 2.5 + i) * 0.22;
          child.scale.set(pScale, pScale, pScale);
          child.material.opacity = 0.35 + Math.abs(Math.sin(t * 2 + i)) * 0.3;
        }
      });

      // Student walking cycle
      const walk = Math.sin(t * 5.5 * S);
      leftLegG.rotation.x = walk * 0.5;
      rightLegG.rotation.x = -walk * 0.5;
      leftArmG.rotation.x = -walk * 0.35;
      rightArmG.rotation.x = walk * 0.35;
      head.rotation.y = Math.sin(t * 2.5 * S) * 0.08;
      studentGroup.position.y = GLOBE_R + 0.5 + Math.abs(Math.sin(t * 11 * S)) * 0.04;

      // Student + path mouse response
      studentGroup.rotation.y = smoothX * 0.08;

      // Airplane orbital flight path
      const fAngle = t * 0.38 * S;
      const fR = 18;
      planeGroup.position.x = Math.cos(fAngle) * fR;
      planeGroup.position.z = Math.sin(fAngle) * fR * 0.65;
      planeGroup.position.y = Math.sin(fAngle * 1.5) * 3 + 6;
      planeGroup.rotation.y = -fAngle + Math.PI / 2;
      planeGroup.rotation.z = Math.sin(fAngle * 0.7) * 0.12;

      // Sunrise pulse & god rays
      sunriseGlow.intensity = 2.8 + Math.sin(t * 1.2) * 0.4;
      sunCore.scale.setScalar(1 + Math.sin(t * 0.9) * 0.04);

      // Floating books
      books.forEach(b => {
        const { floatOffset, floatSpeed } = b.userData;
        b.position.y = b.position.y + Math.sin(t * floatSpeed * S + floatOffset) * 0.004;
        b.rotation.y += 0.003 * S;
        b.rotation.z = Math.sin(t * 0.7 + floatOffset) * 0.06;
      });

      // Graduation symbols floating
      gradGroup.children.forEach((g) => {
        const { floatOffset, floatSpeed } = g.userData;
        g.position.y += Math.sin(t * floatSpeed * S + floatOffset) * 0.004;
        g.rotation.y += 0.005 * S;
      });

      // Holographic cards hover & tilt toward mouse
      glassCards.forEach((c) => {
        const { floatOffset, floatSpeed, baseRY } = c.userData;
        c.position.y += Math.sin(t * floatSpeed * S + floatOffset) * 0.003;
        c.rotation.y = baseRY + smoothX * 0.12;
        c.rotation.x = smoothY * 0.08 + Math.sin(t + floatOffset) * 0.03;
      });

      // Laptop & phone glow pulse
      lapG.position.y = -8 + Math.sin(t * 1.1) * 0.3;
      phoneG.position.y = -7 + Math.cos(t * 1.3) * 0.25;
      codeGroup.rotation.y = t * 0.4 * S;
      codeGroup.position.y = 12 + Math.sin(t * 1.6) * 0.4;

      // Neural nodes pulse
      neuralGroup.children.forEach((n, i) => {
        if (n.isMesh) n.scale.setScalar(1 + Math.sin(t * 2 + i * 0.6) * 0.25);
      });

      // Particles slow orbit with mouse influence
      particles.rotation.y = t * 0.012 * S + smoothX * 0.08;
      particles.rotation.x = t * 0.007 * S + smoothY * 0.05;

      // Orbit rings
      orbitRings.forEach((r, i) => {
        r.rotation.z = t * (0.05 + i * 0.02) * S;
      });

      renderer.render(scene, camera);
    };

    animate();

    // ═══════════════════════════════════════════════════════════
    // 16. CLEANUP
    // ═══════════════════════════════════════════════════════════
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Traverse and dispose all geometries and materials
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [webGLSupported]);

  if (!webGLSupported) {
    return (
      <div className="hero-3d-fallback" aria-label="3D Ambient Fallback">
        <div className="fallback-orb orb-1" />
        <div className="fallback-orb orb-2" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="hero-3d-container"
      aria-hidden="true"
    />
  );
}
