"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface Bubble {
  id: number;
  x: number; // percentage
  size: number;
  duration: number;
  delay: number;
}

export default function PhotoBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [poppedIds, setPoppedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Generate 6 gentle floating circular bubbles
    const generated: Bubble[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 8 + i * 15 + Math.random() * 6,
      size: Math.floor(Math.random() * 16) + 48, // 48px to 64px
      duration: Math.random() * 5 + 9, // 9s to 14s
      delay: i * 1.8,
    }));
    setBubbles(generated);
  }, []);

  const handlePop = (id: number, x: number, y: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPoppedIds((prev) => new Set(prev).add(id));

    // Mini heart confetti burst upon popping
    confetti({
      particleCount: 18,
      spread: 50,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#E11D48", "#FBCFE8", "#FFF1F2"],
    });

    // Respawn bubble after 4 seconds
    setTimeout(() => {
      setPoppedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 4000);
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {bubbles.map((b) => {
        if (poppedIds.has(b.id)) return null;

        return (
          <motion.div
            key={b.id}
            initial={{ y: "105vh", opacity: 0, scale: 0.5 }}
            animate={{
              y: "-15vh",
              opacity: [0, 0.85, 0.85, 0],
              scale: [0.5, 1, 1.05, 0.8],
              x: [`${b.x}%`, `${b.x + 3}%`, `${b.x - 3}%`, `${b.x}%`],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            onClick={(e) => handlePop(b.id, b.x, 0, e)}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: `${b.x}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
            }}
          >
            {/* Circular bubble crop with pink border & glow */}
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-pink-soft/60 shadow-[0_0_15px_rgba(225,29,72,0.4)] relative group hover:scale-110 active:scale-90 transition-transform">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/images/couple.jpeg')" }}
              />
              <div className="absolute inset-0 bg-rose-deep/10 group-hover:bg-transparent" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
