"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Check, Gift } from "lucide-react";
import { couponsData, Coupon } from "@/data/coupons";

function ScratchCanvas({
  coupon,
  onRevealed,
}: {
  coupon: Coupon;
  onRevealed: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPct, setScratchPct] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw scratchable surface
    ctx.fillStyle = "#3B185F";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add pattern / glitter text on cover
    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = "#FBCFE8";
    ctx.textAlign = "center";
    ctx.fillText("✨ Scratch Here Sweetie ✨", canvas.width / 2, canvas.height / 2 + 5);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    if (isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check progress
    checkPercentage();
  };

  const checkPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Sample pixels for performance
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    const total = imgData.data.length / 4;

    for (let i = 3; i < imgData.data.length; i += 16) {
      if (imgData.data[i] === 0) transparent++;
    }

    const pct = (transparent / (total / 4)) * 100;
    setScratchPct(pct);

    // If 60% is scratched -> auto reveal with confetti!
    if (pct > 55 && !isScratched) {
      setIsScratched(true);
      onRevealed();

      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#E11D48", "#F5D0A9", "#FBCFE8"],
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.buttons === 1 || e.pointerType === "touch") {
      scratch(e.clientX, e.clientY);
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden p-4 glass-card bg-gradient-to-r border border-pink-soft/30 shadow-md min-h-[140px] flex flex-col justify-between select-none">
      {/* Underlying revealed content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{coupon.emoji}</span>
            <h4 className="font-playfair text-base font-bold text-white">
              {coupon.title}
            </h4>
          </div>
          <span className="text-[10px] uppercase font-poppins px-2 py-0.5 rounded-full bg-rose-deep/30 text-pink-soft border border-rose-deep/40">
            Pass
          </span>
        </div>

        <p className="font-hindi text-xs text-gold-accent mb-1">
          {coupon.hindiTitle}
        </p>

        <p className="font-poppins text-xs text-blush/80 leading-relaxed mb-3">
          {coupon.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-poppins text-pink-soft/70">
          <span>Coupon Code: <strong className="text-gold-accent">{coupon.code}</strong></span>
          <span className="text-emerald-400 font-medium">Valid Forever ❤️</span>
        </div>
      </div>

      {/* Canvas scratch layer overlay */}
      {!isScratched && (
        <canvas
          ref={canvasRef}
          width={340}
          height={140}
          onPointerMove={handlePointerMove}
          onPointerDown={(e) => scratch(e.clientX, e.clientY)}
          className="absolute inset-0 w-full h-full cursor-crosshair z-20 touch-none"
        />
      )}
    </div>
  );
}

export default function ScratchCoupons() {
  const [revealedCount, setRevealedCount] = useState(0);

  return (
    <div className="w-full my-3">
      <div className="text-center mb-6">
        <span className="text-xs font-poppins uppercase tracking-widest text-pink-soft font-semibold block mb-1">
          Redeemable Vouchers
        </span>
        <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white">
          Scratch Card Coupons 🎁
        </h3>
        <p className="font-hindi text-xs text-gold-accent mt-0.5">
          अपनी उंगली से स्क्रैच करो और कूपन अनलॉक करो ✨
        </p>
      </div>

      <div className="space-y-4 px-1">
        {couponsData.map((coupon) => (
          <ScratchCanvas
            key={coupon.id}
            coupon={coupon}
            onRevealed={() => setRevealedCount((prev) => prev + 1)}
          />
        ))}
      </div>

      <div className="text-center mt-6 text-xs font-poppins text-pink-soft/70">
        {revealedCount === couponsData.length
          ? "Wah Sweetie! Saare coupons unlock ho gaye! 🎉 Kabhi bhi redeem kar sakti ho."
          : `Scratch all 4 coupons • Unlocked: ${revealedCount}/4`}
      </div>
    </div>
  );
}
