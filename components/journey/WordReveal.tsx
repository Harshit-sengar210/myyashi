"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import JourneySection from "./JourneySection";
import { journeyData } from "@/data/journey";

function ScrollWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: any;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const isSpecial =
    word.includes("Yashi") ||
    word.includes("Sweetie") ||
    word.includes("Harshit") ||
    word.includes("anmol");

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-1.5 transition-colors ${
        isSpecial
          ? "font-bold text-rose-deep drop-shadow-[0_0_10px_rgba(225,29,72,0.8)] scale-105"
          : "text-white"
      }`}
    >
      {word}
    </motion.span>
  );
}

export default function WordReveal() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.5"],
  });

  const fullText = journeyData.wordReveal.paragraph;
  const words = fullText.split(" ");

  return (
    <JourneySection chapter={journeyData.wordReveal.chapter} className="py-4">
      <div
        ref={containerRef}
        className="w-full max-w-sm rounded-[32px] p-6 glass-card-rose border border-pink-soft/30 backdrop-blur-2xl shadow-glow relative overflow-hidden"
      >
        <span className="text-3xl mb-3 block text-center">💌</span>

        {/* Word by word scroll opacity reveal */}
        <p className="font-playfair text-lg sm:text-xl font-medium leading-relaxed tracking-wide text-left select-text">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <ScrollWord
                key={i}
                word={word}
                progress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
        </p>

        {/* Hindi Highlight Line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 pt-4 border-t border-white/10 text-center"
        >
          <p className="font-hindi text-base sm:text-lg text-gold-accent font-normal drop-shadow-[0_0_8px_rgba(245,208,169,0.5)]">
            {journeyData.wordReveal.hindiLine}
          </p>
          <span className="font-dancing text-xl text-pink-soft block mt-2 text-right">
            {journeyData.wordReveal.author}
          </span>
        </motion.div>
      </div>
    </JourneySection>
  );
}
