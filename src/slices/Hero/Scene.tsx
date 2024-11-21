import FloatingCan from '@/components/FloatingCan';
import { useStore } from '@/hooks/useStore';
import { useGSAP } from '@gsap/react';
import { Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import { Group, Object3DEventMap } from 'three';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const Scene = () => {
  const setIsReady = useStore((state) => state.setIsReady);

  const can1Ref = useRef<Group<Object3DEventMap>>(null);
  const can2Ref = useRef<Group<Object3DEventMap>>(null);
  const can3Ref = useRef<Group<Object3DEventMap>>(null);
  const can4Ref = useRef<Group<Object3DEventMap>>(null);
  const can5Ref = useRef<Group<Object3DEventMap>>(null);

  const can1GroupRef = useRef<Group>(null);
  const can2GroupRef = useRef<Group>(null);

  const groupRef = useRef<Group>(null);

  const FLOAT_SPEED = 1.5;

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !groupRef.current
    )
      return;

    setIsReady();

    // Set up starting position
    gsap.set(can1Ref.current.position, { x: -1.5 });
    gsap.set(can1Ref.current.rotation, { z: -0.5 });

    gsap.set(can2Ref.current.position, { x: 1.5 });
    gsap.set(can2Ref.current.rotation, { z: 0.5 });

    gsap.set(can3Ref.current.position, { y: 5, z: 2 });
    gsap.set(can4Ref.current.position, { x: 2, y: 4, z: 2 });
    gsap.set(can5Ref.current.position, { y: -5 });

    const introTl = gsap.timeline({
      defaults: { duration: 3, ease: 'back.out(1.4)' },
    });

    if (window.scrollY < 20) {
      introTl.from(can1GroupRef.current.position, { y: -5, x: 1 }, 0);
      introTl.from(can1GroupRef.current.rotation, { z: 3 }, 0);
      introTl.from(can2GroupRef.current.position, { y: 5, x: 1 }, 0);
      introTl.from(can2GroupRef.current.rotation, { z: 3 }, 0);
    }

    const scrollTl = gsap.timeline({
      defaults: { duration: 2 },
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    scrollTl
      // Rotate can group
      .to(groupRef.current.rotation, { y: Math.PI * 2 })

      // Can 1 - Cherry
      .to(can1Ref.current.position, { x: -0.2, y: -0.7, z: -2 }, 0)
      .to(can1Ref.current?.rotation, { z: 0.3 }, 0)

      // Can 2 - Lemon
      .to(can2Ref.current.position, { x: 1, y: -0.2, z: -1 }, 0)
      .to(can2Ref.current?.rotation, { z: 0 }, 0)

      // Can 3 - Grape
      .to(can3Ref.current.position, { x: -0.3, y: 0.5, z: -1 }, 0)
      .to(can3Ref.current?.rotation, { z: -0.1 }, 0)

      // Can 4 - Strawberry
      .to(can4Ref.current.position, { x: 0, y: -0.3, z: 0.5 }, 0)
      .to(can4Ref.current?.rotation, { z: 0.3 }, 0)

      // Can 5 - Watermelon
      .to(can5Ref.current.position, { x: 0.3, y: 0.5, z: -0.5 }, 0)
      .to(can5Ref.current?.rotation, { z: -0.25 }, 0)

      // Shift group
      .to(
        groupRef.current.position,
        {
          x: 1,
          duration: 3,
          ease: 'sine.inOut',
        },
        0.7
      );
  }, []);

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan
          floatSpeed={FLOAT_SPEED}
          flavor="blackCherry"
          ref={can1Ref}
        />
      </group>
      <group ref={can2GroupRef}>
        <FloatingCan
          floatSpeed={FLOAT_SPEED}
          flavor="lemonLime"
          ref={can2Ref}
        />
      </group>
      <FloatingCan floatSpeed={FLOAT_SPEED} flavor="grape" ref={can3Ref} />
      <FloatingCan
        floatSpeed={FLOAT_SPEED}
        flavor="strawberryLemonade"
        ref={can4Ref}
      />
      <FloatingCan floatSpeed={FLOAT_SPEED} flavor="watermelon" ref={can5Ref} />
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
};
