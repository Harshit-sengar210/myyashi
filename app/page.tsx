"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LockScreen from "@/components/LockScreen";
import Splash from "@/components/Splash";
import Dashboard from "@/components/Dashboard";
import InteractiveExtras from "@/components/InteractiveExtras";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    // Check session for unlock & splash status
    const unlocked = sessionStorage.getItem("yashi_unlocked");
    const hasSeenSplash = sessionStorage.getItem("yashi_splash_shown");

    if (unlocked) {
      setIsUnlocked(true);
      setShowSplash(!hasSeenSplash);
    } else {
      setIsUnlocked(false);
      setShowSplash(false);
    }
  }, []);

  const handleUnlocked = () => {
    sessionStorage.setItem("yashi_unlocked", "true");
    setIsUnlocked(true);
    // After unlocking, trigger the romantic splash sequence
    setShowSplash(true);
  };

  const replaySplash = () => {
    sessionStorage.removeItem("yashi_splash_shown");
    setShowSplash(true);
  };

  if (isUnlocked === null) {
    return <div className="w-full h-full min-h-[844px] bg-night-dark" />;
  }

  return (
    <div className="relative w-full h-full min-h-[844px] overflow-hidden">
      {/* 6) Global Interactive Extras: Sparkle trail, shake heart rain, haptic feedback */}
      <InteractiveExtras />

      <AnimatePresence mode="wait">
        {/* Step 1: Secret Lock Screen */}
        {!isUnlocked ? (
          <motion.div
            key="lock-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full min-h-[844px] absolute inset-0 z-40"
          >
            <LockScreen onUnlock={handleUnlocked} />
          </motion.div>
        ) : showSplash ? (
          /* Step 2: Animated Splash Sequence */
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full min-h-[844px] absolute inset-0 z-30"
          >
            <Splash onFinish={() => setShowSplash(false)} />
          </motion.div>
        ) : (
          /* Step 3: Interactive Dashboard */
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full min-h-[844px]"
          >
            <Dashboard onReplaySplash={replaySplash} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
