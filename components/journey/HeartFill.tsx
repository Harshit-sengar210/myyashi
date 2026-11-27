"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import JourneySection from "./JourneySection";
import { journeyData } from "@/data/journey";

export default function HeartFill() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const [hasCelebrated, setHasCelebrated] = useState(false);

  // Fill height percentage linked directly to scroll
  const fillPct = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.95 && !hasCelebrated) {
        setHasCelebrated(true);

        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([40, 50, 40]);
        }

        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#E11D48", "#FBCFE8", "#F5D0A9"],
        });
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, hasCelebrated]);

  return (
    <JourneySection chapter={journeyData.heartFill.chapter} className="py-6">
      <div
        ref={containerRef}
        className="w-full max-w-sm rounded-[36px] p-6 glass-card border border-pink-soft/30 backdrop-blur-2xl shadow-glow flex flex-col items-center text-center relative overflow-hidden"
      >
        <span className="text-xs uppercase tracking-widest font-poppins text-pink-soft/80 font-semibold mb-1">
          {journeyData.heartFill.title}
        </span>
        <p className="font-hindi text-xs text-gold-accent mb-6">
          {journeyData.heartFill.hindiSubtitle}
        </p>

        {/* Big SVG Heart Outline with Scroll-Linked Liquid Fill */}
        <div className="relative w-56 h-52 flex items-center justify-center my-4">
          <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-[0_0_20px_rgba(225,29,72,0.4)]">
            <defs>
              {/* Heart Mask */}
              <clipPath id="journey-heart-shape">
                <path d="M 100 160 C 20 100, 0 40, 50 15 C 80 -5, 100 25, 100 35 C 100 25, 120 -5, 150 15 C 200 40, 180 100, 100 160 Z" />
              </clipPath>

              {/* Liquid Gradient */}
              <linearGradient id="liquid-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#9F1239" />
                <stop offset="60%" stopColor="#E11D48" />
                <stop offset="100%" stopColor="#FBCFE8" />
              </linearGradient>
            </defs>

            {/* Heart Background Empty Well */}
            <path
              d="M 100 160 C 20 100, 0 40, 50 15 C 80 -5, 100 25, 100 35 C 100 25, 120 -5, 150 15 C 200 40, 180 100, 100 160 Z"
              fill="rgba(255, 255, 255, 0.05)"
              stroke="rgba(251, 207, 232, 0.3)"
              strokeWidth="2.5"
            />

            {/* Liquid Fill masked inside the heart */}
            <g clipPath="url(#journey-heart-shape)">
              <motion.rect
                x="0"
                y="0"
                width="200"
                height="180"
                fill="url(#liquid-gradient)"
                style={{
                  transformOrigin: "bottom",
                  scaleY: scrollYProgress,
                }}
              />
            </g>

            {/* Glowing Outline */}
            <path
              d="M 100 160 C 20 100, 0 40, 50 15 C 80 -5, 100 25, 100 35 C 100 25, 120 -5, 150 15 C 200 40, 180 100, 100 160 Z"
              fill="none"
              stroke="#FBCFE8"
              strokeWidth="3"
            />
          </svg>

          {/* Heartbeat pulse animation triggered at 100% */}
          {hasCelebrated && (
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="absolute text-5xl select-none"
            >
              💖
            </motion.div>
          )}
        </div>

        {/* Revealed Love Line upon filling */}
        <div className="mt-4 min-h-[70px] flex flex-col items-center justify-center">
          <p className="font-dancing text-2xl sm:text-3xl text-rose-deep font-bold drop-shadow-[0_2px_12px_rgba(225,29,72,0.6)]">
            {journeyData.heartFill.filledText}
          </p>
          <p className="font-poppins text-xs text-blush/80 mt-1 max-w-xs">
            {journeyData.heartFill.fullMessage}
          </p>
        </div>
      </div>
    </JourneySection>
  );
}
