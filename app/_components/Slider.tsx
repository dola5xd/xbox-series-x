"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { gsap } from "gsap";

function Slider({ images }: { images: string[] }) {
  const [curImage, setCurImage] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.from(imageRef.current, { opacity: 0, duration: 0.8 });
    }
  }, []);

  useEffect(() => {
    if (!imageRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(
      imageRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.4 }
    );

    gsap.to(controlsRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      delay: 0.2,
    });

    return () => {
      tl.kill();
    };
  }, [curImage]);

  const prev = () => {
    setCurImage((prev) =>
      prev === 0 ? images.length - 1 : (prev - 1) % images.length
    );
  };

  const next = () => {
    setCurImage((prev) => (prev + 1) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) next();
    else if (diff < -50) prev();

    touchStartX.current = null;
  };

  return (
    <div className="w-full lg:max-w-[676px] px-4 mx-auto pt-20 flex flex-col items-center">
      <div
        ref={imageRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full overflow-hidden aspect-square lg:aspect-[5/4]"
      >
        <Image
          key={curImage}
          src={images[curImage]!}
          alt={`Slide ${curImage + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 676px"
        />
      </div>

      <div
        ref={controlsRef}
        className="flex items-center justify-center mt-6 opacity-0 gap-x-6"
      >
        <IoIosArrowBack
          size={35}
          color="#9bf00b"
          className="cursor-pointer"
          onClick={prev}
        />

        <div className="flex items-center gap-x-3">
          {images.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurImage(idx)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full cursor-pointer transition-colors ${
                curImage === idx ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <IoIosArrowForward
          size={35}
          color="#9bf00b"
          className="cursor-pointer"
          onClick={next}
        />
      </div>
    </div>
  );
}

export default Slider;
