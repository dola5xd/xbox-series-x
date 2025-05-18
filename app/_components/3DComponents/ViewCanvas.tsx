"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Suspense } from "react";

type Props = object;

export default function ViewCanvas({}: Props) {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
          pointerEvents: "none",
        }}
        shadows
        gl={{ antialias: true }}
        camera={{ position: [-1, 0, 1], fov: 30 }}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>
    </>
  );
}
