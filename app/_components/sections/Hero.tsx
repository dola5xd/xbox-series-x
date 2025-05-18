"use client";
import { useRef, useMemo } from "react";
import Image from "next/image";
import bgBlack from "@/public/assets/images/bg-black.webp";
import bgWhite from "@/public/assets/images/bg-white.webp";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { xboxVersions, XboxVersionsType } from "@/app/_lib/Constants";
import { segoePro } from "@/app/_lib/fonts";
import Button from "../Button";
import Slider from "../Slider";
import Link from "next/link";
import { useVersion } from "@/app/_context/VersionContext";

export default function Hero() {
  const { version: deviceVer, setVersion: setDeviceVer } = useVersion();
  const version = useMemo<XboxVersionsType>(
    () =>
      xboxVersions.find((v) => v.description === deviceVer) ?? xboxVersions[0],
    [deviceVer]
  );
  const textContainer = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const background = version.color === "White" ? bgWhite : bgBlack;

  useGSAP(() => {
    const texts: Element[] = gsap.utils.toArray(
      textContainer.current!.children
    );
    gsap.to(texts, {
      opacity: 1,
      delay: 1.5,
      stagger: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(texts[1], {
      width: "25%",
      delay: 2.5,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  useGSAP(
    () => {
      if (!bgRef.current) return;
      gsap.fromTo(
        bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.inOut" }
      );
    },
    { dependencies: [version.color] }
  );

  return (
    <section className="relative flex flex-col-reverse items-center overflow-x-hidden min-h-dvh lg:px-10 lg:justify-between lg:flex-row ">
      <Image
        key={version.color}
        ref={bgRef}
        src={background}
        fill
        alt="background"
        className="absolute object-contain object-center lg:object-cover -z-10"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        priority
      />
      <div
        ref={textContainer}
        className="flex flex-col items-center lg:items-start text-center lg:text-start gap-y-4 lg:gap-y-7 *:opacity-0 py-7 lg:py-0"
      >
        <h1
          className={`${segoePro.className} w-3/4 xl:w-1/2 text-5xl lg:text-7xl leading-12 lg:leading-16 font-black`}
        >
          XBOX SERIES X
        </h1>
        <span className="w-0 h-3 bg-primary lg:h-7 -skew-x-20" />
        <h2 className="text-3xl font-bold">Power your dreams</h2>
        <div className="flex flex-col items-center lg:flex-row gap-y-4 gap-x-3">
          {xboxVersions.map((v) => (
            <div
              key={v.color}
              onClick={() => setDeviceVer(v.description)}
              className={`p-4 xl:text-nowrap rounded flex items-center justify-center cursor-pointer text-center font-semibold w-full border-2 ${
                deviceVer === v.description
                  ? "border-primary text-primary"
                  : "border-white text-white"
              }`}
            >
              {v.description}
            </div>
          ))}
        </div>
        <p className="text-2xl font-bold lg:text-3xl">${version.price} ERP</p>
        <Link
          href="https://www.xbox.com/en-us/configure/8WJ714N3RBTL"
          target="_blank"
        >
          <Button>Buy now</Button>
        </Link>
      </div>
      <Slider images={version.images} />
    </section>
  );
}
