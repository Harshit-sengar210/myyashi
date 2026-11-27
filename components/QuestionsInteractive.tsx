"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, RefreshCw, Smile, MessageCircleHeart } from "lucide-react";
import { quizQuestions, moodOptions, MoodOption } from "@/data/questions";

export default function QuestionsInteractive() {
  const [activeTab, setActiveTab] = useState<"quiz" | "friend" | "mood">("quiz");

  // PART A: Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [reactionMsg, setReactionMsg] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // PART B: Runaway "No" Button State
  const [noCount, setNoCount] = useState(0);
  const [yesAccepted, setYesAccepted] = useState(false);
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });

  // PART C: Mood State
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);

  // Trigger celebration confetti
  const triggerLoveConfetti = () => {
    confetti({
      particleCount: 75,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#E11D48", "#FBCFE8", "#F5D0A9", "#FFF1F2", "#C4B5FD"],
    });
  };

  // Option select handler for Quiz
  const handleSelectOption = (index: number) => {
    if (selectedOptionIdx !== null) return; // Prevent double tap
    setSelectedOptionIdx(index);
    const q = quizQuestions[currentQIndex];
    const option = q.options[index];

    setReactionMsg(option.reaction);
    setScore((prev) => prev + 1);

    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.7 },
      colors: ["#E11D48", "#FBCFE8"],
    });

    // Auto next after 2 seconds
    setTimeout(() => {
      if (currentQIndex + 1 < quizQuestions.length) {
        setCurrentQIndex((prev) => prev + 1);
        setSelectedOptionIdx(null);
        setReactionMsg(null);
      } else {
        setQuizFinished(true);
        triggerLoveConfetti();
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOptionIdx(null);
    setReactionMsg(null);
    setScore(0);
    setQuizFinished(false);
  };

  // Runaway "No" button logic
  const handleNoRunaway = () => {
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 140;
    setNoButtonOffset({ x: randomX, y: randomY });
    setNoCount((prev) => prev + 1);
  };

  const getNoButtonText = () => {
    const texts = [
      "No 🙈",
      "Soch lo ek baar aur 🥹",
      "Pakka na? 🥺",
      "Aisa mat karo na 💔",
      "Please Sweetie? 🥺",
      "Bas Yes daba do na 💖",
    ];
    return texts[Math.min(noCount, texts.length - 1)];
  };

  const handleYesClick = () => {
    setYesAccepted(true);
    triggerLoveConfetti();
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.5 },
      });
    }, 300);
  };

  return (
    <div className="w-full">
      {/* 3 Section Sub-Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl glass-card border border-pink-soft/20 mb-6 backdrop-blur-md">
        <button
          onClick={() => setActiveTab("quiz")}
          className={`py-2 rounded-xl text-xs font-poppins transition-all flex items-center justify-center gap-1 ${
            activeTab === "quiz"
              ? "bg-rose-deep text-white font-medium shadow-glow"
              : "text-pink-soft/70 hover:text-white"
          }`}
        >
          <span>🎯</span> Quiz
        </button>
        <button
          onClick={() => setActiveTab("friend")}
          className={`py-2 rounded-xl text-xs font-poppins transition-all flex items-center justify-center gap-1 ${
            activeTab === "friend"
              ? "bg-rose-deep text-white font-medium shadow-glow"
              : "text-pink-soft/70 hover:text-white"
          }`}
        >
          <span>🥺</span> Ek Sawaal
        </button>
        <button
          onClick={() => setActiveTab("mood")}
          className={`py-2 rounded-xl text-xs font-poppins transition-all flex items-center justify-center gap-1 ${
            activeTab === "mood"
              ? "bg-rose-deep text-white font-medium shadow-glow"
              : "text-pink-soft/70 hover:text-white"
          }`}
        >
          <span>🌸</span> Aaj Ka Mood
        </button>
      </div>

      {/* ========================================================= */}
      {/* PART A: CUTE QUIZ */}
      {/* ========================================================= */}
      {activeTab === "quiz" && (
        <div className="w-full">
          {!quizFinished ? (
            <div className="glass-card-rose rounded-3xl p-5 border border-pink-soft/30 backdrop-blur-xl relative overflow-hidden">
              {/* Heart Progress Bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5">
                  {quizQuestions.map((_, idx) => (
                    <motion.div
                      key={idx}
                      animate={{
                        scale: idx === currentQIndex ? 1.25 : 1,
                        opacity: idx <= currentQIndex ? 1 : 0.35,
                      }}
                      className="text-sm"
                    >
                      {idx <= currentQIndex ? "💖" : "🤍"}
                    </motion.div>
                  ))}
                </div>
                <span className="text-[11px] font-poppins text-pink-soft/80">
                  Question {currentQIndex + 1} of {quizQuestions.length}
                </span>
              </div>

              {/* Question Text */}
              <motion.div
                key={currentQIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-5"
              >
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-blush leading-snug">
                  {quizQuestions[currentQIndex].question}
                </h3>
                {quizQuestions[currentQIndex].hindiSub && (
                  <p className="font-hindi text-xs text-gold-accent mt-1">
                    {quizQuestions[currentQIndex].hindiSub}
                  </p>
                )}
              </motion.div>

              {/* 4 Big Options */}
              <div className="space-y-2.5 mb-4">
                {quizQuestions[currentQIndex].options.map((option, idx) => {
                  const isSelected = selectedOptionIdx === idx;
                  return (
                    <motion.button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={selectedOptionIdx !== null}
                      whileHover={selectedOptionIdx === null ? { scale: 1.02 } : {}}
                      whileTap={selectedOptionIdx === null ? { scale: 0.98 } : {}}
                      className={`w-full p-3.5 rounded-2xl text-left font-poppins text-xs sm:text-sm flex items-center justify-between transition-all border ${
                        isSelected
                          ? "bg-rose-deep text-white border-pink-soft shadow-glow"
                          : "bg-white/5 border-white/10 text-blush hover:border-pink-soft/40 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl p-1.5 rounded-xl bg-white/10">{option.emoji}</span>
                        <span className="font-medium">{option.text}</span>
                      </div>
                      {isSelected && <Sparkles className="w-4 h-4 text-gold-accent animate-spin" />}
                    </motion.button>
                  );
                })}
              </div>

              {/* Cute reaction message popup */}
              <AnimatePresence>
                {reactionMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-3 rounded-2xl bg-rose-deep/30 border border-pink-soft/40 text-center font-poppins text-xs text-blush shadow-glow"
                  >
                    {reactionMsg}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Quiz Score Card */
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card-rose rounded-3xl p-6 border border-pink-soft/30 text-center shadow-glass"
            >
              <div className="text-5xl mb-3">🏆</div>
              <h3 className="font-playfair text-2xl font-bold text-white mb-1">
                Wah Sweetie! Perfect Score!
              </h3>
              <p className="font-hindi text-base text-gold-accent mb-4">
                तुम्हें जानना और समझना दुनिया का सबसे ख़ूबसूरत काम है ❤️
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-xs mx-auto mb-5 text-xs text-blush/90 font-poppins leading-relaxed">
                " Chahe chai ho ya barish ka mausam, tumhara har andaaz sabse alag aur special hai. Hamesha aisi hi rehna! "
              </div>

              <motion.button
                onClick={restartQuiz}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-deep text-white font-poppins text-xs font-semibold shadow-glow"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Phir Se Khelein
              </motion.button>
            </motion.div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* PART B: RUNAWAY "NO" BUTTON (GENTLE QUESTION) */}
      {/* ========================================================= */}
      {activeTab === "friend" && (
        <div className="w-full">
          <div className="glass-card-rose rounded-3xl p-6 border border-pink-soft/30 text-center relative overflow-hidden backdrop-blur-xl min-h-[380px] flex flex-col justify-between">
            {!yesAccepted ? (
              <>
                <div className="mt-3">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-deep/20 border border-rose-deep/40 flex items-center justify-center text-3xl shadow-glow">
                    🥺
                  </div>

                  <h3 className="font-playfair text-2xl font-bold text-white mb-2 leading-snug">
                    Sweetie, ek chhota sa sawaal...
                  </h3>
                  <p className="font-poppins text-base text-pink-soft font-medium leading-relaxed">
                    "Kya tum meri hamesha dost rahogi? 🥺"
                  </p>
                  <p className="font-hindi text-xs text-gold-accent/80 mt-1">
                    (सोच समझ कर जवाब देना 😉)
                  </p>
                </div>

                {/* Yes and Running No Buttons */}
                <div className="my-8 flex items-center justify-center gap-4 relative min-h-[90px]">
                  {/* YES BUTTON (Grows bigger) */}
                  <motion.button
                    onClick={handleYesClick}
                    style={{
                      transform: `scale(${1 + Math.min(noCount * 0.18, 0.9)})`,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-deep to-pink-600 text-white font-poppins text-sm font-bold shadow-glow border border-pink-200/40 z-20 transition-transform"
                  >
                    Haan, Bilkul! 💖
                  </motion.button>

                  {/* NO BUTTON (Runs away on touch or hover, shrinks) */}
                  <motion.button
                    onMouseEnter={handleNoRunaway}
                    onTouchStart={handleNoRunaway}
                    onClick={handleNoRunaway}
                    animate={{
                      x: noButtonOffset.x,
                      y: noButtonOffset.y,
                      scale: Math.max(0.95 - noCount * 0.12, 0.45),
                      opacity: Math.max(1 - noCount * 0.1, 0.5),
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    className="px-4 py-2.5 rounded-full bg-white/10 text-pink-soft/90 font-poppins text-xs border border-white/20 whitespace-nowrap select-none cursor-pointer"
                  >
                    {getNoButtonText()}
                  </motion.button>
                </div>

                <div className="text-[11px] font-poppins text-lavender/60">
                  {noCount > 0
                    ? `Attempts to click No: ${noCount} (Button bhaag raha hai 😂)`
                    : "Touch or click your honest answer ❤️"}
                </div>
              </>
            ) : (
              /* Success confirmation when Yes is clicked */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 flex flex-col items-center justify-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-6xl mb-4"
                >
                  🥰
                </motion.div>

                <h3 className="font-dancing text-4xl text-rose-deep font-bold mb-2">
                  Yayyy! Thank you Sweetie 💖
                </h3>

                <p className="font-poppins text-sm text-blush font-medium leading-relaxed max-w-xs mb-3">
                  "Tumne sach me mera din bana diya! Tumhari dosti mere liye sabse anmol hai."
                </p>

                <p className="font-hindi text-base text-gold-accent mb-6">
                  हमेशा साथ रहेंगे, वादा रहा ✨
                </p>

                <button
                  onClick={() => {
                    setYesAccepted(false);
                    setNoCount(0);
                    setNoButtonOffset({ x: 0, y: 0 });
                  }}
                  className="text-xs font-poppins text-pink-soft/70 hover:text-white underline"
                >
                  Replay this question
                </button>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PART C: MOOD PICKER */}
      {/* ========================================================= */}
      {activeTab === "mood" && (
        <div className="w-full">
          <div className="glass-card-rose rounded-3xl p-5 border border-pink-soft/30 backdrop-blur-xl">
            <div className="text-center mb-5">
              <span className="text-3xl mb-1 block">🌸</span>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white">
                Aaj tumhara mood kaisa hai?
              </h3>
              <p className="font-hindi text-xs text-gold-accent mt-0.5">
                मुझे बताओ, मैं सुनना चाहता हूँ ✨
              </p>
            </div>

            {/* Mood Emojis Grid */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {moodOptions.map((mood) => {
                const isSelected = selectedMood?.id === mood.id;
                return (
                  <motion.button
                    key={mood.id}
                    onClick={() => {
                      setSelectedMood(mood);
                      confetti({
                        particleCount: 20,
                        spread: 40,
                        origin: { y: 0.7 },
                      });
                    }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-rose-deep/40 border-pink-soft shadow-glow"
                        : "bg-white/5 border-white/10 hover:border-pink-soft/30"
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl">{mood.emoji}</span>
                    <span className="text-[10px] font-poppins text-blush mt-1 text-center font-medium line-clamp-1">
                      {mood.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Personalized caring response */}
            <AnimatePresence mode="wait">
              {selectedMood ? (
                <motion.div
                  key={selectedMood.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-4 rounded-2xl bg-white/5 border border-pink-soft/20 text-center"
                >
                  <p className="font-poppins text-sm text-blush leading-relaxed mb-2 font-medium">
                    {selectedMood.response}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-deep/20 border border-rose-deep/30 text-[11px] text-pink-200 font-poppins">
                    <span>💡 Tip:</span>
                    <span>{selectedMood.tip}</span>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-4 text-xs font-poppins text-pink-soft/60">
                  Tap on any emoji above to share how you're feeling today! ✨
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
