"use client";

import { Html } from "@react-three/drei";
import { memo } from "react";

const Loader = () => {
  return (
    <Html center>
      <div className="spinner" />
      <style>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #9bf00b;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Html>
  );
};

const MemoizedLoader = memo(Loader);
MemoizedLoader.displayName = "Loader";

export default MemoizedLoader;
