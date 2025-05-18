"use client";
import Hero from "./_components/sections/Hero";
import Specs from "./_components/sections/Specs";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { useLoading } from "./_context/LoadingContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const InformationSection = dynamic(
  () => import("./_components/sections/InformationSection"),
  { ssr: true }
);
const Features = dynamic(() => import("./_components/sections/Features"), {
  ssr: true,
});
const Games = dynamic(() => import("./_components/sections/Games"), {
  ssr: true,
});
const Experiences = dynamic(
  () => import("./_components/sections/Experiences"),
  { ssr: false }
);
const GamePass = dynamic(() => import("./_components/sections/GamePass"), {
  ssr: false,
});
const OldGames = dynamic(() => import("./_components/sections/OldGames"), {
  ssr: false,
});
const Versions = dynamic(() => import("./_components/sections/Versions"), {
  ssr: false,
});
const Order = dynamic(() => import("./_components/sections/Order"), {
  ssr: false,
});
const Addons = dynamic(() => import("./_components/sections/Addons"), {
  ssr: false,
});

export default function Page() {
  const { isLoaded } = useLoading();
  useEffect(() => {
    if (isLoaded) ScrollTrigger.refresh();
  }, [isLoaded]);
  return (
    <main>
      <Hero />
      <Specs />
      <Suspense
        fallback={
          <span className="fixed h-dvh top-0 left-0 w-full bg-background flex items-center justify-center *:rounded-full *:block *:h-20 *:w-20 *:border-4 *:border-transparent *:border-r-primary *:animate-spin z-100">
            <span></span>
          </span>
        }
      >
        <InformationSection />
        <Features />
        <Games />
        <Experiences />
        <GamePass />
        <OldGames />
        <Versions />
        <Order />
        <Addons />
      </Suspense>
    </main>
  );
}
