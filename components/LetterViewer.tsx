"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ChevronLeft, ChevronRight, X, Heart, Calendar, BookOpen, Sparkles, MailOpen, Lock } from "lucide-react";
import { LoveLetter, LetterLanguage, letters as allLetters } from "@/data/letters";

export default function LetterViewer() {
  const [activeFilter, setActiveFilter] = useState<LetterLanguage>("all");
  const [selectedLetter, setSelectedLetter] = useState<LoveLetter | null>(null);
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Filter letters based on selected chip
  const filteredLetters = allLetters.filter((letter) => {
    if (activeFilter === "all") return true;
    return letter.language === activeFilter;
  });

  // Confetti & Heart celebration trigger
  const triggerConfetti = (id: string, e?: React.MouseEvent) => {
    setHasLiked((prev) => ({ ...prev, [id]: true }));

    confetti({
      particleCount: 55,
      spread: 75,
      origin: { y: 0.65 },
      colors: ["#E11D48", "#FBCFE8", "#F5D0A9", "#FFF1F2", "#C4B5FD"],
      shapes: ["circle"],
      scalar: 1.2,
    });
  };

  // Navigate next / previous letters
  const currentIndex = selectedLetter
    ? filteredLetters.findIndex((l) => l.id === selectedLetter.id)
    : -1;

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < filteredLetters.length - 1) {
      setSelectedLetter(filteredLetters[currentIndex + 1]);
    } else if (filteredLetters.length > 0) {
      setSelectedLetter(filteredLetters[0]); // wrap around
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedLetter(filteredLetters[currentIndex - 1]);
    } else if (filteredLetters.length > 0) {
      setSelectedLetter(filteredLetters[filteredLetters.length - 1]); // wrap around
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext(); // swiped left -> next
      } else {
        handlePrev(); // swiped right -> prev
      }
    }
    setTouchStartX(null);
  };

  const filterChips: { id: LetterLanguage; label: string }[] = [
    { id: "all", label: `All Memories (${allLetters.length})` },
    { id: "hinglish", label: "Special Memories" },
    { id: "hindi", label: "दिल की बात" },
    { id: "special", label: "For Sweetie 🎁" },
  ];

  return (
    <div className="w-full pb-10">
      {/* Intro Subtext */}
      <div className="mb-4 text-center">
        <p className="text-xs text-pink-soft/80 font-poppins">
          Hamari secret timeline ke pyare kisse... tap karke pura padhein 💌
        </p>
      </div>

      {/* Language / Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 no-scrollbar">
        {filterChips.map((chip) => {
          const isActive = activeFilter === chip.id;
          return (
            <motion.button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-poppins transition-all shrink-0 ${
                isActive
                  ? "bg-rose-deep text-white shadow-glow border border-pink-soft/50 font-medium"
                  : "glass-card text-pink-soft/80 border-pink-soft/20 hover:text-white"
              }`}
            >
              {chip.label}
            </motion.button>
          );
        })}
      </div>

      {/* Stack of Sealed Envelopes with Teaser / Little Text */}
      <div className="grid grid-cols-1 gap-4">
        {filteredLetters.map((letter, index) => {
          return (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              onClick={() => setSelectedLetter(letter)}
              className="cursor-pointer group"
            >
              {/* Envelope Body with 3D feel and Sealed Look */}
              <div className="relative rounded-3xl p-5 glass-card bg-gradient-to-br from-[#2b1043]/95 via-[#1e0a30]/85 to-[#120420]/95 border border-pink-soft/25 shadow-glass group-hover:border-rose-deep/60 group-hover:shadow-glow transition-all duration-300 overflow-hidden">
                {/* Envelope Flap Accent Lines */}
                <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/10 bg-white/[0.04] rounded-t-3xl pointer-events-none" />

                {/* Top Row: Wax Seal & Badge / Date */}
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <div className="flex items-center gap-2.5">
                    {/* Wax Stamp */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-deep via-rose-600 to-pink-soft flex items-center justify-center shadow-[0_2px_12px_rgba(225,29,72,0.6)] border border-pink-200/40 group-hover:scale-110 transition-transform">
                      <Heart className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-wider font-poppins px-2.5 py-0.5 rounded-full bg-rose-500/20 text-pink-200 border border-rose-400/30">
                        {letter.badge || "Secret 💌"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-poppins text-pink-soft/70">
                    <Calendar className="w-3 h-3" />
                    <span>{letter.date}</span>
                  </div>
                </div>

                {/* Letter Title & Little Text Teaser */}
                <div className="relative z-10 pt-1">
                  <h3 className="text-base sm:text-lg font-bold text-blush group-hover:text-rose-200 transition-colors font-playfair flex items-center gap-2">
                    {letter.title}
                  </h3>
                  {letter.hindiTitle && (
                    <p className="text-[12px] text-pink-300/90 font-hindi mt-0.5">
                      {letter.hindiTitle}
                    </p>
                  )}

                  {/* Teaser Preview (Little Text) */}
                  <div className="mt-2.5 p-2.5 rounded-xl bg-black/25 border border-white/5">
                    <p className="text-xs text-blush/80 line-clamp-2 leading-relaxed font-poppins italic">
                      "{letter.preview}"
                    </p>
                  </div>
                </div>

                {/* Bottom Prompt: Open to Read Full Message */}
                <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-poppins text-pink-soft/80">
                  <span className="flex items-center gap-1.5 text-rose-300 group-hover:text-gold-accent transition-colors font-medium">
                    <MailOpen className="w-3.5 h-3.5" /> Tap to open full letter
                  </span>
                  <span className="text-xs text-rose-400 group-hover:translate-x-1 transition-transform font-bold">
                    Open ➔
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Expanded Letter Modal with 3D Flip & Parchment Texture */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              initial={{ scale: 0.85, y: 50, rotateX: 20 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.85, y: 50, rotateX: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[400px] max-h-[85vh] rounded-[32px] overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-pink-soft/40"
              style={{
                background: "linear-gradient(135deg, #FFF9F2 0%, #FFF2E8 50%, #FEECE2 100%)",
                color: "#2C1810",
              }}
            >
              {/* Paper Top Navigation Bar */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-amber-900/10">
                <div className="flex items-center gap-2">
                  <span className="text-rose-deep text-lg">💌</span>
                  <span className="text-[11px] uppercase tracking-widest font-poppins text-amber-900/80 font-bold">
                    {selectedLetter.badge || "Personal Memory"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-poppins text-amber-900/60">
                    {currentIndex + 1} of {filteredLetters.length}
                  </span>
                  <button
                    onClick={() => setSelectedLetter(null)}
                    className="w-8 h-8 rounded-full bg-amber-950/10 hover:bg-amber-950/20 text-amber-950 flex items-center justify-center transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Letter Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5 select-text">
                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-amber-950 mb-1 font-playfair">
                  {selectedLetter.title}
                </h2>

                {selectedLetter.hindiTitle && (
                  <p className="text-sm font-hindi text-rose-800/80 mb-2">
                    {selectedLetter.hindiTitle}
                  </p>
                )}

                <p className="text-[11px] font-poppins text-amber-800/60 mb-5 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {selectedLetter.date}
                </p>

                {/* Letter Content line by line with handwritten font */}
                <div className="space-y-4">
                  {selectedLetter.body.split("\n\n").map((paragraph, pIdx) => (
                    <motion.p
                      key={pIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + pIdx * 0.08, duration: 0.4 }}
                      className={`leading-relaxed text-amber-950 font-medium ${
                        selectedLetter.language === "hindi"
                          ? "font-hindi text-base sm:text-lg"
                          : "font-dancing text-xl sm:text-2xl"
                      }`}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Heart Burst & Like Button */}
                <div className="mt-8 pt-4 border-t border-amber-900/15 flex flex-col items-center justify-center">
                  <motion.button
                    onClick={(e) => triggerConfetti(selectedLetter.id, e)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    className={`px-5 py-2.5 rounded-full font-poppins text-xs font-medium flex items-center gap-2 shadow-md transition-all ${
                      hasLiked[selectedLetter.id]
                        ? "bg-rose-deep text-white shadow-glow"
                        : "bg-rose-50 text-rose-deep border border-rose-200 hover:bg-rose-100"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        hasLiked[selectedLetter.id] ? "fill-white text-white" : "fill-rose-deep text-rose-deep"
                      }`}
                    />
                    <span>
                      {hasLiked[selectedLetter.id]
                        ? "Mujhe bohot pasand aaya! ❤️"
                        : "💖 Mujhe pasand aaya"}
                    </span>
                  </motion.button>
                  <span className="text-[10px] text-amber-900/50 mt-1 font-poppins">
                    Tap to send love and confetti ✨
                  </span>
                </div>
              </div>

              {/* Bottom Carousel Navigation Controls */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-amber-900/10 bg-amber-900/[0.04]">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1 text-xs font-poppins text-amber-950 hover:text-rose-deep transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <span className="text-[11px] font-poppins text-amber-900/50">
                  Swipe left/right
                </span>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 text-xs font-poppins text-amber-950 hover:text-rose-deep transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
