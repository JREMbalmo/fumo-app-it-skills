"use client";

import { useEffect, useRef, useState } from "react";

const galleryItems = [
  { label: "Commission #1", bg: "#FFCAD4", accent: "#9D8189" },
  { label: "Commission #2", bg: "#F4ACB7", accent: "#ffffff" },
  { label: "Commission #3", bg: "#D8E2DC", accent: "#9D8189" },
  { label: "Commission #4", bg: "#9D8189", accent: "#FFCAD4" },
  { label: "Commission #5", bg: "#FFCAD4", accent: "#9D8189" },
  { label: "Commission #6", bg: "#F4ACB7", accent: "#ffffff" },
];

export default function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"in" | "out">("in");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToNext = () => {
    if (animating) return;
    setAnimating(true);
    setDirection("out");

    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % galleryItems.length);
      setDirection("in");
      setTimeout(() => {
        setAnimating(false);
      }, 500);
    }, 400);
  };

  useEffect(() => {
    timeoutRef.current = setInterval(goToNext, 4000);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  const item = galleryItems[current];

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

        <div className="relative flex items-center gap-6">
          <div
            className="flex-1 rounded-2xl overflow-hidden shadow-lg"
            style={{ height: "420px" }}
          >
            <div
              className="w-full h-full flex flex-col items-center justify-center transition-all duration-500"
              style={{
                backgroundColor: item.bg,
                transform: animating
                  ? direction === "out"
                    ? "translateX(-100%)"
                    : "translateX(100%)"
                  : "translateX(0%)",
                opacity: animating ? 0 : 1,
              }}
            >
              <div
                className="w-32 h-32 rounded-full mb-6 flex items-center justify-center text-5xl"
                style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
              >
                🧸
              </div>
              <p
                className="text-xl font-semibold"
                style={{ color: item.accent }}
              >
                {item.label}
              </p>
              <p
                className="text-sm mt-2 opacity-80"
                style={{ color: item.accent }}
              >
                Replace with your work photo
              </p>
            </div>
          </div>

          <button
            onClick={goToNext}
            style={{ backgroundColor: "#F4ACB7", color: "#FFFFFF" }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow hover:opacity-80 transition-opacity text-lg font-bold"
            aria-label="Next"
          >
            ›
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {galleryItems.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (animating || i === current) return;
                setAnimating(true);
                setDirection("out");
                setTimeout(() => {
                  setCurrent(i);
                  setDirection("in");
                  setTimeout(() => setAnimating(false), 500);
                }, 400);
              }}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor:
                  i === current ? "#9D8189" : "#F4ACB7",
              }}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
