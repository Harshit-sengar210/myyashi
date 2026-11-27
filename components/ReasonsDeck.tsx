"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, RefreshCw, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { reasonsData, ReasonCard } from "@/data/reasons";

function SwipeCard({
  card,
  index,
  total,
  onSwipe,
}: {
  card: ReasonCard;
  index: number;
  total: number;
  onSwipe: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-180, 180], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0.4, 1, 0.4]);

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 90) {
      onSwipe();
    }
  };

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity,
        zIndex: total - index,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      className="absolute inset-0 cursor-grab select-none"
    >
      <div
        className={`w-full h-full rounded-[32px] p-6 glass-card bg-gradient-to-br ${card.color} border border-pink-soft/30 shadow-[0_15px_35px_rgba(27,11,46,0.6)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden relative`}
      >
        {/* Top Tag & Card Index */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
            <span className="text-[10px] font-poppins uppercase tracking-wider text-pink-soft font-medium">
              Reason #{card.id}
            </span>
          </div>

          <span className="text-xs font-poppins text-pink-soft/70">
            {index + 1} / {total}
          </span>
        </div>

        {/* Center Main Reason */}
        <div className="my-auto text-center relative z-10 px-2">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="text-6xl mb-4"
          >
            {card.emoji}
          </motion.div>

          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
            {card.title}
          </h3>

          {card.hindi && (
            <p className="font-hindi text-base text-gold-accent mb-4 font-normal">
              {card.hindi}
            </p>
          )}

          <p className="font-poppins text-sm text-blush/90 leading-relaxed max-w-xs mx-auto">
            "{card.subtitle}"
          </p>
        </div>

        {/* Bottom Swipe Hint */}
        <div className="flex items-center justify-between text-[11px] font-poppins text-pink-soft/60 pt-3 border-t border-white/10 relative z-10">
          <span className="flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" /> Swipe either way
          </span>
          <span className="flex items-center gap-1">
            Next <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Ambient background glow orb */}
        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-rose-deep/30 rounded-full blur-2xl pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function ReasonsDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < reasonsData.length) {
      setCurrentIndex((prev) => prev + 1);

      // Trigger soft mini confetti on each swipe
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { y: 0.6 },
        colors: ["#E11D48", "#FBCFE8", "#F5D0A9"],
      });
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  const isCompleted = currentIndex >= reasonsData.length;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Counter Bar */}
      <div className="w-full flex items-center justify-between mb-4 px-2">
        <span className="text-xs font-poppins text-pink-soft/80 flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-deep fill-rose-deep" />
          Reasons I Adore You
        </span>
        <span className="text-xs font-poppins px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gold-accent font-semibold">
          {Math.min(currentIndex + 1, reasonsData.length)} / {reasonsData.length}
        </span>
      </div>

      {/* Card Stack Container (Height 430px) */}
      <div className="relative w-full max-w-[340px] h-[430px] my-2">
        <AnimatePresence>
          {!isCompleted ? (
            reasonsData.slice(currentIndex, currentIndex + 2).map((card, idx) => (
              <SwipeCard
                key={card.id}
                card={card}
                index={currentIndex + idx}
                total={reasonsData.length}
                onSwipe={handleNext}
              />
            ))
          ) : (
            /* Final Card when all 10 are swiped */
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full h-full rounded-[32px] p-6 glass-card-rose border border-pink-soft/40 shadow-glow flex flex-col items-center justify-center text-center backdrop-blur-2xl"
            >
              <div className="text-6xl mb-3">💞</div>

              <h3 className="font-dancing text-4xl text-rose-deep font-bold mb-2">
                Aur bhi bahut saari hain...
              </h3>

              <p className="font-hindi text-base text-gold-accent mb-3">
                ये 10 वजहें तो सिर्फ शुरुआत हैं ✨
              </p>

              <p className="font-poppins text-xs text-blush/90 leading-relaxed max-w-xs mb-6">
                Sach kahun toh tumhare baare me accha lagne ke liye kisi wajah ki zaroorat nahi hai. Tum jaise ho, bilkul anmol ho Sweetie.
              </p>

              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-full bg-rose-deep text-white font-poppins text-xs font-medium flex items-center gap-2 shadow-glow"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Start Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action button below */}
      {!isCompleted && (
        <div className="mt-5 flex items-center gap-3">
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full glass-card border border-pink-soft/30 text-xs font-poppins text-blush hover:text-white flex items-center gap-1.5 shadow-sm"
          >
            <span>Next Reason</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
