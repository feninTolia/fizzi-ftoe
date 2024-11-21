'use client';
import { SodaCan, SodaCanProps } from '@/components/SodaCan';
import { Float } from '@react-three/drei';
import { forwardRef, ReactNode } from 'react';
import { Group } from 'three';

type Props = {
  flavor?: SodaCanProps['flavor'];
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

const FloatingCan = forwardRef<Group, Props>(
  (
    {
      flavor = 'blackCherry',
      floatSpeed = 1.5,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      ...props
    }: Props,
    ref
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          floatingRange={floatingRange}
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
        >
          {children}
          <SodaCan flavor={flavor} />
        </Float>
      </group>
    );
  }
);

export default FloatingCan;
