import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

function Counter({
  endCount,
  isK = false,
}: {
  endCount: number;
  isK?: boolean;
}) {
  const [count, setCount] = useState<number>(0);
  const counterRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const counter = { value: 0 };

    gsap.to(counter, {
      value: endCount,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        setCount(Math.floor(counter.value));
      },
      scrollTrigger: {
        trigger: counterRef.current,
        start: "top 80%", // start when top of element hits 80% of viewport
        once: true, // ensures it only runs once
        toggleActions: "play none none none", // play on enter only
      },
    });
  }, []);

  return (
    <b ref={counterRef}>
      {count}
      {isK && "K"}
    </b>
  );
}

export default Counter;
