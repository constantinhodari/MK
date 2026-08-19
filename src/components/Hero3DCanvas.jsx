import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const containerRef = useRef(null);
  const [webGLSupported] = useState(() => {
    try {
      const canvas = document.createElement('canvas');
      return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!webGLSupported || !containerRef.current) return undefined;
    const container = containerRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const lowPower = isMobile || prefersReducedMotion;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04080f, 0.018);
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 160);
    camera.position.set(0, 3, 27);

    const group = new THREE.Group();
    scene.add(group);
    scene.add(new THREE.AmbientLight(0x10213d, 1.5));
    const key = new THREE.DirectionalLight(0xffd58a, 2.2);
    key.position.set(-8, 12, 18);
    scene.add(key);
    const rim = new THREE.PointLight(0x38bdf8, 2, 55);
    rim.position.set(14, 6, 8);
    scene.add(rim);

    const globeRadius = 7.5;
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius, lowPower ? 32 : 56, lowPower ? 32 : 56),
      new THREE.MeshStandardMaterial({ color: 0x071b3a, roughness: 0.48, metalness: 0.65, emissive: 0x041126, emissiveIntensity: 0.55 })
    );
    globe.position.set(0, -5, 0);
    group.add(globe);

    const grid = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius + 0.04, lowPower ? 18 : 30, lowPower ? 18 : 30),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.14 })
    );
    grid.position.copy(globe.position);
    group.add(grid);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius + 0.9, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.08, side: THREE.BackSide, blending: THREE.AdditiveBlending })
    );
    atmosphere.position.copy(globe.position);
    group.add(atmosphere);

    const hubData = [
      [40.71, -74.01], [51.51, -0.13], [48.86, 2.35], [35.68, 139.65],
      [-33.87, 151.21], [-1.29, 36.82], [19.08, 72.88], [52.52, 13.4],
    ];
    const latLngToVec = (lat, lng, radius) => {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lng + 180) * Math.PI / 180;
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    const markerGroup = new THREE.Group();
    const markerGeometry = new THREE.SphereGeometry(0.16, 10, 10);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x7dd3fc });
    const markerPositions = hubData.map(([lat, lng]) => latLngToVec(lat, lng, globeRadius + 0.15));
    markerPositions.forEach((position) => {
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(position);
      markerGroup.add(marker);
    });
    markerGroup.position.copy(globe.position);
    group.add(markerGroup);

    const arcMaterial = new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.38 });
    for (let i = 0; i < markerPositions.length - 1; i += 1) {
      const a = markerPositions[i];
      const b = markerPositions[i + 1];
      const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5).normalize().multiplyScalar(globeRadius + 1.8);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
      const line = new THREE.Line(geometry, arcMaterial);
      line.position.copy(globe.position);
      group.add(line);
    }

    const particleCount = lowPower ? 260 : 520;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 52;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 34;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 32;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0x60a5fa, size: isMobile ? 0.2 : 0.28, transparent: true, opacity: 0.42, depthWrite: false })
    );
    scene.add(particles);

    const halo = new THREE.Mesh(
      new THREE.RingGeometry(8.8, 9.2, 64),
      new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.11, side: THREE.DoubleSide, blending: THREE.AdditiveBlending })
    );
    halo.position.set(0, -5, -0.2);
    halo.rotation.x = Math.PI / 2.3;
    scene.add(halo);

    let mouseX = 0;
    let mouseY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let scrollY = window.scrollY;
    let rafId;
    const clock = new THREE.Clock();

    const onMouseMove = (event) => {
      if (isMobile) return;
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onScroll = () => { scrollY = window.scrollY; };
    const onResize = () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0 : (isMobile ? 0.35 : 0.65);
      smoothX += (mouseX - smoothX) * 0.025;
      smoothY += (mouseY - smoothY) * 0.025;
      const scrollFactor = Math.min(scrollY / 900, 1);
      camera.position.x = smoothX * 1.5;
      camera.position.y = 3 - scrollFactor * 2;
      camera.position.z = 27 + scrollFactor * 3;
      camera.lookAt(0, -2, 0);
      globe.rotation.y = t * 0.035 * speed + smoothX * 0.12;
      grid.rotation.y = t * 0.038 * speed;
      atmosphere.rotation.y = t * 0.025 * speed;
      markerGroup.rotation.y = globe.rotation.y;
      particles.rotation.y = t * 0.008 * speed + smoothX * 0.04;
      particles.rotation.x = t * 0.004 * speed + smoothY * 0.025;
      halo.rotation.z = t * 0.02 * speed;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [webGLSupported]);

  if (!webGLSupported) {
    return <div className="hero-3d-fallback" aria-hidden="true"><div className="fallback-orb orb-1" /><div className="fallback-orb orb-2" /></div>;
  }

  return <div ref={containerRef} className="hero-3d-container" aria-hidden="true" />;
}
