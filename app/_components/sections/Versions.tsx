"use client";
import Image from "next/image";
import { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { segoePro } from "@/app/_lib/fonts";
import Button from "../Button";
import { VersionBanner, versions } from "@/app/_lib/Constants";
import { useVersion } from "@/app/_context/VersionContext";
import { useIsMobile } from "@/app/_hooks/useIsMobile";
import { useIsLowEndDevice } from "@/app/_hooks/useIsLowEndDevice";

gsap.registerPlugin(ScrollTrigger);

export default function Versions() {
  const { version: currentDesc, setVersion: setDesc } = useVersion();
  const isMobile = useIsMobile();
  const isLowEnd = useIsLowEndDevice();

  const version = useMemo(
    () => versions.find((v) => v.description === currentDesc) ?? versions[0],
    [currentDesc]
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  const selectVersion = (v: VersionBanner) => setDesc(v.description);

  useGSAP(() => {
    if (!containerRef.current || !contentRef.current || isMobile === null)
      return;
    const startAt = isMobile ? "top 75%" : "center center";
    const ctx = gsap.context(() => {
      const items = contentRef.current!.querySelectorAll<HTMLDivElement>("*");
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: startAt,
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        contentRef.current!.querySelector(".divider"),
        { width: 0 },
        {
          width: "25%",
          duration: 0.5,
          delay: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: startAt,
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isMobile, isLowEnd]);

  useGSAP(
    () => {
      if (!bgRef.current) return;
      gsap.fromTo(
        bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    },
    { dependencies: [version.color] }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-screen md:w-full min-h-dvh lg:min-h-[150vh] flex flex-col items-end md:items-start lg:items-end lg:justify-end overflow-hidden bg-white/5 lg:bg-transparent"
    >
      <Image
        key={version.color}
        ref={bgRef}
        src={version.img}
        alt={`Xbox Controller in ${version.color}`}
        quality={100}
        {...(isMobile
          ? {
              width: 1024,
              height: 1024,
              className: "object-cover",
            }
          : {
              fill: true,
              sizes: "(min-width:1200px)100vw,(min-width:768px)100vw,100vw",
              className: "object-cover object-top absolute top-0 left-0 -z-10",
            })}
      />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-start gap-6 px-8 py-12 lg:py-40 lg:px-20 lg:w-1/2"
      >
        <ul className="flex items-center justify-center gap-3 mb-8 sm:justify-normal sm:gap-6">
          {versions.map((v) => {
            const isActive = v.description === version.description;
            return (
              <li
                key={v.color}
                onClick={() => selectVersion(v)}
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <span
                  className={`w-12 h-12 rounded-full outline-2 ${
                    isActive ? "outline-primary" : "outline-transparent"
                  } ${
                    v.pattern
                      ? "overflow-hidden"
                      : v.color === "Carbon Black"
                      ? "bg-black"
                      : "bg-white"
                  }`}
                >
                  {v.pattern && (
                    <Image
                      src={v.pattern}
                      alt={`${v.color} pattern`}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  )}
                </span>
                <p
                  className={`font-black text-sm lg:text-base ${
                    isActive ? "text-primary" : "text-white"
                  }`}
                >
                  {v.color}
                </p>
              </li>
            );
          })}
        </ul>

        <h2 className={`${segoePro.className} text-5xl lg:text-6xl font-black`}>
          COMPLETE CONTROL
        </h2>

        <hr className="w-1/4 h-4 text-transparent -skew-x-12 bg-primary divider" />

        <p className="text-lg max-w-prose">
          Get hands-on with the Xbox Wireless Controller, featuring our highest
          level of precision with a dedicated Share button and improved
          ergonomics.
        </p>

        <Button variants="secondary">CONTROLLER DETAILS</Button>
      </div>
    </section>
  );
}
