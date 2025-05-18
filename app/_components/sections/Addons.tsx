"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import { addonns } from "@/app/_lib/Constants";
import { useIsMobile } from "@/app/_hooks/useIsMobile";
import { useIsLowEndDevice } from "@/app/_hooks/useIsLowEndDevice";

gsap.registerPlugin(ScrollTrigger);

export default function Addons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isLowEnd = useIsLowEndDevice();

  useGSAP(() => {
    const sec = containerRef.current;
    if (!sec || isMobile === null) return;

    const startAt = isMobile ? "top 75%" : "top top";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: startAt,
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".addon-box",
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: "power2.inOut",
          duration: 0.5,
        }
      )
        .fromTo(
          ".addon-box .image-container",
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.6,
            ease: "power2.inOut",
            duration: 0.5,
          },
          "<+=0.3"
        )
        .fromTo(
          ".addon-box .text-container > *",
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "power1.inOut",
            duration: 0.5,
          },
          "<"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile, isLowEnd]);

  return (
    <section
      ref={containerRef}
      className="grid w-full gap-10 px-5 py-10 md:gap-5 lg:gap-10 lg:px-20 md:py-14 md:grid-cols-2 md:grid-rows-2 md:min-h-dvh"
    >
      {addonns.map((addone, i) => (
        <div
          key={addone.name}
          className={`opacity-0 addon-box flex flex-col items-center justify-center gap-4 rounded-md p-5 bg-white/5 outline-1 outline-muted/50 md:py-10 gap-y-10 md:px-7 ${
            i === 0
              ? "md:col-span-2 md:row-span-1 lg:row-span-2 md:flex-col lg:flex-row"
              : "lg:flex-row"
          }`}
        >
          <div
            className={`image-container relative w-full aspect-square md:aspect-auto ${
              i === 0
                ? "md:w-full md:h-full lg:w-1/2 xl:w-full"
                : "lg:w-1/2 md:h-2/3 lg:h-full"
            }`}
          >
            <Image
              src={addone.img}
              alt={addone.description}
              fill
              className="object-contain"
              sizes="(max-width:768px)100vw,50vw"
            />
          </div>
          <div
            className={`text-container flex flex-col gap-2 w-full lg:w-1/2 h-1/3 md:justify-center *:opacity-0 ${
              i === 0 ? "xl:w-full" : "md:w-full xl:w-full"
            }`}
          >
            <h4 className="text-lg font-black md:text-xl xl:text-2xl text-primary">
              {addone.name}
            </h4>
            <p className="text-sm md:text-base">{addone.description}</p>
            <Link
              href={addone.link}
              target="_blank"
              title={`More about ${addone.name}`}
            >
              <Button variants="secondary">
                <span className="sr-only">More about {addone.name}</span>
                <span aria-hidden="true">Learn More</span>
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
