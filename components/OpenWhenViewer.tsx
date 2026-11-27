"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, X, Calendar, BookOpen } from "lucide-react";
import { openWhenLetters, OpenWhenLetter } from "@/data/openwhen";

export default function OpenWhenViewer() {
  const [selectedLetter, setSelectedLetter] = useState<OpenWhenLetter | null>(null);
  const [openedIds, setOpenedIds] = useState<Set<string>>(new Set());

  const handleOpen = (letter: OpenWhenLetter) => {
    // Vibrate gently on tap
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(35);
    }

    setOpenedIds((prev) => new Set(prev).add(letter.id));
    setSelectedLetter(letter);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#E11D48", "#FBCFE8", "#F5D0A9"],
    });
  };

  return (
    <div className="w-full my-3">
      <div className="text-center mb-6">
        <span className="text-xs font-poppins uppercase tracking-widest text-pink-soft font-semibold block mb-1">
          For Every Mood & Moment
        </span>
        <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white">
          "Open When..." Letters 💌
        </h3>
        <p className="font-hindi text-xs text-gold-accent mt-0.5">
          जब भी ज़रूरत महसूस हो, एक ख़त खोल लेना ✨
        </p>
      </div>

      {/* 5 Sealed Envelopes Stack */}
      <div className="space-y-4 px-1">
        {openWhenLetters.map((letter, idx) => {
          const isOpened = openedIds.has(letter.id);

          return (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              onClick={() => handleOpen(letter)}
              className="cursor-pointer group"
            >
              <div
                className={`relative rounded-3xl p-4 sm:p-5 glass-card bg-gradient-to-r ${letter.color} border border-pink-soft/25 shadow-glass group-hover:border-rose-deep/50 group-hover:shadow-glow transition-all duration-300 overflow-hidden min-h-[105px] flex flex-col justify-between`}
              >
                {/* Envelope Flap Accent */}
                <div className="absolute top-0 left-0 right-0 h-7 border-b border-white/10 bg-white/[0.04] rounded-t-3xl" />

                {/* Wax Seal & Meta */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2.5">
                    {/* Wax Stamp */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-deep via-rose-600 to-pink-soft flex items-center justify-center shadow-glow border border-pink-200/50 group-hover:scale-110 transition-transform">
                      <span className="text-lg">{letter.emoji}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-poppins px-2 py-0.5 rounded-full bg-white/10 text-pink-soft">
                        {letter.tag}
                      </span>
                    </div>
                  </div>

                  {isOpened && (
                    <span className="text-[10px] font-poppins text-pink-soft/80 flex items-center gap-1">
                      <Heart className="w-3 h-3 text-rose-deep fill-rose-deep" /> Read
                    </span>
                  )}
                </div>

                {/* Label & Hindi Subtitle */}
                <div className="mt-2 relative z-10">
                  <h4 className="font-playfair text-base sm:text-lg font-bold text-white group-hover:text-rose-200 transition-colors">
                    {letter.label}
                  </h4>
                  <p className="font-hindi text-xs text-gold-accent mt-0.5">
                    {letter.hindiLabel}
                  </p>
                </div>

                {/* Bottom hint */}
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-poppins text-pink-soft/70">
                  <span className="flex items-center gap-1 group-hover:text-gold-accent transition-colors">
                    <BookOpen className="w-3 h-3" /> Tap to break seal & read
                  </span>
                  <span className="text-rose-400 group-hover:translate-x-1 transition-transform">
                    ➔
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Letter Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLetter(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[400px] max-h-[85vh] rounded-[32px] overflow-hidden flex flex-col shadow-2xl border border-pink-soft/40 cursor-default"
              style={{
                background: "linear-gradient(135deg, #FFF9F2 0%, #FFF2E8 50%, #FEECE2 100%)",
                color: "#2C1810",
              }}
            >
              {/* Paper Top Navigation */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-amber-900/10">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedLetter.emoji}</span>
                  <span className="text-xs uppercase tracking-widest font-poppins text-amber-900/70 font-semibold">
                    {selectedLetter.tag}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedLetter(null)}
                  className="w-8 h-8 rounded-full bg-amber-950/10 hover:bg-amber-950/20 text-amber-950 flex items-center justify-center transition-all min-h-[44px]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Letter Content */}
              <div className="flex-1 overflow-y-auto px-6 py-5 select-text">
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-amber-950 mb-1">
                  {selectedLetter.label}
                </h3>
                <p className="font-hindi text-sm text-rose-800 mb-4 font-normal">
                  {selectedLetter.hindiLabel}
                </p>

                <div className="space-y-4">
                  {selectedLetter.body.split("\n").map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="font-dancing text-xl sm:text-2xl text-amber-950 font-medium leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-6 pt-3 border-t border-amber-900/15 text-right">
                  <span className="font-dancing text-xl text-rose-deep font-bold block">
                    {selectedLetter.closing}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
