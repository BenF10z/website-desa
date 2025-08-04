"use client";
import React from "react";
import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

interface Tour {
  src: string;
  alt: string;
}

const tours: Tour[] = [
  {
    src: "/images/village-landscape.jpg",
    alt: "Wisata 1",
  },
  {
    src: "/images/village-landscape.jpg",
    alt: "Wisata 2",
  },
  {
    src: "/images/village-landscape.jpg",
    alt: "Wisata 3",
  },
  // Tambahkan data wisata lain di sini
];

export default function ToursCarousel() {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 32 },
    renderMode: "performance",
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 32 },
      },
    },
  });

  React.useEffect(() => {
    if (!slider.current) return;
    const interval = setInterval(() => {
      slider.current?.next();
    }, 2000);
    return () => clearInterval(interval);
  }, [slider]);

  return (
    <div ref={sliderRef} className="keen-slider w-full">
      {tours.map((tour, idx) => (
        <div
          key={idx}
          className="keen-slider__slide flex-1 w-full h-[350px] sm:h-[450px] md:h-[550px] bg-[#d9d9d9] rounded-2xl overflow-hidden flex items-center justify-center"
        >
          <Image
            src={tour.src}
            alt={tour.alt}
            width={800}
            height={550}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
}
