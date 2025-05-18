"use client";

import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useRef, Suspense, memo } from "react";
import { Group } from "three";
import { ControllerModel } from "./ControllerModel";
import Loader from "./Loader";

function SceneContentComponent() {
  const controllerRef = useRef<Group>(null);

  return (
    <group ref={controllerRef}>
      <Float
        speed={2}
        rotationIntensity={1}
        floatIntensity={1}
        floatingRange={[0, 0.1]}
      >
        <ControllerModel
          position={[0, -0.05, 0]}
          rotation={[0, 0, 0]}
          scale={0.04}
        />
      </Float>

      <OrbitControls
        autoRotate
        enableRotate
        enableZoom={false}
        minPolarAngle={-Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />

      <Environment preset="sunset" />
    </group>
  );
}

const SceneContent = memo(SceneContentComponent);
SceneContent.displayName = "SceneContent";

export default function GamesScene() {
  return (
    <Suspense fallback={<Loader />}>
      <SceneContent />
    </Suspense>
  );
}
