"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import JourneySection from "./JourneySection";
import { journeyData } from "@/data/journey";

export default function DayToNight() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background gradient interpolation through Day to Night
  // 0.0 - Sunrise (Orange / Pink)
  // 0.33 - Noon (Soft sky blue / warm sunlight)
  // 0.66 - Sunset (Purple / vibrant warm orange)
  // 1.0 - Night (Deep #1B0B2E night with stars)
  const bgGrad = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      "linear-gradient(180deg, #F97316 0%, #E11D48 50%, #4A0E4E 100%)", // Sunrise
      "linear-gradient(180deg, #38BDF8 0%, #F472B6 60%, #3B0764 100%)", // Noon
      "linear-gradient(180deg, #7C3AED 0%, #EA580C 50%, #1E0736 100%)", // Sunset
      "linear-gradient(180deg, #1B0B2E 0%, #110520 60%, #0A0213 100%)", // Night
    ]
  );

  // Celestial Body (Sun -> Moon) position along an arc
  const celestialX = useTransform(scrollYProgress, [0, 0.5, 1], ["-35%", "0%", "35%"]);
  const celestialY = useTransform(scrollYProgress, [0, 0.5, 1], ["25px", "-20px", "25px"]);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.6, 0.8], [1, 1, 0]);
  const moonOpacity = useTransform(scrollYProgress, [0.65, 0.85, 1], [0, 0.8, 1]);
  const starsOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  // Opacities for the 4 progressive text thoughts (compressed transition timings)
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.22, 0.3], [1, 1, 0]);
  const phase2Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.58], [0, 1, 0]);
  const phase3Opacity = useTransform(scrollYProgress, [0.58, 0.72, 0.82], [0, 1, 0]);
  const phase4Opacity = useTransform(scrollYProgress, [0.82, 0.95, 1], [0, 1, 1]);

  const phases = journeyData.dayToNight.phases;

  return (
    <div ref={containerRef} className="relative w-full h-[150vh] mb-4">
      {/* Sticky Screen Viewport inside an optimized 150vh track */}
      <motion.div
        style={{ background: bgGrad }}
        className="sticky top-12 w-full min-h-[520px] max-h-[640px] h-[78vh] flex flex-col justify-between p-5 overflow-hidden rounded-[36px] shadow-2xl transition-colors duration-300"
      >
        {/* Chapter Header */}
        <div className="text-center pt-8 z-30">
          <span className="font-dancing text-xl sm:text-2xl text-white font-bold drop-shadow-md block">
            {journeyData.dayToNight.chapter}
          </span>
          <span className="text-[10px] font-poppins uppercase tracking-widest text-white/70">
            Scroll gently to travel through the day
          </span>
        </div>

        {/* Stars Layer (Only fades in near Night) */}
        <motion.div
          style={{ opacity: starsOpacity }}
          className="absolute inset-0 pointer-events-none z-10"
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                top: `${(i * 19) % 95}%`,
                left: `${(i * 29) % 95}%`,
                width: `${(i % 3) + 1.5}px`,
                height: `${(i % 3) + 1.5}px`,
                boxShadow: "0 0 6px white",
                animationDelay: `${(i % 5) * 0.4}s`,
              }}
            />
          ))}
        </motion.div>

        {/* Sun / Moon Arc Movement Container */}
        <div className="relative w-full flex items-center justify-center my-auto z-20">
          <motion.div
            style={{ x: celestialX, y: celestialY }}
            className="relative w-28 h-28 flex items-center justify-center"
          >
            {/* The Sun */}
            <motion.div
              style={{ opacity: sunOpacity }}
              className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-amber-300 to-yellow-100 shadow-[0_0_50px_rgba(251,191,36,0.9)] flex items-center justify-center text-3xl"
            >
              ☀️
            </motion.div>

            {/* The Moon */}
            <motion.div
              style={{ opacity: moonOpacity }}
              className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-slate-100 to-amber-100 shadow-[0_0_40px_rgba(255,255,255,0.85)] flex items-center justify-center text-3xl"
            >
              🌙
            </motion.div>
          </motion.div>
        </div>

        {/* Stacked Text Lines Linking to Scroll Progress */}
        <div className="relative z-30 pb-16 min-h-[140px] flex items-center justify-center text-center px-2">
          {/* Phase 1: Sunrise */}
          <motion.div
            style={{ opacity: phase1Opacity }}
            className="absolute inset-x-2 p-4 rounded-3xl glass-card backdrop-blur-md border border-white/20 shadow-glow"
          >
            <p className="font-playfair text-base sm:text-lg font-bold text-white mb-1">
              {phases[0].label}
            </p>
            <p className="font-hindi text-xs text-amber-200">{phases[0].hindi}</p>
          </motion.div>

          {/* Phase 2: Noon */}
          <motion.div
            style={{ opacity: phase2Opacity }}
            className="absolute inset-x-2 p-4 rounded-3xl glass-card backdrop-blur-md border border-white/20 shadow-glow"
          >
            <p className="font-playfair text-base sm:text-lg font-bold text-white mb-1">
              {phases[1].label}
            </p>
            <p className="font-hindi text-xs text-pink-200">{phases[1].hindi}</p>
          </motion.div>

          {/* Phase 3: Sunset */}
          <motion.div
            style={{ opacity: phase3Opacity }}
            className="absolute inset-x-2 p-4 rounded-3xl glass-card backdrop-blur-md border border-white/20 shadow-glow"
          >
            <p className="font-playfair text-base sm:text-lg font-bold text-white mb-1">
              {phases[2].label}
            </p>
            <p className="font-hindi text-xs text-amber-200">{phases[2].hindi}</p>
          </motion.div>

          {/* Phase 4: Night */}
          <motion.div
            style={{ opacity: phase4Opacity }}
            className="absolute inset-x-2 p-4 rounded-3xl glass-card-rose backdrop-blur-md border border-pink-soft/30 shadow-glow"
          >
            <p className="font-playfair text-base sm:text-lg font-bold text-white mb-1">
              {phases[3].label}
            </p>
            <p className="font-hindi text-xs text-gold-accent">{phases[3].hindi}</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
