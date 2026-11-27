"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, MoveHorizontal } from "lucide-react";
import { PHOTO_CAPTIONS } from "@/data/photos";

export default function SketchColorSlider() {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPct = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPos(clampedPct);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full my-6 flex flex-col items-center">
      {/* Container Card */}
      <div className="w-full rounded-3xl glass-card-rose p-4 border border-pink-soft/30 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
            <span className="text-[11px] font-poppins font-medium uppercase tracking-wider text-pink-soft">
              Sketch to Color
            </span>
          </div>
          <span className="text-[10px] font-poppins text-pink-soft/60">
            Slide the heart 💖
          </span>
        </div>

        {/* Interactive Slider Window */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/15 shadow-inner touch-none"
        >
          {/* Base: Full Color Image (Right Layer) */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: "url('/images/collage.jpeg')",
              backgroundPosition: "center center",
            }}
          />

          {/* Color Label */}
          <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-poppins text-pink-soft border border-white/10 z-10">
            Color 🌈
          </div>

          {/* Overlay: Black & White Sketch Panel (Left Layer clipped by sliderPos) */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat transition-none"
            style={{
              backgroundImage: "url('/images/collage.jpeg')",
              backgroundPosition: "center center",
              filter: "grayscale(1) contrast(1.35) brightness(1.05)",
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          />

          {/* Sketch Label */}
          <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-poppins text-blush border border-white/10 z-10">
            Sketch ✏️
          </div>

          {/* Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-pink-soft via-white to-rose-deep pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{ left: `${sliderPos}%` }}
          />

          {/* Glowing Heart Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-tr from-rose-deep to-pink-500 border-2 border-white shadow-glow flex items-center justify-center text-lg z-20 pointer-events-none cursor-grab active:cursor-grabbing"
            style={{ left: `${sliderPos}%` }}
          >
            <span>💖</span>
          </div>
        </div>

        {/* Captions below slider */}
        <div className="text-center mt-3 px-2">
          <p className="font-poppins text-xs sm:text-sm text-blush font-medium">
            "{PHOTO_CAPTIONS.sketchSlider.caption}"
          </p>
          <p className="font-hindi text-xs text-gold-accent mt-0.5">
            {PHOTO_CAPTIONS.sketchSlider.hindi}
          </p>
        </div>
      </div>
    </div>
  );
}
