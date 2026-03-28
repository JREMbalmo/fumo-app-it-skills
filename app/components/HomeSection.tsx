"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "/images/homepage/fumo_homepage1.jpg",
    caption: "Handcrafted with love — your custom plush awaits",
  },
  {
    src: "/images/homepage/fumo_homepage2.jpg",
    caption: "Each piece uniquely made just for you",
  },
  {
    src: "/images/homepage/fumo_homepage3.jpg",
    caption: "Premium quality materials, endless possibilities",
  },
];

export default function HomeSection() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [crossfading, setCrossfading] = useState(false);
  const currentRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentRef.current + 1) % slides.length;
      setNext(nextIndex);
      setCrossfading(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCrossfading(true);
        });
      });

      setTimeout(() => {
        currentRef.current = nextIndex;
        setCurrent(nextIndex);
        setNext(null);
        setCrossfading(false);
      }, 900);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goTo = (i: number) => {
    if (i === currentRef.current) return;
    const nextIndex = i;
    setNext(nextIndex);
    setCrossfading(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCrossfading(true);
      });
    });
    setTimeout(() => {
      currentRef.current = nextIndex;
      setCurrent(nextIndex);
      setNext(null);
      setCrossfading(false);
    }, 900);
  };

  return (
    <section id="home" className="pt-16">
      <div className="relative w-full overflow-hidden" style={{ height: "66.666vh" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slides[current].src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {next !== null && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slides[next].src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: crossfading ? 1 : 0,
              transition: "opacity 800ms ease-in-out",
            }}
          />
        )}

        <div
          className="absolute bottom-0 left-0 right-0 px-8 pb-8 pt-20"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
          }}
        >
          <p className="text-white text-lg font-medium max-w-md drop-shadow-md">
            {next !== null && crossfading ? slides[next].caption : slides[current].caption}
          </p>
        </div>

        <div className="absolute bottom-4 right-6 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor:
                  i === (next !== null ? next : current)
                    ? "#FFFFFF"
                    : "rgba(255,255,255,0.5)",
                transition: "background-color 300ms",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
