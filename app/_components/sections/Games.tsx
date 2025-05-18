"use client";
import { useRef } from "react";
import { View } from "@react-three/drei";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import XboxLogo from "@/app/_assets/svg/xbox_logo.svg";
import { gamesData } from "@/app/_lib/Constants";
import { segoePro } from "@/app/_lib/fonts";
import { useIsMobile } from "@/app/_hooks/useIsMobile";
import { useIsLowEndDevice } from "@/app/_hooks/useIsLowEndDevice";

const GamesScene = dynamic(() => import("../3DComponents/GamesScene"), {
  ssr: false,
});

export default function Games() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isLowEnd = useIsLowEndDevice();

  useGSAP(() => {
    const el = ref.current;
    if (!el || isMobile === null || isLowEnd === null) return;

    const cards = gsap.utils.toArray<HTMLElement>(".game-card");
    const scrollDistance = el.scrollWidth - window.innerWidth;
    const isFadeMode = isMobile || isLowEnd;
    const tl = gsap.timeline({
      scrollTrigger: isFadeMode
        ? {
            trigger: el,
            start: "top center",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          }
        : {
            trigger: el,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            snap: 1 / 2,
          },
    });

    if (!isFadeMode) {
      tl.to(cards, { x: -scrollDistance, ease: "none" });
    } else {
      tl.fromTo(
        cards,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.5, ease: "power2.inOut" }
      );
    }
  }, [isMobile, isLowEnd]);

  const layoutClasses = isLowEnd
    ? "md:flex-row md:flex-wrap md:w-full md:min-h-dvh md:px-20"
    : "md:items-start md:flex-row md:w-[calc(300px_*_6)] md:min-h-[100vh]";

  return (
    <section className="relative w-full py-20 overflow-x-hidden lg:min-h-dvh min-h-dvh info-games-container">
      <div className="flex flex-col px-10 my-10 text-center lg:px-0 gap-y-1">
        <h2
          className={`${segoePro.className} text-primary font-black text-3xl md:text-6xl`}
        >
          TRUE 4K GAMING
        </h2>
        <p className="self-center font-semibold md:w-3/4 md:text-lg lg:text-2xl text-secondary">
          Immerse yourself with sharper characters, brighter worlds, and
          impossible details with true-to-life 4K.
        </p>
      </div>
      <div
        ref={ref}
        className={`relative flex flex-col items-center gap-y-10 px-10 gap-x-10 info-games-scroll-container ${layoutClasses}`}
      >
        {gamesData.map((game, i) => (
          <Link
            href={game.link}
            target="_blank"
            key={i}
            className="game-card relative flex-shrink-0 w-[300px] h-[500px] flex flex-col items-center gap-y-4 justify-center z-10 cursor-pointer"
          >
            <div className="absolute z-10 w-10 h-10 top-5 left-5">
              <Image
                src={XboxLogo}
                alt="Xbox logo"
                fill
                sizes="40px"
                className="object-cover object-center"
              />
            </div>
            <h2
              className={`${segoePro.className} font-black text-2xl uppercase text-center text-white z-10`}
            >
              {game.name}
            </h2>
            <Image
              src={game.img}
              alt={game.name}
              fill
              className="object-cover object-top opacity-75"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        ))}
      </div>
      {!isMobile && !isLowEnd && (
        <div className="absolute bottom-0 left-0 w-full h-dvh z-[20]">
          <View className="w-full h-full info-games-view">
            <GamesScene />
          </View>
        </div>
      )}
    </section>
  );
}
