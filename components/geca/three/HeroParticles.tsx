"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    const COUNT = 220;
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 2);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 13;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      velocities[i * 2]     = (Math.random() - 0.5) * 0.0015;
      velocities[i * 2 + 1] = Math.random() * 0.005 + 0.001;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xc9a84c,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const linePositions = new Float32Array(COUNT * COUNT * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.06 });
    const lineObj = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineObj);

    let targetX = 0;
    let targetY = 0;
    const onMouse = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      targetY = -(e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMouse);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let raf: number;
    let lineIdx = 0;
    const MAX_DIST = 3.5;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const pos = geo.attributes.position.array as Float32Array;

      for (let i = 0; i < COUNT; i++) {
        pos[i * 3]     += velocities[i * 2];
        pos[i * 3 + 1] += velocities[i * 2 + 1];
        if (pos[i * 3 + 1] > 7)  pos[i * 3 + 1] = -7;
        if (pos[i * 3]     > 11) pos[i * 3]     = -11;
        if (pos[i * 3]     < -11) pos[i * 3]    = 11;
      }
      geo.attributes.position.needsUpdate = true;

      lineIdx = 0;
      const lp = lineGeo.attributes.position.array as Float32Array;
      for (let a = 0; a < COUNT; a++) {
        for (let b = a + 1; b < COUNT; b++) {
          const dx = pos[a * 3] - pos[b * 3];
          const dy = pos[a * 3 + 1] - pos[b * 3 + 1];
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST && lineIdx < linePositions.length - 6) {
            lp[lineIdx++] = pos[a * 3]; lp[lineIdx++] = pos[a * 3 + 1]; lp[lineIdx++] = pos[a * 3 + 2];
            lp[lineIdx++] = pos[b * 3]; lp[lineIdx++] = pos[b * 3 + 1]; lp[lineIdx++] = pos[b * 3 + 2];
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx / 3);
      lineGeo.attributes.position.needsUpdate = true;

      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose(); mat.dispose();
      lineGeo.dispose(); lineMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3 }}
    />
  );
}
