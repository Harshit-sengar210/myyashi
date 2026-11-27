"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";

export default function NotFound() {
  return (
    <div className="relative w-full h-full min-h-[844px] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      <FloatingHearts count={12} interactive={false} />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card-rose rounded-3xl p-8 max-w-xs border border-pink-soft/30 shadow-glow relative z-20"
      >
        <span className="text-6xl mb-4 block animate-bounce">🥺</span>

        <h2 className="font-playfair text-2xl font-bold text-white mb-2">
          Oops Sweetie!
        </h2>

        <p className="font-hindi text-base text-gold-accent mb-3">
          यहाँ कुछ नहीं है 🌸
        </p>

        <p className="font-poppins text-xs text-blush/80 leading-relaxed mb-6">
          Lagta hai tum galti se kisi aur gali me aa gayi. Home chalein?
        </p>

        <Link href="/" className="inline-block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="min-h-[44px] px-6 py-2.5 rounded-full bg-rose-deep text-white font-poppins text-xs font-semibold flex items-center justify-center gap-2 shadow-glow"
          >
            <Home className="w-4 h-4" />
            <span>Home Chalein 💖</span>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
