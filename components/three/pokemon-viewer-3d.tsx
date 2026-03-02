'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { motion } from 'framer-motion';

function PokemonSprite({ spriteUrl }: { spriteUrl: string }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <sprite scale={[2, 2, 1]}>
        <spriteMaterial color="#fff" />
      </sprite>
    </Float>
  );
}

interface Pokemon3DViewerProps {
  spriteUrl: string;
  className?: string;
}

export function Pokemon3DViewer({ spriteUrl, className = '' }: Pokemon3DViewerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <PokemonSprite spriteUrl={spriteUrl} />
          
          <Environment preset="studio" />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}