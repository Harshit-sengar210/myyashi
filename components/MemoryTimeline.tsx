"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Calendar, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { memoriesData, MemoryItem } from "@/data/memories";

export default function MemoryTimeline() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const activeMemory = selectedPhotoIndex !== null ? memoriesData[selectedPhotoIndex] : null;

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % memoriesData.length);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + memoriesData.length) % memoriesData.length
      );
    }
  };

  return (
    <div className="w-full relative py-2">
      {/* Glowing Vertical Timeline Center/Left Line */}
      <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-gradient-to-b from-rose-deep via-pink-soft to-lavender shadow-[0_0_8px_rgba(225,29,72,0.6)]" />

      {/* Memory Timeline Items */}
      <div className="space-y-8 pl-12 pr-1 relative">
        {memoriesData.map((mem, idx) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative"
          >
            {/* Glowing Timeline Node Dot */}
            <div className="absolute -left-[31px] top-4 w-4 h-4 rounded-full bg-rose-deep border-2 border-white shadow-glow flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
            </div>

            {/* Polaroid Photo Card */}
            <div
              onClick={() => setSelectedPhotoIndex(idx)}
              style={{ transform: `rotate(${mem.rotation || 0}deg)` }}
              className="cursor-pointer group rounded-3xl p-4 glass-card bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-pink-soft/25 shadow-glass hover:border-pink-soft/50 hover:shadow-glow transition-all duration-300"
            >
              {/* Tape Effect on top center */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-pink-soft/20 backdrop-blur-md border-x border-white/20 -rotate-1 rounded-sm pointer-events-none" />

              {/* Photo / Polaroid Container */}
              <div className="w-full h-44 rounded-2xl overflow-hidden relative mb-3 bg-gradient-to-tr from-[#2b0e3e] via-[#4a154b] to-[#1e0729] flex flex-col items-center justify-center text-center p-4 border border-white/10">
                {/* Pretty gradient fallback placeholder */}
                <div className="text-3xl mb-1">📸</div>
                <span className="font-playfair text-base font-semibold text-white drop-shadow-md">
                  {mem.title}
                </span>
                <span className="text-[10px] font-poppins text-pink-soft/80 mt-1">
                  Tap to expand preview ✨
                </span>

                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[9px] font-poppins text-gold-accent border border-white/10">
                  {mem.badge}
                </div>
              </div>

              {/* Card Meta & Story */}
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-poppins text-pink-soft/70 mb-1">
                  <Calendar className="w-3 h-3 text-gold-accent" />
                  <span>{mem.date}</span>
                </div>

                <h4 className="font-playfair text-lg font-bold text-white group-hover:text-rose-200 transition-colors">
                  {mem.title}
                </h4>

                {mem.hindiTitle && (
                  <p className="font-hindi text-xs text-gold-accent/90 mb-2">
                    {mem.hindiTitle}
                  </p>
                )}

                <p className="font-poppins text-xs text-blush/80 leading-relaxed">
                  {mem.text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[390px] rounded-3xl glass-card-rose p-6 border border-pink-soft/40 shadow-glow text-left cursor-default overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Expanded Polaroid Display */}
              <div className="w-full h-56 rounded-2xl bg-gradient-to-tr from-[#2b0e3e] via-[#4a154b] to-[#1e0729] flex flex-col items-center justify-center p-4 text-center border border-white/20 mb-4 relative shadow-glass">
                <span className="text-5xl mb-2">📸</span>
                <span className="font-dancing text-2xl text-pink-soft font-bold">
                  {activeMemory.title}
                </span>
                <span className="text-xs font-hindi text-gold-accent mt-1">
                  {activeMemory.hindiTitle}
                </span>
              </div>

              {/* Memory Story Content */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-poppins text-pink-soft/70 mb-2">
                  <span>{activeMemory.date}</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-deep/30 text-rose-200 border border-rose-deep/40 text-[10px]">
                    {activeMemory.badge}
                  </span>
                </div>
                <h3 className="font-playfair text-xl font-bold text-white mb-2">
                  {activeMemory.title}
                </h3>
                <p className="font-poppins text-xs sm:text-sm text-blush leading-relaxed">
                  {activeMemory.text}
                </p>
              </div>

              {/* Carousel navigation controls */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-poppins">
                <button
                  onClick={handlePrevPhoto}
                  className="flex items-center gap-1 text-pink-soft hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-[11px] text-pink-soft/60">
                  {(selectedPhotoIndex ?? 0) + 1} of {memoriesData.length}
                </span>
                <button
                  onClick={handleNextPhoto}
                  className="flex items-center gap-1 text-pink-soft hover:text-white transition-colors"
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
