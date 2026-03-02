'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function Pokeball({ color1 = '#ff0000', color2 = '#ffffff' }: { color1?: string; color2?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const bandRef = useRef<THREE.Mesh>(null);
  const buttonRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group>
      {/* Top half (red) */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color1} metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Bottom half (white) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 64, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color={color2} metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Center band */}
      <mesh ref={bandRef} position={[0, 0, 0]}>
        <torusGeometry args={[1, 0.05, 16, 100]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Center button */}
      <mesh ref={buttonRef} position={[0, 0, 1]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial color="#fff" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 1.01]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#ccc" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Button border */}
      <mesh position={[0, 0, 1.02]}>
        <ringGeometry args={[0.15, 0.2, 32]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function FloatingPokeball() {
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <Pokeball />
    </Float>
  );
}

interface Pokeball3DProps {
  className?: string;
  color1?: string;
  color2?: string;
}

export function Pokeball3D({ className = '', color1, color2 }: Pokeball3DProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <FloatingPokeball />
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </motion.div>
  );
}

// Animated background component
export function PokeballBackground() {
  return (
    <div className="absolute inset-0 -z-10 opacity-20">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} />
        
        {[...Array(5)].map((_, i) => (
          <Float key={i} speed={1 + i * 0.5} floatIntensity={2}>
            <Pokeball />
          </Float>
        ))}
      </Canvas>
    </div>
  );
}