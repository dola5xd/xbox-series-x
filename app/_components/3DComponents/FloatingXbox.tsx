"use client";

import { forwardRef, ReactNode } from "react";
import { Float } from "@react-three/drei";
import { Group } from "three";
import { XboxModel } from "./XboxModel";

type FloatingXboxProps = {
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

const FloatingXbox = forwardRef<Group, FloatingXboxProps>(
  (
    {
      floatSpeed = 1.5,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      ...props
    },
    ref
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          {children}
          <XboxModel position={[0, -0.25, 0]} scale={2} />
        </Float>
      </group>
    );
  }
);

FloatingXbox.displayName = "FloatingXbox";

export default FloatingXbox;
