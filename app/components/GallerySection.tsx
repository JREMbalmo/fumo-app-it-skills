"use client";

import { useEffect, useRef, useState } from "react";

const galleryItems = [
  { src: "/images/past-works/custom1.jpg", label: "Custom Commission #1" },
  { src: "/images/past-works/custom2.jpg", label: "Custom Commission #2" },
];

type Direction = "forward" | "backward";

export default function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const [direction, setDirection] = useState<Direction>("forward");
  const currentRef = useRef(0);
  const busyRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = (to?: number, dir: Direction = "forward") => {
    if (busyRef.current) return;
    busyRef.current = true;

    const nextIndex =
      to !== undefined
        ? to
        : dir === "forward"
        ? (currentRef.current + 1) % galleryItems.length
        : (currentRef.current - 1 + galleryItems.length) % galleryItems.length;

    setDirection(dir);
    setPhase("exit");

    setTimeout(() => {
      currentRef.current = nextIndex;
      setCurrent(nextIndex);
      setPhase("enter");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("idle");
          busyRef.current = false;
        });
      });
    }, 450);
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => advance(), 4500);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => advance(), 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => { resetInterval(); advance(undefined, "forward"); };
  const handlePrev = () => { resetInterval(); advance(undefined, "backward"); };

  const handleDotClick = (i: number) => {
    if (i === currentRef.current) return;
    const dir = i > currentRef.current ? "forward" : "backward";
    resetInterval();
    advance(i, dir);
  };

  const exitTransform =
    direction === "forward" ? "translateX(-100%)" : "translateX(100%)";
  const enterTransform =
    direction === "forward" ? "translateX(100%)" : "translateX(-100%)";

  const currentItem = galleryItems[current];

  const arrowBtnStyle: React.CSSProperties = {
    backgroundColor: "rgba(157,129,137,0.85)",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  };

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
                  ? exitTransform
                  : phase === "enter"
                  ? enterTransform
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

          <button onClick={handlePrev} style={{ ...arrowBtnStyle, left: 16 }} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button onClick={handleNext} style={{ ...arrowBtnStyle, right: 16 }} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
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
