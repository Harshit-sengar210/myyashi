"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, ArrowLeft, X } from "lucide-react";

interface HarshitKeDilProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HarshitKeDilModal({ isOpen, onClose }: HarshitKeDilProps) {
  const [hasRevealed, setHasRevealed] = useState(false);

  const handleOpen = () => {
    setHasRevealed(true);
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#E11D48", "#FB7185", "#F472B6", "#FFF1F2", "#F5D0A9"],
    });
  };

  const handleClose = () => {
    setHasRevealed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/80 backdrop-blur-md overflow-hidden"
        >
          {/* SVG ClipPath Definition for the Inner Heart */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="inner-dil-clip" clipPathUnits="objectBoundingBox">
                <path d="M 0.5, 0.88 C 0.1, 0.58, 0, 0.28, 0.22, 0.1 C 0.38, -0.04, 0.48, 0.12, 0.5, 0.2 C 0.52, 0.12, 0.62, -0.04, 0.78, 0.1 C 1, 0.28, 0.9, 0.58, 0.5, 0.88 Z" />
              </clipPath>
            </defs>
          </svg>

          {/* Deep Heart Zoom Container */}
          <motion.div
            initial={{ scale: 0.1, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.1, rotate: 15, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 180,
              duration: 0.7,
            }}
            onAnimationComplete={handleOpen}
            className="relative w-full max-w-[380px] rounded-[36px] bg-gradient-to-b from-[#FFF5F7] via-[#FFE8ED] to-[#FFD5DF] border-2 border-rose-300 shadow-[0_20px_60px_rgba(225,29,72,0.4)] p-6 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Top Back / Exit Button (Zoom Out) */}
            <div className="w-full flex items-center justify-between mb-2 z-20">
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 text-rose-700 hover:text-rose-900 border border-rose-200 text-xs font-poppins font-medium shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Bahar Niklein (Back)</span>
              </motion.button>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-rose-800 flex items-center justify-center transition-all shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Glowing Heart Ambient Background */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.35, 0.65, 0.35],
              }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute inset-8 rounded-full bg-gradient-to-tr from-rose-400 via-pink-300 to-amber-200 blur-3xl -z-10"
            />

            {/* Little Sparkles */}
            <div className="absolute top-12 left-6 text-xl animate-pulse">✨</div>
            <div className="absolute top-16 right-8 text-xl animate-bounce">💖</div>
            <div className="absolute bottom-16 left-8 text-xl animate-pulse">🌸</div>

            {/* Heart Title */}
            <div className="z-10 mt-1 mb-3">
              <span className="text-[11px] font-poppins uppercase tracking-widest text-rose-500 font-bold px-3 py-1 rounded-full bg-rose-100 border border-rose-200">
                Harshit Ka Dil ❤️
              </span>
              <h2 className="font-playfair text-2xl font-bold text-rose-950 mt-2">
                "Dil ke andar to aap ho ji!" 💖
              </h2>
              <p className="font-hindi text-sm text-rose-800 font-medium mt-0.5">
                हर्षित के दिल के सबसे ख़ास कोने में सिर्फ तुम्हारी जगह है ✨
              </p>
            </div>

            {/* Her Photo Revealed in Heart Mask */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="relative w-52 h-52 sm:w-56 sm:h-56 my-2 flex items-center justify-center"
            >
              {/* Outer pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 blur-xl opacity-60"
              />

              <div
                className="w-full h-full relative shadow-[0_15px_35px_rgba(225,29,72,0.4)]"
                style={{
                  clipPath: "url(#inner-dil-clip)",
                  WebkitClipPath: "url(#inner-dil-clip)",
                }}
              >
                <Image
                  src="/images/yashi.png"
                  alt="Yashi in Harshit's Heart"
                  fill
                  priority
                  className="object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/30 via-transparent to-pink-500/10" />
              </div>
            </motion.div>

            {/* Sweet Romantic Message */}
            <div className="z-10 mt-3 p-3.5 rounded-2xl bg-white/80 border border-rose-200/80 shadow-sm max-w-xs">
              <p className="font-dancing text-2xl text-rose-600 font-bold">
                Sirf aur sirf Yashi (Sweetie) 🌸
              </p>
              <p className="font-poppins text-xs text-rose-900/80 mt-1 leading-relaxed">
                Har dhadkan me, har khushi me, aur har pal me... tum hamesha mere dil ke andar rehti ho.
              </p>
            </div>

            {/* Bottom Big Zoom-Out Button */}
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-poppins text-xs sm:text-sm font-semibold shadow-glow border border-pink-200 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back (Zoom Out) ✨</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
