"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type VersionContextType = {
  version:
    | "1TB Disc Drive Carbon Black"
    | "1TB All-Digital Robot White"
    | "2TB Disc Drive Galaxy Black"
    | string;
  setVersion: Dispatch<
    SetStateAction<
      | "1TB Disc Drive Carbon Black"
      | "1TB All-Digital Robot White"
      | "2TB Disc Drive Galaxy Black"
      | string
    >
  >;
};

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export function VersionProvider({ children }: PropsWithChildren) {
  const [version, setVersion] = useState<VersionContextType["version"]>(
    "1TB Disc Drive Carbon Black"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = sessionStorage.getItem(
      "Version"
    ) as VersionContextType["version"];
    if (stored) {
      setVersion(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !version) return;
    sessionStorage.setItem("Version", version);
  }, [version]);

  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
}

export function useVersion() {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error(
      "useVersion must be used within a VersionProvider. Did you forget to wrap your app in <VersionProvider>?"
    );
  }
  return context;
}
