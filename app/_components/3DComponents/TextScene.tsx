"use client";

import { Environment } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, Suspense, memo } from "react";
import FloatingXbox from "./FloatingXbox";
import { Group } from "three";
import { useIsMobile } from "@/app/_hooks/useIsMobile";
import Loader from "./Loader";

function TextSceneComponent() {
  const XboxRef = useRef<Group>(null);
  const isLargeScreen = useIsMobile(1280);

  useGSAP(() => {
    if (!XboxRef.current) return;

    const textSections = gsap.utils.toArray(".info-text-section");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".info-text-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    textSections.forEach((_, i) => {
      if (!XboxRef.current || i === 0) return;

      const isOdd = i % 2 !== 0;
      const isLast = i === textSections.length - 1;
      const moveX = isOdd ? -0.5 : isLargeScreen ? 0.5 : 1;
      const rotateY = isOdd ? 0.5 : isLast ? 2 : -0.5;

      tl.to(XboxRef.current.position, {
        x: moveX,
        ease: "circ.inOut",
      }).to(
        XboxRef.current.rotation,
        {
          y: rotateY,
          ease: "back.inOut",
        },
        "<"
      );

      if (isLast) {
        tl.to(
          XboxRef.current.scale,
          {
            x: isLargeScreen ? 1 : 1.5,
            y: isLargeScreen ? 1 : 1.5,
            z: isLargeScreen ? 1 : 1.5,
            ease: "circ.inOut",
          },
          "<"
        );
      }
    });

    return () => tl.kill();
  }, [isLargeScreen]);

  return (
    <group
      ref={XboxRef}
      position={isLargeScreen ? [0.5, 0, 0] : [1, 0, 0]}
      scale={isLargeScreen ? [1, 1, 1] : [1.25, 1.25, 1.25]}
      rotation={[0, -0.1, 0]}
    >
      <ambientLight intensity={0.5} />
      <Suspense fallback={<Loader />}>
        <FloatingXbox floatingRange={[-0.05, 0]} floatSpeed={0.5} />
      </Suspense>
      <Suspense fallback={null}>
        <Environment preset="sunset" />
      </Suspense>
    </group>
  );
}

const TextSceneContent = memo(TextSceneComponent);
TextSceneContent.displayName = "TextSceneContent"; // Fixes ESLint warning

export default TextSceneContent;
