"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Glowing particle sphere component
function ParticleSphere() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle coordinates on a sphere
  const count = 400;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 1.8;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  // Rotate points
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7A9A5E"
        size={0.065}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 2D SVG/CSS Animated Fallback
function FallbackOrb() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Animated Glowing Matcha Orbs */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-primary/30 to-glow/40 blur-3xl animate-float" />
      <div className="relative w-56 h-56 rounded-full border border-primary/20 flex items-center justify-center">
        {/* Core Seed Map SVG */}
        <svg viewBox="0 0 100 100" className="w-40 h-40 text-primary animate-pulse-glow rounded-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M50 5 C75 5, 95 25, 95 50 C95 75, 75 95, 50 95 C25 95, 5 75, 5 50 C5 25, 25 5, 50 5 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="4" className="fill-primary" />
          {/* Outer Ring nodes */}
          <circle cx="50" cy="14" r="2" className="fill-primary" />
          <circle cx="86" cy="50" r="2" className="fill-primary" />
          <circle cx="50" cy="86" r="2" className="fill-primary" />
          <circle cx="14" cy="50" r="2" className="fill-primary" />
        </svg>
      </div>
    </div>
  );
}

export default function Hero3DOrb() {
  const [webGLAvailable, setWebGLAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Detect WebGL capability and screen size
    try {
      const canvas = document.createElement("canvas");
      const isAvailable = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      ) && window.innerWidth >= 768; // Only render 3D on tablet/desktop
      setWebGLAvailable(isAvailable);
    } catch (e) {
      setWebGLAvailable(false);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  if (!webGLAvailable) {
    return <FallbackOrb />;
  }

  return (
    <div className="w-full h-full min-h-[350px] md:min-h-[450px]">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <ParticleSphere />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
