import { useEffect, useState } from "react";
import { getGPUTier } from "detect-gpu";

export function useIsLowEndDevice() {
  const [isLowEnd, setIsLowEnd] = useState<boolean | null>(null);

  useEffect(() => {
    const detect = async () => {
      const gpuTier = await getGPUTier();
      setIsLowEnd(gpuTier.fps! <= 10);
    };
    detect();
  }, []);

  return isLowEnd;
}
