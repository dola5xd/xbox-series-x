import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { experiences } from "@/app/_lib/Constants";
import { segoePro } from "@/app/_lib/fonts";

function Experiences() {
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

    gsap.from(".experience-container .text", {
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
      className="relative flex items-center justify-start w-screen h-dvh lg:h-screen experience-container"
    >
      <div className="*:z-10 flex flex-col lg:w-1/2 md:px-20 sm:py-10 gap-y-3 sm:gap-y-7 ">
        <h2
          className={
            "flex flex-col text-3xl font-black text-center flew-wrap md:text-5xl gap-y-1 md:text-start"
          }
        >
          <span className="text">LOOKS BETTER,</span>
          <span className="text">SOUNDS BETTER,</span>
          <span className={`${segoePro.className} text-primary text`}>
            PLAYS BETTER
          </span>
        </h2>
        <p className="font-bold text-center md:text-xl text md:text-start">
          Embark on new adventures the way they’re meant to be experienced on
          Xbox Series X.
        </p>
        <div className="flex flex-col px-10 md:justify-between md:px-7 gap-y-4 md:gap-y-7">
          {experiences.map((exp) => (
            <div className="flex items-center gap-x-10 text" key={exp.title}>
              <Image
                src={exp.icon}
                alt={exp.description}
                width={75}
                height={75}
              />
              <div className="flex flex-col gap-y-1.5">
                <h3 className="font-black sm:text-xl md:text-2xl">
                  {exp.title}
                </h3>
                <p className="text-xs font-semibold sm:text-sm">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 z-0 w-screen h-dvh">
        <video
          ref={videoRef}
          className="z-0 object-cover object-[80%] w-full h-full lg:object-center video-clip"
          autoPlay={true}
          muted={true}
          loop={true}
          poster="/assets/images/Cod_Cover.webp"
        >
          <source src={"/assets/Videos/Cover.webm"} type="video/webm" />
        </video>
      </div>
    </section>
  );
}

export default Experiences;
