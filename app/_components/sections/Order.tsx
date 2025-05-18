"use client";
import { useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { segoePro } from "@/app/_lib/fonts";
import Button from "../Button";
import {
  versionBox,
  xboxVersions,
  XboxVersionsType,
} from "@/app/_lib/Constants";
import { useVersion } from "@/app/_context/VersionContext";
import { useIsMobile } from "@/app/_hooks/useIsMobile";

export default function Order() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { version: deviceVer, setVersion: setDeviceVer } = useVersion();

  const version = useMemo<XboxVersionsType>(
    () =>
      xboxVersions.find((v) => v.description === deviceVer) ?? xboxVersions[0],
    [deviceVer]
  );

  const details = useMemo(
    () => versionBox.find((b) => b.name === version.description)!,
    [version]
  );

  useGSAP(
    () => {
      if (!containerRef.current || isMobile === null) return;
      const startAt = isMobile ? "top 75%" : "-5% top";

      const ctx = gsap.context(() => {
        const q = gsap.utils.selector(containerRef);

        gsap.fromTo(
          q(".order-title"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: startAt,
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          q(".order-versions li"),
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: startAt,
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          q(".order-bg"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: startAt,
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          q(".order-details"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.3,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: startAt,
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          q(".order-details > *"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.3,
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
    },
    { dependencies: [version, isMobile] }
  );

  const updateDevice = (v: XboxVersionsType) => {
    setDeviceVer(v.description);
  };

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-between w-full py-10 lg:flex-row min-h-dvh bg-white/5 lg:py-0"
    >
      <div className="relative w-full h-1/2 lg:w-1/2 aspect-square">
        <Image
          key={version.color}
          src={version.images[0]}
          fill
          alt="background"
          className="object-contain order-bg"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col px-10 min-h-1/2 lg:px-20 lg:w-1/2 gap-y-5 lg:gap-y-10">
        <h2
          className={`${segoePro.className} order-title flex flex-col lg:flex-row gap-x-1.5 text-center lg:text-start font-black text-primary text-5xl lg:text-6xl`}
        >
          <span className="text-white">XBOX</span> SERIES X
        </h2>
        <div className="flex flex-col gap-5 lg:gap-10 md:flex-row md:items-center lg:flex-col lg:w-full">
          <ul className="flex flex-col items-center order-versions lg:flex-row gap-y-4 gap-x-3">
            {xboxVersions.map((v) => (
              <li
                key={v.color}
                onClick={() => updateDevice(v)}
                className={`border-2 p-4 rounded flex items-center justify-center cursor-pointer text-center font-semibold w-full lg:w-auto ${
                  version.description === v.description
                    ? "border-primary"
                    : "border-white"
                }`}
              >
                {v.description}
                {isMobile && "tablet"}
              </li>
            ))}
          </ul>

          <div className="order-details outline-muted outline-2 rounded py-10 px-5 lg:px-10 flex flex-col gap-y-1.5 bg-background w-full">
            <ul className="flex flex-col gap-y-1.5 mb-5">
              <li>Includes:</li>
              {details.includes.map((item) => (
                <li key={item} className="ml-4 font-semibold list-disc">
                  {item}
                </li>
              ))}
            </ul>
            <hr className="my-4 text-transparent bg-muted" />
            <h4 className="text-3xl font-black">${details.price}</h4>
            <p className="mb-4 text-lg">Microsoft Store</p>
            <Link href={details.link}>
              <Button className="sm:w-1/2">Buy now</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
