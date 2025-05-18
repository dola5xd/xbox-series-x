"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import StarwarsCover from "@/public/assets/images/StarwarsCover.webp";
import versionsCover from "@/public/assets/images/versionsCover.webp";
import Xbox_Versions_Banner from "@/public/assets/images/Xbox_Versions_Banner.webp";
import XboxVelocity from "@/public/assets/images/Xbox_Velocity.webp";
import Counter from "../Counter";
import { segoePro } from "@/app/_lib/fonts";

export default function Specs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageBgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const paras = gsap.utils.toArray(".specs-container p");
    const texts = gsap.utils.toArray(textContainerRef.current!.children);
    gsap.fromTo(
      paras,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      texts,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      imageBgRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col w-full min-h-dvh gap-y-4 md:gap-y-7"
    >
      <div
        ref={textContainerRef}
        className="text-container text-center flex flex-col gap-y-4 md:gap-y-1 lg:gap-y-7 md:py-20 p-10 md:px-32 *:opacity-0 min-h-full"
      >
        <h2
          className={`${segoePro.className} font-black text-4xl md:text-5xl lg:text-6xl`}
        >
          SELECT YOUR STYLE
        </h2>
        <p className="text-lg lg:text-2xl">
          Power your dreams with these different designs
        </p>
        <div className="specs-container flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-7 lg:gap-y-4 *:w-1/2 *:lg:w-auto *:flex *:flex-col md:*:text-xl *:gap-y-1.5 *:text-lg [&>p>span]:text-xl md:[&>p>span]:text-3xl [&>p>span]:font-black my-4 lg:mb-10 lg:my-0">
          <p>
            <span>
              TRUE <Counter endCount={4} isK />
            </span>{" "}
            Gaming
          </p>
          <p>
            <span>
              UP TO <Counter endCount={120} /> FPS
            </span>{" "}
            Frames per second
          </p>
          <p>
            <span>
              <Counter endCount={8} isK /> HDR
            </span>{" "}
            High Dynamic Range
          </p>
          <p className="items-center">
            <span className="relative flex items-center justify-center w-24 h-auto">
              <Image
                src={XboxVelocity}
                alt="Velocity"
                width={96}
                height={96}
                className="object-contain"
              />
            </span>
            Xbox Velocity Architecture
          </p>
        </div>
      </div>
      <div
        ref={imageBgRef}
        className="absolute inset-0 w-full h-full lg:h-screen -z-10 lg:relative"
      >
        <Image
          src={Xbox_Versions_Banner}
          alt="Banner"
          quality={100}
          fill
          sizes="(min-width:768px)100vw,100vw"
          className="hidden object-cover lg:block"
        />
        <Image
          src={StarwarsCover}
          alt="Starwars"
          quality={100}
          fill
          sizes="(max-width:767px)100vw,100vw"
          className="object-cover lg:hidden"
        />
        <Image
          src={versionsCover}
          alt="Versions"
          quality={100}
          width={1024}
          height={431}
          className="absolute bottom-0 object-cover lg:hidden"
        />
      </div>
    </section>
  );
}
