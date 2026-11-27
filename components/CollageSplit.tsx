"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { COLLAGE_PANELS, PolaroidPanel } from "@/data/photos";

export default function CollageSplit() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState(1);

  const selected = activeIdx !== null ? COLLAGE_PANELS[activeIdx] : null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % COLLAGE_PANELS.length);
      setZoomScale(1);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + COLLAGE_PANELS.length) % COLLAGE_PANELS.length);
      setZoomScale(1);
    }
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale((prev) => (prev === 1 ? 1.75 : 1));
  };

  return (
    <div className="w-full my-4">
      <div className="text-center mb-6">
        <span className="text-xs font-poppins uppercase tracking-widest text-pink-soft font-semibold block mb-1">
          Memory Album
        </span>
        <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white">
          Moments From Our Story 📸
        </h3>
        <p className="font-hindi text-xs text-gold-accent mt-0.5">
          हर तस्वीर में एक ख़ास एहसास छुपा है ✨
        </p>
      </div>

      {/* Grid of 7 Polaroid Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-1">
        {COLLAGE_PANELS.map((panel, idx) => {
          const isCenter = panel.id === "panel-center";

          return (
            <motion.div
              key={panel.id}
              initial={{
                opacity: 0,
                x: panel.direction.x,
                y: panel.direction.y,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 20,
                delay: idx * 0.08,
              }}
              onClick={() => {
                setActiveIdx(idx);
                setZoomScale(1);
              }}
              className={`cursor-pointer group ${isCenter ? "sm:col-span-2" : ""}`}
            >
              {/* Polaroid Frame (White/cream paper border) */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                style={{ transform: `rotate(${panel.rotation}deg)` }}
                className="relative rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-[#FFFDF9] to-[#FFF4EC] text-[#2A102A] shadow-[0_12px_30px_rgba(0,0,0,0.5)] border border-pink-soft/30 transition-transform duration-300 overflow-hidden"
              >
                {/* Washi Tape Accent on top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pink-soft/40 backdrop-blur-md border border-white/40 -rotate-2 rounded-sm shadow-sm z-20 pointer-events-none" />

                {/* Cropped Image Window */}
                <div
                  className={`w-full rounded-2xl overflow-hidden relative shadow-inner border border-amber-900/10 ${
                    isCenter ? "h-64 sm:h-72" : "h-48 sm:h-52"
                  }`}
                  style={{
                    backgroundImage: "url('/images/collage.jpeg')",
                    backgroundPosition: panel.bgPosition,
                    backgroundSize: panel.bgSize,
                    backgroundRepeat: "no-repeat",
                    filter: panel.isSketch ? "grayscale(0.6) contrast(1.2)" : "none",
                  }}
                >
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Handwritten Polaroid Caption */}
                <div className="pt-3 pb-1 text-center">
                  <h4 className="font-playfair text-sm sm:text-base font-bold text-amber-950 leading-tight">
                    {panel.title}
                  </h4>
                  {panel.hindiTitle && (
                    <p className="font-hindi text-[11px] text-rose-deep mt-0.5">
                      {panel.hindiTitle}
                    </p>
                  )}
                  <p className="font-dancing text-xs sm:text-sm text-amber-900/80 mt-1 font-medium">
                    "{panel.caption}"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal with Pinch / Tap Zoom & Swipe */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[400px] rounded-[32px] p-5 glass-card-rose border border-pink-soft/40 shadow-glow text-left cursor-default overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveIdx(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-30"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Zoom Button */}
              <button
                onClick={toggleZoom}
                className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-pink-soft flex items-center gap-1 text-[11px] font-poppins transition-all z-30"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{zoomScale > 1 ? "Reset Zoom" : "Pinch / Zoom"}</span>
              </button>

              {/* Cropped Panel in Lightbox */}
              <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden relative border border-white/20 mb-4 shadow-glass mt-8 bg-black">
                <motion.div
                  animate={{ scale: zoomScale }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('/images/collage.jpeg')",
                    backgroundPosition: selected.bgPosition,
                    backgroundSize: selected.bgSize,
                    backgroundRepeat: "no-repeat",
                    filter: selected.isSketch ? "grayscale(0.6) contrast(1.2)" : "none",
                  }}
                />
              </div>

              {/* Story & Description */}
              <div className="mb-4 text-center">
                <h3 className="font-playfair text-xl font-bold text-white mb-1">
                  {selected.title}
                </h3>
                {selected.hindiTitle && (
                  <p className="font-hindi text-xs text-gold-accent mb-2">
                    {selected.hindiTitle}
                  </p>
                )}
                <p className="font-poppins text-xs text-blush/90 leading-relaxed px-2">
                  {selected.caption}
                </p>
              </div>

              {/* Carousel navigation controls */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-poppins text-pink-soft">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1 hover:text-white transition-colors py-1 px-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-[11px] text-pink-soft/60">
                  {(activeIdx ?? 0) + 1} of {COLLAGE_PANELS.length}
                </span>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 hover:text-white transition-colors py-1 px-2"
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
