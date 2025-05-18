import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { segoePro } from "@/app/_lib/fonts";
import Button from "../Button";
import { useIsMobile } from "@/app/_hooks/useIsMobile";
import { useIsLowEndDevice } from "@/app/_hooks/useIsLowEndDevice";

function GamePass() {
  const isMobile = useIsMobile();
  const isLowEnd = useIsLowEndDevice();

  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    if (!videoRef.current || !containerRef.current) return;
    gsap.to(videoRef.current, {
      clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
      duration: 0.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        pin: true,
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".GamePass-container .text", {
      y: 20,
      opacity: 0,
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
    <section
      ref={containerRef}
      className="relative flex items-center justify-center w-screen h-dvh GamePass-container"
    >
      <div className="*:z-10 flex flex-col items-center lg:w-2/3 px-10  lg:px-20 py-10 gap-y-1.5 text-center">
        <Image
          src="https://assets.xboxservices.com/assets/81/f5/81f5da27-295b-4fe7-87fd-d9fb48b2a00d.svg?n=XBX_A-GAMEPASS_LOGO-D.svg"
          width={isMobile || isLowEnd ? 130 : 261}
          height={isMobile || isLowEnd ? 22 : 44}
          alt="Xbox-GamePass logo"
          className="text"
        />
        <h2
          className={`${segoePro.className} text-white text font-black text-3xl lg:text-6xl`}
        >
          INSTANT <span className="text-primary">LIBRARY</span>
        </h2>
        <p className="font-bold lg:text-2xl text">
          Hundreds of games, day one releases, online multiplayer and more.
        </p>
        <Link
          href="https://www.xbox.com/xbox-game-pass"
          title="More about Xbox Game Pass"
          className="text"
        >
          <Button className="w-full px-5 my-4 lg:px-10">
            <span className="sr-only">More about Xbox Game Pass</span>
            <span aria-hidden="true">LEARN MORE</span>
          </Button>
        </Link>
      </div>
      <div className="absolute top-0 left-0 z-0 w-screen h-dvh">
        <video
          ref={videoRef}
          className="z-0 object-cover object-[75%] w-full h-full lg:object-center opacity-50 GamePass-clip"
          autoPlay
          muted
          loop
        >
          <source src="/assets/Videos/GamePass-video.webm" type="video/webm" />
        </video>
      </div>
    </section>
  );
}

export default GamePass;
