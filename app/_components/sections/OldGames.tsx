import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { segoePro } from "@/app/_lib/fonts";

function OldGames() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainer = useRef<HTMLDivElement>(null);
  const ImageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const textElements = gsap.utils.toArray<HTMLElement>(
      textContainer.current!.children
    );

    gsap.to(ImageRef.current, {
      scale: 1,
      rotate: 0,
      opacity: "30%",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        toggleActions: "play none none reverse",
        pin: true,
      },
    });
    gsap.to(textElements, {
      opacity: 1,
      y: -40,
      stagger: 0.2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-dvh">
      <div
        ref={textContainer}
        className="h-dvh *:opacity-0 px-7 lg:px-20 py-40 flex items-center justify-center flex-col gap-y-7"
      >
        <h3
          className={`${segoePro.className} text-xl sm:text-3xl lg:text-6xl font-black text-center lg:w-3/4`}
        >
          BACKWARD COMPATIBLE WITH THOUSANDS OF GAMES
        </h3>
        <hr className="w-20 h-4 text-transparent -skew-x-20 bg-primary" />
        <p className="text-sm text-center sm:text-base lg:text-xl lg:w-3/4">
          Get ready for faster load times, higher resolution, more stable frame
          rates, and better input latency on thousands of Xbox One, Xbox 360,
          and Original Xbox games.
        </p>
      </div>
      <Image
        ref={ImageRef}
        src={"/assets/images/games_cover.webp"}
        fill
        alt="Games"
        priority
        className="object-cover object-top scale-50 rounded -z-10"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
      />
    </section>
  );
}

export default OldGames;
