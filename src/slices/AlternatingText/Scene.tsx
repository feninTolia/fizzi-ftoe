'use client';
import FloatingCan from '@/components/FloatingCan';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useGSAP } from '@gsap/react';
import { Environment } from '@react-three/drei';
import gsap from 'gsap';
import { useRef } from 'react';
import { Group } from 'three';

gsap.registerPlugin(useGSAP);

const Scene = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)', true);

  const canRef = useRef<Group>(null);
  const BG_COLORS = ['#FFA6B5', '#E9CFF6', '#CBEF9A'];

  useGSAP(
    () => {
      if (!canRef.current) return;

      const sections = gsap.utils.toArray('.alternating-section');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.alternating-text-view',
          endTrigger: '.alternating-text-container',
          pin: true,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      sections.forEach((_, idx) => {
        if (!canRef.current) return;
        if (idx === 0) return;

        const isOdd = idx % 2 !== 0;

        const xPosition = isDesktop ? (isOdd ? -2 : 0) : 0;
        const yPosition = isDesktop ? (isOdd ? '0.7' : '-0') : 0;

        scrollTl
          .to(canRef.current.position, {
            x: xPosition,
            ease: 'circ.inOut',
            delay: 0.5,
          })
          .to(
            canRef.current.rotation,
            {
              y: yPosition,
              ease: 'back.inOut',
            },
            '<'
          )
          .to('.alternating-text-container', {
            backgroundColor: gsap.utils.wrap(BG_COLORS, idx),
          });
      });
    },
    { dependencies: [isDesktop] }
  );
  return (
    <group position-x={isDesktop ? 1 : 0} rotation-y={isDesktop ? -0.4 : 0}>
      <FloatingCan flavor="strawberryLemonade" ref={canRef} />
      <Environment files={'/hdr/lobby.hdr'} environmentIntensity={1.5} />
    </group>
  );
};

export default Scene;
