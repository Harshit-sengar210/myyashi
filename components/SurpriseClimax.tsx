"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, RefreshCw, Home, Heart } from "lucide-react";
import { APP_CONFIG } from "@/data/config";

interface StarItem {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
}

export default function SurpriseClimax() {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);
  const [stars, setStars] = useState<StarItem[]>([]);
  const confettiIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter state for Phase 4
  const [typedHinglish, setTypedHinglish] = useState("");
  const [showEnglish, setShowEnglish] = useState(false);
  const [showHindi, setShowHindi] = useState(false);

  useEffect(() => {
    const generated: StarItem[] = Array.from({ length: 45 }, (_, i) => ({
      id: i,
      top: Math.random() * 95,
      left: Math.random() * 95,
      size: Math.random() * 2.5 + 1.2,
      delay: Math.random() * 2,
    }));
    setStars(generated);

    return () => {
      if (confettiIntervalRef.current) clearInterval(confettiIntervalRef.current);
    };
  }, []);

  const handleOpenGift = () => {
    if (phase !== 1) return;
    setPhase(2);

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#E11D48", "#FBCFE8", "#F5D0A9", "#FFF1F2", "#C4B5FD"],
    });

    // Phase 3: 1.6s -> Constellation Heart SVG Draws + Couple Photo reveals inside
    setTimeout(() => {
      setPhase(3);
    }, 1600);

    // Phase 4: 3.4s -> Typewriter climax revelation + "Better Together" panel zoom
    setTimeout(() => {
      setPhase(4);
      startContinuousConfetti();
    }, 3400);
  };

  const startContinuousConfetti = () => {
    if (confettiIntervalRef.current) clearInterval(confettiIntervalRef.current);

    confettiIntervalRef.current = setInterval(() => {
      confetti({
        particleCount: 12,
        spread: 60,
        origin: { y: 0.8, x: Math.random() * 0.6 + 0.2 },
        colors: ["#E11D48", "#FBCFE8", "#F5D0A9"],
        ticks: 200,
        gravity: 0.8,
        scalar: 0.9,
      });
    }, 1200);
  };

  useEffect(() => {
    if (phase !== 4) return;

    const fullHinglish = APP_CONFIG.climaxMessage.hinglish;
    let idx = 0;
    const timer = setInterval(() => {
      if (idx <= fullHinglish.length) {
        setTypedHinglish(fullHinglish.slice(0, idx));
        idx++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowEnglish(true), 400);
        setTimeout(() => setShowHindi(true), 900);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [phase]);

  const handleReplay = () => {
    if (confettiIntervalRef.current) clearInterval(confettiIntervalRef.current);
    setPhase(1);
    setTypedHinglish("");
    setShowEnglish(false);
    setShowHindi(false);
  };

  return (
    <div className="relative w-full min-h-[760px] flex flex-col items-center justify-center p-5 text-center select-none overflow-hidden">
      {/* SVG ClipPath Definition for the Heart Photo Reveal */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="surprise-heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5, 0.88 C 0.1, 0.58, 0, 0.28, 0.22, 0.1 C 0.38, -0.04, 0.48, 0.12, 0.5, 0.2 C 0.52, 0.12, 0.62, -0.04, 0.78, 0.1 C 1, 0.28, 0.9, 0.58, 0.5, 0.88 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Dark starry sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F041B] via-[#1B0B2E] to-[#0A0213] pointer-events-none -z-10" />

      {/* Twinkling Constellation Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2.5,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: "#FFF1F2",
              borderRadius: "50%",
              boxShadow: "0 0 5px rgba(251, 207, 232, 0.7)",
            }}
          />
        ))}
      </div>

      {/* PHASE 1: UNOPENED BOX & TAP BUTTON */}
      {phase === 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex flex-col items-center justify-center relative z-20"
        >
          <div className="absolute w-48 h-48 rounded-full bg-rose-deep/30 blur-3xl animate-pulse" />

          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, -2, 2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            className="text-7xl sm:text-8xl mb-8 relative z-10 cursor-pointer drop-shadow-[0_10px_25px_rgba(225,29,72,0.6)]"
            onClick={handleOpenGift}
          >
            🎁
          </motion.div>

          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-2">
            A Surprise For Sweetie
          </h2>

          <p className="font-hindi text-base text-gold-accent mb-8">
            सिर्फ एक बार टैप करो 🌸
          </p>

          <motion.button
            onClick={handleOpenGift}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-deep via-pink-600 to-rose-deep text-white font-poppins text-sm font-semibold shadow-glow border border-pink-200/50 flex items-center gap-2 min-h-[44px]"
          >
            <Sparkles className="w-4 h-4 text-gold-accent" />
            <span>Tap karo Sweetie 🎁</span>
          </motion.button>
        </motion.div>
      )}

      {/* PHASE 2: GIFT OPENS & LIGHT RAYS */}
      {phase === 2 && (
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2.5, 5], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-rose-deep via-white to-pink-soft blur-2xl pointer-events-none"
          />

          <motion.div
            initial={{ scale: 1, rotate: 0 }}
            animate={{ scale: [1, 1.4, 0], rotate: [0, 15, -15] }}
            transition={{ duration: 1.2 }}
            className="text-8xl select-none"
          >
            ✨
          </motion.div>
        </div>
      )}

      {/* 6) PHASE 3 & 4: CONSTELLATION HEART DRAWING + PHOTO REVEAL */}
      {(phase === 3 || phase === 4) && (
        <div className="flex flex-col items-center justify-center w-full max-w-sm relative z-20">
          {/* Heart Frame with Couple Photo Faded Inside */}
          <div className="relative w-52 h-48 mb-3 flex items-center justify-center">
            {/* Background Couple Photo Faded inside Heart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.95, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="absolute w-36 h-36 rounded-full overflow-hidden"
              style={{ clipPath: "url(#surprise-heart-clip)" }}
            >
              <Image
                src="/images/couple.jpeg"
                alt="Us - Forever"
                fill
                sizes="150px"
                className="object-cover object-center"
              />
            </motion.div>

            {/* SVG Animated Glowing Heart Path */}
            <svg
              viewBox="0 0 200 180"
              className="w-full h-full filter drop-shadow-[0_0_15px_rgba(225,29,72,0.9)] relative z-10"
            >
              <motion.path
                d="M 100 160 C 20 100, 0 40, 50 15 C 80 -5, 100 25, 100 35 C 100 25, 120 -5, 150 15 C 200 40, 180 100, 100 160 Z"
                fill="none"
                stroke="url(#surprise-heart-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="surprise-heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FBCFE8" />
                  <stop offset="50%" stopColor="#E11D48" />
                  <stop offset="100%" stopColor="#F5D0A9" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Reveal "Better Together" Center Panel with slow zoom */}
          {phase === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 15 }}
              animate={{ opacity: 1, scale: [0.75, 1.05, 1], y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full max-w-[280px] h-32 rounded-2xl overflow-hidden border-2 border-pink-soft/50 shadow-glow mb-4 relative"
              style={{
                backgroundImage: "url('/images/collage.jpeg')",
                backgroundPosition: "50% 50%",
                backgroundSize: "280% 280%",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center pb-2">
                <span className="font-dancing text-xl text-white font-bold drop-shadow-md">
                  Better Together 💖
                </span>
              </div>
            </motion.div>
          )}

          {/* PHASE 4: STACKED TYPEWRITER FINAL CLIMAX MESSAGE */}
          {phase === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full glass-card-rose rounded-3xl p-5 border border-pink-soft/30 backdrop-blur-2xl shadow-glow text-center"
            >
              {/* Line 1: Hinglish with Typewriter cursor */}
              <div className="min-h-[44px] flex items-center justify-center">
                <p className="font-playfair text-base sm:text-lg font-bold text-white leading-snug">
                  {typedHinglish}
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-1.5 h-4 bg-rose-deep ml-1 align-middle"
                  />
                </p>
              </div>

              {/* Line 2: English Stacked */}
              <AnimatePresence>
                {showEnglish && (
                  <motion.p
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6 }}
                    className="font-poppins text-xs sm:text-sm text-blush/90 font-medium mt-2 leading-relaxed"
                  >
                    "{APP_CONFIG.climaxMessage.english}"
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Line 3: Hindi */}
              <AnimatePresence>
                {showHindi && (
                  <motion.p
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6 }}
                    className="font-hindi text-sm sm:text-base text-gold-accent mt-2 drop-shadow-[0_0_8px_rgba(245,208,169,0.5)]"
                  >
                    {APP_CONFIG.climaxMessage.hindi}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Closing Sign-off */}
              <AnimatePresence>
                {showHindi && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-4 pt-2.5 border-t border-white/10"
                  >
                    <span className="font-dancing text-lg text-pink-soft font-bold">
                      {APP_CONFIG.climaxMessage.closing}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons: Replay & Back to Home */}
              <div className="mt-5 flex items-center justify-center gap-3">
                <motion.button
                  onClick={handleReplay}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full glass-card border border-pink-soft/30 text-xs font-poppins text-pink-soft hover:text-white flex items-center gap-1.5 transition-all shadow-sm min-h-[44px]"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Replay ✨
                </motion.button>

                <Link href="/">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full bg-rose-deep text-white text-xs font-poppins font-medium flex items-center gap-1.5 shadow-glow min-h-[44px]"
                  >
                    <Home className="w-3.5 h-3.5" /> Back to Home
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
