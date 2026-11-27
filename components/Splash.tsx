"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "./FloatingHearts";

interface SplashProps {
  onFinish: () => void;
}

interface BurstHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
}

interface TwinkleStar {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
}

export default function Splash({ onFinish }: SplashProps) {
  const [stage, setStage] = useState<number>(1);
  const [stars, setStars] = useState<TwinkleStar[]>([]);
  const [bursts, setBursts] = useState<BurstHeart[]>([]);
  const [showSkip, setShowSkip] = useState(false);

  // Typewriter effect state
  const hinglishText = "Ye website sirf tumhare liye hai, Sweetie... 💖";
  const [displayedHinglish, setDisplayedHinglish] = useState("");
  const [showHindi, setShowHindi] = useState(false);

  useEffect(() => {
    // Generate twinkling background stars
    const generatedStars: TwinkleStar[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      top: Math.random() * 95,
      left: Math.random() * 95,
      size: Math.random() * 2.5 + 1.2,
      delay: Math.random() * 1.5,
    }));
    setStars(generatedStars);

    const skipTimer = setTimeout(() => setShowSkip(true), 2000);

    const t2 = setTimeout(() => {
      setStage(2);
      const burstItems: BurstHeart[] = Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
        const distance = Math.random() * 140 + 70;
        const emojis = ["❤️", "💖", "✨", "💕", "🌸", "⭐", "💘"];
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 40,
          size: Math.floor(Math.random() * 14) + 14,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
        };
      });
      setBursts(burstItems);
    }, 1500);

    const t3 = setTimeout(() => setStage(3), 3500);

    const t4 = setTimeout(() => {
      setStage(4);
    }, 5800);

    const t5 = setTimeout(() => setStage(5), 7700);

    const tFinish = setTimeout(() => {
      handleComplete();
    }, 9200);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(tFinish);
    };
  }, []);

  // Typewriter effect controller for Stage 4
  useEffect(() => {
    if (stage < 4) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= hinglishText.length) {
        setDisplayedHinglish(hinglishText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowHindi(true), 350);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [stage]);

  const handleComplete = () => {
    sessionStorage.setItem("yashi_splash_shown", "true");
    onFinish();
  };

  const nameLetters = ["Y", "A", "S", "H", "I"];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 5 ? [1, 1, 0] : 1 }}
      transition={{ duration: 0.9, times: [0, 0.6, 1] }}
      className="relative w-full h-full min-h-[844px] flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F4] to-[#FFE4E8] overflow-hidden select-none text-[#3B122D]"
    >
      {/* Background Falling Petals & Hearts throughout */}
      <FloatingHearts count={22} interactive={false} />

      {/* Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 0.9, 0.3, 1],
              scale: [0.4, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 2.2,
              delay: s.delay,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              position: "absolute",
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: "#E11D48",
              borderRadius: "50%",
              boxShadow: "0 0 6px rgba(225, 29, 72, 0.6)",
            }}
          />
        ))}
      </div>

      {/* Skip Button (Top Right corner) */}
      <AnimatePresence>
        {showSkip && stage < 5 && (
          <motion.button
            onClick={handleComplete}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.9, y: 0 }}
            exit={{ opacity: 0 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-6 right-6 z-50 px-3.5 py-1.5 rounded-full bg-white border border-rose-300 text-xs font-poppins text-rose-700 font-semibold shadow-sm"
          >
            Skip ➔
          </motion.button>
        )}
      </AnimatePresence>

      {/* 0-3.5s STAGES 1 & 2: Center Heart & Burst */}
      {stage <= 2 && (
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              stage === 1
                ? {
                    scale: [0.85, 1.15, 0.95, 1.1],
                    opacity: 1,
                    filter: [
                      "drop-shadow(0 0 15px rgba(225,29,72,0.4))",
                      "drop-shadow(0 0 35px rgba(225,29,72,0.7))",
                      "drop-shadow(0 0 20px rgba(225,29,72,0.5))",
                      "drop-shadow(0 0 40px rgba(225,29,72,0.8))",
                    ],
                  }
                : {
                    scale: [1, 1.45, 0.95, 1.6, 0],
                    opacity: [1, 1, 1, 1, 0],
                  }
            }
            transition={
              stage === 1
                ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.6, ease: "easeInOut" }
            }
            className="text-7xl sm:text-8xl select-none"
          >
            💖
          </motion.div>

          {stage === 2 && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {bursts.map((b) => (
                <motion.div
                  key={b.id}
                  initial={{ x: 0, y: 0, scale: 0.3, opacity: 1 }}
                  animate={{
                    x: b.x,
                    y: b.y,
                    scale: [0.3, 1.3, 0.7],
                    opacity: [1, 0.9, 0],
                    rotate: (Math.random() - 0.5) * 60,
                  }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    fontSize: `${b.size}px`,
                    filter: "drop-shadow(0 0 8px rgba(225,29,72,0.4))",
                  }}
                >
                  {b.emoji}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3.5s+ STAGES 3, 4, 5: Welcome, Name Drop, and Typewriter */}
      {stage >= 3 && (
        <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center max-w-sm">
          {/* "Welcome" */}
          <motion.span
            initial={{ opacity: 0, filter: "blur(12px)", y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xs tracking-[0.35em] uppercase font-poppins text-rose-600 font-bold mb-2"
          >
            Welcome
          </motion.span>

          {/* Name "YASHI" letter by letter */}
          <div className="flex items-center justify-center gap-1.5 my-2">
            {nameLetters.map((letter, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: -45, scale: 0.3, rotate: -15 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 14,
                  delay: 0.2 + idx * 0.16,
                }}
                className="font-dancing text-6xl sm:text-7xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent inline-block drop-shadow-sm"
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: 1, rotate: 180 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-3xl text-amber-500 ml-1 filter drop-shadow-sm"
            >
              ✨
            </motion.span>
          </div>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-rose-400 to-transparent my-3"
          />

          {/* Hinglish Typewriter line */}
          <div className="min-h-[48px] flex flex-col items-center justify-center mt-2">
            {stage >= 4 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-poppins text-sm sm:text-base text-rose-950 font-semibold leading-relaxed"
              >
                {displayedHinglish}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  className="inline-block w-1.5 h-4 bg-rose-600 ml-1 rounded-sm align-middle"
                />
              </motion.p>
            )}

            {showHindi && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-hindi text-sm text-rose-700 font-medium mt-1"
              >
                तुम्हारी एक मुस्कान मेरे लिए सब कुछ है 🌸
              </motion.p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
