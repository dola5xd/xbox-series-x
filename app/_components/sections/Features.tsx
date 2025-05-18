"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { segoePro } from "@/app/_lib/fonts";
import { features } from "@/app/_lib/Constants";

export default function Features() {
  const container = useRef<HTMLDivElement>(null);
  const featContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current || !featContainer.current) return;
    const feats: Element[] = gsap.utils.toArray(featContainer.current.children);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      },
    });
    tl.fromTo(
      [".head-container h2 .text", ".head-container p"],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, ease: "power2.inOut" }
    );
    feats.forEach((f) =>
      tl.fromTo(
        f,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, ease: "power2.inOut" }
      )
    );
    return () => tl.kill();
  }, []);

  const lines = ["MORE PLAYING,", "LESS WAITING"];
  return (
    <section
      ref={container}
      className="flex flex-col min-h-dvh px-10 py-20 gap-y-10"
    >
      <div className="flex flex-col items-center self-center justify-center w-full text-center lg:w-1/2 head-container gap-y-7">
        <h2
          className={`${segoePro.className} font-black text-4xl lg:text-7xl text-primary`}
        >
          {lines.map((t, i) => (
            <span key={i} className="relative block text">
              {t}
            </span>
          ))}
        </h2>
        <p className="font-semibold lg:text-xl">
          Make the most of every gaming minute with Quick Resume, lightning-fast
          load times, and gameplay of up to 120 FPS – all powered by Xbox
          Velocity Architecture.
        </p>
      </div>
      <div
        ref={featContainer}
        className="flex flex-col items-center justify-between w-full gap-10 lg:flex-row lg:px-10"
      >
        {features.map((feat) => (
          <div
            key={feat.head}
            className="flex flex-col w-full lg:w-1/3 gap-y-7 aspect-square"
          >
            <div className="relative w-full aspect-video">
              <Image
                src={feat.img}
                fill
                alt={feat.head}
                sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
              />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <h3
                className={`${segoePro.className} font-black text-2xl text-primary`}
              >
                {feat.head}
              </h3>
              <p className="text-secondary">{feat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
