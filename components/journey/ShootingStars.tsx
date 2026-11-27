"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Star } from "lucide-react";
import JourneySection from "./JourneySection";
import { journeyData } from "@/data/journey";

interface StarItem {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
}

export default function ShootingStars() {
  const [stars, setStars] = useState<StarItem[]>([]);
  const [wishGranted, setWishGranted] = useState(false);

  useEffect(() => {
    const generated: StarItem[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      top: Math.random() * 92,
      left: Math.random() * 95,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 2,
    }));
    setStars(generated);
  }, []);

  const handleMakeWish = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([30, 40, 30]);
    }

    setWishGranted(true);

    confetti({
      particleCount: 65,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#F5D0A9", "#FBCFE8", "#E11D48", "#FFF1F2"],
    });
  };

  return (
    <JourneySection chapter={journeyData.shootingStars.chapter} className="py-6">
      <div className="relative w-full max-w-sm rounded-[36px] p-6 glass-card-rose border border-pink-soft/30 backdrop-blur-2xl shadow-glow flex flex-col items-center text-center overflow-hidden">
        {/* Starry Night Sky Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F041C] via-[#1B0B2E] to-[#0A0213] pointer-events-none -z-10" />

        {/* Twinkling Static Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((s) => (
            <motion.div
              key={s.id}
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: s.delay }}
              className="absolute rounded-full bg-white"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                boxShadow: "0 0 5px white",
              }}
            />
          ))}
        </div>

        {/* Crossing Shooting Stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              x: ["-20%", "140%"],
              y: ["-20%", "140%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4.5,
              delay: 1,
              ease: "linear",
            }}
            className="absolute top-8 left-0 w-28 h-[2px] bg-gradient-to-r from-transparent via-white to-pink-soft rotate-[35deg] shadow-[0_0_8px_white]"
          />
          <motion.div
            animate={{
              x: ["-20%", "140%"],
              y: ["-10%", "120%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              delay: 3.5,
              ease: "linear",
            }}
            className="absolute top-28 left-0 w-36 h-[2px] bg-gradient-to-r from-transparent via-gold-accent to-white rotate-[30deg] shadow-[0_0_8px_gold]"
          />
        </div>

        {/* Title */}
        <div className="relative z-10 mb-6">
          <span className="text-4xl mb-2 block animate-pulse">🌠</span>
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white mb-1">
            {journeyData.shootingStars.title}
          </h3>
          <p className="font-hindi text-xs text-gold-accent">
            {journeyData.shootingStars.hindi}
          </p>
          <p className="font-poppins text-xs text-blush/80 mt-1">
            {journeyData.shootingStars.subtitle}
          </p>
        </div>

        {/* Tap Button to Make a Wish */}
        <div className="relative z-10 my-4">
          <motion.button
            onClick={handleMakeWish}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-deep via-pink-600 to-rose-deep text-white font-poppins text-xs font-semibold shadow-glow border border-pink-200/50 flex items-center gap-2 min-h-[44px]"
          >
            <Sparkles className="w-4 h-4 text-gold-accent" />
            <span>{journeyData.shootingStars.wishButtonText}</span>
          </motion.button>
        </div>

        {/* Revealed Wish Granted Message */}
        <AnimatePresence>
          {wishGranted && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 mt-4 p-4 rounded-2xl bg-white/10 border border-pink-soft/30 backdrop-blur-md shadow-glow text-center"
            >
              <p className="font-dancing text-2xl text-rose-200 font-bold mb-1">
                {journeyData.shootingStars.wishMessage}
              </p>
              <p className="font-poppins text-[11px] text-blush/90">
                {journeyData.shootingStars.subNote}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </JourneySection>
  );
}
