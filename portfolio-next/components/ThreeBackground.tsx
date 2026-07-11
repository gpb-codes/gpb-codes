'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const COUNT = 120;
const SPREAD = 12;
const MOUSE_FACTOR = 0.008;
const CONNECTION_DISTANCE = 2.5;
const CONNECTION_OPACITY = 0.08;

export default function ThreeBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const w = el.clientWidth;
    const h = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    // Particle positions with depth layers
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const opacities = new Float32Array(COUNT);
    const speeds = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * SPREAD;
      positions[i3 + 1] = (Math.random() - 0.5) * SPREAD;
      positions[i3 + 2] = (Math.random() - 0.5) * SPREAD;
      sizes[i] = 0.02 + Math.random() * 0.04;
      opacities[i] = 0.15 + Math.random() * 0.35;
      speeds[i] = 0.3 + Math.random() * 0.7;
    }

    // Main particle system
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x6366f1,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Connection lines geometry
    const linePositions = new Float32Array(COUNT * COUNT * 6);
    const lineColors = new Float32Array(COUNT * COUNT * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: CONNECTION_OPACITY,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Nebula glow planes
    const nebulaGeo = new THREE.PlaneGeometry(20, 20);
    const nebulaMat1 = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.015,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const nebula1 = new THREE.Mesh(nebulaGeo, nebulaMat1);
    nebula1.position.set(-3, 2, -8);
    nebula1.rotation.z = 0.3;
    scene.add(nebula1);

    const nebulaMat2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.01,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const nebula2 = new THREE.Mesh(nebulaGeo, nebulaMat2);
    nebula2.position.set(4, -1, -10);
    nebula2.rotation.z = -0.5;
    scene.add(nebula2);

    camera.position.z = 5;

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    let frame: number;
    const tempVec = new THREE.Vector3();
    const tempVec2 = new THREE.Vector3();

    const anim = () => {
      frame = requestAnimationFrame(anim);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      // Animate particles with individual speeds
      const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      const time = Date.now() * 0.0001;

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        arr[i3 + 1] += Math.sin(time + i * 0.1) * 0.0003 * speeds[i];
        arr[i3] += Math.cos(time + i * 0.15) * 0.0002 * speeds[i];
      }
      posAttr.needsUpdate = true;

      // Update connection lines
      let lineIdx = 0;
      for (let i = 0; i < COUNT; i++) {
        tempVec.set(arr[i * 3], arr[i * 3 + 1], arr[i * 3 + 2]);
        for (let j = i + 1; j < COUNT; j++) {
          tempVec2.set(arr[j * 3], arr[j * 3 + 1], arr[j * 3 + 2]);
          const dist = tempVec.distanceTo(tempVec2);
          if (dist < CONNECTION_DISTANCE) {
            const fade = 1 - dist / CONNECTION_DISTANCE;
            linePositions[lineIdx * 6] = arr[i * 3];
            linePositions[lineIdx * 6 + 1] = arr[i * 3 + 1];
            linePositions[lineIdx * 6 + 2] = arr[i * 3 + 2];
            linePositions[lineIdx * 6 + 3] = arr[j * 3];
            linePositions[lineIdx * 6 + 4] = arr[j * 3 + 1];
            linePositions[lineIdx * 6 + 5] = arr[j * 3 + 2];

            const c = fade * 0.6;
            lineColors[lineIdx * 6] = 0.388 * c;
            lineColors[lineIdx * 6 + 1] = 0.4 * c;
            lineColors[lineIdx * 6 + 2] = 0.945 * c;
            lineColors[lineIdx * 6 + 3] = 0.388 * c;
            lineColors[lineIdx * 6 + 4] = 0.4 * c;
            lineColors[lineIdx * 6 + 5] = 0.945 * c;
            lineIdx++;
          }
        }
      }
      // Zero out unused line segments
      for (let i = lineIdx * 6; i < linePositions.length; i++) {
        linePositions[i] = 0;
        lineColors[i] = 0;
      }
      lineGeo.getAttribute('position').needsUpdate = true;
      lineGeo.getAttribute('color').needsUpdate = true;
      lineGeo.setDrawRange(0, lineIdx * 2);

      // Rotate scene
      points.rotation.y += 0.0002;
      points.rotation.x += (mouse.y * MOUSE_FACTOR - points.rotation.x) * 0.008;
      points.rotation.y += (mouse.x * MOUSE_FACTOR) * 0.003;

      lines.rotation.copy(points.rotation);

      // Nebula subtle drift
      nebula1.rotation.z += 0.0001;
      nebula2.rotation.z -= 0.00008;
      nebula1.position.x = -3 + Math.sin(time * 5) * 0.5;
      nebula2.position.y = -1 + Math.cos(time * 4) * 0.3;

      // Subtle camera breathing
      camera.position.x = Math.sin(time * 3) * 0.1;
      camera.position.y = Math.cos(time * 2.5) * 0.05;

      renderer.render(scene, camera);
    };
    anim();

    const resize = () => {
      const w2 = el.clientWidth;
      const h2 = el.clientHeight;
      renderer.setSize(w2, h2);
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      geo.dispose();
      mat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      nebulaGeo.dispose();
      nebulaMat1.dispose();
      nebulaMat2.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={ref} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />;
}
