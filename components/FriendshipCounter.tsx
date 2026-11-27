"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { APP_CONFIG } from "@/data/config";
import { Clock } from "lucide-react";

interface TimeUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function FriendshipCounter() {
  const [time, setTime] = useState<TimeUnits>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(APP_CONFIG.friendshipStartDate).getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, now - start);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTime({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const counterBlocks = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Mins", value: time.minutes },
    { label: "Secs", value: time.seconds },
  ];

  return (
    <div className="w-full glass-card-rose rounded-3xl p-4 border border-pink-soft/25 relative overflow-hidden backdrop-blur-xl shadow-glass">
      {/* Decorative top title */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-gold-accent animate-spin" style={{ animationDuration: "12s" }} />
          <span className="text-[11px] font-poppins font-medium uppercase tracking-wider text-pink-soft">
            Days of Togetherness
          </span>
        </div>
        <span className="text-[11px] font-hindi text-gold-accent">
          हर पल खास है ❤️
        </span>
      </div>

      {/* 4 Counter Pods */}
      <div className="grid grid-cols-4 gap-2">
        {counterBlocks.map((block, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="h-7 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={block.value}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="font-playfair text-xl font-bold text-blush tracking-tight"
                >
                  {String(block.value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="text-[10px] uppercase font-poppins text-pink-soft/70 tracking-wider">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
