"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Lock, Unlock, Key, Sparkles, HelpCircle } from "lucide-react";
import { APP_CONFIG } from "@/data/config";

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [inputVal, setInputVal] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputVal.trim().toLowerCase();
    const target = APP_CONFIG.secretPassword.toLowerCase();

    // Trigger heartbeat vibration on tap where supported
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([30, 40, 30]);
    }

    if (cleanInput === target || cleanInput === "yashi") {
      setIsUnlocked(true);
      setErrorMsg(null);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.5 },
        colors: ["#FBCFE8", "#E11D48", "#F5D0A9"],
      });

      setTimeout(() => {
        onUnlock();
      }, 1000);
    } else {
      setShake(true);
      setErrorMsg(APP_CONFIG.wrongPasswordMessage);
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([60, 50, 60]);
      }
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[844px] flex flex-col items-center justify-center p-6 text-center bg-night-dark select-none overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute w-72 h-72 rounded-full bg-rose-deep/20 blur-3xl -top-12 pointer-events-none" />
      <div className="absolute w-72 h-72 rounded-full bg-lavender/15 blur-3xl -bottom-12 pointer-events-none" />

      <motion.div
        animate={shake ? { x: [-14, 14, -12, 12, -6, 6, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs relative z-20"
      >
        {/* Glowing Padlock Icon */}
        <motion.div
          animate={
            isUnlocked
              ? { scale: [1, 1.25, 0], rotate: [0, -15, 15, 0] }
              : { scale: [1, 1.05, 1], y: [0, -4, 0] }
          }
          transition={{
            repeat: isUnlocked ? 0 : Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
          className="w-20 h-20 mx-auto mb-6 rounded-3xl glass-card-rose border border-pink-soft/40 flex items-center justify-center shadow-glow relative"
        >
          {isUnlocked ? (
            <Unlock className="w-10 h-10 text-gold-accent" />
          ) : (
            <Lock className="w-10 h-10 text-pink-soft" />
          )}

          {/* Sparkles around lock */}
          <span className="absolute -top-1 -right-1 text-sm">✨</span>
        </motion.div>

        {/* Title */}
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-1">
          Sirf Yashi ke liye 🔒
        </h2>
        <p className="font-hindi text-xs text-gold-accent mb-6">
          पासवर्ड दर्ज करो स्वीटी 🌸
        </p>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="password"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder="Enter secret word..."
              className="w-full px-4 py-3 rounded-2xl glass-card border border-pink-soft/30 text-white placeholder-pink-soft/40 font-poppins text-sm text-center focus:outline-none focus:border-rose-deep shadow-inner"
              autoFocus
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-soft/50">
              <Key className="w-4 h-4" />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-deep to-pink-600 text-white font-poppins text-xs font-semibold shadow-glow border border-pink-200/40 min-h-[44px] flex items-center justify-center gap-2"
          >
            <span>Unlock My Surprise</span>
            <span>💖</span>
          </motion.button>
        </form>

        {/* Wrong Password Message */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 p-2.5 rounded-xl bg-rose-deep/30 border border-rose-deep/50 text-xs text-rose-200 font-poppins"
            >
              {errorMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Password Hint Toggle */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-[11px] font-poppins text-pink-soft/70 hover:text-white flex items-center justify-center gap-1 mx-auto min-h-[44px]"
          >
            <HelpCircle className="w-3.5 h-3.5 text-gold-accent" />
            <span>{showHint ? "Hide Hint" : "Need a Hint?"}</span>
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-[11px] font-poppins text-gold-accent/90 italic"
              >
                "{APP_CONFIG.passwordHint}"
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
