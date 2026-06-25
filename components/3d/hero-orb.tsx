"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Glowing background dust particles
function Particles({ count = 120 }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute particles in a loose sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.5 + Math.random() * 2.0;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.05;
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
        color="#00AFB4"
        size={0.035}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Glassmorphic organic morphing seed component
function GlassmorphicSeed() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow elegant rotation
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.0}>
      <mesh ref={meshRef}>
        {/* Organic 3D Geometry */}
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color="#00AFB4"
          attach="material"
          distort={0.3} // Organic morphing factor
          speed={2.2} // Animation speed of distortion
          roughness={0.08}
          metalness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.9} // Glass opacity/transmission
          thickness={1.4} // Refraction thickness
          ior={1.45} // Index of refraction
          attenuationDistance={1}
          attenuationColor="#ffffff"
        />
      </mesh>
    </Float>
  );
}

// 2D SVG/CSS Animated Fallback for mobile/non-WebGL browsers
function FallbackOrb() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-primary/20 to-primary-soft/30 blur-3xl animate-float" />
      <div className="relative w-56 h-56 rounded-full border border-primary/20 flex items-center justify-center bg-card/10 backdrop-blur-md">
        <svg viewBox="0 0 100 100" className="w-40 h-40 text-primary animate-pulse-glow rounded-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M50 5 C75 5, 95 25, 95 50 C95 75, 75 95, 50 95 C25 95, 5 75, 5 50 C5 25, 25 5, 50 5 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="4" className="fill-primary" />
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
    try {
      const canvas = document.createElement("canvas");
      const isAvailable = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      ) && window.innerWidth >= 768; // Only run WebGL on desktop/tablet
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
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-5, 5, 2]} intensity={1.0} />
        
        <Particles count={150} />
        <GlassmorphicSeed />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
}
