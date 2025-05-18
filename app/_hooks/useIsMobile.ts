import { useLayoutEffect, useState } from "react";

export function useIsMobile(MOBILE_BREAKPOINT = 1024) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mql.matches);

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [MOBILE_BREAKPOINT]);

  return isMobile;
}
