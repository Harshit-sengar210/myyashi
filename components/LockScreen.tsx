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
    <div className="relative w-full h-full min-h-[844px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F4] to-[#FFE4E8] select-none overflow-hidden text-[#3B122D]">
      {/* Background ambient orbs */}
      <div className="absolute w-72 h-72 rounded-full bg-rose-200/50 blur-3xl -top-12 pointer-events-none" />
      <div className="absolute w-72 h-72 rounded-full bg-pink-200/40 blur-3xl -bottom-12 pointer-events-none" />

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
          className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-white border border-rose-300 flex items-center justify-center shadow-[0_8px_25px_rgba(225,29,72,0.15)] relative"
        >
          {isUnlocked ? (
            <Unlock className="w-10 h-10 text-amber-500" />
          ) : (
            <Lock className="w-10 h-10 text-rose-500" />
          )}

          {/* Sparkles around lock */}
          <span className="absolute -top-1 -right-1 text-sm">✨</span>
        </motion.div>

        {/* Title in Deep Bold Readable Font */}
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-rose-950 mb-1 drop-shadow-sm">
          Sirf Yashi ke liye 🔒
        </h2>
        <p className="font-hindi text-sm text-rose-700 font-semibold mb-6">
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
              className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-rose-300 text-rose-950 placeholder-rose-300 font-poppins text-sm text-center font-medium focus:outline-none focus:border-rose-500 shadow-sm"
              autoFocus
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-400">
              <Key className="w-4 h-4" />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-poppins text-xs font-bold shadow-[0_8px_25px_rgba(225,29,72,0.35)] border border-pink-200 min-h-[44px] flex items-center justify-center gap-2"
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
              className="mt-3 p-2.5 rounded-xl bg-white border border-rose-400 text-xs text-rose-600 font-poppins font-semibold shadow-sm"
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
            className="text-xs font-poppins text-rose-700 hover:text-rose-900 font-medium flex items-center justify-center gap-1 mx-auto min-h-[44px]"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{showHint ? "Hide Hint" : "Need a Hint?"}</span>
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-xs font-poppins text-rose-900 font-semibold italic bg-white/70 p-2 rounded-xl border border-rose-200"
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
