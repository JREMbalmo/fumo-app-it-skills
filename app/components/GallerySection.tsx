"use client";

import { useEffect, useRef, useState } from "react";

const galleryItems = [
  { src: "/images/past-works/custom1.jpg", label: "Custom Commission #1" },
  { src: "/images/past-works/custom2.jpg", label: "Custom Commission #2" },
];

export default function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<"enter" | "exit">("enter");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToNext = () => {
    if (animating) return;
    setAnimating(true);
    setSlideDir("exit");

    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % galleryItems.length);
      setSlideDir("enter");
      setTimeout(() => {
        setAnimating(false);
      }, 500);
    }, 450);
  };

  useEffect(() => {
    intervalRef.current = setInterval(goToNext, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
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

        <div className="relative overflow-hidden rounded-2xl shadow-lg" style={{ height: "480px" }}>
          <div
            className="w-full h-full transition-all duration-500"
            style={{
              backgroundImage: `url(${item.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: animating
                ? slideDir === "exit"
                  ? "translateX(-100%)"
                  : "translateX(100%)"
                : "translateX(0%)",
              opacity: animating ? 0 : 1,
            }}
          />

          <div
            className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-16"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
            }}
          >
            <p className="text-white font-semibold text-lg">{item.label}</p>
          </div>

          <button
            onClick={() => {
              if (intervalRef.current) clearInterval(intervalRef.current);
              goToNext();
              intervalRef.current = setInterval(goToNext, 4500);
            }}
            style={{ backgroundColor: "rgba(157,129,137,0.85)" }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl hover:opacity-90 transition-opacity shadow"
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
                if (intervalRef.current) clearInterval(intervalRef.current);
                setAnimating(true);
                setSlideDir("exit");
                setTimeout(() => {
                  setCurrent(i);
                  setSlideDir("enter");
                  setTimeout(() => {
                    setAnimating(false);
                    intervalRef.current = setInterval(goToNext, 4500);
                  }, 500);
                }, 450);
              }}
              className="w-2 h-2 rounded-full transition-all"
              style={{ backgroundColor: i === current ? "#9D8189" : "#F4ACB7" }}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
