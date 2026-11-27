"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface JourneySectionProps {
  chapter: string;
  className?: string;
  children: React.ReactNode;
}

export default function JourneySection({
  chapter,
  className = "",
  children,
}: JourneySectionProps) {
  return (
    <section className={`relative w-full py-6 px-2 flex flex-col items-center justify-center select-none overflow-hidden ${className}`}>
      {/* Chapter pill top divider with Dancing Script */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-5 relative z-20"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-pink-soft/60" />
          <Sparkles className="w-3.5 h-3.5 text-gold-accent animate-pulse" />
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-pink-soft/60" />
        </div>
        <span className="font-dancing text-xl sm:text-2xl text-pink-soft/90 font-bold drop-shadow-[0_2px_8px_rgba(225,29,72,0.4)]">
          {chapter}
        </span>
      </motion.div>

      {/* Section Content */}
      <div className="w-full relative z-10 flex flex-col items-center">
        {children}
      </div>

      {/* Subtle bottom separator */}
      <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-pink-soft/20 to-transparent mt-8" />
    </section>
  );
}
