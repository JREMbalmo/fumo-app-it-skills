"use client";

import { useEffect, useRef, useState } from "react";

const galleryItems = [
  { src: "/images/past-works/custom1.jpg", label: "Custom Commission #1" },
  { src: "/images/past-works/custom2.jpg", label: "Custom Commission #2" },
];

export default function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const currentRef = useRef(0);
  const busyRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = (to?: number) => {
    if (busyRef.current) return;
    busyRef.current = true;

    const nextIndex = to !== undefined ? to : (currentRef.current + 1) % galleryItems.length;
    setNextIdx(nextIndex);
    setPhase("exit");

    setTimeout(() => {
      currentRef.current = nextIndex;
      setCurrent(nextIndex);
      setNextIdx(null);
      setPhase("enter");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("idle");
          busyRef.current = false;
        });
      });
    }, 450);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => advance(), 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleDotClick = (i: number) => {
    if (i === currentRef.current) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    advance(i);
    intervalRef.current = setInterval(() => advance(), 4500);
  };

  const handleArrow = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    advance();
    intervalRef.current = setInterval(() => advance(), 4500);
  };

  const currentItem = galleryItems[current];

  return (
    <section
      id="gallery"
      style={{ backgroundColor: "#FFFFFF" }}
      className="py-24 px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          style={{ color: "#9D8189" }}
          className="text-4xl font-bold mb-8 tracking-wide text-center"
        >
          Gallery
        </h2>

        <div
          className="w-16 h-1 mx-auto mb-12 rounded-full"
          style={{ backgroundColor: "#F4ACB7" }}
        />

        <div className="relative overflow-hidden rounded-2xl shadow-lg" style={{ height: "480px" }}>
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${currentItem.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform:
                phase === "exit"
                  ? "translateX(-100%)"
                  : phase === "enter"
                  ? "translateX(100%)"
                  : "translateX(0%)",
              opacity: phase === "idle" ? 1 : 0,
              transition:
                phase === "exit"
                  ? "transform 450ms ease-in-out, opacity 300ms ease-in"
                  : phase === "idle"
                  ? "opacity 300ms ease-out"
                  : "none",
            }}
          />

          <div
            className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-16"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
            }}
          >
            <p className="text-white font-semibold text-lg">{currentItem.label}</p>
          </div>

          <button
            onClick={handleArrow}
            style={{ backgroundColor: "rgba(157,129,137,0.85)" }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl hover:opacity-90 shadow"
            aria-label="Next"
          >
            ›
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {galleryItems.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: i === current ? "#9D8189" : "#F4ACB7",
                transition: "background-color 300ms",
              }}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
