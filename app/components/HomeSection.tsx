"use client";

import { useEffect, useState } from "react";

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
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setFading(false);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section id="home" className="pt-16">
      <div className="relative w-full overflow-hidden" style={{ height: "66.666vh" }}>
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: fading ? 0 : 1,
            backgroundImage: `url(${slide.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 px-8 pb-8 pt-20"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
          }}
        >
          <p
            className="text-white text-lg font-medium max-w-md drop-shadow-md transition-opacity duration-700"
            style={{ opacity: fading ? 0 : 1 }}
          >
            {slide.caption}
          </p>
        </div>

        <div className="absolute bottom-4 right-6 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setFading(true);
                setTimeout(() => {
                  setCurrent(i);
                  setFading(false);
                }, 400);
              }}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: i === current ? "#FFFFFF" : "rgba(255,255,255,0.5)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
