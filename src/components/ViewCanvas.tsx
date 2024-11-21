'use client';
import { View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Loader = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Loader),
  { ssr: false }
);

const ViewCanvas = () => {
  return (
    <>
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          zIndex: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{ fov: 30 }}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
};

export default ViewCanvas;