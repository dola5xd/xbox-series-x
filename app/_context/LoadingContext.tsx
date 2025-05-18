"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type loadingContext = {
  isLoaded: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
};

const LoadingContext = createContext<loadingContext | null>(null);

function LoadingProvider({ children }: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}

function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("Bad Call context: outside provider");
  return context;
}
export { LoadingProvider, useLoading };
