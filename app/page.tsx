"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LockScreen from "@/components/LockScreen";
import Splash from "@/components/Splash";
import LoveProposal from "@/components/LoveProposal";
import Dashboard from "@/components/Dashboard";
import InteractiveExtras from "@/components/InteractiveExtras";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);
  const [showSplash, setShowSplash] = useState<boolean | null>(null);
  const [showProposal, setShowProposal] = useState<boolean | null>(null);

  useEffect(() => {
    // Check session for unlock & proposal status
    const unlocked = sessionStorage.getItem("yashi_unlocked");
    const hasSeenSplash = sessionStorage.getItem("yashi_splash_shown");
    const hasAcceptedProposal = sessionStorage.getItem("yashi_proposal_accepted");

    if (unlocked) {
      setIsUnlocked(true);
      setShowSplash(!hasSeenSplash);
      setShowProposal(!hasAcceptedProposal);
    } else {
      setIsUnlocked(false);
      setShowSplash(false);
      setShowProposal(false);
    }
  }, []);

  const handleUnlocked = () => {
    sessionStorage.setItem("yashi_unlocked", "true");
    setIsUnlocked(true);
    // After unlocking, show romantic splash sequence first
    setShowSplash(true);
  };

  const handleSplashFinish = () => {
    sessionStorage.setItem("yashi_splash_shown", "true");
    setShowSplash(false);
    // Immediately after splash, trigger the Love Proposal Question with love falling!
    setShowProposal(true);
  };

  const handleProposalAccept = () => {
    sessionStorage.setItem("yashi_proposal_accepted", "true");
    setShowProposal(false);
  };

  const replaySplash = () => {
    sessionStorage.removeItem("yashi_splash_shown");
    sessionStorage.removeItem("yashi_proposal_accepted");
    setShowProposal(false);
    setShowSplash(true);
  };

  if (isUnlocked === null) {
    return <div className="w-full h-full min-h-[844px] bg-night-dark" />;
  }

  return (
    <div className="relative w-full h-full min-h-[844px] overflow-hidden">
      {/* Global Interactive Extras */}
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
            <Splash onFinish={handleSplashFinish} />
          </motion.div>
        ) : showProposal ? (
          /* Step 3: Interactive Love Proposal (Question + Love Mask + Falling Hearts + Funny No Button) */
          <motion.div
            key="love-proposal-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full min-h-[844px] absolute inset-0 z-20"
          >
            <LoveProposal onAccept={handleProposalAccept} />
          </motion.div>
        ) : (
          /* Step 4: Interactive Dashboard / Home Screen */
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
