"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PHOTO_CAPTIONS } from "@/data/photos";

export default function HeartHero() {
  return (
    <div className="w-full flex flex-col items-center justify-center my-4 relative select-none">
      {/* SVG ClipPath Definition for the Heart */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5, 0.88 C 0.1, 0.58, 0, 0.28, 0.22, 0.1 C 0.38, -0.04, 0.48, 0.12, 0.5, 0.2 C 0.52, 0.12, 0.62, -0.04, 0.78, 0.1 C 1, 0.28, 0.9, 0.58, 0.5, 0.88 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Heart Container with Pulse & Glow */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Soft Pink Glowing Pulsing Aura */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.55, 0.85, 0.55],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.8,
            ease: "easeInOut",
          }}
          className="absolute inset-2 rounded-full bg-gradient-to-r from-rose-deep via-pink-soft to-rose-deep blur-2xl -z-10"
        />

        {/* Twinkling Edge Sparkles */}
        <motion.span
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
          className="absolute -top-1 left-4 text-xl text-gold-accent filter drop-shadow-[0_0_8px_#F5D0A9]"
        >
          ✨
        </motion.span>
        <motion.span
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 2.4, delay: 0.8 }}
          className="absolute -top-2 right-6 text-base text-pink-soft"
        >
          💖
        </motion.span>
        <motion.span
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 2.2, delay: 1.4 }}
          className="absolute bottom-4 -right-1 text-lg text-gold-accent"
        >
          ✨
        </motion.span>

        {/* The Clipped Heart Photo with Reveal Animation (Starts blur + scale 1.3 -> settles to scale 1) */}
        <motion.div
          initial={{ scale: 1.3, filter: "blur(14px)", opacity: 0 }}
          animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full relative"
          style={{
            clipPath: "url(#heart-clip)",
          }}
        >
          <Image
            src="/images/couple.jpeg"
            alt="Tum aur Main - Couple"
            fill
            priority
            sizes="(max-width: 430px) 230px, 260px"
            className="object-cover object-center"
          />
        </motion.div>
      </div>

      {/* Dancing Script Romantic Caption */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-3 text-center px-4"
      >
        <p className="font-dancing text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-soft via-[#F5D0A9] to-rose-deep bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(225,29,72,0.6)]">
          {PHOTO_CAPTIONS.hero.title}
        </p>
        <p className="font-hindi text-xs text-gold-accent mt-0.5">
          {PHOTO_CAPTIONS.hero.subtitle}
        </p>
      </motion.div>
    </div>
  );
}
