"use client";
import { useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/app/_hooks/useIsMobile";
import { useIsLowEndDevice } from "@/app/_hooks/useIsLowEndDevice";
import { useVersion } from "@/app/_context/VersionContext";
import {
  informations,
  xboxVersions,
  XboxVersionsType,
} from "@/app/_lib/Constants";
import { segoePro } from "@/app/_lib/fonts";
import { View } from "@react-three/drei";

const TextSceneContent = dynamic(() => import("../3DComponents/TextScene"), {
  ssr: false,
});

export default function InformationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isMobile = useIsMobile();
  const isLowEnd = useIsLowEndDevice();
  const { version: deviceVer } = useVersion();
  const version = useMemo<XboxVersionsType>(
    () =>
      xboxVersions.find((v) => v.description === deviceVer) ?? xboxVersions[0],
    [deviceVer]
  );

  useGSAP(() => {
    if (!containerRef.current) return;
    if (!isMobile && !isLowEnd) {
      ScrollTrigger.create({
        trigger: ".info-text-view",
        endTrigger: ".info-text-container",
        pin: true,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      });
    }
    informations.forEach((info, i) => {
      const section = document.querySelectorAll(".info-text-section")[
        i
      ] as HTMLElement;
      const head = section.querySelector("h2")!;
      const para = section.querySelector("p")!;
      const img = section.querySelector("img")!;
      const span = head.querySelector("span")!;
      gsap.fromTo(
        [head, para],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: isMobile ? "top 75%" : "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      if (isMobile) {
        gsap.fromTo(
          img,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
      gsap.fromTo(
        span,
        { width: 0 },
        {
          width: "100%",
          duration: 1,
          delay: 0.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: isMobile ? "top 75%" : "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [isMobile, isLowEnd]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-10 min-h-dvh lg:py-20 bg-white/5 info-text-container"
    >
      <div className="flex items-center justify-center head-container">
        <h2 className="flex flex-col gap-2 text-2xl font-bold text-center lg:gap-4 lg:text-5xl lg:flex-row">
          Let&apos;s Talk about
          <span
            className={`${segoePro.className} w-fit flex flex-col gap-y-2 lg:gap-y-4 relative font-black text-primary text-3xl lg:text-6xl `}
          >
            Xbox Series X
            <span className="block w-full h-2 lg:h-4 bg-primary -skew-x-20"></span>
          </span>
        </h2>
      </div>

      <div className="relative z-[100] flex flex-col xl:flex-row md:justify-center gap-y-10 lg:grid lg:py-4 lg:px-10 xl:px-20 max-w-[676px] md:max-w-full">
        {!isMobile && isLowEnd === false && (
          <View className="absolute top-0 left-0 w-full pointer-events-none h-dvh info-text-view">
            <TextSceneContent />
          </View>
        )}
        {informations.map((info, i) => (
          <div
            key={i}
            className={`relative flex px-10 flex-col justify-center ${
              isLowEnd ? "lg:min-h-auto" : "lg:min-h-dvh"
            } lg:grid info-text-section gap-y-7 lg:gap-x-12 lg:grid-cols-2 lg:px-0 lg:w-full`}
          >
            {(isMobile || isLowEnd) && (
              <div className="relative w-full lg:row-start-1 overflow-hidden aspect-square md:aspect-[5/4] lg:aspect-square flex justify-center">
                <Image
                  ref={imageRef}
                  src={version.images.at(i)!}
                  alt={info.head}
                  fill
                  sizes="(max-width: 768px) 100vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <div
              className={`flex flex-col gap-y-4 row-start-1 justify-end lg:justify-center   ${
                i % 2 === 0 ? "lg:col-start-1" : "lg:col-start-2"
              }`}
            >
              <h2
                className={`${segoePro.className} w-fit flex flex-col gap-y-2 lg:gap-y-4 relative font-black text-2xl lg:text-4xl xl:text-5xl text-primary z-50 opacity-0`}
              >
                {info.head}
                <span className="block w-0 h-2 lg:h-4 bg-primary -skew-x-20"></span>
              </h2>
              <p className="opacity-0 text-secondary">{info.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
